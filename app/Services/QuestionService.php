<?php

namespace App\Services;

use App\Http\Requests\Question\CreateQuestionRequest;
use App\Http\Requests\Question\UpdateQuestionRequest;
use App\Http\Requests\Question\VoteQuestionRequest;
use App\Models\Answer;
use App\Models\Category;
use App\Models\Question;
use App\Models\User;
use App\Models\VoteQuestions;
use Illuminate\Http\Request;

class QuestionService
{
    public function __construct(
        protected GeminiService $geminiService,
        protected StorageService $storageService,
    ) {
    }

    public function getListQuestion(Request $request): array|object
    {
        $questions = Question::with('user.badge', 'categories', 'votes')->withCount('answers');

        $userId = auth()->id();
        // filter menu
        if ($request->has('menu') && $userId) {
            $questions = match ($request->query('menu')) {
                'upvoted' => $questions->whereHas('votes', fn($q) => $q->where('user_id', $userId)->where('is_upvote', true)),
                'my-question' => $questions->where('user_id', $userId),
                default => $questions,
            };
        }
        // filter answer
        if ($request->has('answer')) {
            $questions = match ($request->query('answer')) {
                'unanswered' => $questions->having('answers_count', 0),
                'no-correct' => $questions->whereDoesntHave('answers', fn($q) => $q->where('is_correct', 1)),
                'correct-answer' => $questions->whereHas('answers', fn($q) => $q->where('is_correct', 1)),
                default => $questions,
            };
        }

        // filter search
        if ($request->has('search')) {
            $questions = $questions->where('title', 'like', "%{$request->query('search')}%")->orWhere('content', 'like', "%{$request->query('search')}%");
        }

        // filter category
        if ($request->has('category')) {
            $categoryIds = explode(',', $request->query('category'));
            $questions = $questions->whereHas('categories', fn($q) => $q->whereIn('categories.id', $categoryIds));
        }

        // filter education
        if ($request->has('education')) {
            $educationIds = explode(',', $request->query('education'));
            $questions = $questions->whereIn('education_id', $educationIds);
        }

        // sorting
        $questions = match ($request->query('sort')) {
            'most-answered' => $questions->orderBy('answers_count', 'desc')->orderBy('created_at', 'desc'),
            'most-upvoted' => $questions->orderBy('upvote', 'desc'),
            default => $questions->orderBy('created_at', 'desc')->orderBy('upvote', 'desc'),
        };

        // pagination
        $questions = $questions->paginate(perPage: 10, page: $request->page ?? 1);

        return [
            'data' => collect($questions->items())->map(function ($question) use ($userId) {
                $question->is_upvoted = $userId ?
                    $question->votes()->where('user_id', $userId)->where('is_upvote', true)->exists()
                    : false;
                $question->is_downvoted = $userId ?
                    $question->votes()->where('user_id', $userId)->where('is_upvote', false)->exists()
                    : false;
                return $question;
            }) ?? [],
            'current_page' => $questions->currentPage(),
            'last_page' => $questions->lastPage(),
        ];
    }

    public function getQuestionBySlug(string $slug): array|object
    {
        $question = Question::with('user.badge', 'categories')
            ->where('slug', $slug)
            ->firstOrFail();

        $userId = auth()->id();
        $question->is_upvoted = $userId ?
            $question->votes()->where('user_id', $userId)->where('is_upvote', true)->exists()
            : false;
        $question->is_downvoted = $userId ?
            $question->votes()->where('user_id', $userId)->where('is_upvote', false)->exists()
            : false;

        $answers = Answer::with('user.badge')
            ->where('question_id', $question->id)
            ->orderBy('is_correct', 'desc')
            ->orderBy('upvote', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();
        return [
            'question' => $question,
            'answers' => $answers->map(function ($answer) use ($userId) {
                $answer->is_upvoted = $userId ?
                    $answer->votes()->where('user_id', $userId)->where('is_upvote', true)->exists()
                    : false;
                $answer->is_downvoted = $userId ?
                    $answer->votes()->where('user_id', $userId)->where('is_upvote', false)->exists()
                    : false;
                return $answer;
            })
        ];
    }

    public function getQuestionAnswers(Request $request, string $questionId): array|object
    {
        $answers = Answer::with('user.badge')
            ->where('question_id', $questionId);

        // sorting
        $answers = match ($request->query('sort')) {
            'most-like' => $answers->orderBy('upvote', 'desc'),
            'lowest-like' => $answers->orderBy('downvote', 'desc'),
            'latest' => $answers->orderBy('created_at', 'desc'),
            'oldest' => $answers->orderBy('created_at', 'asc'),
            default => $answers->orderBy('created_at', 'desc')->orderBy('upvote', 'desc'),
        };

        $answers = $answers->get();

        $userId = auth()->id();
        return $answers->isNotEmpty() ? $answers->map(function ($answer) use ($userId) {
            $answer->is_upvoted = $userId ?
                $answer->votes()->where('user_id', $userId)->where('is_upvote', true)->exists()
                : false;
            $answer->is_downvoted = $userId ?
                $answer->votes()->where('user_id', $userId)->where('is_upvote', false)->exists()
                : false;
            return $answer;
        }) : [];
    }

    public function store(CreateQuestionRequest $request)
    {
        $validated = $request->validated();

        $question = Question::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'content' => $validated['content'] ?? "",
            'education_id' => $validated['education_id'],
        ]);
        // Handle categories
        if (isset($validated['categories'])) {
            $categoryIds = collect($validated['categories'])->map(function ($category) {
                // Check if the category exists
                if (isset($category['id'])) {
                    $existingCategory = Category::find($category['id']);
                    return $existingCategory->id; // Return the existing category ID
                }

                // Create a new category if it does not exist
                $newCategory = Category::create([
                    'label' => $category['label'],
                    'created_by' => auth()->id(),
                ]);

                return $newCategory->id; // Return the new category ID
            });

            // Attach the categories to the question
            $question->categories()->attach($categoryIds);
        }

        // insert AI answer
        if ($validated['ai_answer']) {
            $answerContent = $this->geminiService->generateAnswer($question, $validated['image_url'] ?? null);

            Answer::create([
                'question_id' => $question->id,
                'content' => $answerContent,
            ]);
        }

        // handle image upload
        if (isset($validated['image_url'])) {
            $url = $this->storageService->storeQuestionImage($request, $question);
            $question->image_url = $url;
            $question->save();
        }

        return $question;
    }

    public function update(UpdateQuestionRequest $request, string $id)
    {
        $validated = $request->validated();
        $question = Question::find($id);
        $question->update([
            'title' => $validated['title'],
            'content' => $validated['content'] ?? "",
            'image_url' => $validated['image_url'] ?? null,
            'education_id' => $validated['education_id'],
        ]);
        // Handle categories
        if (isset($validated['categories'])) {
            $categoryIds = collect($validated['categories'])->map(function ($category) {
                // Check if the category exists
                if (isset($category['id'])) {
                    $existingCategory = Category::find($category['id']);
                    return $existingCategory->id; // Return the existing category ID
                }

                // Create a new category if it does not exist
                $newCategory = Category::create([
                    'label' => $category['label'],
                    'created_by' => auth()->id(),
                ]);

                return $newCategory->id;
            })->filter(); // Filter out null values

            // Sync categories with the question
            $question->categories()->sync($categoryIds);
        }

        return $question;
    }


    public function voteQuestion(VoteQuestionRequest $request)
    {
        if ($request->is_upvote) {
            return $this->upvoteQuestion($request);
        } else {
            return $this->downvoteQuestion($request);
        }
    }

    public function upvoteQuestion(VoteQuestionRequest $request)
    {
        $questionId = $request->question_id;
        $userId = auth()->id();
        $upvoteQuestion = VoteQuestions::where('question_id', $questionId)->where('user_id', $userId);
        $question = Question::find($questionId);

        $user = User::find($question->user_id);
        // check is already upvoted
        if ($upvoteQuestion->first()) {
            if ($upvoteQuestion->first()->is_upvote) {
                $upvoteQuestion->delete();

                $question->upvote -= 1;
                $user->point -= 3;
            } else {
                $upvoteQuestion->update([
                    'is_upvote' => true
                ]);
                $question->upvote += 1;
                $question->downvote -= 1;

                $user->point += 3;
            }
        } else {
            VoteQuestions::create([
                'question_id' => $questionId,
                'user_id' => $userId,
                'is_upvote' => true
            ]);
            $question->upvote += 1;
            $user->point += 3;
        }
        $question->save();
        $user->save();
        return $question;
    }

    public function downvoteQuestion(VoteQuestionRequest $request)
    {
        $questionId = $request->question_id;
        $userId = auth()->id();
        $downvoteQuestion = VoteQuestions::where('question_id', $questionId)->where('user_id', $userId);
        $question = Question::find($questionId);

        $user = User::find($question->user_id);
        // check is already downvoted
        if ($downvoteQuestion->first()) {
            if (!$downvoteQuestion->first()->is_upvote) {
                $downvoteQuestion->delete();

                $question->downvote -= 1;
            } else {
                $downvoteQuestion->update([
                    'is_upvote' => false
                ]);
                $question->downvote += 1;
                $question->upvote -= 1;
                $user->point -= 3;
            }
        } else {
            VoteQuestions::create([
                'question_id' => $questionId,
                'user_id' => $userId,
                'is_upvote' => false
            ]);
            $question->downvote += 1;
        }
        $question->save();
        $user->save();
        return $question;
    }
}

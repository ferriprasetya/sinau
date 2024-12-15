<?php

namespace App\Services;

use App\Http\Requests\Question\CreateQuestionRequest;
use App\Models\Answer;
use App\Models\Category;
use App\Models\Question;
use App\Models\VoteQuestions;
use Illuminate\Http\Request;

class QuestionService
{
    public function getListQuestion(Request $request): array|object
    {
        $questions = Question::with('user.badge', 'categories', 'votes')->withCount('answers')->orderBy('created_at', 'desc')->orderBy('upvote', 'desc');

        // filter search
        if ($request->has('search')) {
            $questions = $questions->where('title', 'like', "%{$request->search}%")->orWhere('content', 'like', "%{$request->search}%");
        }

        // filter category
        if ($request->has('category')) {
            $questions = $questions->where('categories_id', $request->category);
        }

        // pagination
        $questions = $questions->paginate(perPage: 10, page: $request->page ?? 1);

        $userId = auth()->id();
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

    public function getQuestionAnswers(string $questionId): array|object
    {
        $answers = Answer::with('user.badge')
            ->where('question_id', $questionId)
            ->orderBy('is_correct', 'desc')
            ->orderBy('upvote', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

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
            'image_url' => $validated['image_url'] ?? null,
            'education_id' => $validated['education_id'],
        ]);
        // Handle categories
        if (isset($validated['categories'])) {
            $categoryIds = collect($validated['categories'])->map(function ($category) {
                // Check if the category exists
                $existingCategory = Category::find($category['id']);

                if ($existingCategory) {
                    return $existingCategory->id; // Return the existing category ID
                }

                // Create a new category if it does not exist
                $newCategory = Category::create([
                    'label' => $category['label'],
                ]);

                return $newCategory->id; // Return the new category ID
            });

            // Attach the categories to the question
            $question->categories()->attach($categoryIds);
        }

        return $question;
    }

    public function voteQuestion(string $questionId, bool $upvote)
    {
        if ($upvote) {
            return $this->upvoteQuestion($questionId);
        } else {
            return $this->downvoteQuestion($questionId);
        }
    }

    public function upvoteQuestion(string $questionId)
    {
        $userId = auth()->id();
        $upvoteQuestion = VoteQuestions::where('question_id', $questionId)->where('user_id', $userId);
        $question = Question::find($questionId);

        // check is already upvoted
        if ($upvoteQuestion->first()) {
            if ($upvoteQuestion->first()->is_upvote) {
                $upvoteQuestion->delete();

                $question->upvote -= 1;
            } else {
                $upvoteQuestion->update([
                    'is_upvote' => true
                ]);
                $question->upvote += 1;
                $question->downvote -= 1;
            }
        } else {
            VoteQuestions::create([
                'question_id' => $questionId,
                'user_id' => $userId,
                'is_upvote' => true
            ]);
            $question->upvote += 1;
        }
        $question->save();
        return $question;
    }

    public function downvoteQuestion(string $questionId)
    {
        $userId = auth()->id();
        $downvoteQuestion = VoteQuestions::where('question_id', $questionId)->where('user_id', $userId);
        $question = Question::find($questionId);

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
        return $question;
    }
}

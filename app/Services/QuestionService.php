<?php

namespace App\Services;

use App\Http\Requests\Question\CreateQuestionRequest;
use App\Models\Answer;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionService
{
    public function getListQuestion(Request $request): array|object
    {
        $questions = Question::with('user.badge', 'categories')->withCount('answers')->orderBy('created_at', 'desc')->orderBy('upvote', 'desc');

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

        return [
            'data' => $questions->items() ?? [],
            'current_page' => $questions->currentPage(),
            'last_page' => $questions->lastPage(),
        ];
    }

    public function getQuestionBySlug(string $slug): array|object
    {
        $question = Question::with('user.badge', 'categories')
            ->where('slug', $slug)
            ->firstOrFail();

        $answers = Answer::with('user.badge')
            ->where('question_id', $question->id)
            ->orderBy('is_correct', 'desc')
            ->orderBy('upvote', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();
        return [
            'question' => $question,
            'answers' => $answers
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

        return $answers;
    }

    public function store(CreateQuestionRequest $request)
    {
        $validated = $request->validated();
        $question = Question::create([
            'user_id' => $validated['user_id'],
            'title' => $validated['title'],
            'content' => $validated['content'],
            'image_url' => $validated['image_url'] ?? null,
            'education_id' => $validated['education_id'] ?? null,
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
}

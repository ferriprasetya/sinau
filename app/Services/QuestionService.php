<?php

namespace App\Services;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionService
{
    public function getListQuestion(Request $request): Array | Object
    {
        $questions = Question::with('user.badge', 'category')->orderBy('created_at', 'desc')->orderBy('upvote', 'desc');

        // filter search
        if ($request->has('search')) {
            $questions = $questions->where('title', 'like', "%{$request->search}%")->orWhere('content', 'like', "%{$request->search}%");
        }

        // filter category
        if ($request->has('category')) {
            $questions = $questions->where('categories_id', $request->category);
        }

        // pagination
        $questions = $questions->paginate(perPage: 2, page: $request->page ?? 1);

        return [
            'data' => $questions->items() ?? [],
            'current_page' => $questions->currentPage(),
            'last_page' => $questions->lastPage(),
        ];
    }
}

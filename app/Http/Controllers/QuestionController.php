<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Services\QuestionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function __construct(
        protected QuestionService $questionService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $questions = $this->questionService->getListQuestion($request);
        return Inertia::render('Question/QuestionList', [
            'questions' => $questions
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $question = $this->questionService->getQuestionBySlug($slug);
        return Inertia::render('DetailAnswer', [
            'question' => $question['question'],
            // 'answers' => $question->answers
        ]);
    }
}

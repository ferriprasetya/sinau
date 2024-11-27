<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Services\QuestionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
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
        return Inertia::render('Home', [
            'questions' => $questions
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Services\QuestionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Question\CreateAnswerRequest;
use App\Http\Requests\Question\CreateQuestionRequest;
use App\Models\Education;
use App\Services\AnswerService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Throwable;


class QuestionController extends Controller
{
    public function __construct(
        protected QuestionService $questionService,
        protected AnswerService $answerService,
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
            'answers' => $question['answers']
        ]);
    }

    public function store(CreateQuestionRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->questionService->store($request);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
        }
        return Redirect::route('question.index');
    }

    // QUESTION ANSWER
    public function createAnswer(CreateAnswerRequest $request)
    {
        DB::beginTransaction();
        try {
            $answer = $this->answerService->store($request);
            DB::commit();
        } catch (Throwable $exception) {
            dd($exception);
            DB::rollBack();
        }

        return Redirect::route('question.show', ['slug' => $answer->question->slug]);
    }

    public function markCorrectAnswer(int $answerId)
    {
        DB::beginTransaction();
        try {
            $answer = $this->answerService->markAsCorrect($answerId);
            DB::commit();
        } catch (Throwable) {
            DB::rollBack();
        }
        return Redirect::route('question.show', ['slug' => $answer->question->slug]);
    }

    public function removeAsCorrectAnswer(int $answerId)
    {
        DB::beginTransaction();
        try {
            $answer = $this->answerService->removeAsCorrect($answerId);
            DB::commit();
        } catch (Throwable) {
            DB::rollBack();
        }
        return Redirect::route('question.show', ['slug' => $answer->question->slug]);
    }

    public function create()
    {
        $educations = Education::all();
        return Inertia::render('Question/CreateQuestion', [
            'educations' => $educations
        ]);
    }
}

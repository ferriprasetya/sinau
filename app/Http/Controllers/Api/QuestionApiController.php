<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Question\CreateAnswerRequest;
use App\Services\AnswerService;
use App\Services\QuestionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class QuestionApiController extends Controller
{

    public function __construct(
        protected QuestionService $questionService,
        protected AnswerService $answerService,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return $this->questionService->getListQuestion($request);

        $questions = $this->questionService->getListQuestion($request);
        return response()->json([
            'message' => __('questions.index.success'),
            ...$questions
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $question = $this->questionService->getQuestionBySlug($slug);
        return response()->json([
            'message' => __('questions.show.success'),
            'data' => $question
        ], 200);
    }

    public function getQuestionAnswers(string $questionId)
    {
        $answers = $this->questionService->getQuestionAnswers($questionId);
        return response()->json([
            'message' => __('questions.answer.show.success'),
            'data' => $answers
        ], 200);
    }

    public function createAnswer(CreateAnswerRequest $request)
    {
        DB::beginTransaction();
        try {
            $answer = $this->answerService->store($request);
            DB::commit();
            return response()->json([
                'message' => __('question.answer.store.success'),
                'data' => $answer
            ], 201);
        } catch (Throwable $th) {
            DB::rollBack();
            return response()->json([
                // 'message' => __('question.answer.store.failed'),
                'message' => $th->getMessage(),
            ], 400);
        }

    }

    public function markCorrectAnswer(int $answerId)
    {
        DB::beginTransaction();
        try {
            $answer = $this->answerService->markAsCorrect($answerId);
            DB::commit();
            return response()->json([
                'message' => __('question.answer.correct.add.success'),
                'data' => $answer
            ], 204);
        } catch (Throwable) {
            DB::rollBack();
            return response()->json([
                'message' => __('question.answer.correct.add.failed'),
            ], 400);
        }
    }

    public function removeAsCorrectAnswer(int $answerId)
    {
        DB::beginTransaction();
        try {
            $answer = $this->answerService->removeAsCorrect($answerId);
            DB::commit();
            return response()->json([
                'message' => __('question.answer.correct.remove.success'),
                'data' => $answer
            ], 204);
        } catch (Throwable) {
            DB::rollBack();
            return response()->json([
                'message' => __('question.answer.correct.remove.failed'),
            ], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

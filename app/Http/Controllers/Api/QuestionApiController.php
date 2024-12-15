<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Question\CreateAnswerRequest;
use App\Http\Requests\Question\CreateQuestionRequest;
use App\Http\Requests\Question\UpdateQuestionVote;
use App\Http\Requests\Question\VoteAnswerRequest;
use App\Http\Requests\Question\VoteQuestionRequest;
use App\Models\VoteAnswers;
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
        } catch (Throwable) {
            DB::rollBack();
            return response()->json([
                'message' => __('question.answer.store.failed'),
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
    public function store(CreateQuestionRequest $request)
    {
        DB::beginTransaction();
        try {
            $question = $this->questionService->store($request);
            DB::commit();
            return response()->json([
                'message' => __('question.store.success'),
                'data' => $question
            ], 201);
        } catch (Throwable $e) {
            DB::rollBack();
            return response()->json([
                // 'message' => __('question.store.failed'),
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function voteQuestion(VoteQuestionRequest $request)
    {
        DB::beginTransaction();
        try {
            $question = $this->questionService->voteQuestion($request->question_id, $request->is_upvote);
            DB::commit();
            return response()->json([
                'message' => __('question.vote.success'),
                'data' => $question
            ], 201);
        } catch (Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => __('question.vote.failed'),
            ], 400);
        }
    }

    public function voteQuestionAnswer(VoteAnswerRequest $request)
    {
        DB::beginTransaction();
        try {
            $answer = $this->answerService->voteAnswer($request->answer_id, $request->is_upvote);
            DB::commit();
            return response()->json([
                'message' => __('answer.vote.success'),
                'data' => $answer
            ], 201);
        } catch (Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => __('answer.vote.failed'),
            ], 400);
        }
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

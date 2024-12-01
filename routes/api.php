<?php

use App\Http\Controllers\Api\QuestionApiController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'questions'], function () {
    Route::get(
        '/',
        [QuestionApiController::class, 'index']
    )->name('question.api.index');
    Route::get(
        '{questionId}/answers',
        [QuestionApiController::class, 'getQuestionAnswers']
    )->name('question.api.answers');

    Route::post(
        '/answer',
        [QuestionApiController::class, 'createAnswer']
    )->name('question.api.answer');
    Route::patch(
        '/answer/{answerId}/correct',
        [QuestionApiController::class, 'markCorrectAnswer']
    )->name('question.api.answer.correct');
    Route::patch(
        '/answer/{answerId}/removeCorrect',
        [QuestionApiController::class, 'removeAsCorrectAnswer']
    )->name('question.api.answer.removeCorrect');
});

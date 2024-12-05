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
});

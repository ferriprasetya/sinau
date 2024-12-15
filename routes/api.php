<?php

use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\QuestionApiController;
use App\Models\Category;
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
Route::group(['prefix' => 'categories'], function () {
    Route::get(
        '/',
        [CategoryApiController::class, 'index']
    )->name('categories.api.index');
});
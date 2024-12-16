<?php

use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\EducationApiController;
use App\Http\Controllers\Api\QuestionApiController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => 'question'], function () {
    Route::get('/', [QuestionController::class, 'index'])->name('question.index');
    Route::get(
        '/list',
        [QuestionApiController::class, 'index']
    )->name('question.list');
    Route::get('/create', [QuestionController::class, 'create'])->name('question.create');
    Route::get('/{slug}', [QuestionController::class, 'show'])->name('question.show');


    Route::middleware('auth')->group(function () {
        Route::post(
            '/',
            [QuestionController::class, 'store']
        )->name('question.store');
        Route::get(
            '/edit/{questionId}',
            [QuestionController::class, 'edit']
        )->name('question.edit');
        Route::patch(
            '/{questionId}/update',
            [QuestionController::class, 'update']
        )->name('question.update');
        Route::post(
            '/vote',
            [QuestionApiController::class, 'voteQuestion']
        )->name('question.vote');

        Route::post(
            '/answer',
            [QuestionController::class, 'createAnswer']
        )->name('question.answer');
        Route::put(
            '/answer/{answerId}/edit',
            [QuestionController::class, 'UpdateAnswer']
        )->name('question.answer.update');
        Route::patch(
            '/answer/{answerId}/correct',
            [QuestionController::class, 'markCorrectAnswer']
        )->name('question.answer.correct');
        Route::patch(
            '/answer/{answerId}/removeCorrect',
            [QuestionController::class, 'removeAsCorrectAnswer']
        )->name('question.answer.removeCorrect');
        Route::post(
            '/answer/vote',
            [QuestionApiController::class, 'voteQuestionAnswer']
        )->name('question.answer.vote');
    });
});


Route::get('/categories', [CategoryApiController::class, 'getPaginatedCategories'])->name('categories.list');
Route::get('/educations', [EducationApiController::class, 'index'])->name('educations.list');

Route::get('/', function () {
    return to_route('question.index');
})->name('home');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

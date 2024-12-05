<?php

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => 'question'], function () {
    Route::get('/', [QuestionController::class, 'index'])->name('question.index');
    Route::get('/{slug}', [QuestionController::class, 'show'])->name('question.show');

    Route::middleware('auth')->group(function () {
        Route::post(
            '/',
            [QuestionController::class, 'store']
        )->name('question.store');

        Route::post(
            '/answer',
            [QuestionController::class, 'createAnswer']
        )->name('question.answer');
        Route::patch(
            '/answer/{answerId}/correct',
            [QuestionController::class, 'markCorrectAnswer']
        )->name('question.answer.correct');
        Route::patch(
            '/answer/{answerId}/removeCorrect',
            [QuestionController::class, 'removeAsCorrectAnswer']
        )->name('question.answer.removeCorrect');
    });
});

Route::get('/', function () {
    return to_route('question.index');
})->name('home');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\Api\QuestionApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'questions'], function () {
    Route::get('/', [QuestionApiController::class, 'index'])->name('question.api.index');
});

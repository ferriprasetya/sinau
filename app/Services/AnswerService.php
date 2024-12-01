<?php

namespace App\Services;

use App\Http\Requests\Question\CreateAnswerRequest;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;

class AnswerService
{
    public function store(CreateAnswerRequest $request)
    {
        $answer = Answer::create([
            'user_id' => $request->user_id,
            'question_id' => $request->question_id,
            'content' => $request->content
        ]);

        return $answer;
    }

    public function markAsCorrect(int $answerId)
    {
        $answer = Answer::find($answerId);
        $answer->is_correct = true;

        $otherAnswer = Answer::where('question_id', $answer->question_id)->where('is_correct', true)->first();
        if ($otherAnswer) {
            $otherAnswer->is_correct = false;
            $otherAnswer->save();
        }
        $answer->save();

        $question = Question::find($answer->question_id);
        if (!$question->is_correct) {
            $question->is_correct = true;
            $question->save();
        }
        return $answer;
    }

    public function removeAsCorrect(int $answerId)
    {
        $answer = Answer::find($answerId);
        $question = Question::find($answer->question_id);
        $answer->is_correct = false;
        $question->is_correct = false;

        $question->save();
        $answer->save();

        return $answer;
    }
}

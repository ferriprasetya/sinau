<?php

namespace App\Services;

use App\Http\Requests\Question\CreateAnswerRequest;
use App\Models\Answer;
use App\Models\Question;
use App\Models\VoteAnswers;
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
        $answer = Question::find($answer->answer_id);
        $answer->is_correct = false;
        $answer->is_correct = false;

        $answer->save();
        $answer->save();

        return $answer;
    }

    public function voteAnswer(int $answerId, bool $upvote)
    {
        if ($upvote) {
            return $this->upvoteAnswer($answerId);
        } else {
            return $this->downvoteAnswer($answerId);
        }
    }

    public function upvoteAnswer(int $answerId)
    {
        $userId = auth()->id();
        $upvoteAnswer = VoteAnswers::where('answer_id', $answerId)->where('user_id', $userId);
        $answer = Answer::find($answerId);

        // check is already upvoted
        if ($upvoteAnswer->first()) {
            if ($upvoteAnswer->first()->is_upvote) {
                $upvoteAnswer->delete();

                $answer->upvote -= 1;
            } else {
                $upvoteAnswer->update([
                    'is_upvote' => true
                ]);
                $answer->upvote += 1;
                $answer->downvote -= 1;
            }
        } else {
            VoteAnswers::create([
                'answer_id' => $answerId,
                'user_id' => $userId,
                'is_upvote' => true
            ]);
            $answer->upvote += 1;
        }
        $answer->save();
        return $answer;
    }

    public function downvoteAnswer(int $answerId)
    {
        $userId = auth()->id();
        $downvoteAnswer = VoteAnswers::where('answer_id', $answerId)->where('user_id', $userId);
        $answer = Answer::find($answerId);

        // check is already downvoted
        if ($downvoteAnswer->first()) {
            if (!$downvoteAnswer->first()->is_upvote) {
                $downvoteAnswer->delete();

                $answer->downvote -= 1;
            } else {
                $downvoteAnswer->update([
                    'is_upvote' => false
                ]);
                $answer->downvote += 1;
                $answer->upvote -= 1;
            }
        } else {
            VoteAnswers::create([
                'answer_id' => $answerId,
                'user_id' => $userId,
                'is_upvote' => false
            ]);
            $answer->downvote += 1;
        }
        $answer->save();
        return $answer;
    }
}

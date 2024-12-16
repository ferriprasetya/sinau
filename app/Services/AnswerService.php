<?php

namespace App\Services;

use App\Http\Requests\Question\CreateAnswerRequest;
use App\Http\Requests\Question\EditAnswerRequest;
use App\Http\Requests\Question\UpdateQuestionRequest;
use App\Http\Requests\Question\VoteAnswerRequest;
use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
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

    public function update(EditAnswerRequest $request, int $answerId)
    {
        $validate = $request->validated();
        $answer = Answer::find($answerId);
        $answer->update([
            'content' => $validate['content'],
            'answer_id' => $validate['question_id'],
            'user_id' => $validate['user_id']

        ]);

        return $answer;
    }

    public function markAsCorrect(int $answerId)
    {
        $answer = Answer::find($answerId);
        $answer->is_correct = true;
        $user = User::find($answer->user_id);
        if($user) $user->point += 10;

        $otherAnswer = Answer::where('question_id', $answer->question_id)->where('is_correct', true)->first();
        if ($otherAnswer) {
            $otherAnswer->is_correct = false;
            $otherAnswer->save();
            $userOtherAnswer = User::find($otherAnswer->user_id);
            $userOtherAnswer->point -= 10;
        }
        $answer->save();
        $user->save();

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
        $question = Question::find($answer->answer_id);
        $answer->is_correct = false;
        $question->is_correct = false;

        $user = User::find($answer->user_id);
        if($user) $user->point -= 10;

        $answer->save();
        $question->save();
        if($user) $user->save();

        return $answer;
    }

    public function voteAnswer(VoteAnswerRequest $request)
    {
        if ($request->is_upvote) {
            return $this->upvoteAnswer($request);
        } else {
            return $this->downvoteAnswer($request);
        }
    }

    public function upvoteAnswer(VoteAnswerRequest $request)
    {
        $answerId = $request->answer_id;
        $userId = auth()->id();
        $upvoteAnswer = VoteAnswers::where('answer_id', $answerId)->where('user_id', $userId);
        $answer = Answer::find($answerId);

        $user = User::find($answer->user_id);
        // check is already upvoted
        if ($upvoteAnswer->first()) {
            if ($upvoteAnswer->first()->is_upvote) {
                $upvoteAnswer->delete();

                $answer->upvote -= 1;
                if($user) $user->point -= 5;
            } else {
                $upvoteAnswer->update([
                    'is_upvote' => true
                ]);
                $answer->upvote += 1;
                $answer->downvote -= 1;
                if($user) $user->point += 5;
            }
        } else {
            VoteAnswers::create([
                'answer_id' => $answerId,
                'user_id' => $userId,
                'is_upvote' => true
            ]);
            $answer->upvote += 1;
            if($user) $user->point += 5;
        }
        $answer->save();
        if($user) $user->save();
        return $answer;
    }

    public function downvoteAnswer(VoteAnswerRequest $request)
    {
        $answerId = $request->answer_id;
        $userId = auth()->id();
        $downvoteAnswer = VoteAnswers::where('answer_id', $answerId)->where('user_id', $userId);
        $answer = Answer::find($answerId);

        $user = User::find($answer->user_id);
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
                if($user) $user->point -= 5;
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
        if($user) $user->save();
        return $answer;
    }
}

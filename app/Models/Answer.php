<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'upvote',
        'downvote',
        'is_correct',
        'user_id',
        'question_id',
    ];

    /**
     * Get the user who created the answer.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the question this answer belongs to.
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function votes()
    {
        return $this->hasMany(VoteAnswers::class);
    }
}

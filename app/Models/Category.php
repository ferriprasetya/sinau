<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'slug',
        'label',
        'created_by',
        'users_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');

    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'question_categories');
    }


    protected function label(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => [
                'label' => $value,
                'slug' => Str::slug($value)
            ]
        );
    }
}

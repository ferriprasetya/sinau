<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

class Education extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'educations';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'slug',
        'label'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

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

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}

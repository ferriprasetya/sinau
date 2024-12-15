<?php

namespace App\Http\Requests\Question;

use Illuminate\Foundation\Http\FormRequest;

class VoteAnswerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'is_upvote' => ['required', 'boolean'],
            'answer_id' => ['required', 'int', 'exists:answers,id'],
        ];
    }
}

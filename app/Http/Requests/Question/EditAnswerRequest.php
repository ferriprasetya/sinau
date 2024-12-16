<?php

namespace App\Http\Requests\Question;

use Illuminate\Foundation\Http\FormRequest;

class EditAnswerRequest extends FormRequest
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
    public function rules()
    {
        return [
            'content' => 'required|string',
            'question_id' => 'required|uuid|exists:questions,id',
            'user_id' => 'required|uuid|exists:users,id',
        ];
    }

    /**
     * Customize the error messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'content.required' => 'Harap isi jawaban untuk bisa mengirimkannya.',
        ];
    }
}

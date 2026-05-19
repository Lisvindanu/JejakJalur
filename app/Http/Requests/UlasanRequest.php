<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UlasanRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'komentar' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'rating.required' => 'Rating wajib diisi.',
            'rating.min' => 'Rating minimal 1.',
            'rating.max' => 'Rating maksimal 5.',
            'komentar.max' => 'Komentar maksimal 1000 karakter.',
        ];
    }
}

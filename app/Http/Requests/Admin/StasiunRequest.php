<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StasiunRequest extends FormRequest
{
    public function rules(): array
    {
        $stasiunYangDiedit = $this->route('stasiun');

        return [
            'kota_id' => ['required', 'uuid', 'exists:kota,id'],
            'nama' => ['required', 'string', 'max:100', Rule::unique('stasiun', 'nama')->ignore($stasiunYangDiedit)],
            'kode_stasiun' => ['required', 'string', 'max:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'kota_id.required' => 'Kota wajib dipilih.',
            'kota_id.exists' => 'Kota tidak ditemukan.',
            'nama.required' => 'Nama stasiun wajib diisi.',
            'nama.unique' => 'Nama stasiun sudah ada.',
            'kode_stasiun.required' => 'Kode stasiun wajib diisi.',
        ];
    }
}

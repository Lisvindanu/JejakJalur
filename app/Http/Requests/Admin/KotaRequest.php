<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KotaRequest extends FormRequest
{
    public function rules(): array
    {
        $kotaYangDiedit = $this->route('kota');

        return [
            'nama' => ['required', 'string', 'max:100', Rule::unique('kota', 'nama')->ignore($kotaYangDiedit)],
            'kode_ibukota' => ['required', 'string', 'max:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama kota wajib diisi.',
            'nama.unique' => 'Nama kota sudah ada.',
            'kode_ibukota.required' => 'Kode ibukota wajib diisi.',
        ];
    }
}

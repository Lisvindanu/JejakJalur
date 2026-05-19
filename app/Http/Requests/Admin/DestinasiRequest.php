<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DestinasiRequest extends FormRequest
{
    public function rules(): array
    {
        $destinasiYangDiedit = $this->route('destinasi');

        return [
            'stasiun_id' => ['required', 'uuid', 'exists:stasiun,id'],
            'nama' => ['required', 'string', 'max:150', Rule::unique('destinasi', 'nama')->ignore($destinasiYangDiedit)],
            'deskripsi' => ['required', 'string', 'max:2000'],
            'alamat' => ['required', 'string', 'max:255'],
            'kategori' => ['required', 'string', Rule::in(['Wisata', 'Kuliner', 'UMKM'])],
            'foto' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_verified' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'stasiun_id.required' => 'Stasiun wajib dipilih.',
            'stasiun_id.exists' => 'Stasiun tidak ditemukan.',
            'nama.required' => 'Nama destinasi wajib diisi.',
            'nama.unique' => 'Nama destinasi sudah ada.',
            'deskripsi.required' => 'Deskripsi wajib diisi.',
            'kategori.required' => 'Kategori wajib dipilih.',
            'kategori.in' => 'Kategori harus berupa wisata atau kuliner.',
            'foto.image' => 'File harus berupa gambar.',
            'foto.max' => 'Ukuran foto maksimal 2MB.',
        ];
    }
}

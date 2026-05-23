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
            'lat' => ['nullable', 'numeric', 'between:-90,90'],
            'lng' => ['nullable', 'numeric', 'between:-180,180'],
            'foto' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_verified' => ['boolean'],
            'telepon' => ['nullable', 'string', 'max:20'],
            'website' => ['nullable', 'url', 'max:255'],
            'harga_min' => ['nullable', 'integer', 'min:0'],
            'harga_max' => ['nullable', 'integer', 'min:0', 'gte:harga_min'],
            'jam_operasional' => ['nullable', 'array'],
            'jam_operasional.*' => ['nullable', 'array'],
            'jam_operasional.*.buka' => ['required_with:jam_operasional.*', 'nullable', 'string', 'date_format:H:i'],
            'jam_operasional.*.tutup' => ['required_with:jam_operasional.*', 'nullable', 'string', 'date_format:H:i'],
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

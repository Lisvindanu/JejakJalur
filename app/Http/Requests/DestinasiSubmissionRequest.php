<?php

namespace App\Http\Requests;

use App\Models\Destinasi;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DestinasiSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        $destinasi = $this->route('destinasi');

        // Create: harus login.
        if (! $destinasi instanceof Destinasi) {
            return $this->user() !== null;
        }

        // Update: hanya pemilik & destinasi belum diverifikasi.
        return $this->user()
            && $destinasi->user_id === $this->user()->id
            && ! $destinasi->is_verified;
    }

    public function rules(): array
    {
        $destinasiYangDiedit = $this->route('destinasi');
        $ignoreId = $destinasiYangDiedit instanceof Destinasi ? $destinasiYangDiedit->id : null;

        return [
            'stasiun_id' => ['required', 'uuid', 'exists:stasiun,id'],
            'nama' => ['required', 'string', 'max:150', Rule::unique('destinasi', 'nama')->ignore($ignoreId)],
            'deskripsi' => ['required', 'string', 'max:2000'],
            'alamat' => ['required', 'string', 'max:255'],
            'kategori' => ['required', 'string', Rule::in(['Wisata', 'Kuliner', 'UMKM'])],
            'lat' => ['nullable', 'numeric', 'between:-90,90'],
            'lng' => ['nullable', 'numeric', 'between:-180,180'],
            'foto' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'stasiun_id.required' => 'Stasiun terdekat wajib dipilih.',
            'stasiun_id.exists' => 'Stasiun tidak ditemukan.',
            'nama.required' => 'Nama destinasi wajib diisi.',
            'nama.unique' => 'Nama destinasi sudah ada.',
            'deskripsi.required' => 'Deskripsi wajib diisi.',
            'kategori.required' => 'Kategori wajib dipilih.',
            'kategori.in' => 'Kategori harus Wisata, Kuliner, atau UMKM.',
            'foto.image' => 'File harus berupa gambar.',
            'foto.max' => 'Ukuran foto maksimal 2MB.',
        ];
    }
}

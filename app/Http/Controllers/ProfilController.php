<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfilRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfilController extends Controller
{
    public function tampilkan(): Response
    {
        return Inertia::render('Profil/Tampilkan', [
            'pengguna' => auth()->user(),
        ]);
    }

    public function edit(): Response
    {
        return Inertia::render('Profil/Edit', [
            'pengguna' => auth()->user(),
        ]);
    }

    public function perbarui(ProfilRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $pengguna = $request->user();
        $pengguna->nama = $data['nama'];
        $pengguna->name = $data['nama'];
        $pengguna->email = $data['email'];
        $pengguna->save();

        return redirect()->route('profil.tampilkan')->with('sukses', 'Profil berhasil diperbarui.');
    }

    public function hapus(): RedirectResponse
    {
        $pengguna = auth()->user();
        auth()->logout();
        $pengguna->delete(); // SoftDelete — UU PDP right to be forgotten

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('home')->with('sukses', 'Akun Anda telah dihapus.');
    }
}

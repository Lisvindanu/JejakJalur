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
        $pengguna = auth()->user();

        $ulasan = $pengguna->ulasan()
            ->with('destinasi:id,nama,kategori,foto,stasiun_id')
            ->latest()
            ->get()
            ->map(fn ($u) => [
                'id' => $u->id,
                'judul' => $u->judul,
                'konten' => $u->konten,
                'rating' => $u->rating,
                'created_at' => $u->created_at,
                'destinasi' => [
                    'id' => $u->destinasi->id,
                    'nama' => $u->destinasi->nama,
                    'kategori' => $u->destinasi->kategori,
                    'foto_url' => $u->destinasi->foto_url,
                ],
            ]);

        $bookmarks = $pengguna->bookmarks()
            ->with('destinasi:id,nama,kategori,foto,rating,stasiun_id')
            ->latest()
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'destinasi' => [
                    'id' => $b->destinasi->id,
                    'nama' => $b->destinasi->nama,
                    'kategori' => $b->destinasi->kategori,
                    'rating' => $b->destinasi->rating,
                    'foto_url' => $b->destinasi->foto_url,
                ],
            ]);

        return Inertia::render('Profil/Tampilkan', [
            'pengguna' => $pengguna,
            'jumlah_ulasan' => $ulasan->count(),
            'rata_rata_rating' => $ulasan->count() > 0 ? round($ulasan->avg('rating'), 1) : null,
            'jumlah_destinasi_diulas' => $ulasan->pluck('destinasi.id')->unique()->count(),
            'ulasan' => $ulasan,
            'bookmarks' => $bookmarks,
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

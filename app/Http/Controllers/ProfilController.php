<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfilRequest;
use App\Services\FotoService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfilController extends Controller
{
    public function __construct(private FotoService $fotoService) {}

    public function tampilkan(): Response
    {
        $pengguna = auth()->user();

        $jumlah_ulasan = $pengguna->ulasan()->count();
        $rata_rata_rating = $pengguna->ulasan()->avg('rating');
        $jumlah_destinasi_diulas = $pengguna->ulasan()->distinct('destinasi_id')->count('destinasi_id');

        $ulasan = $pengguna->ulasan()
            ->with('destinasi:id,nama,kategori,foto,stasiun_id')
            ->latest()
            ->paginate(5, ['*'], 'ulasan_page')
            ->through(fn ($u) => [
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
            ->paginate(8, ['*'], 'bookmark_page')
            ->through(fn ($b) => [
                'id' => $b->id,
                'destinasi' => [
                    'id' => $b->destinasi->id,
                    'nama' => $b->destinasi->nama,
                    'kategori' => $b->destinasi->kategori,
                    'rating' => $b->destinasi->rating,
                    'foto_url' => $b->destinasi->foto_url,
                ],
            ]);

        $kunjungan = $pengguna->kunjungan()
            ->with('destinasi:id,nama,kategori,foto,rating,stasiun_id')
            ->latest()
            ->paginate(8, ['*'], 'kunjungan_page')
            ->through(fn ($k) => [
                'id' => $k->id,
                'destinasi' => [
                    'id' => $k->destinasi->id,
                    'nama' => $k->destinasi->nama,
                    'kategori' => $k->destinasi->kategori,
                    'rating' => $k->destinasi->rating,
                    'foto_url' => $k->destinasi->foto_url,
                ],
            ]);

        return Inertia::render('Profil/Tampilkan', [
            'pengguna' => $pengguna,
            'jumlah_ulasan' => $jumlah_ulasan,
            'rata_rata_rating' => $rata_rata_rating ? round($rata_rata_rating, 1) : null,
            'jumlah_destinasi_diulas' => $jumlah_destinasi_diulas,
            'ulasan' => $ulasan,
            'bookmarks' => $bookmarks,
            'kunjungan' => $kunjungan,
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

        if ($request->hasFile('avatar')) {
            $pengguna->avatar = $this->fotoService->simpan($request->file('avatar'), 'avatars');
        }

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

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ulasan;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UlasanController extends Controller
{
    public function indeks(): Response
    {
        $ulasan = Ulasan::with(['user', 'destinasi'])
            ->orderByDesc('created_at')
            ->paginate(25)
            ->through(fn (Ulasan $u) => [
                'id' => $u->id,
                'judul' => $u->judul,
                'konten' => $u->konten,
                'rating' => $u->rating,
                'user_name' => $u->user?->name,
                'user_id' => $u->user_id,
                'destinasi_nama' => $u->destinasi?->nama,
                'destinasi_id' => $u->destinasi_id,
                'created_at' => $u->created_at->format('d M Y'),
            ]);

        return Inertia::render('Admin/Ulasan/Indeks', ['ulasan' => $ulasan]);
    }

    public function hapus(Ulasan $ulasan): RedirectResponse
    {
        $ulasan->delete();

        return back()->with('sukses', 'Ulasan berhasil dihapus.');
    }
}

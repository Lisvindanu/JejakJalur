<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PenggunaController extends Controller
{
    public function tampilkan(Request $request, User $user): Response
    {
        $pengguna = auth()->user();

        $ulasan = $user->ulasan()
            ->with('destinasi:id,nama,kategori,foto,stasiun_id')
            ->where('is_hidden', false)
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn ($u) => [
                'id' => $u->id,
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

        $isFollowing = $pengguna
            ? $pengguna->following()->where('following_id', $user->id)->exists()
            : false;

        return Inertia::render('Pengguna/Tampilkan', [
            'pengguna' => [
                'id' => $user->id,
                'name' => $user->name,
                'avatar' => $user->avatar,
                'created_at' => $user->created_at,
                'jumlah_ulasan' => $user->ulasan()->count(),
                'jumlah_followers' => $user->followers()->count(),
                'jumlah_following' => $user->following()->count(),
                'jumlah_kunjungan' => $user->kunjungan()->count(),
            ],
            'ulasan' => $ulasan,
            'is_following' => $isFollowing,
            'is_own_profile' => $pengguna?->id === $user->id,
        ]);
    }
}

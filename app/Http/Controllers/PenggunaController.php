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

    public function leaderboard(): Response
    {
        $top = User::selectRaw('
            users.*,
            (SELECT COUNT(*) FROM ulasan WHERE ulasan.user_id = users.id AND ulasan.is_hidden = false) AS jumlah_ulasan,
            (SELECT COUNT(*) FROM kunjungan WHERE kunjungan.user_id = users.id) AS jumlah_kunjungan,
            (SELECT COUNT(*) FROM user_follows WHERE user_follows.following_id = users.id) AS jumlah_followers,
            (SELECT COALESCE(AVG(rating), 0) FROM ulasan WHERE ulasan.user_id = users.id AND ulasan.is_hidden = false) AS avg_rating
        ')
            ->whereNull('deleted_at')
            ->orderByDesc('jumlah_ulasan')
            ->limit(20)
            ->get()
            ->map(fn ($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'avatar' => $u->avatar,
                'jumlah_ulasan' => (int) $u->jumlah_ulasan,
                'jumlah_kunjungan' => (int) $u->jumlah_kunjungan,
                'jumlah_followers' => (int) $u->jumlah_followers,
                'avg_rating' => round((float) $u->avg_rating, 1),
            ]);

        return Inertia::render('Leaderboard/Tampilkan', [
            'top' => $top,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AiSession;
use App\Models\Destinasi;
use App\Models\Kota;
use App\Models\Stasiun;
use App\Models\Ulasan;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function tampilkan(): Response
    {
        $statistik = [
            'jumlah_kota' => Kota::count(),
            'jumlah_stasiun' => Stasiun::count(),
            'jumlah_destinasi' => Destinasi::count(),
            'destinasi_verified' => Destinasi::where('is_verified', true)->count(),
            'destinasi_pending' => Destinasi::where('is_verified', false)->count(),
            'jumlah_pengguna' => User::count(),
            'jumlah_ulasan' => Ulasan::count(),
            'ai_pesan_hari_ini' => AiSession::whereDate('last_message_at', today())->sum('message_count'),
        ];

        $destinasiPending = Destinasi::with('stasiun.kota')
            ->where('is_verified', false)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn (Destinasi $d) => [
                'id' => $d->id,
                'nama' => $d->nama,
                'kategori' => $d->kategori,
                'kota' => $d->stasiun?->kota?->nama,
                'created_at' => $d->created_at->format('d M Y'),
            ]);

        $ulasanTerbaru = Ulasan::with(['user', 'destinasi'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn (Ulasan $u) => [
                'id' => $u->id,
                'user_name' => $u->user?->name,
                'destinasi_nama' => $u->destinasi?->nama,
                'destinasi_id' => $u->destinasi_id,
                'rating' => $u->rating,
                'created_at' => $u->created_at->diffForHumans(),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'statistik' => $statistik,
            'destinasiPending' => $destinasiPending,
            'ulasanTerbaru' => $ulasanTerbaru,
        ]);
    }
}

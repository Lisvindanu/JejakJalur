<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AiSession;
use App\Models\Bookmark;
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

        $cutoff30 = now()->subDays(30)->toDateTimeString();
        $topDestinasiUlasan = Destinasi::selectRaw('*, (SELECT COUNT(*) FROM ulasan WHERE destinasi.id = ulasan.destinasi_id AND ulasan.created_at >= ?) AS ulasan_bulan_ini', [$cutoff30])
            ->whereRaw('(SELECT COUNT(*) FROM ulasan WHERE destinasi.id = ulasan.destinasi_id AND ulasan.created_at >= ?) > 0', [$cutoff30])
            ->orderByRaw('(SELECT COUNT(*) FROM ulasan WHERE destinasi.id = ulasan.destinasi_id AND ulasan.created_at >= ?) DESC', [$cutoff30])
            ->limit(5)
            ->get()
            ->map(fn (Destinasi $d) => [
                'id' => $d->id,
                'nama' => $d->nama,
                'kategori' => $d->kategori,
                'ulasan_bulan_ini' => $d->ulasan_bulan_ini,
                'rating' => $d->rating,
            ]);

        $topDestinasiViews = Destinasi::orderByDesc('views')
            ->where('views', '>', 0)
            ->limit(5)
            ->get(['id', 'nama', 'kategori', 'views', 'rating'])
            ->map(fn (Destinasi $d) => [
                'id' => $d->id,
                'nama' => $d->nama,
                'kategori' => $d->kategori,
                'views' => $d->views,
                'rating' => $d->rating,
            ]);

        $pengguna_baru_bulan_ini = User::where('created_at', '>=', now()->startOfMonth())->count();
        $pengguna_baru_bulan_lalu = User::whereBetween('created_at', [now()->subMonth()->startOfMonth(), now()->subMonth()->endOfMonth()])->count();

        $ulasan_bulan_ini = Ulasan::where('created_at', '>=', now()->startOfMonth())->count();
        $bookmark_bulan_ini = Bookmark::where('created_at', '>=', now()->startOfMonth())->count();

        $statistik = array_merge($statistik, [
            'pengguna_baru_bulan_ini' => $pengguna_baru_bulan_ini,
            'pengguna_baru_bulan_lalu' => $pengguna_baru_bulan_lalu,
            'ulasan_bulan_ini' => $ulasan_bulan_ini,
            'bookmark_bulan_ini' => $bookmark_bulan_ini,
        ]);

        return Inertia::render('Admin/Dashboard', [
            'statistik' => $statistik,
            'destinasiPending' => $destinasiPending,
            'ulasanTerbaru' => $ulasanTerbaru,
            'topDestinasiUlasan' => $topDestinasiUlasan,
            'topDestinasiViews' => $topDestinasiViews,
        ]);
    }
}

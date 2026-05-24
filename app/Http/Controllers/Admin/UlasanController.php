<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminLog;
use App\Models\Ulasan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UlasanController extends Controller
{
    public function indeks(Request $request): Response
    {
        $filter = $request->input('filter', 'semua');

        $query = Ulasan::with(['user', 'destinasi']);

        match ($filter) {
            'dilaporkan' => $query->where('reports_count', '>', 0)->orderByDesc('reports_count'),
            'disembunyikan' => $query->where('is_hidden', true)->orderByDesc('reports_count'),
            default => $query->orderByDesc('created_at'),
        };

        $ulasan = $query->paginate(25)->through(fn (Ulasan $u) => [
            'id' => $u->id,
            'judul' => $u->judul,
            'konten' => $u->konten,
            'rating' => $u->rating,
            'reports_count' => $u->reports_count,
            'is_hidden' => $u->is_hidden,
            'user_name' => $u->user?->name,
            'user_id' => $u->user_id,
            'destinasi_nama' => $u->destinasi?->nama,
            'destinasi_id' => $u->destinasi_id,
            'created_at' => $u->created_at->format('d M Y'),
        ]);

        $counts = [
            'semua' => Ulasan::count(),
            'dilaporkan' => Ulasan::where('reports_count', '>', 0)->count(),
            'disembunyikan' => Ulasan::where('is_hidden', true)->count(),
        ];

        return Inertia::render('Admin/Ulasan/Indeks', [
            'ulasan' => $ulasan,
            'filter' => $filter,
            'counts' => $counts,
        ]);
    }

    public function sembunyikan(Ulasan $ulasan): RedirectResponse
    {
        $ulasan->update(['is_hidden' => true]);
        AdminLog::catat('sembunyikan_ulasan', Ulasan::class, $ulasan->id, "Sembunyikan ulasan ID {$ulasan->id}");

        return back()->with('sukses', 'Ulasan disembunyikan.');
    }

    public function tampilkan(Ulasan $ulasan): RedirectResponse
    {
        $ulasan->update(['is_hidden' => false]);
        AdminLog::catat('tampilkan_ulasan', Ulasan::class, $ulasan->id, "Tampilkan ulasan ID {$ulasan->id}");

        return back()->with('sukses', 'Ulasan ditampilkan kembali.');
    }

    public function hapus(Ulasan $ulasan): RedirectResponse
    {
        AdminLog::catat('hapus_ulasan', Ulasan::class, $ulasan->id, "Hapus ulasan ID {$ulasan->id}");
        $ulasan->delete();

        return back()->with('sukses', 'Ulasan berhasil dihapus.');
    }
}

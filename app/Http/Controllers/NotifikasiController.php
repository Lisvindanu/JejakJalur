<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotifikasiController extends Controller
{
    public function indeks(Request $request): Response
    {
        $notifikasi = $request->user()
            ->notifications()
            ->latest()
            ->paginate(20);

        $request->user()->unreadNotifications()->update(['read_at' => now()]);

        return Inertia::render('Notifikasi/Indeks', [
            'notifikasi' => $notifikasi,
        ]);
    }

    public function jumlahBelumDibaca(Request $request): JsonResponse
    {
        return response()->json([
            'count' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function tandaiSudahDibaca(Request $request): RedirectResponse
    {
        $request->user()->unreadNotifications()->update(['read_at' => now()]);

        return back()->with('sukses', 'Semua notifikasi ditandai sudah dibaca.');
    }
}

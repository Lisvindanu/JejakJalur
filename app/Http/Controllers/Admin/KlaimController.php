<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DestinasiKlaim;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KlaimController extends Controller
{
    public function indeks(Request $request): Response
    {
        $klaim = DestinasiKlaim::with(['destinasi:id,nama,kategori', 'user:id,name,email'])
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Klaim/Indeks', [
            'klaim' => $klaim,
            'filter' => $request->only('status'),
        ]);
    }

    public function setujui(DestinasiKlaim $klaim): RedirectResponse
    {
        $klaim->update(['status' => 'disetujui']);

        // Transfer destinasi ownership to claimer
        $klaim->destinasi->update(['user_id' => $klaim->user_id]);

        return back()->with('sukses', 'Klaim disetujui. Kepemilikan destinasi telah dipindahkan.');
    }

    public function tolak(Request $request, DestinasiKlaim $klaim): RedirectResponse
    {
        $request->validate(['catatan_admin' => ['nullable', 'string', 'max:300']]);

        $klaim->update([
            'status' => 'ditolak',
            'catatan_admin' => $request->catatan_admin,
        ]);

        return back()->with('sukses', 'Klaim ditolak.');
    }
}

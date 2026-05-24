<?php

namespace App\Http\Controllers;

use App\Models\Destinasi;
use App\Models\DestinasiKlaim;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KlaimController extends Controller
{
    public function formulir(Destinasi $destinasi): Response
    {
        $sudahKlaim = DestinasiKlaim::where('destinasi_id', $destinasi->id)
            ->where('user_id', auth()->id())
            ->exists();

        return Inertia::render('Destinasi/Klaim', [
            'destinasi' => $destinasi->load('stasiun.kota'),
            'sudah_klaim' => $sudahKlaim,
        ]);
    }

    public function simpan(Request $request, Destinasi $destinasi): RedirectResponse
    {
        $request->validate([
            'keterangan' => ['required', 'string', 'min:20', 'max:500'],
        ]);

        $sudahAda = DestinasiKlaim::where('destinasi_id', $destinasi->id)
            ->where('user_id', auth()->id())
            ->exists();

        if ($sudahAda) {
            return back()->with('error', 'Kamu sudah mengajukan klaim untuk destinasi ini.');
        }

        DestinasiKlaim::create([
            'destinasi_id' => $destinasi->id,
            'user_id' => auth()->id(),
            'keterangan' => $request->keterangan,
            'status' => 'menunggu',
        ]);

        return redirect()->route('destinasi.detail', $destinasi)
            ->with('sukses', 'Pengajuan klaim berhasil dikirim. Admin akan meninjau dalam 1-3 hari kerja.');
    }
}

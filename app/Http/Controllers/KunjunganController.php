<?php

namespace App\Http\Controllers;

use App\Models\Destinasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class KunjunganController extends Controller
{
    public function simpan(Request $request, Destinasi $destinasi): RedirectResponse
    {
        $request->user()->kunjungan()->firstOrCreate([
            'destinasi_id' => $destinasi->id,
        ]);

        return back();
    }

    public function hapus(Request $request, Destinasi $destinasi): RedirectResponse
    {
        $request->user()->kunjungan()
            ->where('destinasi_id', $destinasi->id)
            ->delete();

        return back();
    }
}

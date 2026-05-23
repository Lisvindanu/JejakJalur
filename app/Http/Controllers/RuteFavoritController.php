<?php

namespace App\Http\Controllers;

use App\Models\RuteFavorit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RuteFavoritController extends Controller
{
    public function simpan(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'dari_kode' => ['required', 'string', 'max:10'],
            'ke_kode' => ['required', 'string', 'max:10'],
            'dari_nama' => ['required', 'string', 'max:100'],
            'ke_nama' => ['required', 'string', 'max:100'],
            'mode' => ['required', 'in:antarkota,commuter,kcic'],
        ]);

        $request->user()->ruteFavorit()->create($data);

        return back()->with('sukses', 'Rute berhasil disimpan ke favorit.');
    }

    public function hapus(Request $request, RuteFavorit $ruteFavorit): RedirectResponse
    {
        abort_unless($ruteFavorit->user_id === $request->user()->id, 403);
        $ruteFavorit->delete();

        return back()->with('sukses', 'Rute favorit dihapus.');
    }
}

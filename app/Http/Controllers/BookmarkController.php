<?php

namespace App\Http\Controllers;

use App\Models\Destinasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    public function simpan(Request $request, Destinasi $destinasi): RedirectResponse
    {
        $request->user()->bookmarks()->firstOrCreate([
            'destinasi_id' => $destinasi->id,
        ]);

        return back();
    }

    public function hapus(Request $request, Destinasi $destinasi): RedirectResponse
    {
        $request->user()->bookmarks()
            ->where('destinasi_id', $destinasi->id)
            ->delete();

        return back();
    }
}

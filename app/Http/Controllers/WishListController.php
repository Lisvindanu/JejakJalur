<?php

namespace App\Http\Controllers;

use App\Models\Destinasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class WishListController extends Controller
{
    public function simpan(Request $request, Destinasi $destinasi): RedirectResponse
    {
        $request->user()->wishList()->firstOrCreate(
            ['destinasi_id' => $destinasi->id],
        );

        return back();
    }

    public function hapus(Request $request, Destinasi $destinasi): RedirectResponse
    {
        $request->user()->wishList()
            ->where('destinasi_id', $destinasi->id)
            ->delete();

        return back();
    }
}

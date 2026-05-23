<?php

namespace App\Http\Controllers;

use App\Http\Requests\UlasanRequest;
use App\Models\Destinasi;
use App\Models\Ulasan;
use App\Models\UlasanLike;
use App\Services\UlasanService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UlasanController extends Controller
{
    public function __construct(private UlasanService $ulasanService) {}

    public function simpan(UlasanRequest $request, Destinasi $destinasi): RedirectResponse
    {
        $this->ulasanService->buatUlasan(
            data: $request->validated(),
            pengguna: $request->user(),
            destinasi: $destinasi,
            fotoFiles: $request->file('foto') ?? [],
        );

        return back()->with('sukses', 'Ulasan berhasil ditambahkan.');
    }

    public function perbarui(UlasanRequest $request, Destinasi $destinasi, Ulasan $ulasan): RedirectResponse
    {
        $this->ulasanService->perbaruiUlasan($ulasan, $request->validated(), $request->user());

        return back()->with('sukses', 'Ulasan berhasil diperbarui.');
    }

    public function hapus(Destinasi $destinasi, Ulasan $ulasan): RedirectResponse
    {
        $this->ulasanService->hapusUlasan($ulasan, request()->user());

        return back()->with('sukses', 'Ulasan berhasil dihapus.');
    }

    public function like(Request $request, Destinasi $destinasi, Ulasan $ulasan): RedirectResponse
    {
        UlasanLike::firstOrCreate([
            'user_id' => $request->user()->id,
            'ulasan_id' => $ulasan->id,
        ]);

        return back()->with('sukses', '');
    }

    public function unlike(Request $request, Destinasi $destinasi, Ulasan $ulasan): RedirectResponse
    {
        UlasanLike::where('user_id', $request->user()->id)
            ->where('ulasan_id', $ulasan->id)
            ->delete();

        return back()->with('sukses', '');
    }
}

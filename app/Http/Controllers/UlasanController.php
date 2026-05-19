<?php

namespace App\Http\Controllers;

use App\Http\Requests\UlasanRequest;
use App\Models\Destinasi;
use App\Models\Ulasan;
use App\Services\UlasanService;
use Illuminate\Http\RedirectResponse;

class UlasanController extends Controller
{
    public function __construct(private UlasanService $ulasanService) {}

    public function simpan(UlasanRequest $request, Destinasi $destinasi): RedirectResponse
    {
        $this->ulasanService->buatUlasan(
            pengguna: $request->user(),
            destinasi: $destinasi,
            data: $request->validated(),
        );

        return back()->with('sukses', 'Ulasan berhasil ditambahkan.');
    }

    public function perbarui(UlasanRequest $request, Ulasan $ulasan): RedirectResponse
    {
        $this->ulasanService->pastikanPemilikUlasan($request->user(), $ulasan);
        $this->ulasanService->perbaruiUlasan($ulasan, $request->validated());

        return back()->with('sukses', 'Ulasan berhasil diperbarui.');
    }

    public function hapus(Ulasan $ulasan): RedirectResponse
    {
        $this->ulasanService->pastikanPemilikUlasan(request()->user(), $ulasan);
        $this->ulasanService->hapusUlasan($ulasan);

        return back()->with('sukses', 'Ulasan berhasil dihapus.');
    }
}

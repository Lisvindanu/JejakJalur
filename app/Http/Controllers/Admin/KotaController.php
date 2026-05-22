<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\KotaRequest;
use App\Models\Kota;
use App\Services\KotaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KotaController extends Controller
{
    public function __construct(private KotaService $kotaService) {}

    public function indeks(Request $request): Response
    {
        return Inertia::render('Admin/Kota/Indeks', [
            'kota' => $this->kotaService->semuaKota($request->input('search')),
            'search' => $request->input('search'),
        ]);
    }

    public function buat(): Response
    {
        return Inertia::render('Admin/Kota/Formulir');
    }

    public function simpan(KotaRequest $request): RedirectResponse
    {
        $this->kotaService->buatKota($request->validated());

        return redirect()->route('admin.kota.indeks')->with('sukses', 'Kota berhasil ditambahkan.');
    }

    public function edit(Kota $kota): Response
    {
        return Inertia::render('Admin/Kota/Formulir', [
            'kota' => $kota,
        ]);
    }

    public function perbarui(KotaRequest $request, Kota $kota): RedirectResponse
    {
        $this->kotaService->perbaruiKota($kota, $request->validated());

        return redirect()->route('admin.kota.indeks')->with('sukses', 'Kota berhasil diperbarui.');
    }

    public function hapus(Kota $kota): RedirectResponse
    {
        $this->kotaService->hapusKota($kota);

        return redirect()->route('admin.kota.indeks')->with('sukses', 'Kota berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StasiunRequest;
use App\Models\Kota;
use App\Models\Stasiun;
use App\Services\StasiunService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StasiunController extends Controller
{
    public function __construct(
        private StasiunService $stasiunService,
    ) {}

    public function indeks(Request $request): Response
    {
        return Inertia::render('Admin/Stasiun/Indeks', [
            'stasiun' => $this->stasiunService->semuaStasiunDenganKota($request->input('search')),
            'search' => $request->input('search'),
        ]);
    }

    public function buat(): Response
    {
        return Inertia::render('Admin/Stasiun/Formulir', [
            'semuaKota' => $this->daftarKotaUntukDropdown(),
        ]);
    }

    public function simpan(StasiunRequest $request): RedirectResponse
    {
        $this->stasiunService->buatStasiun($request->validated());

        return redirect()->route('admin.stasiun.indeks')->with('sukses', 'Stasiun berhasil ditambahkan.');
    }

    public function edit(Stasiun $stasiun): Response
    {
        return Inertia::render('Admin/Stasiun/Formulir', [
            'stasiun' => $stasiun,
            'semuaKota' => $this->daftarKotaUntukDropdown(),
        ]);
    }

    public function perbarui(StasiunRequest $request, Stasiun $stasiun): RedirectResponse
    {
        $this->stasiunService->perbaruiStasiun($stasiun, $request->validated());

        return redirect()->route('admin.stasiun.indeks')->with('sukses', 'Stasiun berhasil diperbarui.');
    }

    public function hapus(Stasiun $stasiun): RedirectResponse
    {
        $this->stasiunService->hapusStasiun($stasiun);

        return redirect()->route('admin.stasiun.indeks')->with('sukses', 'Stasiun berhasil dihapus.');
    }

    private function daftarKotaUntukDropdown(): Collection
    {
        return Kota::orderBy('nama')->get(['id', 'nama']);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DestinasiRequest;
use App\Models\Destinasi;
use App\Models\Stasiun;
use App\Services\DestinasiService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DestinasiController extends Controller
{
    public function __construct(
        private DestinasiService $destinasiService,
    ) {}

    public function indeks(): Response
    {
        $filter = request()->only(['kata_kunci', 'stasiun_id', 'kategori']);

        return Inertia::render('Admin/Destinasi/Indeks', [
            'destinasi' => $this->destinasiService->daftarDestinasiTerfilter($filter),
            'semuaStasiun' => $this->daftarStasiunUntukDropdown(),
            'filter' => $filter,
        ]);
    }

    public function buat(): Response
    {
        return Inertia::render('Admin/Destinasi/Formulir', [
            'semuaStasiun' => $this->daftarStasiunUntukDropdown(),
        ]);
    }

    public function simpan(DestinasiRequest $request): RedirectResponse
    {
        $this->destinasiService->buatDestinasi(
            data: $request->safe()->except('foto'),
            foto: $request->file('foto'),
        );

        return redirect()->route('admin.destinasi.indeks')->with('sukses', 'Destinasi berhasil ditambahkan.');
    }

    public function edit(Destinasi $destinasi): Response
    {
        return Inertia::render('Admin/Destinasi/Formulir', [
            'destinasi' => $destinasi,
            'semuaStasiun' => $this->daftarStasiunUntukDropdown(),
        ]);
    }

    public function perbarui(DestinasiRequest $request, Destinasi $destinasi): RedirectResponse
    {
        $this->destinasiService->perbaruiDestinasi(
            destinasi: $destinasi,
            data: $request->safe()->except('foto'),
            fotoBaru: $request->file('foto'),
        );

        return redirect()->route('admin.destinasi.indeks')->with('sukses', 'Destinasi berhasil diperbarui.');
    }

    private function daftarStasiunUntukDropdown(): Collection
    {
        return Stasiun::with('kota:id,nama')
            ->orderBy('nama')
            ->get(['id', 'nama', 'kota_id']);
    }

    public function hapus(Destinasi $destinasi): RedirectResponse
    {
        $this->destinasiService->hapusDestinasi($destinasi);

        return redirect()->route('admin.destinasi.indeks')->with('sukses', 'Destinasi berhasil dihapus.');
    }

    public function verifikasi(Destinasi $destinasi): RedirectResponse
    {
        $destinasi->update(['is_verified' => ! $destinasi->is_verified]);

        $statusVerifikasi = $destinasi->is_verified ? 'diverifikasi' : 'dibatalkan verifikasinya';

        return back()->with('sukses', "Destinasi berhasil {$statusVerifikasi}.");
    }
}

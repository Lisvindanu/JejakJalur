<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DestinasiRequest;
use App\Models\AdminLog;
use App\Models\Destinasi;
use App\Models\DestinasiGaleri;
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
        $destinasi = $this->destinasiService->buatDestinasi(
            data: $request->safe()->except(['foto', 'galeri', 'hapus_galeri']),
            foto: $request->file('foto'),
        );

        if ($request->hasFile('galeri')) {
            $this->destinasiService->simpanGaleri($destinasi, $request->file('galeri'));
        }

        AdminLog::catat('buat_destinasi', Destinasi::class, $destinasi->id, "Buat destinasi: {$destinasi->nama}");

        return redirect()->route('admin.destinasi.indeks')->with('sukses', 'Destinasi berhasil ditambahkan.');
    }

    public function edit(Destinasi $destinasi): Response
    {
        $destinasi->load('galeri');

        return Inertia::render('Admin/Destinasi/Formulir', [
            'destinasi' => $destinasi,
            'semuaStasiun' => $this->daftarStasiunUntukDropdown(),
        ]);
    }

    public function perbarui(DestinasiRequest $request, Destinasi $destinasi): RedirectResponse
    {
        $this->destinasiService->perbaruiDestinasi(
            destinasi: $destinasi,
            data: $request->safe()->except(['foto', 'galeri', 'hapus_galeri']),
            fotoBaru: $request->file('foto'),
        );

        // Hapus foto galeri yang dipilih
        if ($request->has('hapus_galeri')) {
            DestinasiGaleri::whereIn('id', $request->input('hapus_galeri', []))
                ->where('destinasi_id', $destinasi->id)
                ->delete();
        }

        if ($request->hasFile('galeri')) {
            $this->destinasiService->simpanGaleri($destinasi, $request->file('galeri'));
        }

        AdminLog::catat('edit_destinasi', Destinasi::class, $destinasi->id, "Edit destinasi: {$destinasi->nama}");

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
        AdminLog::catat('hapus_destinasi', Destinasi::class, $destinasi->id, "Hapus destinasi: {$destinasi->nama}");
        $this->destinasiService->hapusDestinasi($destinasi);

        return redirect()->route('admin.destinasi.indeks')->with('sukses', 'Destinasi berhasil dihapus.');
    }

    public function verifikasi(Destinasi $destinasi): RedirectResponse
    {
        $destinasi->update(['is_verified' => ! $destinasi->is_verified]);
        $aksi = $destinasi->is_verified ? 'verifikasi_destinasi' : 'batalkan_verifikasi_destinasi';
        $status = $destinasi->is_verified ? 'diverifikasi' : 'dibatalkan verifikasinya';
        AdminLog::catat($aksi, Destinasi::class, $destinasi->id, "Destinasi {$destinasi->nama} {$status}");

        return back()->with('sukses', "Destinasi berhasil {$status}.");
    }
}

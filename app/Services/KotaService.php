<?php

namespace App\Services;

use App\Models\Kota;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class KotaService
{
    private const JUMLAH_PER_HALAMAN = 20;

    public function semuaKotaDenganStasiun(): Collection
    {
        $kotaList = Kota::with(['stasiun' => fn ($q) => $q->withCount('destinasi')])
            ->withCount('destinasi')
            ->orderBy('nama')
            ->get();

        // Derive jenis_layanan (antarkota/commuter/kcic) per stasiun dari koneksi_stasiun.tipe
        // sehingga frontend bisa filter mode tanpa hardcoded kode stasiun.
        $layananByStasiun = DB::table('koneksi_stasiun')
            ->select('stasiun_dari_id as stasiun_id', 'tipe')
            ->distinct()
            ->unionAll(
                DB::table('koneksi_stasiun')
                    ->select('stasiun_ke_id as stasiun_id', 'tipe')
                    ->distinct()
            )
            ->get()
            ->groupBy('stasiun_id')
            ->map(fn ($rows) => $rows->pluck('tipe')->unique()->values()->all());

        $kotaList->each(function ($kota) use ($layananByStasiun) {
            $kota->stasiun->each(function ($stasiun) use ($layananByStasiun) {
                $stasiun->jenis_layanan = $layananByStasiun->get($stasiun->id, []);
            });
        });

        return $kotaList;
    }

    public function semuaKota(?string $search = null): LengthAwarePaginator
    {
        return Kota::withCount('stasiun')
            ->when($search, fn ($q) => $q->where('nama', 'ILIKE', "%{$search}%"))
            ->orderBy('nama')
            ->paginate(self::JUMLAH_PER_HALAMAN)
            ->withQueryString();
    }

    public function buatKota(array $data): Kota
    {
        return Kota::create($data);
    }

    public function perbaruiKota(Kota $kota, array $data): Kota
    {
        $kota->update($data);

        return $kota->fresh();
    }

    public function hapusKota(Kota $kota): void
    {
        $kota->delete();
    }
}

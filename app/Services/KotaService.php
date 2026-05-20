<?php

namespace App\Services;

use App\Models\Kota;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class KotaService
{
    private const JUMLAH_PER_HALAMAN = 20;

    public function semuaKotaDenganStasiun(): Collection
    {
        return Kota::with(['stasiun' => fn ($q) => $q->withCount('destinasi')])
            ->withCount('destinasi')
            ->orderBy('nama')
            ->get();
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

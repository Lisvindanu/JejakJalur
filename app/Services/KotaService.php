<?php

namespace App\Services;

use App\Models\Kota;
use Illuminate\Database\Eloquent\Collection;

class KotaService
{
    public function semuaKotaDenganStasiun(): Collection
    {
        return Kota::with('stasiun')->orderBy('nama')->get();
    }

    public function semuaKota(): Collection
    {
        return Kota::withCount('stasiun')->orderBy('nama')->get();
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

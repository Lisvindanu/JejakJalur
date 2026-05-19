<?php

namespace App\Services;

use App\Models\Stasiun;
use Illuminate\Database\Eloquent\Collection;

class StasiunService
{
    public function semuaStasiunDenganKota(): Collection
    {
        return Stasiun::with('kota')->withCount('destinasi')->orderBy('nama')->get();
    }

    public function stasiunBerdasarkanKota(string $kotaId): Collection
    {
        return Stasiun::where('kota_id', $kotaId)->orderBy('nama')->get();
    }

    public function buatStasiun(array $data): Stasiun
    {
        return Stasiun::create($data);
    }

    public function perbaruiStasiun(Stasiun $stasiun, array $data): Stasiun
    {
        $stasiun->update($data);

        return $stasiun->fresh('kota');
    }

    public function hapusStasiun(Stasiun $stasiun): void
    {
        $stasiun->delete();
    }
}

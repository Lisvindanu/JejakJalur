<?php

namespace App\Services;

use App\Models\Stasiun;
use Illuminate\Database\Eloquent\Collection;

class StasiunService
{
    public function semuaStasiunDenganKota(?string $search = null): Collection
    {
        return Stasiun::with('kota')
            ->withCount('destinasi')
            ->when($search, fn ($q) => $q->where('nama', 'ILIKE', "%{$search}%")
                ->orWhereHas('kota', fn ($k) => $k->where('nama', 'ILIKE', "%{$search}%")))
            ->orderBy('nama')
            ->get();
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

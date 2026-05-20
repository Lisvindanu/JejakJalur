<?php

namespace App\Services;

use App\Models\Stasiun;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class StasiunService
{
    private const JUMLAH_PER_HALAMAN = 20;

    public function semuaStasiunDenganKota(?string $search = null): LengthAwarePaginator
    {
        return Stasiun::with('kota')
            ->withCount('destinasi')
            ->when($search, fn ($q) => $q->where('nama', 'ILIKE', "%{$search}%")
                ->orWhereHas('kota', fn ($k) => $k->where('nama', 'ILIKE', "%{$search}%")))
            ->orderBy('nama')
            ->paginate(self::JUMLAH_PER_HALAMAN)
            ->withQueryString();
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

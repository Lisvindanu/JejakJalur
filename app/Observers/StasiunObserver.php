<?php

namespace App\Observers;

use App\Models\Stasiun;
use App\Services\EmbeddingService;
use Illuminate\Support\Facades\DB;

class StasiunObserver
{
    public function __construct(private readonly EmbeddingService $embedding) {}

    public function saved(Stasiun $stasiun): void
    {
        if ($stasiun->wasChanged(['nama', 'kode_stasiun', 'kota_id']) || $stasiun->wasRecentlyCreated) {
            $stasiun->loadMissing('kota');
            $vec = $this->embedding->embed("Stasiun {$stasiun->nama} kode {$stasiun->kode_stasiun} di {$stasiun->kota?->nama}");
            if ($vec) {
                DB::table('stasiun')->where('id', $stasiun->id)->update(['embedding' => $this->embedding->toSql($vec)]);
            }
        }
    }
}

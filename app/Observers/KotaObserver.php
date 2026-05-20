<?php

namespace App\Observers;

use App\Models\Kota;
use App\Services\EmbeddingService;
use Illuminate\Support\Facades\DB;

class KotaObserver
{
    public function __construct(private readonly EmbeddingService $embedding) {}

    public function saved(Kota $kota): void
    {
        if ($kota->wasChanged('nama') || $kota->wasRecentlyCreated) {
            $vec = $this->embedding->embed("{$kota->nama} kota di Indonesia yang dilalui jalur kereta api");
            if ($vec) {
                DB::table('kota')->where('id', $kota->id)->update(['embedding' => $this->embedding->toSql($vec)]);
            }
        }
    }
}

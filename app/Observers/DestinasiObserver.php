<?php

namespace App\Observers;

use App\Models\Destinasi;
use App\Services\EmbeddingService;
use Illuminate\Support\Facades\DB;

class DestinasiObserver
{
    public function __construct(private readonly EmbeddingService $embedding) {}

    public function saved(Destinasi $destinasi): void
    {
        if ($destinasi->wasChanged(['nama', 'deskripsi', 'kategori', 'stasiun_id']) || $destinasi->wasRecentlyCreated) {
            $destinasi->loadMissing('stasiun.kota');
            $text = "{$destinasi->nama} {$destinasi->kategori} {$destinasi->deskripsi} dekat Stasiun {$destinasi->stasiun?->nama} {$destinasi->stasiun?->kota?->nama}";
            $vec = $this->embedding->embed($text);
            if ($vec) {
                DB::table('destinasi')->where('id', $destinasi->id)->update(['embedding' => $this->embedding->toSql($vec)]);
            }
        }
    }
}

<?php

namespace App\Observers;

use App\Models\Destinasi;
use App\Services\EmbeddingService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DestinasiObserver
{
    public function __construct(private readonly EmbeddingService $embedding) {}

    public function saved(Destinasi $destinasi): void
    {
        $destinasi->loadMissing('stasiun.kota');

        // Auto-geocode when alamat changes or newly created (and lat not manually set)
        if (($destinasi->wasChanged('alamat') || $destinasi->wasRecentlyCreated) && ! $destinasi->wasChanged('lat')) {
            $this->geocode($destinasi);
        }

        // Auto-embed when relevant fields change
        if ($destinasi->wasChanged(['nama', 'deskripsi', 'kategori', 'stasiun_id']) || $destinasi->wasRecentlyCreated) {
            $text = "{$destinasi->nama} {$destinasi->kategori} {$destinasi->deskripsi} dekat Stasiun {$destinasi->stasiun?->nama} {$destinasi->stasiun?->kota?->nama}";
            $vec = $this->embedding->embed($text);
            if ($vec) {
                DB::table('destinasi')->where('id', $destinasi->id)->update(['embedding' => $this->embedding->toSql($vec)]);
            }
        }
    }

    private function geocode(Destinasi $destinasi): void
    {
        $kota = $destinasi->stasiun?->kota?->nama ?? '';
        $query = trim("{$destinasi->alamat}, {$kota}, Indonesia");

        try {
            $response = Http::timeout(8)->withHeaders([
                'User-Agent' => 'JejakJalur/1.0 (jejakjalur@project-n.site)',
            ])->get('https://nominatim.openstreetmap.org/search', [
                'q' => $query,
                'format' => 'json',
                'limit' => 1,
                'countrycodes' => 'id',
            ]);

            $results = $response->json();

            if (! empty($results[0])) {
                DB::table('destinasi')->where('id', $destinasi->id)->update([
                    'lat' => (float) $results[0]['lat'],
                    'lng' => (float) $results[0]['lon'],
                ]);
            }
        } catch (\Throwable $e) {
            Log::warning("Auto-geocode gagal untuk {$destinasi->nama}: {$e->getMessage()}");
        }
    }
}

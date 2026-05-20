<?php

namespace App\Console\Commands;

use App\Models\Stasiun;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

#[Signature('jejak:geocode-stasiun {--force : Update koordinat yang sudah ada} {--kode= : Geocode satu stasiun berdasarkan kode (misal RCK)}')]
#[Description('Isi lat/lng stasiun yang kosong via Nominatim OSM')]
class GeocodeStasiun extends Command
{
    public function handle(): int
    {
        $query = Stasiun::with('kota');

        if ($this->option('kode')) {
            $query->where('kode_stasiun', strtoupper($this->option('kode')));
        } elseif (! $this->option('force')) {
            $query->whereNull('lat');
        }

        $stasiuns = $query->get();
        $total = $stasiuns->count();

        if ($total === 0) {
            $this->info('Semua stasiun sudah punya koordinat. Gunakan --force untuk update ulang.');

            return 0;
        }

        $this->info("Geocoding {$total} stasiun via Nominatim...");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $berhasil = 0;
        $gagal = 0;

        foreach ($stasiuns as $stasiun) {
            $kota = $stasiun->kota?->nama ?? '';
            $koordinat = null;

            // Coba dari spesifik ke umum: "Stasiun X, Kota" → "railway station X, Indonesia"
            $queries = array_filter([
                $kota ? "Stasiun {$stasiun->nama}, {$kota}, Indonesia" : null,
                "Stasiun {$stasiun->nama}, Indonesia",
                $kota ? "{$stasiun->nama} station, {$kota}, Indonesia" : null,
            ]);

            foreach ($queries as $q) {
                $koordinat = $this->nominatim($q, railway: true);
                if ($koordinat) {
                    break;
                }
                usleep(1_100_000);
            }

            if ($koordinat) {
                $stasiun->update(['lat' => $koordinat['lat'], 'lng' => $koordinat['lng']]);
                $berhasil++;
            } else {
                $gagal++;
            }

            $bar->advance();
            usleep(1_100_000);
        }

        $bar->finish();
        $this->newLine(2);

        $this->table(
            ['Status', 'Jumlah'],
            [
                ['Berhasil (Nominatim)', $berhasil],
                ['Gagal (tidak ditemukan)', $gagal],
            ]
        );

        $this->info('Selesai!');

        return 0;
    }

    private function nominatim(string $q, bool $railway = false): ?array
    {
        try {
            $params = [
                'q' => $q,
                'format' => 'json',
                'limit' => 5,
                'countrycodes' => 'id',
            ];

            $results = Http::timeout(10)->withHeaders([
                'User-Agent' => 'JejakJalur/1.0 (jejakjalur@project-n.site)',
                'Accept-Language' => 'id,en',
            ])->get('https://nominatim.openstreetmap.org/search', $params)->json();

            if (empty($results)) {
                return null;
            }

            // Prioritaskan result dengan type railway/station jika ada
            if ($railway) {
                foreach ($results as $r) {
                    if (in_array($r['type'] ?? '', ['station', 'halt', 'stop', 'railway'])) {
                        return ['lat' => (float) $r['lat'], 'lng' => (float) $r['lon']];
                    }
                }
            }

            return ['lat' => (float) $results[0]['lat'], 'lng' => (float) $results[0]['lon']];
        } catch (\Throwable $e) {
            Log::warning("Nominatim gagal [{$q}]: {$e->getMessage()}");
        }

        return null;
    }
}

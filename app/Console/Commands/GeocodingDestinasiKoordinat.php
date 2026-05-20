<?php

namespace App\Console\Commands;

use App\Models\Destinasi;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeocodingDestinasiKoordinat extends Command
{
    protected $signature = 'jejak:geocode-destinasi
                            {--force : Update koordinat yang sudah ada juga}
                            {--id= : Geocode satu destinasi berdasarkan UUID}';

    protected $description = 'Isi lat/lng destinasi via Nominatim (OSM geocoding), fallback ke koordinat stasiun terdekat';

    public function handle(): int
    {
        $query = Destinasi::with('stasiun');

        if ($this->option('id')) {
            $query->where('id', $this->option('id'));
        } elseif (! $this->option('force')) {
            $query->whereNull('lat')->orWhereNull('lng');
        }

        $destinasis = $query->get();
        $total = $destinasis->count();

        if ($total === 0) {
            $this->info('Semua destinasi sudah punya koordinat. Gunakan --force untuk update ulang.');

            return 0;
        }

        $this->info("Geocoding {$total} destinasi via Nominatim...");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $berhasilNominatim = 0;
        $fallbackStasiun = 0;
        $gagal = 0;

        foreach ($destinasis as $destinasi) {
            $koordinat = $this->geocodeNominatim($destinasi->nama, $destinasi->alamat);

            if ($koordinat) {
                $destinasi->update(['lat' => $koordinat['lat'], 'lng' => $koordinat['lng']]);
                $berhasilNominatim++;
            } elseif ($destinasi->stasiun?->lat && $destinasi->stasiun?->lng) {
                // Fallback: koordinat stasiun terkait (kurang presisi tapi lebih baik dari null)
                $destinasi->update([
                    'lat' => $destinasi->stasiun->lat,
                    'lng' => $destinasi->stasiun->lng,
                ]);
                $fallbackStasiun++;
            } else {
                $gagal++;
            }

            $bar->advance();
            usleep(1_100_000); // 1.1 detik — Nominatim rate limit (max 1 req/s)
        }

        $bar->finish();
        $this->newLine(2);

        $this->table(
            ['Metode', 'Jumlah'],
            [
                ['Nominatim (geocoding akurat)', $berhasilNominatim],
                ['Fallback koordinat stasiun', $fallbackStasiun],
                ['Gagal (tidak ditemukan)', $gagal],
            ]
        );

        $this->info('Selesai!');

        return 0;
    }

    /**
     * Cari koordinat via Nominatim dengan nama + alamat destinasi.
     *
     * @return array{lat: float, lng: float}|null
     */
    private function geocodeNominatim(string $nama, ?string $alamat): ?array
    {
        // Coba dua query: 1) nama+alamat, 2) hanya nama saja
        $queries = array_filter([
            $alamat ? "{$nama}, {$alamat}" : null,
            $nama,
        ]);

        foreach ($queries as $q) {
            $result = $this->nominatimRequest($q);
            if ($result) {
                return $result;
            }
            usleep(1_100_000);
        }

        return null;
    }

    private function nominatimRequest(string $q): ?array
    {
        try {
            $response = Http::timeout(10)->withHeaders([
                'User-Agent' => 'JejakJalur/1.0 (jejakjalur@project-n.site)',
                'Accept-Language' => 'id,en',
            ])->get('https://nominatim.openstreetmap.org/search', [
                'q' => $q,
                'format' => 'json',
                'limit' => 1,
                'countrycodes' => 'id',
            ]);

            $results = $response->json();

            if (! empty($results)) {
                return [
                    'lat' => (float) $results[0]['lat'],
                    'lng' => (float) $results[0]['lon'],
                ];
            }
        } catch (\Throwable $e) {
            Log::warning("Nominatim gagal [{$q}]: {$e->getMessage()}");
        }

        return null;
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Destinasi;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

#[Signature('jejak:geocode-destinasi {--force : Re-geocode even if lat/lng already set} {--id= : Geocode satu destinasi berdasarkan UUID}')]
#[Description('Geocode destinasi addresses via Nominatim (OpenStreetMap)')]
class GeocodeDestinasi extends Command
{
    public function handle(): int
    {
        $query = Destinasi::with('stasiun.kota');

        if ($this->option('id')) {
            $query->where('id', $this->option('id'));
        } elseif (! $this->option('force')) {
            $query->whereNull('lat');
        }

        $destinasi = $query->get();

        if ($destinasi->isEmpty()) {
            $this->info('Semua destinasi sudah punya koordinat.');

            return self::SUCCESS;
        }

        $this->info("Geocoding {$destinasi->count()} destinasi...");
        $bar = $this->output->createProgressBar($destinasi->count());
        $bar->start();

        $berhasil = 0;
        $gagal = 0;

        foreach ($destinasi as $dest) {
            $kota = $dest->stasiun?->kota?->nama ?? '';
            $koordinat = null;

            // Coba 3 query dari spesifik ke umum
            $queries = array_filter([
                $dest->alamat ? trim("{$dest->alamat}, {$kota}, Indonesia") : null,
                $kota ? trim("{$dest->nama}, {$kota}, Indonesia") : null,
                trim("{$dest->nama}, Indonesia"),
            ]);

            foreach ($queries as $q) {
                $koordinat = $this->nominatim($q);
                if ($koordinat) {
                    break;
                }
                usleep(1_100_000);
            }

            if ($koordinat) {
                $dest->update($koordinat);
                $berhasil++;
            } elseif ($dest->stasiun?->lat && $dest->stasiun?->lng) {
                $dest->update(['lat' => $dest->stasiun->lat, 'lng' => $dest->stasiun->lng]);
                $berhasil++;
            } else {
                $gagal++;
            }

            $bar->advance();
            usleep(1_100_000);
        }

        $bar->finish();
        $this->newLine();
        $this->info("Selesai: {$berhasil} berhasil, {$gagal} gagal.");

        return self::SUCCESS;
    }

    private function nominatim(string $q): ?array
    {
        try {
            $results = Http::timeout(10)->withHeaders([
                'User-Agent' => 'JejakJalur/1.0 (jejakjalur@project-n.site)',
            ])->get('https://nominatim.openstreetmap.org/search', [
                'q' => $q,
                'format' => 'json',
                'limit' => 1,
                'countrycodes' => 'id',
            ])->json();

            if (! empty($results[0])) {
                return ['lat' => (float) $results[0]['lat'], 'lng' => (float) $results[0]['lon']];
            }
        } catch (\Throwable $e) {
            Log::warning("Nominatim gagal [{$q}]: {$e->getMessage()}");
        }

        return null;
    }
}

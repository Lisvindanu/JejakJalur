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
            $query = trim("{$dest->alamat}, {$kota}, Indonesia");

            try {
                $response = Http::withHeaders([
                    'User-Agent' => 'JejakJalur/1.0 (jejakjalur@project-n.site)',
                ])->get('https://nominatim.openstreetmap.org/search', [
                    'q' => $query,
                    'format' => 'json',
                    'limit' => 1,
                    'countrycodes' => 'id',
                ]);

                $results = $response->json();

                if (! empty($results[0])) {
                    $dest->update([
                        'lat' => (float) $results[0]['lat'],
                        'lng' => (float) $results[0]['lon'],
                    ]);
                    $berhasil++;
                } else {
                    $gagal++;
                }
            } catch (\Throwable $e) {
                Log::warning("Geocode gagal untuk {$dest->nama}: {$e->getMessage()}");
                $gagal++;
            }

            $bar->advance();
            // Nominatim rate limit: 1 req/sec
            usleep(1_100_000);
        }

        $bar->finish();
        $this->newLine();
        $this->info("Selesai: {$berhasil} berhasil, {$gagal} gagal.");

        return self::SUCCESS;
    }
}

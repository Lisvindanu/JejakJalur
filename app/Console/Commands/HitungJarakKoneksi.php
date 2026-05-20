<?php

namespace App\Console\Commands;

use App\Models\KoneksiStasiun;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class HitungJarakKoneksi extends Command
{
    protected $signature = 'jejak:hitung-jarak-koneksi
                            {--force : Update jarak_km yang sudah ada juga}
                            {--validate : Tandai koneksi yang tidak ada jalur rel (via Overpass)}
                            {--dari= : Filter kode stasiun asal (misal BD)}
                            {--ke= : Filter kode stasiun tujuan (misal GMR)}';

    protected $description = 'Hitung jarak_km tiap koneksi stasiun via Overpass API (rail geometry) + fallback Haversine';

    // Faktor koreksi: rel tidak lurus sempurna, rata-rata 1.15× dari straight-line
    private const FAKTOR_REL = 1.15;

    public function handle(): int
    {
        $query = KoneksiStasiun::with(['stasiunDari', 'stasiunKe']);

        if (! $this->option('force')) {
            $query->whereNull('jarak_km');
        }

        if ($dari = $this->option('dari')) {
            $query->whereHas('stasiunDari', fn ($q) => $q->where('kode_stasiun', strtoupper($dari)));
        }

        if ($ke = $this->option('ke')) {
            $query->whereHas('stasiunKe', fn ($q) => $q->where('kode_stasiun', strtoupper($ke)));
        }

        $koneksis = $query->get();
        $total = $koneksis->count();

        if ($total === 0) {
            $this->info('Semua koneksi sudah punya jarak_km. Gunakan --force untuk update ulang.');

            return 0;
        }

        $this->info("Menghitung jarak untuk {$total} koneksi...");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $berhasilOverpass = 0;
        $berhasilHaversine = 0;
        $tidakAdaKoordinat = 0;
        $invalidRel = [];

        foreach ($koneksis as $koneksi) {
            $dari = $koneksi->stasiunDari;
            $ke = $koneksi->stasiunKe;

            // Skip jika salah satu stasiun tidak punya koordinat
            if (! $dari->lat || ! $dari->lng || ! $ke->lat || ! $ke->lng) {
                $tidakAdaKoordinat++;
                $bar->advance();

                continue;
            }

            $lat1 = (float) $dari->lat;
            $lng1 = (float) $dari->lng;
            $lat2 = (float) $ke->lat;
            $lng2 = (float) $ke->lng;

            // 1. Coba Overpass API
            $jarakOverpass = $this->hitungJarakOverpass($lat1, $lng1, $lat2, $lng2);

            if ($jarakOverpass !== null) {
                $koneksi->update(['jarak_km' => round($jarakOverpass, 2)]);
                $berhasilOverpass++;
            } else {
                // 2. Fallback: Haversine × faktor koreksi rel
                $jarakHaversine = $this->haversine($lat1, $lng1, $lat2, $lng2) * self::FAKTOR_REL;
                $koneksi->update(['jarak_km' => round($jarakHaversine, 2)]);
                $berhasilHaversine++;

                // Jika --validate: catat koneksi yang tidak ada rail geometry di Overpass
                if ($this->option('validate') && $jarakHaversine > 0) {
                    $jarakLurus = $this->haversine($lat1, $lng1, $lat2, $lng2);
                    if ($jarakLurus < 200) { // Hanya yang jarak < 200 km (koneksi langsung wajar)
                        $adaRel = $this->cekAdaRel($lat1, $lng1, $lat2, $lng2);
                        if (! $adaRel) {
                            $invalidRel[] = "{$dari->kode_stasiun}({$dari->nama}) → {$ke->kode_stasiun}({$ke->nama}) [{$jarakLurus} km lurus]";
                        }
                    }
                }
            }

            $bar->advance();
            usleep(1_100_000); // 1.1 detik — Overpass rate limit
        }

        $bar->finish();
        $this->newLine(2);

        $this->table(
            ['Metode', 'Jumlah'],
            [
                ['Overpass (rail geometry)', $berhasilOverpass],
                ['Haversine × '.self::FAKTOR_REL.' (fallback)', $berhasilHaversine],
                ['Skip (koordinat kosong)', $tidakAdaKoordinat],
            ]
        );

        if (! empty($invalidRel)) {
            $this->newLine();
            $this->warn('Koneksi berikut tidak ditemukan jalur rel di Overpass (perlu dicek manual/Tavily):');
            foreach ($invalidRel as $item) {
                $this->line("  - {$item}");
            }
        }

        $this->info('Selesai!');

        return 0;
    }

    /**
     * Query Overpass API untuk mendapatkan geometri rel antar dua titik.
     * Bangun mini-graph dari way nodes, cari jalur terpendek, hitung panjangnya.
     */
    private function hitungJarakOverpass(float $lat1, float $lng1, float $lat2, float $lng2): ?float
    {
        $padding = 0.05; // ~5.5 km
        $minLat = min($lat1, $lat2) - $padding;
        $maxLat = max($lat1, $lat2) + $padding;
        $minLng = min($lng1, $lng2) - $padding;
        $maxLng = max($lng1, $lng2) + $padding;

        $overpassQuery = "[out:json][timeout:25];way[\"railway\"~\"rail|light_rail\"]({$minLat},{$minLng},{$maxLat},{$maxLng});out geom;";

        try {
            $response = Http::timeout(28)->withHeaders([
                'User-Agent' => 'JejakJalur/1.0 (jejakjalur@project-n.site)',
            ])->get('https://overpass-api.de/api/interpreter', ['data' => $overpassQuery]);

            if (! $response->successful()) {
                return null;
            }

            $ways = $response->json('elements') ?? [];
            if (empty($ways)) {
                return null;
            }

            // Build mini-graph: node key → [lat, lng], edges
            $nodeCoords = [];
            $adjacency = [];

            foreach ($ways as $way) {
                $geometry = $way['geometry'] ?? [];
                if (count($geometry) < 2) {
                    continue;
                }

                for ($i = 0; $i < count($geometry) - 1; $i++) {
                    $p1 = $geometry[$i];
                    $p2 = $geometry[$i + 1];
                    $k1 = round($p1['lat'], 6).','.round($p1['lon'], 6);
                    $k2 = round($p2['lat'], 6).','.round($p2['lon'], 6);

                    $nodeCoords[$k1] = [$p1['lat'], $p1['lon']];
                    $nodeCoords[$k2] = [$p2['lat'], $p2['lon']];

                    $d = $this->haversine($p1['lat'], $p1['lon'], $p2['lat'], $p2['lon']);
                    $adjacency[$k1][$k2] = $d;
                    $adjacency[$k2][$k1] = $d;
                }
            }

            if (empty($nodeCoords)) {
                return null;
            }

            // Cari node terdekat ke masing-masing stasiun
            $startKey = $this->nearestNode($nodeCoords, $lat1, $lng1);
            $endKey = $this->nearestNode($nodeCoords, $lat2, $lng2);

            if (! $startKey || ! $endKey || $startKey === $endKey) {
                return null;
            }

            // Dijkstra pada mini-graph
            return $this->dijkstra($adjacency, $startKey, $endKey);

        } catch (\Throwable $e) {
            Log::warning("Overpass gagal [{$lat1},{$lng1}→{$lat2},{$lng2}]: {$e->getMessage()}");

            return null;
        }
    }

    /**
     * Cek apakah ada way railway di bounding box (untuk --validate).
     */
    private function cekAdaRel(float $lat1, float $lng1, float $lat2, float $lng2): bool
    {
        $padding = 0.03;
        $minLat = min($lat1, $lat2) - $padding;
        $maxLat = max($lat1, $lat2) + $padding;
        $minLng = min($lng1, $lng2) - $padding;
        $maxLng = max($lng1, $lng2) + $padding;

        $q = "[out:json][timeout:10];way[\"railway\"~\"rail|light_rail\"]({$minLat},{$minLng},{$maxLat},{$maxLng});out count;";

        try {
            $response = Http::timeout(12)->withHeaders([
                'User-Agent' => 'JejakJalur/1.0 (jejakjalur@project-n.site)',
            ])->get('https://overpass-api.de/api/interpreter', ['data' => $q]);

            return ($response->json('elements.0.tags.total') ?? 0) > 0;
        } catch (\Throwable) {
            return true; // Assume valid jika Overpass gagal
        }
    }

    private function nearestNode(array $nodeCoords, float $lat, float $lng): ?string
    {
        $best = null;
        $bestDist = INF;

        foreach ($nodeCoords as $key => [$nLat, $nLng]) {
            $d = $this->haversine($lat, $lng, $nLat, $nLng);
            if ($d < $bestDist) {
                $bestDist = $d;
                $best = $key;
            }
        }

        return $best;
    }

    private function dijkstra(array $adjacency, string $start, string $end): ?float
    {
        $dist = [$start => 0.0];
        $visited = [];
        $pq = [[$start, 0.0]];

        while (! empty($pq)) {
            usort($pq, fn ($a, $b) => $a[1] <=> $b[1]);
            [$current, $currentDist] = array_shift($pq);

            if (isset($visited[$current])) {
                continue;
            }
            $visited[$current] = true;

            if ($current === $end) {
                return $currentDist;
            }

            foreach ($adjacency[$current] ?? [] as $neighbor => $weight) {
                if (isset($visited[$neighbor])) {
                    continue;
                }
                $newDist = $currentDist + $weight;
                if (! isset($dist[$neighbor]) || $newDist < $dist[$neighbor]) {
                    $dist[$neighbor] = $newDist;
                    $pq[] = [$neighbor, $newDist];
                }
            }
        }

        return null; // Tidak ada path
    }

    private function haversine(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $R = 6371;
        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);
        $a = sin($dLat / 2) ** 2
            + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) ** 2;

        return $R * 2 * atan2(sqrt($a), sqrt(1 - $a));
    }
}

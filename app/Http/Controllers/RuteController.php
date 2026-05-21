<?php

namespace App\Http\Controllers;

use App\Models\KoneksiStasiun;
use App\Models\Stasiun;
use App\Services\KotaService;
use App\Services\StasiunService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RuteController extends Controller
{
    public function __construct(
        private KotaService $kotaService,
        private StasiunService $stasiunService,
    ) {}

    public function tampilkan(): Response
    {
        return Inertia::render('Rute/Tampilkan', [
            'semuaKota' => $this->kotaService->semuaKotaDenganStasiun(),
        ]);
    }

    public function cariStasiun(Request $request): JsonResponse
    {
        $query = $request->string('q')->toString();

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $stasiun = $this->stasiunService->semuaStasiunDenganKota()
            ->filter(fn ($s) => str_contains(strtolower($s->nama), strtolower($query)))
            ->values();

        return response()->json($stasiun);
    }

    public function cariRute(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'dari' => ['required', 'string', 'uuid'],
            'ke' => ['required', 'string', 'uuid'],
        ]);

        $dariId = $validated['dari'];
        $keId = $validated['ke'];

        if ($dariId === $keId) {
            return response()->json(['error' => 'Stasiun asal dan tujuan harus berbeda.'], 422);
        }

        // Build undirected weighted adjacency list (kedua arah)
        // Load station coords so null jarak_km can fall back to Haversine instead of 1
        $stasiunCoords = Stasiun::whereNotNull('lat')->whereNotNull('lng')
            ->pluck(null, 'id')
            ->map(fn ($s) => [(float) $s->lat, (float) $s->lng]);

        $koneksi = KoneksiStasiun::select('stasiun_dari_id', 'stasiun_ke_id', 'jarak_km')->get();
        $graph = [];
        foreach ($koneksi as $k) {
            if ($k->jarak_km !== null) {
                $w = (float) $k->jarak_km;
            } elseif (isset($stasiunCoords[$k->stasiun_dari_id], $stasiunCoords[$k->stasiun_ke_id])) {
                [$lat1, $lng1] = $stasiunCoords[$k->stasiun_dari_id];
                [$lat2, $lng2] = $stasiunCoords[$k->stasiun_ke_id];
                $w = $this->haversine($lat1, $lng1, $lat2, $lng2) * 1.15;
            } else {
                continue; // skip koneksi tanpa koordinat sama sekali
            }
            $graph[$k->stasiun_dari_id][$k->stasiun_ke_id] = $w;
            $graph[$k->stasiun_ke_id][$k->stasiun_dari_id] = $w;
        }

        // Dijkstra — jalur terpendek berdasarkan jarak (bukan jumlah hop)
        $dist = [$dariId => 0.0];
        $parent = [$dariId => null];
        $visited = [];
        $pq = [[$dariId, 0.0]];
        $found = false;

        while (! empty($pq)) {
            usort($pq, fn ($a, $b) => $a[1] <=> $b[1]);
            [$current, $currentDist] = array_shift($pq);

            if (isset($visited[$current])) {
                continue;
            }
            $visited[$current] = true;

            if ($current === $keId) {
                $found = true;
                break;
            }

            foreach ($graph[$current] ?? [] as $neighbor => $weight) {
                if (isset($visited[$neighbor])) {
                    continue;
                }
                $newDist = $currentDist + $weight;
                if (! isset($dist[$neighbor]) || $newDist < $dist[$neighbor]) {
                    $dist[$neighbor] = $newDist;
                    $parent[$neighbor] = $current;
                    $pq[] = [$neighbor, $newDist];
                }
            }
        }

        if (! $found) {
            return response()->json(['error' => 'Rute tidak ditemukan antara kedua stasiun ini.'], 404);
        }

        // Reconstruct path from goal to start, then reverse
        $path = [];
        $node = $keId;
        while ($node !== null) {
            $path[] = $node;
            $node = $parent[$node];
        }
        $path = array_reverse($path);

        // Load full station data in path order
        $stasiunMap = Stasiun::with('kota')
            ->withCount('destinasi')
            ->whereIn('id', $path)
            ->get()
            ->keyBy('id');

        $rute = array_values(array_map(fn (string $id) => $stasiunMap[$id], $path));

        return response()->json(['rute' => $rute]);
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

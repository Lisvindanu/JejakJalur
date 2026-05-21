<?php

namespace App\Http\Controllers;

use App\Models\KoneksiStasiun;
use App\Models\Stasiun;
use App\Services\KotaService;
use App\Services\StasiunService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RuteController extends Controller
{
    /** @var string[] */
    private const KRL_KODES = [
        // Bogor line
        'JAKK', 'JAY', 'MGB', 'SW', 'JUA', 'GDD', 'CKI', 'MRI', 'TEB', 'CW',
        'DRN', 'PSMB', 'PSM', 'TNT', 'LNA', 'UP', 'UI', 'DPB', 'DP', 'CTA',
        'BJD', 'CLT', 'BOO',
        // Nambo branch
        'PDRG', 'CBN', 'NMO',
        // Cikarang line
        'JNG', 'BKS', 'KRI', 'KLD', 'KLDB', 'LMB', 'TB', 'CKR',
        // Rangkasbitung line
        'KBY', 'PLM', 'PDR', 'SRP', 'PRP', 'TJ', 'TGS', 'MJA', 'CTR', 'RK',
        // Tangerang line
        'DU', 'GGL', 'RW', 'PI', 'BPR', 'THL', 'TNG',
        // Tanjung Priok
        'KPB',
    ];

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
            'mode' => ['nullable', 'string', 'in:antarkota,commuter,kcic'],
        ]);

        $dariId = $validated['dari'];
        $keId = $validated['ke'];
        $mode = $validated['mode'] ?? 'antarkota';

        if ($dariId === $keId) {
            return response()->json(['error' => 'Stasiun asal dan tujuan harus berbeda.'], 422);
        }

        $koneksi = $this->loadKoneksi($mode, $dariId, $keId);

        if ($koneksi->isEmpty()) {
            return response()->json(['error' => 'Tidak ada koneksi tersedia untuk mode ini.'], 404);
        }

        // Load station coords so null jarak_km can fall back to Haversine
        $stasiunCoords = Stasiun::whereNotNull('lat')->whereNotNull('lng')
            ->get(['id', 'lat', 'lng'])
            ->keyBy('id')
            ->map(fn ($s) => [(float) $s->lat, (float) $s->lng]);

        $graph = [];
        foreach ($koneksi as $k) {
            if ($k->jarak_km !== null) {
                $w = (float) $k->jarak_km;
            } elseif (isset($stasiunCoords[$k->stasiun_dari_id], $stasiunCoords[$k->stasiun_ke_id])) {
                [$lat1, $lng1] = $stasiunCoords[$k->stasiun_dari_id];
                [$lat2, $lng2] = $stasiunCoords[$k->stasiun_ke_id];
                $w = $this->haversine($lat1, $lng1, $lat2, $lng2) * 1.15;
            } else {
                $w = 50.0;
            }
            $graph[$k->stasiun_dari_id][$k->stasiun_ke_id] = min($w, $graph[$k->stasiun_dari_id][$k->stasiun_ke_id] ?? PHP_FLOAT_MAX);
            $graph[$k->stasiun_ke_id][$k->stasiun_dari_id] = min($w, $graph[$k->stasiun_ke_id][$k->stasiun_dari_id] ?? PHP_FLOAT_MAX);
        }

        // Dijkstra
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

        $path = [];
        $node = $keId;
        while ($node !== null) {
            $path[] = $node;
            $node = $parent[$node];
        }
        $path = array_reverse($path);

        $stasiunMap = Stasiun::with('kota')
            ->withCount('destinasi')
            ->whereIn('id', $path)
            ->get()
            ->keyBy('id');

        $rute = array_values(array_map(fn (string $id) => $stasiunMap[$id], $path));

        return response()->json(['rute' => $rute]);
    }

    /**
     * @return Collection<int, KoneksiStasiun>
     */
    private function loadKoneksi(string $mode, string $dariId, string $keId): Collection
    {
        $cols = ['stasiun_dari_id', 'stasiun_ke_id', 'jarak_km'];

        if ($mode === 'kcic') {
            return KoneksiStasiun::where('tipe', 'kcic')->get($cols);
        }

        if ($mode === 'commuter') {
            $krlIds = Stasiun::whereIn('kode_stasiun', self::KRL_KODES)->pluck('id')->all();

            return KoneksiStasiun::whereIn('stasiun_dari_id', $krlIds)
                ->whereIn('stasiun_ke_id', $krlIds)
                ->get($cols);
        }

        // antarkota (default)
        return KoneksiStasiun::where('tipe', 'antarkota')->get($cols);
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

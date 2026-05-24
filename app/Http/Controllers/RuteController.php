<?php

namespace App\Http\Controllers;

use App\Models\Destinasi;
use App\Models\KoneksiStasiun;
use App\Models\Stasiun;
use App\Services\JejakAiService;
use App\Services\KotaService;
use App\Services\StasiunService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RuteController extends Controller
{
    public function __construct(
        private KotaService $kotaService,
        private StasiunService $stasiunService,
        private JejakAiService $aiService,
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
            'waypoints' => ['nullable', 'array', 'max:5'],
            'waypoints.*' => ['string', 'uuid'],
            'mode' => ['nullable', 'string', 'in:antarkota,commuter,kcic'],
        ]);

        $mode = $validated['mode'] ?? 'antarkota';
        $stops = array_merge(
            [$validated['dari']],
            $validated['waypoints'] ?? [],
            [$validated['ke']]
        );

        // Pastikan tidak ada stasiun duplikat berturutan
        $stops = array_values(array_unique($stops));
        if (count($stops) < 2) {
            return response()->json(['error' => 'Stasiun asal dan tujuan harus berbeda.'], 422);
        }

        $koneksi = $this->loadKoneksi($mode);

        if ($koneksi->isEmpty()) {
            return response()->json(['error' => 'Tidak ada koneksi tersedia untuk mode ini.'], 404);
        }

        // Load station coords so null jarak_km can fall back to Haversine
        $stasiunCoords = Stasiun::whereNotNull('lat')->whereNotNull('lng')
            ->get(['id', 'lat', 'lng'])
            ->keyBy('id')
            ->map(fn ($s) => [(float) $s->lat, (float) $s->lng]);

        // Build graph + edge map once, reuse for all legs
        $edgeMap = [];
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

            $geom = $k->geometry;
            if (is_string($geom)) {
                $geom = json_decode($geom, true);
            }
            $forwardKey = $k->stasiun_dari_id.'|'.$k->stasiun_ke_id;
            $reverseKey = $k->stasiun_ke_id.'|'.$k->stasiun_dari_id;
            $edgeMap[$forwardKey] = ['jarak_km' => $w, 'geometry' => $geom, 'reversed' => false];
            if (! isset($edgeMap[$reverseKey])) {
                $edgeMap[$reverseKey] = ['jarak_km' => $w, 'geometry' => $geom, 'reversed' => true];
            }
        }

        // Run Dijkstra for each consecutive leg and concatenate
        $fullPath = [];
        $allSegments = [];

        for ($leg = 0; $leg < count($stops) - 1; $leg++) {
            $fromId = $stops[$leg];
            $toId = $stops[$leg + 1];

            $path = $this->dijkstra($graph, $fromId, $toId);
            if ($path === null) {
                return response()->json(['error' => 'Rute tidak ditemukan antara dua stasiun yang kamu pilih.'], 404);
            }

            // Remove duplicate junction node between legs
            if (! empty($fullPath)) {
                $path = array_slice($path, 1);
            }
            $fullPath = array_merge($fullPath, $path);

            // Build segments for this leg
            for ($i = 0; $i < count($path) - 1; $i++) {
                $from = $path[$i];
                $to = $path[$i + 1];
                $edge = $edgeMap[$from.'|'.$to] ?? null;
                $geometry = $edge['geometry'] ?? null;

                if ($geometry !== null && ($edge['reversed'] ?? false) && isset($geometry['coordinates'])) {
                    $geometry['coordinates'] = array_reverse($geometry['coordinates']);
                }

                $allSegments[] = [
                    'dari_id' => $from,
                    'ke_id' => $to,
                    'jarak_km' => $edge['jarak_km'] ?? null,
                    'geometry' => $geometry,
                ];
            }
        }

        $stasiunMap = Stasiun::with('kota')
            ->withCount('destinasi')
            ->whereIn('id', $fullPath)
            ->get()
            ->keyBy('id');

        $rute = array_values(array_map(fn (string $id) => $stasiunMap[$id], $fullPath));

        return response()->json(['rute' => $rute, 'segments' => $allSegments]);
    }

    /**
     * Run Dijkstra from $fromId to $toId using $graph.
     * Returns path as array of station IDs, or null if not found.
     *
     * @param  array<string, array<string, float>>  $graph
     * @return string[]|null
     */
    private function dijkstra(array $graph, string $fromId, string $toId): ?array
    {
        $dist = [$fromId => 0.0];
        $parent = [$fromId => null];
        $visited = [];
        $pq = [[$fromId, 0.0]];
        $found = false;

        while (! empty($pq)) {
            usort($pq, fn ($a, $b) => $a[1] <=> $b[1]);
            [$current, $currentDist] = array_shift($pq);

            if (isset($visited[$current])) {
                continue;
            }
            $visited[$current] = true;

            if ($current === $toId) {
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
            return null;
        }

        $path = [];
        $node = $toId;
        while ($node !== null) {
            $path[] = $node;
            $node = $parent[$node];
        }

        return array_reverse($path);
    }

    public function ringkasanAi(Request $request): JsonResponse
    {
        $request->validate([
            'dari_nama' => 'required|string|max:100',
            'ke_nama' => 'required|string|max:100',
            'jumlah_stasiun' => 'required|integer|min:2',
            'jarak_km' => 'required|numeric|min:0',
            'estimasi_menit' => 'required|integer|min:0',
            'mode' => 'required|string|in:antarkota,commuter,kcic',
        ]);

        $modeLabel = match ($request->input('mode')) {
            'commuter' => 'KRL Commuter',
            'kcic' => 'Kereta Cepat (KCIC)',
            default => 'Kereta Antarkota',
        };

        $jam = intdiv($request->integer('estimasi_menit'), 60);
        $menit = $request->integer('estimasi_menit') % 60;
        $durasiTeks = $jam > 0 ? "{$jam} jam {$menit} menit" : "{$menit} menit";

        try {
            $ringkasan = $this->aiService->ringkasanPerjalanan(
                $request->input('dari_nama'),
                $request->input('ke_nama'),
                $modeLabel,
                $request->integer('jumlah_stasiun'),
                (float) $request->input('jarak_km'),
                $durasiTeks,
            );
        } catch (\RuntimeException) {
            return response()->json(['error' => 'AI tidak tersedia saat ini.'], 503);
        }

        return response()->json(['ringkasan' => $ringkasan]);
    }

    public function destinasiStasiun(string $stasiunId): JsonResponse
    {
        $destinasi = Destinasi::with('stasiun.kota')
            ->where('stasiun_id', $stasiunId)
            ->verified()
            ->orderByDesc('rating')
            ->limit(20)
            ->get();

        return response()->json($destinasi);
    }

    /**
     * @return Collection<int, KoneksiStasiun>
     */
    private function loadKoneksi(string $mode): Collection
    {
        // Filter berdasarkan koneksi_stasiun.tipe — source of truth dari DB.
        return KoneksiStasiun::where('tipe', $mode)
            ->get(['stasiun_dari_id', 'stasiun_ke_id', 'jarak_km', 'geometry']);
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

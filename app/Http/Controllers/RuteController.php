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

        // Build adjacency list
        $koneksi = KoneksiStasiun::select('stasiun_dari_id', 'stasiun_ke_id')->get();
        $graph = [];
        foreach ($koneksi as $k) {
            $graph[$k->stasiun_dari_id][] = $k->stasiun_ke_id;
        }

        // BFS with parent tracking
        $parent = [$dariId => null];
        $queue = [$dariId];
        $found = false;

        while (! empty($queue)) {
            $current = array_shift($queue);

            if ($current === $keId) {
                $found = true;
                break;
            }

            foreach ($graph[$current] ?? [] as $neighbor) {
                if (! array_key_exists($neighbor, $parent)) {
                    $parent[$neighbor] = $current;
                    $queue[] = $neighbor;
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
}

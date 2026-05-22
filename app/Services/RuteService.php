<?php

namespace App\Services;

use App\Models\KoneksiStasiun;
use App\Models\Stasiun;
use Illuminate\Database\Eloquent\Collection;

class RuteService
{
    /**
     * Cari rute terpendek (jarak km) antara dua stasiun menggunakan Dijkstra.
     *
     * @return array<Stasiun>|null Urutan stasiun dari asal ke tujuan, atau null jika tidak ada jalur.
     */
    public function cariRute(string $dariId, string $keId): ?array
    {
        if ($dariId === $keId) {
            $stasiun = Stasiun::with('kota')->find($dariId);

            return $stasiun ? [$stasiun] : null;
        }

        // Muat semua edge ke dalam adjacency list berbobot (in-memory graph)
        $adjacency = [];
        KoneksiStasiun::select('stasiun_dari_id', 'stasiun_ke_id', 'jarak_km')
            ->each(function (KoneksiStasiun $edge) use (&$adjacency) {
                $adjacency[$edge->stasiun_dari_id][] = [
                    'ke' => $edge->stasiun_ke_id,
                    'jarak' => (float) ($edge->jarak_km ?? 50.0),
                ];
            });

        // Dijkstra dengan SplPriorityQueue (min-heap via negasi prioritas)
        $distances = [$dariId => 0.0];
        $parent = [$dariId => null];
        $finalized = [];

        $pq = new \SplPriorityQueue;
        $pq->setExtractFlags(\SplPriorityQueue::EXTR_DATA);
        $pq->insert($dariId, 0);

        while (! $pq->isEmpty()) {
            $current = $pq->extract();

            if (isset($finalized[$current])) {
                continue;
            }
            $finalized[$current] = true;

            if ($current === $keId) {
                return $this->rekonstruksiJalur($parent, $keId);
            }

            foreach ($adjacency[$current] ?? [] as $edge) {
                $next = $edge['ke'];
                $newDist = $distances[$current] + $edge['jarak'];

                if (! isset($distances[$next]) || $newDist < $distances[$next]) {
                    $distances[$next] = $newDist;
                    $parent[$next] = $current;
                    $pq->insert($next, -$newDist);
                }
            }
        }

        return null;
    }

    /**
     * Cari stasiun berdasarkan nama atau kode untuk autocomplete.
     */
    public function cariStasiun(string $query): Collection
    {
        return Stasiun::with('kota')
            ->where(function ($q) use ($query) {
                $q->whereRaw('nama ILIKE ?', ["%{$query}%"])
                    ->orWhereRaw('kode_stasiun ILIKE ?', ["%{$query}%"]);
            })
            ->orderBy('nama')
            ->limit(10)
            ->get();
    }

    /**
     * @param  array<string, string|null>  $parent  node => parent map
     * @return array<Stasiun>
     */
    private function rekonstruksiJalur(array $parent, string $tujuanId): array
    {
        $jalur = [];
        $node = $tujuanId;

        while ($node !== null) {
            $jalur[] = $node;
            $node = $parent[$node];
        }

        $jalur = array_reverse($jalur);

        $stasiuns = Stasiun::with('kota')
            ->whereIn('id', $jalur)
            ->get()
            ->keyBy('id');

        return array_map(fn (string $id) => $stasiuns[$id], $jalur);
    }
}

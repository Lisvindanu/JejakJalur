<?php

namespace App\Services;

use App\Models\KoneksiStasiun;
use App\Models\Stasiun;
use Illuminate\Database\Eloquent\Collection;

class RuteService
{
    /**
     * Cari rute terpendek (hop) antara dua stasiun menggunakan BFS.
     *
     * @return array<Stasiun>|null Urutan stasiun dari asal ke tujuan, atau null jika tidak ada jalur.
     */
    public function cariRute(string $dariId, string $keId): ?array
    {
        if ($dariId === $keId) {
            $stasiun = Stasiun::with('kota')->find($dariId);

            return $stasiun ? [$stasiun] : null;
        }

        // Muat semua edge ke dalam adjacency list (in-memory graph)
        $adjacency = [];
        KoneksiStasiun::select('stasiun_dari_id', 'stasiun_ke_id')
            ->each(function (KoneksiStasiun $edge) use (&$adjacency) {
                $adjacency[$edge->stasiun_dari_id][] = $edge->stasiun_ke_id;
            });

        // BFS dengan pelacak parent untuk rekonstruksi jalur
        $visited = [$dariId => null]; // node => parent
        $queue = [$dariId];

        while (! empty($queue)) {
            $current = array_shift($queue);

            if ($current === $keId) {
                return $this->rekonstruksiJalur($visited, $keId);
            }

            foreach ($adjacency[$current] ?? [] as $tetangga) {
                if (! array_key_exists($tetangga, $visited)) {
                    $visited[$tetangga] = $current;
                    $queue[] = $tetangga;
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
     * @param  array<string, string|null>  $visited  node => parent map
     * @return array<Stasiun>
     */
    private function rekonstruksiJalur(array $visited, string $tujuanId): array
    {
        $jalur = [];
        $node = $tujuanId;

        while ($node !== null) {
            $jalur[] = $node;
            $node = $visited[$node];
        }

        $jalur = array_reverse($jalur);

        $stasiuns = Stasiun::with('kota')
            ->whereIn('id', $jalur)
            ->get()
            ->keyBy('id');

        return array_map(fn (string $id) => $stasiuns[$id], $jalur);
    }
}

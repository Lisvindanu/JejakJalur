<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Populate kolom geometry untuk semua KCIC edges dari
     * file database/data/kcic_geometry.json.
     *
     * Data ini hasil Dijkstra di OSM railway graph (Overpass API,
     * way wikidata=Q85886652 KCIC Jakarta-Bandung), bukan straight-line.
     * Tiap edge punya ratusan koordinat yang ikut lengkungan rel asli.
     *
     * Idempotent: hanya UPDATE row yang geometry-nya masih NULL,
     * supaya rerun tidak nimpa data manual yang sudah lebih akurat.
     *
     * IMPORTANT: Migration ini harus dijalankan SETELAH
     * 2026_05_21_200703_fix_krl_kodes — karena data pakai kode 'HLM'
     * (post-rename), bukan 'HAL'.
     */
    public function up(): void
    {
        $path = database_path('data/kcic_geometry.json');
        if (! is_file($path)) {
            return;
        }

        $records = json_decode((string) file_get_contents($path), true);
        if (! is_array($records)) {
            return;
        }

        foreach ($records as $row) {
            $dari = $row['dari'] ?? null;
            $ke = $row['ke'] ?? null;
            $tipe = $row['tipe'] ?? 'kcic';
            $geom = $row['geometry'] ?? null;
            if (! $dari || ! $ke || ! $geom) {
                continue;
            }

            DB::statement(
                'UPDATE koneksi_stasiun ks
                 SET geometry = ?::jsonb
                 FROM stasiun s1, stasiun s2
                 WHERE ks.stasiun_dari_id = s1.id
                   AND ks.stasiun_ke_id   = s2.id
                   AND s1.kode_stasiun = ?
                   AND s2.kode_stasiun = ?
                   AND ks.tipe = ?
                   AND ks.geometry IS NULL',
                [json_encode($geom), $dari, $ke, $tipe]
            );
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

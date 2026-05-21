<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Basmi kode gaib Tangerang (THL, TAK) + seal chain Jakarta Kota loop.
     *
     * THL ("Tanahtinggi", lat -6.1735) duplikat dengan TTI ("Tanah Tinggi",
     * lat -6.1724) — selisih 1.2 km, sama-sama merepresentasikan stasiun
     * Tanah Tinggi di jalur Tangerang. TAK ("Tamankota", lat -6.1750)
     * duplikat dengan TKO ("Taman Kota", lat -6.1578).
     *
     * Akibat duplikasi: Dijkstra commuter TNG → DU lewat TNG → THL → TAK
     * → GGL → DU (4 hop, melompati Batuceper-Poris-Kalideres-Rawabuaya-
     * Bojongindah-Pesing). Stasiun THL dan TAK sendiri tidak dihapus
     * (mungkin masih dipakai data lain), tetapi semua edge commuter yang
     * memakai THL/TAK dihapus supaya Dijkstra lewat chain resmi PT KAI.
     *
     * Tambahan: INSERT idempotent dua chain commuter resmi (no-op kalau
     * sudah ada) untuk eksplisit menjamin urutan stasiun benar.
     *
     * Test #1 chain (Jakarta Kota loop):
     *   MRI ↔ CKI ↔ GDD ↔ JUA ↔ SW ↔ MGB ↔ JAY ↔ JAKK
     *
     * Test #5 chain (Tangerang line):
     *   TNG ↔ TTI ↔ BPR ↔ PI ↔ KDS ↔ RW ↔ BOI ↔ TKO ↔ PSG ↔ GGL ↔ DU
     *   (User menyebut KLD = Kalideres dan RWB = Rawabuaya; di DB
     *   kode resmi PT KAI-nya KDS dan RW. KLD = Klender, RWB = Rawabebek,
     *   dua-duanya bukan di jalur Tangerang.)
     */
    public function up(): void
    {
        // ── 1. Hapus semua commuter edge yang melibatkan THL / TAK ────────
        DB::statement(
            "DELETE FROM koneksi_stasiun ks
             USING stasiun s1, stasiun s2
             WHERE ks.stasiun_dari_id = s1.id
               AND ks.stasiun_ke_id   = s2.id
               AND ks.tipe = 'commuter'
               AND (s1.kode_stasiun IN ('THL', 'TAK')
                 OR s2.kode_stasiun IN ('THL', 'TAK'))"
        );

        // ── 2. Seal chain commuter (idempotent insert) ────────────────────
        // Bucket calibration jarak rel (sama dengan KoneksiStasiunSeeder)
        $bucketKm = '
            ROUND((
                (6371 * 2 * asin(sqrt(
                    sin(radians((sb.lat - sa.lat)/2))^2 +
                    cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                    sin(radians((sb.lng - sa.lng)/2))^2
                ))) * CASE
                    WHEN (6371 * 2 * asin(sqrt(
                        sin(radians((sb.lat - sa.lat)/2))^2 +
                        cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                        sin(radians((sb.lng - sa.lng)/2))^2
                    ))) < 5  THEN 1.3169
                    WHEN (6371 * 2 * asin(sqrt(
                        sin(radians((sb.lat - sa.lat)/2))^2 +
                        cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                        sin(radians((sb.lng - sa.lng)/2))^2
                    ))) < 20 THEN 1.1182
                    WHEN (6371 * 2 * asin(sqrt(
                        sin(radians((sb.lat - sa.lat)/2))^2 +
                        cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                        sin(radians((sb.lng - sa.lng)/2))^2
                    ))) < 50 THEN 1.0886
                    ELSE 0.9395
                END
            )::numeric, 1)
        ';

        $chains = [
            // Jakarta Kota loop (Test #1)
            ['MRI', 'CKI', 'GDD', 'JUA', 'SW', 'MGB', 'JAY', 'JAKK'],

            // Tangerang line (Test #5) — pakai kode resmi PT KAI
            ['TNG', 'TTI', 'BPR', 'PI', 'KDS', 'RW', 'BOI', 'TKO', 'PSG', 'GGL', 'DU'],
        ];

        foreach ($chains as $chain) {
            for ($i = 0; $i < count($chain) - 1; $i++) {
                $a = $chain[$i];
                $b = $chain[$i + 1];
                foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                    DB::statement(
                        "INSERT INTO koneksi_stasiun
                            (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                         SELECT sa.id, sb.id, {$bucketKm}, 'commuter', NOW(), NOW()
                         FROM stasiun sa, stasiun sb
                         WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                           AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                         ON CONFLICT (stasiun_dari_id, stasiun_ke_id, tipe) DO NOTHING",
                        [$from, $to]
                    );
                }
            }
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback. Reinsert kode gaib THL/TAK akan
        // membuka kembali bug Dijkstra Tangerang line.
    }
};

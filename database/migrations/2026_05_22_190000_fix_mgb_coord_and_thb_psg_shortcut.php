<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * v4 — Sisa cleanup setelah PR #89.
     *
     * Test 50-case KRL v3 (post-PR#89) menemukan 2 bug terakhir:
     *
     *  1. Test #1 BOO→JAKK masih lewat MRI-BNC-DU-AK-KPB-JAKK (18.8km)
     *     bukan Jalur Layang Kota MRI-CKI-GDD-JUA-SW-MGB-JAY-JAKK
     *     (22.2km dengan bobot saat ini). Akar masalah: koordinat
     *     Stasiun Mangga Besar (MGB) di DB salah:
     *         DB    : lat=-6.1890, lng=106.8230 (di Gondangdia area)
     *         Real  : lat=-6.14969, lng=106.82698 (sumber: mapcarta.com)
     *     Akibatnya bobot SW↔MGB = 5.50km dan MGB↔JAY = 5.90km
     *     (over-inflate). Setelah fix coord:
     *         SW↔MGB ≈ 0.2km (haversine real)
     *         MGB↔JAY ≈ 1.0km
     *     Total chain Jalur Layang Kota turun ke ~12.4km — Dijkstra
     *     bakal pilih ini, bukan detour Duri.
     *
     *  2. Test #36 MRI→BSH (97.1km) lewat THB→PSG direct (5.7km),
     *     padahal di realita PT KCI rute Tanahabang→Pesing harus
     *     transit Duri→Grogol→Pesing (sumber: jadwal-kereta.com).
     *     THB↔PSG di DB adalah rogue shortcut. Hapus supaya Dijkstra
     *     pakai chain resmi THB-DU-GGL-PSG (9.3km, sudah lengkap di DB).
     */
    public function up(): void
    {
        // ── 1. Fix koordinat MGB (Manggabesar) ────────────────────────────
        DB::update(
            "UPDATE stasiun
             SET lat = ?, lng = ?, updated_at = NOW()
             WHERE kode_stasiun = 'MGB'",
            [-6.14969, 106.82698]
        );

        // ── 2. Recalc edge SW↔MGB dan MGB↔JAY pakai coord baru ────────────
        // Hapus dulu supaya bisa di-reinsert dengan bobot baru.
        DB::statement(
            "DELETE FROM koneksi_stasiun ks
             USING stasiun s1, stasiun s2
             WHERE ks.stasiun_dari_id = s1.id
               AND ks.stasiun_ke_id   = s2.id
               AND ks.tipe = 'commuter'
               AND ((s1.kode_stasiun = 'MGB' AND s2.kode_stasiun IN ('SW','JAY'))
                 OR (s2.kode_stasiun = 'MGB' AND s1.kode_stasiun IN ('SW','JAY')))"
        );

        // Bucket calibration (sama dengan KoneksiStasiunSeeder)
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

        $pairs = [
            ['SW', 'MGB'], ['MGB', 'SW'],
            ['MGB', 'JAY'], ['JAY', 'MGB'],
        ];

        foreach ($pairs as [$from, $to]) {
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

        // ── 3. Hapus rogue shortcut THB↔PSG ───────────────────────────────
        DB::statement(
            "DELETE FROM koneksi_stasiun ks
             USING stasiun s1, stasiun s2
             WHERE ks.stasiun_dari_id = s1.id
               AND ks.stasiun_ke_id   = s2.id
               AND ks.tipe = 'commuter'
               AND ((s1.kode_stasiun = 'THB' AND s2.kode_stasiun = 'PSG')
                 OR (s1.kode_stasiun = 'PSG' AND s2.kode_stasiun = 'THB'))"
        );
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback. Reinsert shortcut / koordinat
        // lama yang salah akan membuka kembali bug Dijkstra.
    }
};

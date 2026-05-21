<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Hidupkan KRL daerah (luar Jabodetabek) di tipe='commuter'.
     *
     * Test #46-50 di test suite 50-case KRL menghasilkan 404 karena
     * koneksi_stasiun tipe='commuter' belum berisi jalur lokal Jogja-Solo,
     * Bandung Raya, Walahar (Purwakarta-Padalarang), dan Surabaya commuter.
     *
     * Chain yang ditambahkan (semua tipe='commuter', bidirectional,
     * idempotent ON CONFLICT DO NOTHING):
     *
     *   KRL Yogya-Solo (Test #46-47):
     *     YK ↔ LPN ↔ MGW ↔ BBN ↔ KT ↔ PWS ↔ SLO
     *
     *   Commuter Bandung Raya (Test #48):
     *     PDL ↔ CMI ↔ CMD ↔ CIR ↔ BD ↔ CTH ↔ KAC ↔ GDB ↔ CMK ↔ RCK ↔ HRP ↔ CCL
     *
     *   Commuter Walahar / Purwakarta-Padalarang (Test #49):
     *     PWK ↔ CA ↔ RH ↔ SKT ↔ PDL
     *
     *   Commuter Supas Jatim (Test #50):
     *     SGU ↔ WO ↔ WR ↔ GDG ↔ SDA
     *
     * Bobot pakai bucket calibration (sama dengan KoneksiStasiunSeeder).
     */
    public function up(): void
    {
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
            ['YK', 'LPN', 'MGW', 'BBN', 'KT', 'PWS', 'SLO'],
            ['PDL', 'CMI', 'CMD', 'CIR', 'BD', 'CTH', 'KAC', 'GDB', 'CMK', 'RCK', 'HRP', 'CCL'],
            ['PWK', 'CA', 'RH', 'SKT', 'PDL'],
            ['SGU', 'WO', 'WR', 'GDG', 'SDA'],
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
        $pairs = [
            ['YK', 'LPN'], ['LPN', 'MGW'], ['MGW', 'BBN'], ['BBN', 'KT'], ['KT', 'PWS'], ['PWS', 'SLO'],
            ['PDL', 'CMI'], ['CMI', 'CMD'], ['CMD', 'CIR'], ['CIR', 'BD'], ['BD', 'CTH'], ['CTH', 'KAC'],
            ['KAC', 'GDB'], ['GDB', 'CMK'], ['CMK', 'RCK'], ['RCK', 'HRP'], ['HRP', 'CCL'],
            ['PWK', 'CA'], ['CA', 'RH'], ['RH', 'SKT'], ['SKT', 'PDL'],
            ['SGU', 'WO'], ['WO', 'WR'], ['WR', 'GDG'], ['GDG', 'SDA'],
        ];

        foreach ($pairs as [$a, $b]) {
            DB::statement(
                "DELETE FROM koneksi_stasiun ks
                 USING stasiun s1, stasiun s2
                 WHERE ks.stasiun_dari_id = s1.id
                   AND ks.stasiun_ke_id   = s2.id
                   AND ks.tipe = 'commuter'
                   AND ((s1.kode_stasiun = ? AND s2.kode_stasiun = ?)
                     OR (s1.kode_stasiun = ? AND s2.kode_stasiun = ?))",
                [$a, $b, $b, $a]
            );
        }
    }
};

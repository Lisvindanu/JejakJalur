<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Lengkapi topology KRL Jabodetabek + KCIC supaya semua route punya jalur.
     *
     * Approach (post-mortem dari migration 130001-130004 yang di-revert):
     * - JANGAN inline Haversine ×1.15 → pakai bucket calibration sama dengan seeder
     *   (×1.3169 <5km, ×1.1182 <20km, ×1.0886 <50km, ×0.9395 ≥50km).
     * - KCIC pakai jarak real terdokumentasi (KCIC.co.id), bukan Haversine.
     * - Koordinat KRWW + BNIC dari Positionstack geocoder (verified).
     * - Schema change: unique constraint dari (dari, ke) jadi (dari, ke, tipe)
     *   supaya pair stasiun yang sama bisa punya tipe berbeda
     *   (BKS-BKT bisa 'antarkota' DAN 'commuter' karena rel sama dipakai KA + KRL).
     * - ON CONFLICT DO NOTHING agar idempotent.
     */
    public function up(): void
    {
        // ── 0. Relax unique constraint: (dari, ke) → (dari, ke, tipe) ─────────
        DB::statement('ALTER TABLE koneksi_stasiun DROP CONSTRAINT IF EXISTS koneksi_stasiun_stasiun_dari_id_stasiun_ke_id_unique');
        DB::statement('ALTER TABLE koneksi_stasiun DROP CONSTRAINT IF EXISTS koneksi_stasiun_pair_tipe_unique');
        DB::statement('ALTER TABLE koneksi_stasiun ADD CONSTRAINT koneksi_stasiun_pair_tipe_unique UNIQUE (stasiun_dari_id, stasiun_ke_id, tipe)');

        $karawang = DB::table('kota')->where('nama', 'Karawang')->value('id');
        $jakpus = DB::table('kota')->where('nama', 'Jakarta Pusat')->value('id');

        // ── 1. Insert stasiun yang missing (verified via Positionstack) ───────
        // KRWW Karawang Whoosh — geocode confidence 1
        $krwwExists = DB::table('stasiun')
            ->where('nama', 'Karawang Whoosh')
            ->where('kota_id', $karawang)
            ->exists();
        if (! $krwwExists) {
            DB::statement(
                'INSERT INTO stasiun (id, kota_id, nama, kode_stasiun, lat, lng, created_at, updated_at)
                 VALUES (gen_random_uuid(), ?, ?, ?, ?, ?, NOW(), NOW())
                 ON CONFLICT DO NOTHING',
                [$karawang, 'Karawang Whoosh', 'KRWW', -6.364836, 107.218946]
            );
        }

        // BNIC BNI City / Sudirman Baru — geocode confidence 1
        $bnicExists = DB::table('stasiun')
            ->where('nama', 'BNI City')
            ->where('kota_id', $jakpus)
            ->exists();
        if (! $bnicExists) {
            DB::statement(
                'INSERT INTO stasiun (id, kota_id, nama, kode_stasiun, lat, lng, created_at, updated_at)
                 VALUES (gen_random_uuid(), ?, ?, ?, ?, ?, NOW(), NOW())
                 ON CONFLICT DO NOTHING',
                [$jakpus, 'BNI City', 'BNIC', -6.201652, 106.819765]
            );
        }

        // ── 2. KRL Jabodetabek commuter lines (detailed, no shortcut) ─────────
        $krlLines = [
            // Bogor Line: GMR → MRI → Bogor
            ['GMR', 'JNG', 'MRI', 'CW', 'DRN', 'PSM', 'PSMB', 'LNA', 'TNT',
                'CTA', 'DPB', 'DP', 'BJD', 'CLT', 'BOO'],

            // Bekasi Line: PSE → JNG → Bekasi → Lemahabang (full chain)
            ['PSE', 'JNG', 'KLD', 'BUA', 'KLDB', 'CUK', 'RWB', 'KRI',
                'BKS', 'BKT', 'TB', 'CIT', 'CKR', 'LMB'],

            // Tanah Abang Line: MRI → Duri
            ['MRI', 'SUD', 'KAT', 'THB', 'DU'],

            // Jakarta Kota Loop: MRI → JAKK → KPB
            ['MRI', 'CKI', 'GDD', 'JUA', 'SW', 'MGB', 'JAY', 'JAKK', 'KPB'],

            // Duri-Angke: DU → AK → KPB
            ['DU', 'AK', 'KPB'],

            // Tangerang Line: DU → TNG
            ['DU', 'RW', 'BOI', 'GGL', 'TAK', 'THL', 'TNG'],

            // Rangkasbitung Line: THB → PLM → SDM → RK
            ['THB', 'PSG', 'PLM', 'KBY', 'SDM', 'JMU', 'PDR', 'RU', 'SRP',
                'CSA', 'CKY', 'DAR', 'PRP', 'TJ', 'MJA', 'CTR', 'RK'],

            // Sudirman branch: MRI ↔ SDM (Karet/Sudirman direct)
            ['MRI', 'SUD', 'KAT', 'THB', 'PLM'],

            // Tanjung Priok: KPB → TPK
            ['KPB', 'POO', 'SAO', 'AC', 'TPK'],

            // Nambo: CIT → NMO
            ['CIT', 'CKR', 'KDH', 'NMO'],

            // Bandara Soekarno-Hatta: MRI → BNIC → DU → BPR → BSH
            ['MRI', 'BNIC', 'DU', 'BPR', 'BSH'],
        ];

        $bucketSql = '
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

        foreach ($krlLines as $line) {
            $line = array_values(array_unique($line));
            for ($i = 0; $i < count($line) - 1; $i++) {
                $a = $line[$i];
                $b = $line[$i + 1];
                foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                    DB::statement("
                        INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                        SELECT sa.id, sb.id, {$bucketSql}, ?, NOW(), NOW()
                        FROM stasiun sa, stasiun sb
                        WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                          AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                        ON CONFLICT (stasiun_dari_id, stasiun_ke_id, tipe) DO NOTHING
                    ", ['commuter', $from, $to]);
                }
            }
        }

        // ── 3. KCIC: HAL ↔ KRWW ↔ PDL ↔ TGLL (PDL-TGLL existing) ─────────────
        // Jarak real KCIC dari kcic.co.id
        $kcicEdges = [
            ['HAL', 'KRWW', 41.4],
            ['KRWW', 'PDL', 88.5],
        ];
        foreach ($kcicEdges as [$a, $b, $jarak]) {
            foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                DB::statement('
                    INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                    SELECT sa.id, sb.id, ?, ?, NOW(), NOW()
                    FROM stasiun sa, stasiun sb
                    WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                    ON CONFLICT (stasiun_dari_id, stasiun_ke_id, tipe) DO NOTHING
                ', [$jarak, 'kcic', $from, $to]);
            }
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

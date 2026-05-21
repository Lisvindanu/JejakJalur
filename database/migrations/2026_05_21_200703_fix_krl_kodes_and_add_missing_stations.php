<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Best-practice fix untuk topology KRL Jabodetabek + region:
     *
     * 1. Standardize kode_stasiun ke kode RESMI PT KAI:
     *    - HAL → HLM (Halim KCIC)
     *    - BNIC → BNC (BNI City / Sudirman Baru)
     *
     * 2. Fix koordinat POK Pondokjati — DB salah taruh di Jawa Timur
     *    (-7.44, 112.70), padahal stasiun ada di Matraman Jakarta Timur
     *    (-6.2045, 106.8617).
     *
     * 3. Insert 9 stasiun KRL/commuter yang missing, pakai kode resmi
     *    (bukan kode dari xlsx kompetisi yang banyak salah):
     *    - KAT Karet, KDS Kalideres, RU Rawa Buntu, KRAI Karangsari Garut
     *    - POC Pondok Cina, MTR Matraman
     *    - TKO Taman Kota, TTI Tanah Tinggi, GRT Garut
     *    Note: Maja (MJA), Tenjo (TJ), Bekasi Timur (BKT) already exist
     *    in DB dengan kode existing — topology pakai kode tersebut.
     *
     * 4. Tambah commuter edges untuk topology lengkap:
     *    - Cikarang Loop full: ... BUA-KLD-JNG-MTR-MRI-SUD-BNC-KAT-THB-DU-AK-KPB-RJW-KMO-PSE-GST-KMT-POK-JNG (loop)
     *    - Tangerang Line full: DU-GGL-PSG-TKO-BOI-RW-KDS-PI-BPR-TTI-TNG
     *    - Rangkasbitung Line full: ... SDM-RU-SRP-CSK-CC-PRP-CJT-DAR-TEJ-TGS-CKY-MJ-CTR-RK
     *    - Bogor Line ext: ... UI-POC-DPB ... CTA-BJD ... + Nambo: CTA-PDRG-CBN-NMO
     *    - Garut Line: NG-LBJ-LL-KRAI-LO-CB-GRT
     *
     * Sumber koordinat:
     * - Wikipedia Indonesia per stasiun (verified)
     * - xlsx kompetisi (koordinat OK, walaupun beberapa kode salah)
     *
     * Distance pakai bucket-calibrated Haversine (sama dengan
     * migration 140000 + KoneksiStasiunSeeder).
     */
    public function up(): void
    {
        // ── 1. Rename HAL → HLM, BNIC → BNC ─────────────────────────────────
        DB::statement("UPDATE stasiun SET kode_stasiun = 'HLM' WHERE kode_stasiun = 'HAL'");
        DB::statement("UPDATE stasiun SET kode_stasiun = 'BNC' WHERE kode_stasiun = 'BNIC'");

        // ── 2. Fix POK koordinat (Jakarta Timur, BUKAN Jawa Timur) ───────────
        $jaktim = DB::table('kota')->where('nama', 'Jakarta Timur')->value('id');
        DB::statement(
            'UPDATE stasiun SET lat = ?, lng = ?, kota_id = ? WHERE kode_stasiun = ?',
            [-6.2045, 106.8617, $jaktim, 'POK']
        );

        // ── 3. Insert 12 stasiun missing ─────────────────────────────────────
        $kota = DB::table('kota')->whereIn('nama', [
            'Jakarta Pusat', 'Jakarta Timur', 'Jakarta Barat', 'Jakarta Utara', 'Jakarta Selatan',
            'Bekasi', 'Tangerang', 'Tangerang Selatan', 'Depok', 'Bogor', 'Lebak', 'Garut',
        ])->pluck('id', 'nama');

        $newStations = [
            // kode resmi, nama, kota, lat, lng
            ['KAT',  'Karet',        'Jakarta Pusat',     -6.2001, 106.8164],
            ['KDS',  'Kalideres',    'Jakarta Barat',     -6.1541, 106.6991],
            ['RU',   'Rawa Buntu',   'Tangerang Selatan', -6.3216, 106.6711],
            ['KRAI', 'Karangsari',   'Garut',             -7.1214, 107.9411],
            ['POC',  'Pondok Cina',  'Depok',             -6.3691, 106.8316],
            ['MTR',  'Matraman',     'Jakarta Timur',     -6.2124, 106.8579],
            ['TKO',  'Taman Kota',   'Jakarta Barat',     -6.1578, 106.7531],
            ['TTI',  'Tanah Tinggi', 'Tangerang',         -6.1724, 106.6511],
            ['GRT',  'Garut',        'Garut',             -7.1844, 107.9014],
        ];

        foreach ($newStations as [$kode, $nama, $kotaNama, $lat, $lng]) {
            if (! isset($kota[$kotaNama])) {
                continue;
            }
            $exists = DB::table('stasiun')->where('kode_stasiun', $kode)->exists();
            if ($exists) {
                continue;
            }
            DB::statement(
                'INSERT INTO stasiun (id, kota_id, nama, kode_stasiun, lat, lng, created_at, updated_at)
                 VALUES (gen_random_uuid(), ?, ?, ?, ?, ?, NOW(), NOW())
                 ON CONFLICT DO NOTHING',
                [$kota[$kotaNama], $nama, $kode, $lat, $lng]
            );
        }

        // ── 4. Commuter koneksi (bucket-calibrated Haversine, idempotent) ───
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

        // Topology lengkap KRL Jabodetabek + Garut (kode RESMI)
        $lines = [
            // Bogor Line: JAKK → MRI → BOO (full chain dengan UI, POC)
            ['JAKK', 'JAY', 'MGB', 'SW', 'JUA', 'GDD', 'CKI', 'MRI', 'TEB', 'CW',
                'DRN', 'PSMB', 'PSM', 'TNT', 'LNA', 'UP', 'UI', 'POC', 'DPB', 'DP',
                'CTA', 'BJD', 'CLT', 'BOO'],

            // Nambo branch: CTA → NMO
            ['CTA', 'PDRG', 'CBN', 'NMO'],

            // Cikarang Loop: CKR → JNG → MRI → THB → DU → KPB → POK → JNG (loop)
            ['CKR', 'MTM', 'CIT', 'TB', 'BKT', 'BKS', 'KRI', 'CUK', 'KLDB', 'BUA',
                'KLD', 'JNG', 'MTR', 'MRI', 'SUD', 'BNC', 'KAT', 'THB', 'DU', 'AK',
                'KPB', 'RJW', 'KMO', 'PSE', 'GST', 'KMT', 'POK', 'JNG'],

            // Rangkasbitung Line: THB → RK
            ['THB', 'PLM', 'KBY', 'PDR', 'JMU', 'SDM', 'RU', 'SRP', 'CSK', 'CC',
                'PRP', 'CJT', 'DAR', 'TJ', 'TGS', 'CKY', 'MJA', 'CTR', 'RK'],

            // Tangerang Line: DU → TNG
            ['DU', 'GGL', 'PSG', 'TKO', 'BOI', 'RW', 'KDS', 'PI', 'BPR', 'TTI', 'TNG'],

            // Tanjung Priok: JAKK → TPK
            ['JAKK', 'KPB', 'AC', 'TPK'],

            // Lokal Garut: NG → GRT
            ['NG', 'LBJ', 'LL', 'KRAI', 'LO', 'CB', 'GRT'],
        ];

        foreach ($lines as $line) {
            // dedupe konsekutif (loop punya JNG di awal & akhir cabang)
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

        // Cikarang Loop closure: POK → JNG (sudah ada di array, tapi pastikan)
        // dedupe array_unique sudah handle, tapi kalau JNG di-skip karena duplicate,
        // tambahkan manual closure edge POK-JNG
        foreach ([['POK', 'JNG'], ['JNG', 'POK']] as [$from, $to]) {
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

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

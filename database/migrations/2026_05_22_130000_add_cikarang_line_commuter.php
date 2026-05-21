<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * KRL Cikarang Line: JNG <-> KLD <-> BUA <-> KLDB <-> CUK <-> KRI <-> BKS <-> BKT <-> TB <-> CIT <-> MTM <-> CKR
     *
     * Insert MTM (Metland Telagamurni).
     * Hapus shortcut commuter yang bikin Dijkstra skip stasiun (TB-LMB, BKS-TB, KLD-KLDB, LMB-CKR).
     * Tambahkan missing commuter edges sepanjang jalur.
     */
    public function up(): void
    {
        $bekasiKotaId = DB::table('kota')->where('nama', 'Bekasi')->value('id');

        // 1. Insert MTM Metland Telagamurni (jika belum ada)
        DB::table('stasiun')->updateOrInsert(
            ['kode_stasiun' => 'MTM'],
            [
                'kota_id' => $bekasiKotaId,
                'nama' => 'Metland Telagamurni',
                'lat' => -6.2575,
                'lng' => 107.1198,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        // 2. Hapus shortcut yang bikin Dijkstra skip stasiun (commuter only)
        $shortcuts = [
            ['LMB', 'TB'],   // LMB bukan di Cikarang Line
            ['TB', 'LMB'],
            ['LMB', 'CKR'],
            ['CKR', 'LMB'],
            ['BKS', 'TB'],   // Skip BKT
            ['TB', 'BKS'],
            ['KLD', 'KLDB'], // Skip BUA
            ['KLDB', 'KLD'],
        ];
        foreach ($shortcuts as [$a, $b]) {
            DB::statement("
                DELETE FROM koneksi_stasiun
                WHERE tipe = 'commuter'
                  AND stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
                  AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
            ", [$a, $b]);
        }

        // 3. Tambah commuter edges utk Cikarang Line (bidirectional)
        $edges = [
            ['CKR', 'MTM'],
            ['MTM', 'CIT'],
            ['CIT', 'TB'],
            ['TB', 'BKT'],
            ['BKT', 'BKS'],
            ['KLD', 'BUA'],
            ['BUA', 'KLDB'],
            ['JNG', 'KLD'],  // pastiin ada (existing 4.3 mungkin shortcut, pakai jarak real Haversine)
        ];

        foreach ($edges as [$a, $b]) {
            foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                DB::statement('
                    INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                    SELECT sa.id, sb.id,
                           ROUND((6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) * 1.15)::numeric, 1),
                           ?,
                           NOW(), NOW()
                    FROM stasiun sa, stasiun sb
                    WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                      AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                    ON CONFLICT (stasiun_dari_id, stasiun_ke_id) DO NOTHING
                ', ['commuter', $from, $to]);
            }
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

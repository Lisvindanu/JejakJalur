<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Tambah edges commuter yang missing — supaya stasiun KRL bisa
        // didetect dari DB (koneksi_stasiun.tipe='commuter') alih-alih
        // hardcoded list di RuteController + frontend.
        //
        // POK (Pondokjati) di-skip karena coord-nya salah (di Surabaya).
        // Tidak modifikasi row existing, hanya INSERT baru.
        $commuterEdges = [
            // Cikarang Loop Line: Jakarta Kota -> Kampung Bandan -> Rajawali ->
            // Kemayoran -> Pasar Senen -> Gang Sentiong -> Kramat -> Jatinegara
            ['KPB', 'RJW'],
            ['RJW', 'KMO'],
            ['KMO', 'PSE'],
            ['PSE', 'GST'],
            ['GST', 'KMT'],
            ['KMT', 'JNG'],

            // Terminal Bogor line (commuter belum nyambung sampai akhir)
            ['DPB', 'DP'],
            ['DP', 'CTA'],
            ['BJD', 'CLT'],
            ['CLT', 'BOO'],

            // Terminal Cikarang line
            ['BKS', 'TB'],
            ['TB', 'LMB'],
            ['LMB', 'CKR'],

            // Terminal Rangkasbitung line
            ['MJA', 'CTR'],
            ['CTR', 'RK'],
        ];

        foreach ($commuterEdges as [$a, $b]) {
            foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                DB::statement('
                    INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                    SELECT sa.id, sb.id,
                           ROUND((6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) * CASE
                               WHEN 6371 * 2 * asin(sqrt(
                                   sin(radians((sb.lat - sa.lat)/2))^2 +
                                   cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                                   sin(radians((sb.lng - sa.lng)/2))^2
                               )) < 5  THEN 1.3169
                               WHEN 6371 * 2 * asin(sqrt(
                                   sin(radians((sb.lat - sa.lat)/2))^2 +
                                   cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                                   sin(radians((sb.lng - sa.lng)/2))^2
                               )) < 20 THEN 1.1182
                               ELSE 1.0886
                           END)::numeric, 1),
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

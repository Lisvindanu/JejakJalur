<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * KRL Jakarta Half Loop (North loop antara JNG dan KPB via Pasar Senen/Kemayoran):
     *   JNG <-> POK <-> KMT <-> GST <-> PSE <-> KMO <-> RJW <-> KPB <-> AC <-> TPK
     *
     * POK (Pondokjati) dan AC (Ancol) sudah exist di DB — re-use kode tersebut.
     * Tambah commuter edges yang missing.
     */
    public function up(): void
    {
        // Hapus shortcut KMT-JNG yang skip POK (Pondokjati)
        $shortcuts = [
            ['KMT', 'JNG'],
            ['JNG', 'KMT'],
        ];
        foreach ($shortcuts as [$a, $b]) {
            DB::statement("
                DELETE FROM koneksi_stasiun
                WHERE tipe = 'commuter'
                  AND stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
                  AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
            ", [$a, $b]);
        }

        // Tambah commuter edges Half Loop
        $edges = [
            ['JNG', 'POK'],
            ['POK', 'KMT'],
            ['KPB', 'AC'],
            ['AC', 'TPK'],
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

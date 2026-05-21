<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * KRL Jakarta Half Loop (North loop antara JNG dan KPB via Pasar Senen/Kemayoran):
     *   JNG <-> PDJ <-> KMT <-> GST <-> PSE <-> KMO <-> RJW <-> KPB <-> ANC <-> TPK
     *
     * Insert PDJ (Pondok Jati) di Jakarta Pusat dan ANC (Ancol) di Jakarta Utara.
     * Tambah commuter edges yang missing.
     */
    public function up(): void
    {
        $jakpus = DB::table('kota')->where('nama', 'Jakarta Pusat')->value('id');
        $jakut = DB::table('kota')->where('nama', 'Jakarta Utara')->value('id');

        // 1. Insert PDJ Pondok Jati (-6.2127, 106.8642) — antara JNG dan KMT
        DB::table('stasiun')->updateOrInsert(
            ['kode_stasiun' => 'PDJ'],
            [
                'kota_id' => $jakpus,
                'nama' => 'Pondok Jati',
                'lat' => -6.2127,
                'lng' => 106.8642,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        // 2. Insert ANC Ancol (-6.1287, 106.8412) — antara KPB dan TPK
        DB::table('stasiun')->updateOrInsert(
            ['kode_stasiun' => 'ANC'],
            [
                'kota_id' => $jakut,
                'nama' => 'Ancol',
                'lat' => -6.1287,
                'lng' => 106.8412,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        // 3. Hapus shortcut KMT-JNG yang skip PDJ
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

        // 4. Tambah commuter edges Half Loop
        $edges = [
            ['JNG', 'PDJ'],
            ['PDJ', 'KMT'],
            ['KPB', 'ANC'],
            ['ANC', 'TPK'],
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

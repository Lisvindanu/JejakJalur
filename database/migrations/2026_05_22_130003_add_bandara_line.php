<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * KA Bandara Soekarno-Hatta: Manggarai <-> Sudirman/BNI City <-> Duri <-> Batu Ceper <-> Bandara Soekhatta
     *
     * Insert BNIC (BNI City / Sudirman Baru) dan BST (Bandara Soekarno-Hatta).
     */
    public function up(): void
    {
        $jakpus = DB::table('kota')->where('nama', 'Jakarta Pusat')->value('id');
        $tangerang = DB::table('kota')->where('nama', 'Tangerang')->value('id');

        // 1. Insert BNIC BNI City / Sudirman Baru (-6.2032, 106.8228)
        DB::table('stasiun')->updateOrInsert(
            ['kode_stasiun' => 'BNIC'],
            [
                'kota_id' => $jakpus,
                'nama' => 'BNI City',
                'lat' => -6.2032,
                'lng' => 106.8228,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        // 2. Insert BST Bandara Soekarno-Hatta (-6.1199, 106.6549)
        DB::table('stasiun')->updateOrInsert(
            ['kode_stasiun' => 'BST'],
            [
                'kota_id' => $tangerang,
                'nama' => 'Bandara Soekarno-Hatta',
                'lat' => -6.1199,
                'lng' => 106.6549,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        // 3. Tambah commuter edges Bandara Line
        $edges = [
            ['MRI', 'BNIC'],
            ['BNIC', 'DU'],
            ['DU', 'BPR'],   // Duri-Batuceper
            ['BPR', 'BST'],  // Batuceper-Bandara
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

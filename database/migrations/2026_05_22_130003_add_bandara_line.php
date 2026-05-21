<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * KA Bandara Soekarno-Hatta: Manggarai <-> BNI City <-> Duri <-> Batu Ceper <-> Bandara Soekhatta
     *
     * BSH (Bandara Soekarno Hatta) sudah exist — re-use.
     * Insert BNIC (BNI City / Sudirman Baru) yang belum ada.
     */
    public function up(): void
    {
        $jakpus = DB::table('kota')->where('nama', 'Jakarta Pusat')->value('id');

        // Insert BNIC BNI City / Sudirman Baru — pakai INSERT ON CONFLICT (kode) DO NOTHING
        // + cek dulu via nama+kota untuk avoid unique constraint
        $existsId = DB::table('stasiun')->where('nama', 'BNI City')->where('kota_id', $jakpus)->value('id');
        if (! $existsId) {
            DB::statement(
                'INSERT INTO stasiun (id, kota_id, nama, kode_stasiun, lat, lng, created_at, updated_at)
                 VALUES (gen_random_uuid(), ?, ?, ?, ?, ?, NOW(), NOW())
                 ON CONFLICT DO NOTHING',
                [$jakpus, 'BNI City', 'BNIC', -6.2032, 106.8228]
            );
        }

        // Commuter edges Bandara Line
        $edges = [
            ['MRI', 'BNIC'],
            ['BNIC', 'DU'],
            ['DU', 'BPR'],
            ['BPR', 'BSH'],
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

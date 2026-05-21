<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * KCIC Whoosh: Halim <-> Karawang Whoosh <-> Padalarang <-> Tegalluar
     *
     * Halim (HAL) sudah ada di DB tapi belum punya edge KCIC.
     * Karawang Whoosh belum ada — insert dengan kode KRWW (avoid clash dengan KW=Karawang antarkota).
     */
    public function up(): void
    {
        $karawang = DB::table('kota')->where('nama', 'Karawang')->value('id');

        // Insert Karawang Whoosh — defensive: cek nama+kota dulu
        $existsId = DB::table('stasiun')->where('nama', 'Karawang Whoosh')->where('kota_id', $karawang)->value('id');
        if (! $existsId) {
            DB::statement(
                'INSERT INTO stasiun (id, kota_id, nama, kode_stasiun, lat, lng, created_at, updated_at)
                 VALUES (gen_random_uuid(), ?, ?, ?, ?, ?, NOW(), NOW())
                 ON CONFLICT DO NOTHING',
                [$karawang, 'Karawang Whoosh', 'KRWW', -6.2920, 107.3680]
            );
        }

        // KCIC edges: HAL <-> KRWW <-> PDL <-> TGLL (PDL-TGLL existing)
        // Jarak real KCIC (sumber KCIC.co.id):
        //  HAL - KRWW: 41.4 km
        //  KRWW - PDL: 88.5 km
        $edges = [
            ['HAL', 'KRWW', 41.4],
            ['KRWW', 'PDL', 88.5],
        ];

        foreach ($edges as [$a, $b, $jarak]) {
            foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                DB::statement('
                    INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                    SELECT sa.id, sb.id, ?, ?, NOW(), NOW()
                    FROM stasiun sa, stasiun sb
                    WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                    ON CONFLICT (stasiun_dari_id, stasiun_ke_id) DO NOTHING
                ', [$jarak, 'kcic', $from, $to]);
            }
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

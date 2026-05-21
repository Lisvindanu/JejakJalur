<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * KCIC Whoosh: Halim <-> Karawang KCIC <-> Padalarang <-> Tegalluar
     *
     * Halim (HAL) sudah ada di DB tapi belum punya edge KCIC.
     * Karawang KCIC belum ada — insert dengan kode HLM_KRW (avoid clash dengan KRW=Karangsuwung).
     */
    public function up(): void
    {
        $karawang = DB::table('kota')->where('nama', 'Karawang')->value('id');

        // 1. Insert Karawang KCIC station (kode 'KRWW' = Karawang Whoosh, avoid clash dengan KRW Karangsuwung)
        DB::table('stasiun')->updateOrInsert(
            ['kode_stasiun' => 'KRWW'],
            [
                'kota_id' => $karawang,
                'nama' => 'Karawang Whoosh',
                'lat' => -6.2920,
                'lng' => 107.3680,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        // 2. Tambah KCIC edges Halim <-> Karawang <-> Padalarang <-> Tegalluar
        // Jarak real KCIC (sumber KCIC.co.id):
        //  HAL - KRWW: 41.4 km
        //  KRWW - PDL: 88.5 km
        //  PDL - TGLL: 12.4 km (existing)
        $edges = [
            ['HAL', 'KRWW', 41.4],
            ['KRWW', 'PDL', 88.5],
            // PDL-TGLL already exists in DB, no need to re-insert
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

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Tambah edge antarkota di Lintas Priangan Timur, Bypass Cilacap, dan
     * akses Stasiun Garut.
     *
     * Latar belakang test:
     *  - #14 KAC→PWT, #17 TSM→SLO: kereta Priangan Timur muter via Cikampek
     *    karena segmen Kiaracondong-Cicalengka-Leles-Cibatu-Tasikmalaya-Ciamis-
     *    Banjar-Kroya belum ada di tipe='antarkota' (cuma 'commuter').
     *  - #18 BJR→KYA: rute "buntu" lewat Cilacap. Butuh bypass KH↔MA agar
     *    kereta lintas selatan tidak wajib mampir CP (Cilacap).
     *  - #43 GRT→PSE: Garut dead-end di antarkota walau punya KA Cikuray.
     *
     * Jarak km dihitung Haversine × 1.15 (faktor rel) berdasarkan koordinat
     * stasiun di tabel `stasiun`, dihitung inline di SQL biar idempoten.
     */
    public function up(): void
    {
        $edges = [
            // Priangan Timur: KAC ↔ CCL ↔ LL ↔ CB ↔ TSM ↔ CI ↔ BJR ↔ KYA
            ['KAC', 'CCL'],
            ['CCL', 'LL'],
            ['LL', 'CB'],
            ['CB', 'TSM'],
            ['TSM', 'CI'],
            ['CI', 'BJR'],
            ['BJR', 'KYA'],

            // Bypass Cilacap: KH ↔ MA (Kesugihan ↔ Maos)
            ['KH', 'MA'],

            // Akses Garut: GRT ↔ CB (KA Cikuray)
            ['GRT', 'CB'],
        ];

        $haversineKm = '
            6371 * 2 * asin(sqrt(
                sin(radians((sb.lat - sa.lat) / 2))^2
                + cos(radians(sa.lat)) * cos(radians(sb.lat))
                  * sin(radians((sb.lng - sa.lng) / 2))^2
            )) * 1.15
        ';

        foreach ($edges as [$a, $b]) {
            foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                DB::statement(
                    "INSERT INTO koneksi_stasiun
                        (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                     SELECT sa.id, sb.id, ROUND(({$haversineKm})::numeric, 1),
                            'antarkota', NOW(), NOW()
                     FROM stasiun sa, stasiun sb
                     WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                       AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                     ON CONFLICT (stasiun_dari_id, stasiun_ke_id, tipe) DO NOTHING",
                    [$from, $to]
                );
            }
        }
    }

    public function down(): void
    {
        $pairs = [
            ['KAC', 'CCL'], ['CCL', 'LL'], ['LL', 'CB'], ['CB', 'TSM'],
            ['TSM', 'CI'], ['CI', 'BJR'], ['BJR', 'KYA'],
            ['KH', 'MA'],
            ['GRT', 'CB'],
        ];

        foreach ($pairs as [$a, $b]) {
            DB::statement(
                "DELETE FROM koneksi_stasiun ks
                 USING stasiun s1, stasiun s2
                 WHERE ks.stasiun_dari_id = s1.id
                   AND ks.stasiun_ke_id   = s2.id
                   AND ks.tipe = 'antarkota'
                   AND ((s1.kode_stasiun = ? AND s2.kode_stasiun = ?)
                     OR (s1.kode_stasiun = ? AND s2.kode_stasiun = ?))",
                [$a, $b, $b, $a]
            );
        }
    }
};

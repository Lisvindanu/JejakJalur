<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Sambungkan stasiun KRL Jabodetabek yang exist di DB tapi belum punya
     * commuter edge. Edge dipasang antar-stasiun terdekat yang exist (sebagian
     * stasiun real KRL belum ada di DB, akan di-skip — bisa di-insert di
     * migration terpisah jika dibutuhkan).
     *
     * Stasiun yang dipakai (semua sudah verified exist):
     *   Bogor Line: MRI, TEB, CW, PSM, LNA, UI, DP, DPB, CTA, BJD, CLT, BOO
     *   Tangerang Line: DU, AK, KPB, GGL, PSG, BPR, TNG
     *   Rangkasbitung Line: MRI, SUD, KAT, THB, PLM, KBY, SDM, SRP, RWB, MJA, CTR, RK
     *   Nambo branch: CTA, CBN, NMO
     *   TPK branch: KPB-ANC-TPK (dihandle di add_jakarta_half_loop)
     */
    public function up(): void
    {
        $edges = [
            // === Bogor Line (Manggarai -> Bogor) ===
            ['MRI', 'TEB'],
            ['TEB', 'CW'],
            ['CW', 'PSM'],   // skip Duren Kalibata (tidak ada di DB)
            ['PSM', 'LNA'],  // skip Pasar Minggu Baru & Tanjung Barat
            ['LNA', 'UI'],
            ['UI', 'DP'],    // skip Pondok Cina (tidak ada di DB)
            // DP-DPB-CTA-BJD-CLT-BOO sudah ada di migration sebelumnya

            // === Tangerang Line (Duri -> Tangerang) ===
            ['DU', 'AK'],
            ['AK', 'KPB'],
            // DU-GGL existing
            ['GGL', 'PSG'],
            ['PSG', 'BPR'],  // skip Taman Kota, Bojong Indah, Rawabuaya, Kalideres (tidak ada di DB)
            ['BPR', 'TNG'],  // skip Poris, Tanah Tinggi (tidak ada di DB)

            // === Rangkasbitung Line (Tanah Abang -> Rangkasbitung) ===
            ['THB', 'KAT'],
            ['KAT', 'SUD'],
            ['SUD', 'MRI'],   // belokan Sudirman ke Manggarai
            ['THB', 'PLM'],   // belokan dari Tanah Abang ke Palmerah
            ['PLM', 'KBY'],
            ['KBY', 'SDM'],
            ['SDM', 'SRP'],
            ['SRP', 'MJA'],   // skip Rawa Buntu/Cisauk/Cicayur/Parungpanjang/Cilejit (RWB di DB = Rawabebek Bekasi, beda)
            // MJA-CTR-RK existing

            // === Nambo Branch (Citayam -> Nambo via Pondok Rajeg & Cibinong) ===
            ['CTA', 'CBN'],   // skip Pondok Rajeg (tidak ada di DB)
            ['CBN', 'NMO'],
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

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ── Step 1: Hapus edge orphan yang masih tersisa dari seeder lama ──
        // Stasiun ini tidak ada di jalur manapun di seeder saat ini, tapi edge-nya
        // masih ada dari deploy sebelumnya dengan seeder versi lama.
        $orphanCodes = ['SRJ', 'SYO', 'TW', 'KPS'];

        DB::statement('
            DELETE FROM koneksi_stasiun
            WHERE stasiun_dari_id IN (SELECT id FROM stasiun WHERE kode_stasiun = ANY(?))
               OR stasiun_ke_id   IN (SELECT id FROM stasiun WHERE kode_stasiun = ANY(?))
        ', ['{'.implode(',', $orphanCodes).'}', '{'.implode(',', $orphanCodes).'}']);

        // ── Step 2: Update koordinat stasiun yang salah ──
        // Sumber: geocode.maps.co + positionstack, diverifikasi terhadap jalur konteks.
        $corrections = [
            // Banyuwangi area (sebelumnya keliru ditempatkan di Cirebon)
            'KNE' => [-8.2229464, 114.3408077, 'Karangasem (Banyuwangi)'],

            // Garut area
            'KRAI' => [-7.0982744, 107.9311555, 'Karangsari (Garut)'],

            // Pantura Brebes area (sebelumnya di Tangerang)
            'CLD' => [-6.9755000, 108.9352820, 'Cileduk (Brebes)'],

            // Minor adjustments
            'MN' => [-7.6188000, 111.5246000, 'Madiun'],
            'LRA' => [-6.9905000, 108.9487000, 'Larangan (Brebes)'],
            'NMO' => [-6.4663000, 106.9063000, 'Nambo'],
            'PWT' => [-7.4195000, 109.2218000, 'Purwokerto'],
            'AWN' => [-6.6445000, 108.4146000, 'Arjawinangun'],
            'BW' => [-8.2172000, 114.3758000, 'Banyuwangi'],
        ];

        foreach ($corrections as $kode => [$lat, $lng, $label]) {
            DB::statement(
                'UPDATE stasiun SET lat = ?, lng = ? WHERE kode_stasiun = ?',
                [$lat, $lng, $kode]
            );
        }

        // ── Step 3: Refill jarak_km untuk semua edge berdasarkan koordinat terbaru ──
        // Pakai Haversine dengan kalibrasi faktor jalan vs garis lurus.
        DB::statement('
            UPDATE koneksi_stasiun ks SET jarak_km = ROUND((
                6371 * 2 * asin(sqrt(
                    sin(radians((s2.lat - s1.lat)/2))^2 +
                    cos(radians(s1.lat)) * cos(radians(s2.lat)) *
                    sin(radians((s2.lng - s1.lng)/2))^2
                )) * CASE
                    WHEN 6371 * 2 * asin(sqrt(
                        sin(radians((s2.lat - s1.lat)/2))^2 +
                        cos(radians(s1.lat)) * cos(radians(s2.lat)) *
                        sin(radians((s2.lng - s1.lng)/2))^2
                    )) < 5  THEN 1.3169
                    WHEN 6371 * 2 * asin(sqrt(
                        sin(radians((s2.lat - s1.lat)/2))^2 +
                        cos(radians(s1.lat)) * cos(radians(s2.lat)) *
                        sin(radians((s2.lng - s1.lng)/2))^2
                    )) < 20 THEN 1.1182
                    WHEN 6371 * 2 * asin(sqrt(
                        sin(radians((s2.lat - s1.lat)/2))^2 +
                        cos(radians(s1.lat)) * cos(radians(s2.lat)) *
                        sin(radians((s2.lng - s1.lng)/2))^2
                    )) < 50 THEN 1.0886
                    ELSE 0.9395
                END
            )::numeric, 1)
            FROM stasiun s1, stasiun s2
            WHERE ks.stasiun_dari_id = s1.id
              AND ks.stasiun_ke_id = s2.id
              AND s1.lat IS NOT NULL
              AND s2.lat IS NOT NULL
        ');

        // Floor minimum jarak 1km untuk edge yang terlalu pendek (stasiun adjacent dalam kota)
        DB::statement('UPDATE koneksi_stasiun SET jarak_km = 1.0 WHERE jarak_km < 1.0');
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

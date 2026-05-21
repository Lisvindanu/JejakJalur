<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Koordinat stasiun yang salah, diverifikasi via Wikipedia Indonesia.
        // Tujuan: kurangi avg neighbor distance dari 80-186km menjadi < 50km.
        // Sumber: https://id.wikipedia.org/wiki/Stasiun_*
        $corrections = [
            // PAG saat ini di Banyuwangi area (-7.97, 114.12), seharusnya Blitar
            // Stasiun Plampangan masuk jalur Blitar-Malang-Tulungagung
            'PAG' => [-8.16581889, 112.37721389, 'Plampangan (Blitar)'],

            // CKR saat ini di Cirebon area (-6.60, 108.38), seharusnya Bekasi KRL
            'CKR' => [-6.25361111, 107.14222222, 'Cikarang (Bekasi)'],

            // KNN saat ini di Yogya area, seharusnya Bojonegoro
            // DB nama "Kradean" tapi Wikipedia "Stasiun Kradenan"
            'KNN' => [-7.15222222, 111.14138889, 'Kradenan (Bojonegoro)'],

            // JTS saat ini di Yogya/Klaten area, seharusnya Madiun
            'JTS' => [-7.934398, 111.476032, 'Jetis (Madiun)'],

            // SBL saat ini di Malang area, seharusnya Tulungagung
            'SBL' => [-8.08416667, 111.94611111, 'Sumbergempol (Tulungagung)'],

            // JBN1 saat ini di Madiun area, seharusnya Boyolali
            'JBN1' => [-7.32694, 110.64472, 'Jambean (Boyolali)'],
        ];

        foreach ($corrections as $kode => [$lat, $lng, $label]) {
            DB::statement(
                'UPDATE stasiun SET lat = ?, lng = ? WHERE kode_stasiun = ?',
                [$lat, $lng, $kode]
            );
        }

        // Refill jarak_km untuk semua edge berdasarkan koordinat terbaru
        // Pakai Haversine dengan kalibrasi faktor jalan vs garis lurus
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

        // Floor minimum jarak 1km
        DB::statement('UPDATE koneksi_stasiun SET jarak_km = 1.0 WHERE jarak_km < 1.0');
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

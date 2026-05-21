<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Hapus koneksi teleportasi / cross-Java yang salah
        $wrongPairs = [
            ['DPL', 'GDB'], // Doplang ↔ Gedebage (Bandung)
            ['GDB', 'TW'],  // Gedebage (Bandung) ↔ Telawa (Boyolali)
            ['JI',  'LEC'], // Jati (Jakarta) ↔ Leces (Probolinggo)
            ['JI',  'BYM'], // Jati (Jakarta) ↔ Bayeman (Probolinggo)
            ['KMP', 'KNE'], // Kempit (Banyuwangi) ↔ Karangasem (Brebes)
            ['KKL', 'RGP'], // Krikilan (Sragen) ↔ Rogojampi (Banyuwangi)
            ['KKL', 'KNE'], // Krikilan (Sragen) ↔ Karangasem (Brebes)
            ['SRJ', 'SYO'], // Sumberejo (Banyuwangi) ↔ Sroyo (Karanganyar)
            ['SRJ', 'KPS'], // Sumberejo (Banyuwangi) ↔ Kapas (Bojonegoro)
            ['PET', 'SBS'], // Petung (Jepara) ↔ Sumbersalak (Jember)
            ['MI',  'PET'], // Mangli (Jember) ↔ Petung (Jepara)
            ['LGK', 'TBK'], // Legok (Tangerang) ↔ Tambak (Banyumas)
            ['LGK', 'KJ'],  // Legok (Tangerang) ↔ Kemranjen (Banyumas)
            ['DL',  'SWT'], // Dlanggu (Mojokerto) ↔ Srowot (Klaten)
            ['CKP', 'CG'],  // Cikampek ↔ Cisomang (bikin rute Pantura belok ke Bandung)
            ['CBR', 'CG'],  // Cikarang ↔ Cisomang
            ['TB', 'CKW'],  // Tambun (Bekasi) ↔ Cikawung (Ciamis) - kode TB salah di Selatan jalur
            ['AW', 'TB'],   // Awipari (Tasikmalaya) ↔ Tambun (Bekasi) - efek samping kode TB di Selatan
            ['TSM', 'TB'],  // Tasikmalaya ↔ Tambun (Bekasi) - efek samping
            ['PB', 'JI'],   // Pasir Bungur (Banyuwangi) ↔ Jati (Jakarta) - kode JI salah di Surabaya-Banyuwangi
            ['BYM', 'JI'],  // Bayeman ↔ Jati (Jakarta) - efek samping
            ['DL', 'SLO'],  // Dlanggu (Mojokerto) ↔ Solo Balapan - sisa dari kode DL salah di Selatan
        ];

        foreach ($wrongPairs as [$a, $b]) {
            DB::statement('
                DELETE FROM koneksi_stasiun
                WHERE (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
                       AND stasiun_ke_id  = (SELECT id FROM stasiun WHERE kode_stasiun = ?))
                   OR (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
                       AND stasiun_ke_id  = (SELECT id FROM stasiun WHERE kode_stasiun = ?))
            ', [$a, $b, $b, $a]);
        }

        // 2. Isi jarak_km NULL menggunakan Haversine dengan ratio kalibrasi per bucket jarak
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
            WHERE ks.stasiun_dari_id = s1.id AND ks.stasiun_ke_id = s2.id
              AND ks.jarak_km IS NULL
              AND s1.lat IS NOT NULL AND s2.lat IS NOT NULL
        ');

        // 3. Floor minimum 1km untuk edge yang 0
        DB::statement('UPDATE koneksi_stasiun SET jarak_km = 1.0 WHERE jarak_km < 0.1');

        // 4. Fix typo nama stasiun SBI
        DB::statement("UPDATE stasiun SET nama = 'Surabaya Pasarturi' WHERE kode_stasiun = 'SBI' AND nama != 'Surabaya Pasarturi'");
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

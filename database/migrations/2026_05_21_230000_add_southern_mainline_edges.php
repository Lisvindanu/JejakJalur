<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Tambah missing edges di jalur Selatan (Lintas Selatan Jawa)
        // Sebelumnya Dijkstra GMR->YK detour via Sukabumi-Banjar (1015km, real 512km)
        // karena edge CN->PPK->BMA->PWT putus dan WT->YK tidak ada.
        //
        // Sumber: KAI peta lintas, Wikipedia Stasiun_*
        $newEdges = [
            // Cirebon Selatan: CN -> Ciledug -> Prupuk -> Bumiayu -> Purwokerto
            ['CLD', 'PPK'],   // Ciledug -> Prupuk
            ['BMA', 'PWT'],   // Bumiayu -> Purwokerto

            // Penutupan ke Yogya: STL/WT -> YK/LPN
            ['WT', 'YK'],     // Wates -> Yogyakarta
            ['WT', 'LPN'],    // Wates -> Lempuyangan
            ['STL', 'LPN'],   // Sentolo -> Lempuyangan (alternatif)

            // Express selatan: GMR/CKP direct ke PWT lewat selatan
            // (mirip KA Argo Dwipangga skip stasiun kecil)
            ['CN', 'PWT'],    // Cirebon -> Purwokerto langsung (express)
            ['PWT', 'YK'],    // Purwokerto -> Yogyakarta langsung (express)

            // Express timur Jawa: SLO/MN/KTS/KD/BL/ML/SBI direct
            // Tujuan: rute YK->ML, SLO->SBI, dll tidak detour via stasiun kecil
            ['YK', 'SLO'],    // Yogya -> Solo Balapan langsung
            ['SLO', 'MN'],    // Solo -> Madiun langsung
            ['MN', 'KTS'],    // Madiun -> Kertosono
            ['MN', 'SBI'],    // Madiun -> Surabaya Pasarturi (KA Bima)
            ['KTS', 'KD'],    // Kertosono -> Kediri
            ['KTS', 'SBI'],   // Kertosono -> Surabaya
            ['KD', 'BL'],     // Kediri -> Blitar
            ['BL', 'ML'],     // Blitar -> Malang (KA Matarmaja)
            ['KD', 'ML'],     // Kediri -> Malang
        ];

        foreach ($newEdges as [$a, $b]) {
            DB::statement('
                INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, created_at, updated_at)
                SELECT sa.id, sb.id,
                       ROUND((6371 * 2 * asin(sqrt(
                           sin(radians((sb.lat - sa.lat)/2))^2 +
                           cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                           sin(radians((sb.lng - sa.lng)/2))^2
                       )) * CASE
                           WHEN 6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) < 5  THEN 1.3169
                           WHEN 6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) < 20 THEN 1.1182
                           WHEN 6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) < 50 THEN 1.0886
                           ELSE 0.9395
                       END)::numeric, 1),
                       NOW(), NOW()
                FROM stasiun sa, stasiun sb
                WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                  AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                ON CONFLICT (stasiun_dari_id, stasiun_ke_id) DO NOTHING
            ', [$a, $b]);

            DB::statement('
                INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, created_at, updated_at)
                SELECT sa.id, sb.id,
                       ROUND((6371 * 2 * asin(sqrt(
                           sin(radians((sb.lat - sa.lat)/2))^2 +
                           cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                           sin(radians((sb.lng - sa.lng)/2))^2
                       )) * CASE
                           WHEN 6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) < 5  THEN 1.3169
                           WHEN 6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) < 20 THEN 1.1182
                           WHEN 6371 * 2 * asin(sqrt(
                               sin(radians((sb.lat - sa.lat)/2))^2 +
                               cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                               sin(radians((sb.lng - sa.lng)/2))^2
                           )) < 50 THEN 1.0886
                           ELSE 0.9395
                       END)::numeric, 1),
                       NOW(), NOW()
                FROM stasiun sa, stasiun sb
                WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                  AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                ON CONFLICT (stasiun_dari_id, stasiun_ke_id) DO NOTHING
            ', [$b, $a]);
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Tambah edge "Pantura Express" — direct edges antar major Pantura stations.
        // Tujuan: agar Dijkstra punya pilihan rute Pantura yang cepat (mirip KA Argo Bromo
        // Anggrek yang skip stasiun kecil) sehingga GMR→SBI lewat Pantura, bukan Selatan.
        //
        // Stasiun kecil tetap terhubung via Pantura jalur biasa untuk rute lokal.
        $expressPairs = [
            ['GMR', 'CKP'],   // Jakarta → Cikampek
            ['CKP', 'CN'],    // Cikampek → Cirebon
            ['CN', 'TG'],     // Cirebon → Tegal
            ['TG', 'PK'],     // Tegal → Pekalongan
            ['PK', 'SMT'],    // Pekalongan → Semarang Tawang
            ['SMT', 'BJ'],    // Semarang → Bojonegoro
            ['BJ', 'LMG'],    // Bojonegoro → Lamongan
            ['LMG', 'SBI'],   // Lamongan → Surabaya Pasarturi
        ];

        foreach ($expressPairs as [$a, $b]) {
            // Insert dua arah, skip kalau sudah ada
            DB::statement('
                INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, created_at, updated_at)
                SELECT sa.id, sb.id,
                       ROUND((6371 * 2 * asin(sqrt(
                           sin(radians((sb.lat - sa.lat)/2))^2 +
                           cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                           sin(radians((sb.lng - sa.lng)/2))^2
                       )) * 0.9395)::numeric, 1),
                       NOW(), NOW()
                FROM stasiun sa, stasiun sb
                WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                ON CONFLICT (stasiun_dari_id, stasiun_ke_id) DO NOTHING
            ', [$a, $b]);

            DB::statement('
                INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, created_at, updated_at)
                SELECT sa.id, sb.id,
                       ROUND((6371 * 2 * asin(sqrt(
                           sin(radians((sb.lat - sa.lat)/2))^2 +
                           cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                           sin(radians((sb.lng - sa.lng)/2))^2
                       )) * 0.9395)::numeric, 1),
                       NOW(), NOW()
                FROM stasiun sa, stasiun sb
                WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                ON CONFLICT (stasiun_dari_id, stasiun_ke_id) DO NOTHING
            ', [$b, $a]);
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

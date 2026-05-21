<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Real KAI route: ... CSA -> KE -> CBD -> PRK -> CCR -> CGB ...
        // Existing edges: KE<->CSA (8.3), KE<->PRK (9.8 shortcut), PRK<->CBD (5.7),
        //                 PRK<->CCR (7.4), CBD<->CCR (12.2)
        //
        // Bug: KE<->PRK shortcut bikin Dijkstra skip CBD Cibadak.
        // Fix: hapus shortcut KE<->PRK, tambah edge real KE<->CBD.

        // Hapus shortcut KE <-> PRK
        DB::statement("
            DELETE FROM koneksi_stasiun
            WHERE (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'KE')
                   AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'PRK'))
               OR (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'PRK')
                   AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'KE'))
        ");

        // Tambah edge real KE <-> CBD (bidirectional)
        foreach ([['KE', 'CBD'], ['CBD', 'KE']] as [$from, $to]) {
            DB::statement('
                INSERT INTO koneksi_stasiun (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
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
                           ELSE 1.0886
                       END)::numeric, 1),
                       ?,
                       NOW(), NOW()
                FROM stasiun sa, stasiun sb
                WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                  AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                ON CONFLICT (stasiun_dari_id, stasiun_ke_id) DO NOTHING
            ', ['antarkota', $from, $to]);
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

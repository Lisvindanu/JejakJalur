<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Real KAI: CBD -> PRK -> CCR (PRK Parungkuda di antara CBD & CCR)
        // Existing: CBD<->PRK (5.7), PRK<->CCR (7.4), CBD<->CCR (12.2 shortcut)
        // Dijkstra ambil shortcut 12.2 < 13.1 (5.7+7.4) walau cuma beda 0.9km.
        // Hapus shortcut biar PRK ke-include.
        DB::statement("
            DELETE FROM koneksi_stasiun
            WHERE (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'CBD')
                   AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'CCR'))
               OR (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'CCR')
                   AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'CBD'))
        ");
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

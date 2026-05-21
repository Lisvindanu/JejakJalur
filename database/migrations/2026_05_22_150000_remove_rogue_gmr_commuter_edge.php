<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Hapus rogue edge `GMR↔JNG tipe='commuter'` di koneksi_stasiun.
     *
     * Latar belakang: Stasiun Gambir (GMR) HANYA melayani KA jarak jauh
     * (antarkota), TIDAK melayani KRL Commuter Line. Semua KRL Line Bogor/
     * Cikarang lewat Jakarta Kota line melewati Manggarai → bypass Gambir.
     *
     * Edge `GMR↔JNG tipe='commuter'` (jarak 6.8 km) tertinggal dari seeder/
     * migration lama dan menyebabkan Dijkstra commuter route ngehasilin path
     * yang lewatin Gambir (mis. BOO → ... → MRI → MTR → JNG → GMR).
     *
     * Edge `GMR↔JNG tipe='antarkota'` TIDAK disentuh — itu valid karena
     * memang ada KA jarak jauh GMR ↔ JNG.
     */
    public function up(): void
    {
        DB::statement(
            "DELETE FROM koneksi_stasiun ks
             USING stasiun s1, stasiun s2
             WHERE ks.stasiun_dari_id = s1.id
               AND ks.stasiun_ke_id   = s2.id
               AND ks.tipe = 'commuter'
               AND ((s1.kode_stasiun = 'GMR' AND s2.kode_stasiun = 'JNG')
                 OR (s1.kode_stasiun = 'JNG' AND s2.kode_stasiun = 'GMR'))"
        );
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback. Reinserting rogue edge akan kembali
        // memunculkan bug Dijkstra commuter via Gambir.
    }
};

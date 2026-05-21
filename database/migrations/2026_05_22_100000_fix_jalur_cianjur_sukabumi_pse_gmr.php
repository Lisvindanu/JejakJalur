<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ====================================================================
        // FIX 1: PSE <-> GMR antarkota
        // ====================================================================
        // PSE dan GMR tidak terhubung langsung secara rel — mereka di jalur
        // yang berbeda dan dihubungkan via JNG/MRI. Edge direct 2.1km bikin
        // Dijkstra ambil shortcut "mundur ke barat" untuk rute PSE->timur.
        //
        // Setelah dihapus, rute PSE->timur akan benar:
        //   PSE -> JNG -> BKS -> CKP -> CN -> ... (jalur antarkota timur)
        // Dan PSE <-> GMR tetap reachable via PSE -> JNG -> GMR (12.8km).
        DB::statement("
            DELETE FROM koneksi_stasiun
            WHERE tipe = 'antarkota'
              AND (
                  (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'PSE')
                   AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'GMR'))
               OR (stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'GMR')
                   AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = 'PSE'))
              )
        ");

        // ====================================================================
        // FIX 2: Hapus shortcut edges di jalur Cianjur-Sukabumi-Bogor
        // ====================================================================
        // 3 edges shortcut yang skip stasiun real (bug data entry):
        //   - CPY <-> SLJ (9.3km) skip CJ Cianjur + CRJ
        //   - GDS <-> CSA (13.4km) skip SI Sukabumi
        //   - CGB <-> CSA (23.1km) skip CBD, PRK, CCR
        $shortcuts = [
            ['CPY', 'SLJ'],
            ['GDS', 'CSA'],
            ['CGB', 'CSA'],
        ];

        foreach ($shortcuts as [$a, $b]) {
            foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
                DB::statement("
                    DELETE FROM koneksi_stasiun
                    WHERE stasiun_dari_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
                      AND stasiun_ke_id = (SELECT id FROM stasiun WHERE kode_stasiun = ?)
                ", [$from, $to]);
            }
        }

        // ====================================================================
        // FIX 3: Tambah edges asli yang missing
        // ====================================================================
        // Jalur Cianjur:
        //   CPY <-> CJ (Cipeuyeum-Cianjur, ~14km Haversine)
        //   CJ  <-> SLJ (Cianjur-Selajambe, ~10km)
        // Jalur Sukabumi:
        //   GDS <-> SI (Gandasoli-Sukabumi, ~7km)
        //   SI  <-> CSA (Sukabumi-Cisaat, ~5km)
        // Cibadak->Cigombong:
        //   CCR <-> CGB (Cicurug-Cigombong, ~6km)
        //
        // Note: chain CSA->KE->PRK->CBD->CCR sudah ada di DB.
        $missingEdges = [
            ['CPY', 'CJ'],
            ['CJ', 'SLJ'],
            ['GDS', 'SI'],
            ['SI', 'CSA'],
            ['CCR', 'CGB'],
        ];

        foreach ($missingEdges as [$a, $b]) {
            foreach ([[$a, $b], [$b, $a]] as [$from, $to]) {
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
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

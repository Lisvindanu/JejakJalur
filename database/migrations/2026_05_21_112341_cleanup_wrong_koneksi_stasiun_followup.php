<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Bersihkan koneksi salah yang terlanjur dibuat oleh seeder versi lama.
        // Migration sebelumnya (2026_05_21_105223) sudah ran di staging/prod, jadi tidak akan
        // re-execute. Migration ini meng-cover wrong pairs tambahan yang ditemukan setelahnya.
        $wrongPairs = [
            // Kode TB (Tambun) salah dipakai di Selatan jalur — bikin teleport Bekasi↔Tasik/Ciamis
            ['TB', 'CKW'],
            ['AW', 'TB'],
            ['TSM', 'TB'],
            // Kode JI (Jati Jakarta) salah dipakai di Surabaya-Banyuwangi jalur
            ['PB', 'JI'],
            ['BYM', 'JI'],
            // Kode DL (Dlanggu Mojokerto) salah dipakai di Selatan jalur
            ['DL', 'SLO'],
            // Shortcut Pantura→Bandung yang seharusnya tidak ada
            ['KW', 'PDL'],
            ['KW', 'HAL'],
            ['CKP', 'CG'],
            ['CBR', 'CG'],
            // Edge Cikarang yang skip Bekasi Timur/Tambun/Cibitung
            ['BKS', 'CIT'],
            // Urutan KRL Bekasi lama salah (LMB↔BKS, BUA↔TB, TB↔RWB, RWB↔BKT)
            ['BKS', 'LMB'],
            ['BUA', 'TB'],
            ['TB', 'RWB'],
            ['RWB', 'BKT'],
            // Pantura lama belok ke selatan di Doplang (DPL↔TW) — sekarang lewat Cepu
            ['DPL', 'TW'],
            // Surabaya-Bojonegoro lama punya urutan campur aduk yang bikin teleport
            ['PC', 'KPS'],
            ['KPS', 'SRJ'],
            ['SRJ', 'SYO'],
            ['SYO', 'BWO'],
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
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback
    }
};

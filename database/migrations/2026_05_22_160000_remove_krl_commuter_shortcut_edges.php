<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Hapus rogue shortcut edges di KRL commuter yang bypass stasiun antara.
     *
     * Latar belakang: di koneksi_stasiun tipe='commuter' ditemukan 10 pasangan
     * edge yang "loncat" melewati stasiun KRL aktif. Akibatnya Dijkstra commuter
     * milih shortcut bobot kecil → output rute KRL skip stasiun real (mis. dari
     * Bogor ke Jakarta Kota lewat Duri-Bandara dsb).
     *
     * Edge antarkota tidak disentuh — KA jarak jauh memang sah melewati segmen
     * panjang tanpa berhenti di stasiun KRL kecil.
     *
     * Pola edge yang dihapus (semua tipe='commuter'):
     *  - DPB ↔ UI          (skip POC)                        — Bogor line
     *  - LNA ↔ PSMB        (skip TNT, PSM)                   — Bogor line
     *  - MRI ↔ CW          (skip TEB)                        — Bogor line
     *  - TJ ↔ PRP          (skip DAR, CJT)                   — Banten line
     *  - DAR ↔ PRP         (skip CJT)                        — Banten line
     *  - PRP ↔ SRP         (skip CC, CSK)                    — Banten line
     *  - BPR ↔ DU          (skip PI, KDS, RW, BOI, TKO, PSG, GGL) — Tangerang
     *  - PI ↔ RW           (skip KDS)                        — Tangerang
     *  - RW ↔ GGL          (skip BOI, TKO, PSG)              — Tangerang
     *  - BOI ↔ GGL         (skip TKO, PSG)                   — Tangerang
     */
    public function up(): void
    {
        $shortcuts = [
            ['DPB', 'UI'],
            ['LNA', 'PSMB'],
            ['MRI', 'CW'],
            ['TJ', 'PRP'],
            ['DAR', 'PRP'],
            ['PRP', 'SRP'],
            ['BPR', 'DU'],
            ['PI', 'RW'],
            ['RW', 'GGL'],
            ['BOI', 'GGL'],
        ];

        foreach ($shortcuts as [$a, $b]) {
            DB::statement(
                "DELETE FROM koneksi_stasiun ks
                 USING stasiun s1, stasiun s2
                 WHERE ks.stasiun_dari_id = s1.id
                   AND ks.stasiun_ke_id   = s2.id
                   AND ks.tipe = 'commuter'
                   AND ((s1.kode_stasiun = ? AND s2.kode_stasiun = ?)
                     OR (s1.kode_stasiun = ? AND s2.kode_stasiun = ?))",
                [$a, $b, $b, $a]
            );
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback. Reinsert shortcut akan membuka kembali
        // bug Dijkstra commuter skip stasiun.
    }
};

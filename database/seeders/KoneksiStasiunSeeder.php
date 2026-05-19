<?php

namespace Database\Seeders;

use App\Models\KoneksiStasiun;
use App\Models\Stasiun;
use Illuminate\Database\Seeder;

class KoneksiStasiunSeeder extends Seeder
{
    public function run(): void
    {
        // Setiap jalur didefinisikan sebagai urutan kode stasiun.
        // Koneksi dibuat dua arah (A→B dan B→A) antar stasiun berurutan.
        $jalur = [

            // ── KRL BOGOR LINE ───────────────────────────────────────────
            // Gambir → Manggarai → Pasar Minggu → Lenteng Agung → Bogor
            'KRL Bogor' => [
                'GMR', 'JNG', 'MRI', 'CW', 'DRN', 'PSM', 'PSMB', 'LNA', 'TNT',
                'CTA', 'DPB', 'DP', 'BJD', 'CLT', 'BOO',
            ],

            // ── KRL BEKASI LINE ──────────────────────────────────────────
            // Pasar Senen → Jatinegara → Bekasi → Cikarang
            'KRL Bekasi' => [
                'PSE', 'JNG', 'BUA', 'TB', 'RWB', 'BKT', 'BKS', 'LMB', 'CKR',
            ],

            // ── KRL TANGERANG LINE ───────────────────────────────────────
            'KRL Tangerang' => [
                'DU', 'RW', 'BOI', 'GGL', 'TAK', 'THL', 'TNG',
            ],

            // ── KRL SERPONG/RANGKASBITUNG LINE ───────────────────────────
            'KRL Serpong' => [
                'THB', 'PSG', 'PLM', 'MRI', 'SDM', 'JMU', 'PDR', 'RU', 'SRP',
                'CSA', 'CKY', 'DAR', 'PRP', 'TJ', 'DAR', 'MJA', 'CTR', 'RK',
            ],

            // ── KRL COMMUTER CIKARANG LINE ───────────────────────────────
            'KRL Cikarang' => [
                'MRI', 'JNG', 'BKS', 'CIT', 'CKR',
            ],

            // ── KRL TANJUNG PRIUK LINE ───────────────────────────────────
            'KRL Priuk' => [
                'KPB', 'POO', 'SAO', 'AC', 'TPK',
            ],

            // ── KRL NAMBO LINE ───────────────────────────────────────────
            'KRL Nambo' => [
                'CIT', 'CKR', 'KDH', 'NMO',
            ],

            // ── MERAK LINE ───────────────────────────────────────────────
            // Merak → Cilegon → Serang → Rangkasbitung → Jakarta
            'Merak' => [
                'MER', 'KEN', 'CLG', 'WLT', 'JBU', 'TAJ', 'CT', 'SG', 'TAJ',
                'RK', 'MJA', 'CTR', 'TNG',
            ],

            // ── JALUR PANTURA ─────────────────────────────────────────────
            // Jakarta → Cikampek → Cirebon → Semarang → Solo → Surabaya
            'Pantura' => [
                'GMR', 'PSE', 'JNG', 'BKS', 'KW', 'CKP',
                'CRA', 'PAB', 'PGB', 'PAS', 'PRI', 'HGL', 'TLS', 'KAB', 'CLH',
                'JTB', 'SDU', 'KTM', 'TIS', 'AWN', 'WDW', 'KLW', 'LWG', 'BBK',
                'CNK', 'CLD', 'CN', 'CNP', 'LOS', 'KGB', 'KGG', 'TGN', 'BKA',
                'BB', 'LRA', 'KRT', 'SGG', 'BMA', 'PPK', 'LG', 'PAT', 'TG', 'LR',
                'SD', 'PTA', 'CO', 'PML', 'KNS', 'PLB', 'UJN', 'BTG', 'PK',
                'SRI', 'KBD', 'WLR', 'KLN', 'MKG', 'ATA', 'SMT', 'SMC',
                'JRK', 'BBG', 'TGW', 'GUB', 'NBO', 'TGG', 'GBN', 'TRH',
                'SDI', 'PNL', 'KSO', 'JTS', 'KNN', 'PDS', 'JBN', 'GN', 'KEJ',
                'KGT', 'GD', 'SL', 'GPK', 'DPL', 'GDB',
                'TW', 'JBN1', 'CE', 'KT', 'BBN', 'SWT', 'DL',
                'SLO', 'SK', 'SK', 'PWS', 'STA',
                'KMR', 'KO', 'PL', 'KDB', 'MSR', 'SLM', 'SUM', 'SR', 'KRO',
                'WK', 'KG', 'PA', 'GG', 'NGW',
                'MAG', 'BAT', 'TAL', 'MN', 'BBD', 'SRD', 'CRB',
                'NJ', 'SKM', 'BGR', 'WLG', 'KTS', 'NJG', 'NT', 'TA', 'RJ',
                'SBL', 'KD', 'PPR', 'MGN', 'PWA', 'NDL', 'KRS',
                'JG', 'SBO', 'SMB', 'PTR', 'CRM',
                'MR', 'BAL', 'KRN', 'SDA', 'SPJ', 'STP', 'GDG', 'WR', 'TGA',
                'TLN', 'BH', 'KDN', 'PWJ', 'SBI', 'SGU',
            ],

            // ── JALUR SELATAN ─────────────────────────────────────────────
            // Jakarta → Purwakarta → Bandung → Tasikmalaya → Purwokerto → Yogyakarta → Solo
            'Selatan' => [
                'GMR', 'PSE', 'JNG', 'BKS', 'CKP',
                'CG', 'CBR', 'SUT', 'SAD', 'PWK', 'PLD', 'CA', 'RH', 'CPT',
                'SKT', 'PDL', 'GK', 'CLE', 'CMI', 'TAU', 'MSI', 'LBJ', 'RCK',
                'BD', 'CMD', 'CIR', 'AND', 'CTH', 'CMK', 'GDB', 'KAC',
                'HRP', 'CCL', 'NG', 'CB', 'CPD', 'WB', 'LL', 'LO', 'BMW',
                'KRAI', 'RJP', 'CAW', 'CAA', 'MNJ', 'IH', 'TSM', 'AW',
                'TB', 'RJP', 'CKW', 'CI', 'BJG', 'LN', 'KNP', 'BJR',
                'SDR', 'LBG', 'CPI', 'JRL', 'GDM', 'SKP', 'RDN', 'SIL',
                'MLW', 'KKD', 'KRL', 'GM', 'KH', 'CP', 'MA',
                'PKW', 'KRR', 'KBS', 'KGD', 'NTG', 'SPH', 'TBK', 'LGK',
                'KJ', 'PWT', 'KYA',
                'IJ', 'SOA', 'SRW', 'KM', 'WNS', 'KWN', 'PRB', 'GB', 'BTH',
                'KTA', 'JN', 'WJ', 'STL', 'WT', 'PTN',
                'MGW', 'LPN', 'YK',
                'KLS', 'BBN', 'CE', 'KT', 'SWT', 'DL', 'SLO',
            ],

            // ── JALUR SUKABUMI ────────────────────────────────────────────
            'Sukabumi' => [
                'BOO', 'MSG', 'CGB', 'CSA', 'GDS', 'SLJ', 'RI', 'PRK',
                'CCR', 'PON', 'CRG', 'SI',
            ],

            // ── JALUR CIANJUR ─────────────────────────────────────────────
            'Cianjur' => [
                'PDL', 'RM', 'CPY', 'SLJ', 'CLK', 'LP', 'MLB', 'CJR', 'SSI',
                'MLB', 'CRJ', 'CBB', 'TPR', 'CI',
            ],

            // ── JALUR GARUT ───────────────────────────────────────────────
            'Garut' => [
                'CCL', 'HRP', 'NG', 'RCK', 'CIR', 'BD',
            ],

            // ── JALUR KROYA-CILACAP ───────────────────────────────────────
            'Cilacap' => [
                'KYA', 'MA', 'CP',
            ],

            // ── JALUR WONOGIRI ────────────────────────────────────────────
            'Wonogiri' => [
                'SLO', 'GW', 'SKH', 'PNT', 'WNG',
            ],

            // ── JALUR MADIUN-PONOROGO (freight) ──────────────────────────
            'Madiun-Slahung' => [
                'MN', 'BBD', 'MAG', 'BAT',
            ],

            // ── JALUR SURABAYA-MALANG ─────────────────────────────────────
            'Surabaya-Malang' => [
                'SGU', 'SDA', 'GNG', 'SKJ', 'WN', 'SN', 'BG', 'GI', 'RO',
                'PS', 'PS1', 'LW', 'SGS', 'NB', 'ML', 'MLK', 'BMG',
            ],

            // ── JALUR MALANG-BLITAR-KEDIRI ───────────────────────────────
            'Malang-Kediri' => [
                'ML', 'MLK', 'KPN', 'SBP', 'KGS', 'PAD', 'PAG', 'PGJ', 'KSB',
                'WG', 'BL', 'GRM', 'KRS', 'KD', 'PPR', 'MGN', 'NDL', 'PWA', 'KTS',
            ],

            // ── JALUR SURABAYA-BANYUWANGI ─────────────────────────────────
            'Surabaya-Banyuwangi' => [
                'SGU', 'BG', 'GNG', 'PB', 'BYM', 'JI', 'LEC', 'MLS', 'KK',
                'RDA', 'KLO', 'RN', 'JTR', 'AJ', 'TGL', 'BSS', 'KTK', 'SBB',
                'LDO', 'SBS', 'PET', 'MI', 'RBP', 'JR', 'GRN', 'MRW',
                'KBR', 'GLM', 'SGJ', 'RGP', 'KKL', 'KNE', 'KMP', 'KSL',
                'SWD', 'KBT', 'TGR', 'AGO', 'BWB', 'BW', 'BWI', 'KTG',
            ],

            // ── JALUR SURABAYA-BOJONEGORO ─────────────────────────────────
            'Surabaya-Bojonegoro' => [
                'SBI', 'TES', 'KDA', 'BNW', 'IDO', 'GS', 'DD', 'CME',
                'LMG', 'KRU', 'SLR', 'GEB', 'BBT', 'SBN', 'PC',
                'KPS', 'SRJ', 'SYO', 'BWO', 'TBO', 'BJ', 'KIT',
            ],

            // ── JALUR SURABAYA-MOJOKERTO ──────────────────────────────────
            'Surabaya-Mojokerto' => [
                'SGU', 'WO', 'KRN', 'MR', 'BAL',
            ],

        ];

        $cache = [];
        $koneksi = [];

        foreach ($jalur as $namaJalur => $urutanKode) {
            $urutanKode = array_values(array_unique($urutanKode));

            for ($i = 0; $i < count($urutanKode) - 1; $i++) {
                $dari = $urutanKode[$i];
                $ke = $urutanKode[$i + 1];

                foreach ([$dari, $ke] as $kode) {
                    if (! isset($cache[$kode])) {
                        $cache[$kode] = Stasiun::where('kode_stasiun', $kode)->value('id');
                    }
                }

                $idDari = $cache[$dari] ?? null;
                $idKe = $cache[$ke] ?? null;

                if (! $idDari || ! $idKe) {
                    continue;
                }

                // Kedua arah
                $pasangan = [
                    [$idDari, $idKe],
                    [$idKe, $idDari],
                ];

                foreach ($pasangan as [$a, $b]) {
                    $key = $a.'|'.$b;
                    if (! isset($koneksi[$key])) {
                        $koneksi[$key] = ['stasiun_dari_id' => $a, 'stasiun_ke_id' => $b];
                    }
                }
            }
        }

        foreach ($koneksi as $data) {
            KoneksiStasiun::firstOrCreate(
                ['stasiun_dari_id' => $data['stasiun_dari_id'], 'stasiun_ke_id' => $data['stasiun_ke_id']],
                $data,
            );
        }

        $this->command->info('Koneksi stasiun: '.count($koneksi).' edges dibuat.');
    }
}

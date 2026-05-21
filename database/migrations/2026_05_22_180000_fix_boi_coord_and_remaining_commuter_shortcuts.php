<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * v3 — Sisa cleanup setelah PR #87 dan #88.
     *
     * Masalah tersisa di test 50-case KRL commuter v2:
     *
     *  1. Test #1 (BOO→JAKK) masih lewat shortcut MRI-BNC-DU-KPB-JAKK
     *     (4 hop, ~18.1km) — melompati Jalur Layang Kota
     *     MRI-CKI-GDD-JUA-SW-MGB-JAY-JAKK (7 hop, ~22.2km). Penyebab:
     *     edge commuter DU↔KPB (5.2km) bobotnya kecil → Dijkstra pilih
     *     shortcut. Duri tetap bisa ke Kampung Bandan via Angke
     *     (DU↔AK 1.5km, AK↔KPB 4.4km), jadi hapus shortcut DU↔KPB
     *     tidak memutus jaringan.
     *
     *  2. Test #5 (TNG→DU) masih pakai shortcut RW↔DU (8.7km) yang
     *     melompati BOI-TKO-PSG-GGL. Hapus supaya Dijkstra pakai chain
     *     resmi PT KAI (TNG-TTI-BPR-PI-KDS-RW-BOI-TKO-PSG-GGL-DU).
     *
     *  3. Bogor line Citayam→Tanjungbarat masih pakai shortcut CTA↔TNT
     *     (17.5km) yang melompati DP-DPB-POC-UI-LNA-PSMB. Hapus.
     *
     *  4. PSM↔DRN (3.6km) di sebelah PSMB membuat Dijkstra Bogor line
     *     bisa skip PSMB. Hapus shortcut PSM↔DRN. Stasiun PSMB tetap
     *     terhubung lewat chain LNA-PSMB-CTA (sudah ditambahkan v1).
     *
     *  5. Test #49 (PWK→GRT) 404 karena gap CCL↔CB di tipe='commuter'.
     *     Stasiun CCL (Cicalengka, -6.99, 107.84) ujung Bandung Raya,
     *     CB (Cibatu, -7.10, 107.98) ujung pintu Garut. Jarak rel
     *     ~25km. Tambah CCL↔CB tipe='commuter' supaya KA lokal
     *     Bandung-Garut bisa Dijkstra.
     *
     *  6. Koordinat BOI (Bojongindah) salah di DB: lat=-6.4342, lng=106.7028
     *     — itu lokasi 30km dari Jakarta Barat. Bojong Indah real di
     *     Cengkareng, ~-6.1644, 106.7467 (di antara TKO dan RW). Update.
     */
    public function up(): void
    {
        // ── 1. Fix koordinat BOI ──────────────────────────────────────────
        DB::update(
            "UPDATE stasiun
             SET lat = ?, lng = ?, updated_at = NOW()
             WHERE kode_stasiun = 'BOI'",
            [-6.1644, 106.7467]
        );

        // ── 2. Hapus 4 pasang shortcut commuter ───────────────────────────
        $shortcuts = [
            ['DU',  'KPB'],   // melompati Angke
            ['RW',  'DU'],    // melompati BOI-TKO-PSG-GGL
            ['CTA', 'TNT'],   // melompati DP-DPB-POC-UI-LNA-PSMB
            ['PSM', 'DRN'],   // shortcut Pasarminggu-Durenkalibata
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

        // ── 3. Tambah edge CCL↔CB tipe='commuter' (akses Garut) ───────────
        // Bucket calibration (sama dengan KoneksiStasiunSeeder)
        $bucketKm = '
            ROUND((
                (6371 * 2 * asin(sqrt(
                    sin(radians((sb.lat - sa.lat)/2))^2 +
                    cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                    sin(radians((sb.lng - sa.lng)/2))^2
                ))) * CASE
                    WHEN (6371 * 2 * asin(sqrt(
                        sin(radians((sb.lat - sa.lat)/2))^2 +
                        cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                        sin(radians((sb.lng - sa.lng)/2))^2
                    ))) < 5  THEN 1.3169
                    WHEN (6371 * 2 * asin(sqrt(
                        sin(radians((sb.lat - sa.lat)/2))^2 +
                        cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                        sin(radians((sb.lng - sa.lng)/2))^2
                    ))) < 20 THEN 1.1182
                    WHEN (6371 * 2 * asin(sqrt(
                        sin(radians((sb.lat - sa.lat)/2))^2 +
                        cos(radians(sa.lat)) * cos(radians(sb.lat)) *
                        sin(radians((sb.lng - sa.lng)/2))^2
                    ))) < 50 THEN 1.0886
                    ELSE 0.9395
                END
            )::numeric, 1)
        ';

        foreach ([['CCL', 'CB'], ['CB', 'CCL']] as [$from, $to]) {
            DB::statement(
                "INSERT INTO koneksi_stasiun
                    (stasiun_dari_id, stasiun_ke_id, jarak_km, tipe, created_at, updated_at)
                 SELECT sa.id, sb.id, {$bucketKm}, 'commuter', NOW(), NOW()
                 FROM stasiun sa, stasiun sb
                 WHERE sa.kode_stasiun = ? AND sb.kode_stasiun = ?
                   AND sa.lat IS NOT NULL AND sb.lat IS NOT NULL
                 ON CONFLICT (stasiun_dari_id, stasiun_ke_id, tipe) DO NOTHING",
                [$from, $to]
            );
        }
    }

    public function down(): void
    {
        // Data fix — tidak di-rollback. Reinsert shortcut commuter akan
        // membuka kembali bug Dijkstra skip stasiun. Koordinat BOI lama
        // juga salah, tidak perlu dikembalikan.
    }
};

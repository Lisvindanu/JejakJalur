<?php

namespace Database\Seeders;

use App\Models\Kota;
use Illuminate\Database\Seeder;

class KotaSeeder extends Seeder
{
    public function run(): void
    {
        $daftarKota = [
            ['nama' => 'Bandung', 'kode_ibukota' => 'BDG'],
            ['nama' => 'Bandung Barat', 'kode_ibukota' => 'BDGB'],
            ['nama' => 'Banjar', 'kode_ibukota' => 'BJR'],
            ['nama' => 'Bantul', 'kode_ibukota' => 'BTL'],
            ['nama' => 'Banyumas', 'kode_ibukota' => 'BMS'],
            ['nama' => 'Banyuwangi', 'kode_ibukota' => 'BWI'],
            ['nama' => 'Batang', 'kode_ibukota' => 'BTG'],
            ['nama' => 'Bekasi', 'kode_ibukota' => 'BKS'],
            ['nama' => 'Blitar', 'kode_ibukota' => 'BL'],
            ['nama' => 'Blora', 'kode_ibukota' => 'BLR'],
            ['nama' => 'Bogor', 'kode_ibukota' => 'BGR'],
            ['nama' => 'Bojonegoro', 'kode_ibukota' => 'BJN'],
            ['nama' => 'Boyolali', 'kode_ibukota' => 'BYL'],
            ['nama' => 'Brebes', 'kode_ibukota' => 'BBS'],
            ['nama' => 'Ciamis', 'kode_ibukota' => 'CMS'],
            ['nama' => 'Cianjur', 'kode_ibukota' => 'CJR'],
            ['nama' => 'Cilacap', 'kode_ibukota' => 'CLP'],
            ['nama' => 'Cilegon', 'kode_ibukota' => 'CLG'],
            ['nama' => 'Cimahi', 'kode_ibukota' => 'CMH'],
            ['nama' => 'Cirebon', 'kode_ibukota' => 'CBN'],
            ['nama' => 'Demak', 'kode_ibukota' => 'DMK'],
            ['nama' => 'Depok', 'kode_ibukota' => 'DPK'],
            ['nama' => 'Garut', 'kode_ibukota' => 'GRT'],
            ['nama' => 'Gresik', 'kode_ibukota' => 'GRS'],
            ['nama' => 'Grobogan', 'kode_ibukota' => 'GBG'],
            ['nama' => 'Indramayu', 'kode_ibukota' => 'IMY'],
            ['nama' => 'Jakarta Barat', 'kode_ibukota' => 'JKB'],
            ['nama' => 'Jakarta Pusat', 'kode_ibukota' => 'JKP'],
            ['nama' => 'Jakarta Selatan', 'kode_ibukota' => 'JKS'],
            ['nama' => 'Jakarta Timur', 'kode_ibukota' => 'JKT'],
            ['nama' => 'Jakarta Utara', 'kode_ibukota' => 'JKU'],
            ['nama' => 'Jember', 'kode_ibukota' => 'JMR'],
            ['nama' => 'Jombang', 'kode_ibukota' => 'JBG'],
            ['nama' => 'Karanganyar', 'kode_ibukota' => 'KRA'],
            ['nama' => 'Karawang', 'kode_ibukota' => 'KRW'],
            ['nama' => 'Kebumen', 'kode_ibukota' => 'KBM'],
            ['nama' => 'Kediri', 'kode_ibukota' => 'KDR'],
            ['nama' => 'Kendal', 'kode_ibukota' => 'KDL'],
            ['nama' => 'Klaten', 'kode_ibukota' => 'KLT'],
            ['nama' => 'Kulon Progo', 'kode_ibukota' => 'KPG'],
            ['nama' => 'Lamongan', 'kode_ibukota' => 'LMG'],
            ['nama' => 'Lebak', 'kode_ibukota' => 'LBK'],
            ['nama' => 'Lumajang', 'kode_ibukota' => 'LMJ'],
            ['nama' => 'Madiun', 'kode_ibukota' => 'MDN'],
            ['nama' => 'Magetan', 'kode_ibukota' => 'MGT'],
            ['nama' => 'Malang', 'kode_ibukota' => 'MLG'],
            ['nama' => 'Mojokerto', 'kode_ibukota' => 'MJK'],
            ['nama' => 'Nganjuk', 'kode_ibukota' => 'NJK'],
            ['nama' => 'Ngawi', 'kode_ibukota' => 'NGW'],
            ['nama' => 'Pasuruan', 'kode_ibukota' => 'PSR'],
            ['nama' => 'Pekalongan', 'kode_ibukota' => 'PKL'],
            ['nama' => 'Pemalang', 'kode_ibukota' => 'PML'],
            ['nama' => 'Probolinggo', 'kode_ibukota' => 'PBG'],
            ['nama' => 'Purwakarta', 'kode_ibukota' => 'PWK'],
            ['nama' => 'Purworejo', 'kode_ibukota' => 'PWR'],
            ['nama' => 'Semarang', 'kode_ibukota' => 'SMG'],
            ['nama' => 'Serang', 'kode_ibukota' => 'SRG'],
            ['nama' => 'Sidoarjo', 'kode_ibukota' => 'SDJ'],
            ['nama' => 'Sleman', 'kode_ibukota' => 'SLM'],
            ['nama' => 'Solo', 'kode_ibukota' => 'SLO'],
            ['nama' => 'Sragen', 'kode_ibukota' => 'SGN'],
            ['nama' => 'Subang', 'kode_ibukota' => 'SBG'],
            ['nama' => 'Sukabumi', 'kode_ibukota' => 'SKB'],
            ['nama' => 'Sukoharjo', 'kode_ibukota' => 'SKH'],
            ['nama' => 'Surabaya', 'kode_ibukota' => 'SBY'],
            ['nama' => 'Tangerang', 'kode_ibukota' => 'TNG'],
            ['nama' => 'Tangerang Selatan', 'kode_ibukota' => 'TGS'],
            ['nama' => 'Tasikmalaya', 'kode_ibukota' => 'TSM'],
            ['nama' => 'Tegal', 'kode_ibukota' => 'TGL'],
            ['nama' => 'Tulungagung', 'kode_ibukota' => 'TLA'],
            ['nama' => 'Wonogiri', 'kode_ibukota' => 'WNG'],
            ['nama' => 'Yogyakarta', 'kode_ibukota' => 'YOG'],
        ];

        foreach ($daftarKota as $kota) {
            Kota::firstOrCreate(['nama' => $kota['nama']], $kota);
        }
    }
}

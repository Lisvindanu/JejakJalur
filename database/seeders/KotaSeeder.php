<?php

namespace Database\Seeders;

use App\Models\Kota;
use Illuminate\Database\Seeder;

class KotaSeeder extends Seeder
{
    public function run(): void
    {
        $daftarKota = [
            ['nama' => 'Jakarta',    'kode_ibukota' => 'JKT'],
            ['nama' => 'Bandung',    'kode_ibukota' => 'BDG'],
            ['nama' => 'Yogyakarta', 'kode_ibukota' => 'YOG'],
            ['nama' => 'Surabaya',   'kode_ibukota' => 'SBY'],
            ['nama' => 'Semarang',   'kode_ibukota' => 'SMG'],
            ['nama' => 'Solo',       'kode_ibukota' => 'SLO'],
            ['nama' => 'Cirebon',    'kode_ibukota' => 'CRB'],
            ['nama' => 'Purwokerto', 'kode_ibukota' => 'PWT'],
        ];

        foreach ($daftarKota as $kota) {
            Kota::firstOrCreate(['nama' => $kota['nama']], $kota);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Kota;
use App\Models\Stasiun;
use Illuminate\Database\Seeder;

class StasiunSeeder extends Seeder
{
    public function run(): void
    {
        $daftarStasiun = [
            'Jakarta' => [
                ['nama' => 'Gambir',       'kode_stasiun' => 'GMR'],
                ['nama' => 'Pasar Senen',  'kode_stasiun' => 'PSE'],
                ['nama' => 'Jatinegara',   'kode_stasiun' => 'JNG'],
            ],
            'Bandung' => [
                ['nama' => 'Bandung',      'kode_stasiun' => 'BD'],
                ['nama' => 'Kiaracondong', 'kode_stasiun' => 'KAC'],
            ],
            'Yogyakarta' => [
                ['nama' => 'Tugu',         'kode_stasiun' => 'YK'],
                ['nama' => 'Lempuyangan', 'kode_stasiun' => 'LPN'],
            ],
            'Surabaya' => [
                ['nama' => 'Gubeng',       'kode_stasiun' => 'SGU'],
                ['nama' => 'Pasar Turi',   'kode_stasiun' => 'SBI'],
            ],
            'Semarang' => [
                ['nama' => 'Tawang',       'kode_stasiun' => 'SMT'],
                ['nama' => 'Poncol',       'kode_stasiun' => 'SMC'],
            ],
            'Solo' => [
                ['nama' => 'Balapan',      'kode_stasiun' => 'SLO'],
                ['nama' => 'Solo Jebres',  'kode_stasiun' => 'SLJ'],
            ],
            'Cirebon' => [
                ['nama' => 'Cirebon',      'kode_stasiun' => 'CN'],
                ['nama' => 'Prujakan',     'kode_stasiun' => 'CNP'],
            ],
            'Purwokerto' => [
                ['nama' => 'Purwokerto',   'kode_stasiun' => 'PWT'],
            ],
        ];

        foreach ($daftarStasiun as $namaKota => $stasiun) {
            $kota = Kota::where('nama', $namaKota)->first();

            if (! $kota) {
                continue;
            }

            foreach ($stasiun as $dataStasiun) {
                Stasiun::firstOrCreate(
                    ['kode_stasiun' => $dataStasiun['kode_stasiun']],
                    array_merge($dataStasiun, ['kota_id' => $kota->id]),
                );
            }
        }
    }
}

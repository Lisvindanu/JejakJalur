<?php

namespace Database\Seeders;

use App\Models\Destinasi;
use App\Models\Stasiun;
use Illuminate\Database\Seeder;

class DestinasiSeeder extends Seeder
{
    public function run(): void
    {
        $daftarDestinasi = [
            'GMR' => [
                [
                    'nama' => 'Monumen Nasional (Monas)',
                    'deskripsi' => 'Ikon Jakarta yang berdiri megah di pusat kota. Dibangun sebagai simbol perjuangan kemerdekaan Indonesia, Monas menawarkan pemandangan 360° kota Jakarta dari puncaknya.',
                    'alamat' => 'Gambir, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Nasi Uduk Kebon Kacang',
                    'deskripsi' => 'Nasi uduk legendaris yang sudah berdiri sejak puluhan tahun. Disajikan dengan lauk lengkap seperti ayam goreng, semur jengkol, dan tempe orek yang gurih.',
                    'alamat' => 'Jl. Kebon Kacang, Tanah Abang',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],
            'BD' => [
                [
                    'nama' => 'Floating Market Lembang',
                    'deskripsi' => 'Pasar terapung unik di Lembang yang menawarkan aneka kuliner khas Sunda di atas rakit di tengah danau. Suasana segar pegunungan membuat pengalaman makan semakin menyenangkan.',
                    'alamat' => 'Jl. Grand Hotel No.33E, Lembang',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Batagor Kingsley',
                    'deskripsi' => 'Batagor khas Bandung yang sudah terkenal sejak 1975. Disajikan dengan saus kacang kental yang gurih dan sedikit pedas, cocok sebagai oleh-oleh khas Bandung.',
                    'alamat' => 'Jl. Veteran No.7, Bandung',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],
            'YK' => [
                [
                    'nama' => 'Keraton Ngayogyakarta Hadiningrat',
                    'deskripsi' => 'Istana resmi Kesultanan Yogyakarta yang masih aktif hingga kini. Bangunan berarsitektur Jawa klasik ini menyimpan koleksi benda-benda kerajaan bersejarah.',
                    'alamat' => 'Jl. Rotowijayan Blok No.1, Kraton, Yogyakarta',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Gudeg Yu Djum',
                    'deskripsi' => 'Gudeg legendaris Yogyakarta yang sudah berdiri sejak 1950. Gudeg basah dengan cita rasa manis gurih khas Jogja, disajikan dengan krecek, ayam kampung, dan telur.',
                    'alamat' => 'Jl. Kaliurang KM 4.5, Sleman',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
            ],
            'SGU' => [
                [
                    'nama' => 'House of Sampoerna',
                    'deskripsi' => 'Museum sejarah keluarga Sampoerna yang terletak di bangunan bersejarah era kolonial Belanda. Terdapat galeri foto, koleksi artefak, dan kafe bergaya heritage.',
                    'alamat' => 'Taman Sampoerna No.6, Krembangan, Surabaya',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Rawon Setan Mbak Endang',
                    'deskripsi' => 'Rawon hitam pekat khas Surabaya yang terkenal. Dinamakan "Setan" karena buka hanya tengah malam. Kuah kental dari kluwek dengan daging sapi yang empuk.',
                    'alamat' => 'Jl. Embong Malang No.78, Surabaya',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],
        ];

        foreach ($daftarDestinasi as $kodeStasiun => $destinasiList) {
            $stasiun = Stasiun::where('kode_stasiun', $kodeStasiun)->first();

            if (! $stasiun) {
                continue;
            }

            foreach ($destinasiList as $dataDestinasi) {
                Destinasi::firstOrCreate(
                    ['nama' => $dataDestinasi['nama']],
                    array_merge($dataDestinasi, ['stasiun_id' => $stasiun->id]),
                );
            }
        }
    }
}

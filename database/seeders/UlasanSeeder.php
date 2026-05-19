<?php

namespace Database\Seeders;

use App\Models\Destinasi;
use App\Models\Ulasan;
use App\Models\User;
use Illuminate\Database\Seeder;

class UlasanSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@jejakjalur.id')->first();
        $demo = User::where('email', 'demo@jejakjalur.id')->first();

        if (! $admin || ! $demo) {
            return;
        }

        // Template ulasan per kategori: [judul, konten, rating, user (0=admin, 1=demo)]
        $templatePerKategori = [
            'Wisata' => [
                ['Destinasi Wajib Kunjung!', 'Benar-benar memukau. Saya datang bersama keluarga dan semua menikmati. Tempat bersih, fasilitas memadai, dan petugasnya ramah. Sangat direkomendasikan untuk wisata edukasi maupun rekreasi.', 5, 0],
                ['Pengalaman Berkesan', 'Sudah beberapa kali ke sini tapi selalu ada yang baru untuk dinikmati. Lokasinya strategis dan mudah dijangkau dari stasiun. Antrean cukup ramai di akhir pekan, lebih baik datang pagi.', 4, 1],
                ['Bagus, Tapi Perlu Peningkatan', 'Tempatnya historis dan menarik. Fasilitas toilet perlu lebih diperhatikan kebersihannya. Papan informasi kurang lengkap untuk pengunjung asing. Overall masih recommended.', 4, 0],
            ],
            'Kuliner' => [
                ['Cita Rasa Otentik yang Sulit Ditemukan', 'Rasa autentiknya sungguh tidak mengecewakan. Sudah langganan bertahun-tahun dan kualitasnya konsisten. Porsinya juga pas, tidak terlalu kecil. Harga sebanding dengan kualitas.', 5, 1],
                ['Wajib Dicoba Saat Berkunjung', 'Ini rekomendasi pertama saya untuk siapa saja yang berkunjung ke kota ini. Rasanya unik dan tidak bisa ditemukan di tempat lain. Antri sedikit tapi worth it banget.', 5, 0],
                ['Enak, Akan Kembali Lagi', 'Makanannya lezat dan porsinya cukup mengenyangkan. Tempatnya sederhana tapi nyaman. Pelayanan cepat meski di jam ramai. Harganya juga masih sangat terjangkau.', 4, 1],
            ],
            'UMKM' => [
                ['Produk Lokal Berkualitas Tinggi', 'Pilihan produknya lengkap dan kualitasnya tidak kalah dengan brand besar. Penjualnya informatif dan membantu memilih produk yang sesuai kebutuhan. Bangga belanja produk lokal!', 5, 0],
                ['Tempat Belanja Oleh-Oleh Terbaik', 'Satu atap semua ada di sini. Harganya kompetitif dan bisa ditawar untuk pembelian banyak. Produknya asli dan terjamin kualitasnya. Cocok untuk oleh-oleh atau koleksi pribadi.', 4, 1],
                ['Recommended untuk Wisata Belanja', 'Tempatnya strategis dan mudah dijangkau. Produk UMKM lokal yang ditawarkan beragam dan berkualitas. Sedikit penuh di akhir pekan tapi worth it. Dukung produk lokal Indonesia!', 4, 0],
            ],
        ];

        $destinasiList = Destinasi::all();

        foreach ($destinasiList as $destinasi) {
            $kategori = $destinasi->kategori;
            $templates = $templatePerKategori[$kategori] ?? $templatePerKategori['Wisata'];
            $users = [$admin, $demo, $admin];

            foreach ($templates as $idx => $template) {
                [$judul, $konten, $rating, $userIdx] = $template;
                $user = $users[$userIdx];

                Ulasan::firstOrCreate(
                    [
                        'destinasi_id' => $destinasi->id,
                        'judul' => $judul,
                    ],
                    [
                        'user_id' => $user->id,
                        'konten' => $konten,
                        'rating' => $rating,
                    ]
                );
            }
        }
    }
}

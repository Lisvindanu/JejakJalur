<?php

namespace Database\Seeders;

use App\Models\Destinasi;
use App\Models\Stasiun;
use Illuminate\Database\Seeder;

class DestinasiKota2Seeder extends Seeder
{
    public function run(): void
    {
        $daftarDestinasi = [
            // ── Jakarta Pusat ─────────────────────────────────────────────
            'SUD' => [
                [
                    'nama' => 'Kawasan SCBD & Sudirman',
                    'deskripsi' => 'Kawasan bisnis premium Jakarta yang juga menjadi pusat gaya hidup dan kuliner modern. Deretan gedung pencakar langit, restoran fine dining, kafe trendi, dan butik internasional menjadikan Sudirman-SCBD sebagai destinasi urban terpopuler di Jakarta.',
                    'alamat' => 'Jl. Jend. Sudirman, Senayan, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Gelora Bung Karno (GBK)',
                    'deskripsi' => 'Kompleks olahraga kebanggaan nasional berkapasitas 77.000 kursi yang juga berfungsi sebagai taman kota terbesar Jakarta. Area jogging, bersepeda, dan lapangan olahraga yang ramai dikunjungi warga Jakarta setiap akhir pekan.',
                    'alamat' => 'Jl. Pintu Satu Senayan, Gelora, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Sate Kambing H. Abdullah Sudirman',
                    'deskripsi' => 'Warung sate kambing legendaris di kawasan Sudirman yang sudah beroperasi sejak 1978. Sate kambing empuk dengan bumbu kecap manis khas Jakarta, disajikan dengan lontong dan kuah soto kambing gurih.',
                    'alamat' => 'Jl. Kebon Sirih, Menteng, Jakarta Pusat',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            'GDD' => [
                [
                    'nama' => 'Taman Suropati Menteng',
                    'deskripsi' => 'Taman kota bersejarah di jantung kawasan Menteng yang dikelilingi gedung-gedung kolonial Belanda abad ke-20. Spot favorit seniman jalanan, komunitas musik, dan warga Jakarta untuk bersantai di tengah kota.',
                    'alamat' => 'Jl. Taman Suropati, Menteng, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Menteng Heritage Food Court',
                    'deskripsi' => 'Kompleks kuliner di kawasan heritage Menteng yang menyajikan berbagai masakan Indonesia otentik. Dari nasi goreng babat, soto betawi, hingga kerak telor — semua tersedia dalam satu tempat bergaya vintage di jantung Jakarta Pusat.',
                    'alamat' => 'Jl. HOS Cokroaminoto, Menteng, Jakarta Pusat',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            'THB' => [
                [
                    'nama' => 'Pasar Tanah Abang',
                    'deskripsi' => 'Pasar grosir tekstil terbesar di Asia Tenggara dengan lebih dari 15.000 kios tersebar di beberapa blok. Surga fashion Muslim, batik, kain tradisional, dan berbagai produk garmen dengan harga grosir langsung dari produsen.',
                    'alamat' => 'Jl. KH. Wahid Hasyim, Tanah Abang, Jakarta Pusat',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
                [
                    'nama' => 'Nasi Uduk Tanah Abang Pak Wahid',
                    'deskripsi' => 'Nasi uduk Betawi legendaris yang sudah berdagang sejak 1965 di kawasan Tanah Abang. Nasi uduk gurih dengan santan dan daun pandan, dilengkapi ayam goreng, semur jengkol, dan sambal kacang yang terkenal pedasnya.',
                    'alamat' => 'Pasar Tanah Abang Blok A, Jakarta Pusat',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Jakarta Timur ─────────────────────────────────────────────
            'CUK' => [
                [
                    'nama' => 'Taman Mini Indonesia Indah (TMII)',
                    'deskripsi' => 'Taman wisata bertema kebudayaan Indonesia dengan 33 anjungan provinsi, museum, danau miniatur kepulauan Indonesia, dan berbagai wahana edukasi. Destinasi keluarga terpopuler di Jakarta Timur yang menyajikan kekayaan budaya Nusantara.',
                    'alamat' => 'Jl. Raya Taman Mini, Cipayung, Jakarta Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Mie Ayam Mat Lengket Jatinegara',
                    'deskripsi' => 'Mie ayam dan nasi uduk legendaris di kawasan Jatinegara Kaum yang sudah terkenal sejak puluhan tahun. Ayam kampung muda yang gurih dengan mie kenyal dan pangsit goreng renyah menjadi sajian yang selalu diburu warga Jakarta Timur.',
                    'alamat' => 'Jl. Jatinegara Kaum, Pulogadung, Jakarta Timur',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Tangerang Selatan ─────────────────────────────────────────
            'SRP' => [
                [
                    'nama' => 'BSD City & AEON Mall',
                    'deskripsi' => 'Kota mandiri modern terbesar di Tangerang Selatan dengan AEON Mall sebagai pusat perbelanjaan kelas dunia. Konsep mixed-use development dengan hunian, perkantoran, dan fasilitas hiburan terlengkap di kawasan BSD.',
                    'alamat' => 'BSD City, Serpong, Tangerang Selatan',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Situ Gintung',
                    'deskripsi' => 'Danau buatan seluas 31 hektare di Ciputat yang telah direvitalisasi menjadi kawasan wisata alam dan olahraga. Area jogging, bersepeda, perahu dayung, dan berbagai kuliner pinggir danau tersedia di sini.',
                    'alamat' => 'Jl. Situ Gintung, Ciputat, Tangerang Selatan',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Pasar Intermoda BSD',
                    'deskripsi' => 'Pasar modern terintegrasi di BSD yang menjadi pusat kuliner dan UMKM lokal Tangerang Selatan. Ratusan pedagang menyajikan berbagai makanan tradisional, produk kerajinan tangan, dan fashion lokal dengan harga terjangkau.',
                    'alamat' => 'Jl. Pahlawan Seribu, BSD City, Serpong',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
            ],

            // ── Bandung Barat ─────────────────────────────────────────────
            'PDL' => [
                [
                    'nama' => 'Situ Ciburuy',
                    'deskripsi' => 'Danau alami di Padalarang yang dikelilingi perbukitan hijau dengan pemandangan Gunung Tangkuban Perahu di kejauhan. Tersedia perahu sewaan, kuliner ikan bakar segar, dan area piknik yang nyaman di tepi danau.',
                    'alamat' => 'Desa Ciburuy, Padalarang, Bandung Barat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Tebing Citatah',
                    'deskripsi' => 'Kawasan tebing batu kapur berusia jutaan tahun di Padalarang yang terkenal sebagai lokasi panjat tebing dan wisata alam. Di dalamnya terdapat Goa Pawon tempat ditemukannya fosil manusia purba berusia 5.600-9.500 tahun.',
                    'alamat' => 'Citatah, Padalarang, Bandung Barat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Keramik Plered Bandung Barat',
                    'deskripsi' => 'Sentra keramik tradisional Plered yang sudah terkenal sejak abad ke-18. Pengunjung bisa melihat langsung proses pembuatan keramik dan gerabah khas Plered, serta membeli berbagai produk gerabah seni dengan harga langsung dari pengrajin.',
                    'alamat' => 'Plered, Purwakarta — dapat diakses dari Stasiun Padalarang',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Cimahi ────────────────────────────────────────────────────
            'CMI' => [
                [
                    'nama' => 'Curug Cimahi (Curug Pelangi)',
                    'deskripsi' => 'Air terjun setinggi 87 meter yang paling terkenal di Cimahi dengan nuansa mistis dan pemandangan luar biasa. Dijuluki Curug Pelangi karena efek cahaya yang menciptakan pelangi alami saat pagi hari. Akses hiking sekitar 30 menit dari parkiran.',
                    'alamat' => 'Jl. Kolonel Masturi, Cisarua, Cimahi Utara',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Oncom Cimahi',
                    'deskripsi' => 'Oncom merah khas Cimahi yang menjadi bahan baku berbagai masakan Sunda autentik. Pabrik oncom tradisional di Cimahi memproduksi oncom berkualitas dari kedelai pilihan yang dijual langsung dan menjadi oleh-oleh khas daerah.',
                    'alamat' => 'Pasar Antri Cimahi, Cimahi Tengah',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
            ],

            // ── Cianjur ───────────────────────────────────────────────────
            'CJ' => [
                [
                    'nama' => 'Taman Bunga Nusantara',
                    'deskripsi' => 'Taman bunga tematik seluas 35 hektare dengan koleksi lebih dari 20.000 tanaman bunga dari berbagai penjuru dunia. Taman bergaya Eropa, Jepang, dan tropis menjadikan tempat ini sebagai destinasi wisata keluarga terpopuler di Cianjur.',
                    'alamat' => 'Jl. Mariwati KM 7, Sukaresmi, Cianjur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Sate Maranggi Cibungur',
                    'deskripsi' => 'Sate daging sapi atau kambing khas Cianjur-Purwakarta dengan bumbu rempah manis-gurih yang dibakar di atas arang. Berbeda dari sate Madura, Sate Maranggi menggunakan potongan daging yang lebih besar dengan bumbu meresap sempurna.',
                    'alamat' => 'Jl. Raya Cibungur, Cianjur',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Beras Pandanwangi Cianjur',
                    'deskripsi' => 'Pusat penjualan beras Pandanwangi — varietas beras premium khas Cianjur dengan aroma pandan alami yang harum dan rasa pulen istimewa. Ditetapkan sebagai Indikasi Geografis oleh pemerintah, beras ini hanya tumbuh di dataran tinggi Cianjur.',
                    'alamat' => 'Pasar Cianjur, Jl. Siti Jenab, Cianjur',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Garut ─────────────────────────────────────────────────────
            'KRAI' => [
                [
                    'nama' => 'Kawah Kamojang',
                    'deskripsi' => 'Kawasan geothermal aktif di ketinggian 1.730 mdpl dengan lebih dari 20 kawah uap belerang. Fenomena alam unik berupa semburan uap panas dari celah-celah tanah yang telah dimanfaatkan sebagai PLTP Kamojang sejak 1982.',
                    'alamat' => 'Kamojang, Ibun, Bandung — Garut (perbatasan)',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Dodol Garut Picnic',
                    'deskripsi' => 'Produsen dodol Garut terkemuka sejak 1920 dengan lebih dari 30 varian rasa. Dodol berbahan gula aren, ketan hitam, dan santan dengan kemasan modern, menjadikannya oleh-oleh paling ikonik dari Garut yang tersedia di seluruh Indonesia.',
                    'alamat' => 'Jl. Ciledug No.1, Tarogong, Garut',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Pemandian Air Panas Cipanas Garut',
                    'deskripsi' => 'Kawasan pemandian air panas alami di kaki Gunung Guntur dengan suhu air mencapai 40-55°C. Ratusan vila dan kolam renang air panas tersebar di sepanjang jalur Cipanas, menjadikannya destinasi relaksasi terpopuler di Jawa Barat.',
                    'alamat' => 'Cipanas, Tarogong Kaler, Garut',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Sukabumi ──────────────────────────────────────────────────
            'SI' => [
                [
                    'nama' => 'Geopark Ciletuh UNESCO',
                    'deskripsi' => 'Taman bumi kelas dunia yang diakui UNESCO pada 2018. Hamparan batuan tertua di Jawa berusia 65 juta tahun, dipadukan dengan air terjun spektakuler, pantai berpasir putih, dan sawah berundak yang membentuk amfiteater alam yang megah.',
                    'alamat' => 'Ciletuh, Pelabuhan Ratu, Sukabumi',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.8,
                ],
                [
                    'nama' => 'Pantai Pelabuhan Ratu',
                    'deskripsi' => 'Pantai legendaris di Sukabumi Selatan yang dikenal dengan ombak besarnya dan legenda Ratu Laut Selatan Nyi Roro Kidul. Hamparan pasir hitam kebiruan, seafood segar, dan pemandangan sunset yang spektakuler menjadi daya tarik utama.',
                    'alamat' => 'Pelabuhan Ratu, Sukabumi Selatan',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Mochi Sukabumi Lampion',
                    'deskripsi' => 'Produsen mochi Sukabumi yang paling terkenal sejak 1983. Mochi berisi kacang tanah, coklat, dan durian dengan kulit kenyal berwarna-warni menjadi oleh-oleh wajib dari Sukabumi yang kini tersedia dalam lebih dari 20 varian rasa.',
                    'alamat' => 'Jl. Otista, Gunung Parang, Sukabumi',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Karawang ──────────────────────────────────────────────────
            'KW' => [
                [
                    'nama' => 'Pantai Tanjung Pakis',
                    'deskripsi' => 'Pantai landai berpasir putih di pesisir utara Karawang yang menjadi destinasi wisata bahari unggulan. Pohon-pohon pakis yang berjejer di tepi pantai memberikan keteduhan alami, sementara ombak tenang cocok untuk berenang bersama keluarga.',
                    'alamat' => 'Pakisjaya, Karawang Utara, Karawang',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Makam Syekh Quro Karawang',
                    'deskripsi' => 'Situs ziarah bersejarah makam Syekh Hasanuddin (Syekh Quro) — ulama penyebar Islam pertama di Karawang pada abad ke-15. Komplek makam yang asri di pinggir sungai Citarum ini dikunjungi ribuan peziarah setiap harinya.',
                    'alamat' => 'Desa Pulokalapa, Lemahabang, Karawang',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Opak Ketan Karawang',
                    'deskripsi' => 'Keripik opak berbahan ketan khas Karawang dengan cita rasa gurih dan renyah. Dibuat secara tradisional oleh UMKM lokal dengan berbagai varian rasa — original, bawang, dan pedas — yang menjadi oleh-oleh khas Karawang.',
                    'alamat' => 'Sentra Opak Ketan, Telukjambe, Karawang',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Purwakarta ────────────────────────────────────────────────
            'PWK' => [
                [
                    'nama' => 'Waduk Jatiluhur',
                    'deskripsi' => 'Waduk terbesar di Indonesia dengan kapasitas 3 miliar m³ air yang dibangun pada 1957-1967. Kawasan wisata air yang menawarkan olah raga dayung, memancing, dan menikmati panorama waduk dari bukit-bukit sekitarnya.',
                    'alamat' => 'Jatiluhur, Purwakarta, Jawa Barat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Sate Maranggi H. Yetty',
                    'deskripsi' => 'Warung Sate Maranggi paling legendaris di Purwakarta yang sudah berdiri sejak 1960. Daging sapi segar yang dilumuri bumbu rempah khas kemudian dibakar di atas arang kayu, menghasilkan cita rasa yang tidak ada duanya.',
                    'alamat' => 'Jl. Raya Cibungur No.43, Purwakarta',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Kue Simping Purwakarta',
                    'deskripsi' => 'Kue tradisional khas Purwakarta berbahan tepung tapioka yang sudah ada sejak zaman kolonial. Tipis, renyah, dan gurih dengan aroma bawang yang khas. Diproduksi oleh ratusan UMKM di Purwakarta dan menjadi oleh-oleh paling dicari.',
                    'alamat' => 'Sentra Kue Simping, Jl. Veteran, Purwakarta',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Indramayu ─────────────────────────────────────────────────
            'JTB' => [
                [
                    'nama' => 'Mangga Gedong Gincu Indramayu',
                    'deskripsi' => 'Sentra mangga Gedong Gincu dan Cengkir khas Indramayu — mangga premium yang hanya tumbuh di wilayah tertentu di Indramayu. Tersedia langsung dari kebun petani dengan rasa manis-segar yang tiada duanya, terutama di musim panen Mei-Agustus.',
                    'alamat' => 'Sentra Mangga Indramayu, Jl. Raya Indramayu',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Pantai Karangsong Indramayu',
                    'deskripsi' => 'Pantai dan kawasan konservasi mangrove di Indramayu dengan hutan bakau seluas ratusan hektare. Spot bird watching, susur mangrove dengan perahu, dan menikmati hasil laut segar langsung dari nelayan di tempat pelelangan ikan.',
                    'alamat' => 'Karangsong, Indramayu, Jawa Barat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Ciamis ────────────────────────────────────────────────────
            'CI' => [
                [
                    'nama' => 'Situs Galuh Purba Ciamis',
                    'deskripsi' => 'Kawasan heritage Kerajaan Galuh — salah satu kerajaan Hindu tertua di Jawa Barat. Berbagai situs megalitik, makam raja-raja Galuh, dan peninggalan budaya Sunda kuno tersebar di sekitar Ciamis yang bisa dijelajahi sebagai wisata sejarah.',
                    'alamat' => 'Kawasan Cagar Budaya Galuh, Ciamis, Jawa Barat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Galendo (Ampas Minyak Kelapa) Ciamis',
                    'deskripsi' => 'Galendo adalah makanan khas Ciamis berupa ampas minyak kelapa yang kering dan renyah dengan rasa gurih-manis unik. Diproduksi secara tradisional oleh UMKM Ciamis dan sulit ditemukan di daerah lain, menjadikannya oleh-oleh eksklusif.',
                    'alamat' => 'Sentra Galendo, Ciamis, Jawa Barat',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Serang (Banten) ───────────────────────────────────────────
            'SG' => [
                [
                    'nama' => 'Situs Banten Lama',
                    'deskripsi' => 'Kawasan warisan budaya Kesultanan Banten (abad ke-16-19) yang mencakup Masjid Agung Banten, Keraton Surosowan, Keraton Kaibon, Benteng Speelwijk, dan Vihara Avalokitesvara. Saksi sejarah kejayaan perdagangan rempah Nusantara.',
                    'alamat' => 'Banten, Kasemen, Serang, Banten',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Masjid Agung Banten',
                    'deskripsi' => 'Masjid bersejarah peninggalan Kesultanan Banten (1552) dengan menara unik bergaya Eropa setinggi 24 meter. Kompleks masjid yang terus direvitalisasi ini menjadi salah satu objek wisata religi paling penting di Pulau Jawa.',
                    'alamat' => 'Jl. Masjid Agung, Banten, Serang',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Rabeg Khas Banten',
                    'deskripsi' => 'Masakan khas Banten berupa gulai kambing berbumbu hitam legam dengan rempah ketumbar, merica, jahe, dan bawang yang kuat. Hidangan bersejarah yang konon sudah ada sejak zaman Kesultanan Banten dan kini menjadi kuliner ikonik Serang.',
                    'alamat' => 'Jl. Raya Serang, Banten',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Cilegon ───────────────────────────────────────────────────
            'CLG' => [
                [
                    'nama' => 'Pantai Anyer',
                    'deskripsi' => 'Pantai paling populer di Banten yang terkenal dengan pasir putihnya dan pemandangan Gunung Krakatau di kejauhan. Berbagai resort, villa, dan restoran seafood berjejer di sepanjang pantai. Wisata snorkeling dan diving juga tersedia di perairan Anyer.',
                    'alamat' => 'Anyer, Serang, Banten (40 km dari Stasiun Cilegon)',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Krakatau Steel Industrial Area',
                    'deskripsi' => 'Kawasan industri baja terbesar di Indonesia milik PT Krakatau Steel yang dapat dikunjungi melalui tur industri resmi. Menjadi salah satu destinasi wisata edukasi yang unik untuk melihat proses peleburan baja berkualitas internasional.',
                    'alamat' => 'Kawasan Industri Krakatau, Cilegon, Banten',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
            ],

            // ── Lebak ─────────────────────────────────────────────────────
            'RK' => [
                [
                    'nama' => 'Kampung Adat Baduy',
                    'deskripsi' => 'Komunitas adat Suku Baduy yang hidup sepenuhnya selaras alam tanpa teknologi modern. Wisatawan dapat mengunjungi Baduy Luar untuk berinteraksi langsung, trekking melalui hutan, dan menyaksikan kain tenun tradisional buatan tangan yang indah.',
                    'alamat' => 'Kanekes, Leuwidamar, Lebak, Banten',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Kain Tenun Baduy',
                    'deskripsi' => 'Kain tenun tradisional buatan tangan Suku Baduy yang menggunakan pewarna alami dari tanaman hutan. Motif-motif geometris khas Baduy yang dibuat tanpa alat modern menjadikan kain ini memiliki nilai budaya dan koleksi yang tinggi.',
                    'alamat' => 'Rangkasbitung, Lebak, Banten',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
            ],

            // ── Batang ────────────────────────────────────────────────────
            'BTG' => [
                [
                    'nama' => 'Pantai Sigandu Batang',
                    'deskripsi' => 'Pantai wisata unggulan Batang dengan pasir putih kecoklatan, ombak tenang, dan pohon cemara berjejer indah. Dilengkapi area camping, wahana banana boat, dan kuliner seafood segar langsung dari nelayan setempat.',
                    'alamat' => 'Jl. Pantai Sigandu, Batang, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Batik Tulis Batang',
                    'deskripsi' => 'Batik tulis khas Batang dengan motif Tiga Negeri yang memadukan gaya Pekalongan, Solo, dan Lasem dalam satu lembar kain. Warna cerah dan motif unik menjadikan batik Batang diakui sebagai warisan budaya takbenda nasional.',
                    'alamat' => 'Sentra Batik, Jl. A. Yani, Batang, Jawa Tengah',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Brebes ────────────────────────────────────────────────────
            'BB' => [
                [
                    'nama' => 'Telur Asin Brebes',
                    'deskripsi' => 'Brebes adalah ibu kota telur asin Indonesia — lebih dari 100 produsen telur asin tersebar di sini. Telur bebek yang diasinkan dengan campuran abu gosok dan garam selama 7-14 hari menghasilkan cita rasa gurih-asin yang khas dan tidak tertandingi.',
                    'alamat' => 'Sentra Telur Asin, Jl. Jend. Sudirman, Brebes',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Sentra Bawang Merah Brebes',
                    'deskripsi' => 'Brebes adalah penghasil bawang merah terbesar di Indonesia, menghasilkan 20-30% kebutuhan nasional. Pengunjung dapat mengunjungi kebun bawang, menyaksikan proses panen, dan membeli bawang merah segar langsung dari petani dengan harga terbaik.',
                    'alamat' => 'Kecamatan Larangan & Ketanggungan, Brebes',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Pemalang ──────────────────────────────────────────────────
            'PML' => [
                [
                    'nama' => 'Pantai Widuri Pemalang',
                    'deskripsi' => 'Pantai wisata andalan Pemalang dengan hamparan pasir cokelat yang landai dan ombak yang bersahabat. Dilengkapi taman bermain anak, mushola, dan warung makan seafood. Matahari terbenam di Widuri dikenal sebagai salah satu yang terindah di pantai utara Jawa.',
                    'alamat' => 'Widuri, Pemalang, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Grombyang Pemalang',
                    'deskripsi' => 'Kuliner ikonik Pemalang berupa sup daging sapi dengan kuah merah kecoklatan yang kental dari bumbu rempah istimewa. Disajikan dengan nasi dan sate lontong, Grombyang hanya bisa ditemukan di Pemalang dan menjadi kebanggaan kuliner kota ini.',
                    'alamat' => 'Alun-Alun Pemalang, Jl. Pemuda, Pemalang',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Kendal ────────────────────────────────────────────────────
            'KLN' => [
                [
                    'nama' => 'Pantai Ngebum Kendal',
                    'deskripsi' => 'Pantai pasir putih yang bersih dan relatif sepi di pesisir Kendal dengan pohon kelapa dan bakau yang menjaga ekosistem. Spot favorit untuk menikmati sunrise, bersepeda santai, dan menikmati ikan bakar segar dari nelayan lokal.',
                    'alamat' => 'Ngebum, Kaliwungu Selatan, Kendal',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
                [
                    'nama' => 'Klengkeng Kopyor Kendal',
                    'deskripsi' => 'Kendal terkenal sebagai penghasil kelengkeng terbaik di Jawa Tengah, terutama varietas kopyor yang langka. Kebun-kebun kelengkeng di Kendal membuka wisata petik buah langsung dari pohon terutama saat musim panen Juli-Agustus.',
                    'alamat' => 'Sentra Kelengkeng, Kaliwungu, Kendal',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Demak ─────────────────────────────────────────────────────
            'BBG' => [
                [
                    'nama' => 'Masjid Agung Demak',
                    'deskripsi' => 'Salah satu masjid tertua dan termegah di Indonesia yang dibangun oleh Wali Songo pada abad ke-15. Arsitekturnya yang unik memadukan gaya Hindu-Jawa dengan Islam, dengan tiang soko guru dari kayu jati setinggi 16 meter yang berdiri tanpa sambungan.',
                    'alamat' => 'Alun-alun Demak, Bintoro, Demak',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Makam Sunan Kalijaga',
                    'deskripsi' => 'Makam Sunan Kalijaga — salah satu Wali Songo yang paling berpengaruh dalam penyebaran Islam di Jawa — di Kadilangu, Demak. Ribuan peziarah datang setiap hari dari berbagai penjuru Indonesia untuk berdoa dan mengenang jasa-jasanya.',
                    'alamat' => 'Kadilangu, Demak, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Bandeng Presto Demak',
                    'deskripsi' => 'Ikan bandeng presto khas Demak yang dimasak dengan tekanan tinggi hingga seluruh tulang menjadi lunak dan bisa dimakan. Berbeda dari bandeng biasa, bandeng presto Demak menggunakan ikan bandeng segar dari tambak lokal dengan bumbu rempah yang meresap sempurna.',
                    'alamat' => 'Pasar Demak, Jl. Sultan Patah, Demak',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Grobogan ──────────────────────────────────────────────────
            'GD' => [
                [
                    'nama' => 'Bledug Kuwu',
                    'deskripsi' => 'Fenomena alam unik berupa lumpur vulkanik yang menyembur setinggi 1-10 meter secara periodik dari dalam tanah. Berlokasi di padang gersang dengan lapisan garam dan belerang di permukaan, Bledug Kuwu menjadi salah satu geowisata paling langka di Jawa.',
                    'alamat' => 'Desa Kuwu, Kradenan, Grobogan',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Api Abadi Mrapen',
                    'deskripsi' => 'Api abadi yang tidak pernah padam selama berabad-abad karena gas alam yang keluar dari dalam bumi. Api Mrapen sering digunakan sebagai sumber nyala Obor PON dan berbagai upacara ritual keagamaan. Fenomena geologi langka yang hanya ada di beberapa tempat di dunia.',
                    'alamat' => 'Desa Manggarmas, Godong, Grobogan',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Blora ─────────────────────────────────────────────────────
            'CU' => [
                [
                    'nama' => 'Hutan Jati Blora',
                    'deskripsi' => 'Kawasan hutan jati terluas dan terbaik di Indonesia dengan pohon jati berusia ratusan tahun. Agroforestry jati yang dikelola oleh Perhutani ini menjadi destinasi ekowisata yang menawarkan trekking hutan, susur sungai, dan pemandangan alam yang asri.',
                    'alamat' => 'Kawasan Perhutani, Blora, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Sate Ayam Blora',
                    'deskripsi' => 'Sate ayam khas Blora dengan ukuran tusukan yang lebih kecil namun lebih banyak per porsi. Menggunakan ayam kampung pilihan dengan bumbu kacang spesial yang lebih cair dan sedikit manis, disajikan dengan lontong dan bawang goreng. Wajib dicoba saat transit di Blora.',
                    'alamat' => 'Alun-alun Blora, Jl. A. Yani, Blora',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Boyolali ──────────────────────────────────────────────────
            'TW' => [
                [
                    'nama' => 'Kawasan Wisata Selo (Gunung Merapi-Merbabu)',
                    'deskripsi' => 'Kawasan wisata alam di perbatasan Boyolali-Magelang dengan panorama Gunung Merapi dan Merbabu yang memukau. Camping ground, kebun stroberi, dan sunrise yang spektakuler dari Bukit Klangon tersedia di sini untuk para pencinta alam.',
                    'alamat' => 'Desa Selo, Boyolali, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Susu Sapi Segar Boyolali',
                    'deskripsi' => 'Boyolali adalah kota penghasil susu sapi terbesar di Jawa Tengah. Berbagai produk olahan susu segar — susu murni, yogurt, keju, es krim, dan permen susu — tersedia langsung dari peternak dengan harga murah di sepanjang jalan menuju Boyolali.',
                    'alamat' => 'Jl. Boyolali - Solo, Boyolali',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Karanganyar ───────────────────────────────────────────────
            'KO' => [
                [
                    'nama' => 'Candi Cetho',
                    'deskripsi' => 'Candi Hindu abad ke-15 peninggalan akhir Kerajaan Majapahit yang terletak di lereng Gunung Lawu ketinggian 1.496 mdpl. Suasana mistis dibalut kabut pegunungan, pemandangan hamparan perkebunan teh Kemuning, dan arsitektur berundak yang unik.',
                    'alamat' => 'Dusun Cetho, Jenawi, Karanganyar',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Kebun Teh Kemuning',
                    'deskripsi' => 'Perkebunan teh seluas 438 hektare di lereng Gunung Lawu ketinggian 900-1.200 mdpl. Hamparan tanaman teh yang hijau, udara sejuk, dan panorama pegunungan yang memukau menjadikan Kemuning sebagai destinasi agrowisata paling romantis di Solo Raya.',
                    'alamat' => 'Kemuning, Ngargoyoso, Karanganyar',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Candi Sukuh',
                    'deskripsi' => 'Candi Hindu abad ke-15 berdesain unik berbentuk piramida trapesium yang berbeda dari candi Jawa pada umumnya. Terletak di ketinggian 910 mdpl dengan latar belakang hutan lebat dan pemandangan kota Karanganyar yang indah dari atas.',
                    'alamat' => 'Desa Berjo, Ngargoyoso, Karanganyar',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Sragen ────────────────────────────────────────────────────
            'SR' => [
                [
                    'nama' => 'Museum Purbakala Sangiran (UNESCO)',
                    'deskripsi' => 'Situs arkeologi Situs Warisan Dunia UNESCO dengan temuan fosil Homo erectus terlengkap di dunia. Lebih dari 13.685 fosil manusia purba, hewan, dan tanaman berusia 1,5 juta tahun tersimpan di museum modern yang dilengkapi diorama kehidupan prasejarah.',
                    'alamat' => 'Desa Krikilan, Kalijambe, Sragen',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Nasi Jagung Bu Slamet Sragen',
                    'deskripsi' => 'Kuliner tradisional Sragen berupa nasi jagung yang empuk disajikan dengan sayur bobor daun singkong, ikan asin goreng, tempe tahu, dan sambel terasi pedas. Sarapan khas yang mengenyangkan dan bergizi warisan budaya petani Sragen.',
                    'alamat' => 'Pasar Sragen, Jl. Raya Sragen',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Sukoharjo ─────────────────────────────────────────────────
            'SKH' => [
                [
                    'nama' => 'Sentra Batik Sukoharjo',
                    'deskripsi' => 'Sukoharjo adalah salah satu pusat produksi batik dan lurik terbesar di Solo Raya. Ratusan pabrik dan pengrajin batik tulis, batik cap, dan lurik tersebar di Sukoharjo dengan harga grosir langsung dari produsen.',
                    'alamat' => 'Sentra Batik Sukoharjo, Jl. Solo-Wonogiri',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Timlo Solo Sastro',
                    'deskripsi' => 'Sup khas Solo-Sukoharjo dengan isian sosis Solo, hati ayam, telur pindang, dan tahu dalam kuah kaldu bening yang segar. Berbeda dari soto, Timlo memiliki kuah yang lebih ringan dan segar, menjadikannya pilihan sarapan favorit warga Solo Raya.',
                    'alamat' => 'Jl. Gatot Subroto, Sukoharjo',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Wonogiri ──────────────────────────────────────────────────
            'WNG' => [
                [
                    'nama' => 'Waduk Gajah Mungkur',
                    'deskripsi' => 'Waduk terbesar di Jawa Tengah dengan luas 8.800 hektare yang dikelilingi perbukitan hijau. Fasilitas wisata air lengkap — kapal motor, perahu, ski air, dan pemancingan — tersedia di sini. Panorama sunset di atas waduk menjadi daya tarik utama.',
                    'alamat' => 'Kecamatan Wonogiri, Wonogiri, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Goa Gong Wonogiri',
                    'deskripsi' => 'Gua stalaktit dan stalagmit terindah di Jawa dengan ornamen batu kapur yang membentuk berbagai patung alam menakjubkan. Suara tetesan air yang bergema seperti bunyi gong saat denting batu memberikan nama unik pada gua ini.',
                    'alamat' => 'Bomo, Punung, Pacitan — area Wonogiri Selatan',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Bakso dan Mie Wonogiri',
                    'deskripsi' => 'Wonogiri dikenal sebagai "kota pedagang bakso" karena sebagian besar pedagang bakso keliling Jakarta berasal dari sini. Bakso sapi Wonogiri dengan daging sapi pilihan, tekstur kenyal, dan kuah kaldu tulang yang kaya rasa menjadi kuliner khas yang wajib dicoba.',
                    'alamat' => 'Jl. A. Yani, Wonogiri, Jawa Tengah',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Kebumen ───────────────────────────────────────────────────
            'KM' => [
                [
                    'nama' => 'Benteng Van der Wijck',
                    'deskripsi' => 'Benteng militer berbentuk segi delapan peninggalan Belanda (1827) yang kini dijadikan kawasan wisata sejarah dan hiburan. Uniknya, di dalam benteng terdapat stasiun kereta mini yang mengelilingi kompleks serta museum tentang sejarah militer Hindia Belanda.',
                    'alamat' => 'Gombong, Kebumen, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Pantai Karangbolong Kebumen',
                    'deskripsi' => 'Pantai dengan formasi batu karang berlubang (bolong) yang ikonik, membentuk gua alami tempat air laut masuk dan menciptakan kolam alam yang indah. Di sekitarnya terdapat sarang burung walet alami yang sudah dipanen masyarakat sejak ratusan tahun.',
                    'alamat' => 'Karangbolong, Buayan, Kebumen',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Lanting Kebumen',
                    'deskripsi' => 'Camilan tradisional khas Kebumen berbahan singkong yang digoreng hingga renyah dalam bentuk lingkaran atau spiral. UMKM lanting Kebumen tersebar di berbagai kecamatan dengan harga terjangkau, menjadikannya oleh-oleh paling populer dari Kebumen.',
                    'alamat' => 'Sentra Lanting, Gombong, Kebumen',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Purworejo ─────────────────────────────────────────────────
            'KTA' => [
                [
                    'nama' => 'Pantai Ketawang Purworejo',
                    'deskripsi' => 'Pantai eksotis di Purworejo Selatan dengan pasir hitam vulkanik dan deburan ombak Samudra Hindia yang dramatis. Suasana yang tenang dan belum terlalu ramai menjadikan Ketawang sebagai hidden gem bagi wisatawan yang mencari ketenangan.',
                    'alamat' => 'Grabag, Purworejo, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Kue Clorot Purworejo',
                    'deskripsi' => 'Kue tradisional khas Purworejo berbahan tepung beras dan gula aren yang dibungkus daun kelapa muda berbentuk kerucut. Cita rasa manis dan gurih khas kue basah Jawa yang semakin langka, hanya bisa ditemukan di Purworejo dan sekitarnya.',
                    'alamat' => 'Pasar Kutoarjo, Purworejo, Jawa Tengah',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Banyumas ──────────────────────────────────────────────────
            'SPH' => [
                [
                    'nama' => 'Lokawisata Baturraden',
                    'deskripsi' => 'Kawasan wisata alam di lereng Gunung Slamet (ketinggian 640 mdpl) dengan berbagai wahana alam — kolam renang air panas belerang, curug telu, pancuran pitu, dan hutan pinus. Udara sejuk pegunungan dan panorama hutan tropis yang asri.',
                    'alamat' => 'Baturraden, Banyumas, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Mendoan Banyumas',
                    'deskripsi' => 'Tempe mendoan khas Banyumas — tempe tipis yang digoreng setengah matang dengan tepung berbumbu khas hingga bagian luar renyah dan dalam tetap lembut. Warisan kuliner Banyumas yang telah ditetapkan sebagai Warisan Budaya Takbenda Indonesia.',
                    'alamat' => 'Pasar Wage, Purwokerto, Banyumas',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Getuk Goreng Sokaraja',
                    'deskripsi' => 'Kue tradisional Banyumas berbahan singkong yang dihaluskan, dicampur gula merah, lalu digoreng hingga kecoklatan. Getuk goreng Sokaraja pertama kali dibuat pada 1918 dan kini menjadi oleh-oleh paling ikonik dari kawasan Purwokerto-Banyumas.',
                    'alamat' => 'Sokaraja, Banyumas, Jawa Tengah',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Cilacap ───────────────────────────────────────────────────
            'CP' => [
                [
                    'nama' => 'Benteng Pendem Cilacap',
                    'deskripsi' => 'Benteng pertahanan bawah tanah peninggalan Hindia Belanda (1861-1879) seluas 10,5 hektare di tepi Pantai Teluk Penyu. Sistem pertahanan berlapis dengan bunker, terowongan bawah tanah, dan meriam yang pernah menjadi benteng paling kuat di Asia Selatan.',
                    'alamat' => 'Teluk Penyu, Cilacap, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Pantai Teluk Penyu',
                    'deskripsi' => 'Pantai yang menghadap langsung Samudra Hindia dengan panorama Pulau Nusakambangan di seberang lautan. Terkenal dengan kuliner ikan bakar segar — berbagai jenis ikan, udang, cumi, dan kepiting tersedia langsung dari nelayan setempat.',
                    'alamat' => 'Cilacap, Jawa Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Lanting Cilacap',
                    'deskripsi' => 'Kerupuk lanting khas Cilacap berbahan singkong dengan bentuk angka delapan yang renyah dan gurih. Diproduksi oleh ratusan UMKM rumahan di Cilacap dengan berbagai varian rasa pedas dan original, sudah dikenal hingga mancanegara.',
                    'alamat' => 'Sentra Lanting, Jl. Raya Cilacap',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Kulon Progo ───────────────────────────────────────────────
            'STL' => [
                [
                    'nama' => 'Pantai Glagah Kulon Progo',
                    'deskripsi' => 'Pantai pasir hitam di Kulon Progo dengan laguna dan tambak udang yang unik. Gelombang Samudra Hindia yang besar menjadikan Glagah sebagai lokasi surfing terbaik di DIY. Agrowisata stroberi di kawasan sekitar pantai juga tersedia.',
                    'alamat' => 'Glagah, Temon, Kulon Progo, DIY',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Puncak Saka Kulon Progo',
                    'deskripsi' => 'Bukit tertinggi di Kulon Progo (ketinggian 986 mdpl) dengan pemandangan 360° — hamparan kebun teh, kota Wates, dan Samudra Hindia. Camping ground yang populer di kalangan anak muda Yogyakarta dengan sunrise yang memukau.',
                    'alamat' => 'Nanggulan, Kulon Progo, DIY',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Gebleg Kulon Progo',
                    'deskripsi' => 'Makanan tradisional khas Kulon Progo berbahan tepung tapioka yang dikukus lalu digoreng. Tekstur kenyal dengan rasa gurih asin menjadi camilan unik yang hanya tersedia di Kulon Progo. Kini diolah menjadi berbagai produk modern seperti bakpia gebleg dan rengginang gebleg.',
                    'alamat' => 'Pasar Wates, Kulon Progo, DIY',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Gresik ────────────────────────────────────────────────────
            'GS' => [
                [
                    'nama' => 'Makam Sunan Giri',
                    'deskripsi' => 'Makam Sunan Giri — salah satu Wali Songo yang mendirikan pesantren Islam di Gresik pada abad ke-15 — di atas Bukit Giri. Ribuan peziarah datang setiap hari dalam suasana religius yang kuat, diiringi kumandang doa dan lantunan sholawat.',
                    'alamat' => 'Giri, Kebomas, Gresik, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Otak-Otak Bandeng Gresik',
                    'deskripsi' => 'Kuliner ikonik Gresik berupa ikan bandeng yang dagingnya diambil, dicampur bumbu rempah khas, lalu dimasukkan kembali ke dalam kulit ikan dan dipanggang. Tekstur lembut dengan rasa gurih-pedas yang khas, menjadi oleh-oleh paling dicari dari Gresik.',
                    'alamat' => 'Sentra Otak-Otak Bandeng, Jl. Pahlawan, Gresik',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Bukit Kapur Sekapuk Gresik',
                    'deskripsi' => 'Bekas tambang kapur yang disulap menjadi destinasi wisata instagramable dengan tebing-tebing kapur putih yang megah. Spot foto dengan latar dinding kapur putih setinggi 30 meter dan cerukan-cerukan alami yang unik menjadi magnet wisatawan milenial.',
                    'alamat' => 'Sekapuk, Ujungpangkah, Gresik',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Sidoarjo ──────────────────────────────────────────────────
            'SDA' => [
                [
                    'nama' => 'Sentra Tas & Koper Tanggulangin',
                    'deskripsi' => 'Pusat industri dan perdagangan tas, koper, dompet, dan aksesori kulit terbesar di Indonesia dengan ratusan showroom berjejer. Produk berkualitas ekspor dengan harga grosir langsung dari pengrajin, tersedia berbagai merk lokal ternama.',
                    'alamat' => 'Intako, Tanggulangin, Sidoarjo, Jawa Timur',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Candi Pari Sidoarjo',
                    'deskripsi' => 'Candi Hindu peninggalan Majapahit abad ke-14 yang terbuat dari bata merah dengan arsitektur yang masih terawat baik. Satu-satunya candi di Sidoarjo yang berdiri kokoh di tengah permukiman, menjadi bukti kejayaan Kerajaan Majapahit di delta Sungai Brantas.',
                    'alamat' => 'Candi, Porong, Sidoarjo',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Petis Udang Sidoarjo',
                    'deskripsi' => 'Petis udang khas Sidoarjo — saus kental hitam berbahan dasar rebusan udang yang dipadatkan — menjadi bumbu wajib berbagai masakan Jawa Timur. Diproduksi oleh ratusan UMKM di Sidoarjo dengan kualitas terbaik untuk rujak, lontong balap, dan tahu campur.',
                    'alamat' => 'Sentra Petis, Jl. Raya Porong, Sidoarjo',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Mojokerto ─────────────────────────────────────────────────
            'MR' => [
                [
                    'nama' => 'Situs Trowulan (Ibu Kota Majapahit)',
                    'deskripsi' => 'Kawasan arkeologi seluas 100 km² yang diyakini sebagai bekas ibu kota Kerajaan Majapahit (abad ke-13-16). Lebih dari 100 situs tersebar di sini — Candi Brahu, Candi Bajang Ratu, Kolam Segaran, Gapura Wringinlawang, dan Museum Trowulan.',
                    'alamat' => 'Trowulan, Mojokerto, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Museum Majapahit Trowulan',
                    'deskripsi' => 'Museum arkeologi terlengkap tentang Kerajaan Majapahit dengan koleksi lebih dari 10.000 artefak — gerabah, logam, patung, relief, dan benda-benda kerajaan. Diorama kehidupan Majapahit dan replika istana raja tersedia untuk wisata edukasi.',
                    'alamat' => 'Jl. Pendopo Agung, Trowulan, Mojokerto',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Onde-Onde Mojokerto',
                    'deskripsi' => 'Onde-onde khas Mojokerto berukuran jumbo dengan isian kacang hijau yang berlimpah dan kulit wijen tebal. Berbeda dari onde-onde biasa, onde-onde Mojokerto menggunakan campuran tepung terigu dan tapioka yang menghasilkan tekstur lebih renyah di luar dan lembut di dalam.',
                    'alamat' => 'Sentra Onde-onde, Jl. Mojopahit, Mojokerto',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Jombang ───────────────────────────────────────────────────
            'JG' => [
                [
                    'nama' => 'Pesantren Tebuireng & Makam Gus Dur',
                    'deskripsi' => 'Pondok pesantren bersejarah yang didirikan KH. Hasyim Asy\'ari pada 1899 — kakek Presiden RI ke-4 Gus Dur. Makam Gus Dur (KH. Abdurrahman Wahid) menjadi tempat ziarah ratusan ribu pengunjung per tahun, dikelilingi suasana pesantren yang kental.',
                    'alamat' => 'Tebuireng, Diwek, Jombang, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Agrowisata Wonosalam Jombang',
                    'deskripsi' => 'Kawasan wisata agro di ketinggian 500-1.000 mdpl yang terkenal sebagai sentra durian montong dan alpukat terbaik di Jawa Timur. Tersedia kebun petik durian, villa alam, air terjun, dan festival durian tahunan yang meriah setiap Februari.',
                    'alamat' => 'Wonosalam, Jombang, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Bojonegoro ────────────────────────────────────────────────
            'BJ' => [
                [
                    'nama' => 'Kayangan Api (Api Abadi Bojonegoro)',
                    'deskripsi' => 'Api abadi yang menyala tanpa henti dari dalam tanah akibat semburan gas alam sejak zaman Kerajaan Majapahit. Konon menjadi tempat pertapaan Empu Supa pembuat pusaka kerajaan. Fenomena geologi langka yang berada di tengah kawasan hutan jati Bojonegoro.',
                    'alamat' => 'Sendangharjo, Ngasem, Bojonegoro',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Kerajinan Kayu Jati Bojonegoro',
                    'deskripsi' => 'Sentra kerajinan kayu jati terbesar di Jawa Timur dengan ratusan pengrajin menghasilkan furnitur, ukiran, dan aksesori rumah berkualitas premium. Kayu jati Bojonegoro dikenal sebagai yang terbaik di Indonesia karena serat kayu yang padat dan tahan lama.',
                    'alamat' => 'Jl. Veteran, Bojonegoro, Jawa Timur',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Lamongan ──────────────────────────────────────────────────
            'LMG' => [
                [
                    'nama' => 'Wisata Bahari Lamongan (WBL)',
                    'deskripsi' => 'Taman wisata bahari terbesar di Jawa Timur yang terintegrasi dengan Goa Maharani (gua stalaktit indah). Berbagai wahana air, pertunjukan lumba-lumba, dan area bermain anak tersedia di komplek seluas 11 hektare di tepi laut Lamongan.',
                    'alamat' => 'Paciran, Lamongan, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Soto Lamongan Cak Mun',
                    'deskripsi' => 'Soto ayam Lamongan autentik dengan kuah kuning bening yang kaya rempah. Berbeda dari soto lainnya, soto Lamongan menggunakan koya — bubuk kerupuk udang — yang ditaburkan di atas soto sehingga menghasilkan tekstur dan rasa yang sangat khas.',
                    'alamat' => 'Jl. Veteran, Lamongan, Jawa Timur',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Kupang Lamongan',
                    'deskripsi' => 'Kuliner laut khas Lamongan berupa kerang kupang — kerang kecil berwarna putih — yang dimasak dengan bumbu petis dan jeruk nipis. Disajikan dengan lontong dan sate kerang, kupang menjadi kuliner unik yang hanya bisa dinikmati di pesisir Lamongan dan Sidoarjo.',
                    'alamat' => 'Pasar Ikan Lamongan, Jl. Raya Babat, Lamongan',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Nganjuk ───────────────────────────────────────────────────
            'NJ' => [
                [
                    'nama' => 'Air Terjun Sedudo',
                    'deskripsi' => 'Air terjun setinggi 105 meter di lereng Gunung Wilis ketinggian 1.438 mdpl. Dipercaya masyarakat Jawa memiliki khasiat membuat awet muda jika mandi di air terjun ini pada bulan Suro (Muharram). Suasana mistis dan pemandangan hutan yang masih lebat.',
                    'alamat' => 'Ngliman, Sawahan, Nganjuk',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Bawang Merah Nganjuk',
                    'deskripsi' => 'Nganjuk adalah lumbung bawang merah terbesar di Jawa Timur. Pasar bawang merah terbesar di Jawa ada di sini, dengan aktivitas jual-beli yang ramai sejak subuh. Wisatawan dapat mengunjungi kebun bawang dan membeli langsung dari petani.',
                    'alamat' => 'Pasar Kertosono, Nganjuk, Jawa Timur',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Ngawi ─────────────────────────────────────────────────────
            'NGW' => [
                [
                    'nama' => 'Benteng Pendem Ngawi',
                    'deskripsi' => 'Benteng militer Belanda abad ke-19 yang terpendam sebagian di bawah tanah di tepi Sungai Bengawan Solo dan Sungai Madiun. Kini direvitalisasi sebagai kawasan wisata sejarah dengan bangunan benteng yang terawat, taman, dan museum mini.',
                    'alamat' => 'Jl. Untung Suropati, Ngawi, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Museum Trinil Ngawi',
                    'deskripsi' => 'Museum tempat Eugene Dubois menemukan fosil Pithecanthropus erectus (Homo erectus) pertama di dunia pada 1891 di Trinil. Koleksi fosil gajah purba, kuda nil purba, dan berbagai hewan Pleistosen tersimpan di museum yang berdiri di tepi Sungai Bengawan Solo.',
                    'alamat' => 'Trinil, Kedunggalar, Ngawi',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Tahu Ngawi',
                    'deskripsi' => 'Tahu kuning khas Ngawi dengan tekstur padat, kenyal, dan rasa gurih yang khas. Berbeda dari tahu kota lain, tahu Ngawi menggunakan kedelai lokal pilihan dan proses pembuatan tradisional yang menghasilkan tahu berkualitas tinggi, populer sebagai oleh-oleh.',
                    'alamat' => 'Sentra Tahu, Jl. Raya Ngawi',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Magetan ───────────────────────────────────────────────────
            'MAG' => [
                [
                    'nama' => 'Telaga Sarangan',
                    'deskripsi' => 'Danau alami terluas di Jawa Timur di ketinggian 1.200 mdpl di kaki Gunung Lawu. Pemandangan danau biru dikelilingi pegunungan hijau dengan suhu 15-20°C yang sejuk. Tersedia perahu motor, berkuda mengelilingi danau, dan berbagai kuliner ikan bakar.',
                    'alamat' => 'Sarangan, Plaosan, Magetan, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Kerajinan Kulit Magetan',
                    'deskripsi' => 'Sentra industri kerajinan kulit terbesar di Jawa Timur dengan ratusan toko dan pengrajin sepatu, sandal, tas, dan aksesori kulit. Kulit sapi dan kambing berkualitas diolah menjadi produk fashion premium dengan harga grosir langsung dari pengrajin.',
                    'alamat' => 'Jl. Sawo, Selosari, Magetan',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Pasuruan ──────────────────────────────────────────────────
            'PS' => [
                [
                    'nama' => 'Taman Safari Prigen',
                    'deskripsi' => 'Taman safari terbesar kedua di Indonesia di lereng Gunung Arjuno (ketinggian 800-1.400 mdpl). Lebih dari 2.500 satwa dari berbagai penjuru dunia dapat dilihat dari jarak dekat di habitat semi-alami. Wahana safari malam dan berbagai atraksi satwa tersedia.',
                    'alamat' => 'Prigen, Pasuruan, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Air Terjun Kakek Bodo',
                    'deskripsi' => 'Air terjun bertingkat di kawasan Prigen yang dikelilingi hutan tropis lebat dengan suasana segar dan sejuk. Trekking melewati hutan pinus menuju air terjun setinggi 40 meter ini menjadi aktivitas favorit wisatawan yang mengunjungi kawasan Tretes-Prigen.',
                    'alamat' => 'Prigen, Pasuruan, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Bandeng Asap Pasuruan',
                    'deskripsi' => 'Ikan bandeng asap khas Pasuruan dengan proses pengasapan tradisional selama 4-6 jam menggunakan kayu pilihan. Aroma asap yang meresap sempurna menghasilkan rasa gurih-smoky yang unik. Menjadi oleh-oleh favorit dari kawasan pesisir Pasuruan.',
                    'alamat' => 'Sentra Bandeng Asap, Bangil, Pasuruan',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Probolinggo ───────────────────────────────────────────────
            'PB' => [
                [
                    'nama' => 'Gunung Bromo (via Probolinggo)',
                    'deskripsi' => 'Gunung berapi aktif setinggi 2.329 mdpl yang terkenal dengan panorama sunrise spektakuler di atas lautan pasir (Sea of Sand). Stasiun Probolinggo adalah gerbang utama menuju Bromo — hanya 45 km dari stasiun menuju Cemoro Lawang.',
                    'alamat' => 'TNBTS, Probolinggo, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.9,
                ],
                [
                    'nama' => 'Pantai Bentar Probolinggo',
                    'deskripsi' => 'Pantai wisata dengan pemandangan laut dan pulau kecil di lepas pantai. Wisata snorkeling, diving, dan memancing tersedia di perairan Bentar. Di dekat pantai terdapat sentra penjualan mangga Manalagi dan Arumanis khas Probolinggo yang sangat manis.',
                    'alamat' => 'Gending, Probolinggo, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Mangga Probolinggo (Manalagi & Arumanis)',
                    'deskripsi' => 'Probolinggo terkenal sebagai kota mangga dengan varietas Manalagi dan Arumanis yang memiliki cita rasa manis istimewa. Saat musim panen Oktober-Januari, ribuan pedagang mangga berjejer di sepanjang jalan kota menawarkan mangga segar dengan harga petani.',
                    'alamat' => 'Pasar Baru Probolinggo, Jawa Timur',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Lumajang ──────────────────────────────────────────────────
            'JTR' => [
                [
                    'nama' => 'Coban Sewu (Tumpak Sewu)',
                    'deskripsi' => 'Air terjun paling dramatis di Indonesia yang jatuh dari ketinggian 120 meter dengan lebar hingga 120 meter seperti tirai raksasa. Pemandangan dari atas kawah terlihat seperti ribuan air terjun (sewu = seribu) yang mengalir bersamaan.',
                    'alamat' => 'Pronojiwo, Lumajang, Jawa Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.9,
                ],
                [
                    'nama' => 'Pisang Agung Lumajang',
                    'deskripsi' => 'Pisang Agung — varietas pisang terbesar di Indonesia yang beratnya bisa mencapai 1 kg per sisir. Hanya tumbuh di Lumajang dengan tekstur lembut dan manis alami. Tersedia dalam berbagai olahan: sale pisang, keripik pisang, dan selai pisang di sentra UMKM lokal.',
                    'alamat' => 'Jl. A. Yani, Lumajang, Jawa Timur',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Tulungagung ───────────────────────────────────────────────
            'TA' => [
                [
                    'nama' => 'Pantai Popoh Tulungagung',
                    'deskripsi' => 'Pantai berbentuk teluk yang terlindung dari ombak besar di Tulungagung Selatan dengan pasir putih dan air laut jernih. Tersedia sewa perahu untuk keliling teluk, snorkeling, dan kuliner seafood segar di warung-warung tepi pantai.',
                    'alamat' => 'Besole, Besuki, Tulungagung',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Industri Marmer Tulungagung',
                    'deskripsi' => 'Tulungagung adalah penghasil marmer terbesar di Indonesia dengan batu marmer berkualitas ekspor. Puluhan showroom dan bengkel pengolahan marmer tersebar di kawasan Campurdarat, menjual berbagai produk marmer — lantai, patung, aksesori — langsung dari produsen.',
                    'alamat' => 'Sentra Marmer, Campurdarat, Tulungagung',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Ayam Lodho Tulungagung',
                    'deskripsi' => 'Masakan khas Tulungagung berupa ayam kampung yang dibakar lalu dimasak dalam kuah santan kuning kental dengan rempah-rempah yang kuat. Cita rasa yang gurih, sedikit pedas, dan kaya rempah membuat Ayam Lodho menjadi kuliner ikonik Tulungagung.',
                    'alamat' => 'Jl. WR. Supratman, Tulungagung',
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

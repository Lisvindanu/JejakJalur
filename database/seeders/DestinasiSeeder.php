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
                    'alamat' => 'Jl. Kebon Kacang, Tanah Abang, Jakarta Pusat',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Museum Nasional Indonesia',
                    'deskripsi' => 'Museum tertua dan terlengkap di Indonesia dengan koleksi lebih dari 140.000 artefak. Dikenal juga sebagai Museum Gajah karena adanya patung gajah pemberian Raja Chulalongkorn.',
                    'alamat' => 'Jl. Medan Merdeka Barat No.12, Gambir, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Batik Semar Jakarta',
                    'deskripsi' => 'Toko batik premium yang menjual berbagai motif batik khas Indonesia. Didirikan sejak 1956, menawarkan batik tulis, batik cap, dan batik printing dengan kualitas terjamin.',
                    'alamat' => 'Jl. Pintu Besar Selatan No.51, Jakarta Pusat',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Soto Betawi H. Ma\'ruf',
                    'deskripsi' => 'Soto Betawi otentik dengan kuah santan kental yang kaya rempah. Daging sapi empuk, kentang goreng, dan tomat segar membuat sajian ini menjadi favorit warga Jakarta sejak 1940-an.',
                    'alamat' => 'Jl. Kramat Raya No.13, Jakarta Pusat',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
            ],

            'PSE' => [
                [
                    'nama' => 'Masjid Istiqlal',
                    'deskripsi' => 'Masjid terbesar di Asia Tenggara yang mampu menampung 200.000 jamaah. Dibangun sebagai simbol kemerdekaan Indonesia, arsitekturnya memadukan gaya modern dan ornamen Islam.',
                    'alamat' => 'Jl. Taman Wijaya Kusuma, Pasar Baru, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Nasi Kapau Uni Lis',
                    'deskripsi' => 'Nasi Kapau Minang dengan lauk berupa gulai cubadak, rendang, ayam pop, dan berbagai sayur khas Sumatera Barat. Cita rasa autentik di tengah keramaian Pasar Senen.',
                    'alamat' => 'Jl. Senen Raya, Pasar Senen, Jakarta Pusat',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Galeri Nasional Indonesia',
                    'deskripsi' => 'Pusat seni rupa nasional yang menampilkan karya para maestro dan seniman kontemporer Indonesia. Koleksi tetap dan pameran temporer rutin digelar di gedung bersejarah ini.',
                    'alamat' => 'Jl. Medan Merdeka Timur No.14, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Bubur Ayam Senen H. Muhtadi',
                    'deskripsi' => 'Bubur ayam legendaris yang sudah melayani pelanggan sejak generasi ke generasi. Bubur lembut dengan topping cakwe, kacang, bawang goreng, dan kaldu ayam yang gurih.',
                    'alamat' => 'Jl. Pasar Senen, Jakarta Pusat',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Pasar Antik Jl. Surabaya',
                    'deskripsi' => 'Surga barang antik di Jakarta berupa deretan kios yang menjual perabotan vintage, keramik kuno, uang koleksi, lukisan lama, dan berbagai memorabilia bersejarah Indonesia.',
                    'alamat' => 'Jl. Surabaya, Menteng, Jakarta Pusat',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
            ],

            'BD' => [
                [
                    'nama' => 'Floating Market Lembang',
                    'deskripsi' => 'Pasar terapung unik di Lembang yang menawarkan aneka kuliner khas Sunda di atas rakit di tengah danau. Suasana segar pegunungan membuat pengalaman makan semakin menyenangkan.',
                    'alamat' => 'Jl. Grand Hotel No.33E, Lembang, Bandung',
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
                [
                    'nama' => 'Gedung Sate',
                    'deskripsi' => 'Landmark ikonik Bandung bergaya arsitektur Indo-Eropa yang dibangun pada 1920. Atapnya berbentuk tusuk sate khas yang menjadikannya simbol kota Bandung.',
                    'alamat' => 'Jl. Diponegoro No.22, Citarum, Bandung',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Batik Komar',
                    'deskripsi' => 'Galeri batik Bandung yang terkenal dengan motif inovatif dan teknik pewarnaan alami. Pengunjung bisa melihat proses pembuatan batik langsung dan mengikuti workshop membatik.',
                    'alamat' => 'Jl. Cigadung Raya Barat No.18, Bandung',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Surabi Enhaii',
                    'deskripsi' => 'Surabi khas Bandung dengan varian topping modern seperti coklat, keju, oncom, hingga pete. Dibuat dari tepung beras pilihan, menghasilkan tekstur lembut dengan pinggiran renyah.',
                    'alamat' => 'Jl. Setiabudi No.186, Bandung',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            'KAC' => [
                [
                    'nama' => 'Taman Tegalega',
                    'deskripsi' => 'Taman kota bersejarah seluas 16 hektare yang menjadi ruang hijau utama warga Bandung selatan. Terdapat patung Pangeran Diponegoro, area olahraga, dan amphiteater terbuka.',
                    'alamat' => 'Jl. Otto Iskandar Dinata, Kiaracondong, Bandung',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
                [
                    'nama' => 'Mie Kocok Haji Maman',
                    'deskripsi' => 'Mie kocok asli Bandung dengan kuah kaldu sapi bening nan gurih. Topping kikil sapi kenyal, tauge segar, dan bakso membuat sajian ini jadi kuliner favorit di kawasan Kiaracondong.',
                    'alamat' => 'Jl. Jend. Ahmad Yani No.10, Kiaracondong, Bandung',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Pasar Kosambi',
                    'deskripsi' => 'Pasar tradisional terbesar di Bandung timur yang menjual berbagai produk UMKM lokal, kain tekstil, kerajinan tangan, dan kuliner khas Sunda dengan harga terjangkau.',
                    'alamat' => 'Jl. Ahmad Yani, Kiaracondong, Bandung',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.0,
                ],
                [
                    'nama' => 'Sate Kambing Pak H. Yusuf',
                    'deskripsi' => 'Sate kambing pilihan yang terkenal empuk dan tidak berbau prengus. Bumbu kecap spesial dengan irisan tomat dan bawang merah segar menjadi keunggulan warung sate ini sejak 1988.',
                    'alamat' => 'Jl. Ibrahim Adjie No.5, Kiaracondong, Bandung',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Kampung Adat Cikondang',
                    'deskripsi' => 'Desa adat Sunda yang masih mempertahankan tradisi leluhur dengan rumah-rumah panggung tradisional. Pengunjung dapat menyaksikan ritual adat, kesenian lokal, dan belajar tentang kearifan lokal.',
                    'alamat' => 'Desa Lamajang, Pangalengan, Bandung',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
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
                [
                    'nama' => 'Taman Sari Water Castle',
                    'deskripsi' => 'Bekas taman kerajaan Kesultanan Yogyakarta yang dibangun pada abad ke-18. Kompleks ini mencakup kolam pemandian kerajaan, terowongan bawah tanah, dan arsitektur Jawa-Portugis yang memukau.',
                    'alamat' => 'Jl. Taman, Patehan, Kraton, Yogyakarta',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Batik Mirota Batik',
                    'deskripsi' => 'Pusat belanja batik dan kerajinan Yogyakarta yang terlengkap. Menjual batik tulis, batik cap, wayang kulit, perak, dan berbagai souvenir khas Jogja dengan kualitas premium.',
                    'alamat' => 'Jl. Ahmad Yani No.9, Ngupasan, Yogyakarta',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Angkringan Lik Man',
                    'deskripsi' => 'Angkringan legendaris Yogyakarta yang telah ada sejak 1950-an. Nasi kucing dengan lauk sederhana ditemani kopi joss — kopi hitam panas dengan arang membara — menjadi pengalaman kuliner autentik Jogja.',
                    'alamat' => 'Jl. Wongsodirjan, dekat Stasiun Tugu, Yogyakarta',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            'LPN' => [
                [
                    'nama' => 'Candi Prambanan',
                    'deskripsi' => 'Kompleks candi Hindu terbesar di Indonesia dan warisan dunia UNESCO. Dibangun pada abad ke-9, candi utama Trimurti (Brahma, Wisnu, Siwa) menjulang setinggi 47 meter.',
                    'alamat' => 'Jl. Raya Solo - Yogyakarta No.16, Prambanan, Sleman',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.8,
                ],
                [
                    'nama' => 'Bakpia Pathok 25',
                    'deskripsi' => 'Produsen bakpia legendaris Yogyakarta yang berdiri sejak 1955 di Pathok. Bakpia isi kacang hijau dengan kulit tipis renyah menjadi oleh-oleh wajib bagi wisatawan yang berkunjung ke Jogja.',
                    'alamat' => 'Jl. AIP KKO Usman dan Harun No.25, Pathok, Yogyakarta',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Pasar Beringharjo',
                    'deskripsi' => 'Pasar tradisional terbesar dan tertua di Yogyakarta. Pusat perbelanjaan batik, kerajinan tangan, rempah-rempah, dan berbagai produk UMKM lokal yang menjadi bagian dari heritage Kraton.',
                    'alamat' => 'Jl. Margo Mulyo No.16, Ngupasan, Yogyakarta',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Sate Klathak Pak Pong',
                    'deskripsi' => 'Sate klathak khas Bantul dengan daging kambing muda yang ditusuk jeruji besi bukan bambu. Metode pemanggangan unik ini menghasilkan pematangan merata, disajikan dengan kuah tongseng dan nasi.',
                    'alamat' => 'Jl. Imogiri Timur KM 10, Jejeran, Bantul, Yogyakarta',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Desa Wisata Tembi',
                    'deskripsi' => 'Desa wisata budaya yang mempertahankan tradisi Jawa. Pengunjung dapat menginap di rumah joglo, belajar membatik, bermain gamelan, dan menikmati pertunjukan seni tradisional Jawa.',
                    'alamat' => 'Jl. Parangtritis KM 8.4, Tembi, Bantul, Yogyakarta',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
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
                [
                    'nama' => 'Taman Bungkul',
                    'deskripsi' => 'Taman kota terbaik di Asia Tenggara versi PBB yang menjadi ruang publik favorit warga Surabaya. Fasilitas lengkap: jogging track, skate park, wifi gratis, amphiteater, dan playground anak.',
                    'alamat' => 'Jl. Raya Darmo, Wonokromo, Surabaya',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Lontong Balap Pak Gendut',
                    'deskripsi' => 'Lontong balap khas Surabaya dengan perpaduan lontong, tauge, lentho goreng, dan kuah kaldu sapi bening. Dipadu sambal petis yang khas, menjadi sarapan favorit warga Surabaya.',
                    'alamat' => 'Jl. Dharmahusada Indah No.2, Sukolilo, Surabaya',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Kampung Wisata Peneleh',
                    'deskripsi' => 'Kampung bersejarah yang menyimpan jejak perjuangan kemerdekaan. Terdapat makam Belanda kuno, sumur Jobong peninggalan Majapahit, dan rumah kelahiran Bung Karno yang menjadi daya tarik wisata sejarah.',
                    'alamat' => 'Jl. Peneleh, Genteng, Surabaya',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            'SBI' => [
                [
                    'nama' => 'Tugu Pahlawan',
                    'deskripsi' => 'Monumen setinggi 41 meter berbentuk paku terbalik yang dibangun untuk mengenang pertempuran 10 November 1945. Di bawahnya terdapat museum yang menyimpan diorama dan artefak pertempuran Surabaya.',
                    'alamat' => 'Jl. Pahlawan, Alun-alun Contong, Surabaya',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Rujak Cingur Ahmad Jais',
                    'deskripsi' => 'Rujak cingur legendaris khas Surabaya yang menggunakan cingur (hidung sapi) sebagai bahan utama. Bumbu petis hitam pekat dengan berbagai sayuran dan lontong menjadi sajian yang wajib dicoba.',
                    'alamat' => 'Jl. Ahmad Jais No.40, Sawahan, Surabaya',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Pasar Atom',
                    'deskripsi' => 'Pusat perbelanjaan wholesale dan UMKM terbesar di Surabaya utara. Dikenal sebagai surga belanja tekstil, elektronik, mainan, dan aneka barang kebutuhan dengan harga grosir yang kompetitif.',
                    'alamat' => 'Jl. Bunguran No.45, Bongkaran, Pabean Cantian, Surabaya',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
                [
                    'nama' => 'Soto Ayam Lamongan Cak Har',
                    'deskripsi' => 'Soto Lamongan paling populer di Surabaya dengan kuah kuning bening yang gurih. Topping koya (kerupuk udang halus) yang ditaburkan menghasilkan tekstur dan cita rasa yang khas dan berbeda.',
                    'alamat' => 'Jl. Bongkaran No.15, Pabean Cantian, Surabaya',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Jembatan Merah',
                    'deskripsi' => 'Jembatan bersejarah di kawasan Kota Lama Surabaya yang menjadi saksi bisu perjuangan bangsa. Area sekitarnya kini berkembang menjadi kawasan wisata heritage dengan gedung-gedung kolonial yang terawat.',
                    'alamat' => 'Jl. Kembang Jepun, Nyamplungan, Pabean Cantian, Surabaya',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
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

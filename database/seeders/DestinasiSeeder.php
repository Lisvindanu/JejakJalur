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

            // ── Semarang ──────────────────────────────────────────────
            'SMT' => [
                [
                    'nama' => 'Kawasan Kota Lama Semarang',
                    'deskripsi' => 'Kawasan heritage bersejarah seluas 31 hektare bergaya arsitektur Eropa abad ke-17 hingga ke-19. Dijuluki "Little Netherlands", dipenuhi gedung kolonial yang kini beralih fungsi menjadi kafe, galeri seni, dan ruang kreatif.',
                    'alamat' => 'Jl. Letjen Suprapto, Semarang Utara',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Nasi Koyor Kota Lama',
                    'deskripsi' => 'Kuliner legendaris Semarang sejak 1955. Nasi koyor disajikan dengan urat sapi empuk yang dimasak berjam-jam, gudeg, kering tempe, oseng kacang panjang, dan sambal merah khas Jawa. Hanya buka pagi hingga siang.',
                    'alamat' => 'Jl. Gelatik No.7, Semarang Utara',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Lawang Sewu',
                    'deskripsi' => 'Gedung ikonik peninggalan perusahaan kereta api Belanda NIS yang dibangun 1904. Terkenal dengan ribuan pintu dan jendela, kini menjadi museum sejarah kereta api dan destinasi wisata sejarah paling populer di Semarang.',
                    'alamat' => 'Jl. Pemuda No.160, Semarang Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Gulai Kambing Bustaman Pak Sabar',
                    'deskripsi' => 'Gulai kambing legendaris khas Semarang dengan kuah bening tanpa santan, dimasak dari serundeng halus dan rempah pilihan. Tekstur daging yang sangat empuk dan rasa yang gurih membuatnya jadi kuliner wajib di Kota Lama.',
                    'alamat' => 'Gang Bustaman, Semarang Tengah',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Semarang Kreatif Galeri',
                    'deskripsi' => 'Pusat UMKM premium Semarang yang menjual produk 100% handmade karya warga lokal. Koleksi meliputi tas batik, aksesori, kain tenun, hingga kuliner oleh-oleh khas Semarang yang dikemas modern dan siap kirim.',
                    'alamat' => 'Jl. Sriwijaya No.29, Semarang Selatan',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            'SMC' => [
                [
                    'nama' => 'Klenteng Sam Poo Kong',
                    'deskripsi' => 'Tempat ibadah dan wisata sejarah terbesar di Semarang yang didirikan untuk mengenang Laksamana Zheng He dari Tiongkok. Arsitektur Tiongkok merah megah berpadu taman hijau luas, menarik wisatawan dari seluruh Indonesia.',
                    'alamat' => 'Jl. Simongan No.129, Semarang Barat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Lumpia Gang Lombok',
                    'deskripsi' => 'Lumpia Semarang paling legendaris sejak 1800-an, menggunakan resep asli perpaduan Tionghoa-Jawa. Isi rebung, telur, udang, dan ayam yang berlimpah dibungkus kulit tipis renyah — wajib bawa pulang sebagai oleh-oleh.',
                    'alamat' => 'Gang Lombok No.11, Semarang Tengah',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Masjid Agung Jawa Tengah',
                    'deskripsi' => 'Masjid megah bergaya arsitektur Jawa-Arab-Romawi yang mampu menampung 15.000 jamaah. Menara setinggi 99 meter dilengkapi teropong untuk melihat kota Semarang dari ketinggian. Wisata religi dan arsitektur sekaligus.',
                    'alamat' => 'Jl. Gajah Raya, Sambirejo, Semarang Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
            ],

            // ── Solo ──────────────────────────────────────────────────
            'SLO' => [
                [
                    'nama' => 'Keraton Kasunanan Surakarta',
                    'deskripsi' => 'Pusat kebudayaan Jawa yang megah di jantung kota Solo. Dibangun pada abad ke-18, keraton ini menyimpan koleksi artefak bersejarah dan budaya Jawa yang tak ternilai. Pengunjung dapat menyaksikan pertunjukan seni tradisional.',
                    'alamat' => 'Jl. Sidikoro, Baluwarti, Solo',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Sate Buntel Pak H. Kasdi',
                    'deskripsi' => 'Legenda sate buntel Solo sejak puluhan tahun. Daging kambing cincang dibungkus lemak tipis lalu dibakar hingga harum, menghasilkan tekstur lembut dan bumbu meresap sempurna tanpa bau prengus. Berlokasi satu menit jalan kaki dari Stasiun Balapan.',
                    'alamat' => 'Jl. Wolter Monginsidi No.93, Banjarsari, Solo',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Selat Vien\'s',
                    'deskripsi' => 'Restoran legendaris Solo penyaji selat solo — salad ala Jawa dengan kuah manis gurih, sayuran segar, dan daging. Menu andalan lain: sup matahari, galantin, dan nasi timlo. Sudah puluhan tahun melayani pelancong dan warga lokal.',
                    'alamat' => 'Jl. Hasanudin No.99, Punggawan, Banjarsari, Solo',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Pasar Klewer',
                    'deskripsi' => 'Pusat perdagangan batik terbesar di Solo dan salah satu yang terbesar di Indonesia. Tersedia ribuan motif batik dari berbagai daerah, mulai kain mentah hingga pakaian jadi, dengan harga grosir yang jauh di bawah pasar umum.',
                    'alamat' => 'Jl. Dr. Radjiman, Gajahan, Pasar Kliwon, Solo',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Museum Batik Danar Hadi',
                    'deskripsi' => 'Museum batik terlengkap di Indonesia dengan lebih dari 10.000 koleksi kain batik dari berbagai era dan teknik. Pengunjung dapat mempelajari sejarah batik Indonesia sejak abad ke-17 dan menyaksikan proses pembuatan batik tulis secara langsung.',
                    'alamat' => 'Jl. Slamet Riyadi No.261, Sriwedari, Solo',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            'SLJ' => [
                [
                    'nama' => 'Pasar Gede Hardjonagoro',
                    'deskripsi' => 'Pasar tradisional ikonik Solo yang dibangun 1930 bergaya arsitektur kolonial. Surga kuliner pagi hari dengan aneka jajanan khas Solo: bubur gudeg, timlo, dawet telasih, intip goreng, dan berbagai camilan tradisional Jawa.',
                    'alamat' => 'Jl. Jend. Urip Sumoharjo, Sudiroprajan, Solo',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Pura Mangkunegaran',
                    'deskripsi' => 'Istana kerajaan Kadipaten Mangkunegaran yang dibangun 1757. Pendopo agung seluas 3.400 m² menjadi salah satu yang terbesar di Jawa. Museum menyimpan koleksi perhiasan, senjata, wayang, dan artefak kerajaan bernilai tinggi.',
                    'alamat' => 'Jl. Ronggowarsito, Keprabon, Banjarsari, Solo',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Nasi Liwet Bu Wongso Lemu',
                    'deskripsi' => 'Nasi liwet paling legendaris di Solo sejak 1950-an. Nasi gurih santan disajikan dengan lauk areh (saus santan kental), ayam kampung opor, telur pindang, dan labu siam. Buka malam hari, selalu ramai hingga larut malam.',
                    'alamat' => 'Jl. Teuku Umar, Keprabon, Banjarsari, Solo',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Malang ────────────────────────────────────────────────
            'ML' => [
                [
                    'nama' => 'Rawon Rampal',
                    'deskripsi' => 'Rawon legendaris Malang sejak 1957 yang selalu ramai. Kuah hitam pekat dari kluwek pilihan, gurih dan kaya rempah, disajikan dengan daging sapi empuk berukuran besar, tauge segar, dan kerupuk udang. Ikon kuliner kota Malang.',
                    'alamat' => 'Jl. Panglima Sudirman No.71A, Blimbing, Malang',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Alun-Alun Merdeka Malang',
                    'deskripsi' => 'Taman kota bersejarah di jantung Kota Malang yang dikelilingi pohon beringin raksasa. Terdapat kolam bermain anak, area pedagang kaki lima, dan spot foto ikonik. Sore hari dipenuhi warga lokal dan wisatawan yang menikmati suasana kota.',
                    'alamat' => 'Jl. Merdeka Selatan, Kiduldalem, Klojen, Malang',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Bakso Cak Toha',
                    'deskripsi' => 'Bakso paling terkenal di kawasan Malang kota, hanya 120 meter dari stasiun. Tersedia bakso besar, bakso iga, bakso goreng, siomay, dan gorengan. Kuah kaldu sapi bening yang gurih dan porsi melimpah menjadi daya tarik utamanya.',
                    'alamat' => 'Jl. Trunojoyo No.80, Klojen, Malang',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Malang Strudel',
                    'deskripsi' => 'Oleh-oleh khas Malang yang hits — kue strudel dengan berbagai varian rasa: apel, coklat, keju, hingga pisang. Dikemas premium dan tahan lama untuk dibawa pulang. Jadi salah satu buah tangan paling dicari wisatawan yang berkunjung ke Malang.',
                    'alamat' => 'Jl. Trunojoyo No.8, Klojen, Malang',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Jalan Ijen Boulevard',
                    'deskripsi' => 'Jalan hijau ikonik Malang bergaya Eropa dengan pohon palem berjajar rapi di median jalan. Setiap minggu pagi ditutup untuk Car Free Day dan dipenuhi pedagang, seniman jalanan, serta warga berolahraga. Spot foto favorit di Malang.',
                    'alamat' => 'Jl. Ijen, Oro-oro Dowo, Klojen, Malang',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
            ],

            // ── Cirebon ───────────────────────────────────────────────
            'CN' => [
                [
                    'nama' => 'Empal Gentong Krucuk H. Apud',
                    'deskripsi' => 'Empal gentong autentik Cirebon yang dimasak dalam gentong tanah liat menggunakan kayu bakar. Kuah santan kental gurih berpadu potongan daging sapi dan jeroan empuk. Salah satu kuliner paling ikonik dan wajib coba di Cirebon.',
                    'alamat' => 'Jl. Krucuk, Jagasatru, Cirebon Selatan',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.6,
                ],
                [
                    'nama' => 'Keraton Kasepuhan Cirebon',
                    'deskripsi' => 'Keraton tertua dan terlengkap di Cirebon yang dibangun 1529. Menyimpan koleksi kereta kencana Paksi Naga Liman, benda-benda peninggalan Sunan Gunung Jati, dan artefak bernilai sejarah tinggi yang mencerminkan kejayaan Kesultanan Cirebon.',
                    'alamat' => 'Jl. Kasepuhan No.43, Lemahwungkuk, Cirebon',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Nasi Jamblang Ibu Nur',
                    'deskripsi' => 'Nasi jamblang khas Cirebon yang disajikan dengan daun jati sebagai pembungkus. Tersedia puluhan pilihan lauk: sambal goreng kentang, tahu, tempe, perkedel, paru, dan berbagai masakan rumahan. Tempat makan rakyat paling autentik di Cirebon.',
                    'alamat' => 'Jl. Cangkring 2 No.34, Cirebon',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Batik Trusmi',
                    'deskripsi' => 'Pusat batik terbesar di Cirebon di Kampung Trusmi yang sudah ada sejak ratusan tahun. Motif mega mendung yang khas Cirebon tersedia dalam berbagai kualitas dan harga. Pengunjung bisa melihat langsung proses membatik dan belanja langsung dari pengrajin.',
                    'alamat' => 'Desa Trusmi Kulon, Plered, Cirebon',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Masjid Merah Panjunan',
                    'deskripsi' => 'Masjid bersejarah berusia lebih dari 500 tahun yang dibangun oleh Sunan Gunung Jati. Arsitekturnya unik memadukan gaya Arab, Tiongkok, dan Jawa dengan dinding bata merah khas yang membuatnya berbeda dari masjid lain di Indonesia.',
                    'alamat' => 'Jl. Panjunan, Panjunan, Lemahwungkuk, Cirebon',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            'CNP' => [
                [
                    'nama' => 'Docang Cirebon H. Dadi',
                    'deskripsi' => 'Docang adalah makanan khas Cirebon paling tradisional: lontong dengan kuah oncom, daun singkong, dan tauge disiram kuah gurih beraroma khas. Warung H. Dadi sudah buka sejak subuh dan menjadi sarapan favorit warga Cirebon.',
                    'alamat' => 'Jl. Tentara Pelajar, Cirebon Utara',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Taman Ade Irma Suryani',
                    'deskripsi' => 'Taman wisata keluarga tepi pantai Cirebon yang memiliki area bermain anak, wahana air, dan restoran seafood dengan pemandangan laut langsung. Tempat nongkrong favorit keluarga Cirebon terutama saat sore dan akhir pekan.',
                    'alamat' => 'Jl. Sumber Bahari, Kejaksan, Cirebon',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.0,
                ],
            ],

            // ── Purwokerto ────────────────────────────────────────────
            'PWT' => [
                [
                    'nama' => 'Objek Wisata Baturaden',
                    'deskripsi' => 'Kawasan wisata alam di lereng Gunung Slamet dengan ketinggian 640 mdpl. Terkenal dengan air terjun, pemandian air panas alami, kolam renang, dan hutan pinus yang sejuk. Berjarak 14 km dari Stasiun Purwokerto, mudah dijangkau dengan angkutan umum.',
                    'alamat' => 'Karangmangu, Baturaden, Banyumas',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Getuk Goreng Sokaraja Haji Tohirin',
                    'deskripsi' => 'Oleh-oleh khas Banyumas yang wajib dibawa pulang. Getuk goreng Sokaraja dibuat dari singkong pilihan dengan rasa manis gurih, digoreng renyah di luar namun lembut di dalam. Sudah ada sejak 1918 dan menjadi ikon kuliner Purwokerto.',
                    'alamat' => 'Jl. Jend. Sudirman, Sokaraja, Banyumas',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Pusat Kuliner Pratistha Hasta',
                    'deskripsi' => 'Pusat jajanan kuliner khas Banyumas yang dikenal sebagai Pasar Minggu. Ratusan penjual menawarkan aneka makanan lokal: sroto Sokaraja, nopia, mendoan, tempe kripik, hingga berbagai minuman tradisional khas Banyumas.',
                    'alamat' => 'Jl. Jend. Gatot Subroto, Purwokerto Selatan',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Sroto Sokaraja Pak Bambang',
                    'deskripsi' => 'Sroto (soto) khas Banyumas dengan kuah kacang yang gurih dan kental, dipadukan dengan ketupat, soun, tauge, dan daging ayam/sapi. Sambal kacang yang unik menjadi pembeda utama sroto Sokaraja dari soto-soto lain di Jawa.',
                    'alamat' => 'Jl. Raya Sokaraja, Sokaraja, Banyumas',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Taman Andhang Pangrenan',
                    'deskripsi' => 'Taman kota terbesar di Purwokerto yang menjadi pusat rekreasi keluarga. Dilengkapi kolam renang, arena bermain anak, jogging track, panggung terbuka, dan area UMKM kuliner lokal yang beroperasi dari pagi hingga malam.',
                    'alamat' => 'Jl. dr. Soeparno, Purwokerto Barat, Banyumas',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Blitar ────────────────────────────────────────────────
            'BL' => [
                [
                    'nama' => 'Makam Bung Karno',
                    'deskripsi' => 'Kompleks makam Presiden pertama RI Ir. Soekarno yang menjadi destinasi wisata sejarah dan ziarah paling ramai di Blitar. Dilengkapi perpustakaan, museum diorama, dan taman yang terawat. Ratusan ribu pengunjung datang setiap tahun.',
                    'alamat' => 'Jl. Slamet Riyadi, Bendogerit, Sananwetan, Blitar',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Candi Penataran',
                    'deskripsi' => 'Kompleks candi Hindu terbesar di Jawa Timur yang dibangun pada masa Kerajaan Kediri hingga Majapahit (abad 12–15). Terdiri dari puluhan bangunan dengan relief cerita Ramayana dan Mahabharata yang menakjubkan.',
                    'alamat' => 'Desa Penataran, Nglegok, Blitar',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Agrowisata Belimbing Karangsari',
                    'deskripsi' => 'Desa wisata agro yang terkenal dengan belimbing jumbo khas Blitar. Pengunjung bisa memetik buah langsung dari pohon, mencicipi berbagai olahan belimbing, dan membeli produk UMKM pengolahan belimbing seperti sirup, keripik, dan selai.',
                    'alamat' => 'Desa Karangsari, Sukorejo, Blitar',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Pecel Blitar Bu Tri',
                    'deskripsi' => 'Pecel khas Blitar dengan bumbu kacang yang kaya rempah dan lebih pedas dibanding pecel Madiun. Disajikan dengan aneka sayuran rebus segar, peyek kacang, tempe goreng, dan lauk pilihan. Sarapan andalan warga Blitar sejak puluhan tahun.',
                    'alamat' => 'Jl. Kenanga, Sananwetan, Blitar',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Kediri ────────────────────────────────────────────────
            'KD' => [
                [
                    'nama' => 'Goa Selomangleng',
                    'deskripsi' => 'Goa bersejarah peninggalan Kerajaan Kediri abad ke-11 yang dipahat di batu andesit. Di dalamnya terdapat relief kisah Arjunawiwaha karya Mpu Kanwa. Terletak di lereng Gunung Klotok yang hijau dan segar.',
                    'alamat' => 'Desa Pojok, Mojoroto, Kediri',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Tahu Kuning Kediri Kak Ana',
                    'deskripsi' => 'Tahu kuning khas Kediri yang sudah terkenal ke seluruh Indonesia. Terbuat dari kedelai pilihan dan diberi pewarna alami kunyit, menghasilkan tahu berwarna kuning dengan tekstur kenyal dan rasa gurih khas. Tersedia dalam kemasan siap kirim.',
                    'alamat' => 'Jl. Pattimura No.89, Kota Kediri',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Soto Ayam Kampung Kediri Pak Sabar',
                    'deskripsi' => 'Soto ayam kampung khas Kediri dengan kuah bening ringan dan wangi, berisi suwiran daging ayam kampung, tauge, dan soun. Disantap dengan nasi atau lontong, tambah kerupuk dan sambal — sarapan paling dicari warga Kediri.',
                    'alamat' => 'Jl. Dhoho No.65, Kota Kediri',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Monumen Simpang Lima Gumul',
                    'deskripsi' => 'Monumen megah terinspirasi Arc de Triomphe Paris yang menjadi landmark Kabupaten Kediri. Dikelilingi lima jalan besar, kawasan ini ramai di malam hari dengan berbagai pedagang kuliner dan jajanan khas Kediri.',
                    'alamat' => 'Desa Tugurejo, Ngasem, Kediri',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Madiun ────────────────────────────────────────────────
            'MN' => [
                [
                    'nama' => 'Pecel Madiun Bu Rukmini',
                    'deskripsi' => 'Pecel Madiun yang sudah terkenal ke seluruh Indonesia — bumbu kacang halus dengan rasa gurih, manis, dan sedikit pedas disiram di atas aneka sayuran rebus segar. Sajian autentik khas Madiun yang wajib dicoba setiap wisatawan.',
                    'alamat' => 'Jl. Kolonel Marhadi No.7, Madiun',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Brem Madiun Sido Maju',
                    'deskripsi' => 'Produsen brem khas Madiun yang terkenal sejak puluhan tahun. Brem adalah makanan olahan dari fermentasi beras ketan yang memiliki rasa manis asam unik, tersedia dalam bentuk padat dan cair. Oleh-oleh khas yang paling dicari dari Madiun.',
                    'alamat' => 'Jl. Mayjend Sungkono, Mejayan, Madiun',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Monumen Kresek',
                    'deskripsi' => 'Monumen bersejarah yang didirikan untuk mengenang peristiwa Madiun 1948. Terletak di atas bukit dengan pemandangan indah, dilengkapi diorama dan relief yang menggambarkan sejarah perjuangan bangsa Indonesia.',
                    'alamat' => 'Desa Kresek, Wungu, Madiun',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
                [
                    'nama' => 'Sate Ayam Ponorogo Pak Karwo',
                    'deskripsi' => 'Sate ayam Ponorogo khas yang terkenal di Madiun — daging ayam muda bertekstur lembut dimarinasi bumbu kuning, dibakar sempurna, dan disajikan dengan bumbu kacang manis gurih kental. Berbeda dengan sate biasa, ini menggunakan potongan daging tanpa tulang.',
                    'alamat' => 'Jl. Pahlawan No.13, Madiun',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Tegal ─────────────────────────────────────────────────
            'TG' => [
                [
                    'nama' => 'Kupat Glabed Tegal',
                    'deskripsi' => 'Kuliner khas Tegal yang wajib dicoba — ketupat disiram kuah kuning kental dari tepung beras berbumbu kunyit dan rempah, ditambah potongan tempe goreng dan mi. Rasanya gurih creamy khas, sangat berbeda dari makanan berkuah di daerah lain.',
                    'alamat' => 'Jl. Werkudoro, Tegal Timur, Kota Tegal',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Taman Pancasila Tegal',
                    'deskripsi' => 'Taman kota yang sering menjadi pusat festival UMKM dan kuliner Tegal. Di sekitarnya berjajar pedagang es krim tempo dulu, martabak Tegal, wedang asle, dan jajanan khas yang sudah ada sejak generasi. Ramai terutama sore dan malam hari.',
                    'alamat' => 'Jl. Ahmad Yani, Panggung, Tegal Timur',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.1,
                ],
                [
                    'nama' => 'Sate Blengong Tegal Bu Hj. Darmi',
                    'deskripsi' => 'Sate blengong adalah kuliner langka khas Tegal — menggunakan daging blengong (persilangan itik dan mentok) yang empuk dengan tekstur unik. Dibakar dengan bumbu kecap khas, aromanya harum dan rasanya lebih gurih dibanding sate ayam biasa.',
                    'alamat' => 'Jl. Setiabudi No.22, Tegal Selatan',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Batik Tegalan Tobal',
                    'deskripsi' => 'Pusat batik khas Tegal dengan motif yang berbeda dari batik Jawa pada umumnya — lebih berani dalam warna dan motif geometris kontemporer. Bisa memesan custom batik sesuai selera dan belajar membatik langsung dari pengrajin.',
                    'alamat' => 'Jl. Sumbodro No.15, Tegal',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Pekalongan ────────────────────────────────────────────
            'PK' => [
                [
                    'nama' => 'Museum Batik Pekalongan',
                    'deskripsi' => 'Museum batik paling komprehensif di Indonesia yang diresmikan Presiden SBY. Menyimpan lebih dari 1.000 koleksi batik dari berbagai daerah dan era. Dilengkapi perpustakaan, ruang workshop, dan toko batik berkualitas.',
                    'alamat' => 'Jl. Jetayu No.1, Pekalongan Utara',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Sego Megono Mbah Ibah',
                    'deskripsi' => 'Nasi megono autentik khas Pekalongan — nasi dicampur nangka muda cincang halus yang dibumbui dengan parutan kelapa dan rempah. Disantap bersama tempe mendoan panas, tahu bacem, dan lauk lainnya. Sarapan pagi paling ikonik di Pekalongan.',
                    'alamat' => 'Alun-Alun Pekalongan, Pekalongan Utara',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Batik Pekalongan Pasar Setono Betek',
                    'deskripsi' => 'Pusat grosir batik Pekalongan terbesar tempat para pedagang batik dari seluruh Indonesia berbelanja. Ribuan motif batik tersedia dengan harga sangat terjangkau. Pekalongan diakui UNESCO sebagai kota batik dunia.',
                    'alamat' => 'Jl. Dr. Sutomo, Setono Betek, Pekalongan',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Pindang Tetel Pak Darsono',
                    'deskripsi' => 'Pindang tetel adalah masakan khas Pekalongan yang jarang ditemukan di kota lain — potongan daging sapi dimasak dalam bumbu hitam kecap yang kaya rempah, pedas, dan sangat gurih. Cocok disantap dengan nasi hangat dan kerupuk.',
                    'alamat' => 'Jl. Wahid Hasyim No.44, Pekalongan Timur',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Tasikmalaya ───────────────────────────────────────────
            'TSM' => [
                [
                    'nama' => 'Kupat Tahu Kabita',
                    'deskripsi' => 'Kuliner legendaris Tasikmalaya sejak 1976. Kupat (ketupat) dan tahu dipadukan dengan bumbu kacang khas yang lebih encer dan segar dibanding bumbu gado-gado. Disajikan dengan mi kuning, tauge, dan kerupuk — sarapan wajib warga Tasik.',
                    'alamat' => 'Jl. Otto Iskandar Dinata, Cihideung, Tasikmalaya',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Kerajinan Payung Geulis Tasikmalaya',
                    'deskripsi' => 'Payung geulis adalah kerajinan khas Tasikmalaya berupa payung kertas yang dihias dengan lukisan bunga dan motif cantik. Sudah diakui sebagai warisan budaya, kini tersedia dalam berbagai ukuran sebagai dekorasi dan souvenir bernilai seni tinggi.',
                    'alamat' => 'Jl. Panyingkiran, Indihiang, Tasikmalaya',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Situ Gede Tasikmalaya',
                    'deskripsi' => 'Danau alami di tengah kota Tasikmalaya yang dikelilingi pepohonan hijau dan dilengkapi pulau kecil di tengahnya. Pengunjung bisa menikmati perahu, memancing, atau sekadar bersantai menikmati suasana danau yang tenang dan asri.',
                    'alamat' => 'Jl. Situ Gede, Mangkubumi, Tasikmalaya',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Warung Nasi Nini Anteh',
                    'deskripsi' => 'Warung makan khas Sunda dengan konsep prasmanan di bangunan rumah tua bersejarah. Menu lengkap masakan Sunda: ayam bakar, ikan asin, lalapan segar, sambel, dan sayur asem. Hanya 250 meter dari Stasiun Tasikmalaya, jadi pilihan makan pertama setelah tiba.',
                    'alamat' => 'Jl. Dewi Sartika No.14, Tasikmalaya',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
            ],

            // ── Banjar ────────────────────────────────────────────────
            'BJR' => [
                [
                    'nama' => 'Sate Maranggi Banjar',
                    'deskripsi' => 'Sate maranggi khas Sunda dengan daging sapi/kambing yang dimarinasi bumbu rempah khas kemudian dibakar arang. Berbeda dari sate pada umumnya, sate maranggi disajikan tanpa bumbu kacang — cukup sambal oncom segar dan irisan tomat.',
                    'alamat' => 'Jl. Sudirman No.28, Banjar',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Taman Kota Langensari Banjar',
                    'deskripsi' => 'Taman kota Banjar yang asri dan bersih dengan berbagai fasilitas rekreasi keluarga. Terdapat kolam bermain anak, jogging track, gazebo, dan area kuliner dengan berbagai jajanan khas Priangan Timur.',
                    'alamat' => 'Jl. Kapten Jamhur, Langensari, Banjar',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.0,
                ],
                [
                    'nama' => 'Kerajinan Anyaman Rotan Banjar',
                    'deskripsi' => 'Sentra kerajinan anyaman rotan dan bambu khas Banjar yang sudah terkenal hingga mancanegara. Berbagai produk fungsional dan dekoratif: keranjang, tas, kursi, dan perabot rumah tangga tersedia langsung dari pengrajin dengan harga bersahabat.',
                    'alamat' => 'Desa Mekarsari, Pataruman, Banjar',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
            ],

            // ── Jember ────────────────────────────────────────────────
            'JR' => [
                [
                    'nama' => 'Gudeg Lumintu Jember',
                    'deskripsi' => 'Gudeg Jawa Timur khas Jember yang sudah ada sejak 1968. Berbeda dari gudeg Jogja yang manis, gudeg Lumintu lebih gurih dengan cita rasa khas Jawa Timur. Menu lain tersedia: soto, nasi campur, dan nasi pecel. Lokasi strategis dekat stasiun.',
                    'alamat' => 'Jl. Kertanegara No.33, Kaliwates, Jember',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
                [
                    'nama' => 'Alun-Alun Jember',
                    'deskripsi' => 'Jantung kota Jember yang dikelilingi pohon rindang dan gedung bersejarah colonial. Menjadi pusat kegiatan warga, festival seni, dan Car Free Day. Di malam hari ramai dengan pedagang kaki lima yang menjual berbagai kuliner khas Jember.',
                    'alamat' => 'Jl. Supriyadi, Kaliwates, Jember',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Suwar-Suwir Jember Bu Mie',
                    'deskripsi' => 'Oleh-oleh khas Jember yang paling dicari — suwar-suwir adalah permen kenyal berbahan dasar tape singkong pilihan dengan berbagai varian rasa dan warna. Sudah menjadi ikon kuliner Jember yang wajib dibawa pulang setiap wisatawan.',
                    'alamat' => 'Jl. Hayam Wuruk No.11, Jember',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Warung Bu Darum',
                    'deskripsi' => 'Warung masakan rumahan Jawa Timur autentik sejak 1953. Menu beragam: nasi pecel, rawon, soto Jawa Timur, rames, kare ayam, dan nasi bali. Harga sangat terjangkau dan porsi mengenyangkan, menjadikannya favorit mahasiswa dan pelancong.',
                    'alamat' => 'Jl. PB Sudirman No.42, Jember',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Banyuwangi ────────────────────────────────────────────
            'BW' => [
                [
                    'nama' => 'Kawah Ijen',
                    'deskripsi' => 'Danau kawah vulkanik berwarna hijau toska di ketinggian 2.386 mdpl yang menjadi salah satu keajaiban alam paling menakjubkan di dunia. Fenomena api biru (blue fire) yang langka hanya bisa dilihat dini hari. Destinasi trekking paling ikonik di Jawa Timur.',
                    'alamat' => 'Desa Tamansari, Licin, Banyuwangi',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.8,
                ],
                [
                    'nama' => 'Sego Tempong Bu Sinar',
                    'deskripsi' => 'Nasi tempong adalah kuliner khas Banyuwangi — nasi panas disajikan dengan lauk ikan/ayam goreng, tempe, tahu, dan sayuran rebus, disiram sambal tomat mentah yang sangat pedas. "Tempong" artinya tampar — menggambarkan pedasnya yang luar biasa.',
                    'alamat' => 'Jl. Brawijaya No.55, Banyuwangi',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Pantai Boom Banyuwangi',
                    'deskripsi' => 'Pantai urban Banyuwangi yang mudah dijangkau dari pusat kota. Dilengkapi dermaga, area kuliner seafood, dan pemandangan Selat Bali yang indah. Sore hari adalah waktu terbaik untuk menikmati sunset dengan latar Pulau Bali di kejauhan.',
                    'alamat' => 'Jl. Banterang, Kampung Mandar, Banyuwangi',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.3,
                ],
                [
                    'nama' => 'Batik Gajah Oling Banyuwangi',
                    'deskripsi' => 'Pusat batik khas Banyuwangi dengan motif gajah oling yang unik — motif sulur meliuk menyerupai belalai gajah yang menjadi ciri khas budaya Using Banyuwangi. Tersedia kain batik, pakaian jadi, dan souvenir yang tidak ditemukan di kota lain.',
                    'alamat' => 'Jl. Brawijaya No.109, Banyuwangi',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Jakarta Timur ─────────────────────────────────────────
            'JNG' => [
                [
                    'nama' => 'Pasar Jatinegara',
                    'deskripsi' => 'Pasar tradisional terbesar di Jakarta Timur yang menjual berbagai produk UMKM, tekstil, peralatan rumah tangga, dan kuliner. Di malam hari berubah menjadi pasar malam yang ramai dengan pedagang kaki lima beraneka ragam.',
                    'alamat' => 'Jl. Jatinegara Barat, Jatinegara, Jakarta Timur',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.0,
                ],
                [
                    'nama' => 'Mie Ayam Bangka Amat Jatinegara',
                    'deskripsi' => 'Mie ayam Bangka legendaris di kawasan Jatinegara yang sudah buka sejak 1970-an. Mie kenyal buatan sendiri dengan topping ayam jamur yang gurih, bakso, dan pangsit — disajikan dengan kuah kaldu ayam bening yang wangi.',
                    'alamat' => 'Jl. Matraman Raya, Jatinegara, Jakarta Timur',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.2,
                ],
                [
                    'nama' => 'Taman Ismail Marzuki',
                    'deskripsi' => 'Pusat kebudayaan dan seni terbesar di Jakarta yang menampung teater, galeri seni, planetarium, dan berbagai pertunjukan budaya. Setelah direnovasi, TIM menjadi destinasi wisata seni modern yang memadukan tradisi dan kontemporer.',
                    'alamat' => 'Jl. Cikini Raya No.73, Cikini, Jakarta Pusat',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.4,
                ],
            ],

            // ── Bogor ─────────────────────────────────────────────────
            'BOO' => [
                [
                    'nama' => 'Kebun Raya Bogor',
                    'deskripsi' => 'Kebun raya tertua di Asia Tenggara yang didirikan 1817, menyimpan lebih dari 15.000 spesies tanaman tropis. Istana Bogor berada di dalam kompleksnya. Destinasi wisata alam dan ilmu pengetahuan paling populer di Bogor.',
                    'alamat' => 'Jl. Ir. H. Juanda No.13, Bogor Tengah',
                    'kategori' => 'Wisata',
                    'is_verified' => true,
                    'rating' => 4.7,
                ],
                [
                    'nama' => 'Soto Kuning Pak Yusuf Bogor',
                    'deskripsi' => 'Soto kuning khas Bogor dengan kuah santan berwarna kuning cerah, kaya rempah jahe dan kunyit. Diisi dengan potongan daging sapi, jeroan, dan perkedel kentang. Sudah menjadi ikon kuliner Bogor yang dicari wisatawan sejak generasi ke generasi.',
                    'alamat' => 'Jl. Suryakencana No.229, Bogor Tengah',
                    'kategori' => 'Kuliner',
                    'is_verified' => true,
                    'rating' => 4.5,
                ],
                [
                    'nama' => 'Roti Unyil Venus Bogor',
                    'deskripsi' => 'Roti unyil khas Bogor — roti mini seukuran jempol dengan berbagai isian gurih dan manis. Sudah ada sejak 1983, menjadi oleh-oleh paling ikonik dari Bogor dengan lebih dari 40 varian rasa tersedia setiap hari.',
                    'alamat' => 'Jl. Pajajaran No.16A, Bogor Utara',
                    'kategori' => 'UMKM',
                    'is_verified' => true,
                    'rating' => 4.4,
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

<?php

namespace Database\Seeders;

use App\Models\Kota;
use Illuminate\Database\Seeder;

class KotaFotoSeeder extends Seeder
{
    public function run(): void
    {
        $fotos = [
            'Bandung' => 'https://upload.wikimedia.org/wikipedia/commons/6/67/Bandung_Pasupati_Skyline.jpg',
            'Bandung Barat' => 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Gunung_Batu.jpg',
            'Banjar' => 'https://upload.wikimedia.org/wikipedia/commons/7/74/Banjar_Jabar_-_panoramio.jpg',
            'Bantul' => 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Parangtritis_Beach_2011_4.JPG',
            'Banyumas' => 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Baturraden_overview_from_ridge%2C_Purwokerto%2C_2015-03-23.jpg',
            'Banyuwangi' => 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Kawah_Ijen_%2827432832286%29.jpg',
            'Batang' => 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Kalikuto_Bridge.jpg',
            'Bekasi' => 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Kalimalang.jpg',
            'Blitar' => 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Makam_BK_di_Blitar.jpg',
            'Blora' => 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Jembatan_Cepu%2C_Blora%2C_Jateng%2C_Indonesia.jpg',
            'Bogor' => 'https://upload.wikimedia.org/wikipedia/commons/7/75/Kebun_Raya_Bogor_19.jpg',
            'Bojonegoro' => 'https://upload.wikimedia.org/wikipedia/commons/9/91/Bojonegoro%2C_Indonesia_%28Unsplash%29.jpg',
            'Boyolali' => 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Boyolali_2022_-_Selo_village_-_Merapi_view_02.jpg',
            'Brebes' => 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Pemandangan_Luasnya_perkebunan_sayur_yang_indah_di_Lembah_desa_Kaligua_Kab._Brebes_%286%29.jpg',
            'Ciamis' => 'https://upload.wikimedia.org/wikipedia/commons/3/35/Alun-alun_Ciamis_-_panoramio.jpg',
            'Cianjur' => 'https://upload.wikimedia.org/wikipedia/commons/9/98/Gentur_Lamp_Monument_2022.jpg',
            'Cilacap' => 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Benteng_Pendem_Cilacap_panorama.jpg',
            'Cilegon' => 'https://upload.wikimedia.org/wikipedia/commons/8/80/Pelabuhan_Merak_Port_of_Merak.JPG',
            'Cimahi' => 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Alun-alun_Cimahi_-_panoramio.jpg',
            'Cirebon' => 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Sanctuary_of_Ong_Tien.jpg',
            'Demak' => 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Masjid_demak.jpg',
            'Depok' => 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Depok_City_Hall_in_December_2024.jpg',
            'Garut' => 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Cangkuang_3.jpg',
            'Gresik' => 'https://upload.wikimedia.org/wikipedia/commons/5/53/Aerial_of_Gresik%2C_and_Giri_Hills%2C_23_July_2015.jpg',
            'Grobogan' => 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Bledug_Kuwu_2.jpg',
            'Indramayu' => 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Monumen_Tugu_Bambu_Indramayu_-_panoramio.jpg',
            'Jakarta Barat' => 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Tjiptaniaga-kota.jpg',
            'Jakarta Pusat' => 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Jakarta_Panorama.jpg',
            'Jakarta Selatan' => 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Blok_M_Jakarta.jpg',
            'Jakarta Timur' => 'https://upload.wikimedia.org/wikipedia/commons/9/91/Indonesia_in_miniature%2C_Taman_Mini_Indonesia_Indah.jpg',
            'Jakarta Utara' => 'https://upload.wikimedia.org/wikipedia/commons/4/44/Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_01.jpg',
            'Jember' => 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Jembercity.jpg',
            'Jombang' => 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Ringin_Contong_Jombang.jpg',
            'Karanganyar' => 'https://upload.wikimedia.org/wikipedia/commons/3/31/Landscape_in_Tawangmangu-Plaosan_road.jpg',
            'Karawang' => 'https://upload.wikimedia.org/wikipedia/commons/3/38/Kawasan_Galuh_Mas_Karawang.jpg',
            'Kebumen' => 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Bukit_Pentulu_Indah%2C_Panorama_di_Ketinggian_Kabupaten_Kebumen.jpg',
            'Kediri' => 'https://upload.wikimedia.org/wikipedia/id/c/c1/Monumen_Simpang_Lima_Gumul.jpg',
            'Kendal' => 'https://upload.wikimedia.org/wikipedia/commons/0/07/Curug_Sewu.jpg',
            'Klaten' => 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Candi_Plaosan_Lor_%28North_Plaosan_Temple%29_from_Klaten%2C_Central_Java%2C_Indonesia_10.jpg',
            'Kulon Progo' => 'https://upload.wikimedia.org/wikipedia/commons/d/db/Glagah_Beach_Kulon_Progo.jpg',
            'Lamongan' => 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Monumen_Bandeng_Lele%2C_Lamongan.jpg',
            'Lebak' => 'https://upload.wikimedia.org/wikipedia/commons/6/66/Icon_if_Tanjung_Layar%2C_Sawarna.jpg',
            'Lumajang' => 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Mount_Semeru.jpg',
            'Madiun' => 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Kantor_Pemerintahan_Kota_Madiun_tahun_2020.jpg',
            'Magetan' => 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Telaga_Sarangan%2C_Magetan.jpg',
            'Malang' => 'https://upload.wikimedia.org/wikipedia/commons/9/96/Tugu_Malang.jpg',
            'Mojokerto' => 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Brahu_Temple_Trowulan.jpg',
            'Nganjuk' => 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Alun-alun_Nganjuk.jpg',
            'Ngawi' => 'https://upload.wikimedia.org/wikipedia/commons/7/71/Tugu_Kartonyono_Kota_Ngawi.jpg',
            'Pasuruan' => 'https://upload.wikimedia.org/wikipedia/commons/0/06/Masjid_Jami%27_Al-Anwar_Pasuruan_-_panoramio.jpg',
            'Pekalongan' => 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Museum_Batik_Pekalongan_-_Jawa_Tengah.jpg',
            'Pemalang' => 'https://upload.wikimedia.org/wikipedia/commons/8/87/PEMALANG_-_panoramio.jpg',
            'Probolinggo' => 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mount_Bromo_panorama.jpg',
            'Purwakarta' => 'https://upload.wikimedia.org/wikipedia/commons/6/65/Waduk_Jatiluhur_Purwakarta_Jawa_Barat_Indonesia.jpg',
            'Purworejo' => 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Alun-Alun_Purworejo_%283%29.jpg',
            'Semarang' => 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Lawang_Sewu_in_Semarang_City.jpg',
            'Serang' => 'https://upload.wikimedia.org/wikipedia/commons/6/69/Masjid_agung_banten_lama.jpg',
            'Sidoarjo' => 'https://upload.wikimedia.org/wikipedia/commons/1/15/Alun-alun-sidoarjo.jpg',
            'Sleman' => 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Prambanan_Temple_Yogyakarta_Indonesia.jpg',
            'Solo' => 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Kraton_Solo.jpg',
            'Sragen' => 'https://upload.wikimedia.org/wikipedia/commons/1/18/Alun-Alun_Sragen.jpg',
            'Subang' => 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Wismakarya_Subang_5.jpg',
            'Sukabumi' => 'https://upload.wikimedia.org/wikipedia/commons/8/80/Sukabumi_Grand_Mosque_2022_01.jpg',
            'Sukoharjo' => 'https://upload.wikimedia.org/wikipedia/commons/9/95/Sukoharjo_Regency%2C_Central_Java%2C_Indonesia.JPG',
            'Surabaya' => 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Panorama_of_Surabaya_%289_September_2019%29.jpg',
            'Tangerang' => 'https://upload.wikimedia.org/wikipedia/commons/4/46/Azhom_2.jpg',
            'Tangerang Selatan' => 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Kantor_Wali_Kota_Tangerang_Selatan.jpg',
            'Tasikmalaya' => 'https://upload.wikimedia.org/wikipedia/commons/5/57/Masjid_Agung_Tasikmalaya.jpg',
            'Tegal' => 'https://upload.wikimedia.org/wikipedia/commons/1/15/Monumen_Bahari_Tegal.jpg',
            'Tulungagung' => 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Kedung_tumpang.jpg',
            'Wonogiri' => 'https://upload.wikimedia.org/wikipedia/commons/5/59/Gajah_Mungkur_dam.jpg',
            'Yogyakarta' => 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Malioboro_Street%2C_Yogyakarta.JPG',
        ];

        $updated = 0;

        foreach ($fotos as $nama => $foto) {
            $updated += Kota::where('nama', $nama)->update(['foto' => $foto]);
        }

        $this->command->info("Updated foto for {$updated} kota.");
    }
}

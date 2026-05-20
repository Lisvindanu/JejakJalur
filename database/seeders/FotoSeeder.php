<?php

namespace Database\Seeders;

use App\Models\Destinasi;
use Illuminate\Database\Seeder;

class FotoSeeder extends Seeder
{
    public function run(): void
    {
        $fotos = [
            // ── Jakarta ───────────────────────────────────────────────────
            '56f97f3b-34d0-4962-998a-e3a8742b4773' => 'https://akcdn.detik.net.id/community/media/visual/2021/02/25/sedapnya-nasi-uduk-kebon-kacang-legendaris-racikan-kedai-zainal-fanani-12.jpeg?w=1280',
            '38021440-5176-4934-9f5f-c5489f5cfef9' => 'https://upload.wikimedia.org/wikipedia/commons/6/69/Front_facade_-_National_Museum_Indonesia%2C_Jakarta_%282025%29_-_img_07.jpg',
            'd2eb496a-4faa-445b-bae0-a387db98adb8' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/1c/47/aa/toko-batik-semar-di-bagian.jpg?w=1200&h=-1&s=1',
            'c720e3c3-3d4f-4b5a-a029-dd364a40d691' => 'https://upload.wikimedia.org/wikipedia/en/2/25/Masjid_Istiqlal_-_Panoramio.jpg',
            'dc6b8349-d825-4db8-a8f7-7ecaacf7824e' => 'https://manual.co.id/wp-content/uploads/2018/07/sotohmarufstreet_cikini1.jpg',
            '378d97f4-48d7-4dd0-8538-a9f4296e5bf4' => 'https://salsawisata.com/wp-content/uploads/2022/08/Galeri-Nasional-Indonesia.jpg',
            'ed32f17a-7ef6-47ca-98dd-0d52951290da' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/98/82/79/20180408-152334-largejpg.jpg?w=900&h=500&s=1',
            'cbc95aa1-fb0a-420b-a6ef-fe8594432736' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/fa/91/6b/pasar-loak-di-jalan-surabaya.jpg?w=1200&h=-1&s=1',
            'd944216e-983a-4512-a57b-d21aac8836e3' => 'https://www.reservasiku.com/wp-content/uploads/2023/01/7-Wisata-Kuliner-Bubur-Ayam-Jakarta-Paling-Lezat-Dan-Populer-3.jpeg',
            'ed95c58c-2ab8-4241-8924-3bbcbfb02fe9' => 'https://upload.wikimedia.org/wikipedia/id/b/b1/Merdeka_Square_Monas_02.jpg',
            '939ea446-ddf4-4eff-a7d1-5c8320ce71b7' => 'https://upload.wikimedia.org/wikipedia/commons/5/59/Pasar_Mester_%28Pasar_Regional_Jatinegara%29.jpg',
            '2e1420e3-c8c6-480b-8f72-c81dd32565ef' => 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Plaza_Taman_Ismail_Marzuki.jpg',
            '292e4475-736f-4d69-83e2-c95d2dadd47a' => 'https://asset.kompas.com/crops/JlIAFTMi-vQFrQvAXqDjOOIHNkY=/0x0:0x0/1200x800/data/photo/2022/09/23/632d7f2048c24.jpg',
            '1cef31ca-12c9-4d9d-8066-b493f944ae09' => 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Istana_Anak-anak_Indonesia_TMII_%282025%29_-_img_01.jpg',

            // ── Jakarta Utara ─────────────────────────────────────────────
            '96a49bfe-e6fb-4e8f-9865-7d9d3d3ece80' => 'https://awsimages.detik.net.id/community/media/visual/2023/01/21/pecinan-glodok-6_169.jpeg?wid=54&w=1200&v=1&t=jpeg',
            'cbc0e18a-73ec-49df-9919-5733a49c6309' => 'https://upload.wikimedia.org/wikipedia/commons/5/54/Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_03.jpg',
            '8c7f5ff7-6698-43e5-b2fd-0a9cdf57d9af' => 'https://www.jktliving.com/blog/wp-content/uploads/2025/02/Museum-Bank-Indonesia-scaled.jpg',
            '5aba5b1b-4760-4691-b301-bc2f8d73a36b' => 'https://glodokplaza.com/wp-content/uploads/2023/04/Image.webp',
            '5b7ae83b-00b2-4a8d-82ff-74dbb9d28903' => 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Cafe_Batavia%2C_Kota_Tua_Jakarta_%282025%29_-_img_01.jpg',

            // ── Jakarta Barat ─────────────────────────────────────────────
            '1b3f1cb4-a2f4-4de1-b6a0-367aa7593ae1' => 'https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/90/1672835768-IMG-20230104-WA0008.jpg',
            '681a4ba6-7aa4-4189-90fe-a5a710943081' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/10/9b/fe/taman-anggrek-indonesia.jpg?w=900&h=-1&s=1',
            'e6135e22-0f06-4997-a11e-281ae652f3fa' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ragusa_Es_Italia_Jalan_Veteran.JPG/960px-Ragusa_Es_Italia_Jalan_Veteran.JPG',
            'b3742288-2a41-4c93-b3cd-068cf2852c41' => 'https://salsawisata.com/wp-content/uploads/2023/03/Pusat-Grosir-Metro-Tanah-Abang.jpg',

            // ── Jakarta Selatan ───────────────────────────────────────────
            '6e6f581f-cd6b-4c32-bfe1-4d990142ea16' => 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pasar_Santa.jpg',
            '7f36f1d1-56b0-4db8-9327-76af27e78002' => 'https://storage.googleapis.com/seo-cms/assets/Tugu_di_Taman_Langsat_d2ce826cf5/Tugu_di_Taman_Langsat_d2ce826cf5.jpg',
            'd06edc2a-b4b1-4531-aefe-5d7a2e4d6a24' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/50/7d/40/sate-padang-ajo-ramon.jpg?w=500&h=-1&s=1',
            '83a6edab-3395-42c8-86da-79bc58b4614b' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/db/05/1d/blok-m-square.jpg?w=900&h=500&s=1',
            '689caa58-0830-4a48-884f-9f55cc958d52' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/4a/92/af/warung-bu-kris.jpg?w=500&h=-1&s=1',

            // ── Jakarta Pusat ─────────────────────────────────────────────
            '3a0b4d26-c649-4ee3-9977-dcf62c3bfcb4' => 'https://upload.wikimedia.org/wikipedia/commons/8/85/SCBD%2C_Jakarta.jpg',
            '3f5a0254-ffa9-4c6d-8e4d-e6f5ff75e8c7' => 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Asian_Games_2018_GBK_Stadium_10.jpg',
            'a95d267f-0a40-44cb-99ec-cb863ecc5e8d' => 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Taman_Suropati.JPG',
            'e144a67e-bd66-47ca-ac28-013e722e88d7' => 'https://awsimages.detik.net.id/community/media/visual/2021/07/21/sate-kambing_169.jpeg?w=1200',
            '46cc3dab-7c69-40dc-a787-3013d402d052' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/81/8b/68/tanah-abang-market.jpg?w=1200&h=-1&s=1',

            // ── Bogor ─────────────────────────────────────────────────────
            'd2493052-4da6-4c8d-9233-120295693734' => 'https://upload.wikimedia.org/wikipedia/commons/7/75/Kebun_Raya_Bogor_19.jpg',
            '268d99cc-12c5-49a1-bdf4-82f0c7d6cb11' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/db/e2/0b/roti-unyil-venus.jpg?w=900&h=500&s=1',
            'eaa192eb-f8a2-4588-b787-6c4fce2f85b0' => 'https://journeyofindonesia.com/wp-content/uploads/2023/06/Soto-Kuning-Pak-M-Yusuf-Nuhaa.jpg',

            // ── Bekasi ────────────────────────────────────────────────────
            'db4d4ed9-c9a6-4bec-b59d-20f2f67ea931' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/b3/a0/4d/img-20180714-175437-largejpg.jpg?w=1200&h=-1&s=1',
            '01a42831-db00-48ef-97c3-32b7323410ee' => 'https://cdn-strapi.prod.99iddev.net/assets/Daya_Tarik_Alun_Alun_Bekasi_754b4b4d3e.jpg',
            'c4b73a55-b6c7-4d7a-84a0-eda74e486c7c' => 'https://petualang.travelingyuk.com/uploads/2020/06/Soto-Betawi-Pak-Hasan-909-944x1024.jpg',

            // ── Depok ─────────────────────────────────────────────────────
            '516ec20e-c7e4-4069-8aee-49e1847cfe86' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Danau_Kenanga_Universitas_Indonesia.jpg/1280px-Danau_Kenanga_Universitas_Indonesia.jpg',
            '9bced9a5-7d89-4bf1-bf0e-c77f8f301080' => 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Depok_Town_Square_%28Detos%29_-_panoramio.jpg',
            'c7c1a585-fcb4-464b-9b9b-3bb92250daa9' => 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6ccd8cb8-f24e-4a49-988c-13c8315c402c_Go-Biz_20241223_123444.jpeg',

            // ── Tangerang ─────────────────────────────────────────────────
            'd2ec34b8-6c01-40c3-a910-5282778f9f69' => 'https://asset.kompas.com/crops/gjrbGNgm7RHLoM-wdS46zhJ3YK4=/0x0:3510x2340/1200x1200/data/photo/2023/01/14/63c2203063d31.jpg',
            '5fc5a0ce-5f3b-40f1-a628-8280ac44ffdc' => 'https://upload.wikimedia.org/wikipedia/commons/4/42/Benteng_Heritage_Museum_interior.jpg',
            '4419406e-a6e0-435a-9c86-3c7d36c41dd5' => 'https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2024/05/Oleh-Oleh-Khas-Tangerang.webp',
            '8ef0db78-70c2-4bc2-be73-b0a19dbe3324' => 'https://asset.kompas.com/crops/daXuN9o98DyqTXoJjQsznpd_gXU=/0x0:1000x667/750x500/data/photo/2022/07/24/62dcb82f1eedc.jpeg',

            // ── Tangerang Selatan ─────────────────────────────────────────
            '88267836-f4d9-4839-9ceb-725d729aa9df' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/c1/c9/e4/aeon-mall-bsd-city.jpg?w=1200&h=-1&s=1',
            '51ee76a9-d5c4-43f9-a6cd-748e95521ac4' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Situ_Gintung_2014.jpg/1280px-Situ_Gintung_2014.jpg',
            'f86920c2-890a-4c91-a3ac-4909b4a2940d' => 'https://cms.sinarmasland.com/uploads/Intermoda_BSD_City_45ed63930c.jpg',

            // ── Bandung ───────────────────────────────────────────────────
            '40fc4a2a-25b2-4688-b893-f6ebd52ac670' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f5/61/b6/kyotoku-floating-market.jpg?w=1200&h=-1&s=1',
            '703fa95a-3134-40cc-a159-b058b2c968cc' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/a2/82/14/batagor-kingsley.jpg?w=1100&h=1100&s=1',
            '6127e56e-6fd6-4ff5-8738-4be350e3cb53' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Gedung_Sate_Oktober_2024_-_Rahmatdenas.jpg/1280px-Gedung_Sate_Oktober_2024_-_Rahmatdenas.jpg',
            '3c3035e3-4487-4247-822c-701c059fd475' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/83/6e/e7/beautiful-batik-boutique.jpg?w=900&h=500&s=1',
            '291175d9-0948-4171-8942-b61f57ecdeaa' => 'https://travelspromo.com/wp-content/uploads/2020/01/08-Taman-Tegallega-Salpa.jpg',
            '7c1015f2-1318-4b5f-9d07-43160263d551' => 'https://www.sinergifoundation.org/sinergi/wp-content/uploads/2020/09/surabi-enhaii.jpg',
            '83d52dde-f107-4aea-bc87-171b3324d1df' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/b7/e2/21/img20180706181948-largejpg.jpg?w=1200&h=-1&s=1',
            '2331e742-4e86-4cc1-a5d0-b2d7f98fff5c' => 'https://www.harapanrakyat.com/wp-content/uploads/2021/02/18.-Mie-Kocok-Bandung-Legendaris-Citarasa-Khas-Berikut-Rekomendasinya.jpg',
            '3210ddcb-09bc-4a9e-9cfa-79e8aa14e54d' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/42/35/db/photo1jpg.jpg?w=1200&h=-1&s=1',
            '96d3edc0-cfc6-4d69-8789-854230b9595c' => 'https://cdn.antaranews.com/cache/1200x800/2023/02/12/IMG-20230212-WA0036.jpg.webp',

            // ── Bandung Barat ─────────────────────────────────────────────
            '26040f6e-7705-46aa-9e05-5fdbdca0c274' => 'https://awsimages.detik.net.id/community/media/visual/2022/08/13/wajah-baru-situ-ciburuy-bandung-barat_169.jpeg?w=600&q=90',
            '50abb417-296f-48e6-869f-34f52fd1fc18' => 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Citatah_Cliff_Sumit.jpg',
            'c1e92282-0f89-4752-9672-34dfad1ed441' => 'https://lovebandung.com/wp-content/uploads/2023/07/1688779378075.jpg',

            // ── Cimahi ────────────────────────────────────────────────────
            'd3349a65-3cfb-4212-b92c-d4ad5541174c' => 'https://img.antarafoto.com/cache/1200x800/2024/10/27/potensi-pariwisata-curug-pelangi-cimahi-1elgh-dom.jpg',
            'b5672ab0-2b51-4227-a51e-8a73c39b0cae' => 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Oncom.jpg',

            // ── Cianjur ───────────────────────────────────────────────────
            'e13bdf29-d91a-4635-8c89-8472142aaad5' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/fb/be/a5/taman-bunga-nusantara.jpg?w=1200&h=-1&s=1',
            '4e1ca6ea-a08e-40f3-a4ea-fc47d18eb115' => 'https://infocianjur.com/wp-content/uploads/2019/02/BERAS-PANDANWANGI.jpg',
            '1c7879c3-b325-4e6f-87f7-c80abc86b0cd' => 'https://cairofood.id/wp-content/uploads/sate-maranggi-cibungur-cairo-1067x800.jpg',

            // ── Sukabumi ──────────────────────────────────────────────────
            'fb3f5c8d-58de-4ca2-a1ab-15cf433d8d10' => 'https://upload.wikimedia.org/wikipedia/commons/5/53/Curug_Cimarinjung%2C_Geopark_Ciletuh%2C_Ciemas%2C_Sukabumi%2C_Jawa_Barat_0607201602.jpg',
            '38c91e66-e968-48a3-92e1-cd97e852193f' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Panorama_Pantai_Pelabuhan_Ratu_Sukabumi.jpg/1280px-Panorama_Pantai_Pelabuhan_Ratu_Sukabumi.jpg',
            'aea38fef-941e-41c0-8938-a37ac9c22d52' => 'https://static.vecteezy.com/system/resources/previews/008/199/253/large_2x/mochi-lampion-sukabumi-chewy-rice-cake-on-bamboo-packaging-photo.jpg',

            // ── Karawang ──────────────────────────────────────────────────
            '73e81b60-e0ef-410f-8669-9f9682e5238f' => 'https://asset.kompas.com/crops/0SktC9UOtaExDHwjVDzrvyVsFrk=/0x0:999x666/1200x1200/data/photo/2020/06/02/5ed637ccaed86.jpg',
            '684c8566-dc4c-4168-ab00-a4c16da7b526' => 'https://s3-ap-southeast-1.amazonaws.com/cntatr-assets-ap-southeast-1-250226768838-55a62c9399d4d8a6/2025/03/Makam-Syekh-Quro-1024x682.jpeg?tr=q-70,c-at_max,w-1000,h-600',
            '56f0f5a0-fdc2-4bf6-9bd6-3f1be39daf8d' => 'https://www.gotravelly.com/blog/wp-content/uploads/2022/07/opak-ketan.jpg',

            // ── Purwakarta ────────────────────────────────────────────────
            '090c5e9e-44d6-47d9-b697-1ce8344ff6cf' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Another_View_of_Jati_Luhur.jpg/1280px-Another_View_of_Jati_Luhur.jpg',
            '960c6329-854c-4776-bb18-0d8cbc99e41b' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/2a/c8/77/img-20190908-111224-largejpg.jpg?w=900&h=500&s=1',
            '2cadd279-36c7-446a-a150-65ca9a27593d' => 'https://www.djkn.kemenkeu.go.id/files/images/2022/06/vlcsnap-2022-06-29-08h41m20s183.png',

            // ── Indramayu ─────────────────────────────────────────────────
            'e047a47c-2834-465e-a5e0-9ddeb2b51576' => 'https://beritaindramayu.com/wp-content/uploads/2025/10/061025-Mangga-gedong-gincu.jpg',
            '36cf8920-4518-4e78-8a7e-501464dfa96e' => 'https://upload.wikimedia.org/wikipedia/commons/4/48/Karangsong_beach_in_Indramayu%2C_West_Java.jpg',

            // ── Ciamis ────────────────────────────────────────────────────
            '0bfa11c4-b22c-44e8-a2f8-0ea5bf99e038' => 'https://cdns.klimg.com/merdeka.com/i/w/news/2013/08/02/229961/540x270/melongok-jejak-kerajaan-galuh-purba-dan-legenda-ciung-wanara-survei-jalur-mudik-15.jpg',
            'fc3876e4-f462-4e88-992a-edba81b90b57' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Galendo.jpg/1280px-Galendo.jpg',

            // ── Subang ────────────────────────────────────────────────────
            '14ecc686-dafa-4b6d-9a8f-6975f62e5659' => 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhlllMfxQYl9rdTxZw3MRJ4-ZcI5x9pB6mFf0m901a9dY-471j8DA1dZCD8DeM8mJdFKBnp3G0QGIxJ6I0F-Vv3hnghtqI0kjaxuahcCLx04gducYzWEDwX1GW1uZr3XMnb9jf_aqg2f0/w1200-h630-p-k-no-nu/nanas+si+madu+subang+(2).jpg',
            'e1e045ee-abaf-4742-bff2-732dfb4f7e89' => 'https://awsimages.detik.net.id/api/wm/2022/07/25/sate-maranggi-tata-di-subang_169.jpeg?wid=54&w=1200&v=1&t=jpeg',

            // ── Garut ─────────────────────────────────────────────────────
            'f4647c65-cc54-46b9-af65-c3b750df6585' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ac/36/b0/kamojang-crater.jpg?w=1200&h=1200&s=1',
            '3ec7f6c2-514a-40e2-b9d5-12f51866fb13' => 'https://cf.shopee.co.id/file/ee6b3262a66738e94ffa6c4621eebc41',
            '0c70adb9-85ae-48b3-801a-71b1fd0ffdb2' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/9b/5d/c0/wisata-air-dan-resort.jpg?w=1200&h=-1&s=1',

            // ── Cirebon ───────────────────────────────────────────────────
            '395cf91d-cc74-488a-b8f6-1e72a39129f7' => 'https://www.batiqa.com/upload/news/l/cirebon-keraton-kasepuhan_46k7m.jpg',
            '9c3d4eb2-628d-4612-8a12-464ee5e3342b' => 'https://empalgentonghapud.shop/public/media/empalgentonghapud-shop/1.jpg',
            '4cc94f31-dd36-4d25-9a7a-fc95fa088bec' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/fa/a8/25/caption.jpg?w=1200&h=1200&s=1',
            'ed69e1fb-08b9-4fa1-ab5d-bc21be47d157' => 'https://upload.wikimedia.org/wikipedia/commons/9/90/Masjid_Panjunan_di_Cirebon%2C_Amerta_-_Berkala_Arkeologi_1%2C_hal._7.jpg',
            '74811cb6-c7d6-4efb-9031-d176d3c82cb0' => 'https://jejakpiknik.com/wp-content/uploads/2018/02/Informasi-Harga-Tiket-Masuk-Taman-Ade-Irma-Suryani-Cirebon-Waterland-630x380.jpg',
            'a07f75ea-6f5a-4471-9792-0d336ddedf3b' => 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Docang.jpg',
            '701e123f-8550-4c69-b936-80f905523a02' => 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Batik_Trusmi_Cirebon_%2823%29.jpg',

            // ── Tasikmalaya ───────────────────────────────────────────────
            '637dcb47-105e-42b9-b156-b7b93c230316' => 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Pembuat_payung_tasik.jpg',
            '7b047315-289a-438a-8655-75ae7d48be8a' => 'https://www.garnesia.com/images/vendor/5267_d8bf6c2518d02a55199d2112b933b0ad.jpg',
            '8590adc0-1edb-4a6e-8c51-b2a109bbd59c' => 'https://asset.kompas.com/crops/wnEcakCY2uxHBCIa-2-WjqL2GTo=/63x11:934x591/1200x675/data/photo/2020/08/18/5f3b8dbe49549.jpg',
            'ad185458-5356-43d8-831b-8be20278f423' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/2e/57/29/kolam-di-nini-anteh.jpg?w=500&h=-1&s=1',

            // ── Banjar ────────────────────────────────────────────────────
            '31a71448-402b-4dbb-918a-ed11f9e16bd8' => 'https://www.harapanrakyat.com/wp-content/uploads/2019/10/Alun-alun-Langensari-malam-hari-edit.jpg',
            '8d840f10-be27-46cf-aa36-ef1e22689caa' => 'https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Makassar/o/1745148140706-sate_maranggi/dyqltqpoitwpuvu.jpeg',
            '0937d262-868c-4e75-9680-11b456fcad5a' => 'https://img.antarafoto.com/cache/1200x800/2023/01/26/kerajinan-anyaman-rotan-1407c-dom.jpg',

            // ── Yogyakarta ────────────────────────────────────────────────
            '0cc25694-059a-4876-9caa-67ed36fc50cf' => 'https://upload.wikimedia.org/wikipedia/commons/6/69/Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_%282025%29_-_img_02.jpg',
            'aa7778c3-7114-4bb1-b53d-5ca671ff6e79' => 'https://upload.wikimedia.org/wikipedia/id/thumb/9/9a/Gudeg_Yu_Djum.jpg/1280px-Gudeg_Yu_Djum.jpg',
            'cab283fe-5191-4a6a-8d44-a631fd548878' => 'https://media-cdn.tripadvisor.com/media/photo-s/07/99/8e/7e/mirota-batik.jpg',
            'a49c0911-63d6-4e28-ac9a-0361991734fc' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tower_in_Taman_Sari%2C_2014-05-19.jpg/1280px-Tower_in_Taman_Sari%2C_2014-05-19.jpg',
            '910e8c02-33db-4dec-bf38-2406db04abc2' => 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Prambanan_Temple_Yogyakarta_Indonesia.jpg',
            '5045cd53-1c9d-4eec-bb73-a28a83c1606c' => 'https://assets.telkomsel.com/public/2024-12/Sate-Klathak-Pak-Pong-Kuliner-Legendaris-Yogyakarta.jpg',
            'a0bf02b8-75a5-4be0-9482-9f4fae952c59' => 'https://visitingjogja.jogjaprov.go.id/wp-content/uploads/2023/11/bakpia-25-1.jpg',
            '1a220305-2c45-42ed-897d-c1c650a83860' => 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Bringharjo_Market_Yogyakarta_-_Pasar_Bringharjo_Jogja_%282025%29_-_img_06.jpg',
            'b36ddd8a-dd21-4683-a211-e4631fa218ae' => 'https://eticon.co.id/wp-content/uploads/2022/07/Desa-wisata-Tembi-Jogja-sumber.jpg',
            '8b225b39-4928-43ac-90c5-eabffc73fbe2' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/3d/84/c1/img-20190907-203237-largejpg.jpg?w=900&h=-1&s=1',

            // ── Sleman ────────────────────────────────────────────────────
            'df167226-d5b2-4819-aea8-c9c89320694d' => 'https://upload.wikimedia.org/wikipedia/commons/4/48/Keraton_Ratu_Boko_2.jpg',
            '92cc84dc-d08b-423f-b39a-d6247db3976f' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/ce/06/d8/bale-raos.jpg?w=900&h=500&s=1',

            // ── Bantul ────────────────────────────────────────────────────
            'dc7da6ca-6db5-4d62-8d61-79e07bf2596f' => 'https://asset.kompas.com/crops/bLvlkxxPDoC4oRDfY0Vh6HkROTU=/0x0:739x493/1200x800/data/photo/2021/03/07/6044b67dc51f5.jpg',
            '5d24ef8d-8c10-4f0e-9873-f5f5ab511c92' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Gumuk_Pasir_Parangkusumo_2.jpg/330px-Gumuk_Pasir_Parangkusumo_2.jpg',
            '9f159d99-15cb-44c9-9ce2-fc6053b91f5b' => 'https://visitingjogja.jogjaprov.go.id/wp-content/uploads/2023/11/bakpia-25-1.jpg',

            // ── Klaten ────────────────────────────────────────────────────
            '6e3582e8-4de6-43f0-a1d5-9b9cc9d3c268' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Plaosan_Temple.jpg/1280px-Plaosan_Temple.jpg',
            '9a0f2829-a336-4fe9-9ba8-dc9a7fb25d6f' => 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Prambanan_Temple_Yogyakarta_Indonesia.jpg',
            'b0ea2773-222b-4284-8130-352ea91abd8f' => 'https://ik.trn.asia/uploads/2020/02/pak-marto-1.jpg',
            '79c299f9-bddd-4fae-a37a-8ef3d3f981d9' => 'https://fitinline.com/data/article/20131102/Batik%20Bayat%20Klaten%201.jpg',

            // ── Solo ──────────────────────────────────────────────────────
            '56d755af-d287-4ed2-9cbc-9453f2fd7638' => 'https://asset.kompas.com/crops/gls85oCrHSDR1vl5Huz3bDeb5H8=/0x0:1200x800/1200x800/data/photo/2024/12/04/674fc46fddfa7.jpg',
            'e56408a6-807f-4522-b88e-5c4b6bb57a64' => 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Pasar_Klewer_Solo.jpg',
            '9bdede3b-5161-41d1-bbcf-0653501c21eb' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/e6/5f/22/sate-buntel-pak-h-kasdi.jpg?w=700&h=400&s=1',
            '3db955a7-fa74-4881-b7ed-4df70e87b79b' => 'https://selatviens.co.id/data/foto_berita/front.jpg',
            'd8dda968-7863-4e30-a8b1-d4733504d548' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/3f/58/49/museum-batik-danar-hadi.jpg?w=900&h=500&s=1',
            'e7a9be4d-8482-4080-8bdc-d9fd05eaa921' => 'https://upload.wikimedia.org/wikipedia/commons/6/61/Pasar_Gede_Harjonagoro.jpg',
            'cd281187-51c2-415f-9ec2-f1313bef4c5f' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Grand_Pendopo%2C_Mangkunegaran_Palace.jpg/960px-Grand_Pendopo%2C_Mangkunegaran_Palace.jpg',
            'fa158d36-838a-4ae8-973e-5dff1d8a8986' => 'https://goodindonesianfood.com/file/2016/05/solo-classic-nasi-liwet-bu-wongso-lemu-1024x683.jpg',

            // ── Sukoharjo ─────────────────────────────────────────────────
            '9b1474cd-f6d8-43bf-8304-072b75013239' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/46/a3/f4/photogrid-1556119620140.jpg?w=900&h=500&s=1',
            '55eacf99-93b5-4260-be37-9d5f5f8f576e' => 'https://static.republika.co.id/uploads/images/inpicture_slide/012990200-1703572218-830-556.jpg',

            // ── Karanganyar ───────────────────────────────────────────────
            '69a13800-07bd-472a-b9ec-0bb3cd39b41d' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/1d/9b/1f/candi-cetho.jpg?w=1200&h=-1&s=1',
            '8a88b24a-2a53-40ed-b4d3-5e2e7954874f' => 'https://awsimages.detik.net.id/community/media/visual/2023/08/07/kebun-teh-kemuning-1_169.jpeg?w=1200',
            'c348b7aa-d084-4578-848f-265ac48ddcf5' => 'https://visitjawatengah.jatengprov.go.id/assets/images/990f915f-73d9-4e8e-a2d3-3eda0307de7e.jpg',

            // ── Sragen ────────────────────────────────────────────────────
            '46417620-23ff-413d-bb02-460d441b0195' => 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Museum_Purbakala_Sangiran_1.JPG',

            // ── Wonogiri ──────────────────────────────────────────────────
            '3f5d800c-0aec-4e26-8e56-d12770bb89a1' => 'https://upload.wikimedia.org/wikipedia/commons/5/59/Gajah_Mungkur_dam.jpg',
            '347dd1ab-49b2-4524-90d5-fc5dd70332bb' => 'https://marleneonthemove.com/wp-content/uploads/2017/09/goagong-6-1-scaled.jpg.webp',

            // ── Semarang ──────────────────────────────────────────────────
            '70059178-094d-43a6-9b92-89ad9b0eebf9' => 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Lawang_sewu_semarang.jpg',
            '849baeeb-f8a7-43d2-90df-11a3ce0c2355' => 'https://awsimages.detik.net.id/community/media/visual/2023/11/30/kota-lama-semarang_169.jpeg?w=1200',
            'fe5e4d5e-9595-4909-8e92-d27e8d47c5ce' => 'https://phinemo.com/wp-content/uploads/2018/03/Gulai-Kambing-Pak-Sabar-Semarang-1024x1024.jpg',
            '2bb5101e-47c8-459b-bf41-5a44c1bfe937' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Sam_Po_Kong_Temple_Semarang_Indonesia.jpg/1280px-Sam_Po_Kong_Temple_Semarang_Indonesia.jpg',
            '4258dd46-821d-49e7-99d3-a84464618f33' => 'https://static.republika.co.id/uploads/images/xlarge/masjid-agung-jawa-tengah-majt-di-semarang-jateng-foto_230415134338-560.jpg',
            '5d9def48-7589-4cc3-8262-334a67b23dd7' => 'https://asset.kompas.com/crops/MG-Mkx0c0RIAssO8B0MrK_hBonQ=/0x0:0x0/1200x900/data/photo/2022/09/09/631b186871610.jpg',
            'b7a1c9a4-29b8-4f04-acda-b1eaee5ce841' => 'https://s3.us-east-1.wasabisys.com/agendaindonesia/2022/10/Nasi-koyor-kota-lama-Semarang-shutterstock.jpeg',
            '743ab32d-8b86-4191-a95f-329edc8909d1' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/7f/be/ff/fasad-depan.jpg?w=1200&h=-1&s=1',

            // ── Tegal ─────────────────────────────────────────────────────
            '49b36232-e3bd-4ab0-b22b-278cdf7f67aa' => 'https://static.republika.co.id/uploads/images/headline_slide/sejumlah-warga-berada-di-ruang-publik-taman-pancasila-tegal_211028121513-755.jpg',
            '581599bb-4e74-48b6-954c-cc86ee65d963' => 'https://imgcdn.espos.id/@espos/images/2023/04/Kupat-Glabed-Khas-Tegal.jpg',
            'e30da87f-41ff-4fa0-bdca-5e522a84078f' => 'https://cdn.antaranews.com/cache/1200x800/2019/04/28/perajin-batik-tulis-tegalan-pqo14b-prv.jpg',
            '8246994b-b455-442d-b364-1dd1d8224154' => 'https://visitjawatengah.jatengprov.go.id/assets/images/116410c9-d101-4d83-90af-0cc334a5e293.jpeg',

            // ── Pekalongan ────────────────────────────────────────────────
            '11de17b2-e630-4abe-bbe0-80e7e18431ec' => 'https://upload.wikimedia.org/wikipedia/commons/7/73/Pekalongan_Batik_Museum%2C_Central_Java.jpg',
            '264905a6-bdf9-4a8c-ab21-adf48ec6b0b0' => 'https://awsimages.detik.net.id/api/wm/2022/05/07/suasana-pasar-batik-setono-kota-pekalongan-sabtu-752022-1_169.jpeg?wid=60&w=1200&v=1&t=jpeg',
            '615da8de-510c-42f5-82c8-23fbca48bd21' => 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Nasi_megono.JPG',
            '2e6b4b97-abd3-4503-9361-6c533cd7a72a' => 'https://visitjawatengah.jatengprov.go.id/assets/images/fe361522-9427-41d7-994a-4de382cb1a45.jpg',

            // ── Demak ─────────────────────────────────────────────────────
            'eee33ad3-eb6a-4f22-b736-3b07a6b07bad' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/cf/8b/f6/makam-sunan-kalijaga.jpg?w=1200&h=-1&s=1',
            'b427f877-d740-4c71-8550-98a3c5a64940' => 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Masjid_demak.jpg',
            '4c6de010-53d1-4797-8816-cccf1ce00657' => 'https://awsimages.detik.net.id/community/media/visual/2020/11/11/bandeng-presto-2.jpeg?w=2848',

            // ── Grobogan ──────────────────────────────────────────────────
            '03780c70-e2c4-40ba-bfe2-a0078015cec4' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bledug_Kuwu_2.jpg/250px-Bledug_Kuwu_2.jpg',
            '744296c8-b6be-462f-912f-2f7f4df4c0a3' => 'https://visitjawatengah.jatengprov.go.id/assets/images/mrapen-eternal-fire.jpg',

            // ── Blora ─────────────────────────────────────────────────────
            '6ed28dfc-b760-4bd6-880c-703079486aec' => 'https://awsimages.detik.net.id/community/media/visual/2024/03/31/jati-denok-di-wilayah-hutan-desa-jatisari-kecamatan-banjarejo-kabupaten-blora-jumat-2932024-3_43.jpeg?w=1200',
            'da4bc976-7d10-4889-b932-2a4485d3f318' => 'https://upload.wikimedia.org/wikipedia/commons/9/93/Sate_Blora.jpg',

            // ── Boyolali ──────────────────────────────────────────────────
            '35d1f01d-6078-40fa-8182-5647b9462e7b' => 'https://asset.kompas.com/crops/HukxYzetvo71f5SEDCQAie8bE0o=/0x0:1200x800/750x500/data/photo/2020/08/21/5f3fdc5a6c81d.jpg',
            'ce66e40d-266b-4735-adbd-9b60600ef122' => 'https://imgcdn.espos.id/@espos/images/2022/09/rsz_16_ikon_boyolali.jpg?width=500&height=300&quality=60',

            // ── Batang ────────────────────────────────────────────────────
            '66a33e5c-36e3-423f-952e-a9d73751b83c' => 'https://visitjawatengah.jatengprov.go.id/assets/images/35efa156-a62e-4c4c-b1ed-4b862f490e761.jpg',
            'd5d05ef0-fbe0-4c2c-926e-396fb25e1acc' => 'https://hypeabis.id/assets/content/batik_202502260537271740523047.jpg',

            // ── Brebes ────────────────────────────────────────────────────
            '28f34dc1-160d-45f5-8811-c6942dde7b16' => 'https://awsimages.detik.net.id/api/wm/2022/12/14/telur-asin_169.jpeg?wid=60&w=1200&v=1&t=jpeg',
            '37f1bb18-2b1e-4534-bfc3-514c5f7ccec8' => 'https://img.antarafoto.com/cache/1200x772/2020/12/19/harga-bawang-merah-di-brebes-turun-s718-dom.jpg',

            // ── Pemalang ──────────────────────────────────────────────────
            '1bdc32b5-b9ab-4614-9630-e70ca8214c5a' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Senja_di_Pantai_Widuri.jpg/1280px-Senja_di_Pantai_Widuri.jpg',
            'a088df13-f81d-4fc9-bac7-4c2e919cfe0e' => 'https://visitjawatengah.jatengprov.go.id/assets/images/8a3e6511-50fc-4fb4-8ed4-33bcba535218.jpg',

            // ── Kendal ────────────────────────────────────────────────────
            '07d86ee0-fc29-412d-8cd5-3625dd2bdf9b' => 'https://img.antarafoto.com/cache/1200x746/2017/08/01/wisata-pantai-ngebum-kendal-fdv9-dom.webp',
            'bfc281d0-d714-4aaa-8610-bdd32de44f2b' => 'https://cdn.antarafoto.com/cache/1200x798/2008/11/02/klengkeng-10kn-dom.jpg',

            // ── Kebumen ───────────────────────────────────────────────────
            '760af25e-9f7d-4d3d-86b9-0c32eccb6636' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Fort_van_der_Wijck_-_Entrance.JPG/1280px-Fort_van_der_Wijck_-_Entrance.JPG',
            'ec462fa9-c9f8-409a-9de2-4986b0c74fb4' => 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Lanting_makanan_khas_kebumen.webp',
            'c7488638-7663-4a6a-9dc5-8ac9e8b9e8eb' => 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Pantai_Karang_Bolong_di_Kabupaten_Kebumen_Indonesia.jpg',

            // ── Purworejo ─────────────────────────────────────────────────
            '1fbb0999-0fca-4ab8-a7c5-5098fa406d9b' => 'https://www.gotravelly.com/blog/wp-content/uploads/2023/10/pantai-ketawang.jpg',
            '9c7e95d1-0f35-4a68-ba42-3ae619545aac' => 'https://imgcdn.espos.id/@espos/images/2023/03/Kue-Clorot-Khas-Purworejo.jpg',

            // ── Banyumas ──────────────────────────────────────────────────
            '9bc7c2ce-9b85-4c17-82a3-9abb8a76f9c1' => 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Baturraden_overview_from_ridge%2C_Purwokerto%2C_2015-03-23.jpg',
            '02f97a12-6ca3-4ee6-a349-16c55a1ef073' => 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Getuk_goreng_Sokaraja.jpg',
            'fc624e78-bb5f-4757-9491-e1cb7e9ea45f' => 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mendoan.jpg',

            // ── Purwokerto ────────────────────────────────────────────────
            'be932753-84a8-464b-a176-d9a03ed43a6f' => 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Baturraden_overview_from_ridge%2C_Purwokerto%2C_2015-03-23.jpg',
            '359798be-af8e-4b1c-962b-af85d99fcf39' => 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/a64ba7a9-fa24-4884-bacc-7f5d42204b24_Go-Biz_20210308_080021.jpeg',
            'd2b863f3-df78-4e43-b480-817b86dbf9e4' => 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Andhang_pangrenan.jpg',
            '75e56ac6-3b90-410b-9d43-2627de3dc3ad' => 'https://cdn.idntimes.com/content-images/community/2021/11/fromandroid-90684dabe82dc996721afa6c03d58c74.jpg',

            // ── Cilacap ───────────────────────────────────────────────────
            '1b4757e2-fc62-4b71-aa98-9bcb9bd94c0e' => 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Entrance%2C_Benteng_Pendem%2C_Cilacap_2015-03-21.jpg',
            '4dd8fda1-676b-4f8e-b69b-a168d70177bb' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dock%2C_Teluk_Penyu_Beach%2C_Cilacap_2015-03-21.jpg/1280px-Dock%2C_Teluk_Penyu_Beach%2C_Cilacap_2015-03-21.jpg',

            // ── Kulon Progo ───────────────────────────────────────────────
            '82130024-e299-499d-b660-021d498b8b57' => 'https://upload.wikimedia.org/wikipedia/commons/d/db/Glagah_Beach_Kulon_Progo.jpg',
            'fe61d41b-573d-4f97-8baf-fe5f9f80a3b0' => 'https://awsimages.detik.net.id/community/media/visual/2021/12/17/puncak-saka-kulon-progo-yogyakarta-3_169.jpeg?w=1200',
            '8bf0a18c-bcb5-4cfa-a1ba-d19fb9fcd7b7' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/27._Gebl%C3%A8k_1.jpg/1280px-27._Gebl%C3%A8k_1.jpg',

            // ── Serang ────────────────────────────────────────────────────
            '7603881e-9919-43bf-98b7-18e1959515b6' => 'https://www.indonesia.travel/contentassets/8012a18b4b784e889f3d2c700448b454/museum-situs-kepurbakalaan-banten-lama.jpg',
            '5f581304-0f06-40fe-ba37-def60c8c25ae' => 'https://upload.wikimedia.org/wikipedia/commons/6/69/Masjid_agung_banten_lama.jpg',
            'f60c575e-c68a-4d93-9a1d-8cfe4343ec43' => 'https://foodnesia.net/wp-content/uploads/2020/01/rabeg-khas-banten.jpg',

            // ── Cilegon ───────────────────────────────────────────────────
            'c2ac5d84-ae1d-4ac7-9069-bda3093d551a' => 'https://cilegonhills.id/wp-content/uploads/2020/12/Pantai-Anyer-1140px-x-740px.jpg',

            // ── Lebak ─────────────────────────────────────────────────────
            '2d5f7c96-674a-4c3e-98cb-34a7942538a0' => 'https://upload.wikimedia.org/wikipedia/commons/5/59/Rumah_Tradisional_Warga_Baduy_Luar_1.jpg',
            'eb737fc2-db30-4349-b8a1-9856d11e608b' => 'https://asset.kompas.com/crops/WdrhcO-sj8MXd2VWc2igZ5G0QBg=/0x0:1776x1184/750x500/data/photo/2019/10/23/5daffd05be159.jpg',

            // ── Surabaya ──────────────────────────────────────────────────
            '6a638c2f-c3eb-4062-aaec-6bcbf752b8e2' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/House_of_Sampoerna_Mei_2015.jpg/1280px-House_of_Sampoerna_Mei_2015.jpg',
            '2d5168db-08d0-4e03-bb2d-292c7526d8de' => 'https://i0.wp.com/www.lintasnusa.id/wp-content/uploads/2021/03/Rawon-Setan-Surabaya-Mbak-Endang-e1507470900676.jpg?fit=800%2C470&ssl=1',
            '4934627e-be19-4fd1-97a8-178fad6032fd' => 'https://petualang.travelingyuk.com/uploads/2017/05/Lontong-Balap-Pak-Gendut-Surabaya-1024x1024.jpg',
            '97c17086-8609-415c-b7f6-5a924227388d' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/ab/86/c8/taman-bungkul.jpg?w=1200&h=-1&s=1',
            'cf8acc69-e144-4294-86e7-329c5ad0ece2' => 'https://unair.ac.id/wp-content/uploads/2025/01/Kampung-Wisata-Peneleh-Heritage_Pesona-Sejarah-di-Surabaya.png',
            'b062aaad-1d48-474e-88f7-b35dd66775fe' => 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tugu_Pahlawan_Surabaya.jpg',
            '4fd4335b-331d-491a-9595-075ce2fb609c' => 'https://wisato.id/wp-content/uploads/2021/08/Soto-Ayam-Lamongan-Cak-HAR-4-768x432.jpg',
            'e4236820-170d-4964-9e72-9974fc510ec3' => 'https://goodindonesianfood.com/file/2016/05/surabaya-heritage-rujak-cingur-ahmad-jais1-1170x780.jpg',
            'aed95ce8-bdc2-466b-abdb-c9e541e43846' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/54/92/15/caption.jpg?w=1200&h=-1&s=1',
            'cb3aa303-b57a-480a-aa5e-b28ecb4a3f82' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Jembatan_Merah_Surabaya.JPG/960px-Jembatan_Merah_Surabaya.JPG',

            // ── Malang ────────────────────────────────────────────────────
            '146d5871-a969-4820-97a4-c5ea37aee815' => 'https://malangkota.go.id/wp-content/uploads/2025/08/Alun-Alun-Merdeka-Kota-Malang.jpeg',
            '8eb01ea1-cc49-4030-bd5f-5ad199b3239c' => 'https://malangkota.go.id/wp-content/uploads/2021/04/rawon2-1.jpeg',
            '78a32119-8982-4931-92fd-c3ccdfd54610' => 'https://nahwatravel.co.id/wp-content/uploads/2023/05/Malang-Strudel-1024x873.jpeg',
            '289bad47-8eb2-418f-967a-23b0b57fc71b' => 'https://itin-dev.wanderlogstatic.com/freeImage/OyUVayqyJ9nx2xdYrMZ3zXDSOSuL7Vw5',
            'f2b2c3e7-432e-46eb-84ad-ff4de95edd64' => 'https://tugumalang.id/wp-content/uploads/2022/01/ijen.jpg',

            // ── Jember ────────────────────────────────────────────────────
            '579bdb2e-0970-4620-8367-827af5203543' => 'https://ik.imagekit.io/tvlk/blog/2025/06/Sekilas-Tentang-Alun-Alun-Jember.jpg?tr=q-70,c-at_max,w-1000,h-600',
            '4a93a1e7-caae-4297-ac33-2f41fb33342f' => 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrXq09FoESeJuiinvxU4IGYK5L0uesHMMosFBPiRbHwU-1bLHtWWOTCLdp79gCAAqmMkV14ykYir9qtGpBGxGcclv8ACHszzHCZ6J-3dTaPgisBlqaDVO4AYhKlxTDHo6yUW3knCRd4dpLMFYqP-FVayTwr5pvSA0cdzsB0YQ5f-dn_jTv6ibVj4U85ErO/s3780/IMG_8853.JPG',
            '6a1c74b2-824f-41cf-b5d5-2c02727fdcd5' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Suwar-suwir_Sari_Rasa.jpg/1280px-Suwar-suwir_Sari_Rasa.jpg',
            '132dbd83-2439-4046-8b6a-10ee1441e9a4' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/fd/a8/c2/20190620-101204-largejpg.jpg?w=900&h=500&s=1',

            // ── Banyuwangi ────────────────────────────────────────────────
            'c259aa76-f5eb-47e2-9f33-fc57c1d02ae2' => 'https://assets.promediateknologi.id/crop/0x0:0x0/1200x0/webp/photo/2023/05/31/sego-tempong-banyuwangi-71710067.jpg',
            '7dc5ae8e-250c-4e2c-a649-4b46f1545804' => 'https://asset.kompas.com/crops/NwUxznt2nYwzDRPdEBOpXkkIUj4=/39x0:573x356/750x500/data/photo/2019/07/19/5d317cc27b36e.jpeg',
            '99641c82-f4a9-4646-8cbe-79a9a99f9dfc' => 'https://metaranews.co/wp-content/uploads/2024/10/batik-gajah-oling.jpg',
            '9783c08a-cdb4-4369-ab4c-80ae10d5e2d6' => 'https://travelspromo.com/wp-content/uploads/2024/09/Suasana-Pantai-Boom-Banyuwangi-640x480.jpg',

            // ── Blitar ────────────────────────────────────────────────────
            'e311afda-21cb-49a1-91b2-217d5c076d8a' => 'https://asset.kompas.com/crops/MmVyWwNwt_wv0A0JMgLe3fRqH_A=/0x2:1024x684/1200x900/data/photo/2023/05/14/64606982782dc.jpeg',
            '17255d84-5fce-4246-9ccd-73b2c0461749' => 'https://upload.wikimedia.org/wikipedia/commons/1/13/Candi_Penataran.jpg',
            'b89cdcd9-31d1-47bb-87c3-9c029c785fe0' => 'https://awsimages.detik.net.id/community/media/visual/2023/06/11/petik-buah-belimbing-di-agrowisata-karangsari-kota-blitar-1_169.jpeg?w=650&q=90',
            '64db9a32-0919-4d8d-b1fb-c27330d2d184' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pecel_Hariadhi.JPG/1280px-Pecel_Hariadhi.JPG',

            // ── Kediri ────────────────────────────────────────────────────
            'bfb976da-45fa-4133-b0b5-272f2afb8f97' => 'https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2022/09/08/1636026740.jpg',
            'a9ec1c83-7b66-456f-82dd-25dd96f5ff32' => 'https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Surabaya/f/1758694678537-Gambar_Tahu_Kuning_Khas_Kediri_1/y0heoq7l5g3sv54.jpeg',
            '19b12fd4-a835-441d-9d91-d7eb2180fea5' => 'https://upload.wikimedia.org/wikipedia/id/c/c1/Monumen_Simpang_Lima_Gumul.jpg',
            '5306e3a7-6e09-4f99-8490-fecd53facd3e' => 'https://assets.promediateknologi.id/crop/0x0:0x0/1200x0/webp/photo/2023/02/06/1282199188.jpeg',

            // ── Madiun ────────────────────────────────────────────────────
            'eb92aa41-2c81-4326-af9b-bfd5265f41fb' => 'https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/chicken-&-other-poultry-dishes/pecel-madiun/main-header.jpg',
            '96b4c5e1-4727-41c6-8103-547a23cbcba0' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Monumen_Kresek_Madiun.jpg/1280px-Monumen_Kresek_Madiun.jpg',
            '9d03d0b3-ff26-459f-b6c9-117afc220c4e' => 'https://cdn.restaurants-us.com/sateayamponorogopaksibun2madiun/85010-albums-2.jpg',
            '12387e53-5d86-4fb6-b0f7-2bc3811aef13' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Telaga_Sarangan_dan_Gunung_Lawu_-_Maret_2026.jpg/1280px-Telaga_Sarangan_dan_Gunung_Lawu_-_Maret_2026.jpg',
            '10aa87bb-b8b6-4706-8934-63d7f9beae6b' => 'https://cdn.antaranews.com/cache/1200x800/2021/05/08/kulit-sawo.jpg',

            // ── Magetan ───────────────────────────────────────────────────
            'fe36437d-5743-4bb6-9b61-560a07f9154a' => 'https://www.sepatukulitmagetan.net/upload/post/tepo-tahu-khas-magetan.jpg',
            '5f0618ae-19ef-43c5-a16c-1b066dfd9edc' => 'https://cdn.antaranews.com/cache/1200x800/2026/03/19/sandal-kulit-magetan.jpeg',

            // ── Ngawi ─────────────────────────────────────────────────────
            'ed6d4e58-7cca-4acf-8551-aa80fbe88659' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Benteng_van_den_bosch.jpg/250px-Benteng_van_den_bosch.jpg',
            '6b2c43cf-f166-4da7-91c0-be27308e90b6' => 'https://upload.wikimedia.org/wikipedia/commons/4/43/Museum_trinil.jpg',
            '2f21bacc-a385-4e69-bffa-df8d4ff6cc14' => 'https://bisnisukm.com/uploads/2021/02/usaha-tahu-tepo-kuliner-khas-ngawi-yang-gampang-bikinnya-720x414.png',

            // ── Nganjuk ───────────────────────────────────────────────────
            '3d730a8a-320b-4ef6-94ea-7347dd7affe9' => 'https://www.indonesia-tourism.com/east-java/tourism/nganjuk/images/sedudo.jpg',
            '5449aa2d-0c1a-4198-b1f0-88ddff26814e' => 'https://cdn.antaranews.com/cache/1200x800/2019/08/19/2.jpg',

            // ── Lamongan ──────────────────────────────────────────────────
            '63f627d1-acbb-4f6a-950d-45dd6652359e' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/fc/8f/09/wisata-bahari-lamongan.jpg?w=800&h=-1&s=1',
            '4e0f60bd-b6fe-4f34-b3dd-df3ac897a12f' => 'https://7terbaik.com/wp-content/uploads/2018/10/Soto-Lamongan-Cak-Har-1024x683.jpg',
            '8ca3ec1b-7626-45a1-987f-75d1099c2d40' => 'https://cdn0-production-images-kly.akamaized.net/_QqaNbAJmt8_QFdF5LFJgw0UxFw=/500x281/kly-media-production/medias/3911576/original/001955400_1642842581-shutterstock_2058946475.jpg',

            // ── Bojonegoro ────────────────────────────────────────────────
            'e2f9e7ce-2e29-4923-9798-02f274d756ee' => 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Kayangan_Api_Bojonegoro1.jpg',
            '54db1ddc-471b-4144-90e2-372be98752c2' => 'https://forumradiobojonegoro.com/wp-content/uploads/2016/12/20161231_133537.jpg',

            // ── Jombang ───────────────────────────────────────────────────
            'c2812447-9d9a-4ef8-89a0-7e4d029bd996' => 'https://tebuireng.online/wp-content/uploads/2020/08/tebuireng-jombang-2.jpg',
            '8a2540ce-0584-46aa-80ca-50896abd3532' => 'https://travelspromo.com/wp-content/uploads/2023/07/duran-duren-wonosalam-jombang-1200x900.jpg',

            // ── Mojokerto ─────────────────────────────────────────────────
            '568fa31e-da3e-4c4c-a499-3e176999ef05' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Eksotika_Candi_Bajang_Ratu.jpg/1280px-Eksotika_Candi_Bajang_Ratu.jpg',
            'dacf683e-1b29-424f-a561-a0144d5dc191' => 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Airlangga.jpg',
            '4dcfc84a-acca-4bc9-982c-33b261a19d46' => 'https://assets-a1.kompasiana.com/items/album/2025/01/22/onde-onde-6791082fed64156701588f02.jpg',

            // ── Sidoarjo ──────────────────────────────────────────────────
            'acc096b5-0577-4dd0-94a4-8fef14d6aac7' => 'https://asset.kompas.com/crops/d_DIsLl2CxVloq7eJ5In5Zjjcsk=/0x0:0x0/1200x675/data/photo/2026/03/25/69c311ea61fa3.jpg',
            'bb9a8667-d0fa-40c3-af8d-2b20a16471da' => 'https://upload.wikimedia.org/wikipedia/commons/1/17/Candi_Pari_1.jpg',
            'be1cd839-e159-4797-838e-de0dd7fa1840' => 'https://img-global.cpcdn.com/recipes/6233dbf18183b9c8/1200x630cq80/photo.jpg',

            // ── Gresik ────────────────────────────────────────────────────
            'd6c2463d-a374-4796-9fc7-adc6559431ec' => 'https://www.nativeindonesia.com/foto/2023/07/makam-sunan-giri-gresik.jpg',
            '475ed900-4ae8-432f-a146-2e4cf6bc26f6' => 'https://i0.wp.com/elrajab.com/wp-content/uploads/2018/08/makanan-khas-gresik-otak-otak-bandeng.jpg?w=667&ssl=1',
            '463ef4ed-a13e-4d1d-b844-8ee04a11e79b' => 'https://asset.kompas.com/crops/qMYwr4qVDsGbgfBE-Atcp3OqnIE=/0x0:0x0/1200x1200/data/photo/2020/07/29/5f2184312791a.jpg',

            // ── Pasuruan ──────────────────────────────────────────────────
            '047bbd87-124a-410f-9a31-44f7558e58b5' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Taman_Safari_Prigen%2C_Jawa_Timur.jpg/1280px-Taman_Safari_Prigen%2C_Jawa_Timur.jpg',
            'bcbb9c49-7379-43d9-8627-421afa2528d6' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/fe/7a/1a/kakek-bodo-legendary.jpg?w=1200&h=1200&s=1',
            '21bff95d-7253-480b-955d-0a1aae3f0123' => 'https://awsimages.detik.net.id/content/2011/07/04/482/bandengasapcvr.jpg?w=650',

            // ── Probolinggo ───────────────────────────────────────────────
            'ad003cb4-323d-4217-ba11-fe1f1f1a177a' => 'https://asset.kompas.com/crops/PmlMqU_I4pi_yvGUtmQ1PT5Z9IM=/0x0:1800x1200/1200x800/data/photo/2021/05/10/6099375e04acb.jpg',
            'ac27e0d9-0186-41e8-a741-34a98eb7c8a9' => 'https://upload.wikimedia.org/wikipedia/commons/3/32/Pemandangan_wisata_Pantai_Bentar_Probolinggo.png',
            '5b2f859c-e257-478b-a069-c54860b62267' => 'https://asset.kompas.com/crops/IFKb2xEzIXZDAmWYG9VjLw0IFFI=/0x0:1000x667/1200x800/data/photo/2022/06/18/62ad543a532ab.jpg',

            // ── Lumajang ──────────────────────────────────────────────────
            '7907ee67-dc8e-4d28-b69c-acfef73019bf' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Air_Terjun_Tumpak_Sewu.jpg/960px-Air_Terjun_Tumpak_Sewu.jpg',
            '0d975499-e437-4db6-9068-0dadbdbadb62' => 'https://foodnesia.net/wp-content/uploads/2019/11/pisang-agung-lumajang.jpg',

            // ── Tulungagung ───────────────────────────────────────────────
            '3efac27d-923d-4ec5-bdd9-2fe650ba3daf' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/97/cf/1f/pantai-popoh-tulungagung.jpg?w=700&h=400&s=1',
            '3c2f9a12-d31e-4b2d-8b96-1efacab3e6ef' => 'https://www.indonesia-tourism.com/east-java/tourism/tulungagung/images/marble-1.jpg',
            'f4206d2d-6c7f-4c93-843b-c432a5f9ab88' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Ayam_Lodho_Khas_Tulungagung.jpg/960px-Ayam_Lodho_Khas_Tulungagung.jpg',
        ];

        $updated = 0;

        foreach ($fotos as $id => $foto) {
            $rows = Destinasi::where('id', $id)->update(['foto' => $foto]);
            $updated += $rows;
        }

        $this->command->info("Updated foto for {$updated} destinasi.");
    }
}

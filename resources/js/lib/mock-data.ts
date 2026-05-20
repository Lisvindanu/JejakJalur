import type { Destinasi, Kota, PaginatedData, Stasiun, Ulasan } from '@/types';

export const MOCK_KOTA: Kota[] = [
    {
        id: '1',
        nama: 'Jakarta',
        kode_ibukota: 'JKT',
        stasiun: [
            { id: '1', nama: 'Gambir', kode_stasiun: 'GMR' },
            { id: '2', nama: 'Pasar Senen', kode_stasiun: 'PSE' },
            { id: '3', nama: 'Tanah Abang', kode_stasiun: 'TNH' },
            { id: '4', nama: 'Jatinegara', kode_stasiun: 'JNG' },
            { id: '5', nama: 'Manggarai', kode_stasiun: 'MRI' },
        ],
    },
    {
        id: '2',
        nama: 'Bandung',
        kode_ibukota: 'BDG',
        stasiun: [
            { id: '6', nama: 'Bandung', kode_stasiun: 'BD' },
            { id: '7', nama: 'Kiaracondong', kode_stasiun: 'KAC' },
            { id: '8', nama: 'Cimahi', kode_stasiun: 'CMI' },
        ],
    },
    {
        id: '3',
        nama: 'Yogyakarta',
        kode_ibukota: 'YOG',
        stasiun: [
            { id: '9', nama: 'Tugu', kode_stasiun: 'YK' },
            { id: '10', nama: 'Lempuyangan', kode_stasiun: 'LPN' },
        ],
    },
    {
        id: '4',
        nama: 'Surabaya',
        kode_ibukota: 'SBY',
        stasiun: [
            { id: '11', nama: 'Gubeng', kode_stasiun: 'SGU' },
            { id: '12', nama: 'Pasar Turi', kode_stasiun: 'SBI' },
            { id: '13', nama: 'Wonokromo', kode_stasiun: 'WO' },
        ],
    },
    {
        id: '5',
        nama: 'Semarang',
        kode_ibukota: 'SMG',
        stasiun: [
            { id: '14', nama: 'Tawang', kode_stasiun: 'TW' },
            { id: '15', nama: 'Poncol', kode_stasiun: 'SMC' },
        ],
    },
    {
        id: '6',
        nama: 'Solo',
        kode_ibukota: 'SLO',
        stasiun: [
            { id: '16', nama: 'Solo Balapan', kode_stasiun: 'SLO' },
            { id: '17', nama: 'Purwosari', kode_stasiun: 'PWS' },
            { id: '18', nama: 'Solo Jebres', kode_stasiun: 'SK' },
        ],
    },
    {
        id: '7',
        nama: 'Malang',
        kode_ibukota: 'MLG',
        stasiun: [
            { id: '19', nama: 'Malang', kode_stasiun: 'ML' },
            { id: '20', nama: 'Malang Kotalama', kode_stasiun: 'MLK' },
        ],
    },
    {
        id: '8',
        nama: 'Bogor',
        kode_ibukota: 'BGR',
        stasiun: [
            { id: '21', nama: 'Bogor', kode_stasiun: 'BOO' },
            { id: '22', nama: 'Cilebut', kode_stasiun: 'CLB' },
        ],
    },
    {
        id: '9',
        nama: 'Cirebon',
        kode_ibukota: 'CBN',
        stasiun: [
            { id: '23', nama: 'Cirebon', kode_stasiun: 'CN' },
            { id: '24', nama: 'Prujakan', kode_stasiun: 'CNP' },
        ],
    },
    {
        id: '10',
        nama: 'Purwokerto',
        kode_ibukota: 'PWT',
        stasiun: [{ id: '25', nama: 'Purwokerto', kode_stasiun: 'PWT' }],
    },
];

export const MOCK_STASIUN: Stasiun[] = MOCK_KOTA.flatMap((k) =>
    k.stasiun.map((s) => ({ ...s, kota: k })),
);

export const MOCK_DESTINASI: Destinasi[] = [
    {
        id: '1',
        nama: 'Keraton Kasunanan Surakarta',
        deskripsi:
            'Pusat kebudayaan Jawa yang megah di jantung kota Solo. Dibangun pada abad ke-18, keraton ini menyimpan koleksi artefak bersejarah dan budaya Jawa yang tak ternilai. Pengunjung dapat menyaksikan pertunjukan seni tradisional dan menjelajahi museum keraton.',
        alamat: 'Jl. Sidikoro, Baluwarti, Solo',
        kategori: 'Wisata',
        rating: '4.7',
        foto: null,
        is_verified: true,
        stasiun: {
            id: '16',
            nama: 'Solo Balapan',
            kota: { id: '6', nama: 'Solo' },
        },
    },
    {
        id: '2',
        nama: 'Nasi Gudeg Yu Djum Wijilan',
        deskripsi:
            'Gudeg legendaris khas Yogyakarta yang sudah berdiri sejak 1950. Berlokasi di Gang Wijilan dekat Keraton, warung ini menyajikan gudeg nangka muda yang manis dengan opor ayam dan sambal krecek.',
        alamat: 'Jl. Wijilan No. 167, Yogyakarta',
        kategori: 'Kuliner',
        rating: '4.9',
        foto: null,
        is_verified: false,
        stasiun: {
            id: '9',
            nama: 'Tugu',
            kota: { id: '3', nama: 'Yogyakarta' },
        },
    },
    {
        id: '3',
        nama: 'Kawah Putih Ciwidey',
        deskripsi:
            'Danau vulkanik berwarna putih kehijauan yang memukau di ketinggian 2.194 mdpl. Dikelilingi kabut dan hutan pinus, kawah ini menawarkan pemandangan alam yang spektakuler dan udara yang sejuk.',
        alamat: 'Ciwidey, Kabupaten Bandung',
        kategori: 'Wisata',
        rating: '4.5',
        foto: null,
        is_verified: true,
        stasiun: {
            id: '7',
            nama: 'Kiaracondong',
            kota: { id: '2', nama: 'Bandung' },
        },
    },
    {
        id: '4',
        nama: 'Pasar Beringharjo Yogyakarta',
        deskripsi:
            'Pasar tradisional ikonik yang sudah beroperasi sejak era Mataram Islam. Pusat perbelanjaan batik, kerajinan tangan, dan oleh-oleh khas Yogyakarta dengan harga terjangkau.',
        alamat: 'Jl. Margo Mulyo No.16, Yogyakarta',
        kategori: 'UMKM',
        rating: '4.6',
        foto: null,
        is_verified: false,
        stasiun: {
            id: '9',
            nama: 'Tugu',
            kota: { id: '3', nama: 'Yogyakarta' },
        },
    },
    {
        id: '5',
        nama: 'Soto Bangkong Semarang',
        deskripsi:
            'Soto sapi legendaris khas Semarang yang sudah berdiri sejak tahun 1950. Kuah bening yang gurih dengan potongan daging sapi empuk menjadi daya tarik utama warung ini yang selalu ramai pengunjung.',
        alamat: 'Jl. Brigjen Katamso No.1, Semarang',
        kategori: 'Kuliner',
        rating: '4.8',
        foto: null,
        is_verified: true,
        stasiun: {
            id: '14',
            nama: 'Tawang',
            kota: { id: '5', nama: 'Semarang' },
        },
    },
    {
        id: '6',
        nama: 'Masjid Agung Cirebon',
        deskripsi:
            'Masjid bersejarah dengan arsitektur khas Cirebon yang memadukan elemen Islam, Hindu, dan Tiongkok. Salah satu peninggalan Kesultanan Cirebon yang masih terjaga keasliannya.',
        alamat: 'Jl. Kasepuhan, Cirebon',
        kategori: 'Wisata',
        rating: '4.4',
        foto: null,
        is_verified: false,
        stasiun: {
            id: '24',
            nama: 'Prujakan',
            kota: { id: '9', nama: 'Cirebon' },
        },
    },
    {
        id: '7',
        nama: 'Taman Sari Water Castle',
        deskripsi:
            'Bekas taman kerajaan Sultanat Yogyakarta yang dibangun pada 1758. Kompleks ini terdiri dari kolam pemandian, terowongan bawah tanah, dan menara pengintai yang memiliki nilai sejarah tinggi.',
        alamat: 'Jl. Taman, Yogyakarta',
        kategori: 'Wisata',
        rating: '4.6',
        foto: null,
        is_verified: true,
        stasiun: {
            id: '9',
            nama: 'Tugu',
            kota: { id: '3', nama: 'Yogyakarta' },
        },
    },
    {
        id: '8',
        nama: 'Sate Klathak Pak Pong',
        deskripsi:
            'Sate kambing khas Bantul yang dimasak menggunakan jeruji besi sepeda, menghasilkan tekstur daging yang unik dan gurih. Salah satu kuliner legendaris yang wajib dicoba saat di Yogyakarta.',
        alamat: 'Jl. Imogiri Timur, Bantul, Yogyakarta',
        kategori: 'Kuliner',
        rating: '4.8',
        foto: null,
        is_verified: true,
        stasiun: {
            id: '10',
            nama: 'Lempuyangan',
            kota: { id: '3', nama: 'Yogyakarta' },
        },
    },
    {
        id: '9',
        nama: 'Batik Danar Hadi Solo',
        deskripsi:
            'Museum sekaligus pusat penjualan batik tulis dan cap terkemuka di Solo. Koleksi batiknya mencapai ribuan lembar kain dengan motif dari berbagai daerah di Indonesia.',
        alamat: 'Jl. Slamet Riyadi No.261, Solo',
        kategori: 'UMKM',
        rating: '4.5',
        foto: null,
        is_verified: true,
        stasiun: {
            id: '16',
            nama: 'Solo Balapan',
            kota: { id: '6', nama: 'Solo' },
        },
    },
    {
        id: '10',
        nama: 'Rawon Nguling Surabaya',
        deskripsi:
            'Rawon legendaris khas Surabaya dengan kuah hitam pekat dari kluwek yang kaya rempah. Daging sapinya empuk dan bumbu rempahnya meresap sempurna.',
        alamat: 'Jl. Embong Malang, Surabaya',
        kategori: 'Kuliner',
        rating: '4.7',
        foto: null,
        is_verified: false,
        stasiun: {
            id: '11',
            nama: 'Gubeng',
            kota: { id: '4', nama: 'Surabaya' },
        },
    },
    {
        id: '11',
        nama: 'Candi Prambanan',
        deskripsi:
            'Kompleks candi Hindu terbesar di Indonesia dan Asia Tenggara, dibangun pada abad ke-9. Terdiri dari 240 candi dengan pertunjukan Sendratari Ramayana yang memukau.',
        alamat: 'Prambanan, Sleman, Yogyakarta',
        kategori: 'Wisata',
        rating: '4.8',
        foto: null,
        is_verified: true,
        stasiun: {
            id: '10',
            nama: 'Lempuyangan',
            kota: { id: '3', nama: 'Yogyakarta' },
        },
    },
    {
        id: '12',
        nama: 'Mie Koclok Cirebon',
        deskripsi:
            'Kuliner khas Cirebon berupa mie dengan kuah santan yang kental dan gurih, disajikan bersama ayam suwir, telur rebus, dan tauge. Makanan malam yang sangat populer di kalangan warga lokal.',
        alamat: 'Jl. Siliwangi, Cirebon',
        kategori: 'Kuliner',
        rating: '4.5',
        foto: null,
        is_verified: false,
        stasiun: {
            id: '23',
            nama: 'Cirebon',
            kota: { id: '9', nama: 'Cirebon' },
        },
    },
];

export const MOCK_ULASAN: Ulasan[] = [
    {
        id: '1',
        rating: 5,
        konten:
            'Tempatnya luar biasa! Sangat bersih dan terawat. Staff ramah dan informatif. Wajib dikunjungi kalau ke Solo.',
        created_at: '2026-03-15T10:00:00Z',
        updated_at: '2026-03-15T10:00:00Z',
        user: { id: 1, name: 'Budi Santoso', avatar: null },
    },
    {
        id: '2',
        rating: 4,
        konten:
            'Bagus banget tempatnya. Sedikit ramai di akhir pekan tapi masih sangat menikmati kunjungan. Tiket masuk terjangkau.',
        created_at: '2026-03-10T14:00:00Z',
        updated_at: '2026-03-10T14:00:00Z',
        user: { id: 2, name: 'Sari Dewi', avatar: null },
    },
    {
        id: '3',
        rating: 5,
        konten:
            'Pengalaman yang tak terlupakan! Pemandu wisatanya sangat berpengetahuan dan ramah. Sangat rekomendasikan.',
        created_at: '2026-02-28T09:00:00Z',
        updated_at: '2026-02-28T09:00:00Z',
        user: { id: 3, name: 'Agung Pratama', avatar: null },
    },
];

export const MOCK_STATISTIK = {
    jumlah_kota: 10,
    jumlah_stasiun: 26,
    jumlah_destinasi: 12,
    destinasi_verified: 7,
    jumlah_pengguna: 48,
};

export const MOCK_PENGGUNA = {
    id: 1,
    name: 'Budi Santoso',
    email: 'budi@example.com',
    avatar: null as string | null,
    created_at: '2026-01-01T00:00:00Z',
};

export function mockPaginate<T>(data: T[]): PaginatedData<T> {
    return {
        data,
        current_page: 1,
        last_page: 1,
        per_page: data.length,
        total: data.length,
        from: data.length > 0 ? 1 : null,
        to: data.length > 0 ? data.length : null,
        links: [],
    };
}

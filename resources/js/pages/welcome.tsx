import { Head } from '@inertiajs/react';
import FeaturedDestinasi from '@/components/fragments/Home/FeaturedDestinasi';
import HeroSection from '@/components/fragments/Home/HeroSection';
import KotaSection from '@/components/fragments/Home/KotaSection';
import PublicLayout from '@/components/layouts/PublicLayout';
import type { Destinasi, Kota } from '@/types';

/* ─── Mock data (fallback when API returns empty) ─── */
const MOCK_DESTINASI: Destinasi[] = [
    {
        id: '1',
        nama: 'Keraton Kasunanan Surakarta',
        deskripsi: 'Pusat kebudayaan Jawa di kota Solo.',
        alamat: 'Solo',
        kategori: 'Wisata',
        rating: '4.7',
        foto: null,
        is_verified: true,
        stasiun: { nama: 'Solo Balapan', kota: { nama: 'Solo' } },
    },
    {
        id: '2',
        nama: 'Nasi Gudeg Yu Djum Wijilan',
        deskripsi: 'Gudeg legendaris khas Yogyakarta.',
        alamat: 'Yogyakarta',
        kategori: 'Kuliner',
        rating: '4.9',
        foto: null,
        is_verified: false,
        stasiun: { nama: 'Tugu', kota: { nama: 'Yogyakarta' } },
    },
    {
        id: '3',
        nama: 'Kawah Putih Ciwidey',
        deskripsi: 'Danau vulkanik berwarna putih kehijauan.',
        alamat: 'Bandung',
        kategori: 'Wisata',
        rating: '4.5',
        foto: null,
        is_verified: true,
        stasiun: { nama: 'Kiaracondong', kota: { nama: 'Bandung' } },
    },
    {
        id: '4',
        nama: 'Pasar Beringharjo Yogyakarta',
        deskripsi: 'Pasar tradisional ikonik sejak era Mataram.',
        alamat: 'Yogyakarta',
        kategori: 'UMKM',
        rating: '4.6',
        foto: null,
        is_verified: false,
        stasiun: { nama: 'Tugu', kota: { nama: 'Yogyakarta' } },
    },
    {
        id: '5',
        nama: 'Soto Bangkong Semarang',
        deskripsi: 'Soto legendaris sejak 1950 di Semarang.',
        alamat: 'Semarang',
        kategori: 'Kuliner',
        rating: '4.8',
        foto: null,
        is_verified: true,
        stasiun: { nama: 'Tawang', kota: { nama: 'Semarang' } },
    },
    {
        id: '6',
        nama: 'Masjid Agung Cirebon',
        deskripsi: 'Masjid bersejarah dengan arsitektur khas Cirebon.',
        alamat: 'Cirebon',
        kategori: 'Wisata',
        rating: '4.4',
        foto: null,
        is_verified: false,
        stasiun: { nama: 'Prujakan', kota: { nama: 'Cirebon' } },
    },
];

const MOCK_KOTA: Kota[] = [
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
            { id: '14', nama: 'Semut', kode_stasiun: 'SMT' },
        ],
    },
    {
        id: '5',
        nama: 'Semarang',
        kode_ibukota: 'SMG',
        stasiun: [
            { id: '15', nama: 'Tawang', kode_stasiun: 'TW' },
            { id: '16', nama: 'Poncol', kode_stasiun: 'SMC' },
        ],
    },
    {
        id: '6',
        nama: 'Solo',
        kode_ibukota: 'SLO',
        stasiun: [
            { id: '17', nama: 'Solo Balapan', kode_stasiun: 'SLO' },
            { id: '18', nama: 'Purwosari', kode_stasiun: 'PWS' },
            { id: '19', nama: 'Solo Jebres', kode_stasiun: 'SK' },
        ],
    },
    {
        id: '7',
        nama: 'Cirebon',
        kode_ibukota: 'CBN',
        stasiun: [
            { id: '20', nama: 'Cirebon', kode_stasiun: 'CN' },
            { id: '21', nama: 'Prujakan', kode_stasiun: 'CNP' },
        ],
    },
    {
        id: '8',
        nama: 'Purwokerto',
        kode_ibukota: 'PWT',
        stasiun: [{ id: '22', nama: 'Purwokerto', kode_stasiun: 'PWT' }],
    },
];

const PRIORITY_CITIES = [
    'Jakarta',
    'Bandung',
    'Yogyakarta',
    'Surabaya',
    'Malang',
    'Semarang',
    'Solo',
    'Bogor',
    'Bekasi',
    'Depok',
    'Medan',
    'Palembang',
    'Cirebon',
    'Purwokerto',
];

interface Props {
    destinasiFeatured: Destinasi[];
    semuaKota: Kota[];
}

export default function Welcome({ destinasiFeatured, semuaKota }: Props) {
    const featured =
        destinasiFeatured.length > 0 ? destinasiFeatured : MOCK_DESTINASI;

    const kota = (semuaKota.length > 0 ? semuaKota : MOCK_KOTA)
        .slice()
        .sort((a, b) => {
            const pa = PRIORITY_CITIES.findIndex((n) =>
                a.nama.toLowerCase().includes(n.toLowerCase()),
            );
            const pb = PRIORITY_CITIES.findIndex((n) =>
                b.nama.toLowerCase().includes(n.toLowerCase()),
            );
            if (pa !== -1 && pb !== -1) return pa - pb;
            if (pa !== -1) return -1;
            if (pb !== -1) return 1;
            return b.stasiun.length - a.stasiun.length;
        });

    return (
        <PublicLayout transparentNav>
            <Head title="Temukan Permata Tersembunyi di Jalur Kereta" />
            <HeroSection destinations={featured} />
            <KotaSection kota={kota} />
            <FeaturedDestinasi destinasi={featured} />
        </PublicLayout>
    );
}

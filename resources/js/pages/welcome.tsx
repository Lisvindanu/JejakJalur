import { Head } from '@inertiajs/react';
import BaruSection from '@/components/fragments/Home/BaruSection';
import FeaturedDestinasi from '@/components/fragments/Home/FeaturedDestinasi';
import HeroSection from '@/components/fragments/Home/HeroSection';
import KotaSection from '@/components/fragments/Home/KotaSection';
import PopulerSection from '@/components/fragments/Home/PopulerSection';
import TopReviewerSection from '@/components/fragments/Home/TopReviewerSection';
import PublicLayout from '@/components/layouts/PublicLayout';
import { MOCK_DESTINASI, MOCK_KOTA } from '@/lib/mock-data';
import type { Destinasi, Kota } from '@/types';

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

interface Reviewer {
    id: string;
    name: string;
    avatar?: string | null;
    jumlah_ulasan: number;
    rata_rating: string | number;
}

interface Props {
    destinasiFeatured?: Destinasi[];
    semuaKota?: Kota[];
    destinasiPopuler?: Destinasi[];
    destinasiBaru?: Destinasi[];
    topReviewer?: Reviewer[];
}

export default function Welcome({ destinasiFeatured, semuaKota, destinasiPopuler = [], destinasiBaru = [], topReviewer = [] }: Props) {
    const featured =
        destinasiFeatured && destinasiFeatured.length > 0
            ? destinasiFeatured
            : MOCK_DESTINASI;

    const kota = (semuaKota && semuaKota.length > 0 ? semuaKota : MOCK_KOTA)
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
            <PopulerSection destinasi={destinasiPopuler} />
            <BaruSection destinasi={destinasiBaru} />
            <TopReviewerSection reviewers={topReviewer} />
            <FeaturedDestinasi destinasi={featured} />
        </PublicLayout>
    );
}

import { Head } from '@inertiajs/react';
import FeaturedDestinasi from '@/components/fragments/Home/FeaturedDestinasi';
import HeroSection from '@/components/fragments/Home/HeroSection';
import KotaSection from '@/components/fragments/Home/KotaSection';
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

interface Props {
    destinasiFeatured?: Destinasi[];
    semuaKota?: Kota[];
}

export default function Welcome({ destinasiFeatured, semuaKota }: Props) {
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
            <FeaturedDestinasi destinasi={featured} />
        </PublicLayout>
    );
}

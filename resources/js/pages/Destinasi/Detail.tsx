import { Head, Link, usePage } from '@inertiajs/react';
import DestinasiDetail from '@/components/fragments/Destinasi/DestinasiDetail';
import LokasiPanel from '@/components/fragments/Destinasi/LokasiPanel';
import UlasanForm from '@/components/fragments/Ulasan/UlasanForm';
import UlasanList from '@/components/fragments/Ulasan/UlasanList';
import PublicLayout from '@/components/layouts/PublicLayout';
import { MOCK_DESTINASI, MOCK_ULASAN } from '@/lib/mock-data';
import type { Destinasi, SharedProps } from '@/types';

interface Props {
    destinasi?: Destinasi;
}

export default function Detail({ destinasi: dest }: Props) {
    const destinasi: Destinasi = dest ?? {
        ...MOCK_DESTINASI[0],
        ulasan: MOCK_ULASAN,
    };
    const { auth } = usePage<SharedProps>().props;

    return (
        <PublicLayout>
            <Head title={`${destinasi.nama} — JejakJalur`} />

            {/* Detail view (contains its own px padding for content, but not the image) */}
            <div className="pt-[60px]">
                <DestinasiDetail destinasi={destinasi} />
            </div>

            {/* Lokasi & Akses */}
            <div className="px-[max(24px,calc(50%-576px))] pb-6">
                <LokasiPanel destinasi={destinasi} />
            </div>

            {/* Ulasan section */}
            <div className="px-[max(24px,calc(50%-576px))] py-8">
                {/* Write review or login prompt */}
                {auth?.user ? (
                    <div className="mb-10">
                        <h2 className="mb-4 text-lg font-semibold text-stone-800">
                            Tulis Ulasan
                        </h2>
                        <div className="rounded-xl border border-stone-100 bg-white p-5">
                            <UlasanForm destinasiId={destinasi.id} />
                        </div>
                    </div>
                ) : (
                    <div className="mb-10 rounded-xl border border-stone-100 bg-stone-50 p-5 text-center">
                        <p className="mb-2 text-sm text-stone-600">
                            Ingin berbagi pengalamanmu?
                        </p>
                        <Link
                            href="/masuk"
                            className="text-sm font-medium text-emerald-700 no-underline transition-colors hover:text-emerald-800"
                        >
                            Masuk untuk memberi ulasan
                        </Link>
                    </div>
                )}

                {/* Ulasan list */}
                <UlasanList
                    ulasan={destinasi.ulasan ?? []}
                    currentUserId={auth?.user?.id}
                    destinasiId={destinasi.id}
                />
            </div>
        </PublicLayout>
    );
}

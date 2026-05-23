import { Head, Link, usePage } from '@inertiajs/react';
import BookmarkButton from '@/components/elements/BookmarkButton';
import VisitButton from '@/components/elements/VisitButton';
import DestinasiCard from '@/components/fragments/Destinasi/DestinasiCard';
import DestinasiDetail from '@/components/fragments/Destinasi/DestinasiDetail';
import LokasiPanel from '@/components/fragments/Destinasi/LokasiPanel';
import UlasanForm from '@/components/fragments/Ulasan/UlasanForm';
import UlasanList from '@/components/fragments/Ulasan/UlasanList';
import PublicLayout from '@/components/layouts/PublicLayout';
import { MOCK_DESTINASI, MOCK_ULASAN } from '@/lib/mock-data';
import type { Destinasi, SharedProps } from '@/types';

interface Props {
    destinasi?: Destinasi;
    is_bookmarked?: boolean;
    is_visited?: boolean;
    destinasi_terkait?: Destinasi[];
    liked_ulasan_ids?: string[];
}

export default function Detail({
    destinasi: dest,
    is_bookmarked = false,
    is_visited = false,
    destinasi_terkait = [],
    liked_ulasan_ids = [],
}: Props) {
    const destinasi: Destinasi = dest ?? {
        ...MOCK_DESTINASI[0],
        ulasan: MOCK_ULASAN,
    };
    const { auth } = usePage<SharedProps>().props;

    return (
        <PublicLayout>
            <Head title={`${destinasi.nama} — JejakJalur`} />

            <div className="pt-[60px]">
                <DestinasiDetail destinasi={destinasi} />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 px-[max(24px,calc(50%-576px))] pb-2">
                {auth?.user && (
                    <>
                        <BookmarkButton
                            destinasiId={destinasi.id}
                            isBookmarked={is_bookmarked}
                        />
                        <VisitButton
                            destinasiId={destinasi.id}
                            isVisited={is_visited}
                        />
                    </>
                )}
            </div>

            {/* Lokasi & Akses */}
            <div className="px-[max(24px,calc(50%-576px))] pb-6">
                <LokasiPanel destinasi={destinasi} />
            </div>

            {/* Ulasan section */}
            <div className="px-[max(24px,calc(50%-576px))] py-8">
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

                <UlasanList
                    ulasan={destinasi.ulasan ?? []}
                    currentUserId={auth?.user?.id}
                    destinasiId={destinasi.id}
                    likedIds={liked_ulasan_ids}
                />
            </div>
            {/* Destinasi terkait */}
            {destinasi_terkait.length > 0 && (
                <div className="border-t border-stone-100 px-[max(24px,calc(50%-576px))] py-10">
                    <h2 className="mb-5 text-base font-semibold text-stone-800">
                        Destinasi Lain di Stasiun {destinasi.stasiun.nama}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {destinasi_terkait.map((d) => (
                            <DestinasiCard key={d.id} destinasi={d} />
                        ))}
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

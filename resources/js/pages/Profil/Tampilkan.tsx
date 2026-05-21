import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    IconBookmark,
    IconBookmarkFilled,
    IconLayoutDashboard,
    IconLoader2,
    IconMapPin,
    IconMountain,
    IconPencil,
    IconShoppingBag,
    IconStar,
    IconToolsKitchen2,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal';
import Pagination from '@/components/elements/Pagination';
import RatingDisplay from '@/components/elements/Rating';
import PublicLayout from '@/components/layouts/PublicLayout';
import { useConfirm } from '@/hooks/useConfirm';
import { formatTanggal } from '@/lib/utils';
import { MOCK_PENGGUNA } from '@/lib/mock-data';
import * as BookmarkController from '@/actions/App/Http/Controllers/BookmarkController';
import type {
    BookmarkProfil,
    PaginatedData,
    SharedProps,
    UlasanProfil,
} from '@/types';

interface Pengguna {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    created_at: string;
    is_admin?: boolean;
}

interface Props {
    pengguna?: Pengguna;
    jumlah_ulasan?: number;
    rata_rata_rating?: number | null;
    jumlah_destinasi_diulas?: number;
    ulasan?: PaginatedData<UlasanProfil>;
    bookmarks?: PaginatedData<BookmarkProfil>;
}

function StatItem({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                {icon}
            </span>
            <div>
                <div className="text-xl font-bold text-stone-900 tabular-nums">
                    {value}
                </div>
                <div className="text-xs text-stone-500">{label}</div>
            </div>
        </div>
    );
}

function kategoriPlaceholder(kategori: string) {
    if (kategori === 'Kuliner') {
        return {
            gradient: 'from-amber-100 to-amber-200',
            icon: <IconToolsKitchen2 size={28} className="text-black/20" />,
        };
    }
    if (kategori === 'UMKM') {
        return {
            gradient: 'from-indigo-100 to-indigo-200',
            icon: <IconShoppingBag size={28} className="text-black/20" />,
        };
    }
    return {
        gradient: 'from-emerald-100 to-emerald-200',
        icon: <IconMountain size={28} className="text-black/20" />,
    };
}

function WishlistCard({ bookmark }: { bookmark: BookmarkProfil }) {
    const [removing, setRemoving] = useState(false);
    const { destinasi } = bookmark;
    const ph = kategoriPlaceholder(destinasi.kategori);

    function hapus() {
        setRemoving(true);
        const action = BookmarkController.hapus({ destinasi: destinasi.id });
        router.visit(action.url, {
            method: action.method,
            preserveScroll: true,
            onFinish: () => setRemoving(false),
        });
    }

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-stone-100 bg-white transition-shadow hover:shadow-md">
            <Link href={`/destinasi/${destinasi.id}`} className="no-underline">
                <div
                    className={`flex h-32 items-center justify-center bg-gradient-to-br ${ph.gradient}`}
                >
                    {destinasi.foto_url ? (
                        <img
                            src={destinasi.foto_url}
                            alt={destinasi.nama}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        ph.icon
                    )}
                </div>
            </Link>

            <div className="flex flex-1 flex-col gap-1 p-3">
                <Link
                    href={`/destinasi/${destinasi.id}`}
                    className="line-clamp-2 text-sm font-medium text-stone-800 no-underline hover:text-emerald-700"
                >
                    {destinasi.nama}
                </Link>
                <div className="flex items-center justify-between">
                    <RatingDisplay value={Number(destinasi.rating)} size={13} />
                    <button
                        onClick={hapus}
                        disabled={removing}
                        title="Hapus dari wishlist"
                        className="text-stone-400 transition-colors hover:text-red-500 disabled:opacity-50"
                    >
                        {removing ? (
                            <IconLoader2 size={15} className="animate-spin" />
                        ) : (
                            <IconBookmarkFilled size={15} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function UlasanCard({ ulasan }: { ulasan: UlasanProfil }) {
    const ph = kategoriPlaceholder(ulasan.destinasi.kategori);

    return (
        <div className="flex gap-4 rounded-xl border border-stone-100 bg-white p-4">
            <Link
                href={`/destinasi/${ulasan.destinasi.id}`}
                className="shrink-0 no-underline"
            >
                <div
                    className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${ph.gradient}`}
                >
                    {ulasan.destinasi.foto_url ? (
                        <img
                            src={ulasan.destinasi.foto_url}
                            alt={ulasan.destinasi.nama}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        ph.icon
                    )}
                </div>
            </Link>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-1">
                    <Link
                        href={`/destinasi/${ulasan.destinasi.id}`}
                        className="text-sm font-medium text-stone-800 no-underline hover:text-emerald-700"
                    >
                        {ulasan.destinasi.nama}
                    </Link>
                    <span className="text-xs text-stone-400">
                        {formatTanggal(ulasan.created_at)}
                    </span>
                </div>
                <RatingDisplay
                    value={ulasan.rating}
                    size={13}
                    className="mt-1"
                />
                {ulasan.judul && (
                    <p className="mt-1 text-xs font-medium text-stone-700">
                        {ulasan.judul}
                    </p>
                )}
                <p className="mt-0.5 line-clamp-2 text-xs text-stone-500">
                    {ulasan.konten}
                </p>
            </div>
        </div>
    );
}

export default function Tampilkan({
    pengguna: penggunaProp,
    jumlah_ulasan = 0,
    rata_rata_rating = null,
    jumlah_destinasi_diulas = 0,
    ulasan,
    bookmarks,
}: Props) {
    const emptyUlasan: PaginatedData<UlasanProfil> = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 5,
        total: 0,
        from: null,
        to: null,
        links: [],
    };
    const emptyBookmarks: PaginatedData<BookmarkProfil> = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 8,
        total: 0,
        from: null,
        to: null,
        links: [],
    };
    const ulasanData = ulasan ?? emptyUlasan;
    const bookmarksData = bookmarks ?? emptyBookmarks;
    const pengguna = penggunaProp ?? MOCK_PENGGUNA;
    const { auth } = usePage<SharedProps>().props;
    const isAdmin = pengguna.is_admin ?? auth?.user?.is_admin ?? false;

    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    function handleDelete() {
        confirm(() => {
            router.delete('/profil');
        });
    }

    return (
        <PublicLayout>
            <Head title="Profil — JejakJalur" />

            <div className="px-4 pt-24 pb-16 sm:px-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Main profile card */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                            <Avatar
                                name={pengguna.name}
                                src={pengguna.avatar}
                                size="lg"
                                className="h-16 w-16 shrink-0 text-xl"
                            />
                            <div className="min-w-0 flex-1">
                                <h1 className="text-2xl font-bold text-stone-900">
                                    {pengguna.name}
                                </h1>
                                <p className="mt-0.5 text-sm text-stone-500">
                                    {pengguna.email}
                                </p>
                                <p className="mt-0.5 text-xs text-stone-400">
                                    Bergabung sejak{' '}
                                    {formatTanggal(pengguna.created_at)}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Link
                                        href="/profil/edit"
                                        className="no-underline"
                                    >
                                        <Button
                                            variant="outline"
                                            leftIcon={<IconPencil size={15} />}
                                        >
                                            Edit Profil
                                        </Button>
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            href="/admin"
                                            className="no-underline"
                                        >
                                            <Button
                                                variant="secondary"
                                                leftIcon={
                                                    <IconLayoutDashboard
                                                        size={15}
                                                    />
                                                }
                                            >
                                                Admin Panel
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-stone-100 pt-6 sm:grid-cols-3">
                            <StatItem
                                icon={<IconPencil size={18} />}
                                value={jumlah_ulasan}
                                label="Ulasan ditulis"
                            />
                            <StatItem
                                icon={<IconStar size={18} />}
                                value={
                                    rata_rata_rating != null
                                        ? Number(rata_rata_rating).toFixed(1)
                                        : '—'
                                }
                                label="Rata-rata rating"
                            />
                            <StatItem
                                icon={<IconMapPin size={18} />}
                                value={jumlah_destinasi_diulas}
                                label="Destinasi diulas"
                            />
                        </div>
                    </div>

                    {/* Wishlist */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                        <div className="mb-4 flex items-center gap-2">
                            <IconBookmark
                                size={18}
                                className="text-amber-600"
                            />
                            <h2 className="font-semibold text-stone-800">
                                Wishlist Destinasi
                            </h2>
                            {bookmarksData.total > 0 && (
                                <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                                    {bookmarksData.total}
                                </span>
                            )}
                        </div>

                        {bookmarksData.total === 0 ? (
                            <div className="rounded-xl border border-dashed border-stone-200 py-10 text-center">
                                <IconBookmark
                                    size={32}
                                    className="mx-auto mb-2 text-stone-300"
                                />
                                <p className="text-sm text-stone-400">
                                    Belum ada destinasi yang disimpan.
                                </p>
                                <Link
                                    href="/destinasi"
                                    className="mt-2 inline-block text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800"
                                >
                                    Jelajahi destinasi
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                    {bookmarksData.data.map((b) => (
                                        <WishlistCard key={b.id} bookmark={b} />
                                    ))}
                                </div>
                                {bookmarksData.last_page > 1 && (
                                    <div className="mt-4 border-t border-stone-100 pt-4">
                                        <Pagination data={bookmarksData} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Riwayat Ulasan */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                        <div className="mb-4 flex items-center gap-2">
                            <IconPencil
                                size={18}
                                className="text-emerald-700"
                            />
                            <h2 className="font-semibold text-stone-800">
                                Riwayat Ulasan
                            </h2>
                            {ulasanData.total > 0 && (
                                <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                                    {ulasanData.total}
                                </span>
                            )}
                        </div>

                        {ulasanData.total === 0 ? (
                            <div className="rounded-xl border border-dashed border-stone-200 py-10 text-center">
                                <IconPencil
                                    size={32}
                                    className="mx-auto mb-2 text-stone-300"
                                />
                                <p className="text-sm text-stone-400">
                                    Belum ada ulasan yang ditulis.
                                </p>
                                <Link
                                    href="/destinasi"
                                    className="mt-2 inline-block text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800"
                                >
                                    Temukan destinasi untuk diulas
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3">
                                    {ulasanData.data.map((u) => (
                                        <UlasanCard key={u.id} ulasan={u} />
                                    ))}
                                </div>
                                {ulasanData.last_page > 1 && (
                                    <div className="mt-4 border-t border-stone-100 pt-4">
                                        <Pagination data={ulasanData} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Danger zone */}
                    <div className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8">
                        <h3 className="font-semibold text-red-700">
                            Zona Bahaya
                        </h3>
                        <p className="mt-1 text-sm text-stone-600">
                            Tindakan ini tidak dapat dibatalkan. Semua ulasan
                            dan data akun akan dihapus permanen.
                        </p>
                        <Button
                            variant="danger"
                            className="mt-4"
                            leftIcon={<IconTrash size={15} />}
                            onClick={handleDelete}
                        >
                            Hapus Akun Saya
                        </Button>
                    </div>
                </div>
            </div>

            <Modal
                open={isOpen}
                onClose={handleCancel}
                title="Hapus Akun"
                size="sm"
                footer={
                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={handleCancel}>
                            Batal
                        </Button>
                        <Button variant="danger" onClick={handleConfirm}>
                            Ya, Hapus
                        </Button>
                    </div>
                }
            >
                <p className="text-sm text-stone-600">
                    Apakah kamu yakin ingin menghapus akun? Tindakan ini tidak
                    dapat dibatalkan dan semua data akunmu akan dihapus
                    permanen.
                </p>
            </Modal>
        </PublicLayout>
    );
}

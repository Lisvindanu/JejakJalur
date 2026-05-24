import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    IconBookmark,
    IconBookmarkFilled,
    IconCalendarPlus,
    IconCheck,
    IconFlame,
    IconLayoutDashboard,
    IconLoader2,
    IconMapPin,
    IconMountain,
    IconPencil,
    IconRoute,
    IconShoppingBag,
    IconSparkles,
    IconStar,
    IconToolsKitchen2,
    IconTrash,
    IconX,
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
    KunjunganProfil,
    PaginatedData,
    RuteFavoritProfil,
    SharedProps,
    UlasanProfil,
    WishListProfil,
} from '@/types';

interface Pengguna {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    created_at: string;
    is_admin?: boolean;
}

interface Badge {
    id: string;
    label: string;
    deskripsi: string;
    icon: string;
}

interface Gamifikasi {
    poin: number;
    level: string;
    level_idx: number;
    poin_ke_level_berikutnya: number | null;
    nama_level_berikutnya: string | null;
}

interface Props {
    pengguna?: Pengguna;
    jumlah_ulasan?: number;
    rata_rata_rating?: number | null;
    jumlah_destinasi_diulas?: number;
    streak_ulasan?: number;
    badges?: Badge[];
    gamifikasi?: Gamifikasi;
    ulasan?: PaginatedData<UlasanProfil>;
    bookmarks?: PaginatedData<BookmarkProfil>;
    kunjungan?: PaginatedData<KunjunganProfil>;
    ruteFavorit?: PaginatedData<RuteFavoritProfil>;
    wishList?: PaginatedData<WishListProfil>;
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
        <div className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
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

function KunjunganCard({ kunjungan }: { kunjungan: KunjunganProfil }) {
    const [removing, setRemoving] = useState(false);
    const { destinasi } = kunjungan;
    const ph = kategoriPlaceholder(destinasi.kategori);

    function hapus() {
        setRemoving(true);
        router.visit(`/destinasi/${destinasi.id}/kunjungan`, {
            method: 'delete',
            preserveScroll: true,
            onFinish: () => setRemoving(false),
        });
    }

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
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
                        title="Hapus dari daftar kunjungan"
                        className="text-emerald-500 transition-colors hover:text-red-500 disabled:opacity-50"
                    >
                        {removing ? (
                            <IconLoader2 size={15} className="animate-spin" />
                        ) : (
                            <IconCheck size={15} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function WishListTripCard({ item }: { item: WishListProfil }) {
    const [removing, setRemoving] = useState(false);
    const { destinasi } = item;
    const ph = kategoriPlaceholder(destinasi.kategori);

    function hapus() {
        setRemoving(true);
        router.visit(`/destinasi/${destinasi.id}/wishlist`, {
            method: 'delete',
            preserveScroll: true,
            onFinish: () => setRemoving(false),
        });
    }

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
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
                {item.tanggal_rencana && (
                    <p className="text-[11px] text-sky-600">
                        {new Date(item.tanggal_rencana).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <RatingDisplay value={Number(destinasi.rating)} size={13} />
                    <button
                        onClick={hapus}
                        disabled={removing}
                        title="Hapus dari rencana trip"
                        className="text-sky-400 transition-colors hover:text-red-500 disabled:opacity-50"
                    >
                        {removing ? (
                            <IconLoader2 size={15} className="animate-spin" />
                        ) : (
                            <IconCalendarPlus size={15} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

const MODE_LABEL: Record<string, string> = {
    antarkota: 'Antarkota',
    commuter: 'KRL',
    kcic: 'Whoosh',
};

function RuteFavoritCard({ rute }: { rute: RuteFavoritProfil }) {
    const [removing, setRemoving] = useState(false);

    function hapus() {
        setRemoving(true);
        router.visit(`/rute-favorit/${rute.id}`, {
            method: 'delete',
            preserveScroll: true,
            onFinish: () => setRemoving(false),
        });
    }

    return (
        <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <IconRoute size={17} />
            </div>
            <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-stone-800">
                    {rute.nama}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                    <span className="font-mono">{rute.dari_kode}</span>
                    <span className="text-stone-300">→</span>
                    <span className="font-mono">{rute.ke_kode}</span>
                    <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px]">
                        {MODE_LABEL[rute.mode] ?? rute.mode}
                    </span>
                </div>
            </div>
            <div className="flex shrink-0 gap-1">
                <Link
                    href={`/rute?dari=${rute.dari_kode}&ke=${rute.ke_kode}&mode=${rute.mode}`}
                    className="flex items-center gap-1 rounded-lg border border-emerald-200 px-2 py-1 text-[11px] font-medium text-emerald-700 no-underline transition-colors hover:bg-emerald-50"
                >
                    <IconRoute size={11} />
                    Buka
                </Link>
                <button
                    onClick={hapus}
                    disabled={removing}
                    title="Hapus dari favorit"
                    className="flex items-center justify-center rounded-lg border border-stone-200 p-1 text-stone-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                    {removing ? (
                        <IconLoader2 size={13} className="animate-spin" />
                    ) : (
                        <IconX size={13} />
                    )}
                </button>
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

interface RekomendasiItem {
    id: string;
    nama: string;
    kategori: string;
    rating: number;
    foto_url?: string | null;
    stasiun: { nama: string; kota: { nama: string } };
}

function RekomendasiSection() {
    const [data, setData] = useState<{ destinasi: RekomendasiItem[]; narasi: string | null; kategori: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    async function handleMuat() {
        setLoading(true);
        try {
            const res = await fetch('/ai/rekomendasi', { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
            if (res.ok) {
                setData(await res.json());
            }
        } catch {
            // silent
        } finally {
            setLoading(false);
            setDone(true);
        }
    }

    return (
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2">
                <IconSparkles size={18} className="text-emerald-600" />
                <h2 className="font-semibold text-stone-800">Rekomendasi Untukmu</h2>
            </div>

            {!done && !loading && (
                <div className="text-center py-4">
                    <p className="mb-3 text-sm text-stone-500">
                        JejakAI akan merekomendasikan destinasi berdasarkan riwayat kamu.
                    </p>
                    <button
                        onClick={handleMuat}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                    >
                        <IconSparkles size={14} />
                        Dapatkan Rekomendasi
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex items-center gap-2 py-4 text-sm text-stone-400">
                    <IconLoader2 size={15} className="animate-spin" />
                    JejakAI sedang memilihkan rekomendasi...
                </div>
            )}

            {done && data && (
                <>
                    {data.narasi && (
                        <div className="mb-4 rounded-lg border border-emerald-100 bg-white px-3 py-2.5 text-sm leading-relaxed text-stone-700">
                            <span className="mr-1.5 font-semibold text-emerald-700">JejakAI:</span>
                            {data.narasi}
                        </div>
                    )}
                    {data.destinasi.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {data.destinasi.map((d) => {
                                const ph = kategoriPlaceholder(d.kategori);
                                return (
                                    <Link
                                        key={d.id}
                                        href={`/destinasi/${d.id}`}
                                        className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white no-underline transition-shadow hover:shadow-md"
                                    >
                                        <div className={`flex h-24 items-center justify-center bg-gradient-to-br ${ph.gradient}`}>
                                            {d.foto_url ? (
                                                <img src={d.foto_url} alt={d.nama} className="h-full w-full object-cover" />
                                            ) : ph.icon}
                                        </div>
                                        <div className="p-2.5">
                                            <p className="line-clamp-2 text-xs font-medium text-stone-800">{d.nama}</p>
                                            <p className="mt-0.5 text-[10px] text-stone-400">{d.stasiun.kota.nama}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-stone-400">Belum ada rekomendasi. Coba simpan beberapa destinasi dulu!</p>
                    )}
                </>
            )}
        </div>
    );
}

export default function Tampilkan({
    pengguna: penggunaProp,
    jumlah_ulasan = 0,
    rata_rata_rating = null,
    jumlah_destinasi_diulas = 0,
    streak_ulasan = 0,
    badges = [],
    gamifikasi,
    ulasan,
    bookmarks,
    kunjungan,
    ruteFavorit,
    wishList,
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
    const emptyKunjungan: PaginatedData<KunjunganProfil> = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 8,
        total: 0,
        from: null,
        to: null,
        links: [],
    };
    const emptyRuteFavorit: PaginatedData<RuteFavoritProfil> = {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: null,
        to: null,
        links: [],
    };
    const emptyWishList: PaginatedData<WishListProfil> = {
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
    const kunjunganData = kunjungan ?? emptyKunjungan;
    const ruteFavoritData = ruteFavorit ?? emptyRuteFavorit;
    const wishListData = wishList ?? emptyWishList;
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

                        {/* Level & Points */}
                        {gamifikasi && (
                            <div className="mt-5 rounded-xl border border-stone-100 bg-stone-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{['🌱', '🚂', '🗺️', '⭐'][gamifikasi.level_idx] ?? '🌱'}</span>
                                        <span className="font-semibold text-stone-800">{gamifikasi.level}</span>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-700">{gamifikasi.poin.toLocaleString('id-ID')} poin</span>
                                </div>
                                {gamifikasi.poin_ke_level_berikutnya !== null && (
                                    <div>
                                        <div className="mb-1 flex justify-between text-xs text-stone-400">
                                            <span>Menuju {gamifikasi.nama_level_berikutnya}</span>
                                            <span>{gamifikasi.poin_ke_level_berikutnya} poin lagi</span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
                                            <div
                                                className="h-full rounded-full bg-emerald-500 transition-all"
                                                style={{
                                                    width: `${Math.min(100, 100 - (gamifikasi.poin_ke_level_berikutnya / (gamifikasi.poin + gamifikasi.poin_ke_level_berikutnya)) * 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {gamifikasi.poin_ke_level_berikutnya === null && (
                                    <p className="text-xs text-emerald-600">Level maksimal tercapai!</p>
                                )}
                            </div>
                        )}

                        {/* Stats row */}
                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-stone-100 pt-6 sm:grid-cols-4">
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
                            <div className="flex items-center gap-3">
                                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${streak_ulasan >= 3 ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-700'}`}>
                                    <IconFlame size={18} />
                                </span>
                                <div>
                                    <div className="text-xl font-bold text-stone-900 tabular-nums">
                                        {streak_ulasan}
                                        <span className="ml-1 text-sm font-normal text-stone-400">bln</span>
                                    </div>
                                    <div className="text-xs text-stone-500">
                                        {streak_ulasan >= 6 ? 'Streak luar biasa!' : streak_ulasan >= 3 ? 'Streak aktif' : 'Streak ulasan'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    {badges.length > 0 && (
                        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                            <h2 className="mb-4 font-semibold text-stone-800">
                                Badge
                                <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-normal text-stone-500">
                                    {badges.length}
                                </span>
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {badges.map((b) => (
                                    <div
                                        key={b.id}
                                        title={b.deskripsi}
                                        className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm"
                                    >
                                        <span>{b.icon}</span>
                                        <span className="font-medium text-stone-700">{b.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rekomendasi AI */}
                    <RekomendasiSection />

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

                    {/* Daftar Kunjungan */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                        <div className="mb-4 flex items-center gap-2">
                            <IconMapPin
                                size={18}
                                className="text-emerald-600"
                            />
                            <h2 className="font-semibold text-stone-800">
                                Daftar Kunjungan
                            </h2>
                            {kunjunganData.total > 0 && (
                                <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                                    {kunjunganData.total}
                                </span>
                            )}
                        </div>

                        {kunjunganData.total === 0 ? (
                            <div className="rounded-xl border border-dashed border-stone-200 py-10 text-center">
                                <IconMapPin
                                    size={32}
                                    className="mx-auto mb-2 text-stone-300"
                                />
                                <p className="text-sm text-stone-400">
                                    Belum ada destinasi yang dikunjungi.
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
                                    {kunjunganData.data.map((k) => (
                                        <KunjunganCard
                                            key={k.id}
                                            kunjungan={k}
                                        />
                                    ))}
                                </div>
                                {kunjunganData.last_page > 1 && (
                                    <div className="mt-4 border-t border-stone-100 pt-4">
                                        <Pagination data={kunjunganData} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Rute Favorit */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                        <div className="mb-4 flex items-center gap-2">
                            <IconRoute
                                size={18}
                                className="text-blue-600"
                            />
                            <h2 className="font-semibold text-stone-800">
                                Rute Favorit
                            </h2>
                            {ruteFavoritData.total > 0 && (
                                <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                                    {ruteFavoritData.total}
                                </span>
                            )}
                        </div>

                        {ruteFavoritData.total === 0 ? (
                            <div className="rounded-xl border border-dashed border-stone-200 py-10 text-center">
                                <IconRoute
                                    size={32}
                                    className="mx-auto mb-2 text-stone-300"
                                />
                                <p className="text-sm text-stone-400">
                                    Belum ada rute yang disimpan.
                                </p>
                                <Link
                                    href="/rute"
                                    className="mt-2 inline-block text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800"
                                >
                                    Rencanakan perjalanan
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    {ruteFavoritData.data.map((r) => (
                                        <RuteFavoritCard key={r.id} rute={r} />
                                    ))}
                                </div>
                                {ruteFavoritData.last_page > 1 && (
                                    <div className="mt-4 border-t border-stone-100 pt-4">
                                        <Pagination data={ruteFavoritData} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Rencana Trip */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                        <div className="mb-4 flex items-center gap-2">
                            <IconCalendarPlus
                                size={18}
                                className="text-sky-600"
                            />
                            <h2 className="font-semibold text-stone-800">
                                Rencana Trip
                            </h2>
                            {wishListData.total > 0 && (
                                <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                                    {wishListData.total}
                                </span>
                            )}
                        </div>

                        {wishListData.total === 0 ? (
                            <div className="rounded-xl border border-dashed border-stone-200 py-10 text-center">
                                <IconCalendarPlus
                                    size={32}
                                    className="mx-auto mb-2 text-stone-300"
                                />
                                <p className="text-sm text-stone-400">
                                    Belum ada destinasi di rencana trip.
                                </p>
                                <Link
                                    href="/destinasi"
                                    className="mt-2 inline-block text-sm font-medium text-emerald-700 no-underline hover:text-emerald-800"
                                >
                                    Temukan destinasi
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                    {wishListData.data.map((w) => (
                                        <WishListTripCard key={w.id} item={w} />
                                    ))}
                                </div>
                                {wishListData.last_page > 1 && (
                                    <div className="mt-4 border-t border-stone-100 pt-4">
                                        <Pagination data={wishListData} />
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

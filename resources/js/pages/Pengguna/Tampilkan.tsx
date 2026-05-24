import { Head, Link, router } from '@inertiajs/react';
import {
    IconMapPin,
    IconStar,
    IconUserCheck,
    IconUserPlus,
    IconUsers,
    IconWalk,
} from '@tabler/icons-react';
import Avatar from '@/components/elements/Avatar';
import PublicLayout from '@/components/layouts/PublicLayout';
import { formatTanggal } from '@/lib/utils';

interface PenggunaPublik {
    id: string;
    name: string;
    avatar?: string | null;
    created_at: string;
    jumlah_ulasan: number;
    jumlah_followers: number;
    jumlah_following: number;
    jumlah_kunjungan: number;
}

interface UlasanItem {
    id: string;
    konten: string;
    rating: number;
    created_at: string;
    destinasi: {
        id: string;
        nama: string;
        kategori: string;
        foto_url: string | null;
    };
}

interface Props {
    pengguna: PenggunaPublik;
    ulasan: UlasanItem[];
    is_following: boolean;
    is_own_profile: boolean;
}

function StatBox({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <span className="font-serif text-2xl font-bold text-emerald-700">{value}</span>
            <span className="text-xs text-stone-500">{label}</span>
        </div>
    );
}

export default function PenggunaTampilkan({ pengguna, ulasan, is_following, is_own_profile }: Props) {
    function handleFollow() {
        router.post(`/pengguna/${pengguna.id}/ikuti`, {}, { preserveScroll: true });
    }

    function handleUnfollow() {
        router.delete(`/pengguna/${pengguna.id}/ikuti`, { preserveScroll: true });
    }

    return (
        <PublicLayout>
            <Head title={`${pengguna.name} — JejakJalur`}>
                <meta property="og:title" content={`${pengguna.name} di JejakJalur`} />
                <meta property="og:description" content={`${pengguna.jumlah_ulasan} ulasan · ${pengguna.jumlah_kunjungan} destinasi dikunjungi`} />
            </Head>

            <div className="min-h-screen px-[max(24px,calc(50%-576px))] pt-24 pb-16">
                <div className="mx-auto max-w-2xl">
                    {/* Profile header */}
                    <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                        <Avatar
                            name={pengguna.name}
                            src={pengguna.avatar}
                            size="lg"
                            className="h-20 w-20 text-2xl"
                        />
                        <div className="flex-1">
                            <h1 className="mb-1 text-2xl font-bold text-stone-800 dark:text-stone-100">
                                {pengguna.name}
                            </h1>
                            <p className="text-sm text-stone-500 dark:text-stone-400">
                                Bergabung sejak {formatTanggal(pengguna.created_at)}
                            </p>

                            {!is_own_profile && (
                                <div className="mt-3">
                                    {is_following ? (
                                        <button
                                            type="button"
                                            onClick={handleUnfollow}
                                            className="flex items-center gap-1.5 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-stone-600 dark:text-stone-300"
                                        >
                                            <IconUserCheck size={15} />
                                            Mengikuti
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleFollow}
                                            className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                                        >
                                            <IconUserPlus size={15} />
                                            Ikuti
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-8 flex justify-around rounded-2xl border border-stone-200 bg-white py-5 dark:border-stone-700 dark:bg-stone-900">
                        <StatBox label="Ulasan" value={pengguna.jumlah_ulasan} />
                        <div className="w-px bg-stone-100 dark:bg-stone-700" />
                        <StatBox label="Dikunjungi" value={pengguna.jumlah_kunjungan} />
                        <div className="w-px bg-stone-100 dark:bg-stone-700" />
                        <StatBox label="Followers" value={pengguna.jumlah_followers} />
                        <div className="w-px bg-stone-100 dark:bg-stone-700" />
                        <StatBox label="Following" value={pengguna.jumlah_following} />
                    </div>

                    {/* Recent ulasan */}
                    <h2 className="mb-4 text-lg font-semibold text-stone-800 dark:text-stone-100">
                        Ulasan Terbaru
                    </h2>

                    {ulasan.length === 0 ? (
                        <p className="py-8 text-center text-sm text-stone-400">Belum ada ulasan.</p>
                    ) : (
                        <div className="space-y-3">
                            {ulasan.map((u) => (
                                <Link
                                    key={u.id}
                                    href={`/destinasi/${u.destinasi.id}`}
                                    className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 no-underline transition-shadow hover:shadow-md dark:border-stone-700 dark:bg-stone-900"
                                >
                                    {u.destinasi.foto_url ? (
                                        <img
                                            src={u.destinasi.foto_url}
                                            alt={u.destinasi.nama}
                                            className="h-16 w-16 shrink-0 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800">
                                            <IconMapPin size={20} className="text-stone-400" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <span className="truncate text-sm font-semibold text-stone-800 dark:text-stone-100">
                                                {u.destinasi.nama}
                                            </span>
                                            <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-500 dark:bg-stone-800">
                                                {u.destinasi.kategori}
                                            </span>
                                        </div>
                                        <div className="mb-1.5 flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <IconStar
                                                    key={i}
                                                    size={12}
                                                    className={i < u.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}
                                                />
                                            ))}
                                        </div>
                                        <p className="line-clamp-2 text-xs text-stone-500 dark:text-stone-400">
                                            {u.konten}
                                        </p>
                                        <p className="mt-1 text-[11px] text-stone-400">
                                            {formatTanggal(u.created_at)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}

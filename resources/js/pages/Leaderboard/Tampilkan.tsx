import { Head, Link } from '@inertiajs/react';
import { IconMapPin, IconStar, IconTrophy, IconUsers, IconWalk } from '@tabler/icons-react';
import Avatar from '@/components/elements/Avatar';
import PublicLayout from '@/components/layouts/PublicLayout';

interface TopUser {
    id: string;
    name: string;
    avatar?: string | null;
    jumlah_ulasan: number;
    jumlah_kunjungan: number;
    jumlah_followers: number;
    avg_rating: number;
}

interface Props {
    top: TopUser[];
}

const MEDAL: Record<number, string> = { 0: '🥇', 1: '🥈', 2: '🥉' };

export default function LeaderboardTampilkan({ top }: Props) {
    return (
        <PublicLayout>
            <Head title="Leaderboard — JejakJalur">
                <meta property="og:title" content="Leaderboard Reviewer — JejakJalur" />
                <meta
                    property="og:description"
                    content="Reviewer paling aktif di JejakJalur berdasarkan jumlah ulasan."
                />
            </Head>

            <div className="min-h-screen px-[max(24px,calc(50%-576px))] pt-24 pb-16">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8 flex items-center gap-3">
                        <IconTrophy size={28} className="text-amber-500" />
                        <div>
                            <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
                                Leaderboard Reviewer
                            </h1>
                            <p className="text-sm text-stone-500 dark:text-stone-400">
                                Top 20 kontributor ulasan terbanyak
                            </p>
                        </div>
                    </div>

                    {top.length === 0 ? (
                        <p className="py-12 text-center text-sm text-stone-400">Belum ada data.</p>
                    ) : (
                        <div className="space-y-2">
                            {top.map((user, index) => (
                                <Link
                                    key={user.id}
                                    href={`/pengguna/${user.id}`}
                                    className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 no-underline transition-shadow hover:shadow-md dark:border-stone-700 dark:bg-stone-900"
                                >
                                    {/* Rank */}
                                    <div className="w-8 shrink-0 text-center">
                                        {index < 3 ? (
                                            <span className="text-xl">{MEDAL[index]}</span>
                                        ) : (
                                            <span className="text-sm font-bold text-stone-400">
                                                #{index + 1}
                                            </span>
                                        )}
                                    </div>

                                    <Avatar
                                        name={user.name}
                                        src={user.avatar}
                                        size="md"
                                        className="h-11 w-11 shrink-0 text-base"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-semibold text-stone-800 dark:text-stone-100">
                                            {user.name}
                                        </p>
                                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-stone-500">
                                            <span className="flex items-center gap-1">
                                                <IconStar size={11} className="text-amber-400" />
                                                {user.avg_rating > 0
                                                    ? user.avg_rating.toFixed(1)
                                                    : '—'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IconMapPin size={11} />
                                                {user.jumlah_kunjungan} kunjungan
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IconUsers size={11} />
                                                {user.jumlah_followers} followers
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ulasan count badge */}
                                    <div className="shrink-0 text-right">
                                        <span className="block text-xl font-bold text-emerald-700">
                                            {user.jumlah_ulasan}
                                        </span>
                                        <span className="text-[11px] text-stone-400">ulasan</span>
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

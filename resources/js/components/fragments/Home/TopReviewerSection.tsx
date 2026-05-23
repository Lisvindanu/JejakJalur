import { IconMedal, IconStar } from '@tabler/icons-react';
import Avatar from '@/components/elements/Avatar';

interface Reviewer {
    id: string;
    name: string;
    avatar?: string | null;
    jumlah_ulasan: number;
    rata_rating: string | number;
}

interface Props {
    reviewers: Reviewer[];
}

const MEDAL_COLORS = [
    'text-amber-500',   // 1st
    'text-stone-400',   // 2nd
    'text-amber-700',   // 3rd
];

export default function TopReviewerSection({ reviewers }: Props) {
    if (reviewers.length === 0) return null;

    return (
        <section className="bg-stone-50 px-[max(24px,calc(50%-576px))] py-[72px]">
            {/* Header */}
            <div className="mb-9">
                <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-amber-600 uppercase">
                    <IconMedal size={13} />
                    Komunitas
                </p>
                <h2
                    className="font-serif leading-[1.15] font-normal text-stone-800"
                    style={{ fontSize: 'clamp(24px,3.5vw,34px)' }}
                >
                    Top Reviewer Bulan Ini
                </h2>
            </div>

            {/* List */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {reviewers.map((r, i) => (
                    <div
                        key={r.id}
                        className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4"
                    >
                        {/* Rank */}
                        <div className="flex w-7 shrink-0 items-center justify-center">
                            {i < 3 ? (
                                <IconMedal
                                    size={22}
                                    className={MEDAL_COLORS[i]}
                                />
                            ) : (
                                <span className="text-sm font-bold text-stone-400">
                                    {i + 1}
                                </span>
                            )}
                        </div>

                        <Avatar name={r.name} src={r.avatar} size="sm" />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-stone-800">
                                {r.name}
                            </p>
                            <p className="text-xs text-stone-500">
                                {r.jumlah_ulasan} ulasan
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-0.5 text-amber-500">
                            <IconStar size={13} />
                            <span className="text-xs font-semibold text-stone-700">
                                {Number(r.rata_rating).toFixed(1)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

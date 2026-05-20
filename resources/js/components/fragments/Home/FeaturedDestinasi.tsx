import { Link } from '@inertiajs/react';
import {
    IconArrowRight,
    IconMountain,
    IconShoppingBag,
    IconToolsKitchen2,
    IconTrain,
} from '@tabler/icons-react';
import Badge from '@/components/elements/Badge';
import { RatingDisplay } from '@/components/elements/Rating';
import type { Destinasi } from '@/types';

interface FeaturedDestinasiProps {
    destinasi: Destinasi[];
}

function cardImageConfig(kategori: string) {
    if (kategori === 'Kuliner') {
        return {
            gradient: 'from-amber-100 to-amber-200',
            icon: <IconToolsKitchen2 size={40} className="text-black/15" />,
        };
    }
    if (kategori === 'UMKM') {
        return {
            gradient: 'from-indigo-100 to-indigo-200',
            icon: <IconShoppingBag size={40} className="text-black/15" />,
        };
    }
    return {
        gradient: 'from-emerald-100 to-emerald-200',
        icon: <IconMountain size={40} className="text-black/15" />,
    };
}

export default function FeaturedDestinasi({
    destinasi,
}: FeaturedDestinasiProps) {
    return (
        <section className="bg-white px-[max(24px,calc(50%-576px))] py-[72px]">
            {/* Header */}
            <div className="mb-9 flex items-end justify-between">
                <div>
                    <p className="mb-2.5 text-[11px] font-semibold tracking-[0.12em] text-emerald-700 uppercase">
                        Destinasi Pilihan
                    </p>
                    <h2
                        className="font-serif leading-[1.15] font-normal text-stone-800"
                        style={{ fontSize: 'clamp(28px,4vw,38px)' }}
                    >
                        Rekomendasi
                        <br />
                        <em className="italic">Rating Tertinggi</em>
                    </h2>
                    <p className="mt-1.5 text-sm text-stone-500">
                        Direkomendasikan berdasarkan rating dan ulasan terbaru
                    </p>
                </div>
                <Link
                    href="/destinasi"
                    className="flex items-center gap-1 text-sm font-medium text-emerald-700 no-underline transition-[gap] duration-150 hover:gap-2"
                >
                    Lihat semua <IconArrowRight size={15} />
                </Link>
            </div>

            {/* 3-col grid */}
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {destinasi.map((d, idx) => {
                    const img = cardImageConfig(d.kategori);
                    return (
                        <Link
                            key={d.id}
                            href={`/destinasi/${d.id}`}
                            className="group cursor-pointer overflow-hidden rounded-xl border border-stone-200 bg-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
                            style={{
                                animation: `fadeUp 0.5s ${0.05 * (idx + 1)}s ease both`,
                            }}
                        >
                            {/* Image */}
                            <div
                                className={`flex h-[180px] items-center justify-center bg-gradient-to-br ${img.gradient}`}
                            >
                                {d.foto ? (
                                    <img
                                        src={d.foto}
                                        alt={d.nama}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    img.icon
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="mb-2 flex gap-1.5">
                                    <Badge kategori={d.kategori}>
                                        {d.kategori}
                                    </Badge>
                                    {d.is_verified && (
                                        <Badge verified>Terverifikasi</Badge>
                                    )}
                                </div>
                                <p className="mb-1.5 text-[15px] leading-snug font-semibold text-stone-800 group-hover:text-emerald-700">
                                    {d.nama}
                                </p>
                                <p className="mb-2 flex items-center gap-1 text-xs text-stone-500">
                                    <IconTrain
                                        size={13}
                                        className="text-stone-400"
                                    />
                                    {d.stasiun.nama} — {d.stasiun.kota.nama}
                                </p>
                                <RatingDisplay value={Number(d.rating)} />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="flex justify-center">
                <Link
                    href="/destinasi"
                    className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-emerald-700 bg-transparent px-6 py-[10px] text-sm font-semibold text-emerald-700 no-underline transition-colors hover:bg-emerald-50"
                >
                    Lihat Semua Destinasi
                    <IconArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}

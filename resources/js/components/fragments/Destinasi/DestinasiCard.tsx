import { Link } from '@inertiajs/react';
import {
    IconMountain,
    IconShoppingBag,
    IconToolsKitchen2,
    IconTrain,
} from '@tabler/icons-react';
import Badge from '@/components/elements/Badge';
import RatingDisplay from '@/components/elements/Rating';
import type { Destinasi } from '@/types';

interface DestinasiCardProps {
    destinasi: Destinasi;
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

function isNew(createdAt?: string | null): boolean {
    if (!createdAt) return false;
    const diffDays =
        (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
}

export default function DestinasiCard({ destinasi }: DestinasiCardProps) {
    const img = cardImageConfig(destinasi.kategori);
    const tampilBadgeBaru = isNew(destinasi.created_at);

    return (
        <Link
            href={`/destinasi/${destinasi.id}`}
            className="group cursor-pointer overflow-hidden rounded-xl border border-stone-200 bg-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
        >
            <div
                className={`relative flex h-[180px] items-center justify-center bg-gradient-to-br ${img.gradient}`}
            >
                {destinasi.foto ? (
                    <img
                        src={destinasi.foto}
                        alt={destinasi.nama}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    img.icon
                )}
                {tampilBadgeBaru && (
                    <span className="absolute top-2 left-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase shadow">
                        Baru
                    </span>
                )}
            </div>

            <div className="p-4">
                <div className="mb-2 flex flex-wrap gap-1.5">
                    <Badge kategori={destinasi.kategori}>
                        {destinasi.kategori}
                    </Badge>
                    {destinasi.is_verified && (
                        <Badge verified>Terverifikasi</Badge>
                    )}
                </div>
                <p className="mb-1.5 text-[15px] leading-snug font-semibold text-stone-800 group-hover:text-emerald-700">
                    {destinasi.nama}
                </p>
                <p className="mb-2 flex items-center gap-1 text-xs text-stone-500">
                    <IconTrain size={13} className="text-stone-400" />
                    {destinasi.stasiun.nama} — {destinasi.stasiun.kota.nama}
                </p>
                <RatingDisplay value={Number(destinasi.rating)} />
            </div>
        </Link>
    );
}

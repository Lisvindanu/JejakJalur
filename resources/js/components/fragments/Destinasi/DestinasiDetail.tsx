import { Link } from '@inertiajs/react';
import {
    IconArrowLeft,
    IconMapPin,
    IconMountain,
    IconShoppingBag,
    IconToolsKitchen2,
    IconTrain,
} from '@tabler/icons-react';
import Badge from '@/components/elements/Badge';
import RatingDisplay from '@/components/elements/Rating';
import type { Destinasi } from '@/types';

interface DestinasiDetailProps {
    destinasi: Destinasi;
}

function placeholderConfig(kategori: string) {
    if (kategori === 'Kuliner') {
        return {
            gradient: 'from-amber-100 to-amber-200',
            icon: <IconToolsKitchen2 size={56} className="text-black/15" />,
        };
    }
    if (kategori === 'UMKM') {
        return {
            gradient: 'from-indigo-100 to-indigo-200',
            icon: <IconShoppingBag size={56} className="text-black/15" />,
        };
    }
    return {
        gradient: 'from-emerald-100 to-emerald-200',
        icon: <IconMountain size={56} className="text-black/15" />,
    };
}

export default function DestinasiDetail({ destinasi }: DestinasiDetailProps) {
    const placeholder = placeholderConfig(destinasi.kategori);
    const ulasanCount = destinasi.ulasan?.length ?? 0;

    return (
        <div>
            {/* Image */}
            <div
                className={`flex h-[200px] w-full items-center justify-center overflow-hidden bg-gradient-to-br sm:h-[240px] ${placeholder.gradient}`}
            >
                {destinasi.foto_url ? (
                    <img
                        src={destinasi.foto_url}
                        alt={destinasi.nama}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    placeholder.icon
                )}
            </div>

            {/* Content */}
            <div className="px-[max(24px,calc(50%-576px))] py-7">
                {/* Back link */}
                <Link
                    href="/destinasi"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm text-stone-500 no-underline transition-colors hover:text-emerald-700"
                >
                    <IconArrowLeft size={15} />
                    Kembali ke semua destinasi
                </Link>

                {/* Badges */}
                <div className="mb-2.5 flex flex-wrap gap-2">
                    <Badge kategori={destinasi.kategori}>
                        {destinasi.kategori}
                    </Badge>
                    {destinasi.is_verified && (
                        <Badge verified>Terverifikasi</Badge>
                    )}
                </div>

                {/* Heading */}
                <h1
                    className="mb-3 font-serif leading-tight font-normal text-stone-800"
                    style={{ fontSize: 'clamp(24px,3vw,34px)' }}
                >
                    {destinasi.nama}
                </h1>

                {/* Meta row */}
                <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1.5">
                        <IconTrain size={15} className="text-stone-400" />
                        {destinasi.stasiun.nama} — {destinasi.stasiun.kota.nama}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <IconMapPin size={15} className="text-stone-400" />
                        {destinasi.alamat}
                    </span>
                </div>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-2">
                    <RatingDisplay value={Number(destinasi.rating)} size={16} />
                    {ulasanCount > 0 && (
                        <span className="text-sm text-stone-400">
                            ({ulasanCount} ulasan)
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="max-w-[680px] text-[15px] leading-relaxed text-stone-600">
                    {destinasi.deskripsi}
                </p>
            </div>
        </div>
    );
}

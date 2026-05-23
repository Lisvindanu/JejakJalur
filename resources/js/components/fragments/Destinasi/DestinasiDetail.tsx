import { Link } from '@inertiajs/react';
import {
    IconArrowLeft,
    IconCash,
    IconExternalLink,
    IconMapPin,
    IconMountain,
    IconPhone,
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
            <div className="px-[max(24px,calc(50%-576px))] py-5">
                {destinasi.foto_url ? (
                    <img
                        src={destinasi.foto_url}
                        alt={destinasi.nama}
                        className="mx-auto block max-h-[340px] max-w-full rounded-2xl shadow-md ring-1 ring-stone-200"
                    />
                ) : (
                    <div
                        className={`flex h-[220px] w-full items-center justify-center rounded-2xl bg-gradient-to-br sm:h-[280px] ${placeholder.gradient}`}
                    >
                        {placeholder.icon}
                    </div>
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

                {/* Info tambahan */}
                {(destinasi.telepon || destinasi.website || destinasi.harga_min != null) && (
                    <div className="mt-5 flex flex-wrap gap-3">
                        {destinasi.harga_min != null && (
                            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm">
                                <IconCash size={15} className="shrink-0 text-emerald-600" />
                                <span className="text-stone-700">
                                    {destinasi.harga_min === 0
                                        ? <span className="font-semibold text-emerald-700">Gratis</span>
                                        : <>
                                            Rp {destinasi.harga_min.toLocaleString('id-ID')}
                                            {destinasi.harga_max && destinasi.harga_max > destinasi.harga_min && (
                                                <> – Rp {destinasi.harga_max.toLocaleString('id-ID')}</>
                                            )}
                                        </>
                                    }
                                </span>
                            </div>
                        )}
                        {destinasi.telepon && (
                            <a
                                href={`tel:${destinasi.telepon}`}
                                className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100"
                            >
                                <IconPhone size={15} className="shrink-0 text-stone-400" />
                                {destinasi.telepon}
                            </a>
                        )}
                        {destinasi.website && (
                            <a
                                href={destinasi.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100"
                            >
                                <IconExternalLink size={15} className="shrink-0 text-stone-400" />
                                Website
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

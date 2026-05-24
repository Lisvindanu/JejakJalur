import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    IconArrowLeft,
    IconCash,
    IconClock,
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

type JamMap = NonNullable<NonNullable<import('@/types').Destinasi['jam_operasional']>>;

function JamOperasionalPanel({ jam }: { jam: JamMap }) {
    const todayKey = HARI[new Date().getDay()];
    const open = isOpenNow(jam);

    return (
        <div className="w-full rounded-lg border border-stone-100 bg-stone-50 p-3">
            <div className="mb-2 flex items-center gap-2">
                <IconClock size={15} className="shrink-0 text-stone-400" />
                <span className="text-sm font-medium text-stone-700">
                    Jam Operasional
                </span>
                <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        open
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-600'
                    }`}
                >
                    {open ? 'Buka' : 'Tutup'}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs sm:grid-cols-3 lg:grid-cols-4">
                {HARI_ORDER.map((day) => {
                    const slot = jam[day];
                    const isToday = day === todayKey;
                    return (
                        <div
                            key={day}
                            className={`flex items-center justify-between py-0.5 ${isToday ? 'font-semibold text-emerald-700' : 'text-stone-600'}`}
                        >
                            <span>{HARI_LABEL[day]}</span>
                            <span className={slot ? '' : 'text-stone-400'}>
                                {slot
                                    ? `${slot.buka}–${slot.tutup}`
                                    : 'Tutup'}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const HARI = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'] as const;
const HARI_ORDER = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'] as const;
const HARI_LABEL: Record<string, string> = {
    senin: 'Senin', selasa: 'Selasa', rabu: 'Rabu', kamis: 'Kamis',
    jumat: 'Jumat', sabtu: 'Sabtu', minggu: 'Minggu',
};

function isOpenNow(jam: NonNullable<NonNullable<import('@/types').Destinasi['jam_operasional']>>): boolean {
    const now = new Date();
    const dayKey = HARI[now.getDay()];
    const slot = jam[dayKey];
    if (!slot) return false;
    const [bH, bM] = slot.buka.split(':').map(Number);
    const [tH, tM] = slot.tutup.split(':').map(Number);
    const nowMin = now.getHours() * 60 + now.getMinutes();
    return nowMin >= bH * 60 + bM && nowMin < tH * 60 + tM;
}

export default function DestinasiDetail({ destinasi }: DestinasiDetailProps) {
    const placeholder = placeholderConfig(destinasi.kategori);
    const ulasanCount = destinasi.ulasan?.length ?? 0;
    const [activeIdx, setActiveIdx] = useState(0);

    const allImages: string[] = [];
    if (destinasi.foto_url) allImages.push(destinasi.foto_url);
    (destinasi.galeri ?? []).forEach((g) => {
        const url = g.url_resolved ?? g.url;
        if (url && !allImages.includes(url)) allImages.push(url);
    });

    return (
        <div>
            {/* Image / Gallery */}
            <div className="px-[max(24px,calc(50%-576px))] py-5">
                {allImages.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        <img
                            src={allImages[activeIdx]}
                            alt={destinasi.nama}
                            className="mx-auto block max-h-[340px] max-w-full rounded-2xl shadow-md ring-1 ring-stone-200 object-cover"
                        />
                        {allImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {allImages.map((src, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIdx(i)}
                                        className={`shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${i === activeIdx ? 'ring-emerald-500' : 'ring-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={src} alt="" className="h-16 w-20 object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
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
                {(destinasi.telepon ||
                    destinasi.website ||
                    destinasi.harga_min != null ||
                    destinasi.jam_operasional) && (
                    <div className="mt-5 flex flex-wrap gap-3">
                        {destinasi.harga_min != null && (
                            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm">
                                <IconCash
                                    size={15}
                                    className="shrink-0 text-emerald-600"
                                />
                                <span className="text-stone-700">
                                    {destinasi.harga_min === 0 ? (
                                        <span className="font-semibold text-emerald-700">
                                            Gratis
                                        </span>
                                    ) : (
                                        <>
                                            Rp{' '}
                                            {destinasi.harga_min.toLocaleString(
                                                'id-ID',
                                            )}
                                            {destinasi.harga_max &&
                                                destinasi.harga_max >
                                                    destinasi.harga_min && (
                                                    <>
                                                        {' '}
                                                        – Rp{' '}
                                                        {destinasi.harga_max.toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </>
                                                )}
                                        </>
                                    )}
                                </span>
                            </div>
                        )}
                        {destinasi.telepon && (
                            <a
                                href={`tel:${destinasi.telepon}`}
                                className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100"
                            >
                                <IconPhone
                                    size={15}
                                    className="shrink-0 text-stone-400"
                                />
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
                                <IconExternalLink
                                    size={15}
                                    className="shrink-0 text-stone-400"
                                />
                                Website
                            </a>
                        )}
                        {destinasi.jam_operasional && (
                            <JamOperasionalPanel jam={destinasi.jam_operasional} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

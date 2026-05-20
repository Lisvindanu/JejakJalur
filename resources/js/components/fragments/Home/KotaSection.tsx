import { Link } from '@inertiajs/react';
import { IconChevronDown, IconMapPin, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import type { Kota } from '@/types';

interface KotaSectionProps {
    kota: Kota[];
}

const FOTO_KOTA: Record<string, string> = {
    Bandung:
        'https://images.unsplash.com/photo-1676910905288-3a72eacb3512?auto=format&fit=crop&w=800&q=80',
    'Bandung Barat':
        'https://images.unsplash.com/photo-1620831568226-8735f4e4e8b8?auto=format&fit=crop&w=800&q=80',
    Banjar: 'https://images.unsplash.com/photo-1622943784867-c0f9e38bb40a?auto=format&fit=crop&w=800&q=80',
    Bantul: 'https://images.unsplash.com/photo-1705308536459-37414c592fc6?auto=format&fit=crop&w=800&q=80',
    Banyuwangi:
        'https://images.unsplash.com/photo-1683186729603-0e6081a605b3?auto=format&fit=crop&w=800&q=80',
    Batang: 'https://images.unsplash.com/photo-1709462721262-caace3e3a3af?auto=format&fit=crop&w=800&q=80',
    Blitar: 'https://images.unsplash.com/photo-1719406202631-d2d57b5f377b?auto=format&fit=crop&w=800&q=80',
};

const VISIBLE = 9;
const MODAL_STEP = 12;

export default function KotaSection({ kota }: KotaSectionProps) {
    const visible = kota.slice(0, VISIBLE);
    const extra = kota.slice(VISIBLE);
    const [open, setOpen] = useState(false);
    const [shown, setShown] = useState(MODAL_STEP);

    const close = () => {
        setOpen(false);
        setShown(MODAL_STEP);
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <section className="border-b border-stone-200 bg-stone-50 px-[max(24px,calc(50%-576px))] py-[72px]">
            <p className="mb-2.5 text-[11px] font-semibold tracking-[0.12em] text-emerald-700 uppercase">
                Berdasarkan Kota
            </p>
            <div className="mb-7 flex items-end justify-between">
                <h2
                    className="font-serif leading-[1.15] font-normal text-stone-800"
                    style={{ fontSize: 'clamp(28px,4vw,38px)' }}
                >
                    Jelajahi Kota
                    <br />
                    <em className="italic">di Jalur Kereta</em>
                </h2>

                {extra.length > 0 && (
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:border-emerald-500 hover:text-emerald-700"
                    >
                        +{extra.length} kota lainnya
                        <IconChevronDown size={15} />
                    </button>
                )}
            </div>

            {/* Irregular grid — pola kolom: [3,1 | 1,2,1 | 1,2,1] */}
            <div className="grid grid-cols-4 gap-3">
                {visible.map((k, i) => {
                    const SPANS = [2, 1, 1, 1, 2, 1, 1, 1, 2];
                    const span = SPANS[i] ?? 1;
                    const spanClass =
                        span === 3
                            ? 'col-span-3'
                            : span === 2
                              ? 'col-span-2'
                              : 'col-span-1';
                    const isWide = span >= 2;
                    const gradients = [
                        'from-emerald-800 to-teal-600',
                        'from-stone-700 to-stone-500',
                        'from-amber-700 to-orange-500',
                        'from-sky-700 to-blue-500',
                        'from-violet-700 to-purple-500',
                        'from-rose-700 to-pink-500',
                        'from-teal-700 to-emerald-500',
                        'from-orange-700 to-amber-500',
                        'from-cyan-700 to-sky-500',
                    ];
                    const grad = gradients[i % gradients.length];
                    const foto = FOTO_KOTA[k.nama];

                    if (isWide) {
                        return (
                            <Link
                                key={k.id}
                                href={`/destinasi?kota_id=${k.id}`}
                                className={`group flex overflow-hidden rounded-2xl border border-stone-200 bg-white no-underline transition-all duration-[180ms] hover:border-emerald-300 hover:shadow-md ${spanClass}`}
                            >
                                <div
                                    className={`relative shrink-0 overflow-hidden ${span === 3 ? 'w-[55%]' : 'w-[50%]'}`}
                                >
                                    {foto ? (
                                        <img
                                            src={foto}
                                            alt={k.nama}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${grad}`}
                                        >
                                            <IconMapPin
                                                size={28}
                                                className="text-white/25"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                                </div>
                                <div className="flex flex-col justify-center gap-1 px-4 py-4">
                                    <p className="text-sm font-semibold text-stone-800 group-hover:text-emerald-800">
                                        {k.nama}
                                    </p>
                                    <p className="text-xs text-stone-400">
                                        {k.stasiun.length} stasiun
                                    </p>
                                    <p className="mt-1.5 text-xs font-medium text-emerald-700 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                        Lihat destinasi →
                                    </p>
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={k.id}
                            href={`/destinasi?kota_id=${k.id}`}
                            className="group col-span-1 flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white no-underline transition-all duration-[180ms] hover:border-emerald-300 hover:shadow-md"
                        >
                            <div className="relative h-32 overflow-hidden">
                                {foto ? (
                                    <img
                                        src={foto}
                                        alt={k.nama}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div
                                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${grad}`}
                                    >
                                        <IconMapPin
                                            size={20}
                                            className="text-white/25"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-semibold text-stone-800 group-hover:text-emerald-800">
                                    {k.nama}
                                </p>
                                <p className="text-xs text-stone-400">
                                    {k.stasiun.length} stasiun
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Floating modal */}
            {open && extra.length > 0 && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={close}
                    />

                    {/* Modal */}
                    <div className="relative z-10 flex max-h-[82vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.22)]">
                        {/* Header */}
                        <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-6 py-4">
                            <div>
                                <p className="mb-0.5 text-[10px] font-semibold tracking-[0.12em] text-emerald-700 uppercase">
                                    Semua Kota
                                </p>
                                <h3 className="text-base font-bold text-stone-800">
                                    {extra.length} kota di jalur kereta
                                </h3>
                            </div>
                            <button
                                onClick={close}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                            >
                                <IconX size={17} />
                            </button>
                        </div>

                        {/* Scrollable grid */}
                        <div className="overflow-y-auto px-6 py-5">
                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                                {extra.slice(0, shown).map((k) => (
                                    <Link
                                        key={k.id}
                                        href={`/destinasi?kota_id=${k.id}`}
                                        onClick={close}
                                        className="group flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 no-underline transition-all duration-[180ms] hover:border-emerald-300 hover:bg-emerald-50"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-stone-400 shadow-sm transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700">
                                            <IconMapPin size={15} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-stone-700 group-hover:text-emerald-700">
                                                {k.nama}
                                            </p>
                                            <p className="text-xs text-stone-400">
                                                {k.stasiun.length} stasiun
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Load more */}
                            {shown < extra.length && (
                                <button
                                    onClick={() =>
                                        setShown((s) => s + MODAL_STEP)
                                    }
                                    className="mt-4 w-full rounded-xl border border-stone-200 py-3 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-emerald-700"
                                >
                                    +{extra.length - shown} kota lainnya
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

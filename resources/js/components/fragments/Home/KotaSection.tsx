import { Link } from '@inertiajs/react';
import { IconChevronDown, IconMapPin, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import type { Kota } from '@/types';

interface KotaSectionProps {
    kota: Kota[];
}

const VISIBLE = 8;
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

            {/* Main pills */}
            <div className="flex flex-wrap gap-2.5">
                {visible.map((k) => (
                    <Link
                        key={k.id}
                        href={`/destinasi?kota_id=${k.id}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-[18px] py-[9px] text-sm no-underline transition-all duration-[180ms] hover:border-emerald-600 hover:bg-emerald-50"
                    >
                        <IconMapPin
                            size={14}
                            className="text-stone-400 group-hover:text-emerald-700"
                        />
                        <span className="font-medium text-stone-700 group-hover:text-emerald-700">
                            {k.nama}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-xs text-stone-400">
                            {k.stasiun.length} stasiun
                        </span>
                    </Link>
                ))}
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

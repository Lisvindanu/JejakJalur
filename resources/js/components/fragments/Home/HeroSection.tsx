import { Link } from '@inertiajs/react';
import {
    IconBuildingCastle,
    IconMapPin,
    IconRoute,
    IconShoppingBag,
    IconToolsKitchen2,
    IconTrain,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import Badge from '@/components/elements/Badge';
import { RatingDisplay } from '@/components/elements/Rating';
import type { Destinasi } from '@/types';

interface HeroSectionProps {
    destinations: Destinasi[];
}

/* ─── Internal: card content ─── */
function HeroCardFace({
    d,
    isFront,
    didDrag,
}: {
    d: Destinasi;
    isFront: boolean;
    didDrag: boolean;
}) {
    function grad(k: string) {
        if (k === 'Kuliner') return 'from-amber-800 to-amber-600';
        if (k === 'UMKM') return 'from-purple-800 to-purple-600';
        return 'from-emerald-800 to-emerald-600';
    }
    function icon(k: string) {
        if (k === 'Kuliner')
            return <IconToolsKitchen2 size={52} className="text-white/40" />;
        if (k === 'UMKM')
            return <IconShoppingBag size={52} className="text-white/40" />;
        return <IconBuildingCastle size={52} className="text-white/40" />;
    }
    const fotoUrl = d.foto_url ?? d.foto;
    return (
        <>
            <div
                className={`relative flex h-[55%] items-center justify-center overflow-hidden bg-gradient-to-br ${grad(d.kategori)}`}
            >
                {fotoUrl ? (
                    <img
                        src={fotoUrl}
                        alt={d.nama}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    icon(d.kategori)
                )}
                <div className="absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-4">
                <div className="mb-2 flex gap-1.5">
                    <Badge kategori={d.kategori}>{d.kategori}</Badge>
                    {d.is_verified && <Badge verified>Terverifikasi</Badge>}
                </div>
                <p className="mb-1.5 text-[15px] leading-snug font-semibold text-stone-800">
                    {d.nama}
                </p>
                <p className="mb-1.5 flex items-center gap-1 text-xs text-stone-500">
                    <IconTrain size={13} className="text-stone-400" />
                    {d.stasiun.nama} — {d.stasiun.kota.nama}
                </p>
                <RatingDisplay value={Number(d.rating)} />
                {isFront && (
                    <Link
                        href={`/destinasi/${d.id}`}
                        className="mt-3 flex w-full items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-[13px] font-semibold text-white no-underline transition hover:bg-emerald-800"
                        onClick={(e) => didDrag && e.preventDefault()}
                    >
                        Lihat Detail
                    </Link>
                )}
            </div>
        </>
    );
}

/* ─── Internal: swipeable card deck ─── */
type Pos = 'front' | 'mid' | 'back';
type SlotId = 'A' | 'B' | 'C';

const NEXT: Record<Pos, Pos> = { front: 'back', mid: 'front', back: 'mid' };

const POS = {
    front: {
        w: 332,
        h: 418,
        b: 0,
        l: 14,
        rot: 0,
        op: 1,
        z: 3,
        sh: '0 24px 64px rgba(0,0,0,0.32)',
    },
    mid: {
        w: 290,
        h: 368,
        b: 32,
        l: 54,
        rot: 5,
        op: 0.5,
        z: 2,
        sh: '0 20px 56px rgba(0,0,0,0.22)',
    },
    back: {
        w: 248,
        h: 320,
        b: 62,
        l: 94,
        rot: 10,
        op: 0.28,
        z: 1,
        sh: '0 16px 48px rgba(0,0,0,0.18)',
    },
} as const;

function HeroCardDeck({ destinations }: { destinations: Destinasi[] }) {
    const total = destinations.length;

    const [slots, setSlots] = useState<
        Record<SlotId, { dataIdx: number; pos: Pos }>
    >({
        A: { dataIdx: 0, pos: 'front' },
        B: { dataIdx: 1, pos: 'mid' },
        C: { dataIdx: 2, pos: 'back' },
    });
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [didDrag, setDidDrag] = useState(false);
    const [noTx, setNoTx] = useState(false);
    const busy = useRef(false);
    const nextData = useRef(3);
    const startX = useRef(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const advance = () => {
        if (busy.current) return;
        busy.current = true;
        setSlots((prev) => {
            const n = { ...prev } as typeof prev;
            (Object.keys(n) as SlotId[]).forEach((id) => {
                n[id] = { ...n[id], pos: NEXT[n[id].pos] };
            });
            return n;
        });
        setTimeout(() => {
            setNoTx(true);
            setSlots((prev) => {
                const n = { ...prev } as typeof prev;
                const backId = (Object.keys(n) as SlotId[]).find(
                    (id) => n[id].pos === 'back',
                )!;
                n[backId] = {
                    ...n[backId],
                    dataIdx: nextData.current % total,
                };
                nextData.current++;
                return n;
            });
            requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                    setNoTx(false);
                    busy.current = false;
                }),
            );
        }, 440);
    };

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(advance, 6000);
    };

    useEffect(() => {
        intervalRef.current = setInterval(advance, 6000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [total]); // eslint-disable-line react-hooks/exhaustive-deps

    const onDown = (x: number) => {
        if (busy.current) return;
        startX.current = x;
        setIsDragging(true);
        setDidDrag(false);
    };
    const onMove = (x: number) => {
        if (!isDragging) return;
        const dx = x - startX.current;
        setDragX(dx);
        if (Math.abs(dx) > 8) setDidDrag(true);
    };
    const onUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (Math.abs(dragX) > 60) {
            setDragX(0);
            advance();
            resetInterval();
        } else {
            setDragX(0);
        }
    };

    const BASE: React.CSSProperties = {
        position: 'absolute',
        borderRadius: 14,
        overflow: 'hidden',
        background: '#fff',
    };
    const EASE = 'all 0.44s cubic-bezier(0.4,0,0.2,1)';

    return (
        <div
            className="select-none"
            style={{ position: 'relative', width: 420, height: 480 }}
            onMouseLeave={onUp}
        >
            {(Object.entries(slots) as [SlotId, typeof slots.A][]).map(
                ([id, { dataIdx, pos }]) => {
                    const s = POS[pos];
                    const isFront = pos === 'front';
                    const tx = isFront ? dragX : 0;
                    const rot = isFront ? s.rot + dragX / 20 : s.rot;

                    return (
                        <div
                            key={id}
                            style={{
                                ...BASE,
                                width: s.w,
                                height: s.h,
                                bottom: s.b + 48,
                                left: s.l,
                                opacity: s.op,
                                zIndex: s.z,
                                boxShadow:
                                    isFront && isDragging
                                        ? '0 32px 80px rgba(0,0,0,0.40)'
                                        : s.sh,
                                transform: `translateX(${tx}px) rotate(${rot}deg)`,
                                transition:
                                    (isDragging && isFront) || noTx
                                        ? 'none'
                                        : EASE,
                                cursor: isFront
                                    ? isDragging
                                        ? 'grabbing'
                                        : 'grab'
                                    : 'default',
                            }}
                            onMouseDown={
                                isFront ? (e) => onDown(e.clientX) : undefined
                            }
                            onMouseMove={
                                isFront ? (e) => onMove(e.clientX) : undefined
                            }
                            onMouseUp={isFront ? onUp : undefined}
                            onTouchStart={
                                isFront
                                    ? (e) => onDown(e.touches[0].clientX)
                                    : undefined
                            }
                            onTouchMove={
                                isFront
                                    ? (e) => {
                                          e.preventDefault();
                                          onMove(e.touches[0].clientX);
                                      }
                                    : undefined
                            }
                            onTouchEnd={isFront ? onUp : undefined}
                        >
                            <HeroCardFace
                                d={destinations[dataIdx % total]}
                                isFront={isFront}
                                didDrag={didDrag}
                            />
                        </div>
                    );
                },
            )}
        </div>
    );
}

/* ─── HeroSection ─── */
export default function HeroSection({ destinations }: HeroSectionProps) {
    return (
        <section
            className="relative grid min-h-screen px-[max(24px,calc(50%-576px))] lg:grid-cols-2"
            style={{ background: '#065f46' }}
        >
            {/* Track pattern */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'repeating-linear-gradient(90deg,rgba(255,255,255,0.025) 0px,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 80px)',
                }}
                aria-hidden
            />

            {/* Left column */}
            <div className="relative z-[2] flex animate-[fadeUp_0.7s_ease_both] flex-col self-center pt-32 pb-20 lg:pt-24 lg:pb-16">
                <div className="mb-7 flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-[5px] text-[11px] font-semibold tracking-[0.12em] text-white/70 uppercase">
                    <IconRoute size={14} />
                    Wisata &amp; Kuliner via Kereta Api
                </div>

                <h1
                    className="mb-5 font-serif leading-[1.08] font-normal tracking-[-1px] text-white"
                    style={{ fontSize: 'clamp(36px,4.5vw,58px)' }}
                >
                    Temukan <em className="text-emerald-300 italic">Permata</em>
                    <br />
                    di Setiap Stasiun
                </h1>

                <p className="mb-11 max-w-[400px] text-[15px] leading-[1.65] font-light text-white/65 lg:text-[16px]">
                    Direktori destinasi wisata dan kuliner terbaik yang mudah
                    dijangkau dari stasiun kereta api terdekat.
                </p>

                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/destinasi"
                        className="inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-[13px] text-[14px] font-semibold text-emerald-800 transition hover:-translate-y-px hover:bg-emerald-50"
                    >
                        <IconMapPin size={16} />
                        Mulai Jelajahi
                    </Link>
                    <Link
                        href="/rute"
                        className="inline-flex items-center gap-2 rounded-[10px] border border-white/30 bg-transparent px-6 py-[13px] text-[14px] font-medium text-white transition hover:bg-white/[0.08]"
                    >
                        <IconTrain size={16} strokeWidth={1.5} />
                        Lihat Peta Rute
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-[52px] flex gap-0 border-t border-white/10 pt-7 lg:mt-8 lg:pt-5">
                    {[
                        { num: '240+', label: 'Destinasi Terdaftar' },
                        { num: '38', label: 'Stasiun Terhubung' },
                        { num: '8', label: 'Kota di Jawa' },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className={`flex flex-col gap-0.5 ${i < 2 ? 'mr-8 border-r border-white/10 pr-8' : ''}`}
                        >
                            <span className="font-serif text-[32px] leading-none text-white lg:text-[26px]">
                                {s.num}
                            </span>
                            <span className="text-xs text-white/50">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right column — card deck */}
            <div className="relative z-[2] hidden animate-[fadeUp_0.7s_0.2s_ease_both] self-center lg:flex lg:justify-end">
                <HeroCardDeck destinations={destinations} />
            </div>
        </section>
    );
}

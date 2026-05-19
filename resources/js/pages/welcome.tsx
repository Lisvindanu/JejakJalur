import { Head, Link, usePage } from '@inertiajs/react';
import {
    IconArrowLeft,
    IconArrowRight,
    IconBuildingCastle,
    IconCheck,
    IconChevronDown,
    IconMapPin,
    IconMountain,
    IconRoute,
    IconShoppingBag,
    IconStar,
    IconStarFilled,
    IconStarHalf,
    IconToolsKitchen2,
    IconTrain,
    IconX,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import type { SharedProps } from '@/types';

/* ─── Types ─── */
interface Stasiun {
    id: string;
    nama: string;
    kode_stasiun: string;
}

interface Kota {
    id: string;
    nama: string;
    kode_ibukota: string;
    stasiun: Stasiun[];
}

interface Destinasi {
    id: string;
    nama: string;
    deskripsi: string;
    alamat: string;
    kategori: string;
    rating: string;
    foto: string | null;
    is_verified: boolean;
    stasiun: { nama: string; kota: { nama: string } };
}

interface Props {
    destinasiFeatured: Destinasi[];
    semuaKota: Kota[];
}

/* ─── Mock data ─── */
const MOCK_DESTINASI: Destinasi[] = [
    {
        id: '1',
        nama: 'Keraton Kasunanan Surakarta',
        deskripsi: 'Pusat kebudayaan Jawa di kota Solo.',
        alamat: 'Solo',
        kategori: 'Wisata',
        rating: '4.7',
        foto: null,
        is_verified: true,
        stasiun: { nama: 'Solo Balapan', kota: { nama: 'Solo' } },
    },
    {
        id: '2',
        nama: 'Nasi Gudeg Yu Djum Wijilan',
        deskripsi: 'Gudeg legendaris khas Yogyakarta.',
        alamat: 'Yogyakarta',
        kategori: 'Kuliner',
        rating: '4.9',
        foto: null,
        is_verified: false,
        stasiun: { nama: 'Tugu', kota: { nama: 'Yogyakarta' } },
    },
    {
        id: '3',
        nama: 'Kawah Putih Ciwidey',
        deskripsi: 'Danau vulkanik berwarna putih kehijauan.',
        alamat: 'Bandung',
        kategori: 'Wisata',
        rating: '4.5',
        foto: null,
        is_verified: true,
        stasiun: { nama: 'Kiaracondong', kota: { nama: 'Bandung' } },
    },
    {
        id: '4',
        nama: 'Pasar Beringharjo Yogyakarta',
        deskripsi: 'Pasar tradisional ikonik sejak era Mataram.',
        alamat: 'Yogyakarta',
        kategori: 'UMKM',
        rating: '4.6',
        foto: null,
        is_verified: false,
        stasiun: { nama: 'Tugu', kota: { nama: 'Yogyakarta' } },
    },
    {
        id: '5',
        nama: 'Soto Bangkong Semarang',
        deskripsi: 'Soto legendaris sejak 1950 di Semarang.',
        alamat: 'Semarang',
        kategori: 'Kuliner',
        rating: '4.8',
        foto: null,
        is_verified: true,
        stasiun: { nama: 'Tawang', kota: { nama: 'Semarang' } },
    },
    {
        id: '6',
        nama: 'Masjid Agung Cirebon',
        deskripsi: 'Masjid bersejarah dengan arsitektur khas Cirebon.',
        alamat: 'Cirebon',
        kategori: 'Wisata',
        rating: '4.4',
        foto: null,
        is_verified: false,
        stasiun: { nama: 'Prujakan', kota: { nama: 'Cirebon' } },
    },
];

const MOCK_KOTA: Kota[] = [
    {
        id: '1',
        nama: 'Jakarta',
        kode_ibukota: 'JKT',
        stasiun: [
            { id: '1', nama: 'Gambir', kode_stasiun: 'GMR' },
            { id: '2', nama: 'Pasar Senen', kode_stasiun: 'PSE' },
            { id: '3', nama: 'Tanah Abang', kode_stasiun: 'TNH' },
            { id: '4', nama: 'Jatinegara', kode_stasiun: 'JNG' },
            { id: '5', nama: 'Manggarai', kode_stasiun: 'MRI' },
        ],
    },
    {
        id: '2',
        nama: 'Bandung',
        kode_ibukota: 'BDG',
        stasiun: [
            { id: '6', nama: 'Bandung', kode_stasiun: 'BD' },
            { id: '7', nama: 'Kiaracondong', kode_stasiun: 'KAC' },
            { id: '8', nama: 'Cimahi', kode_stasiun: 'CMI' },
        ],
    },
    {
        id: '3',
        nama: 'Yogyakarta',
        kode_ibukota: 'YOG',
        stasiun: [
            { id: '9', nama: 'Tugu', kode_stasiun: 'YK' },
            { id: '10', nama: 'Lempuyangan', kode_stasiun: 'LPN' },
        ],
    },
    {
        id: '4',
        nama: 'Surabaya',
        kode_ibukota: 'SBY',
        stasiun: [
            { id: '11', nama: 'Gubeng', kode_stasiun: 'SGU' },
            { id: '12', nama: 'Pasar Turi', kode_stasiun: 'SBI' },
            { id: '13', nama: 'Wonokromo', kode_stasiun: 'WO' },
            { id: '14', nama: 'Semut', kode_stasiun: 'SMT' },
        ],
    },
    {
        id: '5',
        nama: 'Semarang',
        kode_ibukota: 'SMG',
        stasiun: [
            { id: '15', nama: 'Tawang', kode_stasiun: 'TW' },
            { id: '16', nama: 'Poncol', kode_stasiun: 'SMC' },
        ],
    },
    {
        id: '6',
        nama: 'Solo',
        kode_ibukota: 'SLO',
        stasiun: [
            { id: '17', nama: 'Solo Balapan', kode_stasiun: 'SLO' },
            { id: '18', nama: 'Purwosari', kode_stasiun: 'PWS' },
            { id: '19', nama: 'Solo Jebres', kode_stasiun: 'SK' },
        ],
    },
    {
        id: '7',
        nama: 'Cirebon',
        kode_ibukota: 'CBN',
        stasiun: [
            { id: '20', nama: 'Cirebon', kode_stasiun: 'CN' },
            { id: '21', nama: 'Prujakan', kode_stasiun: 'CNP' },
        ],
    },
    {
        id: '8',
        nama: 'Purwokerto',
        kode_ibukota: 'PWT',
        stasiun: [{ id: '22', nama: 'Purwokerto', kode_stasiun: 'PWT' }],
    },
];

/* ─── Helpers ─── */
function cardImageConfig(kategori: string) {
    if (kategori === 'Kuliner')
        return {
            gradient: 'from-amber-100 to-amber-200',
            icon: <IconToolsKitchen2 size={40} className="text-black/15" />,
        };
    if (kategori === 'UMKM')
        return {
            gradient: 'from-indigo-100 to-indigo-200',
            icon: <IconShoppingBag size={40} className="text-black/15" />,
        };
    return {
        gradient: 'from-emerald-100 to-emerald-200',
        icon: <IconMountain size={40} className="text-black/15" />,
    };
}

function StarRow({ value, size = 13 }: { value: number; size?: number }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: full }).map((_, i) => (
                <IconStarFilled
                    key={`f${i}`}
                    size={size}
                    className="text-amber-400"
                />
            ))}
            {half === 1 && (
                <IconStarHalf size={size} className="text-amber-400" />
            )}
            {Array.from({ length: empty }).map((_, i) => (
                <IconStar
                    key={`e${i}`}
                    size={size}
                    className="text-stone-300"
                />
            ))}
            <span className="ml-1 text-xs font-semibold text-stone-700">
                {value.toFixed(1)}
            </span>
        </div>
    );
}

/* ─── Card content shared by front + flying card ─── */
function HeroCardFace({ d }: { d: Destinasi }) {
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
    return (
        <>
            <div
                className={`relative flex h-[55%] items-center justify-center overflow-hidden bg-gradient-to-br ${grad(d.kategori)}`}
            >
                {icon(d.kategori)}
                <div className="absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-4">
                <div className="mb-2 flex gap-1.5">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-emerald-800">
                        {d.kategori}
                    </span>
                    {d.is_verified && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-medium text-white">
                            <IconCheck size={10} />
                            Terverifikasi
                        </span>
                    )}
                </div>
                <p className="mb-1.5 text-[15px] leading-snug font-semibold text-stone-800">
                    {d.nama}
                </p>
                <p className="flex items-center gap-1 text-xs text-stone-500">
                    <IconTrain size={13} className="text-stone-400" />
                    {d.stasiun.nama} — {d.stasiun.kota.nama}
                </p>
                <StarRow value={Number(d.rating)} />
            </div>
        </>
    );
}

/* ─── Swipeable hero card deck ─── */
function HeroCardDeck({ destinations }: { destinations: Destinasi[] }) {
    const total = destinations.length;

    type Pos = 'front' | 'mid' | 'back';
    type Id = 'A' | 'B' | 'C';

    // Each swipe cycles: front→back, mid→front, back→mid
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

    const [slots, setSlots] = useState<
        Record<Id, { dataIdx: number; pos: Pos }>
    >({
        A: { dataIdx: 0, pos: 'front' },
        B: { dataIdx: 1, pos: 'mid' },
        C: { dataIdx: 2, pos: 'back' },
    });
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [noTx, setNoTx] = useState(false);
    const [hinted, setHinted] = useState(false);
    const startX = useRef(0);
    const nextData = useRef(3);

    const doSwipe = () => {
        if (animating || noTx) return;
        setHinted(true);
        setIsDragging(false);
        setDragX(0);
        setAnimating(true);
        // Rotate all card positions simultaneously — CSS transition handles the animation
        setSlots((prev) => {
            const n = { ...prev } as typeof prev;
            (Object.keys(n) as Id[]).forEach((id) => {
                n[id] = { ...n[id], pos: NEXT[n[id].pos] };
            });
            return n;
        });
        // After transition ends: give the new back card fresh data, then snap instantly
        setTimeout(() => {
            setNoTx(true);
            setSlots((prev) => {
                const n = { ...prev } as typeof prev;
                const backId = (Object.keys(n) as Id[]).find(
                    (id) => n[id].pos === 'back',
                )!;
                n[backId] = { ...n[backId], dataIdx: nextData.current % total };
                nextData.current++;
                return n;
            });
            setAnimating(false);
            requestAnimationFrame(() =>
                requestAnimationFrame(() => setNoTx(false)),
            );
        }, 440);
    };

    const onDown = (x: number) => {
        if (animating) return;
        startX.current = x;
        setIsDragging(true);
    };
    const onMove = (x: number) => {
        if (!isDragging || animating) return;
        setDragX(x - startX.current);
    };
    const onUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (Math.abs(dragX) > 80) doSwipe();
        else setDragX(0);
    };

    const BASE: React.CSSProperties = {
        position: 'absolute',
        borderRadius: 14,
        overflow: 'hidden',
        background: '#fff',
    };
    const EASE = 'all 0.44s cubic-bezier(0.4,0,0.2,1)';

    const swipeProgress = Math.min(Math.abs(dragX) / 100, 1);
    const swipeDir = dragX > 0 ? 'right' : dragX < 0 ? 'left' : null;

    // Track which dataIdx the front card is showing for progress dots
    const frontSlot = (Object.values(slots) as (typeof slots.A)[]).find(
        (s) => s.pos === 'front',
    )!;
    const activeDot = frontSlot.dataIdx % total;

    return (
        <div
            className="select-none"
            style={{ position: 'relative', width: 420, height: 530 }}
        >
            {/* Cards */}
            {(Object.entries(slots) as [Id, typeof slots.A][]).map(
                ([id, { dataIdx, pos }]) => {
                    const s = POS[pos];
                    const isFront = pos === 'front';
                    const tx = isFront ? dragX : 0;
                    const rot = isFront ? dragX / 18 : s.rot;
                    // Deepen shadow when dragging
                    const shadow =
                        isFront && isDragging
                            ? '0 32px 80px rgba(0,0,0,0.42)'
                            : s.sh;
                    return (
                        <div
                            key={id}
                            style={{
                                ...BASE,
                                width: s.w,
                                height: s.h,
                                bottom: s.b + 48, // offset for dot row below
                                left: s.l,
                                opacity: s.op,
                                zIndex: s.z,
                                boxShadow: shadow,
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
                                userSelect: 'none',
                            }}
                            onMouseDown={
                                isFront ? (e) => onDown(e.clientX) : undefined
                            }
                            onMouseMove={
                                isFront ? (e) => onMove(e.clientX) : undefined
                            }
                            onMouseUp={isFront ? onUp : undefined}
                            onMouseLeave={isFront ? onUp : undefined}
                            onTouchStart={
                                isFront
                                    ? (e) => onDown(e.touches[0].clientX)
                                    : undefined
                            }
                            onTouchMove={
                                isFront
                                    ? (e) => onMove(e.touches[0].clientX)
                                    : undefined
                            }
                            onTouchEnd={isFront ? onUp : undefined}
                        >
                            <HeroCardFace d={destinations[dataIdx % total]} />

                            {/* Drag direction tint overlay — only on front card */}
                            {isFront && isDragging && swipeDir && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        pointerEvents: 'none',
                                        opacity: swipeProgress * 0.35,
                                        background:
                                            swipeDir === 'right'
                                                ? 'linear-gradient(135deg, rgba(4,120,87,0.6) 0%, transparent 60%)'
                                                : 'linear-gradient(225deg, rgba(220,38,38,0.5) 0%, transparent 60%)',
                                        transition: 'opacity 0.08s',
                                    }}
                                />
                            )}

                            {/* Directional arrow badge — appears mid-drag */}
                            {isFront &&
                                isDragging &&
                                swipeDir &&
                                swipeProgress > 0.15 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 16,
                                            ...(swipeDir === 'right'
                                                ? { left: 16 }
                                                : { right: 16 }),
                                            opacity: Math.min(
                                                (swipeProgress - 0.15) / 0.4,
                                                1,
                                            ),
                                            transform: `scale(${0.7 + swipeProgress * 0.3})`,
                                            transition: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            background:
                                                swipeDir === 'right'
                                                    ? '#047857'
                                                    : '#dc2626',
                                            color: '#fff',
                                            borderRadius: 9999,
                                            padding: '4px 10px 4px 8px',
                                            fontSize: 11,
                                            fontWeight: 600,
                                            boxShadow:
                                                '0 4px 12px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        {swipeDir === 'left' ? (
                                            <>
                                                <IconArrowLeft size={13} />
                                                Geser
                                            </>
                                        ) : (
                                            <>
                                                <IconArrowRight size={13} />
                                                Lanjut
                                            </>
                                        )}
                                    </div>
                                )}
                        </div>
                    );
                },
            )}

            {/* Swipe hint — visible until first swipe */}
            {!hinted && !isDragging && !animating && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 56,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'rgba(0,0,0,0.52)',
                        backdropFilter: 'blur(6px)',
                        color: '#fff',
                        borderRadius: 9999,
                        padding: '5px 14px',
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: '0.03em',
                        pointerEvents: 'none',
                        animation: 'swipeHint 2.4s ease-in-out infinite',
                    }}
                >
                    <IconArrowLeft size={12} style={{ opacity: 0.7 }} />
                    geser kartu
                    <IconArrowRight size={12} style={{ opacity: 0.7 }} />
                </div>
            )}

            {/* Progress dots */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 8,
                    left: 14,
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                    zIndex: 10,
                }}
            >
                {destinations.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (animating || i === activeDot) return;
                            setHinted(true);
                            doSwipe();
                        }}
                        style={{
                            width: i === activeDot ? 20 : 6,
                            height: 6,
                            borderRadius: 9999,
                            background:
                                i === activeDot
                                    ? '#047857'
                                    : 'rgba(255,255,255,0.45)',
                            border: 'none',
                            padding: 0,
                            cursor: i === activeDot ? 'default' : 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </div>

            {/* Next arrow button */}
            <button
                onClick={() => {
                    if (animating) return;
                    setHinted(true);
                    doSwipe();
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 10,
                    width: 36,
                    height: 36,
                    borderRadius: 9999,
                    background: '#047857',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(4,120,87,0.4)',
                    transition: 'background 0.15s, transform 0.1s',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        '#065f46';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        '#047857';
                }}
            >
                <IconArrowRight size={16} />
            </button>
        </div>
    );
}

/* ─── Kota section with full-width panel ─── */
function KotaSection({ kota }: { kota: Kota[] }) {
    const VISIBLE = 8;
    const MODAL_STEP = 12;
    const visible = kota.slice(0, VISIBLE);
    const extra = kota.slice(VISIBLE);
    const [open, setOpen] = useState(false);
    const [shown, setShown] = useState(MODAL_STEP);

    const close = () => {
        setOpen(false);
        setShown(MODAL_STEP);
    };

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
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

/* ─── Page ─── */
export default function Welcome({ destinasiFeatured, semuaKota }: Props) {
    const { auth } = usePage<SharedProps>().props;

    const featured =
        destinasiFeatured.length > 0 ? destinasiFeatured : MOCK_DESTINASI;
    const PRIORITY_CITIES = [
        'Jakarta',
        'Bandung',
        'Yogyakarta',
        'Surabaya',
        'Malang',
        'Semarang',
        'Solo',
        'Bogor',
        'Bekasi',
        'Depok',
        'Medan',
        'Palembang',
        'Cirebon',
        'Purwokerto',
    ];
    const kota = (semuaKota.length > 0 ? semuaKota : MOCK_KOTA)
        .slice()
        .sort((a, b) => {
            const pa = PRIORITY_CITIES.findIndex((n) =>
                a.nama.toLowerCase().includes(n.toLowerCase()),
            );
            const pb = PRIORITY_CITIES.findIndex((n) =>
                b.nama.toLowerCase().includes(n.toLowerCase()),
            );
            if (pa !== -1 && pb !== -1) return pa - pb;
            if (pa !== -1) return -1;
            if (pb !== -1) return 1;
            return b.stasiun.length - a.stasiun.length;
        });

    const initials = auth?.user
        ? auth.user.name
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('')
              .toUpperCase()
        : '';

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <Head title="Temukan Permata Tersembunyi di Jalur Kereta" />

            <div className="min-h-screen overflow-x-hidden bg-stone-50 text-stone-800">
                {/* ══════════════════ NAVBAR ══════════════════ */}
                <nav
                    className={`fixed top-0 z-[100] flex h-[60px] w-full items-center gap-10 px-[max(24px,calc(50%-576px))] transition-all duration-300 ${
                        scrolled
                            ? 'border-b border-stone-200 bg-white/90 backdrop-blur-[12px]'
                            : 'border-b border-transparent bg-transparent'
                    }`}
                >
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2 no-underline"
                    >
                        <IconTrain
                            size={22}
                            strokeWidth={1.75}
                            className={`transition-colors duration-300 ${scrolled ? 'text-emerald-700' : 'text-white'}`}
                        />
                        <span
                            className={`font-serif text-[17px] font-bold tracking-[-0.3px] transition-colors duration-300 ${scrolled ? 'text-emerald-700' : 'text-white'}`}
                        >
                            JejakJalur
                        </span>
                    </Link>

                    <div className="ml-auto hidden items-center gap-7 md:flex">
                        <Link
                            href="/destinasi"
                            className={`text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-stone-600 hover:text-emerald-700' : 'text-white/80 hover:text-white'}`}
                        >
                            Jelajahi
                        </Link>
                        <Link
                            href="/rute"
                            className={`text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-stone-600 hover:text-emerald-700' : 'text-white/80 hover:text-white'}`}
                        >
                            Rute
                        </Link>
                    </div>

                    <div className="ml-6 flex items-center gap-2">
                        {auth?.user ? (
                            <div
                                className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${scrolled ? 'hover:bg-stone-100' : 'hover:bg-white/10'}`}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-[13px] font-bold text-white">
                                    {initials}
                                </div>
                                <span
                                    className={`text-sm transition-colors duration-300 ${scrolled ? 'text-stone-700' : 'text-white'}`}
                                >
                                    {auth.user.name.split(' ')[0]}
                                </span>
                                <IconChevronDown
                                    size={15}
                                    className={`transition-colors duration-300 ${scrolled ? 'text-stone-400' : 'text-white/60'}`}
                                />
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/masuk"
                                    className={`rounded-lg border px-[14px] py-[7px] text-[13px] font-medium transition-colors duration-300 ${scrolled ? 'border-stone-300 text-stone-700 hover:bg-stone-100' : 'border-white/40 text-white hover:bg-white/10'}`}
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/daftar"
                                    className={`rounded-lg px-[14px] py-[7px] text-[13px] font-semibold transition-colors duration-300 ${scrolled ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'bg-white/15 text-white hover:bg-white/25'}`}
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* ══════════════════ HERO ══════════════════ */}
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

                    {/* LEFT */}
                    <div className="relative z-[2] flex animate-[fadeUp_0.7s_ease_both] flex-col self-center py-20">
                        <div className="mb-7 flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-[5px] text-[11px] font-semibold tracking-[0.12em] text-white/70 uppercase">
                            <IconRoute size={14} />
                            Wisata &amp; Kuliner via Kereta Api
                        </div>

                        <h1
                            className="mb-5 font-serif leading-[1.08] font-normal tracking-[-1px] text-white"
                            style={{ fontSize: 'clamp(44px,6vw,72px)' }}
                        >
                            Temukan{' '}
                            <em className="text-emerald-300 italic">Permata</em>
                            <br />
                            di Setiap Stasiun
                        </h1>

                        <p className="mb-11 max-w-[400px] text-[17px] leading-[1.65] font-light text-white/65">
                            Direktori destinasi wisata dan kuliner terbaik yang
                            mudah dijangkau dari stasiun kereta api terdekat.
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
                        <div className="mt-[52px] flex gap-0 border-t border-white/10 pt-7">
                            {[
                                { num: '240+', label: 'Destinasi Terdaftar' },
                                { num: '38', label: 'Stasiun Terhubung' },
                                { num: '8', label: 'Kota di Jawa' },
                            ].map((s, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col gap-0.5 ${i < 2 ? 'mr-8 border-r border-white/10 pr-8' : ''}`}
                                >
                                    <span className="font-serif text-[32px] leading-none text-white">
                                        {s.num}
                                    </span>
                                    <span className="text-xs text-white/50">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — swipeable card deck */}
                    <div className="relative z-[2] hidden animate-[fadeUp_0.7s_0.2s_ease_both] self-center lg:flex lg:justify-end">
                        <HeroCardDeck destinations={featured} />
                    </div>
                </section>

                {/* ══════════════════ KOTA ══════════════════ */}
                <KotaSection kota={kota} />

                {/* ══════════════════ DESTINASI PILIHAN ══════════════════ */}
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
                                Direkomendasikan berdasarkan rating dan ulasan
                                terbaru
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
                        {featured.map((d, idx) => {
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
                                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-emerald-800">
                                                {d.kategori}
                                            </span>
                                            {d.is_verified && (
                                                <span className="flex items-center gap-1 rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-medium text-white">
                                                    <IconCheck size={10} />
                                                    Terverifikasi
                                                </span>
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
                                            {d.stasiun.nama} —{' '}
                                            {d.stasiun.kota.nama}
                                        </p>
                                        <StarRow value={Number(d.rating)} />
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

                {/* ══════════════════ FOOTER ══════════════════ */}
                <footer className="bg-stone-800 px-[max(24px,calc(50%-576px))] pt-[52px] pb-10">
                    <div className="mb-9 grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
                        {/* Brand */}
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <IconTrain
                                    size={20}
                                    className="text-white"
                                    strokeWidth={1.75}
                                />
                                <span className="font-serif text-lg font-bold text-white">
                                    JejakJalur
                                </span>
                            </div>
                            <p className="max-w-[260px] text-[13px] leading-relaxed text-stone-400">
                                Temukan destinasi terbaik di jalur kereta
                                Indonesia.
                            </p>
                        </div>

                        {/* Links 3-col */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Jelajahi',
                                    links: [
                                        ['Destinasi', '/destinasi'],
                                        ['Rute', '/rute'],
                                        ['Kota', '/destinasi'],
                                    ],
                                },
                                {
                                    title: 'Akun',
                                    links: [
                                        ['Masuk', '/masuk'],
                                        ['Daftar', '/daftar'],
                                    ],
                                },
                                {
                                    title: 'Lainnya',
                                    links: [
                                        ['Tentang', '#'],
                                        ['Kebijakan Privasi', '#'],
                                    ],
                                },
                            ].map((col) => (
                                <div key={col.title}>
                                    <p className="mb-3.5 text-[11px] font-semibold tracking-[0.08em] text-stone-300 uppercase">
                                        {col.title}
                                    </p>
                                    {col.links.map(([label, href]) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="mb-2 block text-[13px] text-stone-400 no-underline transition-colors hover:text-white"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="mb-5 border-stone-700" />
                    <p className="text-center text-xs text-stone-500">
                        &copy; 2026 JejakJalur. Dibuat untuk traveler Indonesia.
                    </p>
                </footer>
            </div>
        </>
    );
}

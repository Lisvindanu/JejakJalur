import { useEffect, useMemo, useRef, useState } from 'react';
import {
    IconBolt,
    IconCheck,
    IconChevronRight,
    IconCurrentLocation,
    IconLink,
    IconLoader2,
    IconMapPin,
    IconRoute,
    IconTrain,
    IconX,
} from '@tabler/icons-react';
import type { Kota, RuteSegment, StasiunRute } from '@/types';
import StasiunDestinasiModal from './StasiunDestinasiModal';

// ── Types & Constants ─────────────────────────────────────────────────────────

type Mode = 'antarkota' | 'commuter' | 'kcic';

const MODES: {
    key: Mode;
    label: string;
    icon: React.ReactNode;
    desc: string;
}[] = [
    {
        key: 'antarkota',
        label: 'Antarkota',
        icon: <IconTrain size={13} />,
        desc: 'KA jarak jauh',
    },
    {
        key: 'commuter',
        label: 'KRL',
        icon: <IconTrain size={13} />,
        desc: 'Commuter Line',
    },
    {
        key: 'kcic',
        label: 'Whoosh',
        icon: <IconBolt size={13} />,
        desc: 'Kereta Cepat',
    },
];

// ── Utilities ─────────────────────────────────────────────────────────────────

function haversine(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function filterKotaByMode(semuaKota: Kota[], mode: Mode): Kota[] {
    // Pakai jenis_layanan yang sudah diderive dari koneksi_stasiun.tipe di backend.
    // Single source of truth — tidak ada hardcoded kode stasiun di frontend.
    return semuaKota
        .map((k) => ({
            ...k,
            stasiun: k.stasiun.filter((s) =>
                (s.jenis_layanan ?? []).includes(mode),
            ),
        }))
        .filter((k) => k.stasiun.length > 0);
}

// ── Interfaces ────────────────────────────────────────────────────────────────

interface StasiunFlat {
    id: string;
    nama: string;
    kode_stasiun: string;
    destinasi_count?: number;
    kotaNama: string;
    kotaId: string;
}

// ── Atom: SimpleDropdown ──────────────────────────────────────────────────────

function SimpleDropdown<T extends { id: string }>({
    placeholder,
    value,
    onSelect,
    onClear,
    displayValue,
    options,
    renderOption,
    searchText,
    disabled,
}: {
    placeholder: string;
    value: T | null;
    onSelect: (item: T) => void;
    onClear: () => void;
    displayValue: (item: T) => React.ReactNode;
    options: T[];
    renderOption: (item: T) => React.ReactNode;
    searchText: (item: T) => string;
    disabled?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    function handleSelect(item: T) {
        onSelect(item);
        setQuery('');
        setOpen(false);
    }

    function handleClear() {
        onClear();
        setQuery('');
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    const filtered = options.filter((item) => {
        if (!query.trim()) return true;
        return searchText(item).toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div className="relative">
            <div
                className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2 transition-colors ${
                    disabled
                        ? 'cursor-not-allowed border-stone-100 bg-stone-50 opacity-50'
                        : open || value
                          ? 'border-emerald-400 ring-2 ring-emerald-50'
                          : 'border-stone-200 hover:border-stone-300'
                }`}
            >
                {value ? (
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                        <div className="min-w-0 text-sm">
                            {displayValue(value)}
                        </div>
                        <button
                            onClick={handleClear}
                            className="shrink-0 rounded-md p-0.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                        >
                            <IconX size={12} />
                        </button>
                    </div>
                ) : (
                    <input
                        ref={inputRef}
                        value={query}
                        disabled={disabled}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setTimeout(() => setOpen(false), 160)}
                        placeholder={placeholder}
                        className="flex-1 bg-transparent text-sm text-stone-700 placeholder-stone-400 outline-none disabled:cursor-not-allowed"
                    />
                )}
            </div>

            {open && !value && !disabled && (
                <div className="absolute top-full right-0 left-0 z-[1000] mt-1 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl">
                    <div className="max-h-[220px] overflow-y-auto">
                        {filtered.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-stone-400">
                                Tidak ditemukan
                            </div>
                        ) : (
                            filtered.slice(0, 50).map((item) => (
                                <button
                                    key={item.id}
                                    onMouseDown={() => handleSelect(item)}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-emerald-50"
                                >
                                    {renderOption(item)}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Molecule: ModeSelector ────────────────────────────────────────────────────

function ModeSelector({
    mode,
    onChange,
}: {
    mode: Mode;
    onChange: (m: Mode) => void;
}) {
    return (
        <div className="mb-5 flex gap-1.5">
            {MODES.map((m) => (
                <button
                    key={m.key}
                    onClick={() => onChange(m.key)}
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                        mode === m.key
                            ? m.key === 'kcic'
                                ? 'border-blue-300 bg-blue-50 text-blue-700'
                                : m.key === 'commuter'
                                  ? 'border-orange-300 bg-orange-50 text-orange-700'
                                  : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                            : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-700'
                    }`}
                >
                    {m.icon}
                    <span>{m.label}</span>
                    <span
                        className={`hidden text-[10px] font-normal sm:inline ${mode === m.key ? 'opacity-70' : 'opacity-50'}`}
                    >
                        · {m.desc}
                    </span>
                </button>
            ))}
        </div>
    );
}

// ── Molecule: KotaStasiunPicker ───────────────────────────────────────────────

function KotaStasiunPicker({
    accent = 'emerald',
    value,
    onChange,
    semuaKota,
    excludeKotaId,
}: {
    accent?: 'emerald' | 'amber';
    value: StasiunFlat | null;
    onChange: (s: StasiunFlat | null) => void;
    semuaKota: Kota[];
    excludeKotaId?: string;
}) {
    const [kotaAktif, setKotaAktif] = useState<Kota | null>(() =>
        value ? (semuaKota.find((k) => k.id === value.kotaId) ?? null) : null,
    );

    useEffect(() => {
        if (value) {
            setKotaAktif((prev) =>
                prev?.id === value.kotaId
                    ? prev
                    : (semuaKota.find((k) => k.id === value.kotaId) ?? null),
            );
        } else {
            setKotaAktif(null);
        }
    }, [value, semuaKota]);

    const kotaOptions = useMemo(
        () =>
            excludeKotaId
                ? semuaKota.filter((k) => k.id !== excludeKotaId)
                : semuaKota,
        [semuaKota, excludeKotaId],
    );

    const stasiunOptions = useMemo<StasiunFlat[]>(
        () =>
            kotaAktif
                ? kotaAktif.stasiun.map((s) => ({
                      ...s,
                      kotaNama: kotaAktif.nama,
                      kotaId: kotaAktif.id,
                  }))
                : [],
        [kotaAktif],
    );

    function handleKotaSelect(kota: Kota) {
        setKotaAktif(kota);
        onChange(null);
    }

    function handleKotaClear() {
        setKotaAktif(null);
        onChange(null);
    }

    return (
        <div className="flex flex-col gap-2">
            <SimpleDropdown<Kota>
                placeholder="Pilih kota..."
                value={kotaAktif}
                onSelect={handleKotaSelect}
                onClear={handleKotaClear}
                displayValue={(k) => (
                    <span className="font-medium text-stone-800">{k.nama}</span>
                )}
                options={kotaOptions}
                renderOption={(k) => (
                    <span className="text-stone-800">{k.nama}</span>
                )}
                searchText={(k) => k.nama}
            />
            <SimpleDropdown<StasiunFlat>
                placeholder={
                    kotaAktif ? 'Pilih stasiun...' : 'Pilih kota dulu...'
                }
                value={value}
                onSelect={onChange}
                onClear={() => onChange(null)}
                displayValue={(s) => (
                    <div>
                        <span className="font-medium text-stone-800">
                            {s.nama}
                        </span>
                        <span className="ml-1.5 font-mono text-[11px] text-stone-400">
                            {s.kode_stasiun}
                        </span>
                    </div>
                )}
                options={stasiunOptions}
                renderOption={(s) => (
                    <div className="flex items-center gap-2.5">
                        <IconTrain
                            size={12}
                            className={`shrink-0 ${accent === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}
                        />
                        <div>
                            <span className="text-stone-800">{s.nama}</span>
                            <span className="ml-1.5 font-mono text-[11px] text-stone-400">
                                {s.kode_stasiun}
                            </span>
                        </div>
                    </div>
                )}
                searchText={(s) => `${s.nama} ${s.kode_stasiun}`}
                disabled={!kotaAktif}
            />
        </div>
    );
}

// ── Molecule: EndpointCard ────────────────────────────────────────────────────

function EndpointCard({
    label,
    stasiun,
    variant,
    onLihatDestinasi,
}: {
    label: string;
    stasiun: StasiunRute;
    variant: 'departure' | 'arrival';
    onLihatDestinasi?: (s: StasiunRute) => void;
}) {
    const isDeparture = variant === 'departure';
    return (
        <div
            className={`rounded-xl border p-4 ${
                isDeparture
                    ? 'border-emerald-700 bg-emerald-700 text-white'
                    : 'border-amber-200 bg-amber-50'
            }`}
        >
            <div
                className={`text-[10px] font-bold tracking-widest uppercase ${
                    isDeparture ? 'text-emerald-100' : 'text-amber-700'
                }`}
            >
                {label}
            </div>
            <div
                className={`mt-2 text-xl leading-tight font-bold ${isDeparture ? '' : 'text-stone-800'}`}
            >
                {stasiun.nama}
            </div>
            <div
                className={`mt-1 text-sm ${isDeparture ? 'text-emerald-100' : 'text-amber-700'}`}
            >
                {stasiun.kota.nama} ·{' '}
                <span className="font-mono">{stasiun.kode_stasiun}</span>
            </div>
            {(stasiun.destinasi_count ?? 0) > 0 && (
                <button
                    onClick={() => onLihatDestinasi?.(stasiun)}
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                        isDeparture
                            ? 'bg-emerald-600 text-emerald-100 hover:bg-emerald-500'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                >
                    <IconMapPin size={12} />
                    {stasiun.destinasi_count} destinasi · Lihat
                </button>
            )}
        </div>
    );
}

// ── Molecule: PemberhentianList ───────────────────────────────────────────────

function PemberhentianList({
    stops,
    onLihatDestinasi,
}: {
    stops: StasiunRute[];
    onLihatDestinasi?: (s: StasiunRute) => void;
}) {
    const [expandAll, setExpandAll] = useState(false);
    const visible = expandAll ? stops : stops.slice(0, 6);

    if (stops.length === 0) return null;

    return (
        <div className="mt-6">
            <div className="mb-3 text-sm font-semibold text-stone-700">
                Pemberhentian
            </div>
            <div className="relative pl-7">
                <div className="absolute top-2 bottom-2 left-2.5 w-px bg-emerald-200" />
                {visible.map((s, i) => (
                    <div
                        key={s.id}
                        className="group relative flex items-center gap-4 py-2"
                    >
                        <span className="absolute top-1/2 -left-7 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border-2 border-emerald-600 bg-white text-[10px] font-semibold text-emerald-700">
                            {i + 1}
                        </span>
                        <div className="flex flex-1 items-center justify-between gap-2">
                            <div>
                                <div className="text-sm font-medium text-stone-800">
                                    {s.nama}{' '}
                                    <span className="font-mono text-xs text-stone-400">
                                        ({s.kode_stasiun})
                                    </span>
                                </div>
                                <div className="text-xs text-stone-500">
                                    {s.kota.nama}
                                </div>
                            </div>
                            {(s.destinasi_count ?? 0) > 0 && (
                                <button
                                    onClick={() => onLihatDestinasi?.(s)}
                                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-stone-200 px-2.5 py-1 text-xs text-stone-500 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                >
                                    <IconMapPin size={11} />
                                    {s.destinasi_count} destinasi
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {stops.length > 6 && (
                    <button
                        onClick={() => setExpandAll((v) => !v)}
                        className="mt-2 ml-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                        {expandAll
                            ? 'Sembunyikan'
                            : `Tampilkan semua (${stops.length}) →`}
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Organism: PerencanaRute ───────────────────────────────────────────────────

interface Props {
    semuaKota: Kota[];
    onRuteFound: (rute: StasiunRute[], segments: RuteSegment[]) => void;
    onRuteClear: () => void;
}

export default function PerencanaRute({
    semuaKota,
    onRuteFound,
    onRuteClear,
}: Props) {
    const [mode, setMode] = useState<Mode>(() => {
        if (typeof window === 'undefined') return 'antarkota';
        const m = new URLSearchParams(window.location.search).get('mode');
        return (m as Mode) ?? 'antarkota';
    });
    const [asal, setAsal] = useState<StasiunFlat | null>(null);
    const [tujuan, setTujuan] = useState<StasiunFlat | null>(null);
    const [copied, setCopied] = useState(false);
    const kotaFiltered = useMemo(
        () => filterKotaByMode(semuaKota, mode),
        [semuaKota, mode],
    );

    // Pre-fill dari URL params (?dari=KODE&ke=KODE&mode=MODE)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const dariKode = params.get('dari');
        const keKode = params.get('ke');
        if (!dariKode || !keKode) return;

        for (const kota of semuaKota) {
            for (const s of kota.stasiun) {
                if (s.kode_stasiun === dariKode && !asal) {
                    setAsal({ ...s, kotaNama: kota.nama, kotaId: kota.id });
                }
                if (s.kode_stasiun === keKode && !tujuan) {
                    setTujuan({ ...s, kotaNama: kota.nama, kotaId: kota.id });
                }
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleShare() {
        if (!asal || !tujuan) return;
        const url = new URL('/rute', window.location.origin);
        url.searchParams.set('dari', asal.kode_stasiun);
        url.searchParams.set('ke', tujuan.kode_stasiun);
        url.searchParams.set('mode', mode);
        navigator.clipboard.writeText(url.toString()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    const [rute, setRute] = useState<StasiunRute[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingGps, setLoadingGps] = useState(false);
    const [gpsError, setGpsError] = useState<string | null>(null);
    const [stasiunModal, setStasiunModal] = useState<StasiunRute | null>(null);

    function findNearestStation(lat: number, lng: number): StasiunFlat | null {
        let nearest: StasiunFlat | null = null;
        let minDist = Infinity;
        for (const kota of semuaKota) {
            for (const s of kota.stasiun) {
                if (!s.lat || !s.lng) continue;
                const sLat =
                    typeof s.lat === 'string'
                        ? parseFloat(s.lat as string)
                        : (s.lat as number);
                const sLng =
                    typeof s.lng === 'string'
                        ? parseFloat(s.lng as string)
                        : (s.lng as number);
                if (isNaN(sLat) || isNaN(sLng)) continue;
                const d = haversine(lat, lng, sLat, sLng);
                if (d < minDist) {
                    minDist = d;
                    nearest = { ...s, kotaNama: kota.nama, kotaId: kota.id };
                }
            }
        }
        return nearest;
    }

    function handleGps() {
        if (!navigator.geolocation) {
            setGpsError('GPS tidak didukung browser ini.');
            return;
        }
        setLoadingGps(true);
        setGpsError(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const nearest = findNearestStation(
                    pos.coords.latitude,
                    pos.coords.longitude,
                );
                if (nearest) {
                    setAsal(nearest);
                    resetRute();
                } else {
                    setGpsError(
                        'Tidak ada stasiun dengan koordinat di database.',
                    );
                }
                setLoadingGps(false);
            },
            (err) => {
                setGpsError(
                    err.code === 1
                        ? 'Izin lokasi ditolak.'
                        : 'Gagal mendapatkan lokasi.',
                );
                setLoadingGps(false);
            },
            { enableHighAccuracy: true, timeout: 10000 },
        );
    }

    function resetRute() {
        setRute(null);
        setError(null);
        onRuteClear();
    }

    function handleModeChange(newMode: Mode) {
        setMode(newMode);
        setAsal(null);
        setTujuan(null);
        resetRute();
    }

    async function handleCari() {
        if (!asal || !tujuan) return;
        setLoading(true);
        setError(null);
        setRute(null);
        onRuteClear();

        try {
            const res = await fetch(
                `/rute/cari-rute?dari=${asal.id}&ke=${tujuan.id}&mode=${mode}`,
            );
            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? 'Terjadi kesalahan.');
            } else {
                setRute(data.rute);
                onRuteFound(data.rute, data.segments ?? []);
            }
        } catch {
            setError('Gagal menghubungi server. Coba lagi.');
        } finally {
            setLoading(false);
        }
    }

    function handleHapus() {
        setAsal(null);
        setTujuan(null);
        resetRute();
    }

    const pemberhentian = rute ? rute.slice(1, -1) : [];

    return (
        <div className="bg-stone-50 px-[max(24px,calc(50%-576px))] py-8">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                {/* Header */}
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-stone-900">
                        Rencanakan Perjalanan
                    </h2>
                    <p className="mt-0.5 text-sm text-stone-500">
                        Pilih stasiun asal dan tujuan untuk melihat rute.
                    </p>
                </div>

                {/* Mode selector */}
                <ModeSelector mode={mode} onChange={handleModeChange} />

                {/* Picker row: stacked on mobile, side-by-side on md+ */}
                <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
                    {/* ── DARI (left) ── */}
                    <div className="min-w-0 flex-1 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
                                Dari
                            </span>
                            <button
                                onClick={handleGps}
                                disabled={loadingGps}
                                title="Deteksi stasiun terdekat dari lokasi saya"
                                className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                            >
                                {loadingGps ? (
                                    <IconLoader2
                                        size={11}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <IconCurrentLocation size={11} />
                                )}
                                GPS
                            </button>
                        </div>
                        <KotaStasiunPicker
                            accent="emerald"
                            value={asal}
                            onChange={(s) => {
                                setAsal(s);
                                resetRute();
                            }}
                            semuaKota={kotaFiltered}
                        />
                    </div>

                    {/* ── Separator ── */}
                    <div className="hidden shrink-0 flex-col items-center justify-center gap-1 self-center md:flex">
                        <IconChevronRight
                            size={18}
                            className="text-stone-300"
                        />
                    </div>

                    {/* ── KE (right) ── */}
                    <div className="min-w-0 flex-1 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                        <div className="mb-2">
                            <span className="text-xs font-semibold tracking-wider text-amber-700 uppercase">
                                Ke
                            </span>
                        </div>
                        <KotaStasiunPicker
                            accent="amber"
                            value={tujuan}
                            onChange={(s) => {
                                setTujuan(s);
                                resetRute();
                            }}
                            semuaKota={kotaFiltered}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2">
                    <button
                        onClick={handleCari}
                        disabled={!asal || !tujuan || loading}
                        className="flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? (
                            <IconLoader2 size={15} className="animate-spin" />
                        ) : (
                            <IconRoute size={15} />
                        )}
                        Cari Rute
                    </button>
                    {asal && tujuan && (
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                            {copied ? (
                                <>
                                    <IconCheck size={15} className="text-emerald-600" />
                                    <span className="text-emerald-600">Tersalin!</span>
                                </>
                            ) : (
                                <>
                                    <IconLink size={15} />
                                    Salin Link
                                </>
                            )}
                        </button>
                    )}
                    <button
                        onClick={handleHapus}
                        className="rounded-xl border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:border-stone-300 hover:bg-stone-50"
                    >
                        Hapus rencana
                    </button>
                </div>

                {/* GPS error */}
                {gpsError && (
                    <p className="mt-3 text-xs text-red-500">{gpsError}</p>
                )}

                {/* Route error */}
                {error && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span className="mt-0.5 shrink-0 font-bold">!</span>
                        {error}
                    </div>
                )}

                {/* ── Results ── */}
                {rute && rute.length >= 2 && (
                    <div className="mt-6 border-t border-stone-200 pt-6">
                        {/* Summary bar */}
                        <div className="mb-3 text-xs font-semibold tracking-wider text-stone-500 uppercase">
                            Hasil Pencarian
                        </div>
                        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-stone-700">
                            <span className="font-medium">{rute[0].nama}</span>
                            <span className="text-stone-400">→</span>
                            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-600">
                                {pemberhentian.length} pemberhentian
                            </span>
                            <span className="text-stone-400">→</span>
                            <span className="font-medium">
                                {rute[rute.length - 1].nama}
                            </span>
                            <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                {rute.length} stasiun total
                            </span>
                        </div>

                        {/* Endpoint cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <EndpointCard
                                label="Berangkat"
                                stasiun={rute[0]}
                                variant="departure"
                                onLihatDestinasi={setStasiunModal}
                            />
                            <EndpointCard
                                label="Tiba"
                                stasiun={rute[rute.length - 1]}
                                variant="arrival"
                                onLihatDestinasi={setStasiunModal}
                            />
                        </div>

                        {/* Pemberhentian */}
                        <PemberhentianList
                            stops={pemberhentian}
                            onLihatDestinasi={setStasiunModal}
                        />
                    </div>
                )}
            </div>

            <StasiunDestinasiModal
                stasiun={stasiunModal}
                open={stasiunModal !== null}
                onClose={() => setStasiunModal(null)}
            />
        </div>
    );
}

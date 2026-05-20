import { useMemo, useRef, useState } from 'react';
import {
    IconArrowRight,
    IconChevronDown,
    IconLoader2,
    IconRoute,
    IconSearch,
    IconTrain,
    IconX,
} from '@tabler/icons-react';
import type { Kota, StasiunRute } from '@/types';

interface StasiunFlat {
    id: string;
    nama: string;
    kode_stasiun: string;
    destinasi_count?: number;
    kotaNama: string;
    kotaId: string;
}

function SimpleDropdown<T extends { id: string }>({
    placeholder,
    value,
    onSelect,
    onClear,
    displayValue,
    options,
    renderOption,
    disabled,
}: {
    placeholder: string;
    value: T | null;
    onSelect: (item: T) => void;
    onClear: () => void;
    displayValue: (item: T) => React.ReactNode;
    options: T[];
    renderOption: (item: T) => React.ReactNode;
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

    return (
        <div className="relative">
            <div
                className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 transition-colors ${
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
                <div className="absolute top-full right-0 left-0 z-[1000] mt-1 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
                    <div className="max-h-[220px] overflow-y-auto">
                        {options.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-stone-400">
                                Tidak ditemukan
                            </div>
                        ) : (
                            options
                                .filter((item) => {
                                    if (!query.trim()) return true;
                                    return renderOption(item)
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(query.toLowerCase());
                                })
                                .slice(0, 50)
                                .map((item) => (
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

function KotaStasiunPicker({
    label,
    value,
    onChange,
    semuaKota,
    excludeKotaId,
}: {
    label: string;
    value: StasiunFlat | null;
    onChange: (s: StasiunFlat | null) => void;
    semuaKota: Kota[];
    excludeKotaId?: string;
}) {
    const [kotaAktif, setKotaAktif] = useState<Kota | null>(() =>
        value ? (semuaKota.find((k) => k.id === value.kotaId) ?? null) : null,
    );

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

    const selectedStasiun = value;

    return (
        <div className="min-w-0 flex-1">
            <p className="mb-1.5 text-[10px] font-semibold tracking-[0.1em] text-stone-500 uppercase">
                {label}
            </p>
            <div className="flex flex-col gap-1.5">
                {/* Step 1: Kota */}
                <SimpleDropdown<Kota>
                    placeholder="Pilih kota..."
                    value={kotaAktif}
                    onSelect={handleKotaSelect}
                    onClear={handleKotaClear}
                    displayValue={(k) => (
                        <span className="font-medium text-stone-800">
                            {k.nama}
                        </span>
                    )}
                    options={kotaOptions}
                    renderOption={(k) => (
                        <span className="text-stone-800">{k.nama}</span>
                    )}
                />

                {/* Step 2: Stasiun */}
                <SimpleDropdown<StasiunFlat>
                    placeholder="Pilih stasiun..."
                    value={selectedStasiun}
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
                                className="shrink-0 text-emerald-600"
                            />
                            <div>
                                <span className="text-stone-800">{s.nama}</span>
                                <span className="ml-1.5 font-mono text-[11px] text-stone-400">
                                    {s.kode_stasiun}
                                </span>
                            </div>
                        </div>
                    )}
                    disabled={!kotaAktif}
                />
            </div>
        </div>
    );
}

interface Props {
    semuaKota: Kota[];
    onRuteFound: (rute: StasiunRute[]) => void;
    onRuteClear: () => void;
}

export default function PerencanaRute({
    semuaKota,
    onRuteFound,
    onRuteClear,
}: Props) {
    const [asal, setAsal] = useState<StasiunFlat | null>(null);
    const [tujuan, setTujuan] = useState<StasiunFlat | null>(null);
    const [rute, setRute] = useState<StasiunRute[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAllStops, setShowAllStops] = useState(false);

    function resetRute() {
        setRute(null);
        setError(null);
        setShowAllStops(false);
        onRuteClear();
    }

    async function handleCari() {
        if (!asal || !tujuan) return;
        setLoading(true);
        setError(null);
        setRute(null);
        onRuteClear();

        try {
            const res = await fetch(
                `/rute/cari-rute?dari=${asal.id}&ke=${tujuan.id}`,
            );
            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? 'Terjadi kesalahan.');
            } else {
                setRute(data.rute);
                onRuteFound(data.rute);
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

    const intermediate = rute ? rute.slice(1, -1) : [];
    const stopsToShow = showAllStops ? intermediate : intermediate.slice(0, 6);

    return (
        <div className="border-b border-stone-100 bg-white px-[max(24px,calc(50%-576px))] py-8">
            <div className="mb-5 flex items-center gap-2">
                <IconRoute size={16} className="text-emerald-700" />
                <h2 className="text-sm font-semibold text-stone-700">
                    Rencanakan Perjalanan
                </h2>
                <span className="text-xs text-stone-400">
                    — cari rute kereta dari stasiun ke stasiun
                </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <KotaStasiunPicker
                    label="Stasiun Asal"
                    value={asal}
                    onChange={(s) => {
                        setAsal(s);
                        resetRute();
                    }}
                    semuaKota={semuaKota}
                />
                <div className="hidden shrink-0 items-center pb-1 sm:flex">
                    <IconArrowRight size={16} className="text-stone-300" />
                </div>
                <KotaStasiunPicker
                    label="Stasiun Tujuan"
                    value={tujuan}
                    onChange={(s) => {
                        setTujuan(s);
                        resetRute();
                    }}
                    semuaKota={semuaKota}
                />
                <button
                    onClick={handleCari}
                    disabled={!asal || !tujuan || loading}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? (
                        <IconLoader2 size={15} className="animate-spin" />
                    ) : (
                        <IconSearch size={15} />
                    )}
                    Cari Rute
                </button>
            </div>

            {error && (
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {rute && rute.length >= 2 && (
                <div className="mt-6 animate-[fadeIn_0.25s_ease_both]">
                    <div className="mb-4 flex items-center gap-3 text-sm">
                        <span className="font-semibold text-stone-800">
                            {rute[0].nama}
                        </span>
                        <div className="flex flex-1 items-center gap-1.5">
                            <div className="h-px flex-1 bg-stone-200" />
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                {rute.length} stasiun
                            </span>
                            <div className="h-px flex-1 bg-stone-200" />
                        </div>
                        <span className="font-semibold text-stone-800">
                            {rute[rute.length - 1].nama}
                        </span>
                    </div>

                    <div className="mb-5 grid grid-cols-2 gap-3">
                        {(
                            [
                                {
                                    s: rute[0],
                                    label: 'Keberangkatan',
                                    color: '#047857',
                                },
                                {
                                    s: rute[rute.length - 1],
                                    label: 'Tujuan Akhir',
                                    color: '#b45309',
                                },
                            ] as const
                        ).map(({ s, label, color }) => (
                            <div
                                key={s.id}
                                className="overflow-hidden rounded-2xl border border-stone-100"
                            >
                                <div
                                    className="h-1 w-full"
                                    style={{ background: color }}
                                />
                                <div className="p-4">
                                    <p
                                        className="mb-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase"
                                        style={{ color }}
                                    >
                                        {label}
                                    </p>
                                    <p className="text-sm leading-snug font-semibold text-stone-800">
                                        {s.nama}
                                    </p>
                                    <p className="font-mono text-xs text-stone-400">
                                        {s.kode_stasiun}
                                    </p>
                                    <p className="mt-1 text-xs text-stone-500">
                                        {s.kota.nama}
                                    </p>
                                    {s.destinasi_count != null &&
                                        s.destinasi_count > 0 && (
                                            <p className="mt-1 text-xs text-stone-400">
                                                {s.destinasi_count} destinasi
                                            </p>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {intermediate.length > 0 && (
                        <div>
                            <p className="mb-2.5 text-[10px] font-semibold tracking-[0.1em] text-stone-400 uppercase">
                                {intermediate.length} Pemberhentian
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {stopsToShow.map((s, i) => (
                                    <div
                                        key={s.id}
                                        className="flex animate-[fadeIn_0.2s_ease_both] items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-2.5 py-1.5 text-xs"
                                        style={{
                                            animationDelay: `${Math.min(i, 12) * 25}ms`,
                                        }}
                                    >
                                        <span className="font-mono text-[10px] text-stone-400">
                                            {i + 2}
                                        </span>
                                        <span className="font-medium text-stone-700">
                                            {s.nama}
                                        </span>
                                        <span className="font-mono text-[10px] text-stone-400">
                                            {s.kode_stasiun}
                                        </span>
                                    </div>
                                ))}
                                {intermediate.length > 6 && (
                                    <button
                                        onClick={() =>
                                            setShowAllStops((v) => !v)
                                        }
                                        className="flex items-center gap-1 rounded-lg border border-dashed border-stone-200 px-2.5 py-1.5 text-xs text-stone-500 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                    >
                                        <IconChevronDown
                                            size={12}
                                            className={`transition-transform duration-200 ${showAllStops ? 'rotate-180' : ''}`}
                                        />
                                        {showAllStops
                                            ? 'Sembunyikan'
                                            : `+${intermediate.length - 6} stasiun lainnya`}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleHapus}
                        className="mt-4 text-xs text-stone-400 underline transition-colors hover:text-stone-600"
                    >
                        Hapus rencana
                    </button>
                </div>
            )}
        </div>
    );
}

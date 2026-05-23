import { router } from '@inertiajs/react';
import { IconChevronDown } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import SearchBar from '@/components/fragments/Destinasi/SearchBar';
import type { Kota } from '@/types';

interface Filter {
    kata_kunci?: string;
    kota_id?: string;
    stasiun_id?: string;
    kategori?: string;
    urut?: string;
    min_rating?: string;
    harga?: string;
}

interface DestinasiFilterProps {
    semuaKota: Kota[];
    filter: Filter;
}

const KATEGORI_OPTIONS = [
    { value: '', label: 'Semua Kategori' },
    { value: 'Wisata', label: 'Wisata' },
    { value: 'Kuliner', label: 'Kuliner' },
    { value: 'UMKM', label: 'UMKM' },
];

const URUT_OPTIONS = [
    { value: 'rating', label: 'Rating Tertinggi' },
    { value: 'ulasan', label: 'Ulasan Terbanyak' },
    { value: 'terbaru', label: 'Terbaru' },
];

const MIN_RATING_OPTIONS = [
    { value: '', label: 'Semua Rating' },
    { value: '4.5', label: '★ 4.5+' },
    { value: '4', label: '★ 4+' },
    { value: '3', label: '★ 3+' },
    { value: '2', label: '★ 2+' },
];

const HARGA_OPTIONS = [
    { value: '', label: 'Semua Harga' },
    { value: 'gratis', label: 'Gratis' },
    { value: 'berbayar', label: 'Berbayar' },
];

function applyFilter(params: Filter) {
    const clean: Record<string, string> = {};
    if (params.kata_kunci) clean.kata_kunci = params.kata_kunci;
    if (params.kota_id) clean.kota_id = params.kota_id;
    if (params.stasiun_id) clean.stasiun_id = params.stasiun_id;
    if (params.kategori) clean.kategori = params.kategori;
    if (params.urut && params.urut !== 'rating') clean.urut = params.urut;
    if (params.min_rating) clean.min_rating = params.min_rating;
    if (params.harga) clean.harga = params.harga;
    router.get('/destinasi', clean, { preserveState: true, replace: true });
}

/* ─── Custom dropdown ─── */
interface DropdownOption {
    value: string;
    label: string;
}

function FilterDropdown({
    value,
    onChange,
    options,
    placeholder,
}: {
    value: string;
    onChange: (v: string) => void;
    options: DropdownOption[];
    placeholder: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function onDown(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, [open]);

    const selectedLabel =
        options.find((o) => o.value === value)?.label ?? placeholder;
    const isActive = !!value;

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-[7px] text-sm font-medium transition-colors ${
                    isActive
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-emerald-400 hover:text-emerald-700'
                }`}
            >
                {selectedLabel}
                <IconChevronDown
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className="absolute top-full left-0 z-50 mt-1.5 min-w-[180px] origin-top animate-[scaleIn_0.18s_ease_both] overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.16)]">
                    <div className="max-h-[280px] overflow-y-auto p-1.5">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                                    opt.value === value
                                        ? 'bg-emerald-50 font-semibold text-emerald-700'
                                        : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-700'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Main filter bar ─── */
export default function DestinasiFilter({
    semuaKota,
    filter,
}: DestinasiFilterProps) {
    const [kataKunci, setKataKunci] = useState(filter.kata_kunci ?? '');

    const hasFilter =
        !!filter.kata_kunci ||
        !!filter.kota_id ||
        !!filter.stasiun_id ||
        !!filter.kategori ||
        !!filter.urut ||
        !!filter.min_rating ||
        !!filter.harga;

    function handleKataKunci(value: string) {
        setKataKunci(value);
        applyFilter({ ...filter, kata_kunci: value });
    }

    function handleKota(kota_id: string) {
        applyFilter({ ...filter, kota_id, stasiun_id: '' });
    }

    function handleStasiun(stasiun_id: string) {
        applyFilter({ ...filter, stasiun_id });
    }

    function handleKategori(kategori: string) {
        applyFilter({ ...filter, kategori });
    }

    function handleUrut(urut: string) {
        applyFilter({ ...filter, urut });
    }

    function handleMinRating(min_rating: string) {
        applyFilter({ ...filter, min_rating });
    }

    function handleHarga(harga: string) {
        applyFilter({ ...filter, harga });
    }

    function handleReset() {
        setKataKunci('');
        router.get('/destinasi', {}, { preserveState: true, replace: true });
    }

    const selectedKota = semuaKota.find((k) => k.id === filter.kota_id);
    const stasiunOptions = selectedKota?.stasiun ?? [];

    const kotaOptions: DropdownOption[] = [
        { value: '', label: 'Semua Kota' },
        ...semuaKota.map((k) => ({ value: k.id, label: k.nama })),
    ];

    const stasiunDropdownOptions: DropdownOption[] = [
        { value: '', label: 'Semua Stasiun' },
        ...stasiunOptions.map((s) => ({ value: s.id, label: s.nama })),
    ];

    return (
        <div className="flex flex-wrap items-center gap-3">
            <SearchBar
                value={kataKunci}
                onChange={handleKataKunci}
                placeholder="Cari destinasi..."
                className="min-w-[200px] flex-1"
            />

            <FilterDropdown
                value={filter.kota_id ?? ''}
                onChange={handleKota}
                options={kotaOptions}
                placeholder="Semua Kota"
            />

            {stasiunOptions.length > 0 && (
                <FilterDropdown
                    value={filter.stasiun_id ?? ''}
                    onChange={handleStasiun}
                    options={stasiunDropdownOptions}
                    placeholder="Semua Stasiun"
                />
            )}

            <FilterDropdown
                value={filter.kategori ?? ''}
                onChange={handleKategori}
                options={KATEGORI_OPTIONS}
                placeholder="Semua Kategori"
            />

            <FilterDropdown
                value={filter.urut ?? 'rating'}
                onChange={handleUrut}
                options={URUT_OPTIONS}
                placeholder="Rating Tertinggi"
            />

            <FilterDropdown
                value={filter.min_rating ?? ''}
                onChange={handleMinRating}
                options={MIN_RATING_OPTIONS}
                placeholder="Semua Rating"
            />

            <FilterDropdown
                value={filter.harga ?? ''}
                onChange={handleHarga}
                options={HARGA_OPTIONS}
                placeholder="Semua Harga"
            />

            {hasFilter && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-medium text-stone-500 transition-colors hover:text-emerald-700"
                >
                    Reset filter
                </button>
            )}
        </div>
    );
}

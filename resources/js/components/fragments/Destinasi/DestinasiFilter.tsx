import { router } from '@inertiajs/react';
import { useState } from 'react';
import SearchBar from '@/components/fragments/Destinasi/SearchBar';
import type { Kota } from '@/types';

interface Filter {
    kata_kunci?: string;
    kota_id?: string;
    stasiun_id?: string;
    kategori?: string;
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

function applyFilter(params: Filter) {
    const clean: Record<string, string> = {};
    if (params.kata_kunci) clean.kata_kunci = params.kata_kunci;
    if (params.kota_id) clean.kota_id = params.kota_id;
    if (params.stasiun_id) clean.stasiun_id = params.stasiun_id;
    if (params.kategori) clean.kategori = params.kategori;
    router.get('/destinasi', clean, { preserveState: true, replace: true });
}

export default function DestinasiFilter({
    semuaKota,
    filter,
}: DestinasiFilterProps) {
    const [kataKunci, setKataKunci] = useState(filter.kata_kunci ?? '');

    const hasFilter =
        !!filter.kata_kunci ||
        !!filter.kota_id ||
        !!filter.stasiun_id ||
        !!filter.kategori;

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

    function handleReset() {
        setKataKunci('');
        router.get('/destinasi', {}, { preserveState: true, replace: true });
    }

    const selectedKota = semuaKota.find((k) => k.id === filter.kota_id);
    const stasiunOptions = selectedKota?.stasiun ?? [];

    return (
        <div className="flex flex-wrap items-center gap-3">
            <SearchBar
                value={kataKunci}
                onChange={handleKataKunci}
                placeholder="Cari destinasi..."
                className="min-w-[200px] flex-1"
            />

            <div className="relative">
                <select
                    value={filter.kota_id ?? ''}
                    onChange={(e) => handleKota(e.target.value)}
                    className="appearance-none rounded-xl border border-stone-200 bg-white py-2 pr-8 pl-3 text-sm text-stone-700 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                >
                    <option value="">Semua Kota</option>
                    {semuaKota.map((k) => (
                        <option key={k.id} value={k.id}>
                            {k.nama}
                        </option>
                    ))}
                </select>
            </div>

            {stasiunOptions.length > 0 && (
                <div className="relative">
                    <select
                        value={filter.stasiun_id ?? ''}
                        onChange={(e) => handleStasiun(e.target.value)}
                        className="appearance-none rounded-xl border border-stone-200 bg-white py-2 pr-8 pl-3 text-sm text-stone-700 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    >
                        <option value="">Semua Stasiun</option>
                        {stasiunOptions.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.nama}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="relative">
                <select
                    value={filter.kategori ?? ''}
                    onChange={(e) => handleKategori(e.target.value)}
                    className="appearance-none rounded-xl border border-stone-200 bg-white py-2 pr-8 pl-3 text-sm text-stone-700 transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                >
                    {KATEGORI_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

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

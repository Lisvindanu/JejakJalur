import { Head } from '@inertiajs/react';
import DestinasiFilter from '@/components/fragments/Destinasi/DestinasiFilter';
import DestinasiGrid from '@/components/fragments/Destinasi/DestinasiGrid';
import Pagination from '@/components/elements/Pagination';
import PublicLayout from '@/components/layouts/PublicLayout';
import type { Destinasi, Kota, PaginatedData } from '@/types';

interface Filter {
    kata_kunci?: string;
    kota_id?: string;
    stasiun_id?: string;
    kategori?: string;
}

interface Props {
    destinasi: PaginatedData<Destinasi>;
    semuaKota: Kota[];
    filter: Filter;
}

export default function Indeks({ destinasi, semuaKota, filter }: Props) {
    return (
        <PublicLayout>
            <Head title="Destinasi — JejakJalur" />

            {/* Page header */}
            <div className="border-b border-stone-200 bg-stone-50 px-[max(24px,calc(50%-576px))] pt-24 pb-8">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-emerald-700 uppercase">
                    Direktori
                </p>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h1
                        className="font-serif leading-tight font-normal text-stone-800"
                        style={{ fontSize: 'clamp(28px,4vw,38px)' }}
                    >
                        Jelajahi Destinasi
                    </h1>
                    <p className="text-sm text-stone-500">
                        {destinasi.total} destinasi ditemukan
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="border-b border-stone-100 bg-white px-[max(24px,calc(50%-576px))] py-4">
                <DestinasiFilter semuaKota={semuaKota} filter={filter} />
            </div>

            {/* Grid */}
            <div className="px-[max(24px,calc(50%-576px))] py-10">
                <DestinasiGrid destinasi={destinasi} />
            </div>

            {/* Pagination */}
            {destinasi.last_page > 1 && (
                <div className="px-[max(24px,calc(50%-576px))] pb-12">
                    <Pagination data={destinasi} />
                </div>
            )}
        </PublicLayout>
    );
}

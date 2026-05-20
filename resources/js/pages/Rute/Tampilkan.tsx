import { Head } from '@inertiajs/react';
import { IconTrain } from '@tabler/icons-react';
import PublicLayout from '@/components/layouts/PublicLayout';
import RuteMap from '@/components/fragments/Home/RuteMap';
import type { Kota } from '@/types';
import { MOCK_KOTA } from '@/lib/mock-data';

interface Props {
    semuaKota?: Kota[];
}

export default function Tampilkan({ semuaKota: kotaProp }: Props) {
    const semuaKota = kotaProp ?? MOCK_KOTA;
    const totalStasiun = semuaKota.reduce(
        (sum, k) => sum + k.stasiun.length,
        0,
    );

    return (
        <PublicLayout>
            <Head title="Peta Rute — JejakJalur" />

            {/* Page header */}
            <div className="border-b border-stone-200 bg-stone-50 px-[max(24px,calc(50%-576px))] pt-24 pb-8">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-emerald-700 uppercase">
                    Jaringan Kereta
                </p>
                <h1
                    className="mb-4 font-serif leading-tight font-normal text-stone-800"
                    style={{ fontSize: 'clamp(28px,4vw,38px)' }}
                >
                    Peta Rute Kereta
                </h1>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-serif text-2xl text-emerald-700">
                            {semuaKota.length}
                        </span>
                        <span className="text-sm text-stone-500">
                            kota terhubung
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-serif text-2xl text-emerald-700">
                            {totalStasiun}
                        </span>
                        <span className="text-sm text-stone-500">
                            stasiun aktif
                        </span>
                    </div>
                </div>
            </div>

            {/* Interactive Leaflet map */}
            <div className="border-b border-stone-100 bg-white px-[max(24px,calc(50%-576px))] py-8">
                <RuteMap semuaKota={semuaKota} />
            </div>

            {/* Station directory */}
            <div className="px-[max(24px,calc(50%-576px))] py-10">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {semuaKota.map((kota) => (
                        <div
                            key={kota.id}
                            className="rounded-xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-md"
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                                    <IconTrain
                                        size={16}
                                        className="text-emerald-700"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-stone-800">
                                        {kota.nama}
                                    </p>
                                    <p className="text-xs text-stone-400">
                                        {kota.kode_ibukota}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                {kota.stasiun.map((s) => (
                                    <div
                                        key={s.id}
                                        className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-1.5"
                                    >
                                        <span className="text-sm text-stone-700">
                                            {s.nama}
                                        </span>
                                        <span className="font-mono text-xs text-stone-400">
                                            {s.kode_stasiun}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}

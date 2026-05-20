import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    IconMapPin,
    IconTrain,
    IconChevronRight,
    IconChevronDown,
} from '@tabler/icons-react';
import PublicLayout from '@/components/layouts/PublicLayout';
import RuteMap from '@/components/fragments/Home/RuteMap';
import Modal from '@/components/elements/Modal';
import type { Kota, Stasiun } from '@/types';
import { MOCK_KOTA } from '@/lib/mock-data';
import { indeks as destinasiIndeks } from '@/routes/destinasi';

interface Props {
    semuaKota?: Kota[];
}

export default function Tampilkan({ semuaKota: kotaProp }: Props) {
    const semuaKota = kotaProp ?? MOCK_KOTA;
    const totalStasiun = semuaKota.reduce(
        (sum, k) => sum + k.stasiun.length,
        0,
    );
    const [kotaAktif, setKotaAktif] = useState<Kota | null>(null);
    const [tampilSemua, setTampilSemua] = useState(false);

    const LIMIT = 5;

    function tutupModal() {
        setKotaAktif(null);
        setTampilSemua(false);
    }

    function bukaStasiun(stasiun: Stasiun) {
        router.visit(
            destinasiIndeks.url({ query: { stasiun_id: stasiun.id } }),
        );
    }

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

            {/* City directory */}
            <div className="px-[max(24px,calc(50%-576px))] py-10">
                <div className="mb-5 flex items-center gap-2">
                    <IconMapPin size={16} className="text-emerald-700" />
                    <h2 className="text-sm font-semibold text-stone-700">
                        Direktori Stasiun
                    </h2>
                    <span className="text-xs text-stone-400">
                        — klik kota untuk lihat stasiun
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {semuaKota.map((kota) => (
                        <button
                            key={kota.id}
                            onClick={() => setKotaAktif(kota)}
                            className="group flex flex-col gap-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-sm"
                        >
                            <span className="text-sm font-semibold text-stone-800 group-hover:text-emerald-800">
                                {kota.nama}
                            </span>
                            <span className="text-xs text-stone-400 group-hover:text-emerald-600">
                                {kota.stasiun.length} stasiun
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal stasiun per kota */}
            <Modal
                open={kotaAktif !== null}
                onClose={tutupModal}
                title={kotaAktif ? `Stasiun di ${kotaAktif.nama}` : ''}
                size="md"
            >
                {kotaAktif && (
                    <div className="space-y-2">
                        <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                            Mau cari makan atau jalan-jalan di sekitar stasiun
                            mana?
                        </p>

                        {kotaAktif.stasiun
                            .slice(0, tampilSemua ? undefined : LIMIT)
                            .map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => bukaStasiun(s)}
                                    className="group flex w-full items-center justify-between rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm group-hover:bg-emerald-100">
                                            <IconTrain
                                                size={14}
                                                className="text-emerald-700"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-stone-800 group-hover:text-emerald-800">
                                                {s.nama}
                                            </p>
                                            <p className="font-mono text-xs text-stone-400">
                                                {s.kode_stasiun}
                                            </p>
                                        </div>
                                    </div>
                                    <IconChevronRight
                                        size={16}
                                        className="text-stone-300 group-hover:text-emerald-500"
                                    />
                                </button>
                            ))}

                        {kotaAktif.stasiun.length > LIMIT && (
                            <button
                                onClick={() => setTampilSemua((v) => !v)}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-stone-200 py-2.5 text-sm text-stone-500 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                                <IconChevronDown
                                    size={15}
                                    className={`transition-transform duration-300 ${tampilSemua ? 'rotate-180' : ''}`}
                                />
                                {tampilSemua
                                    ? 'Sembunyikan'
                                    : `Lihat ${kotaAktif.stasiun.length - LIMIT} stasiun lainnya`}
                            </button>
                        )}
                    </div>
                )}
            </Modal>
        </PublicLayout>
    );
}

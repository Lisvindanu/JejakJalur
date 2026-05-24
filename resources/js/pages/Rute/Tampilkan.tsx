import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/components/layouts/PublicLayout';
import RuteMap from '@/components/fragments/Home/RuteMap';
import PerencanaRute from '@/components/fragments/Rute/PerencanaRute';
import type { Kota, RuteSegment, StasiunRute } from '@/types';
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

    const focusDest = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const params = new URLSearchParams(window.location.search);
        const lat = parseFloat(params.get('dest_lat') ?? '');
        const lng = parseFloat(params.get('dest_lng') ?? '');
        const nama = params.get('dest_nama') ?? '';
        if (!isNaN(lat) && !isNaN(lng) && nama) return { lat, lng, nama };
        return null;
    }, []);

    const shareParams = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const p = new URLSearchParams(window.location.search);
        const dari = p.get('dari');
        const ke = p.get('ke');
        if (dari && ke) return { dari, ke };
        return null;
    }, []);

    const pageTitle = shareParams
        ? `Rute ${shareParams.dari} → ${shareParams.ke} — JejakJalur`
        : 'Peta Rute — JejakJalur';

    const pageDesc = shareParams
        ? `Lihat rute kereta dari stasiun ${shareParams.dari} ke ${shareParams.ke} di JejakJalur.`
        : 'Temukan rute kereta terbaik antar stasiun di seluruh Indonesia.';

    const [ruteAktif, setRuteAktif] = useState<StasiunRute[] | null>(null);
    const [segmentsAktif, setSegmentsAktif] = useState<RuteSegment[]>([]);

    return (
        <PublicLayout>
            <Head title={pageTitle}>
                <meta name="description" content={pageDesc} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />
            </Head>

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
                <RuteMap
                    semuaKota={semuaKota}
                    route={ruteAktif}
                    segments={segmentsAktif}
                    focusDest={focusDest}
                />
            </div>

            {/* Trip planner */}
            <PerencanaRute
                semuaKota={semuaKota}
                onRuteFound={(rute, segments) => {
                    setRuteAktif(rute);
                    setSegmentsAktif(segments);
                }}
                onRuteClear={() => {
                    setRuteAktif(null);
                    setSegmentsAktif([]);
                }}
            />
        </PublicLayout>
    );
}

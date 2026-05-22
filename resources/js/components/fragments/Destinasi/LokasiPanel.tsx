import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    IconCurrentLocation,
    IconMap,
    IconMapPin,
    IconTrain,
} from '@tabler/icons-react';
import 'leaflet/dist/leaflet.css';
import type { Destinasi } from '@/types';

interface Props {
    destinasi: Destinasi;
}

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

function formatJarak(km: number): string {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

export default function LokasiPanel({ destinasi }: Props) {
    const mapRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leafletMap = useRef<any>(null);
    const [jarakDariSaya, setJarakDariSaya] = useState<number | null>(null);
    const [loadingGps, setLoadingGps] = useState(false);
    const [gpsError, setGpsError] = useState<string | null>(null);

    const destLat = destinasi.lat;
    const destLng = destinasi.lng;
    const stasiunLat = destinasi.stasiun.lat;
    const stasiunLng = destinasi.stasiun.lng;

    const jarakStasiun =
        destLat && destLng && stasiunLat && stasiunLng
            ? haversine(stasiunLat, stasiunLng, destLat, destLng)
            : null;

    // Inisialisasi Leaflet map
    useEffect(() => {
        if (!mapRef.current || leafletMap.current) return;
        if (!destLat || !destLng) return;

        import('leaflet').then((L) => {
            // Fix default icon
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl:
                    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl:
                    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl:
                    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            const map = L.map(mapRef.current!, {
                zoomControl: true,
                scrollWheelZoom: false,
            });
            leafletMap.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
            }).addTo(map);

            // Pin destinasi
            const destIcon = L.divIcon({
                html: `<div style="background:#065f46;color:#fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"/></svg></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                className: '',
            });
            L.marker([destLat, destLng], { icon: destIcon })
                .addTo(map)
                .bindPopup(`<b>${destinasi.nama}</b><br>${destinasi.alamat}`);

            const bounds: [number, number][] = [[destLat, destLng]];

            // Pin stasiun
            if (stasiunLat && stasiunLng) {
                const stasiunIcon = L.divIcon({
                    html: `<div style="background:#1e40af;color:#fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l1 1h16l1 -1v-9l-1 -3h-16l-1 3z"/><path d="M3 8h18"/><path d="M9 8v8"/><path d="M15 8v8"/><path d="M9 17l-2 3"/><path d="M15 17l2 3"/></svg></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                    className: '',
                });
                L.marker([stasiunLat, stasiunLng], { icon: stasiunIcon })
                    .addTo(map)
                    .bindPopup(`<b>Stasiun ${destinasi.stasiun.nama}</b>`);
                bounds.push([stasiunLat, stasiunLng]);

                // Garis dari stasiun ke destinasi
                L.polyline(
                    [
                        [stasiunLat, stasiunLng],
                        [destLat, destLng],
                    ],
                    {
                        color: '#065f46',
                        weight: 2,
                        dashArray: '6 4',
                        opacity: 0.7,
                    },
                ).addTo(map);
            }

            map.fitBounds(bounds, { padding: [40, 40] });
        });

        return () => {
            leafletMap.current?.remove();
            leafletMap.current = null;
        };
    }, [destLat, destLng, stasiunLat, stasiunLng]); // eslint-disable-line react-hooks/exhaustive-deps

    function cekJarakDariSaya() {
        if (!destLat || !destLng) return;
        setLoadingGps(true);
        setGpsError(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const jarak = haversine(
                    pos.coords.latitude,
                    pos.coords.longitude,
                    destLat,
                    destLng,
                );
                setJarakDariSaya(jarak);
                setLoadingGps(false);

                // Tambah pin lokasi saya ke map
                if (leafletMap.current) {
                    import('leaflet').then((L) => {
                        const myIcon = L.divIcon({
                            html: `<div style="background:#7c3aed;color:#fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"/><path d="M12 2l0 2"/><path d="M12 20l0 2"/><path d="M20 12l2 0"/><path d="M2 12l2 0"/></svg></div>`,
                            iconSize: [30, 30],
                            iconAnchor: [15, 30],
                            className: '',
                        });
                        L.marker([pos.coords.latitude, pos.coords.longitude], {
                            icon: myIcon,
                        })
                            .addTo(leafletMap.current)
                            .bindPopup('<b>Lokasi Saya</b>')
                            .openPopup();
                    });
                }
            },
            (err) => {
                setLoadingGps(false);
                setGpsError(
                    err.code === 1
                        ? 'Izin lokasi ditolak.'
                        : 'Gagal mendapatkan lokasi.',
                );
            },
            { enableHighAccuracy: true, timeout: 10000 },
        );
    }

    if (!destLat || !destLng) {
        // Fallback: belum ada koordinat, tampilkan link maps saja
        return (
            <div className="rounded-xl border border-stone-100 bg-white p-5">
                <h2 className="mb-3 text-sm font-semibold text-stone-800">
                    Lokasi &amp; Akses
                </h2>
                <p className="mb-3 flex items-center gap-1.5 text-sm text-stone-500">
                    <IconMapPin size={15} className="shrink-0 text-stone-400" />
                    {destinasi.alamat}
                </p>
                <Link
                    href="/rute"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
                >
                    <IconMap size={14} />
                    Lihat Peta Rute
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-stone-100 bg-white">
            <div className="p-5 pb-3">
                <h2 className="mb-1 text-sm font-semibold text-stone-800">
                    Lokasi &amp; Akses
                </h2>
                <p className="flex items-center gap-1.5 text-xs text-stone-400">
                    <IconMapPin size={13} className="shrink-0" />
                    {destinasi.alamat}
                </p>
            </div>

            {/* Map — relative z-0 isolates Leaflet's internal z-indexes from the navbar */}
            <div className="relative z-0 w-full">
                <div ref={mapRef} style={{ height: 260 }} className="w-full" />
            </div>

            {/* Info + actions */}
            <div className="flex flex-wrap items-center gap-3 p-4">
                {/* Jarak dari stasiun */}
                {jarakStasiun !== null && (
                    <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm">
                        <IconTrain
                            size={15}
                            className="shrink-0 text-blue-600"
                        />
                        <span className="text-stone-600">
                            Dari Stasiun {destinasi.stasiun.nama}:{' '}
                            <span className="font-semibold text-blue-700">
                                {formatJarak(jarakStasiun)}
                            </span>
                        </span>
                    </div>
                )}

                {/* Jarak dari saya */}
                {jarakDariSaya !== null && (
                    <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm">
                        <IconCurrentLocation
                            size={15}
                            className="shrink-0 text-purple-600"
                        />
                        <span className="text-stone-600">
                            Dari lokasi saya:{' '}
                            <span className="font-semibold text-purple-700">
                                {formatJarak(jarakDariSaya)}
                            </span>
                        </span>
                    </div>
                )}

                <div className="ml-auto flex items-center gap-2">
                    {/* GPS button */}
                    <button
                        onClick={cekJarakDariSaya}
                        disabled={loadingGps}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 disabled:opacity-50"
                    >
                        <IconCurrentLocation size={13} />
                        {loadingGps ? 'Mendeteksi...' : 'Jarak dari Saya'}
                    </button>

                    {/* Peta Rute */}
                    <Link
                        href={`/rute?dest_lat=${destLat}&dest_lng=${destLng}&dest_nama=${encodeURIComponent(destinasi.nama)}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-800"
                    >
                        <IconMap size={13} />
                        Peta Rute
                    </Link>
                </div>

                {gpsError && (
                    <p className="w-full text-xs text-red-500">{gpsError}</p>
                )}
            </div>
        </div>
    );
}

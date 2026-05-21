import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import 'leaflet/dist/leaflet.css';
import { IconTrain, IconX } from '@tabler/icons-react';
import type { Kota, RuteSegment, Stasiun, StasiunRute } from '@/types';

interface FocusDest {
    lat: number;
    lng: number;
    nama: string;
}

interface Props {
    semuaKota: Kota[];
    route?: StasiunRute[] | null;
    segments?: RuteSegment[];
    focusDest?: FocusDest | null;
}

interface SelectedStation {
    kota: Kota;
    stasiun: Stasiun;
    warna: string;
}

const WARNA_KOTA = [
    '#047857',
    '#dc2626',
    '#7c3aed',
    '#0369a1',
    '#92400e',
    '#b45309',
    '#059669',
    '#d97706',
    '#be123c',
    '#0e7490',
    '#4f46e5',
    '#65a30d',
    '#c2410c',
    '#7e22ce',
    '#0f766e',
];

export default function RuteMap({ semuaKota, route, segments, focusDest }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markersRef = useRef<
        Array<{ marker: any; kota: Kota; stasiun: Stasiun; orig: any }>
    >([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedMarkerRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routePolylineRef = useRef<any>(null);
    const [selected, setSelected] = useState<SelectedStation | null>(null);
    const focusDestRef = useRef<FocusDest | null>(null);
    focusDestRef.current = focusDest ?? null;

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        let cancelled = false;
        markersRef.current = [];

        import('leaflet').then((mod) => {
            if (cancelled) return;
            const L = mod.default ?? mod;

            const allCoords: [number, number][] = semuaKota.flatMap((k) =>
                k.stasiun
                    .filter((s) => s.lat && s.lng)
                    .map(
                        (s) =>
                            [parseFloat(s.lat!), parseFloat(s.lng!)] as [
                                number,
                                number,
                            ],
                    ),
            );

            const center: [number, number] =
                allCoords.length > 0
                    ? [
                          allCoords.reduce((s, c) => s + c[0], 0) /
                              allCoords.length,
                          allCoords.reduce((s, c) => s + c[1], 0) /
                              allCoords.length,
                      ]
                    : [-7.3, 110.0];

            const map = L.map(containerRef.current!, { center, zoom: 7 });

            const street = L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution:
                        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 19,
                },
            );
            const terrain = L.tileLayer(
                'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                {
                    attribution:
                        '© <a href="https://opentopomap.org">OpenTopoMap</a>',
                    maxZoom: 17,
                },
            );
            const satellite = L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution: '© <a href="https://www.esri.com">Esri</a>',
                    maxZoom: 19,
                },
            );
            const railwayOverlay = L.tileLayer(
                'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
                {
                    attribution:
                        'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | ' +
                        'Railway style: © <a href="https://www.openrailwaymap.org">OpenRailwayMap</a> (CC-BY-SA)',
                    maxZoom: 19,
                    opacity: 0.85,
                },
            );

            street.addTo(map);
            railwayOverlay.addTo(map);
            L.control
                .layers(
                    { Jalan: street, Terrain: terrain, Satelit: satellite },
                    { 'Jalur Kereta': railwayOverlay },
                    { position: 'topright' },
                )
                .addTo(map);

            semuaKota.forEach((kota, idx) => {
                const warna = WARNA_KOTA[idx % WARNA_KOTA.length];

                kota.stasiun.forEach((s, sIdx) => {
                    if (!s.lat || !s.lng) return;
                    const lat = parseFloat(s.lat);
                    const lng = parseFloat(s.lng);
                    if (isNaN(lat) || isNaN(lng)) return;

                    const isHub = sIdx === 0;
                    const orig = {
                        radius: isHub ? 8 : 5,
                        fillColor: warna,
                        color: '#fff',
                        weight: isHub ? 2.5 : 1.5,
                        opacity: 1,
                        fillOpacity: isHub ? 1 : 0.8,
                    };

                    const marker = L.circleMarker([lat, lng], {
                        ...orig,
                        interactive: true,
                    }).addTo(map);
                    markersRef.current.push({ marker, kota, stasiun: s, orig });

                    marker.on('click', () => {
                        /* Reset previously highlighted marker */
                        if (selectedMarkerRef.current) {
                            const prev = markersRef.current.find(
                                (e) => e.marker === selectedMarkerRef.current,
                            );
                            if (prev) prev.marker.setStyle(prev.orig);
                        }
                        /* Highlight this marker */
                        marker.setStyle({
                            radius: isHub ? 11 : 8,
                            fillColor: warna,
                            color: '#fff',
                            weight: 3,
                            fillOpacity: 1,
                        });
                        marker.bringToFront();
                        selectedMarkerRef.current = marker;
                        setSelected({ kota, stasiun: s, warna });
                    });
                });
            });

            mapRef.current = map;

            // Pin + zoom ke destinasi jika datang dari halaman detail
            const fd = focusDestRef.current;
            if (fd) {
                const destPinIcon = L.divIcon({
                    html: `<div style="background:#065f46;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid #fff;box-shadow:0 2px 12px rgba(0,0,0,.35)">📍</div>`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    className: '',
                });
                L.marker([fd.lat, fd.lng], { icon: destPinIcon })
                    .addTo(map)
                    .bindPopup(`<b>${fd.nama}</b>`)
                    .openPopup();
                map.setView([fd.lat, fd.lng], 14);
            }
        });

        return () => {
            cancelled = true;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [semuaKota]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        import('leaflet').then((mod) => {
            const L = mod.default ?? mod;

            if (routePolylineRef.current) {
                routePolylineRef.current.remove();
                routePolylineRef.current = null;
            }

            if (!route || route.length === 0) {
                markersRef.current.forEach(({ marker, orig }) =>
                    marker.setStyle(orig),
                );
                return;
            }

            const routeIds = new Set(route.map((s) => s.id));

            markersRef.current.forEach(({ marker, orig, stasiun }) => {
                if (routeIds.has(stasiun.id)) {
                    marker.setStyle({
                        ...orig,
                        radius: orig.radius + 3,
                        opacity: 1,
                        fillOpacity: 1,
                    });
                    marker.bringToFront();
                } else {
                    marker.setStyle({
                        ...orig,
                        opacity: 0.12,
                        fillOpacity: 0.08,
                    });
                }
            });

            // Build polyline coords: prefer GeoJSON geometry per segment (ikut lengkungan
            // rel asli), fallback ke straight-line antar stasiun kalau geometry null.
            const coords: [number, number][] = [];
            const stasiunCoord = (s: StasiunRute): [number, number] | null =>
                s.lat && s.lng
                    ? [parseFloat(s.lat), parseFloat(s.lng)]
                    : null;

            for (let i = 0; i < route.length - 1; i++) {
                const seg = segments?.[i];
                const geomCoords = seg?.geometry?.coordinates;
                if (geomCoords && geomCoords.length >= 2) {
                    // GeoJSON: [lng, lat] → Leaflet: [lat, lng]
                    for (let j = 0; j < geomCoords.length; j++) {
                        if (i > 0 && j === 0) continue; // skip duplicate join point
                        const [lng, lat] = geomCoords[j];
                        coords.push([lat, lng]);
                    }
                } else {
                    // Fallback straight-line
                    const a = stasiunCoord(route[i]);
                    const b = stasiunCoord(route[i + 1]);
                    if (a && (coords.length === 0 || coords[coords.length - 1][0] !== a[0] || coords[coords.length - 1][1] !== a[1])) {
                        coords.push(a);
                    }
                    if (b) coords.push(b);
                }
            }

            if (coords.length >= 2) {
                const polyline = L.polyline(coords, {
                    color: '#047857',
                    weight: 4,
                    opacity: 0.8,
                }).addTo(map);
                routePolylineRef.current = polyline;
                map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
            }
        });
    }, [route, segments]);

    function handleClose() {
        if (selectedMarkerRef.current) {
            const prev = markersRef.current.find(
                (e) => e.marker === selectedMarkerRef.current,
            );
            if (prev) prev.marker.setStyle(prev.orig);
            selectedMarkerRef.current = null;
        }
        setSelected(null);
    }

    return (
        <div className="isolate overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-stone-100 bg-white px-5 py-3 text-xs text-stone-500">
                <span className="inline-block h-0.5 w-5 rounded-full bg-emerald-700" />
                <span>
                    Jalur KAI — data real dari OpenRailwayMap &amp;
                    OpenStreetMap
                </span>
                <span className="ml-auto text-stone-400">
                    Klik marker stasiun untuk detail
                </span>
            </div>

            {/* Map + overlay panel */}
            <div className="relative" style={{ height: '520px' }}>
                <div ref={containerRef} className="h-full w-full" />

                {/* Station info panel — React overlay, avoids Leaflet popup clipping */}
                {selected && (
                    <div className="absolute right-3 bottom-10 z-[500] w-56 origin-bottom-right animate-[scaleIn_0.18s_ease_both] overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                        <div
                            className="h-1 w-full"
                            style={{ background: selected.warna }}
                        />
                        <div className="p-4">
                            <div className="mb-3 flex items-start justify-between">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                                    style={{
                                        background: selected.warna + '20',
                                    }}
                                >
                                    <IconTrain
                                        size={15}
                                        style={{ color: selected.warna }}
                                    />
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="flex h-6 w-6 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                                >
                                    <IconX size={13} />
                                </button>
                            </div>

                            <p
                                className="mb-0.5 text-[10px] font-semibold tracking-[0.1em] uppercase"
                                style={{ color: selected.warna }}
                            >
                                {selected.kota.nama}
                            </p>
                            <p className="mb-0.5 text-sm leading-tight font-semibold text-stone-800">
                                {selected.stasiun.nama}
                            </p>
                            <p className="mb-3 font-mono text-xs text-stone-400">
                                {selected.stasiun.kode_stasiun}
                            </p>

                            {selected.stasiun.destinasi_count != null && (
                                <p className="mb-3 text-xs text-stone-500">
                                    <span className="font-semibold text-stone-700">
                                        {selected.stasiun.destinasi_count}
                                    </span>{' '}
                                    destinasi tersedia
                                </p>
                            )}

                            <Link
                                href={`/destinasi?stasiun_id=${selected.stasiun.id}`}
                                className="flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold text-white no-underline transition-opacity hover:opacity-90"
                                style={{ background: selected.warna }}
                            >
                                Lihat destinasi
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-100 bg-stone-50 px-5 py-2 text-xs text-stone-400">
                Ganti tampilan: gunakan kontrol di kanan atas (Jalan / Terrain /
                Satelit). Jalur Kereta dapat diaktifkan/nonaktifkan.
            </div>
        </div>
    );
}

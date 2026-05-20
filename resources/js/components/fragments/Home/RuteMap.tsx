import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Kota } from '@/types';

interface Props {
    semuaKota: Kota[];
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

export default function RuteMap({ semuaKota }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        let cancelled = false;

        import('leaflet').then((mod) => {
            if (cancelled) return;
            const L = mod.default ?? mod;

            /* Compute map center from station coordinates */
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

            const map = L.map(containerRef.current!, {
                center,
                zoom: 7,
            });

            /* Base layers */
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

            /* OpenRailwayMap overlay — accurate real-time railway geometry from OSM */
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

            terrain.addTo(map);
            railwayOverlay.addTo(map);

            L.control
                .layers(
                    { Jalan: street, Terrain: terrain, Satelit: satellite },
                    { 'Jalur Kereta': railwayOverlay },
                    { position: 'topright' },
                )
                .addTo(map);

            /* Station markers */
            semuaKota.forEach((kota, idx) => {
                const warna = WARNA_KOTA[idx % WARNA_KOTA.length];

                kota.stasiun.forEach((s, sIdx) => {
                    if (!s.lat || !s.lng) return;

                    const lat = parseFloat(s.lat);
                    const lng = parseFloat(s.lng);
                    if (isNaN(lat) || isNaN(lng)) return;

                    const isHub = sIdx === 0;

                    L.circleMarker([lat, lng], {
                        radius: isHub ? 8 : 5,
                        fillColor: warna,
                        color: '#fff',
                        weight: isHub ? 2.5 : 1.5,
                        opacity: 1,
                        fillOpacity: isHub ? 1 : 0.8,
                    })
                        .bindPopup(
                            `<div style="min-width:140px;font-family:system-ui">
                                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:${warna};text-transform:uppercase;letter-spacing:0.07em">${kota.nama}</p>
                                <p style="margin:0;font-size:13px;font-weight:600;color:#1c1917">${s.nama}</p>
                                <p style="margin:3px 0 0;font-size:11px;color:#78716c;font-family:monospace">${s.kode_stasiun}</p>
                                <p style="margin:4px 0 0;font-size:10px;color:#a8a29e">${lat.toFixed(4)}°, ${lng.toFixed(4)}°</p>
                            </div>`,
                        )
                        .addTo(map);
                });
            });

            mapRef.current = map;
        });

        return () => {
            cancelled = true;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [semuaKota]);

    return (
        <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-100 bg-white px-5 py-3 text-xs text-stone-500">
                <span className="inline-block h-0.5 w-5 rounded-full bg-emerald-700" />
                <span>
                    Jalur KAI — data real dari OpenRailwayMap &amp;
                    OpenStreetMap
                </span>
                <span className="ml-auto text-stone-400">
                    Klik stasiun untuk detail
                </span>
            </div>

            <div
                ref={containerRef}
                style={{ height: '520px', width: '100%' }}
            />

            <div className="border-t border-stone-100 bg-stone-50 px-5 py-2 text-xs text-stone-400">
                Ganti tampilan: gunakan kontrol di kanan atas (Jalan / Terrain /
                Satelit). Jalur Kereta dapat diaktifkan/nonaktifkan.
            </div>
        </div>
    );
}

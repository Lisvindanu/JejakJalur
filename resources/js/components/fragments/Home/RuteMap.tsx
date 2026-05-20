import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

/* ── Station coordinate data ── */
const DATA_KOTA = {
    jakarta: {
        nama: 'Jakarta',
        warna: '#047857',
        stasiun: [
            { nama: 'Gambir', koordinat: [-6.1767, 106.8306] as [number, number] },
            { nama: 'Pasar Senen', koordinat: [-6.1708, 106.84] as [number, number] },
            { nama: 'Jakarta Kota', koordinat: [-6.1376, 106.8146] as [number, number] },
            { nama: 'Manggarai', koordinat: [-6.2098, 106.8503] as [number, number] },
            { nama: 'Tanah Abang', koordinat: [-6.2023, 106.8197] as [number, number] },
        ],
    },
    bogor: {
        nama: 'Bogor',
        warna: '#dc2626',
        stasiun: [
            { nama: 'Bogor', koordinat: [-6.5948, 106.7893] as [number, number] },
            { nama: 'Bogor Paledang', koordinat: [-6.6015, 106.7925] as [number, number] },
            { nama: 'Cilebut', koordinat: [-6.5317, 106.8005] as [number, number] },
            { nama: 'Bojonggede', koordinat: [-6.4925, 106.7946] as [number, number] },
        ],
    },
    bandung: {
        nama: 'Bandung',
        warna: '#7c3aed',
        stasiun: [
            { nama: 'Bandung (Hall)', koordinat: [-6.9147, 107.6098] as [number, number] },
            { nama: 'Kiaracondong', koordinat: [-6.9248, 107.6463] as [number, number] },
            { nama: 'Cimahi', koordinat: [-6.8858, 107.5361] as [number, number] },
            { nama: 'Padalarang', koordinat: [-6.843, 107.4973] as [number, number] },
        ],
    },
    cirebon: {
        nama: 'Cirebon',
        warna: '#0369a1',
        stasiun: [
            { nama: 'Cirebon (Kejaksan)', koordinat: [-6.7053, 108.5554] as [number, number] },
            { nama: 'Cirebon Prujakan', koordinat: [-6.7148, 108.5614] as [number, number] },
            { nama: 'Arjawinangun', koordinat: [-6.6433, 108.4172] as [number, number] },
        ],
    },
    purwokerto: {
        nama: 'Purwokerto',
        warna: '#92400e',
        stasiun: [
            { nama: 'Purwokerto', koordinat: [-7.4191, 109.2215] as [number, number] },
            { nama: 'Kranji', koordinat: [-7.4245, 109.2312] as [number, number] },
            { nama: 'Notog', koordinat: [-7.4878, 109.2256] as [number, number] },
        ],
    },
    semarang: {
        nama: 'Semarang',
        warna: '#047857',
        stasiun: [
            { nama: 'Semarang Tawang', koordinat: [-6.9644, 110.4277] as [number, number] },
            { nama: 'Semarang Poncol', koordinat: [-6.9722, 110.4149] as [number, number] },
            { nama: 'Alastua', koordinat: [-6.9882, 110.4851] as [number, number] },
        ],
    },
    yogyakarta: {
        nama: 'Yogyakarta',
        warna: '#b45309',
        stasiun: [
            { nama: 'Yogyakarta (Tugu)', koordinat: [-7.7891, 110.3634] as [number, number] },
            { nama: 'Lempuyangan', koordinat: [-7.7901, 110.3752] as [number, number] },
            { nama: 'Maguwo', koordinat: [-7.7846, 110.4323] as [number, number] },
        ],
    },
    solo: {
        nama: 'Solo',
        warna: '#b45309',
        stasiun: [
            { nama: 'Solo Balapan', koordinat: [-7.5568, 110.8217] as [number, number] },
            { nama: 'Solo Jebres', koordinat: [-7.5612, 110.8407] as [number, number] },
            { nama: 'Purwosari', koordinat: [-7.5684, 110.7954] as [number, number] },
        ],
    },
    surabaya: {
        nama: 'Surabaya',
        warna: '#047857',
        stasiun: [
            { nama: 'Surabaya Gubeng', koordinat: [-7.2654, 112.7519] as [number, number] },
            { nama: 'Surabaya Pasar Turi', koordinat: [-7.2476, 112.7302] as [number, number] },
            { nama: 'Surabaya Kota (Semut)', koordinat: [-7.2423, 112.7431] as [number, number] },
        ],
    },
    malang: {
        nama: 'Malang',
        warna: '#ea580c',
        stasiun: [
            { nama: 'Malang (Kotabaru)', koordinat: [-7.9776, 112.637] as [number, number] },
            { nama: 'Malang Kotalama', koordinat: [-7.9942, 112.6309] as [number, number] },
            { nama: 'Blimbing', koordinat: [-7.9392, 112.6425] as [number, number] },
        ],
    },
} as const;

/* ── Fallback straight lines (used if Overpass fetch fails) ── */
const JALUR_FALLBACK: { id: string; nama: string; warna: string; coords: [number, number][] }[] = [
    { id: 'pantura', nama: 'Jalur Utara (Pantura)', warna: '#047857', coords: [[-6.1767, 106.8306], [-6.7053, 108.5554], [-6.9644, 110.4277], [-7.2476, 112.7302]] },
    { id: 'selatan', nama: 'Jalur Selatan', warna: '#b45309', coords: [[-6.9147, 107.6098], [-7.4191, 109.2215], [-7.7891, 110.3634], [-7.5568, 110.8217], [-7.2654, 112.7519]] },
    { id: 'jkt-bdg', nama: 'Jakarta–Bandung', warna: '#7c3aed', coords: [[-6.1767, 106.8306], [-6.843, 107.4973], [-6.9147, 107.6098]] },
    { id: 'krl-bogor', nama: 'KRL Jakarta–Bogor', warna: '#dc2626', coords: [[-6.1376, 106.8146], [-6.2098, 106.8503], [-6.4925, 106.7946], [-6.5948, 106.7893]] },
    { id: 'crb-pwt', nama: 'Cirebon–Purwokerto', warna: '#0369a1', coords: [[-6.7053, 108.5554], [-7.4191, 109.2215]] },
    { id: 'smg-solo', nama: 'Semarang–Solo', warna: '#059669', coords: [[-6.9644, 110.4277], [-7.5568, 110.8217]] },
    { id: 'solo-ygy', nama: 'Solo–Yogyakarta', warna: '#d97706', coords: [[-7.5568, 110.8217], [-7.7891, 110.3634]] },
    { id: 'sby-mlg', nama: 'Surabaya–Malang', warna: '#ea580c', coords: [[-7.2654, 112.7519], [-7.9776, 112.637]] },
];

/* Overpass QL — main + branch railway ways in Java, no service tracks */
const OVERPASS_QUERY = `[out:json][timeout:30];
(
  way["railway"="rail"]["usage"~"^(main|branch)$"](-8.8,105.0,-5.8,115.5);
  way["railway"="rail"][!"usage"][!"service"](-8.8,105.0,-5.8,115.5);
);
out geom;`;

type TrackStatus = 'loading' | 'loaded' | 'fallback';

export default function RuteMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);
    const [trackStatus, setTrackStatus] = useState<TrackStatus>('loading');

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        let cancelled = false;

        import('leaflet').then((mod) => {
            if (cancelled) return;
            const L = mod.default ?? mod;

            const map = L.map(containerRef.current!, {
                center: [-7.3, 110.0],
                zoom: 7,
            });

            const street = L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 19,
                },
            );

            const terrain = L.tileLayer(
                'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                {
                    attribution: '© <a href="https://opentopomap.org">OpenTopoMap</a>',
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

            terrain.addTo(map);
            L.control
                .layers({ Jalan: street, Terrain: terrain, Satelit: satellite }, {}, { position: 'topright' })
                .addTo(map);

            /* ── Fetch real railway geometry from Overpass API ── */
            fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'data=' + encodeURIComponent(OVERPASS_QUERY),
            })
                .then((r) => r.json())
                .then((data: { elements: { geometry?: { lat: number; lon: number }[] }[] }) => {
                    if (cancelled) return;
                    let drawn = 0;
                    data.elements.forEach((way) => {
                        if (!way.geometry || way.geometry.length < 2) return;
                        const coords: [number, number][] = way.geometry.map((pt) => [pt.lat, pt.lon]);
                        L.polyline(coords, {
                            color: '#047857',
                            weight: 3,
                            opacity: 0.85,
                            interactive: false,
                        }).addTo(map);
                        drawn++;
                    });
                    if (!cancelled) setTrackStatus(drawn > 0 ? 'loaded' : 'fallback');
                    if (drawn === 0) drawFallback(L, map);
                })
                .catch(() => {
                    if (cancelled) return;
                    drawFallback(L, map);
                    setTrackStatus('fallback');
                });

            /* ── Station markers ── */
            Object.values(DATA_KOTA).forEach((kota) => {
                kota.stasiun.forEach((s, idx) => {
                    const isHub = idx === 0;
                    L.circleMarker(s.koordinat, {
                        radius: isHub ? 8 : 5,
                        fillColor: kota.warna,
                        color: '#fff',
                        weight: isHub ? 2.5 : 1.5,
                        opacity: 1,
                        fillOpacity: isHub ? 1 : 0.8,
                    })
                        .bindPopup(
                            `<div style="min-width:140px;font-family:system-ui">
                                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:${kota.warna};text-transform:uppercase;letter-spacing:0.07em">${kota.nama}</p>
                                <p style="margin:0;font-size:13px;font-weight:600;color:#1c1917">${s.nama}</p>
                                <p style="margin:5px 0 0;font-size:10px;color:#a8a29e">${s.koordinat[0].toFixed(4)}°, ${s.koordinat[1].toFixed(4)}°</p>
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
    }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
            {/* Status bar */}
            <div className="flex items-center gap-2 border-b border-stone-100 bg-white px-5 py-3 text-xs text-stone-500">
                {trackStatus === 'loading' && (
                    <>
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        Memuat jalur kereta dari OpenStreetMap…
                    </>
                )}
                {trackStatus === 'loaded' && (
                    <>
                        <span className="inline-block h-0.5 w-5 rounded-full bg-emerald-700" />
                        <span>Jalur KAI — geometri real dari OpenStreetMap</span>
                        <span className="ml-auto text-stone-400">Klik stasiun untuk detail</span>
                    </>
                )}
                {trackStatus === 'fallback' && (
                    <>
                        <span className="inline-block h-0.5 w-5 rounded-full bg-stone-400" />
                        <span>Menampilkan jalur perkiraan (Overpass tidak tersedia)</span>
                        <span className="ml-auto text-stone-400">Klik stasiun untuk detail</span>
                    </>
                )}
            </div>

            {/* Leaflet map */}
            <div ref={containerRef} style={{ height: '520px', width: '100%' }} />

            <div className="border-t border-stone-100 bg-stone-50 px-5 py-2 text-xs text-stone-400">
                Ganti tampilan: gunakan kontrol di kanan atas (Jalan / Terrain / Satelit).
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function drawFallback(L: any, map: any) {
    JALUR_FALLBACK.forEach((jalur) => {
        L.polyline(jalur.coords, { color: jalur.warna, weight: 4, opacity: 0.85 })
            .bindPopup(`<b style="color:${jalur.warna}">${jalur.nama}</b>`)
            .addTo(map);
    });
}

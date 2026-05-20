import { useState } from 'react';
import type { Kota } from '@/types';

interface SubwayMapProps {
    kota: Kota[];
}

/*
 * Geographic positions mapped from real lat/lon of Java train hubs.
 * SVG viewport 900×360. Lon 105.5–115°E, Lat 5.8–8.4°S.
 */
const GEO: Record<string, { x: number; y: number }> = {
    Jakarta:    { x: 129, y: 55 },
    Bogor:      { x: 129, y: 117 },
    Bandung:    { x: 211, y: 161 },
    Cirebon:    { x: 299, y: 131 },
    Purwokerto: { x: 352, y: 210 },
    Semarang:   { x: 449, y: 152 },
    Yogyakarta: { x: 449, y: 250 },
    Solo:       { x: 486, y: 230 },
    Surabaya:   { x: 665, y: 178 },
    Malang:     { x: 658, y: 265 },
};

const LINES: { id: string; color: string; label: string; cities: string[] }[] = [
    { id: 'pantura', color: '#047857', label: 'Jalur Utara (Pantura)', cities: ['Jakarta', 'Cirebon', 'Semarang', 'Surabaya'] },
    { id: 'selatan', color: '#b45309', label: 'Jalur Selatan', cities: ['Bandung', 'Purwokerto', 'Yogyakarta', 'Solo', 'Surabaya'] },
    { id: 'jkt-bdg', color: '#6d28d9', label: 'Jakarta–Bandung', cities: ['Jakarta', 'Bandung'] },
    { id: 'crb-pwt', color: '#0369a1', label: 'Cirebon–Purwokerto', cities: ['Cirebon', 'Purwokerto'] },
    { id: 'smg-solo', color: '#047857', label: 'Semarang–Solo', cities: ['Semarang', 'Solo'] },
    { id: 'sby-mlg', color: '#b45309', label: 'Surabaya–Malang', cities: ['Surabaya', 'Malang'] },
    { id: 'jkt-bgr', color: '#dc2626', label: 'Commuter Jakarta–Bogor', cities: ['Jakarta', 'Bogor'] },
];

function getPos(nama: string): { x: number; y: number } | null {
    return GEO[nama] ?? null;
}

export default function SubwayMap({ kota }: SubwayMapProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    if (kota.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-400">
                Belum ada data kota tersedia.
            </div>
        );
    }

    const hoveredKota = kota.find((k) => k.id === hoveredId);

    return (
        <div className="w-full">
            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1.5">
                {LINES.map((l) => (
                    <div key={l.id} className="flex items-center gap-1.5">
                        <div className="h-0.5 w-5 rounded-full" style={{ background: l.color }} />
                        <span className="text-xs text-stone-500">{l.label}</span>
                    </div>
                ))}
            </div>

            <div className="relative w-full" style={{ aspectRatio: '900 / 360' }}>
                <svg
                    viewBox="0 0 900 360"
                    className="h-full w-full"
                    aria-label="Peta jalur kereta Pulau Jawa"
                >
                    {/* Jawa island silhouette */}
                    <path
                        d="M 40,140 C 60,110 90,88 130,68 L 175,48 C 215,38 255,40 295,50
                           C 335,60 370,72 408,74 C 446,76 482,70 520,68
                           C 558,66 596,62 634,60 C 672,58 710,55 748,58
                           C 778,60 808,68 838,82 L 858,102 C 870,118 874,136 870,156
                           C 866,170 856,182 840,192 L 808,206 C 778,216 746,222 710,226
                           C 674,230 636,232 598,236 C 560,240 522,244 484,250
                           C 446,256 408,260 370,258 C 332,256 294,250 256,246
                           C 218,242 182,240 146,242 C 116,244 88,250 66,262
                           C 50,270 42,280 44,292 C 40,278 36,260 38,240
                           C 38,210 38,175 40,140 Z"
                        fill="#f0fdf4"
                        stroke="#bbf7d0"
                        strokeWidth={1.5}
                    />

                    {/* Rail lines */}
                    {LINES.map((line) => {
                        const pts = line.cities.map(getPos).filter(Boolean) as { x: number; y: number }[];
                        if (pts.length < 2) return null;
                        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
                        return (
                            <path
                                key={line.id}
                                d={d}
                                stroke={line.color}
                                strokeWidth={3.5}
                                strokeOpacity={0.75}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        );
                    })}

                    {/* City nodes */}
                    {kota.map((k) => {
                        const pos = getPos(k.nama);
                        if (!pos) return null;
                        const isHovered = hoveredId === k.id;
                        return (
                            <g
                                key={k.id}
                                onMouseEnter={() => setHoveredId(k.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                {isHovered && (
                                    <circle cx={pos.x} cy={pos.y} r={18} fill="rgba(4,120,87,0.12)" />
                                )}
                                <circle
                                    cx={pos.x} cy={pos.y}
                                    r={isHovered ? 9 : 7}
                                    fill={isHovered ? '#047857' : '#fff'}
                                    stroke="#047857"
                                    strokeWidth={2.5}
                                    style={{ transition: 'r 0.15s' }}
                                />
                                <text
                                    x={pos.x} y={pos.y - 14}
                                    textAnchor="middle"
                                    fill={isHovered ? '#047857' : '#44403c'}
                                    fontSize={isHovered ? 12 : 10.5}
                                    fontWeight={isHovered ? 700 : 500}
                                    style={{ userSelect: 'none', transition: 'all 0.15s' }}
                                >
                                    {k.nama}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Tooltip */}
                {hoveredKota && (() => {
                    const pos = getPos(hoveredKota.nama);
                    if (!pos) return null;
                    return (
                        <div
                            className="pointer-events-none absolute z-10 min-w-[160px] rounded-xl border border-stone-200 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                            style={{
                                left: `${(pos.x / 900) * 100}%`,
                                top: `${(pos.y / 360) * 100}%`,
                                transform: 'translate(-50%, calc(-100% - 16px))',
                            }}
                        >
                            <p className="mb-1.5 text-[11px] font-semibold tracking-[0.06em] text-emerald-700 uppercase">
                                {hoveredKota.nama}
                            </p>
                            <ul className="space-y-0.5">
                                {hoveredKota.stasiun.map((s) => (
                                    <li key={s.id} className="flex items-center justify-between gap-3 text-xs text-stone-600">
                                        <span>{s.nama}</span>
                                        <span className="font-mono text-[10px] text-stone-400">{s.kode_stasiun}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}

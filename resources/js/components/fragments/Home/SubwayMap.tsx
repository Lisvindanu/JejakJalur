import { useState } from 'react';
import type { Kota } from '@/types';

interface SubwayMapProps {
    kota: Kota[];
}

interface NodePosition {
    x: number;
    y: number;
    kota: Kota;
}

const CX = 400;
const CY = 240;
const RX = 300;
const RY = 180;

function buildPositions(kotaList: Kota[]): NodePosition[] {
    return kotaList.map((kota, i) => {
        const angle = (2 * Math.PI * i) / kotaList.length - Math.PI / 2;
        return {
            x: CX + RX * Math.cos(angle),
            y: CY + RY * Math.sin(angle),
            kota,
        };
    });
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

    const nodes = buildPositions(kota);
    const hoveredNode = nodes.find((n) => n.kota.id === hoveredId);

    return (
        <div className="relative w-full" style={{ aspectRatio: '8 / 5' }}>
            <svg
                viewBox="0 0 800 500"
                className="h-full w-full"
                aria-label="Peta jalur kereta antar kota"
            >
                {/* Lines connecting adjacent cities */}
                {nodes.map((node, i) => {
                    const next = nodes[(i + 1) % nodes.length];
                    return (
                        <polyline
                            key={`line-${i}`}
                            points={`${node.x},${node.y} ${next.x},${next.y}`}
                            stroke="#059669"
                            strokeWidth={2}
                            strokeOpacity={0.35}
                            fill="none"
                            strokeDasharray="5 4"
                        />
                    );
                })}

                {/* City nodes */}
                {nodes.map(({ x, y, kota: k }) => {
                    const isHovered = hoveredId === k.id;
                    const initial = k.nama[0].toUpperCase();
                    return (
                        <g
                            key={k.id}
                            onMouseEnter={() => setHoveredId(k.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{ cursor: 'pointer' }}
                        >
                            {/* Outer glow ring on hover */}
                            {isHovered && (
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={26}
                                    fill="none"
                                    stroke="#047857"
                                    strokeWidth={2}
                                    strokeOpacity={0.3}
                                />
                            )}

                            {/* Main circle */}
                            <circle
                                cx={x}
                                cy={y}
                                r={isHovered ? 20 : 16}
                                fill={isHovered ? '#047857' : '#065f46'}
                                style={{ transition: 'r 0.2s, fill 0.2s' }}
                            />

                            {/* City initial */}
                            <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="white"
                                fontSize={isHovered ? 12 : 10}
                                fontWeight={700}
                                style={{
                                    userSelect: 'none',
                                    transition: 'font-size 0.2s',
                                }}
                            >
                                {initial}
                            </text>

                            {/* City name label */}
                            <text
                                x={x}
                                y={y + (isHovered ? 28 : 24)}
                                textAnchor="middle"
                                fill={isHovered ? '#047857' : '#57534e'}
                                fontSize={isHovered ? 12 : 11}
                                fontWeight={isHovered ? 600 : 400}
                                style={{
                                    userSelect: 'none',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {k.nama}
                            </text>

                            {/* Station count */}
                            <text
                                x={x}
                                y={y + (isHovered ? 42 : 37)}
                                textAnchor="middle"
                                fill="#a8a29e"
                                fontSize={9}
                                style={{ userSelect: 'none' }}
                            >
                                {k.stasiun.length} stasiun
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Hover tooltip: station list */}
            {hoveredNode && (
                <div
                    className="pointer-events-none absolute z-10 min-w-[160px] rounded-xl border border-stone-200 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    style={{
                        left: `${(hoveredNode.x / 800) * 100}%`,
                        top: `${(hoveredNode.y / 500) * 100}%`,
                        transform: 'translate(-50%, -130%)',
                    }}
                >
                    <p className="mb-1.5 text-[11px] font-semibold tracking-[0.06em] text-emerald-700 uppercase">
                        {hoveredNode.kota.nama}
                    </p>
                    <ul className="space-y-0.5">
                        {hoveredNode.kota.stasiun.map((s) => (
                            <li
                                key={s.id}
                                className="flex items-center justify-between gap-3 text-xs text-stone-600"
                            >
                                <span>{s.nama}</span>
                                <span className="font-mono text-[10px] text-stone-400">
                                    {s.kode_stasiun}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

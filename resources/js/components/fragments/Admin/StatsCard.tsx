import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Tone = 'emerald' | 'sky' | 'amber' | 'indigo' | 'rose' | 'stone';

interface StatsCardProps {
    icon: ReactNode;
    label: string;
    value: number | string;
    sub?: ReactNode;
    tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
    emerald: 'bg-emerald-50 text-emerald-700',
    sky: 'bg-sky-50 text-sky-700',
    amber: 'bg-amber-50 text-amber-700',
    indigo: 'bg-indigo-50 text-indigo-700',
    rose: 'bg-rose-50 text-rose-700',
    stone: 'bg-stone-100 text-stone-700',
};

export default function StatsCard({
    icon,
    label,
    value,
    sub,
    tone = 'emerald',
}: StatsCardProps) {
    return (
        <div className="rounded-xl border border-stone-200 bg-white p-5">
            <span
                className={cn(
                    'inline-flex h-9 w-9 items-center justify-center rounded-lg',
                    toneClasses[tone],
                )}
            >
                {icon}
            </span>
            <div className="mt-4 text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
                {value}
            </div>
            <div className="mt-0.5 text-xs text-stone-500">{label}</div>
            {sub && <div className="mt-2 text-xs text-stone-500">{sub}</div>}
        </div>
    );
}

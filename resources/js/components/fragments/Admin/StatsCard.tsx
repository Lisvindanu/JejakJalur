import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Color = 'emerald' | 'amber' | 'blue' | 'purple';

interface StatsCardProps {
    label: string;
    value: number | string;
    icon: ReactNode;
    color?: Color;
    description?: string;
}

const colorClasses: Record<Color, { wrapper: string; icon: string }> = {
    emerald: { wrapper: 'bg-emerald-100', icon: 'text-emerald-700' },
    amber: { wrapper: 'bg-amber-100', icon: 'text-amber-700' },
    blue: { wrapper: 'bg-blue-100', icon: 'text-blue-700' },
    purple: { wrapper: 'bg-purple-100', icon: 'text-purple-700' },
};

export default function StatsCard({
    label,
    value,
    icon,
    color = 'emerald',
    description,
}: StatsCardProps) {
    const { wrapper, icon: iconColor } = colorClasses[color];

    return (
        <div className="flex items-start justify-between rounded-xl border border-stone-100 bg-white p-5">
            <div>
                <p className="text-2xl font-bold text-stone-800">{value}</p>
                <p className="mt-0.5 text-sm text-stone-500">{label}</p>
                {description && (
                    <p className="mt-1 text-xs text-stone-400">{description}</p>
                )}
            </div>
            <div
                className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl',
                    wrapper,
                    iconColor,
                )}
            >
                {icon}
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';
import { IconCheck } from '@tabler/icons-react';
import type { ReactNode } from 'react';

type Kategori = 'Wisata' | 'Kuliner' | 'UMKM';

interface BadgeProps {
    kategori?: Kategori;
    verified?: boolean;
    children: ReactNode;
    className?: string;
}

const kategoriClasses: Record<Kategori, string> = {
    Wisata: 'bg-emerald-100 text-emerald-700',
    Kuliner: 'bg-amber-100 text-amber-700',
    UMKM: 'bg-purple-100 text-purple-700',
};

export default function Badge({
    kategori,
    verified,
    children,
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em]',
                verified
                    ? 'bg-emerald-700 text-white'
                    : kategori
                      ? kategoriClasses[kategori]
                      : 'bg-stone-100 text-stone-600',
                className,
            )}
        >
            {verified && <IconCheck size={10} />}
            {children}
        </span>
    );
}

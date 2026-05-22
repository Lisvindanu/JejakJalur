import { cn } from '@/lib/utils';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
    size?: SpinnerSize;
    className?: string;
}

const spinnerSizeClasses: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-[3px]',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
    return (
        <span
            className={cn(
                'inline-block animate-spin rounded-full border-emerald-700 border-t-transparent',
                spinnerSizeClasses[size],
                className,
            )}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="animate-pulse rounded-xl border border-stone-100 bg-white p-4">
            <div className="mb-3 h-40 rounded-lg bg-stone-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-stone-200" />
            <div className="mb-2 h-3 w-full rounded bg-stone-100" />
            <div className="h-3 w-2/3 rounded bg-stone-100" />
        </div>
    );
}

export default function Loading() {
    return (
        <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
        </div>
    );
}

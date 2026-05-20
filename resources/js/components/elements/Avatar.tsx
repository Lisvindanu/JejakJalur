import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
    name: string;
    src?: string | null;
    size?: AvatarSize;
    className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
    sm: 'h-7 w-7 text-[11px]',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base',
};

export default function Avatar({
    name,
    src,
    size = 'md',
    className,
}: AvatarProps) {
    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={cn(
                    'rounded-full object-cover',
                    sizeClasses[size],
                    className,
                )}
            />
        );
    }

    return (
        <div
            className={cn(
                'flex shrink-0 items-center justify-center rounded-full bg-emerald-700 font-bold text-white',
                sizeClasses[size],
                className,
            )}
        >
            {getInitials(name)}
        </div>
    );
}

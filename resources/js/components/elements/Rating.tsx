import { cn } from '@/lib/utils';
import { IconStar, IconStarFilled, IconStarHalf } from '@tabler/icons-react';

interface RatingDisplayProps {
    value: number;
    size?: number;
    showLabel?: boolean;
    className?: string;
}

export function RatingDisplay({
    value: rawValue,
    size = 13,
    showLabel = true,
    className,
}: RatingDisplayProps) {
    const value = rawValue ?? 0;
    const stars = Array.from({ length: 5 }, (_, i) => {
        const position = i + 1;
        if (value >= position) {
            return 'full';
        }
        if (value >= position - 0.5) {
            return 'half';
        }
        return 'empty';
    });

    return (
        <span className={cn('inline-flex items-center gap-0.5', className)}>
            {stars.map((type, i) => {
                if (type === 'full') {
                    return (
                        <IconStarFilled
                            key={i}
                            size={size}
                            className="text-amber-400"
                        />
                    );
                }
                if (type === 'half') {
                    return (
                        <IconStarHalf
                            key={i}
                            size={size}
                            className="text-amber-400"
                        />
                    );
                }
                return (
                    <IconStar key={i} size={size} className="text-stone-300" />
                );
            })}
            {showLabel && (
                <span className="ml-1 text-xs font-medium text-stone-600">
                    {value.toFixed(1)}
                </span>
            )}
        </span>
    );
}

interface RatingInputProps {
    value: number;
    onChange: (val: number) => void;
    label?: string;
}

export function RatingInput({ value, onChange, label }: RatingInputProps) {
    return (
        <div>
            {label && (
                <p className="mb-1.5 text-sm font-medium text-stone-700">
                    {label}
                </p>
            )}
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => {
                    const star = i + 1;
                    const filled = star <= value;
                    return (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onChange(star)}
                            className="transition-transform hover:scale-110 focus:outline-none"
                        >
                            {filled ? (
                                <IconStarFilled
                                    size={24}
                                    className="text-amber-400"
                                />
                            ) : (
                                <IconStar
                                    size={24}
                                    className="text-stone-300 hover:text-amber-300"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default RatingDisplay;

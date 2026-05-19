import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
    primary: 'bg-emerald-700 text-white hover:bg-emerald-800',
    secondary: 'bg-stone-100 text-stone-700 hover:bg-stone-200',
    outline: 'border border-emerald-700 text-emerald-700 hover:bg-emerald-50',
    ghost: 'text-stone-600 hover:bg-stone-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizeClasses: Record<Size, string> = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-9 px-4 text-sm gap-2',
    lg: 'h-11 px-5 text-base gap-2',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <button
            disabled={isDisabled}
            className={cn(
                'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
                'focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none',
                variantClasses[variant],
                sizeClasses[size],
                isDisabled && 'cursor-not-allowed opacity-50',
                className,
            )}
            {...props}
        >
            {loading ? (
                <span
                    className={cn(
                        'shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent',
                        size === 'sm'
                            ? 'h-3 w-3'
                            : size === 'lg'
                              ? 'h-5 w-5'
                              : 'h-4 w-4',
                    )}
                />
            ) : (
                leftIcon && <span className="shrink-0">{leftIcon}</span>
            )}
            {children}
            {!loading && rightIcon && (
                <span className="shrink-0">{rightIcon}</span>
            )}
        </button>
    );
}

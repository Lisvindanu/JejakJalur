import { cn } from '@/lib/utils';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helper?: string;
    leftIcon?: ReactNode;
}

export default function Input({
    label,
    error,
    helper,
    leftIcon,
    className,
    id,
    ...props
}: InputProps) {
    const inputId =
        id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400">
                        {leftIcon}
                    </span>
                )}
                <input
                    id={inputId}
                    className={cn(
                        'w-full rounded-lg border px-3 py-2 text-sm text-stone-800 transition-colors',
                        'placeholder:text-stone-400',
                        'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none',
                        error ? 'border-red-400' : 'border-stone-200',
                        leftIcon && 'pl-9',
                        className,
                    )}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            {!error && helper && (
                <p className="mt-1 text-xs text-stone-400">{helper}</p>
            )}
        </div>
    );
}

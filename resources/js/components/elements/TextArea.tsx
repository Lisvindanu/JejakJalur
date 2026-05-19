import { cn } from '@/lib/utils';
import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helper?: string;
    rows?: number;
}

export default function TextArea({
    label,
    error,
    helper,
    rows = 4,
    className,
    id,
    ...props
}: TextAreaProps) {
    const textareaId =
        id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={textareaId}
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                rows={rows}
                className={cn(
                    'w-full resize-y rounded-lg border px-3 py-2 text-sm text-stone-800 transition-colors',
                    'placeholder:text-stone-400',
                    'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none',
                    error ? 'border-red-400' : 'border-stone-200',
                    className,
                )}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            {!error && helper && (
                <p className="mt-1 text-xs text-stone-400">{helper}</p>
            )}
        </div>
    );
}

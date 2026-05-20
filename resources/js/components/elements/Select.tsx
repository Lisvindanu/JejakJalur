import { cn } from '@/lib/utils';
import { IconChevronDown } from '@tabler/icons-react';
import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

export default function Select({
    label,
    error,
    options,
    placeholder,
    className,
    id,
    ...props
}: SelectProps) {
    const selectId =
        id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={selectId}
                    className="mb-1.5 block text-sm font-medium text-stone-700"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    className={cn(
                        'w-full appearance-none rounded-lg border px-3 py-2 pr-8 text-sm text-stone-800 transition-colors',
                        'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none',
                        error ? 'border-red-400' : 'border-stone-200',
                        className,
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-stone-400">
                    <IconChevronDown size={14} />
                </span>
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

import { IconSearch, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Cari destinasi...',
    className,
}: SearchBarProps) {
    return (
        <div
            className={cn(
                'relative flex items-center rounded-xl border border-stone-200 bg-white transition-all focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500',
                className,
            )}
        >
            <span className="pointer-events-none absolute left-3 text-stone-400">
                <IconSearch size={16} />
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border-none bg-transparent py-2 pr-8 pl-10 text-sm text-stone-800 placeholder:text-stone-400 focus:ring-0 focus:outline-none"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute right-2.5 text-stone-400 transition-colors hover:text-stone-600"
                >
                    <IconX size={14} />
                </button>
            )}
        </div>
    );
}

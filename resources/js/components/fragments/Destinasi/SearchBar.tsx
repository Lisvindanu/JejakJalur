import { useRef, useState } from 'react';
import { IconClock, IconSearch, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'jj:search_history';
const MAX_HISTORY = 8;

function loadHistory(): string[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
        return [];
    }
}

function saveToHistory(query: string) {
    if (!query.trim()) return;
    const prev = loadHistory().filter((h) => h !== query);
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([query, ...prev].slice(0, MAX_HISTORY)),
    );
}

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchBar({
    value,
    onChange,
    onSearch,
    placeholder = 'Cari destinasi...',
    className,
}: SearchBarProps) {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const history = loadHistory();
    const showHistory = focused && !value && history.length > 0;

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && value.trim()) {
            saveToHistory(value.trim());
            onSearch?.(value.trim());
        }
    }

    function handleHistoryClick(item: string) {
        onChange(item);
        saveToHistory(item);
        onSearch?.(item);
        setFocused(false);
    }

    return (
        <div className={cn('relative', className)}>
            <div
                className={cn(
                    'relative flex items-center rounded-xl border bg-white transition-all focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500',
                    showHistory
                        ? 'rounded-b-none border-emerald-500 ring-1 ring-emerald-500'
                        : 'border-stone-200',
                )}
            >
                <span className="pointer-events-none absolute left-3 text-stone-400">
                    <IconSearch size={16} />
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
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

            {showHistory && (
                <div className="absolute top-full right-0 left-0 z-50 overflow-hidden rounded-b-xl border border-t-0 border-emerald-500 bg-white shadow-lg">
                    <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-stone-400 uppercase">
                        Pencarian terakhir
                    </div>
                    {history.map((item) => (
                        <button
                            key={item}
                            onMouseDown={() => handleHistoryClick(item)}
                            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-stone-700 transition-colors hover:bg-emerald-50"
                        >
                            <IconClock
                                size={13}
                                className="shrink-0 text-stone-400"
                            />
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

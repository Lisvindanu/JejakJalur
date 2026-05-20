import type { PaginatedData } from '@/types';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    data: PaginatedData<unknown>;
}

export default function Pagination({ data }: PaginationProps) {
    if (data.last_page <= 1) {
        return null;
    }

    const from = data.from ?? 0;
    const to = data.to ?? 0;

    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-stone-600">
                Menampilkan <span className="font-medium">{from}</span>–
                <span className="font-medium">{to}</span> dari{' '}
                <span className="font-medium">{data.total}</span> hasil
            </p>
            <div className="flex items-center gap-1">
                {data.links.map((link, index) => {
                    if (!link.url) {
                        return (
                            <span
                                key={index}
                                className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm text-stone-400"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={cn(
                                'inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm transition-colors',
                                link.active
                                    ? 'bg-emerald-700 text-white'
                                    : 'text-stone-600 hover:bg-stone-100',
                            )}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

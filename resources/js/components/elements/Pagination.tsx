import { Link } from '@inertiajs/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import type { PaginatedData } from '@/types';

interface PaginationProps {
    data: PaginatedData<unknown>;
}

type PageItem =
    | {
          type: 'page';
          link: { url: string | null; label: string; active: boolean };
          pageNum: number;
      }
    | { type: 'ellipsis'; key: string };

function buildWindowedItems(
    pageLinks: Array<{ url: string | null; label: string; active: boolean }>,
    currentPage: number,
    lastPage: number,
): PageItem[] {
    const items: PageItem[] = [];
    let lastShown = 0;

    pageLinks.forEach((link, i) => {
        const pageNum = i + 1;
        const isEdge = pageNum === 1 || pageNum === lastPage;
        const isNearCurrent = Math.abs(pageNum - currentPage) <= 2;

        if (isEdge || isNearCurrent) {
            if (lastShown > 0 && pageNum - lastShown > 1) {
                items.push({ type: 'ellipsis', key: `ellipsis-${pageNum}` });
            }
            items.push({ type: 'page', link, pageNum });
            lastShown = pageNum;
        }
    });

    return items;
}

export default function Pagination({ data }: PaginationProps) {
    if (data.last_page <= 1) return null;

    const from = data.from ?? 0;
    const to = data.to ?? 0;

    const prevLink = data.links[0];
    const nextLink = data.links[data.links.length - 1];
    const pageLinks = data.links.slice(1, -1);

    const items = buildWindowedItems(
        pageLinks,
        data.current_page,
        data.last_page,
    );

    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-stone-500">
                Menampilkan{' '}
                <span className="font-medium text-stone-700">
                    {from}–{to}
                </span>{' '}
                dari{' '}
                <span className="font-medium text-stone-700">{data.total}</span>{' '}
                hasil
            </p>

            <nav className="flex items-center gap-1" aria-label="Paginasi">
                {/* Previous */}
                {prevLink.url ? (
                    <Link
                        href={prevLink.url}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100"
                        aria-label="Halaman sebelumnya"
                    >
                        <IconChevronLeft size={15} />
                    </Link>
                ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-stone-300">
                        <IconChevronLeft size={15} />
                    </span>
                )}

                {/* Windowed page numbers */}
                {items.map((item) => {
                    if (item.type === 'ellipsis') {
                        return (
                            <span
                                key={item.key}
                                className="inline-flex h-8 min-w-8 items-center justify-center text-sm text-stone-400"
                            >
                                …
                            </span>
                        );
                    }

                    const { link, pageNum } = item;

                    if (!link.url) {
                        return (
                            <span
                                key={pageNum}
                                className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm text-stone-400"
                            >
                                {link.label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={pageNum}
                            href={link.url}
                            className={cn(
                                'inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm transition-colors',
                                link.active
                                    ? 'bg-emerald-700 font-medium text-white'
                                    : 'text-stone-600 hover:bg-stone-100',
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}

                {/* Next */}
                {nextLink.url ? (
                    <Link
                        href={nextLink.url}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-stone-600 transition-colors hover:bg-stone-100"
                        aria-label="Halaman berikutnya"
                    >
                        <IconChevronRight size={15} />
                    </Link>
                ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-stone-300">
                        <IconChevronRight size={15} />
                    </span>
                )}
            </nav>
        </div>
    );
}

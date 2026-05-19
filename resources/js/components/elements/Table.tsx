import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Column<T> {
    key: string;
    header: string;
    render?: (row: T) => ReactNode;
    className?: string;
}

interface TableProps<T extends Record<string, unknown>> {
    columns: Column<T>[];
    data: T[];
    keyField?: string;
    empty?: ReactNode;
    className?: string;
}

export default function Table<T extends Record<string, unknown>>({
    columns,
    data,
    keyField = 'id',
    empty,
    className,
}: TableProps<T>) {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-xl border border-stone-100',
                className,
            )}
        >
            <table className="w-full">
                <thead className="border-b border-stone-100 bg-stone-50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={cn(
                                    'px-4 py-3 text-left text-xs font-semibold tracking-[0.04em] text-stone-500 uppercase',
                                    col.className,
                                )}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="py-12 text-center text-stone-400"
                            >
                                {empty ?? 'Tidak ada data.'}
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr
                                key={String(row[keyField])}
                                className="border-b border-stone-50 transition-colors last:border-0 hover:bg-stone-50/60"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={cn(
                                            'px-4 py-3 text-stone-700',
                                            col.className,
                                        )}
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : (row[col.key] as ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

import Pagination from '@/components/elements/Pagination';
import Table from '@/components/elements/Table';
import type { PaginatedData } from '@/types';
import type { ReactNode } from 'react';

interface Column<T> {
    key: string;
    header: string;
    render?: (row: T) => ReactNode;
    className?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
    columns: Column<T>[];
    data: T[];
    pagination?: PaginatedData<unknown>;
    keyField?: string;
    empty?: ReactNode;
}

export default function DataTable<T extends Record<string, unknown>>({
    columns,
    data,
    pagination,
    keyField = 'id',
    empty,
}: DataTableProps<T>) {
    return (
        <div className="overflow-hidden rounded-xl border border-stone-100 bg-white">
            <Table
                columns={columns}
                data={data}
                keyField={keyField}
                empty={empty}
            />
            {pagination && pagination.last_page > 1 && (
                <div className="border-t border-stone-100 px-4 py-3">
                    <Pagination data={pagination} />
                </div>
            )}
        </div>
    );
}

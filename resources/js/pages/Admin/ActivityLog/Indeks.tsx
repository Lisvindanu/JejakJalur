import AdminLayout from '@/components/layouts/AdminLayout';
import DataTable from '@/components/fragments/Admin/DataTable';
import type { PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface Log {
    id: number;
    aksi: string;
    model_type: string | null;
    model_id: string | null;
    deskripsi: string | null;
    admin_name: string;
    created_at: string;
    [key: string]: unknown;
}

interface Props {
    logs: PaginatedData<Log>;
}

const AKSI_COLOR: Record<string, string> = {
    buat_destinasi: 'bg-emerald-100 text-emerald-700',
    edit_destinasi: 'bg-sky-100 text-sky-700',
    hapus_destinasi: 'bg-red-100 text-red-700',
    verifikasi_destinasi: 'bg-teal-100 text-teal-700',
    batalkan_verifikasi_destinasi: 'bg-amber-100 text-amber-700',
    sembunyikan_ulasan: 'bg-orange-100 text-orange-700',
    tampilkan_ulasan: 'bg-green-100 text-green-700',
    hapus_ulasan: 'bg-red-100 text-red-700',
};

export default function ActivityLogIndeks({ logs }: Props) {
    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-10',
            render: (_: Log) => {
                const idx = logs.data.indexOf(_) + 1 + (logs.current_page - 1) * logs.per_page;
                return <span className="text-stone-400">{idx}</span>;
            },
        },
        {
            key: 'aksi',
            header: 'Aksi',
            render: (row: Log) => (
                <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', AKSI_COLOR[row.aksi] ?? 'bg-stone-100 text-stone-600')}>
                    {row.aksi.replace(/_/g, ' ')}
                </span>
            ),
        },
        {
            key: 'deskripsi',
            header: 'Keterangan',
            render: (row: Log) => (
                <span className="text-sm text-stone-700">{row.deskripsi ?? '—'}</span>
            ),
        },
        {
            key: 'admin_name',
            header: 'Admin',
            render: (row: Log) => <span className="text-sm text-stone-600">{row.admin_name}</span>,
        },
        { key: 'created_at', header: 'Waktu' },
    ];

    return (
        <AdminLayout title="Activity Log">
            <Head title="Activity Log — Admin JejakJalur" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-stone-800">Activity Log</h2>
                    <p className="text-sm text-stone-500">{logs.total} entri</p>
                </div>

                <DataTable
                    columns={columns}
                    data={logs.data}
                    pagination={logs}
                    keyField="id"
                    empty="Belum ada aktivitas tercatat."
                />
            </div>
        </AdminLayout>
    );
}

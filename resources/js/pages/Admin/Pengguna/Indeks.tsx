import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import { useConfirm } from '@/hooks/useConfirm';
import type { PaginatedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { IconShield, IconShieldOff, IconTrash, IconUserCheck } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface Pengguna {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
    deleted_at: string | null;
    ulasan_count: number;
    created_at: string;
    via: string;
    [key: string]: unknown;
}

interface Props {
    pengguna: PaginatedData<Pengguna>;
}

export default function PenggunaIndeks({ pengguna }: Props) {
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-10',
            render: (_: Pengguna) => {
                const idx = pengguna.data.indexOf(_) + 1 + (pengguna.current_page - 1) * pengguna.per_page;
                return <span className="text-stone-400">{idx}</span>;
            },
        },
        {
            key: 'name',
            header: 'Pengguna',
            render: (row: Pengguna) => (
                <div>
                    <p className={cn('text-sm font-medium', row.deleted_at ? 'text-stone-400 line-through' : 'text-stone-800')}>
                        {row.name}
                    </p>
                    <p className="text-xs text-stone-400">{row.email}</p>
                </div>
            ),
        },
        {
            key: 'via',
            header: 'Login Via',
            render: (row: Pengguna) => (
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">{row.via}</span>
            ),
        },
        {
            key: 'ulasan_count',
            header: 'Ulasan',
            render: (row: Pengguna) => <span className="text-sm text-stone-600">{row.ulasan_count}</span>,
        },
        {
            key: 'role',
            header: 'Role',
            render: (row: Pengguna) => (
                <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', row.is_admin ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-600')}>
                    {row.is_admin ? 'Admin' : 'User'}
                </span>
            ),
        },
        { key: 'created_at', header: 'Daftar' },
        {
            key: 'aksi',
            header: 'Aksi',
            className: 'w-36',
            render: (row: Pengguna) => (
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="outline"
                        size="sm"
                        leftIcon={row.is_admin ? <IconShieldOff size={12} /> : <IconShield size={12} />}
                        onClick={() => router.patch(`/admin/pengguna/${row.id}/toggle-admin`)}
                    >
                        {row.is_admin ? 'Cabut' : 'Admin'}
                    </Button>
                    {row.deleted_at ? (
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<IconUserCheck size={12} />}
                            onClick={() => router.patch(`/admin/pengguna/${row.id}/pulihkan`)}
                        >
                            Pulihkan
                        </Button>
                    ) : (
                        <Button
                            variant="danger"
                            size="sm"
                            leftIcon={<IconTrash size={12} />}
                            onClick={() => confirm(() => router.delete(`/admin/pengguna/${row.id}`))}
                        >
                            Hapus
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Pengguna">
            <Head title="Pengguna — Admin JejakJalur" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-stone-800">Daftar Pengguna</h2>
                    <p className="text-sm text-stone-500">{pengguna.total} pengguna terdaftar</p>
                </div>

                <DataTable
                    columns={columns}
                    data={pengguna.data}
                    pagination={pengguna}
                    keyField="id"
                    empty="Belum ada pengguna."
                />
            </div>

            <ConfirmModal
                open={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                description="Pengguna yang dihapus tidak bisa memulihkan akunnya sendiri."
            />
        </AdminLayout>
    );
}

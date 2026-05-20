import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import { useConfirm } from '@/hooks/useConfirm';
import type { PaginatedData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { IconRefresh, IconTrash, IconUser, IconUsers } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface AiSession {
    id: string;
    user_name: string;
    user_email: string | null;
    message_count: number;
    last_message_at: string | null;
    is_guest: boolean;
    [key: string]: unknown;
}

interface Props {
    sessions: PaginatedData<AiSession>;
}

export default function AiSessionIndeks({ sessions }: Props) {
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-10',
            render: (_: AiSession) => {
                const idx = sessions.data.indexOf(_) + 1 + (sessions.current_page - 1) * sessions.per_page;
                return <span className="text-stone-400">{idx}</span>;
            },
        },
        {
            key: 'user_name',
            header: 'Pengguna',
            render: (row: AiSession) => (
                <div className="flex items-center gap-2">
                    <div className={cn('flex h-6 w-6 items-center justify-center rounded-full', row.is_guest ? 'bg-stone-100' : 'bg-emerald-100')}>
                        {row.is_guest ? <IconUsers size={12} className="text-stone-500" /> : <IconUser size={12} className="text-emerald-700" />}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-800">{row.user_name}</p>
                        {row.user_email && <p className="text-xs text-stone-400">{row.user_email}</p>}
                    </div>
                </div>
            ),
        },
        {
            key: 'message_count',
            header: 'Pesan',
            render: (row: AiSession) => (
                <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', row.message_count >= 40 ? 'bg-red-100 text-red-700' : row.message_count >= 20 ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600')}>
                    {row.message_count} pesan
                </span>
            ),
        },
        {
            key: 'last_message_at',
            header: 'Terakhir Aktif',
            render: (row: AiSession) => <span className="text-sm text-stone-500">{row.last_message_at ?? '—'}</span>,
        },
        {
            key: 'aksi',
            header: 'Aksi',
            className: 'w-36',
            render: (row: AiSession) => (
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<IconRefresh size={12} />}
                        onClick={() => router.patch(`/admin/ai-session/${row.id}/reset`)}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<IconTrash size={12} />}
                        onClick={() => confirm(() => router.delete(`/admin/ai-session/${row.id}`))}
                    >
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Sesi AI">
            <Head title="Sesi AI — Admin JejakJalur" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-stone-800">Sesi Jejak AI</h2>
                    <p className="text-sm text-stone-500">{sessions.total} sesi aktif</p>
                </div>

                <DataTable
                    columns={columns}
                    data={sessions.data}
                    pagination={sessions}
                    keyField="id"
                    empty="Belum ada sesi AI."
                />
            </div>

            <ConfirmModal
                open={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                description="Sesi yang dihapus tidak bisa dipulihkan."
            />
        </AdminLayout>
    );
}

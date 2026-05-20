import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import { useConfirm } from '@/hooks/useConfirm';
import type { PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { IconStar, IconTrash } from '@tabler/icons-react';

interface Ulasan {
    id: string;
    judul: string;
    konten: string;
    rating: number;
    user_name: string | null;
    user_id: string;
    destinasi_nama: string | null;
    destinasi_id: string;
    created_at: string;
    [key: string]: unknown;
}

interface Props {
    ulasan: PaginatedData<Ulasan>;
}

export default function UlasanIndeks({ ulasan }: Props) {
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-10',
            render: (_: Ulasan) => {
                const idx = ulasan.data.indexOf(_) + 1 + (ulasan.current_page - 1) * ulasan.per_page;
                return <span className="text-stone-400">{idx}</span>;
            },
        },
        {
            key: 'destinasi_nama',
            header: 'Destinasi',
            render: (row: Ulasan) => (
                <Link href={`/destinasi/${row.destinasi_id}`} className="text-sm font-medium text-emerald-700 hover:underline">
                    {row.destinasi_nama ?? '—'}
                </Link>
            ),
        },
        {
            key: 'judul',
            header: 'Ulasan',
            render: (row: Ulasan) => (
                <div>
                    <p className="text-sm font-medium text-stone-800">{row.judul}</p>
                    <p className="line-clamp-1 text-xs text-stone-400">{row.konten}</p>
                </div>
            ),
        },
        {
            key: 'rating',
            header: 'Rating',
            render: (row: Ulasan) => (
                <div className="flex items-center gap-1 text-sm text-amber-500">
                    <IconStar size={13} className="fill-current" />
                    <span>{row.rating}</span>
                </div>
            ),
        },
        {
            key: 'user_name',
            header: 'Pengguna',
            render: (row: Ulasan) => <span className="text-sm text-stone-600">{row.user_name ?? '—'}</span>,
        },
        { key: 'created_at', header: 'Tanggal' },
        {
            key: 'aksi',
            header: 'Aksi',
            className: 'w-24',
            render: (row: Ulasan) => (
                <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<IconTrash size={12} />}
                    onClick={() => confirm(() => router.delete(`/admin/ulasan/${row.id}`))}
                >
                    Hapus
                </Button>
            ),
        },
    ];

    return (
        <AdminLayout title="Ulasan">
            <Head title="Ulasan — Admin JejakJalur" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-stone-800">Moderasi Ulasan</h2>
                    <p className="text-sm text-stone-500">{ulasan.total} ulasan</p>
                </div>

                <DataTable
                    columns={columns}
                    data={ulasan.data}
                    pagination={ulasan}
                    keyField="id"
                    empty="Belum ada ulasan."
                />
            </div>

            <ConfirmModal
                open={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                description="Ulasan yang dihapus tidak bisa dipulihkan."
            />
        </AdminLayout>
    );
}

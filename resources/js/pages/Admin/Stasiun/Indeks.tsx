import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import { useConfirm } from '@/hooks/useConfirm';
import { MOCK_STASIUN } from '@/lib/mock-data';
import { Head, Link, router } from '@inertiajs/react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

interface StasiunRow {
    id: string;
    nama: string;
    kode_stasiun: string;
    kota: { nama: string };
    [key: string]: unknown;
}

interface Props {
    stasiun?: StasiunRow[];
}

export default function StasiunIndeks({ stasiun: stasiunProp }: Props) {
    const stasiun = (stasiunProp ?? MOCK_STASIUN) as StasiunRow[];
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-12',
            render: (row: StasiunRow) => (
                <span className="text-stone-400">
                    {stasiun.indexOf(row) + 1}
                </span>
            ),
        },
        { key: 'nama', header: 'Nama Stasiun' },
        { key: 'kode_stasiun', header: 'Kode' },
        {
            key: 'kota',
            header: 'Kota',
            render: (row: StasiunRow) => (
                <span className="text-stone-600">{row.kota.nama}</span>
            ),
        },
        {
            key: 'aksi',
            header: 'Aksi',
            className: 'w-32',
            render: (row: StasiunRow) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/stasiun/${row.id}/edit`}>
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<IconPencil size={13} />}
                        >
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<IconTrash size={13} />}
                        onClick={() =>
                            confirm(() =>
                                router.delete(`/admin/stasiun/${row.id}`),
                            )
                        }
                    >
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout title="Stasiun">
            <Head title="Stasiun — Admin JejakJalur" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-stone-800">
                            Daftar Stasiun
                        </h2>
                        <p className="text-sm text-stone-500">
                            {stasiun.length} stasiun terdaftar
                        </p>
                    </div>
                    <Link href="/admin/stasiun/buat">
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<IconPlus size={15} />}
                        >
                            Tambah Stasiun
                        </Button>
                    </Link>
                </div>

                <DataTable
                    columns={columns}
                    data={stasiun}
                    keyField="id"
                    empty="Belum ada stasiun."
                />
            </div>

            <ConfirmModal
                open={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                description="Stasiun yang dihapus tidak bisa dipulihkan."
            />
        </AdminLayout>
    );
}

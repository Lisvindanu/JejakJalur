import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import type { PaginatedData } from '@/types';
import { useConfirm } from '@/hooks/useConfirm';
import { MOCK_STASIUN, mockPaginate } from '@/lib/mock-data';
import { Head, Link, router } from '@inertiajs/react';
import { IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

interface StasiunRow {
    id: string;
    nama: string;
    kode_stasiun: string;
    kota: { nama: string };
    [key: string]: unknown;
}

interface Props {
    stasiun?: PaginatedData<StasiunRow>;
    search?: string;
}

export default function StasiunIndeks({ stasiun: stasiunProp, search: searchProp }: Props) {
    const stasiun = stasiunProp ?? mockPaginate(MOCK_STASIUN as unknown as StasiunRow[]);
    const [search, setSearch] = useState(searchProp ?? '');
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    function handleSearch(value: string) {
        setSearch(value);
        router.get('/admin/stasiun', value ? { search: value } : {}, { preserveState: true, replace: true });
    }

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-12',
            render: (row: StasiunRow) => (
                <span className="text-stone-400">
                    {stasiun.data.indexOf(row) + 1 + (stasiun.current_page - 1) * stasiun.per_page}
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
                            {stasiun.total} stasiun terdaftar
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

                <div className="w-64">
                    <Input
                        placeholder="Cari stasiun atau kota..."
                        value={search}
                        leftIcon={<IconSearch size={15} />}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={stasiun.data}
                    pagination={stasiun}
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

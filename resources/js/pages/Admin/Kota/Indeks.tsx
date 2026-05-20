import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import type { Kota } from '@/types';
import { useConfirm } from '@/hooks/useConfirm';
import { MOCK_KOTA } from '@/lib/mock-data';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

interface Props {
    kota?: Kota[];
}

type KotaRow = {
    id: string;
    nama: string;
    kode_ibukota: string;
    jumlah_stasiun: number;
    [key: string]: unknown;
};

export default function KotaIndeks({ kota: kotaProp }: Props) {
    const kota = kotaProp ?? MOCK_KOTA;
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    const rows: KotaRow[] = kota.map((k) => ({
        id: k.id,
        nama: k.nama,
        kode_ibukota: k.kode_ibukota,
        jumlah_stasiun: k.stasiun?.length ?? 0,
    }));

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-12',
            render: (_row: KotaRow) => {
                const index = rows.indexOf(_row) + 1;
                return <span className="text-stone-400">{index}</span>;
            },
        },
        { key: 'nama', header: 'Nama Kota' },
        { key: 'kode_ibukota', header: 'Kode' },
        {
            key: 'jumlah_stasiun',
            header: 'Jumlah Stasiun',
            render: (row: KotaRow) => (
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                    {row.jumlah_stasiun} stasiun
                </span>
            ),
        },
        {
            key: 'aksi',
            header: 'Aksi',
            className: 'w-32',
            render: (row: KotaRow) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/kota/${row.id}/edit`}>
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
                                router.delete(`/admin/kota/${row.id}`),
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
        <AdminLayout title="Kota">
            <Head title="Kota — Admin JejakJalur" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-stone-800">
                            Daftar Kota
                        </h2>
                        <p className="text-sm text-stone-500">
                            {kota.length} kota terdaftar
                        </p>
                    </div>
                    <Link href="/admin/kota/buat">
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<IconPlus size={15} />}
                        >
                            Tambah Kota
                        </Button>
                    </Link>
                </div>

                <DataTable
                    columns={columns}
                    data={rows}
                    keyField="id"
                    empty="Belum ada kota."
                />
            </div>

            <ConfirmModal
                open={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                description="Kota yang dihapus beserta seluruh stasiunnya tidak bisa dipulihkan."
            />
        </AdminLayout>
    );
}

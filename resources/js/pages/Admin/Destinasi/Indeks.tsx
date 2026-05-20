import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import Badge from '@/components/elements/Badge';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import type { Destinasi, PaginatedData } from '@/types';
import { useConfirm } from '@/hooks/useConfirm';
import { MOCK_DESTINASI, MOCK_STASIUN, mockPaginate } from '@/lib/mock-data';
import { Head, Link, router } from '@inertiajs/react';
import {
    IconCheck,
    IconPencil,
    IconPlus,
    IconSearch,
    IconTrash,
} from '@tabler/icons-react';

interface Props {
    destinasi?: PaginatedData<Destinasi>;
    semuaStasiun?: Array<{ id: string; nama: string; kota: { nama: string } }>;
    filter?: {
        kata_kunci?: string;
        stasiun_id?: string;
        kategori?: string;
    };
}

const kategoriOptions = [
    { value: 'Wisata', label: 'Wisata' },
    { value: 'Kuliner', label: 'Kuliner' },
    { value: 'UMKM', label: 'UMKM' },
];

export default function DestinasiIndeks({
    destinasi: destProp,
    semuaStasiun: stasiunProp,
    filter: fil,
}: Props) {
    const destinasi = destProp ?? mockPaginate(MOCK_DESTINASI);
    const semuaStasiun = (stasiunProp ?? MOCK_STASIUN) as Array<{
        id: string;
        nama: string;
        kota: { nama: string };
    }>;
    const filter = fil ?? {};
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    function applyFilter(partial: Partial<typeof filter>) {
        const params: Record<string, string> = {};
        const merged = { ...filter, ...partial };
        if (merged.kata_kunci) params.kata_kunci = merged.kata_kunci;
        if (merged.stasiun_id) params.stasiun_id = merged.stasiun_id;
        if (merged.kategori) params.kategori = merged.kategori;
        router.get('/admin/destinasi', params, { preserveState: true });
    }

    const stasiunOptions = semuaStasiun.map((s) => ({
        value: s.id,
        label: `${s.nama} — ${s.kota.nama}`,
    }));

    type DestinasiRow = Destinasi & Record<string, unknown>;

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-12',
            render: (_row: DestinasiRow) => {
                const idx = destinasi.data.findIndex((d) => d.id === _row.id);
                const from = destinasi.from ?? 1;
                return <span className="text-stone-400">{from + idx}</span>;
            },
        },
        { key: 'nama', header: 'Nama Destinasi' },
        {
            key: 'kategori',
            header: 'Kategori',
            render: (row: DestinasiRow) => (
                <Badge kategori={row.kategori}>{row.kategori}</Badge>
            ),
        },
        {
            key: 'stasiun',
            header: 'Stasiun',
            render: (row: DestinasiRow) => (
                <span className="text-stone-600">
                    {row.stasiun.nama}
                    <span className="ml-1 text-stone-400">
                        ({row.stasiun.kota.nama})
                    </span>
                </span>
            ),
        },
        {
            key: 'rating',
            header: 'Rating',
            render: (row: DestinasiRow) => (
                <span className="font-medium text-amber-600">
                    {Number(row.rating).toFixed(1)}
                </span>
            ),
        },
        {
            key: 'is_verified',
            header: 'Status',
            render: (row: DestinasiRow) =>
                row.is_verified ? (
                    <Badge verified>Terverifikasi</Badge>
                ) : (
                    <span className="text-xs text-stone-400">Belum</span>
                ),
        },
        {
            key: 'aksi',
            header: 'Aksi',
            className: 'w-48',
            render: (row: DestinasiRow) => (
                <div className="flex items-center gap-1.5">
                    <Button
                        variant={row.is_verified ? 'secondary' : 'outline'}
                        size="sm"
                        leftIcon={<IconCheck size={13} />}
                        onClick={() =>
                            router.patch(
                                `/admin/destinasi/${row.id}/verifikasi`,
                                {},
                            )
                        }
                        title={
                            row.is_verified
                                ? 'Batalkan verifikasi'
                                : 'Verifikasi'
                        }
                    >
                        {row.is_verified ? 'Batalkan' : 'Verifikasi'}
                    </Button>
                    <Link href={`/admin/destinasi/${row.id}/edit`}>
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
                                router.delete(`/admin/destinasi/${row.id}`),
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
        <AdminLayout title="Destinasi">
            <Head title="Destinasi — Admin JejakJalur" />

            <div className="space-y-4">
                {/* Page header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-stone-800">
                            Daftar Destinasi
                        </h2>
                        <p className="text-sm text-stone-500">
                            {destinasi.total} destinasi terdaftar
                        </p>
                    </div>
                    <Link href="/admin/destinasi/buat">
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<IconPlus size={15} />}
                        >
                            Tambah Destinasi
                        </Button>
                    </Link>
                </div>

                {/* Filter bar */}
                <div className="flex flex-wrap gap-3 rounded-xl border border-stone-100 bg-white p-4">
                    <div className="min-w-52 flex-1">
                        <Input
                            placeholder="Cari destinasi..."
                            defaultValue={filter.kata_kunci ?? ''}
                            leftIcon={<IconSearch size={15} />}
                            onChange={(e) =>
                                applyFilter({ kata_kunci: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-40">
                        <Select
                            options={kategoriOptions}
                            placeholder="Semua kategori"
                            value={filter.kategori ?? ''}
                            onChange={(e) =>
                                applyFilter({ kategori: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-56">
                        <Select
                            options={stasiunOptions}
                            placeholder="Semua stasiun"
                            value={filter.stasiun_id ?? ''}
                            onChange={(e) =>
                                applyFilter({ stasiun_id: e.target.value })
                            }
                        />
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={destinasi.data as DestinasiRow[]}
                    pagination={destinasi}
                    keyField="id"
                    empty="Belum ada destinasi."
                />
            </div>

            <ConfirmModal
                open={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                description="Destinasi yang dihapus beserta seluruh ulasannya tidak bisa dipulihkan."
            />
        </AdminLayout>
    );
}

import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import { useConfirm } from '@/hooks/useConfirm';
import type { PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { IconEye, IconEyeOff, IconFlag, IconStar, IconTrash } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface Ulasan {
    id: string;
    judul: string;
    konten: string;
    rating: number;
    reports_count: number;
    is_hidden: boolean;
    user_name: string | null;
    user_id: string;
    destinasi_nama: string | null;
    destinasi_id: string;
    created_at: string;
    [key: string]: unknown;
}

interface Props {
    ulasan: PaginatedData<Ulasan>;
    filter: string;
    counts: { semua: number; dilaporkan: number; disembunyikan: number };
}

const TABS = [
    { key: 'semua', label: 'Semua' },
    { key: 'dilaporkan', label: 'Dilaporkan' },
    { key: 'disembunyikan', label: 'Disembunyikan' },
];

export default function UlasanIndeks({ ulasan, filter, counts }: Props) {
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    function goFilter(f: string) {
        router.get('/admin/ulasan', { filter: f }, { preserveState: true });
    }

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
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-stone-800">{row.judul}</p>
                        {row.is_hidden && (
                            <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
                                Disembunyikan
                            </span>
                        )}
                    </div>
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
            key: 'reports_count',
            header: 'Laporan',
            render: (row: Ulasan) =>
                row.reports_count > 0 ? (
                    <div className="flex items-center gap-1 text-xs font-medium text-red-500">
                        <IconFlag size={12} />
                        {row.reports_count}
                    </div>
                ) : (
                    <span className="text-xs text-stone-300">—</span>
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
            className: 'w-40',
            render: (row: Ulasan) => (
                <div className="flex items-center gap-1.5">
                    {row.is_hidden ? (
                        <Button
                            variant="secondary"
                            size="sm"
                            leftIcon={<IconEye size={12} />}
                            onClick={() => router.patch(`/admin/ulasan/${row.id}/tampilkan`, {}, { preserveScroll: true })}
                        >
                            Tampilkan
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            size="sm"
                            leftIcon={<IconEyeOff size={12} />}
                            onClick={() => router.patch(`/admin/ulasan/${row.id}/sembunyikan`, {}, { preserveScroll: true })}
                        >
                            Sembunyikan
                        </Button>
                    )}
                    <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<IconTrash size={12} />}
                        onClick={() => confirm(() => router.delete(`/admin/ulasan/${row.id}`))}
                    >
                        Hapus
                    </Button>
                </div>
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

                {/* Filter tabs */}
                <div className="flex gap-2 border-b border-stone-200">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => goFilter(tab.key)}
                            className={cn(
                                'flex items-center gap-1.5 border-b-2 px-3 pb-2 text-sm font-medium transition-colors',
                                filter === tab.key
                                    ? 'border-emerald-600 text-emerald-700'
                                    : 'border-transparent text-stone-500 hover:text-stone-700',
                            )}
                        >
                            {tab.label}
                            <span className={cn(
                                'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                                filter === tab.key ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500',
                            )}>
                                {counts[tab.key as keyof typeof counts]}
                            </span>
                        </button>
                    ))}
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

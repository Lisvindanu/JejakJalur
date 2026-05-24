import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/elements/Button';
import DataTable from '@/components/fragments/Admin/DataTable';
import ConfirmModal from '@/components/fragments/Admin/ConfirmModal';
import { useConfirm } from '@/hooks/useConfirm';
import type { PaginatedData } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Klaim {
    id: string;
    keterangan: string;
    status: 'menunggu' | 'disetujui' | 'ditolak';
    catatan_admin: string | null;
    created_at: string;
    destinasi: { id: string; nama: string; kategori: string } | null;
    user: { id: string; name: string; email: string } | null;
    [key: string]: unknown;
}

interface Props {
    klaim: PaginatedData<Klaim>;
    filter: { status?: string };
}

const STATUS_LABEL: Record<string, string> = {
    menunggu: 'Menunggu',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
};

const STATUS_CLASS: Record<string, string> = {
    menunggu: 'bg-amber-100 text-amber-700',
    disetujui: 'bg-emerald-100 text-emerald-700',
    ditolak: 'bg-red-100 text-red-600',
};

const TABS = [
    { key: '', label: 'Semua' },
    { key: 'menunggu', label: 'Menunggu' },
    { key: 'disetujui', label: 'Disetujui' },
    { key: 'ditolak', label: 'Ditolak' },
];

export default function KlaimIndeks({ klaim, filter }: Props) {
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();
    const [tolakModal, setTolakModal] = useState<Klaim | null>(null);
    const { data, setData, patch, processing, reset } = useForm({ catatan_admin: '' });

    const activeFilter = filter.status ?? '';

    function goFilter(f: string) {
        router.get('/admin/klaim', f ? { status: f } : {}, { preserveState: true });
    }

    function handleSetujui(row: Klaim) {
        confirm(() => router.patch(`/admin/klaim/${row.id}/setujui`, {}, { preserveScroll: true }));
    }

    function handleTolakSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!tolakModal) return;
        patch(`/admin/klaim/${tolakModal.id}/tolak`, {
            preserveScroll: true,
            onSuccess: () => {
                setTolakModal(null);
                reset();
            },
        });
    }

    const columns = [
        {
            key: 'no',
            header: 'No',
            className: 'w-10',
            render: (_: Klaim) => {
                const idx = klaim.data.indexOf(_) + 1 + (klaim.current_page - 1) * klaim.per_page;
                return <span className="text-stone-400">{idx}</span>;
            },
        },
        {
            key: 'destinasi',
            header: 'Destinasi',
            render: (row: Klaim) =>
                row.destinasi ? (
                    <Link
                        href={`/destinasi/${row.destinasi.id}`}
                        className="text-sm font-medium text-emerald-700 hover:underline"
                    >
                        {row.destinasi.nama}
                    </Link>
                ) : (
                    <span className="text-stone-400">—</span>
                ),
        },
        {
            key: 'user',
            header: 'Pengklaim',
            render: (row: Klaim) =>
                row.user ? (
                    <div>
                        <p className="text-sm font-medium text-stone-800">{row.user.name}</p>
                        <p className="text-xs text-stone-400">{row.user.email}</p>
                    </div>
                ) : (
                    <span className="text-stone-400">—</span>
                ),
        },
        {
            key: 'keterangan',
            header: 'Keterangan',
            render: (row: Klaim) => (
                <p className="line-clamp-2 max-w-xs text-sm text-stone-600">{row.keterangan}</p>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            render: (row: Klaim) => (
                <span
                    className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        STATUS_CLASS[row.status] ?? 'bg-stone-100 text-stone-500',
                    )}
                >
                    {STATUS_LABEL[row.status] ?? row.status}
                </span>
            ),
        },
        { key: 'created_at', header: 'Tanggal' },
        {
            key: 'aksi',
            header: 'Aksi',
            className: 'w-48',
            render: (row: Klaim) =>
                row.status === 'menunggu' ? (
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<IconCheck size={12} />}
                            onClick={() => handleSetujui(row)}
                        >
                            Setujui
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            leftIcon={<IconX size={12} />}
                            onClick={() => setTolakModal(row)}
                        >
                            Tolak
                        </Button>
                    </div>
                ) : (
                    row.catatan_admin ? (
                        <p className="text-xs text-stone-400 italic">{row.catatan_admin}</p>
                    ) : (
                        <span className="text-xs text-stone-300">—</span>
                    )
                ),
        },
    ];

    return (
        <AdminLayout title="Klaim Destinasi">
            <Head title="Klaim Destinasi — Admin JejakJalur" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-stone-800">Klaim Kepemilikan Destinasi</h2>
                    <p className="text-sm text-stone-500">{klaim.total} pengajuan</p>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 border-b border-stone-200">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => goFilter(tab.key)}
                            className={cn(
                                'border-b-2 px-3 pb-2 text-sm font-medium transition-colors',
                                activeFilter === tab.key
                                    ? 'border-emerald-600 text-emerald-700'
                                    : 'border-transparent text-stone-500 hover:text-stone-700',
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <DataTable
                    columns={columns}
                    data={klaim.data}
                    pagination={klaim}
                    keyField="id"
                    empty="Belum ada pengajuan klaim."
                />
            </div>

            {/* Confirm setujui modal */}
            <ConfirmModal
                open={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                description="Kepemilikan destinasi akan dipindahkan ke pengklaim. Tindakan ini tidak bisa dibatalkan."
            />

            {/* Tolak modal */}
            {tolakModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="mb-1 text-base font-semibold text-stone-800">Tolak Pengajuan Klaim</h3>
                        <p className="mb-4 text-sm text-stone-500">
                            Klaim dari <strong>{tolakModal.user?.name}</strong> untuk{' '}
                            <strong>{tolakModal.destinasi?.nama}</strong> akan ditolak.
                        </p>
                        <form onSubmit={handleTolakSubmit}>
                            <label className="mb-1 block text-sm font-medium text-stone-700">
                                Catatan untuk pengklaim (opsional)
                            </label>
                            <textarea
                                value={data.catatan_admin}
                                onChange={(e) => setData('catatan_admin', e.target.value)}
                                rows={3}
                                maxLength={300}
                                placeholder="Contoh: Keterangan tidak cukup membuktikan kepemilikan."
                                className="w-full resize-none rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                            />
                            <div className="mt-4 flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => { setTolakModal(null); reset(); }}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" variant="danger" disabled={processing}>
                                    {processing ? 'Menolak...' : 'Tolak Klaim'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

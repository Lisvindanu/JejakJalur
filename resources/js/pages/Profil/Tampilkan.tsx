import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    IconLayoutDashboard,
    IconMapPin,
    IconPencil,
    IconStar,
    IconTrash,
} from '@tabler/icons-react';
import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal';
import PublicLayout from '@/components/layouts/PublicLayout';
import { useConfirm } from '@/hooks/useConfirm';
import { formatTanggal } from '@/lib/utils';
import { MOCK_PENGGUNA } from '@/lib/mock-data';
import type { SharedProps } from '@/types';

interface Pengguna {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    created_at: string;
    is_admin?: boolean;
}

interface Props {
    pengguna?: Pengguna;
    jumlah_ulasan?: number;
    rata_rata_rating?: number | null;
    jumlah_destinasi_diulas?: number;
}

function StatItem({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                {icon}
            </span>
            <div>
                <div className="text-xl font-bold tabular-nums text-stone-900">
                    {value}
                </div>
                <div className="text-xs text-stone-500">{label}</div>
            </div>
        </div>
    );
}

export default function Tampilkan({
    pengguna: penggunaProp,
    jumlah_ulasan = 0,
    rata_rata_rating = null,
    jumlah_destinasi_diulas = 0,
}: Props) {
    const pengguna = penggunaProp ?? MOCK_PENGGUNA;
    const { auth } = usePage<SharedProps>().props;
    const isAdmin = pengguna.is_admin ?? auth?.user?.is_admin ?? false;

    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    function handleDelete() {
        confirm(() => {
            router.delete('/profil');
        });
    }

    return (
        <PublicLayout>
            <Head title="Profil — JejakJalur" />

            <div className="px-4 pt-24 pb-16 sm:px-6">
                <div className="mx-auto max-w-4xl">
                    {/* Main profile card */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                            <Avatar
                                name={pengguna.name}
                                src={pengguna.avatar}
                                size="lg"
                                className="h-16 w-16 shrink-0 text-xl"
                            />
                            <div className="min-w-0 flex-1">
                                <h1 className="text-2xl font-bold text-stone-900">
                                    {pengguna.name}
                                </h1>
                                <p className="mt-0.5 text-sm text-stone-500">
                                    {pengguna.email}
                                </p>
                                <p className="mt-0.5 text-xs text-stone-400">
                                    Bergabung sejak{' '}
                                    {formatTanggal(pengguna.created_at)}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Link
                                        href="/profil/edit"
                                        className="no-underline"
                                    >
                                        <Button
                                            variant="outline"
                                            leftIcon={<IconPencil size={15} />}
                                        >
                                            Edit Profil
                                        </Button>
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            href="/admin"
                                            className="no-underline"
                                        >
                                            <Button
                                                variant="secondary"
                                                leftIcon={
                                                    <IconLayoutDashboard
                                                        size={15}
                                                    />
                                                }
                                            >
                                                Admin Panel
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-stone-100 pt-6 sm:grid-cols-3">
                            <StatItem
                                icon={<IconPencil size={18} />}
                                value={jumlah_ulasan}
                                label="Ulasan ditulis"
                            />
                            <StatItem
                                icon={<IconStar size={18} />}
                                value={
                                    rata_rata_rating != null
                                        ? Number(rata_rata_rating).toFixed(1)
                                        : '—'
                                }
                                label="Rata-rata rating"
                            />
                            <StatItem
                                icon={<IconMapPin size={18} />}
                                value={jumlah_destinasi_diulas}
                                label="Destinasi diulas"
                            />
                        </div>
                    </div>

                    {/* Danger zone */}
                    <div className="mt-6 rounded-2xl border border-red-200 bg-white p-6 sm:p-8">
                        <h3 className="font-semibold text-red-700">
                            Zona Bahaya
                        </h3>
                        <p className="mt-1 text-sm text-stone-600">
                            Tindakan ini tidak dapat dibatalkan. Semua ulasan dan
                            data akun akan dihapus permanen.
                        </p>
                        <Button
                            variant="danger"
                            className="mt-4"
                            leftIcon={<IconTrash size={15} />}
                            onClick={handleDelete}
                        >
                            Hapus Akun Saya
                        </Button>
                    </div>
                </div>
            </div>

            <Modal
                open={isOpen}
                onClose={handleCancel}
                title="Hapus Akun"
                size="sm"
                footer={
                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={handleCancel}>
                            Batal
                        </Button>
                        <Button variant="danger" onClick={handleConfirm}>
                            Ya, Hapus
                        </Button>
                    </div>
                }
            >
                <p className="text-sm text-stone-600">
                    Apakah kamu yakin ingin menghapus akun? Tindakan ini tidak
                    dapat dibatalkan dan semua data akunmu akan dihapus permanen.
                </p>
            </Modal>
        </PublicLayout>
    );
}

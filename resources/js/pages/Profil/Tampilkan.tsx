import { Head, Link, router } from '@inertiajs/react';
import { IconCalendar, IconEdit, IconTrash } from '@tabler/icons-react';
import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal';
import PublicLayout from '@/components/layouts/PublicLayout';
import { useConfirm } from '@/hooks/useConfirm';
import { formatTanggal } from '@/lib/utils';
import { MOCK_PENGGUNA } from '@/lib/mock-data';

interface Pengguna {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    created_at: string;
}

interface Props {
    pengguna?: Pengguna;
}

export default function Tampilkan({ pengguna: penggunaProp }: Props) {
    const pengguna = penggunaProp ?? MOCK_PENGGUNA;
    const { isOpen, confirm, handleConfirm, handleCancel } = useConfirm();

    function handleDelete() {
        confirm(() => {
            router.delete('/profil');
        });
    }

    return (
        <PublicLayout>
            <Head title="Profil — JejakJalur" />

            <div className="px-[max(24px,calc(50%-576px))] pt-24 pb-16">
                <div className="mx-auto max-w-xl">
                    {/* Profile card */}
                    <div className="rounded-2xl border border-stone-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <Avatar
                                name={pengguna.name}
                                src={pengguna.avatar}
                                size="lg"
                                className="mb-4 h-16 w-16 text-xl"
                            />
                            <h1 className="mb-1 text-xl font-semibold text-stone-800">
                                {pengguna.name}
                            </h1>
                            <p className="mb-3 text-sm text-stone-500">
                                {pengguna.email}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-stone-400">
                                <IconCalendar size={13} />
                                <span>
                                    Bergabung{' '}
                                    {formatTanggal(pengguna.created_at)}
                                </span>
                            </div>
                        </div>

                        <hr className="mb-6 border-stone-100" />

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <Link href="/profil/edit" className="no-underline">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    leftIcon={<IconEdit size={16} />}
                                >
                                    Edit Profil
                                </Button>
                            </Link>
                            <Button
                                variant="danger"
                                className="w-full"
                                leftIcon={<IconTrash size={16} />}
                                onClick={handleDelete}
                            >
                                Hapus Akun
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm delete modal */}
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
                    dapat dibatalkan dan semua data akunmu akan dihapus
                    permanen.
                </p>
            </Modal>
        </PublicLayout>
    );
}

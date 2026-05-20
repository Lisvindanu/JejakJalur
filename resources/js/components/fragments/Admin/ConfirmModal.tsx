import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal';
import { IconAlertTriangle } from '@tabler/icons-react';

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    loading?: boolean;
}

export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title = 'Konfirmasi Hapus',
    description = 'Tindakan ini tidak bisa dibatalkan.',
    confirmLabel = 'Hapus',
    loading = false,
}: ConfirmModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            size="sm"
            footer={
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col items-center gap-3 py-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                    <IconAlertTriangle size={24} className="text-amber-600" />
                </div>
                <div>
                    <p className="font-semibold text-stone-800">{title}</p>
                    <p className="mt-1 text-sm text-stone-500">{description}</p>
                </div>
            </div>
        </Modal>
    );
}

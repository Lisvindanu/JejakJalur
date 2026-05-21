import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import { useFlash } from '@/hooks/useFlash';

interface ToastProps {
    /** Pixels from the top of the viewport — set to clear the navbar. */
    offsetPx?: number;
}

export default function Toast({ offsetPx = 72 }: ToastProps) {
    const { flash, visible, dismiss } = useFlash();

    if (!visible) return null;

    if (flash.sukses) {
        return (
            <div
                className="fixed right-4 z-[300] flex max-w-sm items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg animate-slide-in-right"
                style={{ top: `${offsetPx}px` }}
            >
                <IconCheck size={16} className="shrink-0 text-emerald-600" />
                <span className="flex-1">{flash.sukses}</span>
                <button
                    onClick={dismiss}
                    className="shrink-0 rounded-md p-0.5 text-emerald-500 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
                    aria-label="Tutup notifikasi"
                >
                    <IconX size={13} />
                </button>
            </div>
        );
    }

    if (flash.error) {
        return (
            <div
                className="fixed right-4 z-[300] flex max-w-sm items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-lg animate-slide-in-right"
                style={{ top: `${offsetPx}px` }}
            >
                <IconAlertCircle size={16} className="shrink-0 text-red-500" />
                <span className="flex-1">{flash.error}</span>
                <button
                    onClick={dismiss}
                    className="shrink-0 rounded-md p-0.5 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
                    aria-label="Tutup notifikasi"
                >
                    <IconX size={13} />
                </button>
            </div>
        );
    }

    return null;
}

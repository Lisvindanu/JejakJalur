import { cn } from '@/lib/utils';
import { IconX } from '@tabler/icons-react';
import { type ReactNode, useEffect } from 'react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    footer?: ReactNode;
    size?: ModalSize;
    children: ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
};

export default function Modal({
    open,
    onClose,
    title,
    footer,
    size = 'md',
    children,
}: ModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={cn(
                    'relative z-10 flex max-h-[90vh] w-full flex-col rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.22)]',
                    sizeClasses[size],
                )}
            >
                {title && (
                    <div className="flex shrink-0 items-center justify-between border-b border-stone-100 px-6 py-4">
                        <h2 className="text-base font-semibold text-stone-800">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                        >
                            <IconX size={18} />
                        </button>
                    </div>
                )}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {children}
                </div>
                {footer && (
                    <div className="shrink-0 border-t border-stone-100 px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

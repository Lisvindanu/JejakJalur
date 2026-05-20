import { useState } from 'react';

export function useConfirm() {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState<(() => void) | null>(null);

    const confirm = (callback: () => void) => {
        setPending(() => callback);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        pending?.();
        setIsOpen(false);
        setPending(null);
    };

    const handleCancel = () => {
        setIsOpen(false);
        setPending(null);
    };

    return { isOpen, confirm, handleConfirm, handleCancel };
}

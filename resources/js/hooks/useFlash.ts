import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { SharedProps } from '@/types';

export function useFlash() {
    const { flash } = usePage<SharedProps>().props;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        const t = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(t);
    }, [flash]);

    return { flash, visible, dismiss: () => setVisible(false) };
}

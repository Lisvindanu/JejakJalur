import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useSearch(initialValue = '', delay = 400) {
    const [value, setValue] = useState(initialValue);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const search = useCallback(
        (params: Record<string, string | undefined>) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                router.get(
                    window.location.pathname,
                    params as Record<string, string>,
                    { preserveState: true, replace: true },
                );
            }, delay);
        },
        [delay],
    );

    useEffect(() => () => clearTimeout(timer.current), []);

    return { value, setValue, search };
}

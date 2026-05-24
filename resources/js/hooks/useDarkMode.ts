import { useEffect, useState } from 'react';

const KEY = 'jj:dark-mode';

function getInitial(): boolean {
    try {
        const stored = localStorage.getItem(KEY);
        if (stored !== null) return stored === 'true';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
        return false;
    }
}

export function useDarkMode() {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        const initial = getInitial();
        setDark(initial);
        document.documentElement.classList.toggle('dark', initial);
    }, []);

    function toggle() {
        setDark((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle('dark', next);
            try {
                localStorage.setItem(KEY, String(next));
            } catch {}
            return next;
        });
    }

    return { dark, toggle };
}

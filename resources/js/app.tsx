import { createInertiaApp } from '@inertiajs/react';

// Initialize dark mode before React renders to avoid flash
try {
    const stored = localStorage.getItem('jj:dark-mode');
    const dark =
        stored !== null
            ? stored === 'true'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
} catch {}

// Register service worker (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // SW registration failure is non-critical
        });
    });
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
});

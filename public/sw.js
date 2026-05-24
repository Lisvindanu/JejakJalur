const CACHE_VERSION = 'jj-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Assets to pre-cache on install
const PRECACHE_URLS = ['/', '/destinasi', '/rute', '/offline.html'];

// ─── Install ───
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting()),
    );
});

// ─── Activate ───
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
                        .map((k) => caches.delete(k)),
                ),
            )
            .then(() => self.clients.claim()),
    );
});

// ─── Fetch ───
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET, chrome-extension, and API/admin requests
    if (request.method !== 'GET') return;
    if (request.url.includes('/api/') || request.url.includes('/admin')) return;
    if (!request.url.startsWith(self.location.origin)) return;

    const url = new URL(request.url);

    // Static assets (JS/CSS/fonts/images): cache-first
    if (
        url.pathname.startsWith('/build/') ||
        url.pathname.match(/\.(woff2?|ttf|otf|eot)$/) ||
        url.pathname.match(/\.(png|jpe?g|svg|ico|webp)$/)
    ) {
        event.respondWith(
            caches.match(request).then(
                (cached) =>
                    cached ||
                    fetch(request).then((response) => {
                        if (response.ok) {
                            const clone = response.clone();
                            caches
                                .open(RUNTIME_CACHE)
                                .then((c) => c.put(request, clone));
                        }
                        return response;
                    }),
            ),
        );
        return;
    }

    // Navigation: network-first, fall back to cache, then /offline
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.ok) {
                        const clone = response.clone();
                        caches
                            .open(RUNTIME_CACHE)
                            .then((c) => c.put(request, clone));
                    }
                    return response;
                })
                .catch(() =>
                    caches
                        .match(request)
                        .then((cached) => cached || caches.match('/offline.html')),
                ),
        );
    }
});

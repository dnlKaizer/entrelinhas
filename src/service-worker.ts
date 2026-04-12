import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: any;

type PushPayload = {
    title?: string;
    body?: string;
    icon?: string;
    badge?: string;
    url?: string;
};

clientsClaim();
// Precache dos arquivos estáticos (HTML, CSS, JS gerados no build)
precacheAndRoute(self.__WB_MANIFEST);

// ─── Cache Dinâmico: Chamadas de API do Supabase ────────────
registerRoute(
    ({ url, request }) => request.destination !== 'image' && !!url.href.match(/^https:\/\/.*\.supabase\.co\/.*/i),
    new NetworkFirst({
        cacheName: 'api-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 horas
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);

// ─── Cache Dinâmico: Imagens ───────────────────────────────
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images-cache',
        plugins: [
            {
                // Limpa a URL antes de criar o tracking no Cache e no IndexedDB
                cacheKeyWillBeUsed: async ({ request }) => {
                    const url = new URL(request.url);
                    url.search = '';
                    return url.href;
                }
            },
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
                purgeOnQuotaError: true, // Bonus stability
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);

// ─── Push handler ───────────────────────────────────────────
self.addEventListener('push', (event: any) => {
    const fallbackData = {
        title: 'Nova notificação',
        body: 'Você tem uma nova mensagem.',
        icon: '/launcher-icon-192x192.png',
    };

    let data: PushPayload = fallbackData;

    if (event.data) {
        try {
            data = event.data.json();
        } catch {
            data = {
                ...fallbackData,
                body: event.data.text() || fallbackData.body,
            };
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title || fallbackData.title, {
            body: data.body || fallbackData.body,
            icon: data.icon ?? fallbackData.icon,
            badge: data.badge ?? '/badge-72x72.png',
            data: data.url ? { url: data.url } : undefined,
        })
    );
});

// ─── Clique na notificação ──────────────────────────────────
self.addEventListener('notificationclick', (event: any) => {
    event.notification.close();

    const url = event.notification.data?.url ?? '/';

    event.waitUntil(
        self.clients
            .matchAll({ type: 'window', includeUncontrolled: true })
            .then((clients: any) => {
                const existing = clients.find((c: any) => c.url === url && 'focus' in c);
                if (existing) return existing.focus();
                return self.clients.openWindow(url);
            })
    );
});
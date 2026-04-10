import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: any;

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
        ],
    })
);
import { type VitePWAOptions } from 'vite-plugin-pwa'

export const pwaOptions: Partial<VitePWAOptions> = {
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'service-worker.ts',
    registerType: 'autoUpdate',
    injectManifest: {
        // Para injectManifest, usamos esta propriedade para definir o que vai no precache:
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
    },
    // Removidos arquivos que não existem no seu public (favicon.ico, apple-touch, etc)
    manifest: {
        name: 'Entrelinhas',
        short_name: 'Entrelinhas',
        description: 'Aplicativo para amantes de livros acompanharem suas leituras',
        theme_color: '#3f8fff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
            {
                src: 'launcher-icon-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'launcher-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
            }
        ]
    }
}
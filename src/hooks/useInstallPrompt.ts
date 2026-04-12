import { useState, useEffect } from 'react';

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

// Variáveis globais para guardar o evento caso ele dispare ANTES do HomePage carregar.
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
let globalShowInstall = false;

window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    globalShowInstall = true;
});

export function useInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(globalDeferredPrompt);
    const [showInstall, setShowInstall] = useState(globalShowInstall);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            globalDeferredPrompt = e as BeforeInstallPromptEvent;
            globalShowInstall = true;

            setDeferredPrompt(globalDeferredPrompt);
            setShowInstall(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Ao carregar o hook (HomePage), também verificamos se já existia a variável armazenada
        if (globalDeferredPrompt) {
            setDeferredPrompt(globalDeferredPrompt);
            setShowInstall(globalShowInstall);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('App instalado!');
        }

        // Reseta tudo após instalado
        globalDeferredPrompt = null;
        globalShowInstall = false;
        setDeferredPrompt(null);
        setShowInstall(false);
    };

    return { showInstall, handleInstall };
}

import { useCallback, useEffect, useState } from 'react';
import { pushNotificationService } from '../services/push-notification.service';
import {
    getPermissionState,
    subscribeToPush,
    unsubscribeFromPush,
} from '../utils/pushNotifications';

interface IUsePushNotificationsReturn {
    isSupported: boolean;
    permission: NotificationPermission;
    subscription: PushSubscription | null;
    isLoading: boolean;
    error: string | null;
    subscribe: () => Promise<PushSubscription | null>;
    sendNotificationToAll: (payload?: { title?: string; body?: string }) => Promise<void>;
    unsubscribe: () => Promise<void>;
}

export function usePushNotifications(): IUsePushNotificationsReturn {
    const isSupported =
        'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isSupported) return;

        setPermission(getPermissionState());

        navigator.serviceWorker.ready
            .then((registration) => registration.pushManager.getSubscription())
            .then(setSubscription)
            .catch((err: unknown) => {
                console.error('Erro ao recuperar subscription atual:', err);
                setError('Não foi possível carregar o estado das notificações.');
            });
    }, [isSupported]);

    const subscribe = useCallback(async (): Promise<PushSubscription | null> => {
        if (!isSupported) return null;

        setIsLoading(true);
        setError(null);

        try {
            const currentPermission = await Notification.requestPermission();
            setPermission(currentPermission);

            if (currentPermission !== 'granted') {
                return null;
            }

            const sub = await subscribeToPush();
            setSubscription(sub);

            if (!sub) {
                setError('Não foi possível criar a subscription de push.');
                return null;
            }

            await pushNotificationService.registerSubscription({
                subscription: sub.toJSON(),
            });

            return sub;
        } catch (err: unknown) {
            console.error('Erro ao ativar notificações push:', err);
            setError('Falha ao ativar notificações. Tente novamente.');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [isSupported]);

    const sendNotificationToAll = useCallback(async (): Promise<void> => {
        if (!isSupported) return;

        setIsLoading(true);
        setError(null);

        try {
            await pushNotificationService.sendNotificationToAll();
        } catch (err: unknown) {
            console.error('Erro ao enviar notificação:', err);
            setError('Falha ao enviar notificação.');
        } finally {
            setIsLoading(false);
        }
    }, [isSupported]);

    const unsubscribe = useCallback(async (): Promise<void> => {
        if (!isSupported) return;

        setIsLoading(true);
        setError(null);

        try {
            await unsubscribeFromPush();
            setSubscription(null);
        } catch (err: unknown) {
            console.error('Erro ao desativar notificações push:', err);
            setError('Falha ao desativar notificações.');
        } finally {
            setIsLoading(false);
        }
    }, [isSupported]);

    return {
        isSupported,
        permission,
        subscription,
        isLoading,
        error,
        subscribe,
        sendNotificationToAll,
        unsubscribe,
    };
}

import { supabase } from './supabase.client';

interface IRegisterPushSubscriptionPayload {
    subscription: PushSubscriptionJSON;
}

class PushNotificationService {
    async registerSubscription(payload: IRegisterPushSubscriptionPayload): Promise<void> {
        const endpoint = payload.subscription.endpoint;
        const keys = payload.subscription.keys;

        if (!endpoint || !keys?.p256dh || !keys?.auth) {
            throw new Error('Subscription inválida para salvar no backend.');
        }

        const { data, error } = await supabase.functions.invoke('save-subscription', {
            body: {
                endpoint,
                keys: {
                    p256dh: keys.p256dh,
                    auth: keys.auth,
                },
            },
        });

        if (error) {
            throw error;
        }

        console.log('Subscription registrada com sucesso:', data);
    }

    async sendNotificationToAll(): Promise<void> {
        const { data, error } = await supabase.functions.invoke('send-notification', {
            body: {},
        });

        if (error) {
            throw error;
        }

        console.log('Notificação de teste enviada com sucesso:', data);
    }
}

export const pushNotificationService = new PushNotificationService();

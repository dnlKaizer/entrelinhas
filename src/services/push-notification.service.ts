import { supabase } from './supabase.client';

interface IRegisterPushSubscriptionPayload {
    subscription: PushSubscriptionJSON;
}

interface ISendNotificationPayload {
    title?: string;
    description?: string;
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

    async sendNotificationToAll(payload?: ISendNotificationPayload): Promise<void> {
        const title = payload?.title?.trim();
        const description = payload?.description?.trim();
        const body = !title && !description
            ? {}
            : {
                title,
                description,
            };

        const { data, error } = await supabase.functions.invoke('send-notification', {
            body,
        });

        if (error) {
            throw error;
        }

        console.log('Notificação enviada com sucesso:', data);
    }
}

export const pushNotificationService = new PushNotificationService();

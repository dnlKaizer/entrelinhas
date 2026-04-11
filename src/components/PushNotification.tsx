import { Alert, Button } from 'antd';
import { usePushNotifications } from '../hooks/usePushNotifications';

export function PushNotification() {
    const {
        isSupported,
        permission,
        subscription,
        isLoading,
        error,
        subscribe,

        sendTestNotification,
        unsubscribe,
    } = usePushNotifications();

    if (!isSupported) {
        return (
            <Alert
                style={{ marginBottom: '12px' }}
                message="Push notifications não são suportadas neste navegador."
                type="warning"
                showIcon
            />
        );
    }

    if (permission === 'denied') {
        return (
            <Alert
                style={{ marginBottom: '12px' }}
                message="Notificações bloqueadas. Habilite nas configurações do navegador."
                type="warning"
                showIcon
            />
        );
    }

    if (subscription) {
        return (
            <Alert
                style={{ marginBottom: '12px' }}
                message="Notificações push ativadas!"
                type="success"
                showIcon
                action={
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button size="small" type="dashed" onClick={sendTestNotification} disabled={isLoading}>
                            {isLoading ? 'Enviando...' : 'Enviar teste'}
                        </Button>
                        <Button size="small" type="primary" ghost onClick={unsubscribe} disabled={isLoading}>
                            {isLoading ? 'Desativando...' : 'Desativar notificações'}
                        </Button>
                    </div>
                }
            />
        );
    }

    return (
        <>
            <Alert
                style={{ marginBottom: '12px' }}
                message="Receba notificações desta aplicação."
                type="info"
                showIcon
                action={
                    <Button size="small" type="dashed" onClick={subscribe} disabled={isLoading}>
                        {isLoading ? 'Ativando...' : 'Ativar notificações'}
                    </Button>
                }
            />
            {error && (
                <Alert
                    style={{ marginBottom: '12px' }}
                    message={error}
                    type="error"
                    showIcon
                />
            )}
        </>
    );
}

import { BellOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Modal, message } from 'antd';
import type { MenuProps } from 'antd';
import { useMemo, useState } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';

interface PushNotificationProps {
    isAdmin: boolean;
}

export function PushNotification({ isAdmin }: PushNotificationProps) {
    const {
        isSupported,
        permission,
        subscription,
        isLoading,
        error,
        subscribe,
        sendNotificationToAll,
        unsubscribe,
    } = usePushNotifications();
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleMenuClick(action: string): Promise<void> {
        if (action === 'subscribe') {
            const sub = await subscribe();
            if (sub) message.success('Notificações ativadas com sucesso.');
            return;
        }

        if (action === 'unsubscribe') {
            await unsubscribe();
            message.success('Notificações desativadas.');
            return;
        }

        if (action === 'send-all') {
            await sendNotificationToAll();
            message.success('Notificação enviada para todos os usuários.');
            return;
        }

        if (action === 'send-all-custom') {
            setIsCustomModalOpen(true);
        }
    }

    async function handleSendCustomNotification(): Promise<void> {
        try {
            await sendNotificationToAll({
                title,
                description,
            });
            message.success('Notificação enviada para todos os usuários.');
            setIsCustomModalOpen(false);
            setTitle('');
            setDescription('');
        } catch {
            if (error) {
                message.error(error);
                return;
            }
            message.error('Não foi possível enviar a notificação personalizada.');
        }
    }

    const items = useMemo<MenuProps['items']>(() => {
        const baseItems: MenuProps['items'] = [];

        if (!isSupported) {
            baseItems.push({ key: 'unsupported', label: 'Navegador sem suporte a push', disabled: true });
        } else if (permission === 'denied') {
            baseItems.push({ key: 'denied', label: 'Notificações bloqueadas no navegador', disabled: true });
        } else if (subscription) {
            baseItems.push({ key: 'unsubscribe', label: 'Desativar notificações' });
        } else {
            baseItems.push({ key: 'subscribe', label: 'Permitir notificações' });
        }

        if (isAdmin) {
            baseItems.push({ type: 'divider' });
            baseItems.push({ key: 'send-all', label: 'Enviar notificação genérica para todos' });
            baseItems.push({ key: 'send-all-custom', label: 'Enviar com título e descrição' });
        }

        return baseItems;
    }, [isAdmin, isSupported, permission, subscription]);

    const disabled = isLoading;

    return (
        <>
            <Dropdown
                menu={{
                    items,
                    onClick: ({ key }) => {
                        handleMenuClick(String(key)).catch(() => {
                            if (error) {
                                message.error(error);
                                return;
                            }
                            message.error('Não foi possível concluir a ação de notificação.');
                        });
                    },
                }}
                trigger={['click']}
            >
                <Button
                    icon={<BellOutlined />}
                    aria-label="Notificações"
                    disabled={disabled}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#001010',
                        cursor: 'pointer',
                        fontSize: '24px',
                    }}
                />
            </Dropdown>

            <Modal
                open={isCustomModalOpen}
                title="Enviar notificação personalizada"
                onCancel={() => setIsCustomModalOpen(false)}
                onOk={handleSendCustomNotification}
                okText="Enviar"
                cancelText="Cancelar"
                confirmLoading={isLoading}
            >
                <Input
                    placeholder="Título (opcional)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={80}
                    style={{ marginBottom: 12 }}
                />
                <Input.TextArea
                    placeholder="Descrição (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={240}
                    rows={4}
                />
            </Modal>
        </>
    );
}

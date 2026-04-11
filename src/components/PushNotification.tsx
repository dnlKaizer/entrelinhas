import { BellOutlined } from '@ant-design/icons';
import { Button, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { authService } from '../services/auth.service';
import { supabase } from '../services/supabase.client';
import { usePushNotifications } from '../hooks/usePushNotifications';

export function PushNotification() {
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
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoadingRole, setIsLoadingRole] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadRole() {
            try {
                const { user } = await authService.getCurrentUser();

                if (!user) {
                    if (mounted) setIsAdmin(false);
                    return;
                }

                const { data, error: profileError } = await supabase
                    .from('profile')
                    .select('is_admin')
                    .eq('id', user.id)
                    .maybeSingle();

                if (profileError) throw profileError;

                if (mounted) setIsAdmin(!!data?.is_admin);
            } catch (err) {
                console.error('Erro ao carregar perfil para notificações:', err);
                if (mounted) {
                    message.error('Não foi possível verificar permissões de notificação.');
                }
            } finally {
                if (mounted) setIsLoadingRole(false);
            }
        }

        loadRole();

        return () => {
            mounted = false;
        };
    }, []);

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
            baseItems.push({ key: 'send-all', label: 'Enviar notificação para todos' });
        }

        return baseItems;
    }, [isAdmin, isSupported, permission, subscription]);

    const disabled = isLoading || isLoadingRole;

    return (
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
                loading={disabled}
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
    );
}

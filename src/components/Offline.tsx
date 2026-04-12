import { Button, Modal } from 'antd';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useState, useEffect } from 'react';

export function Offline() {
    const isOnline = useOnlineStatus();
    
    // Inicia verificando se o usuário já fechou o modal nesta sessão
    const [closed, setClosed] = useState<boolean>(() => {
        return sessionStorage.getItem('offlineModalClosed') === 'true';
    });

    const handleClose = () => {
        setClosed(true);
        sessionStorage.setItem('offlineModalClosed', 'true'); // Salva que o usuário fechou
    };

    useEffect(() => {
        if (isOnline) {
            setClosed(false);
            sessionStorage.removeItem('offlineModalClosed'); // Limpa a memória quando a internet volta
        }
    }, [isOnline]);

    return (
        <Modal
            title="Você está Offline"
            open={!isOnline && !closed}
            onCancel={handleClose} 
            footer={[
                <Button key="retry" type="primary" onClick={() => window.location.reload()}>
                    Tentar reconectar
                </Button>
            ]}
        >
            <p>Sua conexão com a internet caiu. Algumas ações podem não funcionar corretamente!</p>
        </Modal>
    );
}
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export function InstallPrompt() {
    const { showInstall, handleInstall } = useInstallPrompt();

    if (!showInstall) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 1000
        }}>
            <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                onClick={handleInstall}
                style={{
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                Instalar App
            </Button>
        </div>
    );
}
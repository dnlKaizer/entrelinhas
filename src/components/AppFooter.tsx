import { Layout, Flex, Button } from 'antd';
import { HomeOutlined, DesktopOutlined } from '@ant-design/icons';

import { useNavigate, useLocation } from 'react-router-dom';

const { Footer } = Layout;

function AppFooter() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleNavigation = (path: string) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    return (
        <Footer
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e2e2e2',
                padding: '10px 20px',
                textAlign: 'center',
            }}
        >
            <Flex justify="space-evenly" align="center" gap="10px" style={{ maxWidth: '720px', margin: '0 auto' }}>
                <nav
                    className='nav-button'
                    style={{
                        position: 'relative',
                        textAlign: 'center',
                        transition: '0.2s'
                    }}
                >
                    <Button
                        icon={<HomeOutlined />}
                        onClick={() => handleNavigation('/')}
                        shape="circle"
                        type={isActive('/') ? "primary" : "default"}
                        style={{
                            backgroundColor: isActive('/') ? '#0073c0f0' : '#888888f0',
                        }}
                    />
                </nav>

                <nav
                    className='nav-button'
                    style={{
                        position: 'relative',
                        textAlign: 'center',
                        transition: '0.2s'
                    }}
                >
                    <Button
                        icon={<DesktopOutlined />}
                        onClick={() => handleNavigation('/')}
                        shape="circle"
                        type={isActive('/') ? "primary" : "default"}
                        style={{
                            backgroundColor: isActive('/narnia') ? '#0073c0f0' : '#888888f0',
                        }}
                    />
                </nav>
            </Flex>
        </Footer>
    )
}

export default AppFooter;
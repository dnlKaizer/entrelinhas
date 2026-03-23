import { Layout, Flex, Typography, Button } from 'antd';
import { HomeOutlined, DesktopOutlined } from '@ant-design/icons';

import { useNavigate, useLocation } from 'react-router-dom';

const { Footer } = Layout;
const { Text } = Typography;

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
            <Flex justify="space-evenly" align="center" gap="10px">
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
                            backgroundColor: isActive('/') ? '#0073c0f0' : '#888888f0',
                        }}
                    />
                </nav>
            </Flex>
            <Text
                type="secondary"
                style={{
                    display: 'block',
                    fontFamily: 'Lobster, cursive',
                    fontSize: '15px',
                    letterSpacing: '1.5px',
                    marginTop: '5px',
                    userSelect: 'none'
                }}>
                EntreLinhas
            </Text>
        </Footer>
    )
}

export default AppFooter;
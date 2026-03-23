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
                            backgroundColor: isActive('/') ? '#b8b8b8' : '#8b8b8b',
                        }}
                    />
                    {isActive('/') && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '-10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '6.0px',
                                height: '6.0px',
                                backgroundColor: '#1677fff0',
                                borderRadius: '50%'
                            }}
                        />
                    )}
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
                        // onClick={() => navigate('/register')}
                        shape="circle"
                        type="primary"
                        style={{
                            backgroundColor: '#8b8b8b',
                            boxShadow: '-2.5px 2.5px 5px #00000020'
                        }}
                    />
                    {/* {isActive('/register') && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '-5px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '6.0px',
                                height: '6.0px',
                                backgroundColor: '#1677fff0',
                                borderRadius: '50%'
                            }}
                        />
                    )} */}
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
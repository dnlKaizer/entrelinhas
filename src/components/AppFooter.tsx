import { Layout, Flex, Typography } from 'antd';
import { HomeOutlined, DesktopOutlined } from '@ant-design/icons';

import { useNavigate, useLocation } from 'react-router-dom';

const { Footer } = Layout;
const { Text } = Typography;

function AppFooter() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    // const handleNavigation = (path: string) => {
    //     if (!isActive(path)) {
    //         navigate(path);
    //     }
    // };

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
            <Flex justify="space-around" align="center" gap="10px">
                <div
                    className='nav-button'
                    onClick={() => navigate('/')}
                    style={{ textAlign: 'center' }}
                >
                    <HomeOutlined
                        style={{
                            fontSize: '25px',
                            color: isActive('/') ? '#001010' : '#5c5c5c',
                            cursor: 'pointer'
                        }}
                    />
                    {/* {isActive('/') && (
                        <div
                            style={{ width: '5px', height: '5px', backgroundColor: '#003775', borderRadius: '50%', margin: '0 auto', marginTop: '5px' }}
                        />
                    )} */}
                </div>

                <div
                    className='nav-button'
                    onClick={() => navigate('/dashboard')}
                    style={{ textAlign: 'center' }}
                >
                    <DesktopOutlined
                        style={{
                            fontSize: '25px',
                            color: isActive('/dashboard') ? '#001010' : '#5c5c5c',
                        }}
                    />
                    {/* {isActive('/dashboard') && (
                        <div
                            style={{ width: '5px', height: '5px', backgroundColor: '#003775', borderRadius: '50%', margin: '0 auto', marginTop: '5px' }}
                        />
                    )} */}
                </div>
            </Flex>
            <Text
                type="secondary"
                style={{
                    fontFamily: 'Lobster, cursive',
                    fontSize: '15px',
                    display: 'block',
                    marginTop: '5px'
                }}>
                EntreLinhas
            </Text>
        </Footer>
    )
}

export default AppFooter;
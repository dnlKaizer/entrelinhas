import { Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import type { ReactNode } from "react";

interface AppAuthProps {
    children: ReactNode
}

function AppAuth({ children }: AppAuthProps) {
    return <>
        <Layout
            style={{
                height: '100vh',
                width: '100vw',
                background: 'linear-gradient(to top, #1c3055, #325da9)',
            }}
        >
            <Content style={{ padding: 25, width: '100%', height: '100%' }}>
                <Flex
                    vertical
                    justify="center"
                    align="center"
                    style={{ height: '100%' }}
                >
                    <Title
                        level={1}
                        style={{
                            color: '#fff',
                            fontFamily: 'Lobster, cursive',
                            fontWeight: 'normal',
                            userSelect: 'none'
                        }}
                    >
                        EntreLinhas
                    </Title>

                    {children}
                </Flex>
            </Content>
        </Layout>
    </>
}

export default AppAuth
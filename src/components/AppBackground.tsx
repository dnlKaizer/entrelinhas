import { Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import type { ReactNode } from "react";

interface AppBackgroundProps {
    children: ReactNode
}

function AppBackground({ children }: AppBackgroundProps) {
    return <>
        <Layout
            style={{
                minHeight: '100vh',
                width: '100%',
                background: 'linear-gradient(to top, #1c3055, #325da9)',
            }}
        >
            <Content
                style={{
                    padding: 25,
                    boxSizing: 'border-box',
                    width: '100%',
                }}
            >
                <Flex
                    vertical
                    justify="center"
                    align="center"
                    style={{
                        minHeight: 'calc(100vh - 50px)', width: '100%'
                    }}
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

export default AppBackground
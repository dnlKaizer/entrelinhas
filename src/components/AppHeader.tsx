import { Header } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title"
import { Button, Space, Tooltip, message } from "antd"
import { useState } from "react"
import { authService } from "../services/auth.service"
import { LogoutOutlined } from "@ant-design/icons"
import { PushNotification } from "./PushNotification"

interface AppHeaderProps {
    isAdmin: boolean
}

function AppHeader({ isAdmin }: AppHeaderProps) {
    const [logoutLoading, setLogoutLoading] = useState(false)

    async function handleLogout() {
        try {
            setLogoutLoading(true)
            await authService.logout()
        } catch {
            message.error('Não foi possível sair da conta.')
        } finally {
            setLogoutLoading(false)
        }
    }

    return (
        <Header
            style={{
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e2e2e2',
                display: 'flex',
                height: '70px',
                justifyContent: 'space-between',
                padding: '0 20px'
            }}
        >
            <Title
                level={4}
                style={{
                    color: '#001010',
                    margin: 0,
                    fontFamily: 'Lobster, cursive',
                    fontSize: '30px',
                    fontWeight: 'normal',
                    userSelect: 'none'
                }}
            >
                EntreLinhas
            </Title>

            <Space size="middle">
                <PushNotification tooltip="Notificações" isAdmin={isAdmin} />

                <Tooltip title={"Sair"} placement="bottom">
                    <Button
                        onClick={handleLogout}
                        loading={logoutLoading}
                        icon={<LogoutOutlined />}
                        aria-label="Sair"
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            color: '#001010',
                            cursor: 'pointer',
                            fontSize: '24px',
                        }}
                    />
                </Tooltip>
            </Space>
        </Header>
    )
}

export default AppHeader
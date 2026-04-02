import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useLogin, type LoginFormValues } from '../../hooks/auth/useLogin'

function AppLoginForm() {
    const { login, loading, errorMessage } = useLogin()

    return (
        <Card style={{ width: '100%', maxWidth: 420 }}>
            <Typography.Title level={3}>Entrar</Typography.Title>

            {errorMessage && (
                <Alert
                    type="error"
                    showIcon
                    message="Falha no login"
                    description={errorMessage}
                    style={{ marginBottom: 16 }}
                />
            )}

            <Form<LoginFormValues> layout="vertical" onFinish={login}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Informe o email.' },
                        { type: 'email', message: 'Informe um email valido.' },
                    ]}
                >
                    <Input placeholder="voce@email.com" autoComplete="email" />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Informe a senha.' }]}
                >
                    <Input.Password placeholder="Sua senha" autoComplete="current-password" />
                </Form.Item>

                <Form.Item style={{ marginBottom: 12 }}>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Entrar
                    </Button>
                </Form.Item>
            </Form>

            <Typography.Text>
                Não possui uma conta? <Link to="/register">Criar conta</Link>
            </Typography.Text>
        </Card>
    )
}

export default AppLoginForm
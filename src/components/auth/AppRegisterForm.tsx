import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks/auth/useRegister'
import type { RegisterFormValues } from '../../hooks/auth/useRegister'

function AppRegisterForm() {
    const { register, loading, errorMessage, successMessage } = useRegister()

    return (
        <Card style={{ width: '100%', maxWidth: 420 }}>
            <Typography.Title level={3}>Criar conta</Typography.Title>

            {errorMessage && (
                <Alert
                    type="error"
                    showIcon
                    message="Falha no cadastro"
                    description={errorMessage}
                    style={{ marginBottom: 16 }}
                />
            )}

            {successMessage && (
                <Alert
                    type="success"
                    showIcon
                    message="Cadastro realizado"
                    description={successMessage}
                    style={{ marginBottom: 16 }}
                />
            )}

            <Form<RegisterFormValues> layout="vertical" onFinish={register}>
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
                    rules={[
                        { required: true, message: 'Informe a senha.' },
                        { min: 6, message: 'A senha deve ter ao menos 6 caracteres.' },
                    ]}
                >
                    <Input.Password placeholder="Sua senha" autoComplete="new-password" />
                </Form.Item>

                <Form.Item style={{ marginBottom: 12 }}>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>

            <Typography.Text>
                Já possui uma conta? <Link to="/login">Entrar</Link>
            </Typography.Text>
        </Card>
    )
}

export default AppRegisterForm
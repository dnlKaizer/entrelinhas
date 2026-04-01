import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'

export interface RegisterFormValues {
    email: string
    password: string
}

export function useRegister() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    async function register(values: RegisterFormValues) {
        try {
            setErrorMessage(null)
            setSuccessMessage(null)
            setLoading(true)

            const authData = await authService.signUp(values.email, values.password)

            if (authData.session) {
                navigate('/')
                return
            }

            setSuccessMessage('Cadastro realizado com sucesso.')
            navigate('/login')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Nao foi possivel criar a conta.'
            setErrorMessage(message)
        } finally {
            setLoading(false)
        }
    }

    return {
        register,
        loading,
        errorMessage,
        successMessage,
    }
}

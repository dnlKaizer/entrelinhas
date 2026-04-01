import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'

export interface LoginFormValues {
    email: string
    password: string
}

export function useLogin() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function login(values: LoginFormValues) {
        try {
            setErrorMessage(null)
            setLoading(true)
            await authService.login(values.email, values.password)
            navigate('/')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Nao foi possivel fazer login.'
            setErrorMessage(message)
        } finally {
            setLoading(false)
        }
    }

    return {
        login,
        loading,
        errorMessage,
    }
}

import { useEffect, useState } from 'react'
import { authService } from '../services/auth.service'
import { supabase } from '../services/supabase.client'

export function useAuthSession() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        let mounted = true

        async function bootstrapAuth() {
            try {
                const { session } = await authService.getCurrentUser()
                if (mounted) setIsAuthenticated(!!session)
            } finally {
                if (mounted) setAuthLoading(false)
            }
        }

        bootstrapAuth()

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session)
        })

        return () => {
            mounted = false
            data.subscription.unsubscribe()
        }
    }, [])

    return { isAuthenticated, authLoading }
}

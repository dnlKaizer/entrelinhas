import { useEffect, useState } from 'react'
import { authService } from '../services/auth.service'
import { supabase } from '../services/supabase.client'

export function useAuthSession() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        let mounted = true

        async function loadAdminRole(userId: string | undefined) {
            if (!userId) {
                if (mounted) setIsAdmin(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('profile')
                    .select('is_admin')
                    .eq('id', userId)
                    .maybeSingle()

                if (error) throw error
                if (mounted) setIsAdmin(!!data?.is_admin)
            } catch (error) {
                console.error('Erro ao carregar role admin:', error)
                if (mounted) setIsAdmin(false)
            }
        }

        async function bootstrapAuth() {
            try {
                const { session, user } = await authService.getCurrentUser()
                if (mounted) setIsAuthenticated(!!session)
                await loadAdminRole(user?.id)
            } finally {
                if (mounted) setAuthLoading(false)
            }
        }

        bootstrapAuth()

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session)
            loadAdminRole(session?.user?.id)
        })

        return () => {
            mounted = false
            data.subscription.unsubscribe()
        }
    }, [])

    return { isAuthenticated, isAdmin, authLoading }
}

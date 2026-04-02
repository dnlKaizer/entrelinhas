import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase.client";

interface IAuthData {
    user: User | null;
    session: Session | null;
}

class AuthService {
    async getCurrentUser(): Promise<IAuthData> {
        const user = await supabase.auth.getUser();
        const session = await supabase.auth.getSession();
        return {
            user: user.data.user,
            session: session.data.session,
        };
    }

    async signUp(email: string, password: string): Promise<IAuthData> {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) throw error;
        return data;
    }

    async login(email: string, password: string): Promise<IAuthData> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) throw error;
        return data;
    }

    async logout(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }
}

export const authService = new AuthService();
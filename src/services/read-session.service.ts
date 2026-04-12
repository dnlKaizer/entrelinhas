import type { IReadSession } from "../types/read-session.type";
import { supabase } from "./supabase.client";

const TABLE_NAME = 'Leitura';
const ID_COLUMN = 'idLeitura';

class ReadSessionService {
    async findAll(): Promise<IReadSession[] | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*');
        if (error) throw error;
        return data;
    }

    async findById(id: number): Promise<IReadSession | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq(ID_COLUMN, id)
            .single();
        if (error) throw error;
        return data;
    }

    async create(book: Omit<IReadSession, typeof ID_COLUMN>): Promise<IReadSession> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(book)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async update(id: number, book: Partial<Omit<IReadSession, typeof ID_COLUMN>>): Promise<IReadSession> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(book)
            .eq(ID_COLUMN, id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq(ID_COLUMN, id);
        if (error) throw error;
    }
}

export const readSessionService = new ReadSessionService();
import type { IBook } from "../types/book.type"
import { supabase } from "./supabase.client"

const TABLE_NAME = 'Livro';
const ID_COLUMN = 'idLivro';

class BookService {

    async findAll(): Promise<IBook[] | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*');
        if (error) throw error;
        return data;
    }

    async findById(id: number): Promise<IBook | null> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq(ID_COLUMN, id)
            .single();
        if (error) throw error;
        return data;
    }

    async create(book: Omit<IBook, typeof ID_COLUMN>): Promise<IBook> {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(book)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async update(id: number, book: Partial<Omit<IBook, typeof ID_COLUMN>>): Promise<IBook> {
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

export const bookService = new BookService();
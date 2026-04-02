import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { authService } from '../services/auth.service';
import { bookService } from '../services/book.service';
import { supabase } from '../services/supabase.client';
import type { IBook } from '../types/book.type';

const BOOK_CACHE_TTL_MS = 5 * 60 * 1000;

interface BookCacheEntry {
    userId: string | null;
    books: IBook[];
    lastFetchAt: number;
}

interface BookContextValue {
    books: IBook[];
    loading: boolean;
    error: string | null;
    loadBooks: (force?: boolean) => Promise<void>;
    addBookToCache: (book: IBook) => void;
    clearBooksCache: () => void;
}

const BookContext = createContext<BookContextValue | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cacheRef = useRef<BookCacheEntry>({
        userId: null,
        books: [],
        lastFetchAt: 0,
    });

    const clearBooksCache = useCallback(() => {
        cacheRef.current = {
            userId: null,
            books: [],
            lastFetchAt: 0,
        };
        setBooks([]);
        setError(null);
    }, []);

    const loadBooks = useCallback(async (force = false) => {
        setError(null);

        const { user } = await authService.getCurrentUser();
        const userId = user?.id ?? null;

        if (!userId) {
            clearBooksCache();
            setLoading(false);
            return;
        }

        const isSameUser = cacheRef.current.userId === userId;
        const isFresh = Date.now() - cacheRef.current.lastFetchAt < BOOK_CACHE_TTL_MS;

        if (!force && isSameUser && isFresh) {
            setBooks(cacheRef.current.books);
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const data = await bookService.findAllByUser(userId);
            const nextBooks = data ?? [];

            cacheRef.current = {
                userId,
                books: nextBooks,
                lastFetchAt: Date.now(),
            };

            setBooks(nextBooks);
        } catch (fetchError) {
            console.error('Erro ao buscar livros:', fetchError);
            setError('Erro ao carregar livros');
        } finally {
            setLoading(false);
        }
    }, [clearBooksCache]);

    const addBookToCache = useCallback((book: IBook) => {
        setBooks((previousBooks) => {
            const nextBooks = [...previousBooks, book];

            cacheRef.current = {
                userId: book.idUsuario,
                books: nextBooks,
                lastFetchAt: Date.now(),
            };

            return nextBooks;
        });
    }, []);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            const nextUserId = session?.user?.id ?? null;

            if (cacheRef.current.userId !== nextUserId) {
                clearBooksCache();
            }
        });

        return () => {
            data.subscription.unsubscribe();
        };
    }, [clearBooksCache]);

    const value = useMemo(() => ({
        books,
        loading,
        error,
        loadBooks,
        addBookToCache,
        clearBooksCache,
    }), [books, loading, error, loadBooks, addBookToCache, clearBooksCache]);

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
}

export function useBooks() {
    const context = useContext(BookContext);

    if (!context) {
        throw new Error('useBooks deve ser usado dentro de BookProvider');
    }

    return context;
}

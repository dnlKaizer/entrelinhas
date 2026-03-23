import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { bookService } from '../services/book.service';

import BookCategory from '../components/BookCategory'

import type { IBook } from '../types/book.type';


function HomePage() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await bookService.findAll();
                // console.log("DATA DO BANCO:", data);
                setBooks(data ?? []);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
                setError("Erro ao carregar livros");
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, []);

    const lendo = books.filter(b => b.status === "Lendo");
    const lido = books.filter(b => b.status === "Lido");
    const lerei = books.filter(b => b.status === "Lerei");

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <BookCategory
                category="Lendo"
                backgroundColor="#E6F7F0"
                books={lendo}
                emptyMessage="Adicione aqui o livro que você está lendo"
            />

            <BookCategory
                category="Lerei"
                backgroundColor="#FFFBE0"
                books={lerei}
                emptyMessage="Adicione aqui o livro que você quer ler"
            />

            <BookCategory
                category="Lido"
                backgroundColor="#F9F0F0"
                books={lido}
                emptyMessage="Adicione aqui o livro que você já leu"
            />
        </div>
    );
}

export default HomePage
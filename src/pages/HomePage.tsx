import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
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
    const desejado = books.filter(b => b.status === "Desejado");

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
        <Flex vertical align='center' justify='center'>
            <BookCategory
                category="Lendo"
                backgroundColor="#d1e6fb"
                books={lendo}
                emptyMessage="Adicione aqui o livro que você está lendo"
            />

            <BookCategory
                category="Desejado"
                backgroundColor="#fff8cd"
                books={desejado}
                emptyMessage="Adicione aqui o livro que você quer ler"
            />

            <BookCategory
                category="Lido"
                backgroundColor="#ffd7d7"
                books={lido}
                emptyMessage="Adicione aqui o livro que você já leu"
            />
        </Flex>
    );
}

export default HomePage
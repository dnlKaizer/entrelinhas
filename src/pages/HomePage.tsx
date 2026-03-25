import { useEffect, useState } from 'react';
import { Flex, Spin, message } from 'antd';
import { bookService } from '../services/book.service';

import BookCategory from '../components/BookCategory'
import AppCreateBookModal from '../components/AppCreateBookModal';
import type { CreateBookFormValues } from '../components/AppCreateBookModal';

import type { IBook, TStatus } from '../types/book.type';


function HomePage() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createModalStatus, setCreateModalStatus] = useState<TStatus | undefined>(undefined);
    const [isCreatingBook, setIsCreatingBook] = useState(false);

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

    const handleOpenCreateModal = (status: TStatus) => {
        setCreateModalStatus(status);
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateBook = async (values: CreateBookFormValues) => {
        try {
            setIsCreatingBook(true);

            const payload: Omit<IBook, 'idLivro'> = {
                ...values,
                dtInicial: values.dtInicial?.format('YYYY-MM-DD'),
                dtFinal: values.dtFinal?.format('YYYY-MM-DD'),
                idUsuario: 1,
            };

            const createdBook = await bookService.create(payload);
            setBooks((previousBooks) => [...previousBooks, createdBook]);
            setIsCreateModalOpen(false);
            message.success('Livro cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            message.error('Nao foi possivel cadastrar o livro.');
        } finally {
            setIsCreatingBook(false);
        }
    };

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
                onAddBook={handleOpenCreateModal}
            />

            <BookCategory
                category="Desejado"
                backgroundColor="#fff8cd"
                books={desejado}
                emptyMessage="Adicione aqui o livro que você quer ler"
                onAddBook={handleOpenCreateModal}
            />

            <BookCategory
                category="Lido"
                backgroundColor="#ffd7d7"
                books={lido}
                emptyMessage="Adicione aqui o livro que você já leu"
                onAddBook={handleOpenCreateModal}
            />

            <AppCreateBookModal
                open={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onSubmit={handleCreateBook}
                submitting={isCreatingBook}
                initialStatus={createModalStatus}
            />
        </Flex>
    );
}

export default HomePage
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { authService } from '../services/auth.service';
import { bookService } from '../services/book.service';
import type { CreateBookFormValues } from '../components/AppCreateBookModal';
import type { IBook, TStatus } from '../types/book.type';

export function useHomePage() {
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
                setBooks(data ?? []);
            } catch (fetchError) {
                console.error('Erro ao buscar livros:', fetchError);
                setError('Erro ao carregar livros');
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, []);

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

            const { user } = await authService.getCurrentUser();
            if (!user) throw new Error('Usuário nao autenticado');

            const selectedCover = values.coverFileList?.[0]?.originFileObj;
            const uploadedCoverPath = selectedCover
                ? await bookService.uploadCover(selectedCover, user.id)
                : undefined;

            const { dtInicial, dtFinal, coverFileList, ...bookValues } = values;

            const payload: Omit<IBook, 'idLivro'> = {
                ...bookValues,
                dtInicial: dtInicial?.format('YYYY-MM-DD'),
                dtFinal: dtFinal?.format('YYYY-MM-DD'),
                idUsuario: user.id,
                img: uploadedCoverPath,
            };

            const createdBook = await bookService.create(payload);
            setBooks((previousBooks) => [...previousBooks, createdBook]);
            setIsCreateModalOpen(false);
            message.success('Livro cadastrado com sucesso!');
        } catch (createError) {
            console.error('Erro ao cadastrar livro:', createError);
            message.error('Nao foi possivel cadastrar o livro.');
        } finally {
            setIsCreatingBook(false);
        }
    };

    return {
        loading,
        error,
        isCreateModalOpen,
        createModalStatus,
        isCreatingBook,
        lendo: books.filter((book) => book.status === 'Lendo'),
        lido: books.filter((book) => book.status === 'Lido'),
        desejado: books.filter((book) => book.status === 'Desejado'),
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleCreateBook,
    };
}
import { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import { authService } from '../services/auth.service';
import { bookService } from '../services/book.service';
import type { CreateBookFormValues } from '../components/AppCreateBookModal';
import type { IBook, TStatus } from '../types/book.type';
import { useBooks } from '../providers/BookProvider';

export function useHomePage() {
    const { books, loading, error, loadBooks, addBookToCache } = useBooks();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createModalStatus, setCreateModalStatus] = useState<TStatus | undefined>(undefined);
    const [isCreatingBook, setIsCreatingBook] = useState(false);

    useEffect(() => {
        void loadBooks();
    }, [loadBooks]);

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
            addBookToCache(createdBook);
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
        lendo: useMemo(() => books.filter((book) => book.status === 'Lendo'), [books]),
        lido: useMemo(() => books.filter((book) => book.status === 'Lido'), [books]),
        desejado: useMemo(() => books.filter((book) => book.status === 'Desejado'), [books]),
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleCreateBook,
    };
}
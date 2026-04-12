import { Flex } from 'antd';
import { useHomePage } from '../hooks/useHomePage';

import BookCategory from '../components/BookCategory'
import AppCreateBookModal from '../components/AppCreateBookModal';
import { Loader } from '../components/Loader';
import { InstallPrompt } from '../components/InstallPrompt';

function HomePage() {
    const {
        loading,
        error,
        isCreateModalOpen,
        createModalStatus,
        isCreatingBook,
        lendo,
        lido,
        desejado,
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleCreateBook,
    } = useHomePage();

    if (loading) return <Loader description="Carregando página..." clean={false} />;

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Flex vertical align='center' justify='center'>
            <BookCategory
                category="Lendo"
                backgroundColor="#a2d1ff"
                books={lendo}
                emptyMessage="Adicione aqui o livro que você está lendo"
                onAddBook={handleOpenCreateModal}
            />

            <BookCategory
                category="Desejado"
                backgroundColor="#fff2a1"
                books={desejado}
                emptyMessage="Adicione aqui o livro que você quer ler"
                onAddBook={handleOpenCreateModal}
            />

            <BookCategory
                category="Lido"
                backgroundColor="#ffacac"
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

            <InstallPrompt />
        </Flex>
    );
}

export default HomePage
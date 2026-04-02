import { Flex, Spin } from 'antd';
import { useHomePage } from '../hooks/useHomePage';

import BookCategory from '../components/BookCategory'
import AppCreateBookModal from '../components/AppCreateBookModal';
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
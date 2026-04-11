import { useNavigate } from "react-router-dom";
import {
    Card,
    Typography,
    Button,
    Space,
    Divider,
    Progress,
    Tag,
    Result,
    Flex,
    Popconfirm
} from "antd";

import {
    BookOutlined,
    CalendarOutlined,
    DeleteOutlined,
    EditOutlined,
    HistoryOutlined,
    ShareAltOutlined,
    TrophyOutlined
} from "@ant-design/icons";

import { InfoItem } from "../components/InfoItem";
import { BackButton } from "../components/BackButton";
import { formatDate } from "../utils/formatDate";
import AppBackground from "../components/AppBackground";
import { useBookPage } from "../hooks/useBookPage";
import AppCreateBookModal from "../components/AppCreateBookModal";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

export function BookPage() {
    const navigate = useNavigate();
    
    const {
        book,
        count,
        isEditModalOpen,
        isUpdating,
        isDeleting,
        imageUrl,
        openEditModal,
        closeEditModal,
        handleUpdateBook,
        handleDeleteBook,
        handleShare,
        shareLoading
    } = useBookPage();

    // Não encontrado
    if (!book) {
        return (
            <Result
                status="404"
                title="Livro não encontrado"
                subTitle={`Você será redirecionado em ${count}s`}
                extra={[
                    <Button key="back" type="primary" onClick={() => navigate("/")}>
                        Voltar agora
                    </Button>
                ]}
            />
        );
    }

    const progress = Math.round(
        (book.numPagRead / book.numPag) * 100
    );

    return (
        <AppBackground>
            <Flex vertical justify="center" align="center" style={{ width: "100%" }}>
                <BackButton />

                <Card
                    style={{
                        maxWidth: 400,
                        width: "100%",
                        borderRadius: 20,
                        boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                    }}
                    styles={{ body: { padding: 15 } }}
                >
                    {/* CAPA */}
                    <div style={{ textAlign: "center" }}>
                        <img
                            src={imageUrl || "/placeholder.png"}
                            alt={book.nome}
                            style={{
                                width: 160,
                                height: 220,
                                objectFit: "cover",
                                borderRadius: 10,
                            }}
                        />
                    </div>

                    {/* TÍTULO */}
                    <div style={{ textAlign: "center", marginTop: 15 }}>
                        <Title level={4} style={{ marginBottom: 0 }}>
                            {book.nome}
                        </Title>

                        <Text type="secondary">
                            {book.autor || "Autor desconhecido"}
                        </Text>
                    </div>

                    {/* STATUS */}
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                        <Tag
                            color={
                                book.status === "Lido"
                                    ? "red"
                                    : book.status === "Lendo"
                                        ? "blue"
                                        : "gold"
                            }
                        >
                            {book.status}
                        </Tag>
                    </div>

                    {/* PROGRESSO */}
                    <div style={{ marginTop: 10 }}>
                        <Progress percent={progress} />
                        {/* <Text type="secondary">
                            {book.numPagRead} / {book.numPag} páginas
                        </Text> */}
                    </div>

                    {/* INFO */}
                    <div style={{ marginTop: 10 }}>
                        <Space size="large">
                            <InfoItem
                                icon={<BookOutlined />}
                                tooltip="Total de páginas do livro"
                            >
                                {book.numPag} páginas
                            </InfoItem>

                            {book.dtInicial && (
                                <InfoItem
                                    icon={<CalendarOutlined />}
                                    tooltip="Data de início da leitura"
                                >
                                    {formatDate(book.dtInicial)}
                                </InfoItem>
                            )}

                            {book?.ano && (
                                <InfoItem icon={<HistoryOutlined />} tooltip="Ano de publicação">
                                    {book.ano}
                                </InfoItem>
                            )}

                            {book?.dtFinal && (
                                <InfoItem icon={<TrophyOutlined />} tooltip="Data de término da leitura">
                                    {formatDate(book.dtFinal)}
                                </InfoItem>
                            )}
                        </Space>
                    </div>

                    <Divider />

                    {/* DESCRIÇÃO */}
                    <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: "ver mais..." }}>
                        {book.text || "Sem descrição disponível."}
                    </Paragraph>

                    <Space direction="vertical" style={{ width: "100%" }}>
                        {/* AÇÕES */}
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                style={{ flex: 1, borderRadius: 10 }}
                                onClick={openEditModal}
                            >
                                Editar
                            </Button>

                            <Popconfirm
                                title="Excluir livro"
                                description="Tem certeza que deseja excluir este livro?"
                                onConfirm={handleDeleteBook}
                                okText="Sim"
                                cancelText="Cancelar"
                            >
                                <Button
                                    danger
                                    loading={isDeleting}
                                    icon={<DeleteOutlined />}
                                    style={{ flex: 1, borderRadius: 10 }}
                                >
                                    Excluir
                                </Button>
                            </Popconfirm>
                        </div>

                        <Button
                            icon={<ShareAltOutlined />}
                            block
                            onClick={handleShare}
                            loading={shareLoading}
                            style={{ borderRadius: 10 }}
                        >
                            Compartilhar livro
                        </Button>
                    </Space>
                </Card>
            </Flex>

            {/* MODAL DE EDIÇÃO */}
            <AppCreateBookModal
                open={isEditModalOpen}
                onClose={closeEditModal}
                onSubmit={handleUpdateBook}
                submitting={isUpdating}
                initialValues={{
                    nome: book.nome,
                    autor: book.autor,
                    ano: book.ano,
                    status: book.status,
                    numPag: book.numPag,
                    numPagRead: book.numPagRead,
                    text: book.text,
                    dtInicial: book.dtInicial ? dayjs(book.dtInicial) : undefined,
                    dtFinal: book.dtFinal ? dayjs(book.dtFinal) : undefined,
                }}
            />
        </AppBackground>
    );
}
import { Card, Typography, Button, Space, Divider, Progress, Tag } from "antd";
import { BookOutlined, CalendarOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useBookDetails } from "../hooks/useBookDetails";
import { InfoItem } from "../components/InfoItem";
import { BackButton } from "../components/BackButton";
import { useSignedImageUrl } from "../hooks/useSignedImageUrl";
import { formatDate } from "../utils/formatDate";

const { Title, Text, Paragraph } = Typography;

export function BookPage() {
    const { id } = useParams();
    const { book, loading } = useBookDetails(id!);

    const imageUrl = useSignedImageUrl({
        path: book?.img,
        bucket: "covers"
    });

    if (loading) return <p>Carregando...</p>;
    if (!book) return <p>Livro não encontrado</p>;


    const progress = Math.round(
        (book.numPagRead / book.numPag) * 100
    );

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                padding: 15,
                minHeight: "fit-content",
                maxHeight: "calc(100vh - 30px)",
                overflowY: "auto"
            }}
        >
            <BackButton />
            <Card
                style={{
                    width: 340,
                    borderRadius: 20,
                    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{ padding: 15 }}
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
                <div style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <Title level={4} style={{ marginBottom: 0 }}>
                        {book.nome}
                    </Title>

                    <Text type="secondary">
                        {book.autor || "Autor desconhecido"}
                    </Text>
                </div>

                {/* STATUS */}
                <div style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <Tag color={
                        book.status === "Lido"
                            ? "red"
                            : book.status === "Lendo"
                                ? "blue"
                                : "gold"
                    }>
                        {book.status}
                    </Tag>
                </div>

                {/* PROGRESSO */}
                <div style={{ marginTop: 10 }}>
                    <Progress
                        percent={progress}
                        strokeColor="#1890ff"
                        railColor="#e6f7ff"
                    />
                    <Text type="secondary">
                        {book.numPagRead} / {book.numPag} páginas
                    </Text>
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
                                tooltip="Data de início da leitura">
                                {formatDate(book.dtInicial)}
                            </InfoItem>
                        )}
                    </Space>
                </div>

                <Divider />

                {/* DESCRIÇÃO */}
                <Paragraph
                    ellipsis={{ rows: 5, expandable: true, symbol: "ver mais..." }}
                >
                    {book.text || "Sem descrição disponível."}
                </Paragraph>

                {/* BOTÃO */}
                <Button
                    type="primary"
                    block
                    style={{ borderRadius: 10 }}
                >
                    {book.status === "Lendo"
                        ? "Continuar leitura"
                        : book.status === "Lido"
                            ? "Ler novamente"
                            : "Iniciar leitura"}
                </Button>
            </Card>
        </div>
    );
}
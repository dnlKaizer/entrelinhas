import { Card, Typography, Button, Space, Divider, Progress, Tag } from "antd";
import { BookOutlined, CalendarOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useBookDetails } from "../hooks/useBookDetails";

const { Title, Text, Paragraph } = Typography;

export function BookPage() {
    const { id } = useParams();
    const { book, imageUrl, loading } = useBookDetails(id!);

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
                minHeight: "95vh",
            }}
        >
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
                        src={imageUrl}
                        alt={book.nome}
                        style={{
                            width: 160,
                            height: 220,
                            objectFit: "cover",
                            borderRadius: 10,
                        }}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
                        }}
                    />
                </div>

                {/* TÍTULO */}
                <div style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    marginTop: 15 }}>
                    <Title level={4} style={{ marginBottom: 0 }}>
                        {book.nome}
                    </Title>

                    <Text type="secondary">
                        {book.autor || "Autor desconhecido"}
                    </Text>

                    <Text type="secondary">
                        {book.autor || "Autor desconhecido"}
                    </Text>
                </div>

                {/* STATUS */}
                <div style={{ marginTop: 10 }}>
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
                <div style={{ marginTop: 10 }}><Progress
                    percent={progress}
                    strokeColor="#1890ff"
                    trailColor="#e6f7ff"
                />
                    <Text type="secondary">
                        {book.numPagRead} / {book.numPag} páginas
                    </Text>
                </div>

                {/* INFO */}
                <div style={{ marginTop: 10 }}>
                    <Space size="large">
                        <Space>
                            <BookOutlined />
                            <Text>{book.numPag} páginas</Text>
                        </Space>

                        {book.dtInicial && (
                            <Space>
                                <CalendarOutlined />
                                <Text>{book.dtInicial}</Text>
                            </Space>
                        )}
                    </Space>
                </div>

                <Divider />

                {/* DESCRIÇÃO */}
                <Paragraph
                    ellipsis={{ rows: 4, expandable: true, symbol: "ver mais" }}
                >
                    {book.text || "Sem descrição disponível."}
                </Paragraph>

                {/* BOTÃO DINÂMICO */}
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
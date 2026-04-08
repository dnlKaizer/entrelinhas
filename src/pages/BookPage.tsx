import { Card, Typography, Button, Space, Divider, Progress, Tag, Result } from "antd";
import { BookOutlined, CalendarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { InfoItem } from "../components/InfoItem";
import { BackButton } from "../components/BackButton";
import { formatDate } from "../utils/formatDate";
import { useEffect, useState } from "react";
import { useBookById } from "../providers/BookProvider";
import { useSignedImageUrl } from "../hooks/useSignedImageUrl";

const { Title, Text, Paragraph } = Typography;

export function BookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = useBookById(Number(id));
    const [count, setCount] = useState(5);
    
    useEffect(() => {
        if (!book) {
            const interval = setInterval(() => {
                setCount((c) => (c > 0 ? c - 1 : 0));
            }, 1000);
            
            const timer = setTimeout(() => {
                navigate("/");
            }, 5000);
            
            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [book, navigate]);
    
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

    const imageUrl = useSignedImageUrl({ path: book.img, bucket: "covers" });
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
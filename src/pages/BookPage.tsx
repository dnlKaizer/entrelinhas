import { Card, Typography, Button, Space, Divider, Progress, Tag, Result, Flex, message } from "antd";
import { BookOutlined, CalendarOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { InfoItem } from "../components/InfoItem";
import { BackButton } from "../components/BackButton";
import { formatDate } from "../utils/formatDate";
import { useEffect, useState } from "react";
import { useBookById } from "../providers/BookProvider";
import { useSignedImageUrl } from "../hooks/useSignedImageUrl";
import { useShareBook } from "../hooks/useShareBook";
import AppBackground from "../components/AppBackground";

const { Title, Text, Paragraph } = Typography;

export function BookPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = useBookById(Number(id));
    const [count, setCount] = useState(5);
    const [shareLoading, setShareLoading] = useState(false);
    const { isSupported, shareBook } = useShareBook();

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

    const handleShare = async () => {
        if (!isSupported) {
            message.warning("Seu dispositivo não suporta compartilhamento nativo.");
            return;
        }

        setShareLoading(true);

        const result = await shareBook(book, window.location.href, imageUrl);

        if (result.status === "shared") {
            message.success("Livro compartilhado com sucesso.");
        } else if (result.status === "unsupported") {
            message.warning("Seu dispositivo não suporta compartilhamento nativo.");
        } else if (result.status === "error") {
            message.error("Não foi possível compartilhar este livro.");
            console.error("Erro ao compartilhar livro:", result.error);
        }

        setShareLoading(false);
    };

    return (
        <AppBackground>
            <Flex
                vertical
                justify="center"
                align="center"
                style={{ width: "100%" }}
            >
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

                    <Space direction="vertical" style={{ width: "100%" }}>
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
        </AppBackground>
    );
}
import { Flex, Typography } from "antd";

import { PlusOutlined, BookOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

interface BookCategoryProps {
    category: string;
    backgroundColor: string;
    books: any[]; // Substitua 'any' pelo tipo correto dos livros, se disponível
    emptyMessage: string;
}

const BookCategory: React.FC<BookCategoryProps> = ({ category, backgroundColor, books, emptyMessage }) => {
    const navigate = useNavigate();
    const isEmpty = books.length === 0;
    // const numberOfBooks = books.length;

    return (
        <div
            style={{
                backgroundColor,
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                minHeight: '150px',
                position: 'relative'
            }}
        >
            <Title level={5} style={{ color: '#001010', marginTop: '0px', marginBottom: '10px' }}>{category}</Title>
            {isEmpty ? (
                <Flex
                    align="center"
                    gap="large"
                    onClick={() => navigate('/add-book')}
                    style={{
                        cursor: 'pointer',
                        padding: '20px',
                        borderRadius: '10px',
                        border: '2.5px dashed #00000070',
                        backgroundColor: '#ffffffB0',
                        flexDirection: 'column'
                    }}
                >
                    <div
                        style={{
                            border: "2.5px solid #000000a0",
                            borderRadius: '10%',
                            padding: '10px',
                            backgroundColor: '#ffffff',
                            fontSize: '25px',
                            color: '#000000'
                        }}
                    >
                        <PlusOutlined style={{ fontSize: '25px', color: '#001010' }} />
                    </div>
                    <Text>{emptyMessage}</Text>
                </Flex>
            ) : (
                <Flex gap="middle" wrap="wrap" justify="center">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            onClick={() => navigate('')}
                            style={{
                                cursor: 'pointer',
                                flexDirection: 'column',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '120px'
                            }}
                        >
                            <img src={book.image} alt={book.title} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                            <Text
                                style={{
                                    margin: 0,
                                    fontFamily: 'Lobster, cursive',
                                    fontWeight: 'normal',
                                    textAlign: 'center'
                                }}
                            >
                                {book.title}
                            </Text>
                            <Text type="secondary">{book.author}</Text>
                        </div>
                    ))}
                </Flex>
            )}
        </div>
    );
};

export default BookCategory;
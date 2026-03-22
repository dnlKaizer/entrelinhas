import { Flex, Typography } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import BookCard from "./BookCard";

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
                alignItems: 'center',
                backgroundColor,
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginBottom: '20px',
                minHeight: '150px',
                padding: '20px',
                position: 'relative'
            }}
        >
            <Title
                level={5}
                style={{
                    color: '#001010',
                    marginBottom: '10px',
                    marginTop: '0px',
                    userSelect: 'none'
                }}
            >
                {category}
            </Title>
            {isEmpty ? (
                <Flex
                    className="empty-box"
                    align="center"
                    gap="large"
                    onClick={() => navigate('/add-book')}
                    style={{
                        borderRadius: '10px',
                        cursor: 'pointer',
                        flexDirection: 'column',
                        padding: '20px'
                    }}
                >
                    <div
                        style={{
                            alignContent: 'center',
                            backgroundColor: '#ffffff',
                            border: "2.5px solid #00000040",
                            borderRadius: '50%',
                            color: '#000000',
                            fontSize: '25px',
                            height: '60px',
                            padding: '0px',
                            textAlign: 'center',
                            width: '60px'
                        }}
                    >
                        <PlusOutlined style={{  color: '#001010', fontSize: '25px' }} />
                    </div>
                    <Text
                        style={{
                            userSelect: 'none'
                        }}>{emptyMessage}</Text>
                </Flex>
            ) : (
                <Flex wrap="wrap" justify="center" gap="large">
                    {books.map((book, index) => (
                        <BookCard
                            key={book.id || index}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            image={book.image}
                            rating={book.rating}
                            showRating={book.showRating}
                        />
                    ))}

                </Flex>
            )}
        </div>
    );
};

export default BookCategory;
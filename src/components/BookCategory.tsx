import { Button, Carousel, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


import type { IBook } from "../types/book.type";

import BookCard from "./BookCard";

const { Text, Title } = Typography;

interface BookCategoryProps {
    category: string;
    backgroundColor: string;
    books: IBook[]; 
    emptyMessage: string;
}

const BookCategory: React.FC<BookCategoryProps> = ({ category, backgroundColor, books, emptyMessage }) => {
    const navigate = useNavigate();
    const isEmpty = books.length === 0;

    return (
        <div
            style={{
                alignItems: 'center',
                backgroundColor,
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginBottom: '20px',
                minHeight: '150px',
                padding: '20px',
                width: '100%',
                maxWidth: '800px',
            }}
        >
            <Title
                level={5}
                style={{
                    color: '#001010',
                    fontFamily: 'Lobster, cursive',
                    fontWeight: '300',
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
                    onClick={() => navigate('/register')}
                    style={{
                        borderRadius: '10px',
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
                        <PlusOutlined style={{ color: '#001010', fontSize: '25px' }} />
                    </div>
                    <Text
                        style={{
                            userSelect: 'none'
                        }}>{emptyMessage}</Text>
                </Flex>
            ) : (
                <>
                    <Flex
                        gap="large"
                        justify="center"
                        wrap="wrap"
                    >
                        {books.map((book) => (
                            <BookCard
                                key={book.idLivro}
                                book={book}
                            />
                        ))}

                    </Flex>

                    <Flex
                        align="center"
                        justify="space-between" 
                        style={{
                            marginTop: 'auto',
                            paddingTop: '10px',
                            width: '100%'   
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                fontSize: '15px',
                                fontWeight: 300
                            }}
                        >
                            {books.length} {books.length === 1 ? 'livro' : 'livros'}
                        </Text>

                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/register')}
                            shape="circle"
                            type="primary"
                            style={{ 
                                backgroundColor: '#8b8b8b',
                                boxShadow: '-2.5px 2.5px 5px #00000020' }}
                        />
                    </Flex>
                </>
            )
            }
        </div >
    );
};

export default BookCategory;
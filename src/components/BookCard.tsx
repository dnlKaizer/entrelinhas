import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import type { IBook } from "../types/book.type";

const { Text } = Typography;

interface BookCardProps {
    book: IBook;
}
const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const navigate = useNavigate();

    return (
        <div
            className='card-book'
            onClick={() => navigate(`/book/${book.idLivro}`)}
            style={{
                alignItems: 'center',
                backgroundColor: '#ffffffa0',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                padding: '10px',
                width: '150px'
            }}
        >
            <img
                className='image-cover'
                src={book.img || "/placeholder.png"}
                alt={book.nome}
                style={{
                    borderRadius: '10px',
                    height: '180px',
                    objectFit: 'cover',
                    width: '95%'
                }}
            />

            <Text
                strong
                style={{
                    color: '#242424',
                    display: '-webkit-box',
                    fontFamily: 'Lobster, cursive',
                    fontSize: '15px',
                    fontWeight: '300',
                    height: '2.5em',
                    lineHeight: '1.25em',
                    overflow: 'hidden',
                    textAlign: 'center',
                    userSelect: 'none',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2
                }}
            >
                {book.nome}
            </Text>

            <Text
                type="secondary"
                style={{
                    fontSize: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    userSelect: 'none',
                    whiteSpace: 'nowrap'
                }}
            >
                {book.autor ?? "Autor desconhecido"}

            </Text>

            {/* {book.status === "Lido" && (
                <Rate
                    disabled
                    defaultValue={book.rating ?? 0}
                    style={{ cursor: 'pointer', fontSize: '10px' }}
                />
            )} */}
        </div>
    );

};

export default BookCard;

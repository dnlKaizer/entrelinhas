import { useNavigate } from "react-router-dom";
import { Rate, Typography } from "antd";

const { Text } = Typography;

interface BookCardProps {
    id: string | number;
    title: string;
    author: string;
    image: string;
    rating?: number;
    showRating?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, image, rating, showRating }) => {
    const navigate = useNavigate();

    return (
        <div
            className='card-book'
            onClick={() => navigate(`/book/${id}`)}
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
                src={image}
                alt={title}
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
                {title}
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
                {author}
            </Text>

            {showRating && (
                <Rate
                    disabled
                    defaultValue={rating}
                    style={{ cursor: 'pointer', fontSize: '10px' }}
                />
            )}
        </div>
    );

};

export default BookCard;

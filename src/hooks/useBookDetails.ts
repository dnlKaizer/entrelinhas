import { useEffect, useState } from "react";
import type { IBook } from "../types/book.type";
import { bookService } from "../services/book.service";

export function useBookDetails(id: string) {
    const [book, setBook] = useState<IBook | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const data = await bookService.findById(Number(id));

            if (data) {
                setBook(data);
                setImageUrl(await bookService.getCoverUrl(data.img));
            }

            setLoading(false);
        }

        fetch();
    }, [id]);

    return { book, imageUrl, loading };
}
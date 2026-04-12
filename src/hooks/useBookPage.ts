import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

import { bookService } from "../services/book.service";
import type { IBook } from "../types/book.type";
import type { CreateBookFormValues } from "../components/AppCreateBookModal";
import { useBookById } from "../providers/BookProvider";
import { useShareBook } from "./useShareBook";
import { useSignedImageUrl } from "./useSignedImageUrl";

function normalizeDateValue(value: unknown) {
    if (!value) return undefined;
    if (typeof value === "string") return value;

    if (
        typeof value === "object" &&
        value !== null &&
        "format" in value &&
        typeof (value as { format: (fmt: string) => string }).format === "function"
    ) {
        return (value as { format: (fmt: string) => string }).format("YYYY-MM-DD");
    }

    return undefined;
}

export function useBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [shareLoading, setShareLoading] = useState(false);
    const { isSupported, shareBook } = useShareBook();

    const [book, setBook] = useState<IBook | null>(useBookById(Number(id)));
    const [count, setCount] = useState(5);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleUpdateBook = async (values: CreateBookFormValues) => {
        if (!book) return;

        try {
            setIsUpdating(true);

            const { dtInicial, dtFinal, coverFileList, ...rest } = values;

            const payload = {
                ...rest,
                dtInicial: normalizeDateValue(dtInicial),
                dtFinal: normalizeDateValue(dtFinal),
            };

            const updated = await bookService.update(book.idLivro, payload);

            setBook(updated); // 👈 atualiza local
            message.success("Livro atualizado!");
            closeEditModal();

        } catch (err) {
            console.error(err);
            message.error("Erro ao atualizar livro");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteBook = async () => {
        if (!book) return;

        try {
            setIsDeleting(true);

            await bookService.delete(book.idLivro);

            message.success("Livro excluído!");
            navigate("/");

        } catch (err) {
            console.error(err);
            message.error("Erro ao excluir livro");
        } finally {
            setIsDeleting(false);
        }
    };

    if (!book) {
        return {
            book: null,
            count,
            shareLoading,
            handleShare: null,
            imageUrl: null,
            isEditModalOpen,
            isUpdating,
            openEditModal,
            closeEditModal,
            handleUpdateBook,
            isDeleting,
            handleDeleteBook,
        }
    }

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

    const imageUrl = useSignedImageUrl({ path: book.img, bucket: "covers" });

    return {
        book,
        count,
        shareLoading,
        handleShare,
        imageUrl,

        // edit
        isEditModalOpen,
        isUpdating,
        openEditModal,
        closeEditModal,
        handleUpdateBook,

        // delete
        isDeleting,
        handleDeleteBook,
    };
}
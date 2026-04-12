import { useCallback, useMemo } from "react";
import type { IBook } from "../types/book.type";

interface ShareOutcome {
    status: "shared" | "cancelled" | "unsupported" | "error";
    error?: unknown;
}

function getStatusPhrase(status: IBook["status"]) {
    if (status === "Lendo") return "estou lendo";
    if (status === "Desejado") return "quero ler";
    return "acabei de ler";
}

function formatShareText(book: IBook) {
    const author = book.autor ?? "Autor desconhecido";
    const progress = book.numPag > 0
        ? Math.round((book.numPagRead / book.numPag) * 100)
        : 0;
    const statusPhrase = getStatusPhrase(book.status);
    const progressText = book.status === "Desejado"
        ? "Ainda não comecei, mas já está na minha lista!"
        : `Progresso: ${book.numPagRead}/${book.numPag} páginas (${progress}%)`;

    return [
        `Veja o livro ${book.nome} que ${statusPhrase}!`,
        `Autor: ${author}`,
        progressText,
        "",
        "Compartilhado via Entrelinhas.",
    ].join("\n");
}

function inferImageMimeType(imageUrl: string) {
    if (imageUrl.includes(".png")) return "image/png";
    if (imageUrl.includes(".webp")) return "image/webp";
    if (imageUrl.includes(".jpg") || imageUrl.includes(".jpeg")) return "image/jpeg";
    return "image/jpeg";
}

async function createImageFileFromUrl(imageUrl?: string, bookName?: string) {
    if (!imageUrl) return null;

    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    const blob = await response.blob();
    if (!blob.size) return null;

    const mimeType = blob.type || inferImageMimeType(imageUrl);
    const safeName = (bookName ?? "livro")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return new File([blob], `${safeName || "livro"}-capa.jpg`, { type: mimeType });
}

function resolveSiteUrl(pageUrl?: string) {
    if (pageUrl) {
        try {
            return new URL(pageUrl).origin;
        } catch {
            // Fallback below
        }
    }

    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    return pageUrl ?? "";
}

export function useShareBook() {
    const isSupported = useMemo(() => {
        return typeof navigator !== "undefined" && typeof navigator.share === "function";
    }, []);

    const shareBook = useCallback(async (book: IBook, pageUrl: string, imageUrl?: string): Promise<ShareOutcome> => {
        if (!isSupported) {
            return { status: "unsupported" };
        }

        const siteUrl = resolveSiteUrl(pageUrl);

        const baseShareData: ShareData = {
            title: `Entrelinhas - ${book.nome}`,
            text: formatShareText(book),
            url: siteUrl,
        };

        try {
            let imageFile: File | null = null;

            try {
                imageFile = await createImageFileFromUrl(imageUrl, book.nome);
            } catch {
                imageFile = null;
            }

            if (imageFile && typeof navigator.canShare === "function") {
                const shareWithFile: ShareData = {
                    ...baseShareData,
                    files: [imageFile],
                };

                if (navigator.canShare(shareWithFile)) {
                    await navigator.share(shareWithFile);
                    return { status: "shared" };
                }
            }

            await navigator.share(baseShareData);
            return { status: "shared" };
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return { status: "cancelled" };
            }

            return { status: "error", error };
        }
    }, [isSupported]);

    return {
        isSupported,
        shareBook,
    };
}

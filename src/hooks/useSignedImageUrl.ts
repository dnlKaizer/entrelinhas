import { useEffect, useState } from "react";
import { supabase } from "../services/supabase.client";

const DEFAULT_PLACEHOLDER = "/placeholder.png";

interface UseSignedImageUrlParams {
    path?: string;
    bucket?: string;
    expiresIn?: number;
    fallbackUrl?: string;
}

export function useSignedImageUrl({
    path,
    bucket = "covers",
    expiresIn = 60,
    fallbackUrl = DEFAULT_PLACEHOLDER,
}: UseSignedImageUrlParams) {
    const [imageUrl, setImageUrl] = useState<string>(fallbackUrl);

    useEffect(() => {
        let isMounted = true;

        async function loadSignedImageUrl() {
            if (!path) {
                if (isMounted) setImageUrl(fallbackUrl);
                return;
            }

            const { data, error } = await supabase
                .storage
                .from(bucket)
                .createSignedUrl(path, expiresIn);

            if (error || !data) {
                console.error("Erro ao gerar URL assinada:", error);
                if (isMounted) setImageUrl(fallbackUrl);
                return;
            }

            if (isMounted) setImageUrl(data.signedUrl);
        }

        loadSignedImageUrl();

        return () => {
            isMounted = false;
        };
    }, [path, bucket, expiresIn, fallbackUrl]);

    return imageUrl;
}
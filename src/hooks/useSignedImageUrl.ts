import { useEffect, useState } from "react";
import { supabase } from "../services/supabase.client";

const DEFAULT_PLACEHOLDER = "/placeholder.png";
const DEFAULT_EXPIRES_IN_SECONDS = 21600;

interface SignedImageCacheEntry {
    signedUrl: string;
    expiresAt: number;
}

const signedImageCache = new Map<string, SignedImageCacheEntry>();
const inFlightSignedUrlRequests = new Map<string, Promise<string | null>>();

function buildOfflinePath(bucket: string, path: string) {
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/sign/${bucket}/${path}`;
}

function createCacheKey(bucket: string, path: string) {
    return `${bucket}:${path}`;
}

function getValidCachedUrl(cacheKey: string) {
    const cachedEntry = signedImageCache.get(cacheKey);
    if (!cachedEntry) return null;

    if (cachedEntry.expiresAt <= Date.now()) {
        signedImageCache.delete(cacheKey);
        return null;
    }

    return cachedEntry.signedUrl;
}

async function getOrCreateSignedUrl(cacheKey: string, bucket: string, path: string, expiresIn: number) {
    const cachedUrl = getValidCachedUrl(cacheKey);
    if (cachedUrl) return cachedUrl;

    const inFlightRequest = inFlightSignedUrlRequests.get(cacheKey);
    if (inFlightRequest) return inFlightRequest;

    if (!navigator.onLine) {
        return buildOfflinePath(bucket, path);
    }

    const nextRequest = (async () => {
        return await supabase
            .storage
            .from(bucket)
            .createSignedUrl(path, expiresIn)
            .then((data) => {
                const now = Date.now();
                const ttlInMs = Math.max(expiresIn, 1) * 1000;
                if (!data.data) {
                    return buildOfflinePath(bucket, path);
                }
                const signedUrl = data.data.signedUrl;

                signedImageCache.set(cacheKey, {
                    signedUrl: signedUrl,
                    expiresAt: now + ttlInMs,
                });

                return signedUrl;
            })
            .catch(() => {
                return buildOfflinePath(bucket, path);
            });
    })().finally(() => {
        inFlightSignedUrlRequests.delete(cacheKey);
    });

    inFlightSignedUrlRequests.set(cacheKey, nextRequest);

    return nextRequest;
}

export function clearSignedImageCache() {
    signedImageCache.clear();
    inFlightSignedUrlRequests.clear();
}

interface UseSignedImageUrlParams {
    path?: string;
    bucket?: string;
    expiresIn?: number;
    fallbackUrl?: string;
}

export function useSignedImageUrl({
    path,
    bucket = "covers",
    expiresIn = DEFAULT_EXPIRES_IN_SECONDS,
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

            const cacheKey = createCacheKey(bucket, path);
            const cachedUrl = getValidCachedUrl(cacheKey);
            if (cachedUrl) {
                if (isMounted) setImageUrl(cachedUrl);
                return;
            }

            const signedUrl = await getOrCreateSignedUrl(cacheKey, bucket, path, expiresIn);
            if (!signedUrl) {
                if (isMounted) setImageUrl(fallbackUrl);
                return;
            }

            if (isMounted) setImageUrl(signedUrl);
        }

        loadSignedImageUrl();

        return () => {
            isMounted = false;
        };
    }, [path, bucket, expiresIn, fallbackUrl]);

    return imageUrl;
}

/**
 * Get full URL for Strapi media
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
    if (!url) return '';

    // Already a full URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // Relative URL - prepend API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    return `${apiUrl}${url}`;
}

/**
 * Safe fetch with timeout
 */
export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 5000
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * Retry fetch with exponential backoff
 */
export async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    maxRetries = 3
): Promise<Response> {
    let lastError: Error;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetchWithTimeout(url, options);
            if (response.ok) return response;

            // Don't retry on 4xx errors
            if (response.status >= 400 && response.status < 500) {
                return response;
            }
        } catch (error) {
            lastError = error as Error;

            // Wait before retry with exponential backoff
            if (i < maxRetries - 1) {
                await new Promise(resolve =>
                    setTimeout(resolve, Math.pow(2, i) * 1000)
                );
            }
        }
    }

    throw lastError!;
}
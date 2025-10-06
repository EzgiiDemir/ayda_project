// ==========================================
// lib/api/whyUs.ts
// ==========================================
import { cache } from 'react';
import { DEFAULT_WHYUS_CONFIG, WhyUsConfig } from '@/types/whyUs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const REVALIDATE_TIME = 3600;

// Strapi relative URL'leri normalize et
function withBase(url?: string | null): string | undefined {
    if (!url) return undefined;
    if (url.startsWith('http')) return url;
    return `${API_URL}${url}`;
}

export const getWhyUsConfig = cache(async (locale: string): Promise<WhyUsConfig> => {
    try {
        const res = await fetch(
            `${API_URL}/api/why-us-page?locale=${locale}&populate=deep`,
            {
                next: {
                    revalidate: REVALIDATE_TIME,
                    tags: [`whyus-${locale}`],
                },
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (!res.ok) {
            console.error(`WhyUs API error: ${res.status}`);
            return DEFAULT_WHYUS_CONFIG;
        }

        const json = await res.json();
        const attrs = json?.data?.attributes;

        return {
            heroImage:
                withBase(attrs?.heroImage?.data?.attributes?.url) ||
                DEFAULT_WHYUS_CONFIG.heroImage,
            contextOverride: attrs?.context ?? DEFAULT_WHYUS_CONFIG.contextOverride,
        };
    } catch (e) {
        console.error('WhyUs config fetch error:', e);
        return DEFAULT_WHYUS_CONFIG;
    }
});

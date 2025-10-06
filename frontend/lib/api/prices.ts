// ==========================================
// lib/api/prices.ts
// ==========================================
import { cache } from 'react';
import { PricesConfig, DEFAULT_PRICES_CONFIG } from '@/types/prices';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const REVALIDATE_TIME = 3600;

export const getPricesConfig = cache(async (locale: string): Promise<PricesConfig> => {
    try {
        const response = await fetch(`${API_URL}/api/prices-page?locale=${locale}&populate=deep`, {
            next: { revalidate: REVALIDATE_TIME, tags: [`prices-${locale}`] },
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            console.error(`Prices API error: ${response.status}`);
            return DEFAULT_PRICES_CONFIG;
        }

        const data = await response.json();
        const attributes = data.data?.attributes;

        return {
            heroImage: attributes?.heroImage?.data?.attributes?.url || DEFAULT_PRICES_CONFIG.heroImage,
            heroPreTitle: attributes?.heroPreTitle || DEFAULT_PRICES_CONFIG.heroPreTitle,
            heroTitle: attributes?.heroTitle || DEFAULT_PRICES_CONFIG.heroTitle,
            tableTitle: attributes?.tableTitle || DEFAULT_PRICES_CONFIG.tableTitle,
            items: attributes?.items || DEFAULT_PRICES_CONFIG.items,
            infoTitle: attributes?.infoTitle || DEFAULT_PRICES_CONFIG.infoTitle,
            infoParagraphs: attributes?.infoParagraphs || DEFAULT_PRICES_CONFIG.infoParagraphs,
        };
    } catch (error) {
        console.error('Prices config fetch error:', error);
        return DEFAULT_PRICES_CONFIG;
    }
});

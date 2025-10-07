import { cache } from 'react';
import { PricesConfig, DEFAULT_PRICES_CONFIG } from '@/types/prices';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const getPricesConfig = cache(async (locale: string): Promise<PricesConfig> => {
    try {
        const res = await fetch(`${API_URL}/api/prices?locale=${locale}&populate=deep`, {
            next: { revalidate: 3600, tags: [`prices-${locale}`] },
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) return DEFAULT_PRICES_CONFIG;

        const data = await res.json();
        const attr = data.data?.attributes;

        return {
            heroImage: attr?.heroImage?.data?.attributes?.url || DEFAULT_PRICES_CONFIG.heroImage,
            heroPreTitle: attr?.heroPreTitle || DEFAULT_PRICES_CONFIG.heroPreTitle,
            heroTitle: attr?.heroTitle || DEFAULT_PRICES_CONFIG.heroTitle,
            items: (attr?.items || DEFAULT_PRICES_CONFIG.items)
                .filter((item: any) => item.isActive !== false)
                .sort((a: any, b: any) => a.order - b.order),
            infoTitle: attr?.infoTitle || DEFAULT_PRICES_CONFIG.infoTitle,
            infoParagraphs: attr?.infoParagraphs || DEFAULT_PRICES_CONFIG.infoParagraphs,
        };
    } catch (error) {
        console.error('Prices fetch error:', error);
        return DEFAULT_PRICES_CONFIG;
    }
});

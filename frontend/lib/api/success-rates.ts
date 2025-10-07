
import { cache } from 'react';
import { SuccessRatesConfig, DEFAULT_SUCCESS_RATES_CONFIG } from '@/types/success-rates';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const getSuccessRatesConfig = cache(async (locale: string): Promise<SuccessRatesConfig> => {
    try {
        const res = await fetch(`${API_URL}/api/success-rates?locale=${locale}&populate=deep`, {
            next: { revalidate: 3600, tags: [`success-rates-${locale}`] },
        });

        if (!res.ok) return DEFAULT_SUCCESS_RATES_CONFIG;

        const data = await res.json();
        const attr = data.data?.attributes;

        return {
            heroImage: attr?.heroImage?.data?.attributes?.url || DEFAULT_SUCCESS_RATES_CONFIG.heroImage,
            heroTitle: attr?.heroTitle || DEFAULT_SUCCESS_RATES_CONFIG.heroTitle,
            subtitle: attr?.subtitle || DEFAULT_SUCCESS_RATES_CONFIG.subtitle,
            year: attr?.year || DEFAULT_SUCCESS_RATES_CONFIG.year,
            rows: (attr?.rows || DEFAULT_SUCCESS_RATES_CONFIG.rows).sort((a: any, b: any) => a.order - b.order),
        };
    } catch (error) {
        console.error('Success rates fetch error:', error);
        return DEFAULT_SUCCESS_RATES_CONFIG;
    }
});
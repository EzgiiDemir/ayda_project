import { cache } from 'react';
import { FAQConfig, DEFAULT_FAQ_CONFIG } from '@/types/faq';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const REVALIDATE_TIME = 3600;

export const getFAQConfig = cache(async (locale: string): Promise<FAQConfig> => {
    try {
        const response = await fetch(
            `${API_URL}/api/faq?locale=${locale}&populate=deep`,
            {
                next: {
                    revalidate: REVALIDATE_TIME,
                    tags: [`faq-${locale}`],
                },
            }
        );

        if (!response.ok) {
            return DEFAULT_FAQ_CONFIG;
        }

        const data = await response.json();
        return {
            title: data.data.attributes.title || DEFAULT_FAQ_CONFIG.title,
            subtitle: data.data.attributes.subtitle,
            faqs: (data.data.attributes.faqs || DEFAULT_FAQ_CONFIG.faqs)
                .filter((f: any) => f.isActive !== false)
                .sort((a: any, b: any) => a.order - b.order),
            heroImage: data.data.attributes.heroImage?.data?.attributes?.url || DEFAULT_FAQ_CONFIG.heroImage,
        };
    } catch (error) {
        console.error('FAQ fetch error:', error);
        return DEFAULT_FAQ_CONFIG;
    }
});
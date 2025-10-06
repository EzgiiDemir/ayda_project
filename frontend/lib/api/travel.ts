import { cache } from 'react';
import { TravelConfig, DEFAULT_TRAVEL_CONFIG } from '@/types/travel';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const REVALIDATE_TIME = 3600;

export const getTravelConfig = cache(async (locale: string): Promise<TravelConfig> => {
    try {
        const response = await fetch(
            `${API_URL}/api/travel?locale=${locale}&populate=deep`,
            {
                next: {
                    revalidate: REVALIDATE_TIME,
                    tags: [`travel-${locale}`],
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.error(`Travel API error: ${response.status}`);
            return DEFAULT_TRAVEL_CONFIG;
        }

        const data = await response.json();
        const attributes = data.data?.attributes;

        return {
            heroImage: attributes?.heroImage?.data?.attributes?.url || DEFAULT_TRAVEL_CONFIG.heroImage,
            title: attributes?.title || DEFAULT_TRAVEL_CONFIG.title,
            sections: (attributes?.sections || [])
                .filter((s: any) => s.isActive !== false)
                .sort((a: any, b: any) => a.order - b.order),
        };
    } catch (error) {
        console.error('Travel fetch error:', error);
        return DEFAULT_TRAVEL_CONFIG;
    }
});
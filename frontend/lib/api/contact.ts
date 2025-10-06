
import { cache } from 'react';
import { ContactConfig, DEFAULT_CONTACT_CONFIG } from '@/types/contact';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const REVALIDATE_TIME = 3600;

export const getContactConfig = cache(async (locale: string): Promise<ContactConfig> => {
    try {
        const response = await fetch(
            `${API_URL}/api/contact-page?locale=${locale}&populate=deep`,
            {
                next: {
                    revalidate: REVALIDATE_TIME,
                    tags: [`contact-${locale}`],
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.error(`Contact API error: ${response.status}`);
            return DEFAULT_CONTACT_CONFIG;
        }

        const data = await response.json();
        const attributes = data.data?.attributes;

        return {
            heroImage:
                attributes?.heroImage?.data?.attributes?.url ||
                DEFAULT_CONTACT_CONFIG.heroImage,
            heroPreTitle: attributes?.heroPreTitle || DEFAULT_CONTACT_CONFIG.heroPreTitle,
            heroTitle: attributes?.heroTitle || DEFAULT_CONTACT_CONFIG.heroTitle,
            form: {
                subjects: attributes?.form?.subjects || DEFAULT_CONTACT_CONFIG.form.subjects,
                apiEndpoint: attributes?.form?.apiEndpoint || DEFAULT_CONTACT_CONFIG.form.apiEndpoint,
            },
        };
    } catch (error) {
        console.error('Contact config fetch error:', error);
        return DEFAULT_CONTACT_CONFIG;
    }
});

import { FooterConfig, FooterApiResponse, DEFAULT_FOOTER_CONFIG } from '@/types/footer';
import { cache } from 'react';
import { fetchWithRetry, getStrapiMediaUrl } from '@/lib/utils/api-helpers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const REVALIDATE_TIME = parseInt(process.env.FOOTER_REVALIDATE_TIME || '3600');

export const getFooterConfig = cache(async (locale: string): Promise<FooterConfig> => {
    try {
        const response = await fetchWithRetry(
            `${API_URL}/api/footer?locale=${locale}&populate=deep`,
            {
                next: {
                    revalidate: REVALIDATE_TIME,
                    tags: [`footer-${locale}`]
                },
                headers: {
                    'Content-Type': 'application/json',
                    ...(process.env.API_TOKEN && {
                        'Authorization': `Bearer ${process.env.API_TOKEN}`
                    })
                },
            }
        );

        if (!response.ok) {
            console.error(`Footer API error: ${response.status} ${response.statusText}`);
            return DEFAULT_FOOTER_CONFIG;
        }

        const data: FooterApiResponse = await response.json();
        return transformFooterData(data);
    } catch (error) {
        console.error('Error fetching footer config:', error);
        return DEFAULT_FOOTER_CONFIG;
    }
});

function transformFooterData(data: FooterApiResponse): FooterConfig {
    const attributes = data.data.attributes;

    return {
        address: {
            icon: getStrapiMediaUrl(attributes.address.icon) || DEFAULT_FOOTER_CONFIG.address.icon,
            isoLogo: getStrapiMediaUrl(attributes.address.isoLogo) || DEFAULT_FOOTER_CONFIG.address.isoLogo,
            text: attributes.address.text,
        },
        contact: {
            icon: getStrapiMediaUrl(attributes.contact.icon) || DEFAULT_FOOTER_CONFIG.contact.icon,
            phone: attributes.contact.phone,
            phoneLink: attributes.contact.phoneLink,
            email: attributes.contact.email,
            emailLink: attributes.contact.emailLink,
            socialLinks: attributes.contact.socialLinks
                .filter(link => link.isActive !== false)
                .map(link => ({
                    ...link,
                    url: link.url || '#'
                })),
        },
        quickAccess: {
            icon: getStrapiMediaUrl(attributes.quickAccess.icon) || DEFAULT_FOOTER_CONFIG.quickAccess.icon,
            links: attributes.quickAccess.links
                .filter(link => link.isActive !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0)),
        },
        copyrightLogo: getStrapiMediaUrl(
            attributes.copyrightLogo?.data?.attributes?.url
        ) || DEFAULT_FOOTER_CONFIG.copyrightLogo,
        copyrightText: attributes.copyrightText,
    };
}

export async function prefetchFooterConfigs(locales: string[]) {
    return Promise.allSettled(
        locales.map(locale => getFooterConfig(locale))
    );
}

export async function revalidateFooter(locale?: string) {
    const { revalidateTag } = await import('next/cache');

    if (locale) {
        revalidateTag(`footer-${locale}`);
    } else {
        const locales = process.env.NEXT_PUBLIC_LOCALES?.split(',') || ['tr', 'en'];
        locales.forEach(loc => revalidateTag(`footer-${loc.trim()}`));
    }
}
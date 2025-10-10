import { cache } from 'react';
import { fetchWithRetry, getStrapiMediaUrl } from '@/lib/utils/api-helpers';
import type { FooterConfig, FooterApiResponse } from '@/types/footer';

type NextFetchOptions = RequestInit & {
    next?: {
        revalidate?: number;
        tags?: string[];
    };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337';
const REVALIDATE_TIME_RAW = Number(process.env.FOOTER_REVALIDATE_TIME ?? '3600');
const REVALIDATE_TIME = Number.isFinite(REVALIDATE_TIME_RAW) ? REVALIDATE_TIME_RAW : 3600;

const asArray = <T = unknown>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const media = (input: any): string | undefined => {
    const url = getStrapiMediaUrl(input);
    return url && url.length > 0 ? url : undefined;
};

export const getFooterConfig = cache(async (locale: string): Promise<FooterConfig> => {
    try {
        const url = `${API_URL}/api/footer?locale=${encodeURIComponent(locale)}&populate=deep`;

        const res = await fetchWithRetry(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(process.env.API_TOKEN ? { Authorization: `Bearer ${process.env.API_TOKEN}` } : {}),
                },
                // Next.js cache metadata
                next: {
                    revalidate: REVALIDATE_TIME,
                    tags: [`footer-${locale}`],
                },
            } as NextFetchOptions,
            0 // retry=0: backend yoksa hızlı fallback
        );

        if (!res.ok) {
            console.error(`Footer API error: ${res.status} ${res.statusText}`);
            return DEFAULT_FOOTER_CONFIG;
        }

        const data = (await res.json()) as FooterApiResponse;
        return transformFooterData(data);
    } catch (error) {
        console.error('Error fetching footer config:', error);
        return DEFAULT_FOOTER_CONFIG;
    }
});

function transformFooterData(payload: FooterApiResponse): FooterConfig {
    const attrs = payload?.data?.attributes ?? ({} as any);

    const social = asArray<any>(attrs?.contact?.socialLinks)
        .filter((link) => link?.isActive !== false)
        .map((link) => ({
            ...link,
            url: link?.url || '#',
        }));

    const quickLinks = asArray<any>(attrs?.quickAccess?.links)
        .filter((l) => l?.isActive !== false)
        .sort((a, b) => ((a?.order ?? 0) - (b?.order ?? 0)));

    return {
        address: {
            icon: media(attrs?.address?.icon) ?? DEFAULT_FOOTER_CONFIG.address.icon,
            isoLogo: media(attrs?.address?.isoLogo) ?? DEFAULT_FOOTER_CONFIG.address.isoLogo,
            text: attrs?.address?.text ?? DEFAULT_FOOTER_CONFIG.address.text,
        },
        contact: {
            icon: media(attrs?.contact?.icon) ?? DEFAULT_FOOTER_CONFIG.contact.icon,
            phone: attrs?.contact?.phone ?? DEFAULT_FOOTER_CONFIG.contact.phone,
            phoneLink: attrs?.contact?.phoneLink ?? DEFAULT_FOOTER_CONFIG.contact.phoneLink,
            email: attrs?.contact?.email ?? DEFAULT_FOOTER_CONFIG.contact.email,
            emailLink: attrs?.contact?.emailLink ?? DEFAULT_FOOTER_CONFIG.contact.emailLink,
            socialLinks: social,
        },
        quickAccess: {
            icon: media(attrs?.quickAccess?.icon) ?? DEFAULT_FOOTER_CONFIG.quickAccess.icon,
            links: quickLinks,
        },
        copyrightLogo:
            media(attrs?.copyrightLogo?.data?.attributes?.url) ??
            DEFAULT_FOOTER_CONFIG.copyrightLogo,
        copyrightText:
            attrs?.copyrightText ?? DEFAULT_FOOTER_CONFIG.copyrightText,
    };
}

export async function prefetchFooterConfigs(locales: string[]) {
    return Promise.allSettled(locales.map((loc) => getFooterConfig(loc)));
}

export async function revalidateFooter(locale?: string) {
    const { revalidateTag } = await import('next/cache');
    if (locale) {
        revalidateTag(`footer-${locale}`);
    } else {
        const locales = (process.env.NEXT_PUBLIC_LOCALES ?? 'tr,en')
            .split(',')
            .map((s) => s.trim());
        locales.forEach((loc) => revalidateTag(`footer-${loc}`));
    }
}

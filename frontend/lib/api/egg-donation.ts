// ==========================================
// lib/api/egg-donation.ts
// ==========================================

import { cache } from 'react';
import {
    EggDonationConfig,
    DEFAULT_EGG_DONATION_CONFIG,
    EggDonationSection,
    EggBlock,
} from '@/types/egg-donation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

/**
 * Strapi model beklenen alanlar (öneri):
 * {
 *   heroImage { url }
 *   pageTitle
 *   metaTitle
 *   metaDescription
 *   sections: [
 *     { id, title, order, isActive, blocks: [ { type:'p', value }, { type:'ul', items:[] }, { type:'h3', value } ] }
 *   ]
 * }
 */
export const getEggDonationConfig = cache(async (locale: string): Promise<EggDonationConfig> => {
    try {
        const res = await fetch(`${API_URL}/api/egg-donation?locale=${locale}&populate=deep`, {
            next: { revalidate: 3600, tags: [`egg-donation-${locale}`] },
        });

        if (!res.ok) return DEFAULT_EGG_DONATION_CONFIG;

        const data = await res.json();
        const attr = data?.data?.attributes ?? {};

        const sections: EggDonationSection[] =
            (attr.sections as any[] | undefined)?.map((s) => ({
                id: String(s.id ?? cryptoRandomId()),
                title: s.title ?? '',
                order: Number(s.order ?? 0),
                isActive: s.isActive !== false,
                blocks: normalizeBlocks(s.blocks),
            })) ?? DEFAULT_EGG_DONATION_CONFIG.sections;

        return {
            heroImage: attr?.heroImage?.data?.attributes?.url || DEFAULT_EGG_DONATION_CONFIG.heroImage,
            pageTitle: attr?.pageTitle || DEFAULT_EGG_DONATION_CONFIG.pageTitle,
            metaTitle: attr?.metaTitle || DEFAULT_EGG_DONATION_CONFIG.metaTitle,
            metaDescription: attr?.metaDescription || DEFAULT_EGG_DONATION_CONFIG.metaDescription,
            sections: sections
                .filter((s) => s.isActive !== false)
                .sort((a, b) => a.order - b.order),
        };
    } catch (error) {
        console.error('EGG-DONATION fetch error:', error);
        return DEFAULT_EGG_DONATION_CONFIG;
    }
});

function normalizeBlocks(raw: any): EggBlock[] {
    if (!Array.isArray(raw)) return [];
    return raw
        .map((b) => {
            if (!b || typeof b !== 'object') return null;
            if (b.type === 'ul' && Array.isArray(b.items)) return { type: 'ul', items: b.items.map(String) } as EggBlock;
            if (b.type === 'h3' && typeof b.value === 'string') return { type: 'h3', value: b.value } as EggBlock;
            if (b.type === 'p' && typeof b.value === 'string') return { type: 'p', value: b.value } as EggBlock;
            // Strapi "richtext" gelirse basitçe paragrafa düşür:
            if (b.type === 'richtext' && typeof b.html === 'string') return { type: 'p', value: stripHtml(b.html) } as EggBlock;
            return null;
        })
        .filter(Boolean) as EggBlock[];
}

function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, '').trim();
}

// basit id fallback
function cryptoRandomId() {
    return Math.random().toString(36).slice(2, 10);
}


import { cache } from 'react';
import { IvfIcsiConfig, DEFAULT_IVF_ICSI_CONFIG } from '@/types/ivf-icsi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const getIvfIcsiConfig = cache(async (locale: string): Promise<IvfIcsiConfig> => {
    try {
        const res = await fetch(`${API_URL}/api/ivf-icsi?locale=${locale}&populate=deep`, {
            next: { revalidate: 3600, tags: [`ivf-icsi-${locale}`] },
        });

        if (!res.ok) return DEFAULT_IVF_ICSI_CONFIG;

        const data = await res.json();
        const attr = data.data?.attributes;

        return {
            heroImage: attr?.heroImage?.data?.attributes?.url || DEFAULT_IVF_ICSI_CONFIG.heroImage,
            pageTitle: attr?.pageTitle || DEFAULT_IVF_ICSI_CONFIG.pageTitle,
            sections: (attr?.sections || DEFAULT_IVF_ICSI_CONFIG.sections)
                .filter((s: any) => s.isActive !== false)
                .sort((a: any, b: any) => a.order - b.order),
        };
    } catch (error) {
        console.error('IVF-ICSI fetch error:', error);
        return DEFAULT_IVF_ICSI_CONFIG;
    }
});

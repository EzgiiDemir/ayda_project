import { cache } from 'react';
import { TeamConfig, DEFAULT_TEAM_CONFIG } from '@/types/team';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const getTeamConfig = cache(async (locale: string): Promise<TeamConfig> => {
    try {
        const res = await fetch(`${API_URL}/api/team?locale=${locale}&populate=deep`, {
            next: { revalidate: 3600, tags: [`team-${locale}`] },
        });

        if (!res.ok) return DEFAULT_TEAM_CONFIG;

        const data = await res.json();
        const attr = data.data?.attributes;

        return {
            heroImage: attr?.heroImage?.data?.attributes?.url || DEFAULT_TEAM_CONFIG.heroImage,
            heroPreTitle: attr?.heroPreTitle || DEFAULT_TEAM_CONFIG.heroPreTitle,
            members: (attr?.members || DEFAULT_TEAM_CONFIG.members)
                .filter((m: any) => m.isActive !== false)
                .sort((a: any, b: any) => a.order - b.order),
        };
    } catch (error) {
        console.error('Team fetch error:', error);
        return DEFAULT_TEAM_CONFIG;
    }
});
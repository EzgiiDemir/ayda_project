// ==========================================
// lib/api/team.ts
// ==========================================
import { cache } from 'react';
import { TeamConfig, DEFAULT_TEAM_CONFIG } from '@/types/team';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const REVALIDATE_TIME = 3600;

export const getTeamConfig = cache(async (locale: string): Promise<TeamConfig> => {
    try {
        const response = await fetch(`${API_URL}/api/our-team-page?locale=${locale}&populate=deep`, {
            next: { revalidate: REVALIDATE_TIME, tags: [`team-${locale}`] },
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            console.error(`Team API error: ${response.status}`);
            return DEFAULT_TEAM_CONFIG;
        }

        const data = await response.json();
        const attributes = data.data?.attributes;

        return {
            heroImage: attributes?.heroImage?.data?.attributes?.url || DEFAULT_TEAM_CONFIG.heroImage,
            heroPreTitle: attributes?.heroPreTitle || DEFAULT_TEAM_CONFIG.heroPreTitle,
            heroTitle: attributes?.heroTitle || DEFAULT_TEAM_CONFIG.heroTitle,
            members: attributes?.members || DEFAULT_TEAM_CONFIG.members,
        };
    } catch (error) {
        console.error('Team config fetch error:', error);
        return DEFAULT_TEAM_CONFIG;
    }
});

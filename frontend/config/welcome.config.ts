// config/welcome.config.ts

import { WelcomeConfig } from '@/types/welcome.types';

export const DEFAULT_WELCOME_CONFIG: WelcomeConfig = {
    image: {
        url: 'https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png',
        alt: 'Ayda CEO',
    },
    gradient: {
        from: 'rgb(30, 170, 207)',
        via: 'rgb(240, 143, 178)',
        to: 'rgba(250, 250, 250, 0)',
    },
    signature: {
        name: 'Dr. Ayda Surname',
        title: 'CEO & Founder',
    },
    meta: {
        version: '1.0.0',
    },
};

// API Configuration
export const WELCOME_API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.aydaivf.com',
    endpoint: '/api/welcome',
    timeout: 5000,
};

// Cache Configuration
export const WELCOME_CACHE_CONFIG = {
    key: 'welcome_config',
    ttl: 3600000, // 1 hour
    enabled: true,
};
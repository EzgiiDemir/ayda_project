// config/contactMap.config.ts

import { ContactMapConfig } from '@/types/contactMap.types';

export const DEFAULT_CONTACT_MAP_CONFIG: ContactMapConfig = {
    image: '/images/showcase.png',
    mapUrl: '',
    showIframe: false,
    meta: {
        version: '1.0.0',
    },
};

// API Configuration
export const CONTACT_MAP_API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.aydaivf.com',
    endpoint: '/api/contact-map',
    timeout: 5000,
};

// Cache Configuration
export const CONTACT_MAP_CACHE_CONFIG = {
    key: 'contact_map_config',
    ttl: 3600000, // 1 hour
    enabled: true,
};
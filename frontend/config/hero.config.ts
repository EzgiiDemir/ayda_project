
import { HeroConfig } from '@/types/hero.types';

export const DEFAULT_HERO_CONFIG: HeroConfig = {
    slides: [
        {
            id: 'slide-1',
            image: {
                url: 'https://api.aydaivf.com/uploads/banner1_a97e8d6aa7.png',
                alt: 'Ayda IVF Banner 1',
            },
            order: 1,
            isActive: true,
        },
    ],
    dotsPattern: '/images/dots.png',
    autoPlay: true,
    autoPlayInterval: 5000,
    showIndicators: true,
    meta: {
        version: '1.0.0',
    },
};

// API Configuration
export const HERO_API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.aydaivf.com',
    endpoint: '/api/hero',
    timeout: 5000,
};

// Cache Configuration
export const HERO_CACHE_CONFIG = {
    key: 'hero_config',
    ttl: 3600000, // 1 hour
    enabled: true,
};
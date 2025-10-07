import type { HeroConfig } from '@/types/hero.types';

export const DEFAULT_HERO_CONFIG: HeroConfig = {
    slides: [],
    rightText: '',
    bottomText: '',
    dotsPattern: true,
    autoPlay: true,
    autoPlayInterval: 6000,
    showControls: true,
    showIndicators: true,
    showCounter: false,
    mobileHeight: 'calc(70dvh - 80px)',
    desktopHeight: 'calc(100dvh - 80px)',
    meta: {},
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
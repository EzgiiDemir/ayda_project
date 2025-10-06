// services/hero.service.ts

import axios, { AxiosError } from 'axios';
import { HeroConfig, HeroApiResponse, HeroError } from '@/types/hero.types';
import { HERO_API_CONFIG, HERO_CACHE_CONFIG, DEFAULT_HERO_CONFIG } from '@/config/hero.config';

class HeroService {
    private cache: Map<string, { data: HeroConfig; timestamp: number }>;

    constructor() {
        this.cache = new Map();
    }

    /**
     * Get hero configuration from API with caching
     */
    async getHeroConfig(locale: string): Promise<HeroConfig> {
        // Check cache first
        if (HERO_CACHE_CONFIG.enabled) {
            const cached = this.getFromCache(locale);
            if (cached) {
                console.log(`[HeroService] Using cached config for locale: ${locale}`);
                return cached;
            }
        }

        try {
            const config = await this.fetchFromApi(locale);

            // Save to cache
            if (HERO_CACHE_CONFIG.enabled) {
                this.saveToCache(locale, config);
            }

            return config;
        } catch (error) {
            console.error('[HeroService] Failed to fetch config:', error);

            // Return default config as fallback
            return DEFAULT_HERO_CONFIG;
        }
    }

    /**
     * Fetch hero config from API
     */
    private async fetchFromApi(locale: string): Promise<HeroConfig> {
        const url = `${HERO_API_CONFIG.baseURL}${HERO_API_CONFIG.endpoint}`;

        try {
            const response = await axios.get<HeroApiResponse>(url, {
                params: { locale },
                timeout: HERO_API_CONFIG.timeout,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.data || !response.data.data) {
                throw new Error('Invalid API response structure');
            }

            const config = this.validateAndTransformConfig(response.data.data);
            return config;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<HeroError>;

                if (axiosError.response) {
                    throw new Error(
                        `API Error: ${axiosError.response.status} - ${axiosError.response.data?.message || 'Unknown error'}`
                    );
                } else if (axiosError.request) {
                    throw new Error('No response from API server');
                } else {
                    throw new Error(`Request error: ${axiosError.message}`);
                }
            }

            throw error;
        }
    }

    /**
     * Validate and transform API config
     */
    private validateAndTransformConfig(config: Partial<HeroConfig>): HeroConfig {
        // Filter and sort slides
        const slides = (config.slides || DEFAULT_HERO_CONFIG.slides)
            .filter(slide => slide.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(slide => ({
                ...slide,
                image: {
                    url: slide.image?.url || '',
                    alt: slide.image?.alt || slide.title,
                },
                overlayOpacity: slide.overlayOpacity ?? 0.4,
            }));

        // Ensure at least one slide exists
        if (slides.length === 0) {
            console.warn('[HeroService] No active slides found, using defaults');
            return DEFAULT_HERO_CONFIG;
        }

        // Merge with default config
        const validatedConfig: HeroConfig = {
            slides,
            rightText: config.rightText ?? DEFAULT_HERO_CONFIG.rightText,
            bottomText: config.bottomText ?? DEFAULT_HERO_CONFIG.bottomText,
            dotsPattern: config.dotsPattern ?? DEFAULT_HERO_CONFIG.dotsPattern,
            autoPlay: config.autoPlay ?? DEFAULT_HERO_CONFIG.autoPlay,
            autoPlayInterval: config.autoPlayInterval ?? DEFAULT_HERO_CONFIG.autoPlayInterval,
            showControls: config.showControls ?? DEFAULT_HERO_CONFIG.showControls,
            showIndicators: config.showIndicators ?? DEFAULT_HERO_CONFIG.showIndicators,
            showCounter: config.showCounter ?? DEFAULT_HERO_CONFIG.showCounter,
            mobileHeight: config.mobileHeight ?? DEFAULT_HERO_CONFIG.mobileHeight,
            desktopHeight: config.desktopHeight ?? DEFAULT_HERO_CONFIG.desktopHeight,
            meta: config.meta,
        };

        return validatedConfig;
    }

    /**
     * Get config from cache
     */
    private getFromCache(locale: string): HeroConfig | null {
        const cacheKey = `${HERO_CACHE_CONFIG.key}_${locale}`;
        const cached = this.cache.get(cacheKey);

        if (!cached) {
            return null;
        }

        const now = Date.now();
        const isExpired = now - cached.timestamp > HERO_CACHE_CONFIG.ttl;

        if (isExpired) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.data;
    }

    /**
     * Save config to cache
     */
    private saveToCache(locale: string, config: HeroConfig): void {
        const cacheKey = `${HERO_CACHE_CONFIG.key}_${locale}`;
        this.cache.set(cacheKey, {
            data: config,
            timestamp: Date.now(),
        });
    }

    /**
     * Clear cache for specific locale or all
     */
    clearCache(locale?: string): void {
        if (locale) {
            const cacheKey = `${HERO_CACHE_CONFIG.key}_${locale}`;
            this.cache.delete(cacheKey);
            console.log(`[HeroService] Cache cleared for locale: ${locale}`);
        } else {
            this.cache.clear();
            console.log('[HeroService] All cache cleared');
        }
    }

    /**
     * Prefetch config for multiple locales
     */
    async prefetchConfigs(locales: string[]): Promise<void> {
        const promises = locales.map(locale =>
            this.getHeroConfig(locale).catch(err => {
                console.error(`[HeroService] Failed to prefetch for locale ${locale}:`, err);
            })
        );

        await Promise.allSettled(promises);
        console.log('[HeroService] Prefetch completed');
    }

    /**
     * Force refresh config from API
     */
    async refreshConfig(locale: string): Promise<HeroConfig> {
        this.clearCache(locale);
        return this.getHeroConfig(locale);
    }

    /**
     * Preload slide images
     */
    preloadImages(config: HeroConfig): void {
        config.slides.forEach((slide) => {
            const img = new window.Image();
            img.src = slide.image.url;
        });
        console.log('[HeroService] Images preloaded');
    }
}

// Export singleton instance
export const heroService = new HeroService();

// Export class for testing
export { HeroService };
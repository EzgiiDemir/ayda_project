// services/navbar.service.ts

import axios, { AxiosError } from 'axios';
import { NavConfig, NavbarApiResponse, NavbarError } from '@/types/navbar.types';
import { NAVBAR_API_CONFIG, NAVBAR_CACHE_CONFIG, DEFAULT_NAVBAR_CONFIG } from '@/config/navbar.config';

class NavbarService {
    private cache: Map<string, { data: NavConfig; timestamp: number }>;

    constructor() {
        this.cache = new Map();
    }

    /**
     * Get navbar configuration from API with caching
     */
    async getNavbarConfig(locale: string): Promise<NavConfig> {
        // Check cache first
        if (NAVBAR_CACHE_CONFIG.enabled) {
            const cached = this.getFromCache(locale);
            if (cached) {
                console.log(`[NavbarService] Using cached config for locale: ${locale}`);
                return cached;
            }
        }

        try {
            const config = await this.fetchFromApi(locale);

            // Save to cache
            if (NAVBAR_CACHE_CONFIG.enabled) {
                this.saveToCache(locale, config);
            }

            return config;
        } catch (error) {
            console.error('[NavbarService] Failed to fetch config:', error);

            // Return default config as fallback
            return DEFAULT_NAVBAR_CONFIG;
        }
    }

    /**
     * Fetch navbar config from API
     */
    private async fetchFromApi(locale: string): Promise<NavConfig> {
        const url = `${NAVBAR_API_CONFIG.baseURL}${NAVBAR_API_CONFIG.endpoint}`;

        try {
            const response = await axios.get<NavbarApiResponse>(url, {
                params: { locale },
                timeout: NAVBAR_API_CONFIG.timeout,
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
                const axiosError = error as AxiosError<NavbarError>;

                if (axiosError.response) {
                    // Server responded with error
                    throw new Error(
                        `API Error: ${axiosError.response.status} - ${axiosError.response.data?.message || 'Unknown error'}`
                    );
                } else if (axiosError.request) {
                    // No response received
                    throw new Error('No response from API server');
                } else {
                    // Request setup error
                    throw new Error(`Request error: ${axiosError.message}`);
                }
            }

            throw error;
        }
    }

    /**
     * Validate and transform API config
     */
    private validateAndTransformConfig(config: Partial<NavConfig>): NavConfig {
        // Merge with default config to ensure all required fields exist
        const validatedConfig: NavConfig = {
            logo: {
                ...DEFAULT_NAVBAR_CONFIG.logo,
                ...config.logo,
            },
            about: {
                ...DEFAULT_NAVBAR_CONFIG.about,
                ...config.about,
                links: (config.about?.links || DEFAULT_NAVBAR_CONFIG.about.links)
                    .filter(link => link.isActive !== false)
                    .sort((a, b) => (a.order || 0) - (b.order || 0)),
            },
            treatments: {
                ...DEFAULT_NAVBAR_CONFIG.treatments,
                ...config.treatments,
                links: (config.treatments?.links || DEFAULT_NAVBAR_CONFIG.treatments.links)
                    .filter(link => link.isActive !== false)
                    .sort((a, b) => (a.order || 0) - (b.order || 0)),
            },
            links: (config.links || DEFAULT_NAVBAR_CONFIG.links)
                .filter(link => link.isActive !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0)),
            contact: {
                ...DEFAULT_NAVBAR_CONFIG.contact,
                ...config.contact,
            },
            meta: config.meta,
        };

        return validatedConfig;
    }

    /**
     * Get config from cache
     */
    private getFromCache(locale: string): NavConfig | null {
        const cacheKey = `${NAVBAR_CACHE_CONFIG.key}_${locale}`;
        const cached = this.cache.get(cacheKey);

        if (!cached) {
            return null;
        }

        const now = Date.now();
        const isExpired = now - cached.timestamp > NAVBAR_CACHE_CONFIG.ttl;

        if (isExpired) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.data;
    }

    /**
     * Save config to cache
     */
    private saveToCache(locale: string, config: NavConfig): void {
        const cacheKey = `${NAVBAR_CACHE_CONFIG.key}_${locale}`;
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
            const cacheKey = `${NAVBAR_CACHE_CONFIG.key}_${locale}`;
            this.cache.delete(cacheKey);
            console.log(`[NavbarService] Cache cleared for locale: ${locale}`);
        } else {
            this.cache.clear();
            console.log('[NavbarService] All cache cleared');
        }
    }

    /**
     * Prefetch config for multiple locales
     */
    async prefetchConfigs(locales: string[]): Promise<void> {
        const promises = locales.map(locale =>
            this.getNavbarConfig(locale).catch(err => {
                console.error(`[NavbarService] Failed to prefetch for locale ${locale}:`, err);
            })
        );

        await Promise.allSettled(promises);
        console.log('[NavbarService] Prefetch completed');
    }

    /**
     * Force refresh config from API
     */
    async refreshConfig(locale: string): Promise<NavConfig> {
        this.clearCache(locale);
        return this.getNavbarConfig(locale);
    }
}

// Export singleton instance
export const navbarService = new NavbarService();

// Export class for testing
export { NavbarService };
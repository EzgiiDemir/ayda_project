// services/welcome.service.ts

import axios, { AxiosError } from 'axios';
import { WelcomeConfig, WelcomeApiResponse, WelcomeError } from '@/types/welcome.types';
import { WELCOME_API_CONFIG, WELCOME_CACHE_CONFIG, DEFAULT_WELCOME_CONFIG } from '@/config/welcome.config';

class WelcomeService {
    private cache: Map<string, { data: WelcomeConfig; timestamp: number }>;

    constructor() {
        this.cache = new Map();
    }

    /**
     * Get welcome configuration from API with caching
     */
    async getWelcomeConfig(locale: string): Promise<WelcomeConfig> {
        // Check cache first
        if (WELCOME_CACHE_CONFIG.enabled) {
            const cached = this.getFromCache(locale);
            if (cached) {
                console.log(`[WelcomeService] Using cached config for locale: ${locale}`);
                return cached;
            }
        }

        try {
            const config = await this.fetchFromApi(locale);

            // Save to cache
            if (WELCOME_CACHE_CONFIG.enabled) {
                this.saveToCache(locale, config);
            }

            return config;
        } catch (error) {
            console.error('[WelcomeService] Failed to fetch config:', error);
            return DEFAULT_WELCOME_CONFIG;
        }
    }

    /**
     * Fetch welcome config from API
     */
    private async fetchFromApi(locale: string): Promise<WelcomeConfig> {
        const url = `${WELCOME_API_CONFIG.baseURL}${WELCOME_API_CONFIG.endpoint}`;

        try {
            const response = await axios.get<WelcomeApiResponse>(url, {
                params: { locale },
                timeout: WELCOME_API_CONFIG.timeout,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.data || !response.data.data) {
                throw new Error('Invalid API response structure');
            }

            return this.validateConfig(response.data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<WelcomeError>;

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
     * Validate and merge with default config
     */
    private validateConfig(config: Partial<WelcomeConfig>): WelcomeConfig {
        return {
            image: {
                ...DEFAULT_WELCOME_CONFIG.image,
                ...config.image,
            },
            gradient: {
                ...DEFAULT_WELCOME_CONFIG.gradient,
                ...config.gradient,
            },
            signature: {
                ...DEFAULT_WELCOME_CONFIG.signature,
                ...config.signature,
            },
            meta: config.meta,
        };
    }

    /**
     * Get config from cache
     */
    private getFromCache(locale: string): WelcomeConfig | null {
        const cacheKey = `${WELCOME_CACHE_CONFIG.key}_${locale}`;
        const cached = this.cache.get(cacheKey);

        if (!cached) {
            return null;
        }

        const now = Date.now();
        const isExpired = now - cached.timestamp > WELCOME_CACHE_CONFIG.ttl;

        if (isExpired) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.data;
    }

    /**
     * Save config to cache
     */
    private saveToCache(locale: string, config: WelcomeConfig): void {
        const cacheKey = `${WELCOME_CACHE_CONFIG.key}_${locale}`;
        this.cache.set(cacheKey, {
            data: config,
            timestamp: Date.now(),
        });
    }

    /**
     * Clear cache
     */
    clearCache(locale?: string): void {
        if (locale) {
            const cacheKey = `${WELCOME_CACHE_CONFIG.key}_${locale}`;
            this.cache.delete(cacheKey);
            console.log(`[WelcomeService] Cache cleared for locale: ${locale}`);
        } else {
            this.cache.clear();
            console.log('[WelcomeService] All cache cleared');
        }
    }

    /**
     * Force refresh config from API
     */
    async refreshConfig(locale: string): Promise<WelcomeConfig> {
        this.clearCache(locale);
        return this.getWelcomeConfig(locale);
    }
}

// Export singleton instance
export const welcomeService = new WelcomeService();

// Export class for testing
export { WelcomeService };
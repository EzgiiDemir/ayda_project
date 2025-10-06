// services/contactMap.service.ts

import axios, { AxiosError } from 'axios';
import { ContactMapConfig, ContactMapApiResponse, ContactMapError } from '@/types/contactMap.types';
import { CONTACT_MAP_API_CONFIG, CONTACT_MAP_CACHE_CONFIG, DEFAULT_CONTACT_MAP_CONFIG } from '@/config/contactMap.config';

class ContactMapService {
    private cache: Map<string, { data: ContactMapConfig; timestamp: number }>;

    constructor() {
        this.cache = new Map();
    }

    /**
     * Get contact map configuration from API with caching
     */
    async getContactMapConfig(locale: string): Promise<ContactMapConfig> {
        // Check cache first
        if (CONTACT_MAP_CACHE_CONFIG.enabled) {
            const cached = this.getFromCache(locale);
            if (cached) {
                console.log(`[ContactMapService] Using cached config for locale: ${locale}`);
                return cached;
            }
        }

        try {
            const config = await this.fetchFromApi(locale);

            // Save to cache
            if (CONTACT_MAP_CACHE_CONFIG.enabled) {
                this.saveToCache(locale, config);
            }

            return config;
        } catch (error) {
            console.error('[ContactMapService] Failed to fetch config:', error);
            return DEFAULT_CONTACT_MAP_CONFIG;
        }
    }

    /**
     * Fetch contact map config from API
     */
    private async fetchFromApi(locale: string): Promise<ContactMapConfig> {
        const url = `${CONTACT_MAP_API_CONFIG.baseURL}${CONTACT_MAP_API_CONFIG.endpoint}`;

        try {
            const response = await axios.get<ContactMapApiResponse>(url, {
                params: { locale },
                timeout: CONTACT_MAP_API_CONFIG.timeout,
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
                const axiosError = error as AxiosError<ContactMapError>;

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
    private validateConfig(config: Partial<ContactMapConfig>): ContactMapConfig {
        return {
            image: config.image || DEFAULT_CONTACT_MAP_CONFIG.image,
            mapUrl: config.mapUrl || DEFAULT_CONTACT_MAP_CONFIG.mapUrl,
            showIframe: config.showIframe ?? DEFAULT_CONTACT_MAP_CONFIG.showIframe,
            meta: config.meta,
        };
    }

    /**
     * Get config from cache
     */
    private getFromCache(locale: string): ContactMapConfig | null {
        const cacheKey = `${CONTACT_MAP_CACHE_CONFIG.key}_${locale}`;
        const cached = this.cache.get(cacheKey);

        if (!cached) {
            return null;
        }

        const now = Date.now();
        const isExpired = now - cached.timestamp > CONTACT_MAP_CACHE_CONFIG.ttl;

        if (isExpired) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.data;
    }

    /**
     * Save config to cache
     */
    private saveToCache(locale: string, config: ContactMapConfig): void {
        const cacheKey = `${CONTACT_MAP_CACHE_CONFIG.key}_${locale}`;
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
            const cacheKey = `${CONTACT_MAP_CACHE_CONFIG.key}_${locale}`;
            this.cache.delete(cacheKey);
            console.log(`[ContactMapService] Cache cleared for locale: ${locale}`);
        } else {
            this.cache.clear();
            console.log('[ContactMapService] All cache cleared');
        }
    }

    /**
     * Force refresh config from API
     */
    async refreshConfig(locale: string): Promise<ContactMapConfig> {
        this.clearCache(locale);
        return this.getContactMapConfig(locale);
    }
}

// Export singleton instance
export const contactMapService = new ContactMapService();

// Export class for testing
export { ContactMapService };
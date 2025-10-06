// services/treatments.service.ts

import axios, { AxiosError } from 'axios';
import { TreatmentsConfig, TreatmentsApiResponse, TreatmentsError } from '@/types/treatments.types';
import { TREATMENTS_API_CONFIG, TREATMENTS_CACHE_CONFIG, DEFAULT_TREATMENTS_CONFIG } from '@/config/treatments.config';

class TreatmentsService {
    private cache: Map<string, { data: TreatmentsConfig; timestamp: number }>;

    constructor() {
        this.cache = new Map();
    }

    /**
     * Get treatments configuration from API with caching
     */
    async getTreatmentsConfig(locale: string): Promise<TreatmentsConfig> {
        // Check cache first
        if (TREATMENTS_CACHE_CONFIG.enabled) {
            const cached = this.getFromCache(locale);
            if (cached) {
                console.log(`[TreatmentsService] Using cached config for locale: ${locale}`);
                return cached;
            }
        }

        try {
            const config = await this.fetchFromApi(locale);

            // Save to cache
            if (TREATMENTS_CACHE_CONFIG.enabled) {
                this.saveToCache(locale, config);
            }

            return config;
        } catch (error) {
            console.error('[TreatmentsService] Failed to fetch config:', error);
            return DEFAULT_TREATMENTS_CONFIG;
        }
    }

    /**
     * Fetch treatments config from API
     */
    private async fetchFromApi(locale: string): Promise<TreatmentsConfig> {
        const url = `${TREATMENTS_API_CONFIG.baseURL}${TREATMENTS_API_CONFIG.endpoint}`;

        try {
            const response = await axios.get<TreatmentsApiResponse>(url, {
                params: { locale },
                timeout: TREATMENTS_API_CONFIG.timeout,
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
                const axiosError = error as AxiosError<TreatmentsError>;

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
     * Validate and transform config
     */
    private validateConfig(config: Partial<TreatmentsConfig>): TreatmentsConfig {
        // Filter active treatments and sort by order
        const treatments = (config.treatments || DEFAULT_TREATMENTS_CONFIG.treatments)
            .filter(treatment => treatment.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0));

        return {
            backgroundLogo: config.backgroundLogo || DEFAULT_TREATMENTS_CONFIG.backgroundLogo,
            treatments: treatments.length > 0 ? treatments : DEFAULT_TREATMENTS_CONFIG.treatments,
            meta: config.meta,
        };
    }

    /**
     * Get config from cache
     */
    private getFromCache(locale: string): TreatmentsConfig | null {
        const cacheKey = `${TREATMENTS_CACHE_CONFIG.key}_${locale}`;
        const cached = this.cache.get(cacheKey);

        if (!cached) {
            return null;
        }

        const now = Date.now();
        const isExpired = now - cached.timestamp > TREATMENTS_CACHE_CONFIG.ttl;

        if (isExpired) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.data;
    }

    /**
     * Save config to cache
     */
    private saveToCache(locale: string, config: TreatmentsConfig): void {
        const cacheKey = `${TREATMENTS_CACHE_CONFIG.key}_${locale}`;
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
            const cacheKey = `${TREATMENTS_CACHE_CONFIG.key}_${locale}`;
            this.cache.delete(cacheKey);
            console.log(`[TreatmentsService] Cache cleared for locale: ${locale}`);
        } else {
            this.cache.clear();
            console.log('[TreatmentsService] All cache cleared');
        }
    }

    /**
     * Force refresh config from API
     */
    async refreshConfig(locale: string): Promise<TreatmentsConfig> {
        this.clearCache(locale);
        return this.getTreatmentsConfig(locale);
    }
}

// Export singleton instance
export const treatmentsService = new TreatmentsService();

// Export class for testing
export { TreatmentsService };
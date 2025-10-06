// hooks/useNavbar.ts

import { useState, useEffect, useCallback } from 'react';
import { NavConfig } from '@/types/navbar.types';
import { navbarService } from '@/services/navbar.service';
import { DEFAULT_NAVBAR_CONFIG } from '@/config/navbar.config';

interface UseNavbarReturn {
    config: NavConfig;
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export const useNavbar = (locale: string): UseNavbarReturn => {
    const [config, setConfig] = useState<NavConfig>(DEFAULT_NAVBAR_CONFIG);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConfig = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await navbarService.getNavbarConfig(locale);
            setConfig(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load navigation';
            setError(errorMessage);
            console.error('[useNavbar] Error fetching config:', err);
            // Fallback to default config
            setConfig(DEFAULT_NAVBAR_CONFIG);
        } finally {
            setIsLoading(false);
        }
    }, [locale]);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            const data = await navbarService.refreshConfig(locale);
            setConfig(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to refresh navigation';
            setError(errorMessage);
            console.error('[useNavbar] Error refreshing config:', err);
        }
    }, [locale]);

    useEffect(() => {
        fetchConfig();
    }, [fetchConfig]);

    return {
        config,
        isLoading,
        error,
        refresh,
    };
};

// Hook for navbar state management
export const useNavbarState = () => {
    const [aboutOpen, setAboutOpen] = useState(false);
    const [treatmentsOpen, setTreatmentsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);

    const closeAllDropdowns = useCallback(() => {
        setAboutOpen(false);
        setTreatmentsOpen(false);
    }, []);

    const closeAllMobileMenus = useCallback(() => {
        setMobileMenuOpen(false);
        setMobileAboutOpen(false);
        setMobileTreatmentsOpen(false);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(prev => !prev);
    }, []);

    return {
        // Desktop
        aboutOpen,
        setAboutOpen,
        treatmentsOpen,
        setTreatmentsOpen,
        // Mobile
        mobileMenuOpen,
        setMobileMenuOpen,
        mobileAboutOpen,
        setMobileAboutOpen,
        mobileTreatmentsOpen,
        setMobileTreatmentsOpen,
        // Actions
        closeAllDropdowns,
        closeAllMobileMenus,
        toggleMobileMenu,
    };
};
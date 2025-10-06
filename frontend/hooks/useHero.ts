// hooks/useHero.ts

import { useState, useEffect, useCallback, useRef } from 'react';
import { HeroConfig } from '@/types/hero.types';
import { heroService } from '@/services/hero.service';
import { DEFAULT_HERO_CONFIG } from '@/config/hero.config';

interface UseHeroReturn {
    config: HeroConfig;
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export const useHero = (locale: string): UseHeroReturn => {
    const [config, setConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConfig = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await heroService.getHeroConfig(locale);
            setConfig(data);

            // Preload images
            heroService.preloadImages(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load hero section';
            setError(errorMessage);
            console.error('[useHero] Error fetching config:', err);
            setConfig(DEFAULT_HERO_CONFIG);
        } finally {
            setIsLoading(false);
        }
    }, [locale]);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            const data = await heroService.refreshConfig(locale);
            setConfig(data);
            heroService.preloadImages(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to refresh hero section';
            setError(errorMessage);
            console.error('[useHero] Error refreshing config:', err);
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

// Hook for slideshow control
interface UseHeroSlideshowOptions {
    slidesCount: number;
    autoPlay?: boolean;
    interval?: number;
}

interface UseHeroSlideshowReturn {
    currentSlide: number;
    isPaused: boolean;
    isTransitioning: boolean;
    goToSlide: (index: number) => void;
    nextSlide: () => void;
    prevSlide: () => void;
    togglePause: () => void;
}

export const useHeroSlideshow = ({
                                     slidesCount,
                                     autoPlay = true,
                                     interval = 5000,
                                 }: UseHeroSlideshowOptions): UseHeroSlideshowReturn => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentSlide || index < 0 || index >= slidesCount) {
            return;
        }
        setIsTransitioning(true);
        setCurrentSlide(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [currentSlide, isTransitioning, slidesCount]);

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev + 1) % slidesCount);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [slidesCount, isTransitioning]);

    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [slidesCount, isTransitioning]);

    const togglePause = useCallback(() => {
        setIsPaused(prev => !prev);
    }, []);

    // Auto-play effect
    useEffect(() => {
        if (!autoPlay || isPaused || slidesCount <= 1) {
            return;
        }

        timerRef.current = setInterval(() => {
            nextSlide();
        }, interval);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [autoPlay, isPaused, slidesCount, interval, nextSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                togglePause();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [nextSlide, prevSlide, togglePause]);

    return {
        currentSlide,
        isPaused,
        isTransitioning,
        goToSlide,
        nextSlide,
        prevSlide,
        togglePause,
    };
};
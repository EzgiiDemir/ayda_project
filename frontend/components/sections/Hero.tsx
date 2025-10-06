'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { heroService } from '@/services/hero.service';
import { HeroConfig } from '@/types/hero.types';
import { DEFAULT_HERO_CONFIG } from '@/config/hero.config';

export default function Hero() {
    const t = useTranslations('hero');
    const params = useParams();
    const locale = (params?.locale as string) || 'tr';

    const [currentSlide, setCurrentSlide] = useState(0);
    const [config, setConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
    const [isLoading, setIsLoading] = useState(true);

    // Get slides from translations
    const slides = t.raw('slides') as { title: string; subtitle: string }[];

    // Fetch config from API
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                setIsLoading(true);
                const data = await heroService.getHeroConfig(locale);
                setConfig(data);
            } catch (error) {
                console.error('Error fetching hero config:', error);
                setConfig(DEFAULT_HERO_CONFIG);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConfig();
    }, [locale]);

    // Auto-play slides
    useEffect(() => {
        if (!config.autoPlay || slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, config.autoPlayInterval);

        return () => clearInterval(timer);
    }, [slides.length, config.autoPlayInterval, config.autoPlay]);

    // Loading state
    if (isLoading) {
        return (
            <section className="h-[calc(70dvh-80px)] md:h-[calc(100dvh-80px)] relative overflow-hidden bg-gray-200 animate-pulse" />
        );
    }

    return (
        <section className="h-[calc(70dvh-80px)] md:h-[calc(100dvh-80px)] relative overflow-hidden">
            {/* Slides */}
            <div className="w-full h-full z-30 relative">
                <div className="w-full h-full relative">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage: `url("${config.dotsPattern}"), url("${config.slides[index]?.image?.url || 'https://api.aydaivf.com/uploads/banner1_a97e8d6aa7.png'}")`,
                                    backgroundRepeat: 'repeat, no-repeat',
                                    backgroundPosition: 'left top, center center',
                                    backgroundSize: 'auto, cover',
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Center Text */}
            <div className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4">
                <p className="text-sm breakpoint-500:text-base md:text-xl text-primary-pink-light">
                    {slides[currentSlide]?.subtitle}
                </p>
                <p className="text-2xl breakpoint-500:text-3xl md:text-6xl text-primary-pink font-medium mt-2">
                    {slides[currentSlide]?.title}
                </p>
            </div>

            {/* Right Side Vertical Text */}
            <p className="z-30 font-medium uppercase absolute top-1/2 right-0 -translate-y-1/2 text-xs md:text-xl text-white tracking-[5px] rotate-90 translate-x-[calc(50%-16px)] breakpoint-500:translate-x-[calc(50%-24px)] md:translate-x-[calc(50%-28px)] whitespace-nowrap">
                {t('rightText')}
            </p>

            {/* Bottom Text */}
            <div className="flex flex-col sm:flex-row gap-1 items-start sm:gap-0 sm:justify-between absolute bottom-[5px] w-full px-4 z-30">
                <p className="capitalize text-xs md:text-sm text-white font-medium">
                    {t('bottomText')}
                </p>
            </div>

            {/* Indicators */}
            {slides.length > 1 && config.showIndicators !== false && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? 'bg-primary-pink w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
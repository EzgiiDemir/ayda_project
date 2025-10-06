'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import axios from 'axios';

// Types
interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    order: number;
}

interface HeroConfig {
    slides: HeroSlide[];
    rightText: string;
    bottomText: string;
    dotsPattern: string;
    autoPlayInterval: number;
}

// Default Config
const defaultConfig: HeroConfig = {
    slides: [
        {
            id: '1',
            title: 'Default Title',
            subtitle: 'Default Subtitle',
            image: 'https://api.aydaivf.com/uploads/banner1_a97e8d6aa7.png',
            order: 1,
        },
    ],
    rightText: 'AYDA IVF',
    bottomText: 'Your Journey Starts Here',
    dotsPattern: '/images/dots.png',
    autoPlayInterval: 5000,
};

export default function Hero() {
    const t = useTranslations('hero');
    const slides = t.raw('slides') as { title: string; subtitle: string }[];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [config, setConfig] = useState<HeroConfig>(defaultConfig);

    const params = useParams();
    const locale = (params?.locale as string) || 'tr';

    // Fetch config from API
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`, {
                    params: { locale },
                });

                const data = response.data;
                setConfig({
                    slides: data.slides?.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order) || defaultConfig.slides,
                    rightText: data.rightText || defaultConfig.rightText,
                    bottomText: data.bottomText || defaultConfig.bottomText,
                    dotsPattern: data.dotsPattern || defaultConfig.dotsPattern,
                    autoPlayInterval: data.autoPlayInterval || defaultConfig.autoPlayInterval,
                });
            } catch (error) {
                console.error('Using default hero config:', error);
            }
        };
        fetchConfig();
    }, [locale]);

    // Auto-play slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, config.autoPlayInterval);
        return () => clearInterval(timer);
    }, [slides.length, config.autoPlayInterval]);

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
                                    backgroundImage: `url("${config.dotsPattern}"), url("${config.slides[index]?.image || 'https://api.aydaivf.com/uploads/banner1_a97e8d6aa7.png'}")`,
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
                    {slides[currentSlide].subtitle}
                </p>
                <p className="text-2xl breakpoint-500:text-3xl md:text-6xl text-primary-pink font-medium mt-2">
                    {slides[currentSlide].title}
                </p>
            </div>

            {/* Right Side Vertical Text */}
            <p className="z-30 font-medium uppercase absolute top-1/2 right-0 -translate-y-1/2 text-xs md:text-xl text-white tracking-[5px] rotate-90 translate-x-[calc(50%-16px)] whitespace-nowrap">
                {t('rightText')}
            </p>

            {/* Bottom Text */}
            <div className="flex flex-col sm:flex-row gap-1 items-start sm:gap-0 sm:justify-between absolute bottom-[5px] w-full px-4 z-30">
                <p className="capitalize text-xs md:text-sm text-white font-medium">
                    {t('bottomText')}
                </p>
            </div>

            {/* Indicators */}
            {slides.length > 1 && (
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
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import axios from 'axios';

// Types
interface WelcomeConfig {
    image: {
        url: string;
        alt: string;
    };
    gradient: {
        from: string;
        via: string;
        to: string;
    };
    signature: {
        name: string;
        title: string;
    };
}

// Default Config
const defaultConfig: WelcomeConfig = {
    image: {
        url: 'https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png',
        alt: 'Ayda CEO',
    },
    gradient: {
        from: 'rgb(30, 170, 207)',
        via: 'rgb(240, 143, 178)',
        to: 'rgba(250, 250, 250, 0)',
    },
    signature: {
        name: 'Dr. Ayda Surname',
        title: 'CEO & Founder',
    },
};

export default function Welcome() {
    const t = useTranslations('welcome');
    const [config, setConfig] = useState<WelcomeConfig>(defaultConfig);

    const params = useParams();
    const locale = (params?.locale as string) || 'tr';

    // Fetch config from API
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/welcome`, {
                    params: { locale },
                });
                setConfig(response.data);
            } catch (error) {
                console.error('Using default welcome config:', error);
            }
        };
        fetchConfig();
    }, [locale]);

    return (
        <section className="py-7 md:py-14 bg-white">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
                {/* Image Section */}
                <div className="lg:flex-[0.4] flex items-center justify-center">
                    <div
                        className="w-full max-w-[400px] lg:max-w-none aspect-square relative"
                        style={{
                            background: `radial-gradient(circle, ${config.gradient.from}, ${config.gradient.via} 45%, ${config.gradient.to} 65%)`,
                        }}
                    >
                        <Image
                            src={config.image.url}
                            alt={config.image.alt}
                            width={400}
                            height={400}
                            className="w-full h-full object-contain rounded-br-[37%] rounded-bl-[37%]"
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                inset: 0,
                                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                            }}
                            priority
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="lg:flex-[0.6] space-y-4">
                    {/* Title Section */}
                    <div className="text-center mb-6">
                        <p className="text-primary-pink uppercase text-xs md:text-sm font-medium tracking-wide mb-2">
                            {t('titleTop')}
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            {t('title')}
                        </h2>
                    </div>

                    {/* Paragraphs */}
                    <div className="text-sm md:text-base text-gray-700 space-y-3">
                        <p className="text-justify leading-relaxed">{t('p1')}</p>
                        <p className="text-justify leading-relaxed">{t('p2')}</p>
                        <p className="text-justify leading-relaxed">{t('p3')}</p>
                        <p className="text-justify leading-relaxed">{t('p4')}</p>
                        <p className="text-justify leading-relaxed">{t('p5')}</p>
                    </div>

                    {/* Signature */}
                    <div className="text-right mt-8 pt-4 border-t border-gray-200">
                        <p className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                            {t('signatureName')}
                        </p>
                        <p className="text-primary-pink text-sm md:text-base font-medium">
                            {t('signatureTitle')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
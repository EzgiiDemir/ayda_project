'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Check } from 'lucide-react';
import axios from 'axios';

interface Treatment {
    id: string;
    label: string;
    href: string;
    order: number;
}

interface TreatmentsConfig {
    backgroundLogo: string;
    treatments: Treatment[];
}

const defaultConfig: TreatmentsConfig = {
    backgroundLogo: '/images/logoonly.svg',
    treatments: [
        { id: '1', label: 'Tüp Bebek (IVF) - ICSI', href: '#', order: 1 },
        { id: '2', label: 'Yumurta Donasyonu', href: '#', order: 2 },
        { id: '3', label: 'Sperm Donasyonu', href: '#', order: 3 },
        { id: '4', label: 'Embriyo Donasyonu', href: '#', order: 4 },
        { id: '5', label: 'Ovarian ve Endometrial PRP', href: '#', order: 5 },
        { id: '6', label: 'Embriyo Genetik Tarama (NGS, Tek Gen)', href: '#', order: 6 },
        { id: '7', label: 'Cinsiyet Seçimi (PGD)', href: '#', order: 7 },
        { id: '8', label: 'Yumurta Dondurma', href: '#', order: 8 },
        { id: '9', label: 'Taşıyıcı Annelik', href: '#', order: 9 },
        { id: '10', label: 'Embriyo Genetik Tarama (PGD)', href: '#', order: 10 }
    ]
};

export default function Treatments() {
    const t = useTranslations('treatments');
    const [config, setConfig] = useState<TreatmentsConfig>(defaultConfig);

    const params = useParams();
    const locale = (params?.locale as string) || 'tr';

    const endpoint = useMemo(() => {
        const base = process.env.NEXT_PUBLIC_API_URL?.trim();
        return `${base ? base : ''}/api/treatments`;
    }, []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const { data } = await axios.get(endpoint, { params: { locale } });
                const treatments = (data?.treatments ?? []).sort(
                    (a: Treatment, b: Treatment) => (a?.order ?? 0) - (b?.order ?? 0)
                );
                if (mounted) {
                    setConfig({
                        backgroundLogo: data?.backgroundLogo || defaultConfig.backgroundLogo,
                        treatments: treatments.length ? treatments : defaultConfig.treatments
                    });
                }
            } catch (error) {
                console.error('Using default treatments config:', error);
                if (mounted) setConfig(defaultConfig);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [endpoint, locale]);

    return (
        // Beyaz arkaplan tüm alanı kapsasın
        <section className="w-full bg-white py-7 md:py-14">
            {/* Tam genişlik wrapper: arka plan (logo + beyaz overlay) burada */}
            <div
                className="w-full flex justify-center"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.68), rgba(255,255,255,0.68)), url("${config.backgroundLogo}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'auto 80%'
                }}
            >
                {/* İçerik: ortalanmış container */}
                <div className="container max-w-4xl mx-auto flex flex-col items-center text-center">
                    {/* Header */}
                    <p className="text-sm md:text-base text-primary-pink uppercase font-medium">
                        {t('topTitle')}
                    </p>
                    <p className="text-gray-900 capitalize text-2xl md:text-3xl font-medium tracking-wide mb-2">
                        {t('title')}
                    </p>

                    {/* Description */}
                    <div className="text-sm md:text-base text-gray-700">
                        <p className="mb-0">{t('description1')}</p>
                        <p>{t('description2')}</p>
                    </div>

                    {/* Treatments List */}
                    <div className="flex gap-4 justify-center items-center flex-wrap max-w-[700px] mx-auto mt-6">
                        {config.treatments.map((treatment) => (
                            <Link
                                key={treatment.id}
                                href={treatment.href}
                                className="text-xs md:text-sm text-gray-700 font-medium flex gap-1 items-center"
                            >
                                <Check size={16} className="text-primary-pink flex-shrink-0" />
                                <span className="hover:text-primary-pink transition-colors duration-300 cursor-pointer">
                  {treatment.label}
                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Contact Button */}
                    <Link
                        href={`/${locale}/contact`}
                        className="bg-primary-pink px-5 md:px-8 py-2 md:py-4 rounded-full cursor-pointer hover:bg-primary-blue transition-colors duration-300 mt-4 md:mt-6 flex items-center justify-center"
                    >
            <span className="text-sm md:text-base text-white capitalize font-medium">
              {t('contactButton')}
            </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

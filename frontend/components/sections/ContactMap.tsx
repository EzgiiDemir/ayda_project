'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import axios from 'axios';

// Types
interface ContactMapConfig {
    image: string;
    mapUrl?: string;
    showIframe: boolean;
}

// Default Config
const defaultConfig: ContactMapConfig = {
    image: '/images/showcase.png',
    mapUrl: '',
    showIframe: false,
};

export default function ContactMap() {
    const t = useTranslations('contactMap');
    const [config, setConfig] = useState<ContactMapConfig>(defaultConfig);

    const params = useParams();
    const locale = (params?.locale as string) || 'tr';

    // Fetch config from API
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contact-map`, {
                    params: { locale },
                });
                setConfig({
                    image: response.data.image || defaultConfig.image,
                    mapUrl: response.data.mapUrl || defaultConfig.mapUrl,
                    showIframe: response.data.showIframe || defaultConfig.showIframe,
                });
            } catch (error) {
                console.error('Using default contact map config:', error);
            }
        };
        fetchConfig();
    }, [locale]);

    return (
        <section>
            {config.showIframe && config.mapUrl ? (
                // Google Maps Iframe
                <div className="w-full aspect-[16/11] md:aspect-[16/6] relative">
                    <iframe
                        src={config.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                        title={t('mapTitle') || 'Location Map'}
                    />
                </div>
            ) : (
                // Static Image
                <div
                    className="w-full aspect-[16/11] md:aspect-[16/6]"
                    style={{
                        backgroundImage: `url("${config.image}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                    role="img"
                    aria-label={t('imageAlt') || 'Contact showcase image'}
                />
            )}
        </section>
    );
}
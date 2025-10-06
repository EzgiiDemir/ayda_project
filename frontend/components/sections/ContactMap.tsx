'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { contactMapService } from '@/services/contactMap.service';
import { ContactMapConfig } from '@/types/contactMap.types';
import { DEFAULT_CONTACT_MAP_CONFIG } from '@/config/contactMap.config';

export default function ContactMap() {
    const t = useTranslations('contactMap');
    const params = useParams();
    const locale = (params?.locale as string) || 'tr';

    const [config, setConfig] = useState<ContactMapConfig>(DEFAULT_CONTACT_MAP_CONFIG);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch config from API
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                setIsLoading(true);
                const data = await contactMapService.getContactMapConfig(locale);
                setConfig(data);
            } catch (error) {
                console.error('Error fetching contact map config:', error);
                setConfig(DEFAULT_CONTACT_MAP_CONFIG);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConfig();
    }, [locale]);

    // Loading skeleton
    if (isLoading) {
        return (
            <section>
                <div className="w-full aspect-[16/11] md:aspect-[16/6] bg-gray-200 animate-pulse" />
            </section>
        );
    }

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
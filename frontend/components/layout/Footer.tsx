import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { FooterConfig } from '@/types/footer';
import { getFooterConfig } from '@/lib/api/footer';

// Social Icon Component
function SocialIcon({ platform }: { platform: string }) {
    const icons = {
        facebook: Facebook,
        instagram: Instagram,
        youtube: Youtube,
    };

    const Icon = icons[platform as keyof typeof icons];
    return Icon ? <Icon className="text-white" size={20} /> : null;
}

// Footer Card Wrapper
function FooterCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-md p-5 flex flex-col justify-center items-center w-full">
            {children}
        </div>
    );
}

// Icon Badge Component
function IconBadge({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-md bg-primary-pink p-2 hover:bg-primary-blue transition-colors duration-300 flex justify-center items-center my-2 md:my-4">
            <Image
                src={src}
                alt={alt}
                width={28}
                height={28}
                className="object-contain"
                loading="lazy"
            />
        </div>
    );
}

// Card Title Component
function CardTitle({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-gray-900 capitalize text-lg md:text-[22px] font-medium text-center">
            {children}
        </p>
    );
}

// Main Footer Component (Server Component)
export default async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations('Footer');

    // Fetch config server-side with error handling
    let config: FooterConfig;
    try {
        config = await getFooterConfig(locale);
    } catch (error) {
        console.error('Footer config fetch failed:', error);
        return (
            <footer className="mt-auto bg-primary-blue py-4">
                <div className="container text-center text-white">
                    <p className="text-sm">{t('copyright.text')}</p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="mt-auto bg-primary-blue pt-10 flex flex-col gap-10">
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto px-4">

                {/* Address Card */}
                <FooterCard>
                    <IconBadge src={config.address.icon} alt={t('address.iconAlt')} />
                    <div className="flex flex-col gap-2 md:gap-4 flex-1 items-center">
                        <CardTitle>{t('address.title')}</CardTitle>
                        <div className="flex flex-col gap-3 items-center">
                            <div className="w-[65px] h-[65px] relative">
                                <Image
                                    src={config.address.isoLogo}
                                    alt={t('address.isoAlt')}
                                    width={65}
                                    height={65}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-center text-base text-gray-700">
                                {config.address.text || t('address.text')}
                            </p>
                        </div>
                    </div>
                </FooterCard>

                {/* Contact Card */}
                <FooterCard>
                    <IconBadge src={config.contact.icon} alt={t('contact.iconAlt')} />
                    <div className="flex flex-col flex-1 gap-2 md:gap-4 items-center">
                        <CardTitle>{t('contact.title')}</CardTitle>
                        <div className="flex flex-col gap-2 items-center">
                            <p className="text-base text-gray-700 capitalize">
                                <a
                                    href={config.contact.phoneLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-pink-light font-medium hover:text-primary-pink transition-colors"
                                    aria-label={t('contact.phoneLabel')}
                                >
                                    {config.contact.phone}
                                </a>
                            </p>
                            <p className="text-base text-gray-700 capitalize">
                                <a
                                    href={config.contact.emailLink}
                                    className="text-primary-pink-light lowercase font-medium hover:text-primary-pink transition-colors"
                                    aria-label={t('contact.emailLabel')}
                                >
                                    {config.contact.email}
                                </a>
                            </p>
                            <div className="flex items-center gap-2 justify-center" role="list">
                                {config.contact.socialLinks.map((social) => (
                                    <Link
                                        key={social.id}
                                        href={social.url}
                                        className="w-10 h-10 cursor-pointer rounded-md bg-primary-pink p-2 hover:bg-primary-blue transition-colors duration-300 flex justify-center items-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={t(`contact.social.${social.platform}`)}
                                        role="listitem"
                                    >
                                        <SocialIcon platform={social.platform} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </FooterCard>

                {/* Quick Access Card */}
                <FooterCard>
                    <IconBadge src={config.quickAccess.icon} alt={t('quickAccess.iconAlt')} />
                    <div className="flex flex-col flex-1 gap-2 md:gap-4 items-center">
                        <CardTitle>{t('quickAccess.title')}</CardTitle>
                        <nav className="flex flex-col gap-2 items-center" aria-label={t('quickAccess.navLabel')}>
                            {config.quickAccess.links.map((link) => (
                                <Link
                                    key={link.id}
                                    className="text-base text-primary-pink-light font-medium hover:text-primary-pink transition-colors capitalize"
                                    href={`/${locale}${link.href}`}
                                    aria-label={t(`quickAccess.links.${link.label}.label`)}
                                >
                                    {t(`quickAccess.links.${link.label}.text`)}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </FooterCard>
            </div>

            {/* Copyright Bar */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-1 py-4 bg-gray-600/30 text-gray-300">
                <p className="text-sm">{config.copyrightText || t('copyright.text')}</p>
                <span className="text-gray-300 hidden md:inline-block" aria-hidden="true">|</span>
                <div className="w-[180px] h-[18px]">
                    <Image
                        src={config.copyrightLogo}
                        alt={t('copyright.logoAlt')}
                        width={180}
                        height={18}
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                </div>
            </div>
        </footer>
    );
}
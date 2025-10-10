'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from '@/lib/useTranslations';
import { Phone, ChevronDown } from 'lucide-react';
import { navbarService } from '@/services/navbar.service';
import { NavConfig } from '@/types/navbar.types';
import { DEFAULT_NAVBAR_CONFIG } from '@/config/navbar.config';

export default function Navbar() {
    // State Management
    const [aboutOpen, setAboutOpen] = useState(false);
    const [treatmentsOpen, setTreatmentsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
    const [config, setConfig] = useState<NavConfig>(DEFAULT_NAVBAR_CONFIG);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Hooks
    const params = useParams();
    const locale = (params?.locale as string) || 'tr';
    const t = useTranslations(locale);

    // Fetch navbar configuration from CMS
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await navbarService.getNavbarConfig(locale);
                setConfig(data);
            } catch (err) {
                console.error('Error fetching navbar config:', err);
                setError('Failed to load navigation');
                // Fallback to default config on error
                setConfig(DEFAULT_NAVBAR_CONFIG);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, [locale]);

    // Close mobile menu on locale change
    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileAboutOpen(false);
        setMobileTreatmentsOpen(false);
    }, [locale]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setAboutOpen(false);
            setTreatmentsOpen(false);
        };

        if (aboutOpen || treatmentsOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [aboutOpen, treatmentsOpen]);

    // Handler for mobile menu
    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleMobileLinkClick = () => {
        setMobileMenuOpen(false);
        setMobileAboutOpen(false);
        setMobileTreatmentsOpen(false);
    };

    // Format phone number for WhatsApp
    const formatPhoneForWhatsApp = (phone: string) => {
        return phone.replace(/[\s\-\(\)]/g, '');
    };

    const phoneNumber = t('phoneNumber') || config.contact.phoneNumber;
    const whatsappUrl = `https://wa.me/${formatPhoneForWhatsApp(phoneNumber)}`;

    // Loading skeleton
    if (isLoading) {
        return (
            <nav className="sticky top-0 shadow-md bg-white/60 backdrop-blur-[30px] h-20 z-50 border-b-2 border-primary-pink-light">
                <div className="container h-full flex items-center justify-between px-4 mx-auto max-w-7xl">
                    <div className="w-[125px] h-[65px] bg-gray-200 animate-pulse rounded" />
                    <div className="hidden md:flex items-center gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
                        ))}
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav
                className="sticky top-0 shadow-md bg-white/60 backdrop-blur-[30px] h-20 z-50 border-b-2 border-primary-pink-light"
                role="navigation"
                aria-label={t('mainNavigation') || 'Main Navigation'}
            >
                <div className="container h-full flex items-center justify-between px-4 mx-auto max-w-7xl">
                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="relative w-[125px] h-[65px] transition-transform duration-300 hover:scale-105"
                        aria-label={t('homeLink') || 'Go to homepage'}
                    >
                        <Image
                            src={config.logo.url}
                            alt={config.logo.alt || t('logoAlt') || 'Ayda IVF Logo'}
                            width={125}
                            height={65}
                            className="w-full h-full object-contain"
                            priority
                            quality={90}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 ">
                        <ul className="flex items-center gap-6 text-black capitalize ">
                            {/* About Dropdown */}
                            <li
                                className="relative "
                                onMouseEnter={() => setAboutOpen(true)}
                                onMouseLeave={() => setAboutOpen(false)}
                            >
                                <button
                                    className="flex items-center gap-1 hover-primary-pink transition-colors duration-300 "
                                    aria-expanded={aboutOpen}
                                    aria-haspopup="true"
                                >
                                    <span>{t(config.about.label)}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>
                                <ul
                                    className={`absolute top-full left-0 bg-gray-light shadow-lg flex flex-col min-w-[220px] transition-all duration-300 rounded-b-md overflow-hidden ${
                                        aboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                    }`}
                                    role="menu"
                                >
                                    {config.about.links.map((link) => (
                                        <li key={link.id} role="none">
                                            <Link
                                                className="block px-4 py-3 hover-bg-primary-pink hover:text-white transition-colors duration-300"
                                                href={`/${locale}${link.href}`}
                                                role="menuitem"
                                            >
                                                {t(link.label)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Treatments Dropdown */}
                            <li
                                className="relative"
                                onMouseEnter={() => setTreatmentsOpen(true)}
                                onMouseLeave={() => setTreatmentsOpen(false)}
                            >
                                <button
                                    className="flex items-center gap-1 hover-primary-pink transition-colors duration-300"
                                    aria-expanded={treatmentsOpen}
                                    aria-haspopup="true"
                                >
                                    <span>{t(config.treatments.label)}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-300 ${treatmentsOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>
                                <ul
                                    className={`absolute top-full left-0 bg-gray-light shadow-lg flex flex-col min-w-[220px] transition-all duration-300 rounded-b-md overflow-hidden ${
                                        treatmentsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                    }`}
                                    role="menu"
                                >
                                    {config.treatments.links.map((link) => (
                                        <li key={link.id} role="none">
                                            <Link
                                                className="block px-4 py-3 hover-bg-primary-pink hover:text-white transition-colors duration-300"
                                                href={`/${locale}${link.href}`}
                                                role="menuitem"
                                            >
                                                {t(link.label)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Regular Links */}
                            {config.links.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        className="hover-primary-pink transition-colors duration-300"
                                        href={`/${locale}${link.href}`}
                                    >
                                        {t(link.label)}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Phone Button */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-md bg-primary-pink hover-bg-primary-blue transition-colors duration-300 flex justify-center items-center"
                            aria-label={t('contactViaWhatsApp') || `Contact via WhatsApp: ${phoneNumber}`}
                        >
                            <Phone className="text-white" size={18} aria-hidden="true" />
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="flex md:hidden flex-col gap-[6px] p-2 z-50"
                        onClick={handleMobileMenuToggle}
                        aria-label={mobileMenuOpen ? t('closeMenu') || 'Close menu' : t('openMenu') || 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className={`h-[2px] w-6 bg-primary-pink rounded-md transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                        <span className={`h-[2px] w-6 bg-primary-pink rounded-md transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                        <span className={`h-[2px] w-6 bg-primary-pink rounded-md transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-gray-light shadow-lg overflow-y-auto transition-transform duration-300 z-40 ${
                        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('mobileMenu') || 'Mobile menu'}
                >
                    <div className="container mx-auto px-4 py-6 flex flex-col gap-4 h-full">
                        <nav className="flex flex-col gap-3 text-black capitalize flex-1">
                            {/* Mobile About */}
                            <div>
                                <button
                                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                    className="flex items-center gap-1 py-2 hover-primary-pink transition-colors duration-300 w-full"
                                    aria-expanded={mobileAboutOpen}
                                >
                                    <span>{t(config.about.label)}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>
                                <div
                                    className={`bg-gray-50 overflow-hidden flex flex-col transition-all duration-300 rounded-md ${
                                        mobileAboutOpen ? 'opacity-100 max-h-[500px] mt-2' : 'opacity-0 max-h-0'
                                    }`}
                                >
                                    {config.about.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            className="px-4 py-3 hover:bg-primary-pink-light transition-colors duration-300"
                                            href={`/${locale}${link.href}`}
                                            onClick={handleMobileLinkClick}
                                        >
                                            {t(link.label)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Treatments */}
                            <div>
                                <button
                                    onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                                    className="flex items-center gap-1 py-2 hover-primary-pink transition-colors duration-300 w-full"
                                    aria-expanded={mobileTreatmentsOpen}
                                >
                                    <span>{t(config.treatments.label)}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-300 ${mobileTreatmentsOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>
                                <div
                                    className={`bg-gray-50 overflow-hidden flex flex-col transition-all duration-300 rounded-md ${
                                        mobileTreatmentsOpen ? 'opacity-100 max-h-[500px] mt-2' : 'opacity-0 max-h-0'
                                    }`}
                                >
                                    {config.treatments.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            className="px-4 py-3 hover:bg-primary-pink-light transition-colors duration-300"
                                            href={`/${locale}${link.href}`}
                                            onClick={handleMobileLinkClick}
                                        >
                                            {t(link.label)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Regular Links */}
                            {config.links.map((link) => (
                                <Link
                                    key={link.id}
                                    className="py-2 hover-primary-pink transition-colors duration-300"
                                    href={`/${locale}${link.href}`}
                                    onClick={handleMobileLinkClick}
                                >
                                    {t(link.label)}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Phone Button */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[90%] mx-auto rounded-md bg-primary-pink hover-bg-primary-blue transition-colors duration-300 flex justify-center items-center gap-3 p-3"
                            aria-label={t('contactViaWhatsApp') || `Contact via WhatsApp`}
                        >
                            <Phone className="text-white" size={20} aria-hidden="true" />
                            <span className="text-white font-medium">{phoneNumber}</span>
                        </a>
                    </div>
                </div>

                {/* Overlay */}
                {mobileMenuOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-30 top-20"
                        onClick={handleMobileMenuToggle}
                        aria-hidden="true"
                    />
                )}
            </nav>

            {/* Error Toast (Optional) */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
                    {error}
                </div>
            )}
        </>
    );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from '@/lib/useTranslations';
import { Phone, ChevronDown } from 'lucide-react';
import axios from 'axios';

// Types
interface NavLink {
    id: string;
    label: string;
    href: string;
}

interface NavDropdown {
    id: string;
    label: string;
    links: NavLink[];
}

interface NavConfig {
    logo: {
        url: string;
        alt: string;
    };
    about: NavDropdown;
    treatments: NavDropdown;
    links: NavLink[];
    contact: {
        phoneNumber: string;
    };
}

// Default Config
const defaultConfig: NavConfig = {
    logo: {
        url: 'https://api.aydaivf.com/uploads/ayda_logo_9e8994bffd.png',
        alt: 'Ayda IVF Logo',
    },
    about: {
        id: 'about',
        label: 'about',
        links: [
            { id: 'why-us', label: 'whyUs', href: '/why-us' },
            { id: 'prices', label: 'prices', href: '/our-prices' },
            { id: 'team', label: 'team', href: '/our-team' },
            { id: 'success', label: 'successRates', href: '/our-success-rates' },
        ],
    },
    treatments: {
        id: 'treatments',
        label: 'treatments',
        links: [
            { id: 'ivf', label: 'ivfIcsi', href: '/ivf-icsi' },
            { id: 'egg-donation', label: 'eggDonation', href: '/egg-donation' },
            { id: 'sperm-donation', label: 'spermDonation', href: '/sperm-donation' },
            { id: 'embryo', label: 'embryoDonation', href: '/embryo-donation' },
            { id: 'freezing', label: 'eggFreezing', href: '/egg-freezing' },
            { id: 'prp', label: 'ovarianEndometrialPrp', href: '/ovarian-endometrial-prp' },
            { id: 'acupuncture', label: 'acupuncture', href: '/acupuncture' },
        ],
    },
    links: [
        { id: 'faq', label: 'faq', href: '/faq' },
        { id: 'travel', label: 'travel', href: '/travel' },
        { id: 'contact', label: 'contact', href: '/contact' },
    ],
    contact: {
        phoneNumber: '+90 533 123 4567',
    },
};

export default function Navbar() {
    const [aboutOpen, setAboutOpen] = useState(false);
    const [treatmentsOpen, setTreatmentsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
    const [config, setConfig] = useState<NavConfig>(defaultConfig);

    const params = useParams();
    const locale = (params?.locale as string) || 'tr';
    const t = useTranslations(locale);

    // Fetch config from API
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/navbar`, {
                    params: { locale },
                });
                setConfig(response.data);
            } catch (error) {
                console.error('Using default config:', error);
            }
        };
        fetchConfig();
    }, [locale]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [locale]);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <nav className="sticky top-0 shadow-md bg-white/60 backdrop-blur-[30px] h-20 z-50 border-b-2 border-primary-pink-light">
                <div className="container h-full flex items-center justify-between px-4 mx-auto max-w-7xl">
                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="relative w-[125px] h-[65px] transition-transform duration-300 hover:scale-105"
                    >
                        <Image
                            src={config.logo.url}
                            alt={t('logoAlt') || config.logo.alt}
                            width={125}
                            height={65}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex items-center gap-6 text-black capitalize">
                            {/* About Dropdown */}
                            <div
                                className="relative cursor-pointer"
                                onMouseEnter={() => setAboutOpen(true)}
                                onMouseLeave={() => setAboutOpen(false)}
                            >
                                <button className="flex items-center gap-1 hover-primary-pink transition-colors duration-300">
                                    <span>{t(config.about.label)}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div
                                    className={`absolute top-full bg-gray-200 flex flex-col min-w-[200px] transition-all duration-300 ${
                                        aboutOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}
                                >
                                    {config.about.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            className="px-4 py-3 hover-bg-primary-pink hover:text-white transition-colors duration-300"
                                            href={`/${locale}${link.href}`}
                                        >
                                            {t(link.label)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Treatments Dropdown */}
                            <div
                                className="relative cursor-pointer"
                                onMouseEnter={() => setTreatmentsOpen(true)}
                                onMouseLeave={() => setTreatmentsOpen(false)}
                            >
                                <button className="flex items-center gap-1 hover-primary-pink transition-colors duration-300">
                                    <span>{t(config.treatments.label)}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-300 ${treatmentsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div
                                    className={`absolute top-full bg-gray-200 flex flex-col min-w-[200px] transition-all duration-300 ${
                                        treatmentsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}
                                >
                                    {config.treatments.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            className="px-4 py-3 hover-bg-primary-pink hover:text-white transition-colors duration-300"
                                            href={`/${locale}${link.href}`}
                                        >
                                            {t(link.label)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Regular Links */}
                            {config.links.map((link) => (
                                <Link
                                    key={link.id}
                                    className="hover-primary-pink transition-colors duration-300"
                                    href={`/${locale}${link.href}`}
                                >
                                    {t(link.label)}
                                </Link>
                            ))}
                        </ul>

                        {/* Phone Button */}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-md bg-primary-pink hover-bg-primary-blue transition-colors duration-300 flex justify-center items-center"
                            href={`https://wa.me/${(t('phoneNumber') || config.contact.phoneNumber).replace(/\s/g, '')}`}
                        >
                            <Phone className="text-white" size={18} />
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="flex md:hidden flex-col gap-[6px] p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <span className={`h-[2px] w-6 bg-primary-pink rounded-md transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
                        <span className={`h-[2px] w-6 bg-primary-pink rounded-md transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                        <span className={`h-[2px] w-6 bg-primary-pink rounded-md transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white shadow-lg overflow-y-auto transition-transform duration-300 z-40 ${
                        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="container mx-auto px-4 py-6 flex flex-col gap-4 h-full">
                        <ul className="flex flex-col gap-3 text-black capitalize flex-1">
                            {/* Mobile About */}
                            <div>
                                <button
                                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                    className="flex items-center gap-1 py-2 hover-primary-pink transition-colors duration-300"
                                >
                                    <span>{t(config.about.label)}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`bg-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${mobileAboutOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                                    {config.about.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            className="px-4 py-3"
                                            href={`/${locale}${link.href}`}
                                            onClick={() => setMobileMenuOpen(false)}
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
                                    className="flex items-center gap-1 py-2 hover-primary-pink transition-colors duration-300"
                                >
                                    <span>{t(config.treatments.label)}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileTreatmentsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`bg-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${mobileTreatmentsOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                                    {config.treatments.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            className="px-4 py-3"
                                            href={`/${locale}${link.href}`}
                                            onClick={() => setMobileMenuOpen(false)}
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
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t(link.label)}
                                </Link>
                            ))}
                        </ul>

                        {/* Mobile Phone Button */}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[90%] mx-auto rounded-md bg-primary-pink hover-bg-primary-blue transition-colors duration-300 flex justify-center items-center gap-3 p-3"
                            href={`https://wa.me/${(t('phoneNumber') || config.contact.phoneNumber).replace(/\s/g, '')}`}
                        >
                            <Phone className="text-white" size={20} />
                            <span className="text-white font-medium">{t('phoneNumber') || config.contact.phoneNumber}</span>
                        </a>
                    </div>
                </div>

                {/* Overlay */}
                {mobileMenuOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-30 top-20"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </nav>
        </>
    );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, ChevronDown } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations('Navigation');

    useEffect(() => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    const toggleMobileDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <>
            <nav className="sticky top-0 shadow-md bg-white/60 backdrop-blur-[30px] h-[80px] z-50 border-b-2 border-pink-200">
                <div className="container h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="relative w-[125px] h-[65px] transition-all ease-in duration-300 hover:scale-105"
                    >
                        <Image
                            alt="AYDA Logo"
                            className="w-full h-full object-contain"
                            loading="eager"
                            src="https://api.aydaivf.com/uploads/ayda_logo_9e8994bffd.png"
                            width={125}
                            height={65}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex items-center gap-6 text-gray-900 capitalize">
                            {/* Hakkımızda Dropdown */}
                            <li
                                className="cursor-pointer relative group z-30"
                                onMouseEnter={() => setOpenDropdown('hakkimizda')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button className="hover:text-pink-600 transition-colors duration-300 ease-in w-fit font-medium">
                                    {t('about')}
                                </button>
                                <div
                                    className={`absolute top-[100%] left-0 bg-gray-200 flex flex-col w-fit min-w-[200px] transition-opacity duration-300 ease-in ${
                                        openDropdown === 'hakkimizda' ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}
                                >
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/hakkimizda/neden-biz`}>
                                        {t('whyUs')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/hakkimizda/fiyatlarimiz`}>
                                        {t('ourPrices')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/hakkimizda/takimimiz`}>
                                        {t('ourTeam')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/hakkimizda/basari-oranlari`}>
                                        {t('successRates')}
                                    </Link>
                                </div>
                            </li>

                            {/* Tedaviler Dropdown */}
                            <li
                                className="cursor-pointer relative group z-30"
                                onMouseEnter={() => setOpenDropdown('tedaviler')}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button className="hover:text-pink-600 transition-colors duration-300 ease-in w-fit font-medium">
                                    {t('treatments')}
                                </button>
                                <div
                                    className={`absolute top-[100%] left-0 bg-gray-200 flex flex-col w-fit min-w-[200px] transition-opacity duration-300 ease-in ${
                                        openDropdown === 'tedaviler' ? 'opacity-100 visible' : 'opacity-0 invisible'
                                    }`}
                                >
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/tedaviler/tup-bebek-ivf-icsi`}>
                                        {t('ivfIcsi')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/tedaviler/yumurta-donasyonu`}>
                                        {t('eggDonation')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/tedaviler/sperm-donasyonu`}>
                                        {t('spermDonation')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/tedaviler/embriyo-donasyonu`}>
                                        {t('embryoDonation')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/tedaviler/yumurta-dondurma`}>
                                        {t('eggFreezing')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/tedaviler/ovarian-endometrial-prp`}>
                                        {t('ovarianPrp')}
                                    </Link>
                                    <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white transition-colors w-full whitespace-nowrap" href={`/${locale}/tedaviler/akupunktur`}>
                                        {t('acupuncture')}
                                    </Link>
                                </div>
                            </li>

                            <li><Link className="hover:text-pink-600 transition-colors font-medium" href={`/${locale}/sss`}>{t('faq')}</Link></li>
                            <li><Link className="hover:text-pink-600 transition-colors font-medium" href={`/${locale}/seyahat`}>{t('travel')}</Link></li>
                            <li><Link className="hover:text-pink-600 transition-colors font-medium" href={`/${locale}/iletisim`}>{t('contact')}</Link></li>
                        </ul>

                        <LanguageSwitcher />

                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 cursor-pointer rounded-md bg-pink-600 p-2 hover:bg-cyan-500 transition-colors flex justify-center items-center"
                            href="https://wa.me/+905488252821"
                        >
                            <Phone className="text-white w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageSwitcher />
                        <button
                            className="flex flex-col gap-[6px] w-fit cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className={`h-[1.5px] w-6 bg-pink-600 rounded-md transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
                            <span className={`h-[1.5px] w-6 bg-pink-600 rounded-md transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`h-[1.5px] w-6 bg-pink-600 rounded-md transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`z-50 bg-white fixed top-[80px] left-0 w-full h-[calc(100dvh-80px)] overflow-y-auto transition-transform duration-300 flex flex-col py-4 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <ul className="container flex flex-col gap-3 text-gray-900 capitalize">
                    <li>
                        <button
                            className="hover:text-pink-600 transition-colors w-full text-left font-medium flex items-center justify-between"
                            onClick={() => toggleMobileDropdown('mobile-hakkimizda')}
                        >
                            {t('about')}
                            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'mobile-hakkimizda' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`bg-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${openDropdown === 'mobile-hakkimizda' ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'}`}>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/hakkimizda/neden-biz`}>{t('whyUs')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/hakkimizda/fiyatlarimiz`}>{t('ourPrices')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/hakkimizda/takimimiz`}>{t('ourTeam')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/hakkimizda/basari-oranlari`}>{t('successRates')}</Link>
                        </div>
                    </li>

                    <li>
                        <button
                            className="hover:text-pink-600 transition-colors w-full text-left font-medium flex items-center justify-between"
                            onClick={() => toggleMobileDropdown('mobile-tedaviler')}
                        >
                            {t('treatments')}
                            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'mobile-tedaviler' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`bg-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${openDropdown === 'mobile-tedaviler' ? 'opacity-100 max-h-[600px]' : 'opacity-0 max-h-0'}`}>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/tedaviler/tup-bebek-ivf-icsi`}>{t('ivfIcsi')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/tedaviler/yumurta-donasyonu`}>{t('eggDonation')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/tedaviler/sperm-donasyonu`}>{t('spermDonation')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/tedaviler/embriyo-donasyonu`}>{t('embryoDonation')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/tedaviler/yumurta-dondurma`}>{t('eggFreezing')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/tedaviler/ovarian-endometrial-prp`}>{t('ovarianPrp')}</Link>
                            <Link className="px-4 py-3 hover:bg-pink-600 hover:text-white" href={`/${locale}/tedaviler/akupunktur`}>{t('acupuncture')}</Link>
                        </div>
                    </li>

                    <li><Link className="hover:text-pink-600 transition-colors font-medium" href={`/${locale}/sss`}>{t('faq')}</Link></li>
                    <li><Link className="hover:text-pink-600 transition-colors font-medium" href={`/${locale}/seyahat`}>{t('travel')}</Link></li>
                    <li><Link className="hover:text-pink-600 transition-colors font-medium" href={`/${locale}/iletisim`}>{t('contact')}</Link></li>
                </ul>

                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[90%] mt-auto mx-auto cursor-pointer rounded-md bg-pink-600 p-3 hover:bg-cyan-500 transition-colors flex justify-center items-center gap-2"
                    href="https://wa.me/+905488252821"
                >
                    <Phone className="text-white w-5 h-5" />
                    <p className="text-white text-sm font-medium">+905488252821</p>
                </a>
            </div>
        </>
    );
}
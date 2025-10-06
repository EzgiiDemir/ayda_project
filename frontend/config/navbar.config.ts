// config/navbar.config.ts

import { NavConfig } from '@/types/navbar.types';

export const DEFAULT_NAVBAR_CONFIG: NavConfig = {
    logo: {
        url: 'https://api.aydaivf.com/uploads/ayda_logo_9e8994bffd.png',
        alt: 'Ayda IVF Logo',
        width: 125,
        height: 65,
        link: '/',
    },
    about: {
        id: 'about',
        label: 'about',
        order: 1,
        links: [
            {
                id: 'why-us',
                label: 'whyUs',
                href: '/why-us',
                order: 1,
                isActive: true
            },
            {
                id: 'prices',
                label: 'prices',
                href: '/our-prices',
                order: 2,
                isActive: true
            },
            {
                id: 'team',
                label: 'team',
                href: '/our-team',
                order: 3,
                isActive: true
            },
            {
                id: 'success',
                label: 'successRates',
                href: '/our-success-rates',
                order: 4,
                isActive: true
            },
        ],
    },
    treatments: {
        id: 'treatments',
        label: 'treatments',
        order: 2,
        links: [
            {
                id: 'ivf',
                label: 'ivfIcsi',
                href: '/ivf-icsi',
                order: 1,
                isActive: true
            },
            {
                id: 'egg-donation',
                label: 'eggDonation',
                href: '/egg-donation',
                order: 2,
                isActive: true
            },
            {
                id: 'sperm-donation',
                label: 'spermDonation',
                href: '/sperm-donation',
                order: 3,
                isActive: true
            },
            {
                id: 'embryo',
                label: 'embryoDonation',
                href: '/embryo-donation',
                order: 4,
                isActive: true
            },
            {
                id: 'freezing',
                label: 'eggFreezing',
                href: '/egg-freezing',
                order: 5,
                isActive: true
            },
            {
                id: 'prp',
                label: 'ovarianEndometrialPrp',
                href: '/ovarian-endometrial-prp',
                order: 6,
                isActive: true
            },
            {
                id: 'acupuncture',
                label: 'acupuncture',
                href: '/acupuncture',
                order: 7,
                isActive: true
            },
        ],
    },
    links: [
        {
            id: 'faq',
            label: 'faq',
            href: '/faq',
            order: 3,
            isActive: true
        },
        {
            id: 'travel',
            label: 'travel',
            href: '/travel',
            order: 4,
            isActive: true
        },
        {
            id: 'contact',
            label: 'contact',
            href: '/contact',
            order: 5,
            isActive: true
        },
    ],
    contact: {
        phoneNumber: '+90 533 123 4567',
        whatsappNumber: '+90 533 123 4567',
    },
    meta: {
        version: '1.0.0',
    }
};

// API Configuration
export const NAVBAR_API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.aydaivf.com',
    endpoint: '/api/navbar',
    timeout: 5000,
    retries: 2,
};

// Cache Configuration
export const NAVBAR_CACHE_CONFIG = {
    key: 'navbar_config',
    ttl: 3600000, // 1 hour in milliseconds
    enabled: true,
};
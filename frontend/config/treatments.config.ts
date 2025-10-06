// config/treatments.config.ts

import { TreatmentsConfig } from '@/types/treatments.types';

export const DEFAULT_TREATMENTS_CONFIG: TreatmentsConfig = {
    backgroundLogo: '/images/logoonly.svg',
    treatments: [
        {
            id: 'ivf-icsi',
            label: 'Tüp Bebek (IVF) - ICSI',
            href: '/ivf-icsi',
            order: 1,
            isActive: true
        },
        {
            id: 'egg-donation',
            label: 'Yumurta Donasyonu',
            href: '/egg-donation',
            order: 2,
            isActive: true
        },
        {
            id: 'sperm-donation',
            label: 'Sperm Donasyonu',
            href: '/sperm-donation',
            order: 3,
            isActive: true
        },
        {
            id: 'embryo-donation',
            label: 'Embriyo Donasyonu',
            href: '/embryo-donation',
            order: 4,
            isActive: true
        },
        {
            id: 'ovarian-prp',
            label: 'Ovarian ve Endometrial PRP',
            href: '/ovarian-endometrial-prp',
            order: 5,
            isActive: true
        },
        {
            id: 'genetic-screening',
            label: 'Embriyo Genetik Tarama (NGS, Tek Gen)',
            href: '/genetic-screening',
            order: 6,
            isActive: true
        },
        {
            id: 'gender-selection',
            label: 'Cinsiyet Seçimi (PGD)',
            href: '/gender-selection',
            order: 7,
            isActive: true
        },
        {
            id: 'egg-freezing',
            label: 'Yumurta Dondurma',
            href: '/egg-freezing',
            order: 8,
            isActive: true
        },
        {
            id: 'surrogacy',
            label: 'Taşıyıcı Annelik',
            href: '/surrogacy',
            order: 9,
            isActive: true
        },
        {
            id: 'pgd',
            label: 'Embriyo Genetik Tarama (PGD)',
            href: '/pgd',
            order: 10,
            isActive: true
        }
    ],
    meta: {
        version: '1.0.0',
    },
};

// API Configuration
export const TREATMENTS_API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.aydaivf.com',
    endpoint: '/api/treatments',
    timeout: 5000,
};

// Cache Configuration
export const TREATMENTS_CACHE_CONFIG = {
    key: 'treatments_config',
    ttl: 3600000, // 1 hour
    enabled: true,
};
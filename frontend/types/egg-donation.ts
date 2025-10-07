// ==========================================
// types/egg-donation.ts
// ==========================================

export type EggBlock =
    | { type: 'p'; value: string }            // paragraf
    | { type: 'ul'; items: string[] }         // madde listesi
    | { type: 'h3'; value: string }           // küçük başlık
    ;

export interface EggDonationSection {
    id: string;
    title: string;
    order: number;
    isActive?: boolean;
    blocks: EggBlock[];
}

export interface EggDonationConfig {
    heroImage: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    sections: EggDonationSection[];
}

export const DEFAULT_EGG_DONATION_CONFIG: EggDonationConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    pageTitle: 'Yumurta (Oosit) Donasyonu',
    metaTitle: 'Yumurta Donasyonu | AYDA IVF',
    metaDescription: 'Yumurta donasyonu nedir, kimlere uygundur ve neden tercih edilir?',
    sections: [],
};

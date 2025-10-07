// types/hero.types.ts
export interface HeroImage {
    url: string;
    alt?: string;
}

export interface HeroSlide {
    id: string;
    order: number;
    isActive?: boolean;

    // içerikte kullandıkların
    title?: string;             // alt fallback’inde kullanılıyor
    description?: string;
    image: HeroImage;
    overlayOpacity?: number;    // slide seviyesinde override
}

export interface HeroMeta {
    locale?: string;
    [key: string]: unknown;
}

export interface HeroConfig {
    slides: HeroSlide[];

    // UI copy
    rightText?: string;
    bottomText?: string;

    // görsel ayarlar
    dotsPattern?: boolean;

    // davranışlar
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
    showCounter?: boolean;

    // boyutlar
    mobileHeight?: number | string;
    desktopHeight?: number | string;

    // ekstra meta
    meta?: HeroMeta;
}

/** API dönüş tipi (kullandığın şekle birebir) */
export interface HeroApiResponse {
    data: HeroConfig; // response.data.data şeklinde okuyorsun
}

export interface HeroError {
    message?: string;
}

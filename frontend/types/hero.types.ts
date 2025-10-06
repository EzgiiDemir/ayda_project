
export interface HeroImage {
    url: string;
    alt?: string;
}

export interface HeroSlide {
    id: string;
    image: HeroImage;
    order: number;
    isActive?: boolean;
}

export interface HeroConfig {
    slides: HeroSlide[];
    dotsPattern?: string;
    autoPlay?: boolean;
    autoPlayInterval: number;
    showIndicators?: boolean;
    meta?: {
        version?: string;
        lastUpdated?: string;
    };
}

// API Response types
export interface HeroApiResponse {
    data: HeroConfig;
    meta?: {
        locale: string;
        timestamp: string;
    };
}

export interface HeroError {
    message: string;
    code?: string;
    details?: unknown;
}
// types/welcome.types.ts

export interface WelcomeImage {
    url: string;
    alt?: string;
}

export interface WelcomeGradient {
    from: string;
    via: string;
    to: string;
}

export interface WelcomeSignature {
    name: string;
    title: string;
}

export interface WelcomeConfig {
    image: WelcomeImage;
    gradient: WelcomeGradient;
    signature: WelcomeSignature;
    meta?: {
        version?: string;
        lastUpdated?: string;
    };
}

// API Response types
export interface WelcomeApiResponse {
    data: WelcomeConfig;
    meta?: {
        locale: string;
        timestamp: string;
    };
}

export interface WelcomeError {
    message: string;
    code?: string;
    details?: unknown;
}
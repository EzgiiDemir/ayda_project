// types/treatments.types.ts

export interface Treatment {
    id: string;
    label: string;
    href: string;
    order: number;
    isActive?: boolean;
    icon?: string;
}

export interface TreatmentsConfig {
    backgroundLogo: string;
    treatments: Treatment[];
    meta?: {
        version?: string;
        lastUpdated?: string;
    };
}

// API Response types
export interface TreatmentsApiResponse {
    data: TreatmentsConfig;
    meta?: {
        locale: string;
        timestamp: string;
    };
}

export interface TreatmentsError {
    message: string;
    code?: string;
    details?: unknown;
}
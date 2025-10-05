export interface TravelImage {
    id: number;
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface TravelSection {
    id: number;
    title: string;
    content: string;
    order: number;
    icon?: string;
    images?: TravelImage[];
}

export interface TravelPage {
    id: number;
    heroImage?: TravelImage;
    sections: TravelSection[];
    locale: string;
    publishedAt: string;
    updatedAt: string;
}

export interface TravelApiResponse {
    data: TravelPage;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
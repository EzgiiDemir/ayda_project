export interface TravelConfig {
    heroImage: string;
    title: string;
    sections: TravelSectionData[];
}

export interface TravelSectionData {
    id: string;
    title: string;
    icon?: 'plane' | 'ship' | 'mapPin' | 'hotel' | 'info';
    content: TravelContentItem[];
    order: number;
    isActive?: boolean;
}

export interface TravelContentItem {
    id: string;
    type: 'paragraph' | 'subtitle' | 'highlight';
    text: string;
    order: number;
}

export const DEFAULT_TRAVEL_CONFIG: TravelConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    title: 'Seyahat Bilgileri',
    sections: [],
};

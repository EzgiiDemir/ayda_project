
export interface ContactConfig {
    heroImage: string;
    heroPreTitle: string;
    heroTitle: string;
    form: ContactFormConfig;
}

export interface ContactFormConfig {
    subjects: string[];
    apiEndpoint?: string;
}

export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    heroPreTitle: 'Aşağıdaki formu doldurarak',
    heroTitle: 'bizimle iletişime geçebilirsiniz',
    form: {
        subjects: ['Genel', 'Bilgi', 'Başvuru', 'TüpBebek'],
        apiEndpoint: '/api/contact',
    },
};
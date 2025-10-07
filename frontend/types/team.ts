
export interface TeamMember {
    id: string;
    nameTitle: string;
    image: string;
    imageAlt: string;
    paragraphs: string[];
    order: number;
    isActive?: boolean;
}

export interface TeamConfig {
    heroImage: string;
    heroPreTitle: string;
    members: TeamMember[];
}

export const DEFAULT_TEAM_CONFIG: TeamConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    heroPreTitle: 'Ekibimizle tanışın',
    members: [
        {
            id: 'tanyel-felek',
            nameTitle: 'Ayda Tüp Bebek Takımı Direktörü & Embriyoloji Lab. Sorumlusu KLİNİK EMBRİYOLOG TANYEL FELEK',
            image: 'https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png',
            imageAlt: 'Tanyel Felek',
            paragraphs: [
                'Tanyel Felek 1991 tarihinde Kıbrıs\'ta doğdu. Üniversite eğitimini Ankara\'nın Gazi Üniversitesi ve Almanya\'nın Johannes Gutenberg Üniversitesinde tamamladı.',
                'Mayıs 2013 yılında Almanya\'nın en büyük ve en gelişmiş tüp bebek merkezlerinden biri olan Kinderwunsch Zentrum Wiesbaden\'de Embriyoloji ve Androloji Laboratuvarında Embriyolog olarak çalışmaya başladı.',
                'Embriyoloğumuz Almanya\'da çalıştığı dönemde Klinik Embriyoloji Master programına başvurdu. 2016 yılında Avusturalya\'nın Karl Franzes Üniversitesinde Klinik Embriyoloji Master programına katıldı.',
                'Almanya\'da çalışmaya devam ederken, Kuzey Kıbrıs\'ta Dr. Münür Şago\'dan Embriyoloji ve Androloji laboratuvarı sorumluluğu teklifi aldı. Ülkesine dönerek Ayda Tüp Bebek ekibine katıldı.',
            ],
            order: 1,
            isActive: true,
        },
    ],
};
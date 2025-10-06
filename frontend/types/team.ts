// ==========================================
// types/team.ts
// ==========================================
export interface TeamMember {
    nameTitle: string;
    image: { src: string; alt: string };
    paragraphs: string[];
}

export interface TeamConfig {
    heroImage: string;
    heroPreTitle: string;
    heroTitle: string;
    members: TeamMember[];
}

export const DEFAULT_TEAM_CONFIG: TeamConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    heroPreTitle: 'Ekibimizle tanışın',
    heroTitle: 'Ayda Tüp Bebek Takımı',
    members: [
        {
            nameTitle:
                'Ayda Tüp Bebek Takımı Direktörü & Embriyoloji Lab. Sorumlusu KLİNİK EMBRİYOLOG TANYEL FELEK',
            image: {
                src: 'https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png',
                alt: 'ayda-ceo',
            },
            paragraphs: [
                'Tanyel Felek 1991 tarihinde Kıbrıs’ta doğdu. Üniversite eğitimini Ankara’nın Gazi Üniversitesi ve Almanya’nın Johannes Gutenberg Üniversitesinde tamamladı.',
                'Mayıs 2013 yılında Almanya’nın en büyük ve en gelişmiş tüp bebek merkezlerinden biri olan Kinderwunsch Zentrum Wiesbaden’de Embriyoloji ve Androloji Laboratuvarında Embriyolog olarak çalışmaya başladı.',
                'Embriyoloğumuz Almanya’da çalıştığı dönemde Klinik Embriyoloji Master programına başvurdu. 2016 yılında Avusturalya’nın Karl Franzes Üniversitesinde Klinik Embriyoloji Master programına katıldı.',
                'Almanya’da çalışmaya devam ederken, Kuzey Kıbrıs’ta Dr. Münür Şago’dan Embriyoloji ve Androloji laboratuvarı sorumluluğu teklifi aldı. Ülkesine dönerek Ayda Tüp Bebek ekibine katıldı.',
            ],
        },
        {
            nameTitle: 'Ayda Tüp Bebek Takımı Jinekoloji Uzmanı Op. Dr. MÜNÜR ŞAGO',
            image: {
                src: 'https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png',
                alt: 'op-dr-munur-sago',
            },
            paragraphs: [
                '1970 yılında Kıbrıs’ın Limasol şehrinde doğdu. İlk, orta ve lise öğrenimini Kıbrıs’ta tamamladıktan sonra 1988 yılında Cerrahpaşa Tıp Fakültesini kazandı.',
                '1994’te mezun olduktan sonra, Kadın Doğum ve Jinekoloji Uzmanlığını İstanbul Şişli Etfal Hastanesinde tamamladı.',
                '2004 yılında adaya geri döndü ve kısa sürede Kıbrıs halkının en çok tercih ettiği jinekologlardan biri haline geldi.',
            ],
        },
    ],
};

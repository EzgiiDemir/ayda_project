export interface PriceItem {
    id: string;
    type: string;
    price: string;
    order: number;
    isActive?: boolean;
}

export interface PricesConfig {
    heroImage: string;
    heroPreTitle: string;
    heroTitle: string;
    items: PriceItem[];
    infoTitle: string;
    infoParagraphs: string[];
}

export const DEFAULT_PRICES_CONFIG: PricesConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    heroPreTitle: 'Aşağıda fiyatlarımızı bulabilirsiniz',
    heroTitle: 'Tüp Bebek ve Tedavi Fiyatlarımız',
    items: [
        { id: 'ivf', type: 'Tüp bebek (IVF/ICSI)', price: '3.500 Euro', order: 1, isActive: true },
        { id: 'sperm-donation', type: 'Sperm Donasyonu', price: '5.500 Euro', order: 2, isActive: true },
        { id: 'egg-donation', type: 'Yumurta Donasyonu', price: '5.500 Euro', order: 3, isActive: true },
        { id: 'embryo-donation', type: 'Embriyo Donasyonu', price: '6.500 Euro', order: 4, isActive: true },
        { id: 'tese', type: 'TESE', price: '1.500 Euro', order: 5, isActive: true },
        { id: 'micro-tese', type: 'MikroTESE', price: '2.000 Euro', order: 6, isActive: true },
        { id: 'ngs', type: 'Embriyolara Kapsamlı Kromozom Taraması (NGS)', price: '3.500 Euro (İlk 5 embriyo)', order: 7, isActive: true },
        { id: 'embryo-storage', type: 'Embriyo Saklama', price: '600 Euro (Yıllık)', order: 8, isActive: true },
        { id: 'acupuncture', type: 'Akupunktur', price: '125 Euro (Tek seans)', order: 9, isActive: true },
    ],
    infoTitle: 'İşlemlerimize Dair Bilmeniz Gereken Önemli Detaylar',
    infoParagraphs: [
        'Sperm donasyonu işlemleri için kullanılan spermler Avrupa\'nın en geniş sperm bağışçısı havuzuna sahip; Danimarka\'da bulunan European Sperm Bankası\'ndan ithal edilip, K.K.T.C. Sağlık Bakanlığı onayından geçmiş spermlerdir.',
        'Yumurta bağışçısı işlemleri için kullanılan yumurtalar hastanemizde kendi takibimizde ilerlettiğimiz folikül takibi ile yine kendi topladığımız yumurtalar olup; alıcısına (sizlere) taze yumurta verilip sperm ile döllendirilmesi işlemi aynı gün gerçekleştirilmektedir.',
        'MESA, TESE, MİKROTESE işlemleriniz, konuda uzman Üroloji Doktorlarımız tarafından yapılmaktadır.',
    ],
};


// ==========================================
// types/prices.ts
// ==========================================
export interface PriceItem {
    type: string;
    price: string;
}

export interface PricesConfig {
    heroImage: string;
    heroPreTitle: string;
    heroTitle: string;
    tableTitle: string;
    items: PriceItem[];
    infoTitle: string;
    infoParagraphs: string[];
}

export const DEFAULT_PRICES_CONFIG: PricesConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    heroPreTitle: 'Aşağıda fiyatlarımızı bulabilirsiniz',
    heroTitle: 'Tüp Bebek ve Tedavi Fiyatlarımız',
    tableTitle: 'Tedavi Fiyatları',
    items: [
        { type: 'Tüp bebek (IVF/ICSI)', price: '3.500 Euro' },
        { type: 'Sperm Donasyonu', price: '5.500 Euro' },
        { type: 'Yumurta Donasyonu', price: '5.500 Euro' },
        { type: 'Embriyo Donasyonu', price: '6.500 Euro' },
        { type: 'TESE', price: '1.500 Euro' },
        { type: 'MikroTESE', price: '2.000 Euro' },
        { type: 'Embriyolara Kapsamlı Kromozom Taraması (NGS)', price: '3.500 Euro (İlk 5 embriyo)' },
        { type: 'Embriyo Saklama', price: '600 Euro (Yıllık)' },
        { type: 'Akupunktur', price: '125 Euro (Tek seans)' },
    ],
    infoTitle: 'İşlemlerimize Dair Bilmeniz Gereken Önemli Detaylar',
    infoParagraphs: [
        "Sperm donasyonu işlemleri için kullanılan spermler Avrupa’nın en geniş sperm bağışçısı havuzuna sahip; Danimarka’da bulunan European Sperm Bankası'ndan ithal edilip, K.K.T.C. Sağlık Bakanlığı onayından geçmiş spermlerdir.",
        "Yumurta bağışçısı işlemleri için kullanılan yumurtalar hastanemizde kendi takibimizde ilerlettiğimiz folikül takibi ile yine kendi topladığımız yumurtalar olup; alıcısına (sizlere) taze yumurta verilip sperm ile döllendirilmesi işlemi aynı gün gerçekleştirilmektedir.",
        "MESA, TESE, MİKROTESE işlemleriniz, konuda uzman Üroloji Doktorlarımız tarafından yapılmaktadır.",
    ],
};

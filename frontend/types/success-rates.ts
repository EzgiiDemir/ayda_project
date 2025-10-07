export interface SuccessRateRow {
    id: string;
    ageRange: string;
    ivf: number;
    spermDonation: number;
    eggDonation: number;
    embryoDonation: number;
    order: number;
}

export interface SuccessRatesConfig {
    heroImage: string;
    heroTitle: string;
    subtitle: string;
    year: string;
    rows: SuccessRateRow[];
}

export const DEFAULT_SUCCESS_RATES_CONFIG: SuccessRatesConfig = {
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
    heroTitle: 'Başarı Oranlarımız',
    subtitle: 'Ocak–Aralık 2020 döneminde gerçekleştirilen tüp bebek ve donasyon işlemlerimizin sonuçlarını, yaş gruplarına göre özetledik.',
    year: '2020',
    rows: [
        { id: '1', ageRange: '20–29', ivf: 76, spermDonation: 82, eggDonation: 85, embryoDonation: 86, order: 1 },
        { id: '2', ageRange: '30–35', ivf: 73, spermDonation: 77, eggDonation: 85, embryoDonation: 86, order: 2 },
        { id: '3', ageRange: '36–39', ivf: 60, spermDonation: 69, eggDonation: 84, embryoDonation: 85, order: 3 },
        { id: '4', ageRange: '40+', ivf: 20, spermDonation: 24, eggDonation: 82, embryoDonation: 82, order: 4 },
    ],
};
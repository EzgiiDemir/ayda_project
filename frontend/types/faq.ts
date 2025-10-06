export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    order: number;
    isActive?: boolean;
}

export interface FAQConfig {
    title: string;
    subtitle?: string;
    faqs: FAQItem[];
    heroImage?: string;
}

export const DEFAULT_FAQ_CONFIG: FAQConfig = {
    title: 'Sıkça Sorulan Sorular',
    subtitle: 'Tüp bebek tedavisi hakkında merak ettikleriniz',
    faqs: [
        {
            id: 'faq-1',
            question: 'Tüp bebek tedavisi nasıl bir işlemdir?',
            answer: '<p>Tüp bebek tedavisi doğal yollar ile çocuk sahibi olamayan kişilere uygulanan tıbbi bir tedavi yöntemidir.</p><p>Her bir bireyin tüp bebek tedavisi yaptırmasındaki sebebi farklı olabilmekte olup kişiye uygun farklı tedavi yöntemleri mevcuttur.</p>',
            order: 1,
            isActive: true,
        },
        {
            id: 'faq-2',
            question: 'Hangi durumlarda tüp bebek tedavisine başvurulmalıdır?',
            answer: '<p><strong>Yeni evlenen genç çiftlerde;</strong> 1 sene korunmasız ilişki önerilir. 1 yıl dolup hamilelik oluşmadıysa kontrol önerilir.</p><p><strong>Yaşı 35\'i geçen bayanlarda;</strong> 6 ay korunmasız ilişki önerilir. 6 ay sonunda hamilelik yoksa kontrol önerilir.</p><p><strong>Yaşı 40\'ı geçen bayanların;</strong> erken zamanda doktor kontrolünden geçmesi önerilir.</p>',
            order: 2,
            isActive: true,
        },
        {
            id: 'faq-3',
            question: 'Tüp bebek tedavisinde bir başkasının yumurta ve spermi mi kullanılıyor?',
            answer: '<p>Sadece yumurta ve/veya sperm bağışçısı tedavisi için gelen hastalarda donör kullanılır.</p><p>Sizin kendi sperm ve yumurtanız sizden başka hiç kimseye kullanılmamakta ve de sperm ile yumurtalarınızın bir başkasına karışma riski olmamaktadır.</p>',
            order: 3,
            isActive: true,
        },
        {
            id: 'faq-4',
            question: 'Tüp bebek tedavisinde kendi yumurtalarım ile çocuk sahibi olabilmem için sınır yaş nedir?',
            answer: '<p>Bunun için net bir şey söylemek mümkün değildir. Bu durum kişiye göre değişebilmekte olup, bu sorunun yanıtını belirli testler ve ultrason kontrolünden sonra kişiye özel anlatmak daha sağlıklıdır.</p>',
            order: 4,
            isActive: true,
        },
        {
            id: 'faq-5',
            question: 'Yumurta dondurma işlemi nasıl bir işlemdir?',
            answer: '<p>Yumurta dondurma tedavisi; bayanın adeti ile yumurtalıklarda var olan yumurta foliküllerinin iğne tedavisi ile olgunlaştırılmasıdır.</p><p>Yaklaşık 12 günlük bir tedavi sonunda folikül bezleri hafif anestezi altında toplanılır ve kaliteli olanlar dondurulup saklanılır.</p>',
            order: 5,
            isActive: true,
        },
    ],
    heroImage: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg',
};

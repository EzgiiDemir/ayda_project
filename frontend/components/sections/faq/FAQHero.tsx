'use client'

import { useEffect, useRef, useState } from 'react'

type FaqItem = {
    title: string
    content: React.ReactNode
}

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [maxHeight, setMaxHeight] = useState<string>('0px')

    useEffect(() => {
        const el = contentRef.current
        if (!el) return
        // açıkken gerçek iç yükseklik kadar genişlet
        if (open) setMaxHeight(`${el.scrollHeight}px`)
        else setMaxHeight('0px')
    }, [open, children])

    // pencere yeniden boyutlanınca açık olanın yüksekliğini yeniden ölç
    useEffect(() => {
        function recalc() {
            const el = contentRef.current
            if (!el) return
            if (open) setMaxHeight(`${el.scrollHeight}px`)
        }
        window.addEventListener('resize', recalc)
        return () => window.removeEventListener('resize', recalc)
    }, [open])

    return (
        <div className="border p-2 rounded-md border-ayda-blue h-fit transition-all duration-300">
            <button
                type="button"
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <p className="text-sm md:text-lg text-ayda-pink-light capitalize font-medium mb-2">
                    {title}
                </p>
                <div
                    className={`w-5 h-5 md:w-8 md:h-8 rounded-md bg-ayda-pink-dark p-2 hover:bg-ayda-blue transition-all duration-300 ease-in flex justify-center items-center my-2 md:my-4 ${open ? 'rotate-180' : 'rotate-0'}`}
                >
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 384 512" className="text-white w-full h-full">
                        <path
                            fill="currentColor"
                            d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                        />
                    </svg>
                </div>
            </button>

            <div
                ref={contentRef}
                className="text-sm md:text-base text-ayda-gray-dark overflow-hidden"
                style={{ maxHeight, transition: 'max-height 0.3s' }}
            >
                {children}
            </div>
        </div>
    )
}

export default function AydaFAQ() {
    const faqItems: FaqItem[] = [
        {
            title: 'Tüp bebek tedavisi nasıl biri işlemdir ?',
            content: (
                <>
                    <p>Tüp bebek tedavisi doğal yollar ile çocuk sahibi olamayan kişilere uygulanan tıbbi bir tedavi yöntemidir.</p>
                    <p>Her bir bireyin tüp bebek tedavisi yaptırmasındaki sebebi farklı olabilmekte olup kişiye uygun farklı tedavi yöntemleri mevcuttur.</p>
                </>
            ),
        },
        {
            title: 'Hangi durumlarda tüp bebek tedavisine başvurulmalıdır ?',
            content: (
                <>
                    <p><strong>Yeni evlenen genç çiftlerde;</strong> 1 sene korunmasız ilişki önerilir. 1 yıl dolup hamilelik oluşmadıysa kontrol önerilir.</p>
                    <p><strong>Yaşı 35’i geçen bayanlarda;</strong> 6 ay korunmasız ilişki önerilir. 6 ay sonunda hamilelik yoksa kontrol önerilir.</p>
                    <p><strong>Yaşı 40’ı geçen bayanların;</strong> erken zamanda doktor kontrolünden geçmesi önerilir.</p>
                    <p><strong>Bunun yanında,</strong></p>
                    <ul className="list-disc ml-[30px]">
                        <li>2–3 kez düşük yaşamış ve halen çocuk sahibi olamayan çiftler,</li>
                        <li>Kalıtımsal olarak bebeğe aktarılabilecek önemli kromozomal bozukluğu olan çiftler,</li>
                        <li>Sperm bozukluğu görülen beyler,</li>
                        <li>Rahim ile ilgili problemi olan bayanlar,</li>
                        <li>Menopoza girmiş veya genç yaşta hiç adet görmeyen bayanlar,</li>
                        <li>AMH düşük olan, polikistik over veya endometriozis tanısı olan bayanlar; <strong>mutlaka ön kontrolden geçmelidir.</strong></li>
                    </ul>
                </>
            ),
        },
        {
            title: 'Tüp bebek tedavisinde bir başkasının yumurta ve spermi mi kullanılıyor ?',
            content: (
                <>
                    <p>Sadece yumurta ve/veya sperm bağışçısı tedavisi için gelen hastalarda donör kullanılır.</p>
                    <p>Sizin kendi sperm ve yumurtanız sizden başkasına kullanılmaz; karışma riski yoktur.</p>
                    <p>Tüm işlemler rızanız olmadan yapılmaz.</p>
                </>
            ),
        },
        {
            title: 'Tüp bebek tedavisinde kendi yumurtalarım ile çocuk sahibi olabilmem için sınır yaş nedir ?',
            content: (
                <>
                    <p>Net tek bir yaş verilemez; kişiye göre değişir ve bazı testler/ultrason sonrası kişiye özel yanıtlanır.</p>
                    <p>Genel olarak menapozda olmamak ve belirli bir yaşı geçirmemek gerekir. 35 yaş ideal kabul edilse de kişiden kişiye değişir.</p>
                    <p>35 yaşına geldiniz ve yakın zamanda çocuk planınız yoksa <strong>yumurta dondurma</strong> işlemini düşünebilirsiniz.</p>
                </>
            ),
        },
        {
            title: 'Yumurta dondurma işlemi nasıl bir işlemdir? Hangi durumlarda uygulanması tavsiye edilmektedir ?',
            content: (
                <>
                    <p>Adetle başlayan iğne tedavisi ile foliküller olgunlaştırılır.</p>
                    <p>Yaklaşık 12 gün sonunda, hafif anestezi ile toplanır; kaliteli olanlar dondurulup saklanır.</p>
                    <p>Daha sonra partner spermi ile döllenip embriyo geliştirilebilir; kaliteli embriyolar transfer edilerek gebelik şansı verilir.</p>
                    <p><strong>Yumurta dondurma şu durumlarda önerilir:</strong></p>
                    <ul className="list-disc ml-[30px]">
                        <li>Yakın zamanda çocuk planlamayan ve yaşı ilerleyen bayanlar,</li>
                        <li>Kemoterapi vb. gonadotoksik tedavi alacak olanlar,</li>
                        <li>Herhangi bir nedenle overleri alınması gerekenler.</li>
                    </ul>
                </>
            ),
        },
        {
            title: 'Tüp bebek tedavisi için evli olmak şart mı ?',
            content: (
                <p>
                    K.K.T.C.’de tüp bebek tedavisi için evlilik şartı <strong>aranmamaktadır.</strong>
                </p>
            ),
        },
        {
            title: 'Kaç yaşına kadar tüp bebek tedavisi yaptırabilirim ?',
            content: (
                <>
                    <p><strong>K.K.T.C.’de yaş sınırı esnek</strong> olmakla beraber belirli kurallar mevcuttur.</p>
                    <ul className="list-disc ml-[30px]">
                        <li>44 yaşına kadar, gebeliği engelleyici bir sorun yoksa tedaviye engel yoktur.</li>
                        <li>45–54 yaş: Gerekli kan testleri ve dahiliye/kardiyoloji raporlarının yer aldığı dosya ile Sağlık Bakanlığı’na başvuru yapılır; yanıta göre planlama yapılır.</li>
                        <li>55 yaş ve üzeri: İlaveten istenen testler ve (varsa) eşin/kişinin mal varlığı durumunu içeren dosya ile başvuru gerekir; yanıt doğrultusunda planlanır.</li>
                    </ul>
                </>
            ),
        },
        {
            title: 'Menapozdan sonra hamile kalınabilir mi ?',
            content: (
                <p>
                    Menopoza girmiş bir bayanda endometrium veya genel sağlık engeli yoksa, <strong>yumurta donasyonu</strong> ile hamilelik mümkündür.
                </p>
            ),
        },
        {
            title: 'Tüp bebek işleminde başarı garantisi veriyor musunuz ?',
            content: (
                <>
                    <p><strong>Başarı garantisi verilemez.</strong></p>
                    <p>Oran; bayanın yaşı, endometrium yapısı, sperm kalitesi ve embriyo sağlığı/kalitesine bağlıdır.</p>
                    <p>Bu nedenle hiçbir klinik %100 başarı garantisi veremez.</p>
                </>
            ),
        },
        {
            title: 'Tüp bebek işleminde başarı oranımızı nasıl arttırabiliriz ?',
            content: (
                <>
                    <p>Yaşam tarzı değişiklikleri büyük katkı sağlar.</p>
                    <p>Sağlıklı beslenme, düzenli spor, bol su, az kafein, sigaradan uzak durma; oosit/sperm kalitesini artırır, embriyo kalitesine ve dolayısıyla gebelik şansına olumlu etki eder.</p>
                    <p>İhtiyaca göre ek tıbbi yöntemler (ör. Embryoscope, mikroçip, PGD) de şansı artırabilir.</p>
                </>
            ),
        },
        {
            title: 'Yumurta toplama işlemine girmeden önce istenilen dökümanlar nelerdir ?',
            content: (
                <>
                    <p>Yumurta toplama öncesi:</p>
                    <ul className="list-disc ml-[30px]">
                        <li>Son 6 ay içinde yapılmış gerekli kan testleri,</li>
                        <li>24 saati geçmemiş COVID-19 PCR veya antijen testi sonucu,</li>
                        <li>Eş gelemeyecekse spermin kullanımını onaylayan resmi belge,</li>
                        <li>İşlem ücreti (tutar için koordinatörünüzle görüşünüz).</li>
                    </ul>
                </>
            ),
        },
        // Son madde kullanıcının metninde yarım kalmıştı; aynı kalıpla doldurabilirsiniz.
        // {
        //   title: 'Sperm verme işlemine girmeden önce istenilen dökümanlar nelerdir ?',
        //   content: (<></>),
        // },
    ]

    return (
        <main className="flex-1 flex flex-col">
            <div>
                <div
                    className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                    style={{
                        backgroundImage: 'url("https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}
                />
                <div className="container flex flex-col gap-5 py-5 md:py-10">
                    <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                        {/* İstersen boş bırak: */}
                        Sıkça Sorulan Sorular
                    </p>

                    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
                        {faqItems.map((it, idx) => (
                            <AccordionItem key={idx} title={it.title}>
                                {it.content}
                            </AccordionItem>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

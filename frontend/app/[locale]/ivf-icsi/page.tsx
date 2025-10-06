// app/(tr)/ivf-icsi/page.tsx
// veya components/IvfIcsiPage.tsx olarak da kullanabilirsiniz.
// Tailwind yüklü olmalı. (container, text-ayda-* renkleri projede tanımlı varsayılmıştır.)

export default function IvfIcsiPage() {
    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <section
                aria-label="IVF-ICSI Hero"
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage:
                        'url("https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                }}
            />

            {/* Başlık */}
            <div className="container flex flex-col gap-5 py-5 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    Tüp Bebek (IVF) - ICSI
                </p>

                <div className="flex flex-col gap-7 md:gap-10">
                    {/* Bölüm 1: IVF-ICSI Nedir? */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-1">
                                    <div className="flex flex-col gap-7 md:gap-10">
                                        <article className="flex flex-col gap-3">
                                            <div className="flex flex-col lg:flex-row gap-6 items-center">
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <h1 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                                        Tüp bebek tedavisi işlemi nedir ? (IVF-ICSI)
                                                    </h1>
                                                    <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-1">
                                                        <p>
                                                            Jinekoloji veya androloji doktorları tarafından kısırlık tanısı konulan
                                                            çiftin doğal yollar veya kısırlık tedavisinde diğer üreme yöntemleri ile
                                                            başarısız olduğunda kullanılan önemli bir tedavi yöntemidir.
                                                        </p>
                                                        <p>
                                                            Tüp bebek ya da bilimsel ismiyle in vitro fertilizasyon (IVF), bayanda bulunan
                                                            her bir yumurtanın her bir sperm tarafından, vücut dışında suni olarak embriyoloji
                                                            laboratuvarında döllenmesi ve geliştirilmesi ile gelişen embriyoların anne rahmine
                                                            transfer edilmesi sürecidir.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bölüm 2: Kimlere uygulanır? */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h2 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    Tüp bebek tedavisi kimlere uygulanır ?
                                </h2>
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-1">
                                    <h3 className="font-semibold">Bayanlarda;</h3>
                                    <ul className="list-disc ml-[30px] space-y-1">
                                        <li>Yumurta rezervi (AMH değeri) ve kalitesi düşük olan bayanlarda,</li>
                                        <li>Yaşı ilerleyen bayanlarda,</li>
                                        <li>
                                            PCO (Polikistik over sendromu) olup vücudu gereğinden fazla ve düşük kalitede yumurta
                                            üreten bayanlarda,
                                        </li>
                                        <li>
                                            Tüpleri bağlı, tıkalı, olan veya enfeksiyon ya da dış gebelik gibi sebeplerle tüpleri alınmış
                                            olan bayanlarda,
                                        </li>
                                        <li>Vaginismus olan bayanlarda,</li>
                                        <li>Yumurtalık kisti veya kanserinden dolayı ameliyat geçirmiş bayanlarda,</li>
                                        <li>Endometriosis’i olan bayanlarda,</li>
                                        <li>
                                            Kadın üreme organlarında yapışıklığa bağlı tüpler ve yumurtalıklar arasındaki ilişkinin bozulduğu
                                            durumlarda.
                                        </li>
                                    </ul>

                                    <h3 className="font-semibold mt-4">Erkeklerde;</h3>
                                    <ul className="list-disc ml-[30px] space-y-1">
                                        <li>Boşalma ile ilgili problem yaşayan beylerde,</li>
                                        <li>
                                            Semen analizinde Dünya sağlık örgütünün (WHO) belirlemiş olduğu normozoospermi (normal sperm
                                            değerleri)’nin dışında kalan beylerde,
                                        </li>
                                        <li>Semen analizinde hiç sperm bulunmayan veya çok az sayıda sperm bulunan erkeklerde,</li>
                                        <li>Hareketli spermi bulunmayan erkeklerde,</li>
                                        <li>
                                            Erkek üreme organlarında bulunan tümör sebebi ile kemoterapi ve radyoterapi almış olup ameliyat
                                            geçirmek zorunda kalan erkeklerde,
                                        </li>
                                        <li>
                                            Küçükken geçirmiş olduğu kabakulak veya diğer virütik ateşli hastalıklara bağlı olarak sperm
                                            üretiminde bozukluk olan erkeklerde,
                                        </li>
                                        <li>Sperm kanalları tıkalı veya doğuştan sperm kanalları gelişmemiş olan erkeklerde,</li>
                                        <li>
                                            Testisleri bağlı olan veya testiste yanlış yapılan ameliyat sonrasında spermin ejekulata gelemediği
                                            durumlarda.
                                        </li>
                                    </ul>

                                    <h3 className="font-semibold mt-4">Genel olarak;</h3>
                                    <ul className="list-disc ml-[30px] space-y-1">
                                        <li>Diğer tedavi yöntemleri ile gebelik elde edemeyen çiftlerde,</li>
                                        <li>Açıklanamayan (genellikle psikolojik) kısırlık vakalarında,</li>
                                        <li>Genetik problemi olan çiftlerde,</li>
                                        <li>İmmunolojik (bağışıklık sistemi ile alakalı) problemleri olan çiftlerde.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bölüm 3: Ne zaman başvurmalıyım? */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h2 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    Ne zaman tüp bebek tedavisine başvurmalıyım ?
                                </h2>
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-1">
                                    <p>
                                        Çiftin 1 sene boyunca korunmasız olarak düzenli ilişkiye girmesinden hamilelik gözlenmemesi veya
                                        hamileliğin düşüklerle sonuçlanması kısırlık sebebi olabileceğinden 1 sene sonunda bayanın
                                        jinekoloji doktoruna erkeğin ise androloji doktoruna başvurarak muayene olması gerekmektedir.
                                    </p>
                                    <p>
                                        Yapılan muayene ve diğer üreme yöntemleri başarısız olduğu durumlarda tüp bebek tedavisine baş
                                        vurulması gerekmektedir.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bölüm 4: 10 Adımda Tüp Bebek Süreci */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h2 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    10 adımda tüp bebek süreci
                                </h2>
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-1">
                                    <ul className="list-disc ml-[30px] space-y-2">
                                        <li>
                                            Öncelikle tüp bebek tedavisini düşünen hastalarımızın bizimle iletişime geçerek eğer Kıbrıs’ta
                                            yaşıyorsalar randevu alarak ön görüşme yapmaları için kliniğimize gerekmektedir. Eğer
                                            hastalarımız Kıbrıs’ta yaşamıyorlar ise yine telefon veya e-mail yolu ile bizlere ulaşarak ön
                                            görüşme sürecini telefon veya e-mail konferansı şeklinde yapmamız gerekmektedir.
                                        </li>
                                        <li>
                                            {/* Orijinal metin burada kesiliyor. Kalan adımları daha sonra ekleyebilirsiniz. */}
                                            <span className="opacity-70">Devam eden adımlarınızı buraya ekleyin…</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

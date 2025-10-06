export default function OurSuccessRates() {
    const hero = {
        src: "https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg",
        alt: "Ayda IVF Başarı Oranları Kapak Görseli",
    };

    const rows = [
        { yas: "20–29", tup: 76, sperm: 82, yumurta: 85, embriyo: 86 },
        { yas: "30–35", tup: 73, sperm: 77, yumurta: 85, embriyo: 86 },
        { yas: "36–39", tup: 60, sperm: 69, yumurta: 84, embriyo: 85 },
        { yas: "40+", tup: 20, sperm: 24, yumurta: 82, embriyo: 82 },
    ];

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage: `url(${hero.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                }}
                role="img"
                aria-label={hero.alt}
            />

            <section className="container flex flex-col gap-6 py-6 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    Başarı Oranlarımız
                </p>

                {/* Özet */}
                <p className="text-sm md:text-base text-ayda-pink-light text-center font-medium">
                    Ocak–Aralık 2020 döneminde gerçekleştirilen tüp bebek ve donasyon işlemlerimizin sonuçlarını, yaş gruplarına göre özetledik.
                </p>

                {/* Başarıyı etkileyen faktörler */}
                <div className="flex flex-col gap-2 text-sm md:text-base text-ayda-gray-dark">
                    <p>
                        Başarı oranı öncelikle <strong>kadının yaşı</strong>, <strong>oosit (yumurta) kalitesi ve over rezervi</strong> ile
                        <strong> erkekteki sperm kalitesi</strong> ile yakından ilişkilidir.
                    </p>
                    <p className="text-xs md:text-sm text-ayda-gray">
                        Not: Aşağıdaki oranlar merkezimizin 2020 yılı verilerinin özetidir; kişisel durum ve tedavi planına göre değişebilir.
                    </p>
                </div>

                {/* Tablo */}
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full border border-gray-200 text-xs md:text-sm">
                        <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left p-3 border-b font-semibold">Kadının Yaşı</th>
                            <th className="text-left p-3 border-b font-semibold">Tüp Bebek</th>
                            <th className="text-left p-3 border-b font-semibold">Sperm Donasyonu</th>
                            <th className="text-left p-3 border-b font-semibold">Yumurta Donasyonu</th>
                            <th className="text-left p-3 border-b font-semibold">Embriyo Donasyonu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((r, i) => (
                            <tr key={r.yas} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 border-b">{r.yas}</td>
                                <td className="p-3 border-b">%{r.tup}</td>
                                <td className="p-3 border-b">%{r.sperm}</td>
                                <td className="p-3 border-b">%{r.yumurta}</td>
                                <td className="p-3 border-b">%{r.embriyo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Menopoz & Donasyon */}
                <section className="flex flex-col gap-4 md:gap-5">
                    <h2 className="text-base md:text-lg text-ayda-pink-light text-center font-medium">
                        Menopoz Gebeliğe Engel midir?
                    </h2>
                    <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3">
                        <p>
                            Menopoza girmek <strong>kendi yumurtalarınızla</strong> gebelik şansını belirgin biçimde azaltır; ancak
                            <strong> rahim (endometrium)</strong> sağlıklı ve işlevsel ise gebelik <strong>donasyon</strong> yöntemleriyle mümkündür.
                        </p>
                        <p>
                            <strong>Yumurta Donasyonu:</strong> Endometriumu sağlıklı her kadın, fenotip ve kan grubu uyumuna göre seçilen donör
                            yumurtaları ile gebelik şansı elde edebilir.
                        </p>
                        <p>
                            <strong>Sperm Donasyonu:</strong> Sperm üretimi olmayan ya da ileri morfolojik bozukluk/hareketsizlik nedeniyle kaliteli
                            sperm elde edilemeyen olgularda, uygun donör spermi ile gebelik sağlanabilir.
                        </p>
                    </div>
                </section>

                {/* Erkek faktörü */}
                <section className="flex flex-col gap-3 md:gap-4">
                    <h2 className="text-base md:text-lg text-ayda-pink-light text-center font-medium">Erkek Faktörü Neden Önemli?</h2>
                    <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3">
                        <p>
                            Sperm sayısı tek başına belirleyici değildir. <strong>İleri morfolojik bozukluk</strong>, <strong>hareketsizlik</strong> ve
                            testisten cerrahi yollarla elde edilen canlılığı düşük örnekler başarıyı azaltabilir. Gerekli durumlarda tedavi öncesi
                            <strong> üroloji/androloji</strong> değerlendirmesi ve <strong>ön tedavi</strong> planlanmalıdır.
                        </p>
                    </div>
                </section>

                {/* Yaş etkisi */}
                <section className="flex flex-col gap-3 md:gap-4">
                    <h2 className="text-base md:text-lg text-ayda-pink-light text-center font-medium">Yaş Neden Etkili?</h2>
                    <ul className="list-disc pl-5 text-sm md:text-base text-ayda-gray-dark space-y-2">
                        <li>
                            Yaş arttıkça <strong>kromozomal anomali</strong> oranı yükselir; sağlıklı embriyo sayısı azalır.
                        </li>
                        <li>
                            Oositteki <strong>mitokondriyal</strong> enerji kapasitesi yaşla azalır; embriyo gelişimi ve implantasyon olumsuz etkilenebilir.
                        </li>
                        <li>
                            <strong>Over rezervi</strong> doğal olarak azalır; toplanabilen olgun oosit sayısı düşer.
                        </li>
                    </ul>
                </section>

                {/* Yardımcı yaklaşımlar */}
                <section className="flex flex-col gap-3 md:gap-4">
                    <h2 className="text-base md:text-lg text-ayda-pink-light text-center font-medium">Başarıyı Artırmaya Yardımcı Yaklaşımlar</h2>
                    <ul className="list-disc pl-5 text-sm md:text-base text-ayda-gray-dark space-y-2">
                        <li>
                            <strong>PGT/PGT-A (genetik tarama)</strong>
                        </li>
                        <li>
                            <strong>EmbryoScope® Plus</strong> (time-lapse embriyo izleme)
                        </li>
                        <li>
                            <strong>Mikroçip tabanlı sperm seçimi</strong>
                        </li>
                    </ul>
                    <p className="text-sm md:text-base text-ayda-gray-dark">
                        Uygunluk, medikal geçmişiniz ve embriyo/sperm/yumurta kalitesi değerlendirilerek belirlenir. Detaylı bilgi için koordinatörlerimizle iletişime geçebilirsiniz.
                    </p>
                </section>

                {/* SSS kısa */}
                <section className="flex flex-col gap-3 md:gap-4">
                    <h2 className="text-base md:text-lg text-ayda-pink-light text-center font-medium">Sık Sorulanlar</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl border bg-white shadow-sm">
                            <h3 className="font-semibold mb-2">Bu oranlar benim için de geçerli mi?</h3>
                            <p className="text-sm text-ayda-gray-dark">
                                Oranlar genel eğilimleri gösterir; kişisel plan için hekim değerlendirmesi gerekir.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl border bg-white shadow-sm">
                            <h3 className="font-semibold mb-2">40 yaş üstünde en yüksek başarı?</h3>
                            <p className="text-sm text-ayda-gray-dark">Verilerimizde yumurta/embriyo donasyonu protokolleri daha yüksektir.</p>
                        </div>
                        <div className="p-4 rounded-2xl border bg-white shadow-sm">
                            <h3 className="font-semibold mb-2">Danışmanlık alabilir miyim?</h3>
                            <p className="text-sm text-ayda-gray-dark">Koordinatörlerimiz kişisel durumunuzu değerlendirip size özel plan sunar.</p>
                        </div>
                    </div>
                </section>

                {/* Uyum notu */}
                <div className="text-xs md:text-sm text-ayda-gray text-center">
                    Bu sayfadaki bilgiler 2020 yılına ait merkez içi verilerin özetidir; güncel oranlar ve uygunluk için lütfen iletişime geçin.
                </div>
            </section>
        </main>
    );
}

import Image from "next/image";

type TeamMemberProps = {
    nameTitle: string;
    image: { src: string; alt: string };
    paragraphs: string[];
};

function TeamMember({ nameTitle, image, paragraphs }: TeamMemberProps) {
    return (
        <section className="flex flex-col gap-6 items-center">
            <div className="w-full max-w-[600px] aspect-video relative">
                {/* next/image ile doldur */}
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="w-full h-full object-contain"
                    priority
                />
            </div>

            <div className="flex-1 flex flex-col gap-2 max-w-3xl">
                <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                    {nameTitle}
                </p>

                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3">
                    {paragraphs.map((p, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function OurTeamTR() {
    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage:
                        'url("https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                }}
                role="img"
                aria-label="Ayda IVF klinik görseli"
            />

            <div className="container flex flex-col gap-5 py-5 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    Takımımız
                </p>

                <div className="flex flex-col gap-7 md:gap-10">
                    {/* Tanyel Felek */}
                    <TeamMember
                        nameTitle="Ayda Tüp Bebek Takımı Direktörü &amp; Embriyoloji Lab. Sorumlusu KLİNİK EMBRİYOLOG TANYEL FELEK"
                        image={{
                            src: "https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png",
                            alt: "ayda-ceo",
                        }}
                        paragraphs={[
                            "Tanyel Felek 1991 tarihinde Kıbrıs’ta doğdu. Üniversite eğitimini Ankara’nın Gazi Üniversitesi ve Almanya’nın Johannes Gutenberg Üniversitesinde tamamladı.",
                            "Mayıs 2013 yılında Almanya’nın en büyük ve en gelişmiş tüp bebek merkezlerinden biri olan Kinderwunsch Zentrum Wiesbaden’de Embriyoloji ve Androloji Laboratuvarında Embriyolog olarak çalışmaya başladı.",
                            "Embriyoloğumuz Almanya’da çalıştığı dönemde Klinik Embriyoloji Master programına başvurdu. 2016 yılında Avusturalya’nın Karl Franzes Üniversitesinde Klinik Embriyoloji Master programına katıldı. Avrupa’da alanında en iyiler olarak bilinen Prof. Dr. Thomas Ebner, Prof. Dr. Markus Montag ve daha birçok önemli hocalardan master eğitimini alarak, diplomalı Klinik Embriyoloji Uzmanı olarak mesleğine devam etti.",
                            "Almanya çalışmaya devam ederken, Kuzey Kıbrıs’ta Dr. Münür Şago’dan Embriyoloji ve androloji laboratuvarı sorumluluğu teklifi aldı. Embriyoloji uzmanımız Tanyel Felek mesleğini Kıbrıs’ta devam ettirme kararı alarak ülkesine döndü.",
                            "6 seneden beridir Kıbrıs’ta Laboratuvar sorumlusu olarak mesleğini sürdüren Tanyel Felek, Kıbrıs’ta tedavi görmek isteyip Ayda tüp bebek takımını tercih eden hastalarla birebir yakından ilgileniyor. Hastalarının ebeveyn olabilmeleri için tüm bilgi ve deneyimini kullanarak, onlara yardımcı olabilmek için canla başla çalışıyor. Mesleğini severek yapan ve hastalarına duyduğu büyük saygı ve sevgi ile bilinen Tanyel Felek, yine hastalarının yoğun talebi üzerine 2020 yılında kendisine ait AYDA IVF (AYDA Tüp bebek) takımının kurucusu oldu.",
                            "2012 tarihinden beridir dünyanın hemen hemen her yerindeki kongre, seminer, workshop ve hospitasyonlara katılmaya devam eden başarılı embriyoloğumuz en son; 2019 yılında Meksika’nın Mazatlan şehrinde yapılan uluslararası Kongre’de mesleğinin önemli konuları üzerine workshop düzenlemiş ve oradaki embriyoloji uzmanlarına eğitim vermiştir.",
                            "Yine aynı yılda Amerika’nın en önemli üniversitelerinden biri olan Yale üniversitesinde çalışma yapan PHD öğrencilerine embriyoloji laboratuvarı kullanımı hakkında eğitim vermiştir.",
                            "Yine mesleğinin önemli konularından olan; Embriyoya biyopsi yapılması ve teknikleri ile ilgili; başta Amerika- Yale üniversitesi olmak üzere birçok merkez ve kliniğin embriyoloji uzmanlarına eğitim ve laboratuvar danışmanlığı vermektedir.",
                            "Embriyoloji Uzmanı Tanyel Felek'in ana dili Türkçe olup, Türkçe dilinin yanında Almanca ve İngilizce dillerini de konuşup yazabilmektedir.",
                        ]}
                    />

                    {/* Münür Şago */}
                    <TeamMember
                        nameTitle="Ayda Tüp Bebek Takımı Jinekoloji Uzmanı Op. Dr. MÜNÜR ŞAGO"
                        image={{
                            src: "https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png", // varsa kendi görsel linkini koy
                            alt: "op-dr-munur-sago",
                        }}
                        paragraphs={[
                            "1970 yılında Kıbrıs’ın Limasol şehrinde doğan Dr. Münür Şago 2 kardeşi ile birlikte sevgi dolu bir ailede büyüdü.",
                            "Doktorumuz ilk, orta ve lise öğrenimini Kıbrıs’ta tamamladıktan sonra 1988 yılında Cerrahpaşa Tıp Fakültesini kazandı.",
                            "1994’te Cerrahpaşa’dan mezun olduktan sonra, Kadın doğum ve Jinekoloji Uzmanlığını İstanbul Şişli Etfal Hastanesinde tamamlayan doktorumuz bu dönemde Histeroskopi, Laparaskopi ve Tüp bebek alanlarına ilgi duyarak bu alanlar üzerine çeşitli kurslar alarak kendini geliştirdi.",
                            "Doktorumuz uzmanlığını aldıktan sonra Türkiye’nin en kalabalık ve doğurgan bölgesi olan güney doğu anadolu’ya kendi isteği ile tayinini aldırdı ve burada 6 yıl boyunca çalıştı.",
                            "Güney doğu anadolu’da çalıştığı dönemde alanında tek kalifiye doktor olması ve 6 yıl boyunca çok yoğun bir şekilde çalışmış olması kendisine inanılmaz bir deneyim kattı.",
                            "2004 yılında adaya geri dönen doktorumuz, işinde başarılı ve sabırlı bir doktor olmasının yanı sıra sempatik ve iyiniyetli karakteri ile Kıbrıs halkının en tercih edilen Jinekoloji Uzmanlarından biri haline geldi.",
                            "2011 yılında kurucusu olduğu Tüp bebek merkezinin başına geçen Doktor Münür Şago 10 seneden beridir tüp bebek tedavisi ile aile olmayı planlayan birçok insana yardım elini uzatmaya devam ediyor.",
                            "Sarp adında 2 yaşında bir oğlu olan ve boş zamanlarını ailesi ile bahçesinde ekip biçerek, arkadaşları ile balık tutmaya giderek geçiren değerli doktorumuz tam bir aile babasıdır.",
                            "Doktor Münür Şago’nun ana dili Türkçe olup, Türkçe dilinin yanında İngilizce’yi de ana dili gibi konuşup yazabilmektedir.",
                        ]}
                    />
                </div>
            </div>
        </main>
    );
}

export default function OurPricesTR() {
    const prices = [
        { type: "Tüp bebek (IVF/ICSI)", price: "3.500 Euro" },
        { type: "Sperm Donasyonu", price: "5.500 Euro" },
        { type: "Yumurta Donasyonu", price: "5.500 Euro" },
        { type: "Embriyo Donasyonu", price: "6.500 Euro" },
        { type: "TESE", price: "1.500 Euro" },
        { type: "MikroTESE", price: "2.000 Euro" },
        { type: "Embriyolara Kapsamlı Kromozom Taraması (NGS)", price: "3.500 Euro (İlk 5 embriyo)" },
        { type: "Embriyo Saklama", price: "600 Euro (Yıllık)" },
        { type: "Akupunktur", price: "125 Euro (Tek seans)" },
    ];

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                 style={{
                     backgroundImage:
                         'url("https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg")',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center center',
                     backgroundSize: 'cover',
                 }}
                 role="img"
                 aria-label="Ayda IVF klinik görseli"
            />

            <div className="container max-w-6xl mx-auto flex flex-col gap-5 py-5 md:py-10 px-4">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    Fiyatlarımız
                </p>

                <div className="flex flex-col gap-7 md:gap-10">
                    {/* Başlık ve açıklama */}
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex-1 flex flex-col gap-2 max-w-3xl">
                            <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                Tüp Bebek Fiyatları
                            </p>
                            <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-1">
                                <p>
                                    Aşağıda en sık kullanılan tedavi yöntemlerimizin fiyatları yer almaktadır. Fiyat listemiz sizlere tedavinizin maliyeti hakkında <strong>fikir vermesi amacı ile</strong> paylaşılmıştır. Hangi tedavi tipine ihtiyacınız olduğunu ve başarı şansınızı arttırmak için yaptırabileceğiniz ekstra yöntemler olup olmadığını öğrenebilmek için <strong>Ayda Tüp bebek ekibimiz ile irtibata</strong> geçebilirsiniz.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fiyat Tablosu */}
                    <div className="overflow-x-auto mt-3">
                        <figure className="table min-w-full">
                            <table className="min-w-full border border-gray-300 text-xs md:text-sm">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                        <strong>Tedavi Tipi</strong>
                                    </th>
                                    <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                        <strong>Fiyatı</strong>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {prices.map((row) => (
                                    <tr key={row.type} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-3 border-b border-gray-300">{row.type}</td>
                                        <td className="p-3 border-b border-gray-300">{row.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </figure>
                    </div>

                    {/* Bilgilendirme Bölümü */}
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex-1 flex flex-col gap-2 max-w-3xl">
                            <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                İşlemlerimize Dair Bilmeniz Gereken Önemli Detaylar
                            </p>
                            <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3">
                                <p>
                                    Sperm donasyonu işlemleri için kullanılan spermler Avrupa’nın en geniş sperm bağışçısı havuzuna sahip; Danimarka’da bulunan <strong>European Sperm Bankası</strong>'ndan ithal edilip, K.K.T.C. Sağlık Bakanlığı <strong>onayından geçmiş</strong> spermlerdir.
                                </p>
                                <p>
                                    Yumurta bağışçısı işlemleri için kullanılan yumurtalar hastanemizde kendi takibimizde ilerlettiğimiz folikül takibi ile yine kendi topladığımız yumurtalar olup; alıcısına (sizlere) <strong>taze yumurta</strong> verilip sperm ile döllendirilmesi işlemi aynı gün gerçekleştirilmektedir. Yumurta bağışçıları K.K.T.C. <strong>Sağlık Bakanlığı kriterlerine, kan grubunuza</strong> ve sizin <strong>bağışçıda aradığınız kriterlere uygun</strong> olarak seçilmektedir.
                                </p>
                                <p>
                                    MESA, TESE, MİKROTESE işlemleriniz, <strong>konuda uzman Üroloji Doktorlarımız tarafından yapılmaktadır.</strong> Sperm toplama ameliyatlarına girmeden önce mutlaka üroloji uzmanlarımızın sizin için öngördüğü tedavi sürecinden geçilmesi gerekmektedir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

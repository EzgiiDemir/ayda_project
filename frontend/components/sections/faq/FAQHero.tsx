'use client'

import { useEffect, useRef, useState } from 'react'
import {ArrowUp} from "lucide-react";

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
            <div
                className="border p-4 md:p-6 rounded-md border-primary-blue h-fit transition-all duration-300
                 w-full max-w-3xl mx-auto"
            >
                <button
                    type="button"
                    className="w-full flex items-center justify-between cursor-pointer"
                    aria-expanded={open}
                    onClick={() => setOpen(o => !o)}
                >
                    {/* Yazılar sola yaslı */}
                    <p className="text-left text-sm md:text-lg text-primary-pink capitalize font-medium mb-2">
                        {title}
                    </p>

                    {/* Ok ikonu büyütüldü */}
                    <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-md bg-primary-pink p-2 md:p-3
                      hover:bg-ayda-blue transition-all duration-300 ease-in 
                      flex justify-center items-center ml-4
                      ${open ? "rotate-180" : "rotate-0"}`}
                    >
                        <ArrowUp className="text-white w-6 h-6 md:w-8 md:h-8" />
                    </div>
                </button>

                <div
                    ref={contentRef}
                    className="text-left text-sm md:text-base text-ayda-gray-dark overflow-hidden"
                    style={{ maxHeight, transition: "max-height 0.3s" }}
                >
                    {children}
                </div>
            </div>  );
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
                    <p>Sizin kendi sperm ve yumurtanız sizden başka hiç kimseye kullanılmamakta ve de sperm ile yumurtalarınızın bir başkasına karışma riski olmamaktadır.</p>
                    <p>Tüp bebek tedavisinde sizin rızanız olmadan hiçbir işlem yapılmamaktadır.
                    </p>
                </>
            ),
        },
        {
            title: 'Tüp bebek tedavisinde kendi yumurtalarım ile çocuk sahibi olabilmem için sınır yaş nedir ?',
            content: (
                <>
                    <p>Bunun için net bir şey söylemek mümkün değildir. Bu durum kişiye göre değişebilmekte olup, bu sorunun yanıtını belirli testler ve ultrason kontrolünden sonra kişiye özel anlatmak daha sağlıklıdır.</p>
                    <p>Bunun dışında; kendi yumurtalarınız ile sağlıklı bir tedavi görebilmeniz için öncelikle menapozda olmamanız ve belirli bir yaşı geçirtmemeniz gerekmektedir. Genellikle 35 yaşı geçirmemeniz en ideali olarak görülmekle birlikte, bazı insanlarda bu yaş sınırı çok aşağılarda veya yukarılarda olabilmektedir. Unutulmamalıdır ki yaş ilerledikçe vücuttaki yumurta sayısı, kalitesi ve enerjisi azalıp çoğu yumurtada genetik bozukluklar oluşmaktadır.</p>
                    <p>35 yaşına gelmiş ve halen evli değilseniz ve/veya yakın zamanda çocuk sahibi olmayı planlamıyorsanız yumurtalarınızı dondurup saklama işlemini düşünebilirsiniz.</p>
                </>
            ),
        },
        {
            title: 'Yumurta dondurma işlemi nasıl bir işlemdir? Hangi durumlarda uygulanması tavsiye edilmektedir ?',
            content: (
                <>
                    <p>Yumurta dondurma tedavisi; bayanın adeti ile yumurtalıklarda var olan yumurta foliküllerinin iğne tedavisi ile olgunlaştırılmasıdır.</p>
                    <p>Yaklaşık 12 günlük bir tedavi sonunda folikül bezleri hafif anestezi altında toplanılır ve kaliteli olanlar dondurulup saklanılır.</p>
                    <p>Daha sonra partner spermi ile döllenip embriyo geliştirilebilir; kaliteli embriyolar transfer edilerek gebelik şansı verilir.</p>
                    <p>Böylelikle kişi dondurulmuş olarak saklanan yumurtalarını dilediği zaman partnerinin spermi ile birleştirterek embriyo haline getirebilir. Laboratuvar ortamında geliştirilen embriyolardan kaliteli olanlar bayana transfer edilerek gebeliğe şans verilir.</p>
                    <p>Yumurta dondurma işlemi;</p>
                    <p>Yakın zamanda çocuk sahibi olmayı planlamayan ve yaşı ilerlemekte olan bayanlara,

                        Kanser vb. tedavi görecek olup kemoterapi vb. ağır ilaç ve kimyasallara mağruz kalacak olan bayanlara,</p>
                    <p>Herhangi bir sebepten ötürü yumurtalıkları alınması gereken bayanlara önerilmektedir.

                    </p>
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
                    <p><strong>K.K.T.C.’de tüp bebek tedavisi için yaş sınırı daha esnek olsa da bunun için belirli kurallar mevcuttur.</strong></p>
                    <p><strong>Genel olarak,</strong></p>
                        <p>44 yaşına kadar kişide gebeliği engelleyici sorunlar olmadığı sürece tedavi görülmesinde bir sakınca yoktur.</p>
                        <p>45-54 yaş arasındaki bayanlar için;</p>
                        <p>İstenilen belirli kan testleri ve dahiliye kardiyoloji raporlarını içeren bir dosya hazırlanılarak sağlık bakanlığına başvuru yapılır. Buradan gelen yanıta göre hastanın tedavisi planlanır.</p>
                        <p>55 yaş ve üzeri bayanlar için;</p>
                        <p>İstenilen belirli kan testleri,</p>
                        <p>Dahiliye kardiyoloji raporları,
                        </p>
                    <p>Kişinin ve varsa eşinin mal varlığı durumu içeren bir dosya hazırlanılarak sağlık bakanlığına başvuru yapılır. Buradan gelen yanıta göre hastanın tedavisi planlanır.
                    </p>

                </>
            ),
        },
        {
            title: 'Menapozdan sonra hamile kalınabilir mi ?',
            content: (
                <p>
                    Menapoza girmiş bir bayanın endometrium ile alakalı problemi ve/veya gebeliği engelleyici sağlık sorunları yok ise yumurta donasyonu tedavisi ile hamile kalabilir.                </p>
            ),
        },
        {
            title: 'Tüp bebek işleminde başarı garantisi veriyor musunuz ?',
            content: (
                <>
                    <p><strong>Tüp bebek işlemine başarı garantisi verebilmek imkansızdır.

                    </strong></p>
                    <p>Başarı oranı özellikle bayanın yaşına, endometrium yapısına, erkekte sperm kalitesine ve de oluşan embriyonun (bebeğin) kaliteli ve sağlıklı olup olmamasına göre değişmektedir.</p>
                    <p><strong>Bu nedenlerden ötürü hiçbir klinik size yaptıracağınız işleminizde 0 başarılı olacağınızın garantisini veremez. </strong></p>
                </>
            ),
        },
        {
            title: 'Tüp bebek işleminde başarı oranımızı nasıl arttırabiliriz ?',
            content: (
                <>
                    <p>Tüp bebek işleminizde birçok yolla başarı oranınızı arttırabilmeniz mümkündür.

                        Başarı oranınızın artmasına kendi yaşam kalitenizi düzenleyerek çok ciddi katkıda bulunabilirsiniz. Bunun yanında kliniğimizde başarı oranınızı arttırmaya yardımcı çeşitli tıbbı tedaviler ve tekniklerde bulunmaktadır.</p>
                    <p>Özellikle sağlıklı beslenme, spor, bol su tüketimi, az kafein tüketimi ve sigaradan uzak durmak; yumurta ve sperm kalitenizin artmasında büyük rol oynar. Bu da oluşan embriyolarınızın kalitesinin artmasına ve böylelikle gebelik şansınızın artmasına etkisi olur.</p>
                    <p>Bunun yanı sıra tüp bebek tedavinize ihtiyacınıza göre ekleyeceğiniz çeşitli tıbbi yöntemlerde başarı şansınızı arttırmanızda etkili olacaktır.</p>
                    <p>Hastalarımıza en çok önerdiğimiz teknikler arasında Embryoscope, mikrochip ve PGD bulunmaktadır.</p>
                    <p>Başarı oranınızı nasıl arttıracağınız konusunda daha detaylı bilgiye ulaşabilmek için ana sayfamızdan ‘BLOG’ kısmına girerek bu konuda çeşitli video ve yazılara ulaşabilirsiniz.</p>
                </>
            ),
        },
        {
            title: 'Yumurta toplama işlemine girmeden önce istenilen dökümanlar nelerdir ?',
            content: (
                <>
                    <p>Yumurta toplama işlemine girmeden önce;</p>
                        <p>6 ayı geçmemiş olan kan testleriniz (Bu testlerin neler olduğunu koordinatörünüzden öğrenebilirsiniz.)</p>
                        <p>Covid-19 PCR veya Antijen testinizin sonucu (Test sonucunuz 24 saati geçmemelidir.)

                            Eşiniz yumurta toplama işlemine gelemeyecek ise, eşinizin sperminin kullanılmasını kabul ettiğine dair resmi belge. (Bu belgenin kabul şartlarını koordinatörünüzden öğrenebilirsiniz.)

                            Ödeme ücretiniz (Lütfen işleminiz için ücretin ne olduğunu koordinatörünüze danışınız).</p>

                </>
            ),
        }, {
            title: 'Tüp bebek tedavisi kaç kez denenebilir ?',
            content: (
                <>
                    <p>Bunun için belirlenmiş kesin bir sayı olmamaktadır.</p>

                </>
            ),
        },{
            title: 'Yumurta toplama işleminde narkoz almam (bayıltılmam) gerekiyor mu ?',
            content: (
                <>
                    <p>Evet. Yumurta toplama işlemi hafif anestezi altında olmakta olup yumurta toplama işleminizden en az 6 saat öncesine kadar hiçbirşey yiyip içmemeniz gerekmektedir.</p>

                </>
            ),
        },{
            title: 'Yumurta toplama işlemi ne kadar sürmektedir ?',
            content: (
                <>
                    <p>Yaklaşık yarım saat. İşlemin süresi var olan folikül sayınıza göre değişmektedir.

                    </p>

                </>
            ),
        },{
            title: 'Transfer işlemi nasıl bir işlemdir ?',
            content: (
                <>
                    <p>Transfer işlemi; embriyoloji laboratuvarında oluşturulup geliştirilen embriyolarınızın rahminize yerleştirilmesi işlemidir.

                    </p>   <p>Transfer işlemi yaklaşık 15 ile 30 dakika arası sürer. Operasyon odasında gerçekleşen bu işlem normal bir kadın doğum muayenesi gibi gerçekleşir.
                    </p> <p>Bu işlem kısaca; embriyolog tarafından ince bir katetere yüklenilen embriyolarınız doktorunuza verilir. Doktorunuz ince kateter ile rahime ulaşan yoldan geçerek, rahimde uygun gördüğü yere embriyolarınızı bırakır. Transfer aşamasında hemşireniz kasıktan ultrason ile doktorunuza ilerleyeceği yolu görebilmesinde yardımcı olur.
                    </p>

                </>
            ),
        },{
            title: 'Transfer işleminde kaç embriyo anne rahmine yerleştirilir ?',
            content: (
                <>
                    <p>Her bir transfer işleminde 1, 2 veya en fazla 3 embriyo transferi yapılmaktadır.
                    </p>
                </>
            ),
        },{
            title: 'Transfer işleminde kaç embriyonun rahme yerleştirileceğini hangi kriterler belirler ?',
            content: (
                <>
                    <p>Karar aşamasını ebeveynlerin istekleri belirlediği gibi, aynı zamanda; sağlık bakanlığının kriterleri, embriyoların kalitesi, anne rahminin kalitesi gibi faktörlerde kaç embriyonun transfer edileceğine etki eder. Bu aşamaya gelindiğinde karar verebilmenize ekip arkadaşlarımız yardımcı olacaktır.
                    </p>
                </>
            ),
        },{
            title: 'Dondurulmuş embriyolar ile transfer işlemi başarı oranımı etkiler mi ?',
            content: (
                <>
                    <p>Birçok durumda donmuş embriyo transferinin taze embriyo transferine oranla başarı şansını yükselttiği kanıtlanmış bir gerçektir.
                    </p> <p>İyi bir şekilde dondurulup saklanan embriyolar çözüldüklerinde de dondurulduğu zamandaki gibi canlılıklarına devam eder.
                    </p><p>Kliniğimizde embriyoların dondurulmasında en kaliteli ve en yeni yöntem olan <strong>‘vitrifikasyon’ yöntemi</strong>  uygulanmaktadır
                    </p><p>Dondurma-çözdürme ve saklama işlemleriniz uzman embriyologlarımız tarafından yapılıp takip edilmektedir.
                    </p>
                </>
            ),
        },{
            title: 'Transfer işlemi sonrasında hastanede dinlenme oluyor mu ?',
            content: (
                <>
                    <p>Evet. Rahminize embriyolarınız yüklendikten sonra hemşire arkadaşlarımız sizi dinlenme odasındaki yatağınıza alıp orada yaklaşık 1 saat boyunca dinlendirmektedir.
                    </p>
                </>
            ),
        },{
            title: 'Transfer işlemine girmeden önce neler yapmam gerekiyor ?',
            content: (
                <>
                    <p>Transfer işlemine gelmeden önce size duş almanızı öneriyoruz. Duştan sonra parfüm kullanmamanız tercihimizdir.
                    </p> <p>Transfer günü kullanılacak olan iğneleriniz var ise lütfen onları yanınızda getiriniz.

                    Transfere girmeden önce idrara iyice sıkışmanız gerekmektedir. Bunun için transfer saatinizden yaklaşık 1 saat önce bolca su veya bitki çayı içmenizi rica ediyoruz.
                    </p><p>Transferden önce imzalamanız gereken evraklar, hastaneye vermeniz gereken evraklar, ilaç çizelgelerinizin anlatımı ve ödeme için lütfen en az 1 buçuk saat öncesinden klinikte olunuz.
                    </p>
                </>
            ),
        },{
            title: 'Transfer işlemine girebilmek için istenilen dökümanlar nelerdir ?',
            content: (
                <>
                    <p>Transfer işlemine girmeden önce;
                    </p> <p>
                    6 ayı geçmemiş olan kan testleriniz (Bu testlerin neler olduğunu koordinatörünüzden öğrenebilirsiniz.)
                    </p><p>Covid-19 PCR veya Antijen testinizin sonucu (Test sonucunuz 24 saati geçmemelidir.)

                    Eşiniz transfer işlemine gelemeyecek ise, eşinizin transfer işlemini onayladığına dair resmi belge. (Bu belgenin kabul şartlarını koordinatörünüzden öğrenebilirsiniz.)
                    </p><p>Ödeme ücretiniz (Lütfen işleminiz için ücretin ne olduğunu koordinatörünüze danışınız).
                </p>
                </>
            ),
        },{
            title: 'Hamilelik sonucum ne zaman belli olur ?',
            content: (
                <>
                    <p>Hamilelik sonucunuzu transfer işleminizden 11 gün sonra vereceğiniz Beta-HCG kan testi ile öğrenebilirsiniz.
                    </p> <p>
                    Transfer günü kliniğimize geldiğinizde hemşire hanımlar size hamilelik testinizin tam olarak ne gün yapılacağına dair gerekli bilgilendirmeyi yapacaklardır.                    </p>
                </>
            ),
        },{
            title: 'Transfer sonrası kalan embriyolar olur mu? Olursa bu embriyolara ne yapılır ?',
            content: (
                <>
                    <p>Embriyo gelişiminin son gününde embriyologlar döllenen embriyolarınızın kontrolünü yaparlar. Kontrol günü kaliteli olan embriyolarınızın bir kısmı transfer işlemi için kullanılır. Eğer kalan fazladan embriyolarınız var ise bu embriyoları dilerseniz dondurup saklayabilirsiniz.
                    </p> <p>
                    Kalan embriyolara ne yapılması gerektiğini zamanı geldiğinde görevli arkadaşlar sizinle iletişime geçerek konu hakkında sizi bilgilendirir ve karara göre ilerlenir.           </p>
                </>
            ),
        },{
            title: 'Transfer sonrası nelere dikkat edilmelidir ?',
            content: (
                <>
                    <p>Transfer sonrasında bilimsel çalışmalar, normal hayata dönülmesi gerektiğini söylemektedir. Biz yine de size gebelik testine kadar cinsel ilişkiden ve ağır sporlardan uzak durmanızı önermekteyiz.
                    </p>
                </>
            ),
        },{
            title: 'Transferden ne kadar bir süre sonra ülkeme dönüş yapabilirim ?',
            content: (
                <>
                    <p>Transferden sonra ülkenize dönmenizde hiçbir sakınca görülmemektedir. Eğer vaktiniz var ise sizlere transfer gününü Kıbrıs’ta geçirdikten sonra dönüş yapmanızı tavsiye ediyoruz.
                    </p>
                </>
            ),
        },{
            title: 'Transfer işleminde narkoz almam (bayıltılmam) gerekiyor mu ?',
            content: (
                <>
                    <p>Transfer işleminde narkoz almanızı gerektiren herhangi bir durum olmadığı sürece bayıltma yapılmamaktadır. Bunun bilgisi size transferinizden önce verilmektedir.
                    </p>
                </>
            ),
        },{
            title: 'Tüp bebek tedavisinde bebeğin cinsiyetini transfer işleminden önce bilebilmek mümkün mü ?',
            content: (
                <>
                    <p>Evet. Cinsiyet belirleme işlemi embriyolardan alınan bir kısım hücrelerin genetiğe gönderilmesi ile belirlenebilmektedir. Çıkan sonuca göre istediğiniz cinsiyetteki embriyo size transfer edilebilir. Ancak bu işlemin birçok ülkede etik ve kanuni nedenlerden dolayı yapılması mümkün değildir.
                    </p>
                </>
            ),
        },{
            title: 'Tüp bebek tedavisi sürecinde hastanede yatmak gereklimi ?',
            content: (
                <>
                    <p>Tüp bebek işleminde hastanede yatmak gerekli değildir.
                    </p> <p>Operasyonlarınız bittikten sonra evinize/hotelinize gidip istirahat edebilirsiniz.
                    </p>
                </>
            ),
        },{
            title: 'Hastanenizin havaalanına uzaklığı nedir ?',
            content: (
                <>
                    <p>Hastanemizin Ercan havaalanına uzaklığı 22 km, Taxi ile yaklaşık 20 dakika.


                    </p> <p>Hastanemizin Larnaka havaalanına uzaklığı 60 km, Taxi ile yaklaşık 1 saat sürmektedir.


                </p>
                </>
            ),
        },

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

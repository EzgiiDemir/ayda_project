// app/[locale]/our-team/page.tsx
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getTeamConfig } from '@/lib/api/team';

interface PageProps { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'team' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

type TeamMemberProps = {
    nameTitle: string;
    image: { src: string; alt: string };
    paragraphs: string[];
};

function TeamMember({ nameTitle, image, paragraphs }: TeamMemberProps) {
    return (
        <section className="flex flex-col items-center gap-6">
            <div className="relative w-full max-w-[600px] aspect-video mx-auto">
                <Image
                    src={image.src}
                    alt={image.alt || nameTitle}
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
                <p className="text-sm md:text-base text-ayda-pink-light font-medium text-center">
                    {nameTitle}
                </p>

                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3 text-center">
                    {paragraphs.map((p, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default async function OurTeamPage({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'team' });
    const config = await getTeamConfig(locale);

    // 1) Aynı üyeyi iki kez girilmişse ekranda tekrarı engelle
    const uniqueMembers = Array.from(
        new Map(
            (config.members || []).map((m) => [m.nameTitle.trim().toLowerCase(), m])
        ).values()
    );

    // 2) Sadece tek kaynak render et: CMS varsa onu, yoksa fallback
    const hasCMSData = uniqueMembers.length > 0;

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300">
                <Image
                    src={config.heroImage}
                    alt={t('hero.title')}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container px-4 py-5 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {config.heroPreTitle}
                </p>

                <div className="mx-auto flex flex-col gap-10 md:gap-12 max-w-5xl">
                    {hasCMSData ? (
                        uniqueMembers.map((member, i) => (
                            <TeamMember key={`${member.nameTitle}-${i}`} {...member} />
                        ))
                    ) : (
                        <StaticFallback />
                    )}
                </div>
            </div>
        </main>
    );
}

/* ------- CMS boşsa tek seferlik statik fallback; duplicate yapmaz ------- */
function StaticFallback() {
    const members: TeamMemberProps[] = [
        {
            nameTitle:
                'Ayda Tüp Bebek Takımı Direktörü &amp; Embriyoloji Lab. Sorumlusu KLİNİK EMBRİYOLOG TANYEL FELEK',
            image: {
                src: 'https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png',
                alt: 'Tanyel Felek',
            },
            paragraphs: [
                'Tanyel Felek 1991 tarihinde Kıbrıs’ta doğdu. Üniversite eğitimini Ankara’nın Gazi Üniversitesi ve Almanya’nın Johannes Gutenberg Üniversitesinde tamamladı.',
                'Mayıs 2013 yılında Almanya’nın en büyük ve en gelişmiş tüp bebek merkezlerinden biri olan Kinderwunsch Zentrum Wiesbaden’de Embriyoloji ve Androloji Laboratuvarında Embriyolog olarak çalışmaya başladı.',
                'Embriyoloğumuz Almanya’da çalıştığı dönemde Klinik Embriyoloji Master programına başvurdu. 2016 yılında Avusturalya’nın Karl Franzes Üniversitesinde Klinik Embriyoloji Master programına katıldı. Avrupa’da alanında en iyiler olarak bilinen Prof. Dr. Thomas Ebner, Prof. Dr. Markus Montag ve daha birçok önemli hocalardan master eğitimini alarak, diplomalı Klinik Embriyoloji Uzmanı olarak mesleğine devam etti.',
                'Almanya’da çalışmaya devam ederken, Kuzey Kıbrıs’ta Dr. Münür Şago’dan Embriyoloji ve Androloji laboratuvarı sorumluluğu teklifi aldı. Ülkesine dönerek Ayda Tüp Bebek ekibine katıldı.',
            ],
        },
        {
            nameTitle: 'Ayda Tüp Bebek Takımı Jinekoloji Uzmanı Op. Dr. MÜNÜR ŞAGO',
            image: {
                // buraya gerçek görselini gir, şimdilik placeholder
                src: 'https://api.aydaivf.com/uploads/1617890130_4018_org_74c04c13d4.png',
                alt: 'Op. Dr. Münür Şago',
            },
            paragraphs: [
                '1970 yılında Kıbrıs’ın Limasol şehrinde doğdu.',
                'Kadın Doğum ve Jinekoloji Uzmanlığını İstanbul Şişli Etfal Hastanesinde tamamladı.',
                '2004 yılında adaya geri döndü ve kısa sürede Kıbrıs’ta en çok tercih edilen jinekologlardan biri oldu.',
            ],
        },
    ];

    return (
        <>
            {members.map((m, i) => (
                <TeamMember key={`${m.nameTitle}-${i}`} {...m} />
            ))}
        </>
    );
}

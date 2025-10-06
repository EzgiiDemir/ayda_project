import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {
    WhyUsSection,
    WhyUsContent,
    WhyUsSubtitle,
    WhyUsHighlight
} from '@/components/sections/about/WhyUs';

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
    try {
        const t = await getTranslations({ locale, namespace: 'whyUs' });
        return {
            title: t('title', { default: 'Why Us' }),
            description: t('metaDescription', {
                default:
                    'Ayda Tüp Bebek: deneyimli ekip, ileri embriyoloji altyapısı ve etik hasta yaklaşımı.'
            })
        };
    } catch {
        return {
            title: 'Neden Biz?',
            description:
                'Ayda Tüp Bebek: deneyimli ekip, ileri embriyoloji altyapısı ve etik hasta yaklaşımı.'
        };
    }
}

export default async function WhyUsPage({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'whyUs' });

    const titleAlt = t('title', { default: 'Why Us' });

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300">
                <Image
                    src="https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg"
                    alt={titleAlt}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 py-5 md:py-10">
                <p className="text-primary-blue text-lg md:text-xl text-center uppercase font-medium mb-5 md:mb-7">
                    {t('context')}
                </p>

                <div className="flex flex-col gap-7 md:gap-10 max-w-4xl mx-auto">
                    {/* Açılış notu */}
                    <WhyUsSubtitle>
                        <WhyUsHighlight>{t('intro.highlight')}</WhyUsHighlight>
                    </WhyUsSubtitle>

                    {/* 1. Bölüm: Hakkında */}
                    <WhyUsSection title={t('sections.about.title')} icon="users">
                        <WhyUsContent content={t('sections.about.p1')} />
                        <WhyUsContent content={t('sections.about.p2')} />
                        <WhyUsContent content={t('sections.about.p3')} />
                        <WhyUsContent content={t('sections.about.p4')} />
                        <WhyUsContent content={t('sections.about.p5')} />
                        <WhyUsContent content={t('sections.about.p6')} />
                        <WhyUsContent content={t('sections.about.p7')} />
                        <WhyUsContent content={t('sections.about.p8')} />
                        <WhyUsContent content={t('sections.about.p9')} />
                        <WhyUsContent content={t('sections.about.p10')} />
                    </WhyUsSection>

                    {/* 2. Bölüm: Ekip */}
                    <WhyUsSection title={t('sections.team.title')} icon="users">
                        <WhyUsContent content={t('sections.team.p1')} />
                        <WhyUsContent
                            content={
                                <>
                                    <p className="mb-2 font-medium">
                                        {t('sections.team.embryology.title')}
                                    </p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>{t('sections.team.embryology.i1')}</li>
                                        <li>{t('sections.team.embryology.i2')}</li>
                                    </ul>
                                </>
                            }
                        />
                        <WhyUsContent
                            content={
                                <>
                                    <p className="mb-2 font-medium">
                                        {t('sections.team.gynecology.title')}
                                    </p>
                                    <ul className="list-disc ml-6 space-y-1">
                                        <li>{t('sections.team.gynecology.i1')}</li>
                                        <li>{t('sections.team.gynecology.i2')}</li>
                                        <li>{t('sections.team.gynecology.i3')}</li>
                                        <li>{t('sections.team.gynecology.i4')}</li>
                                        <li>{t('sections.team.gynecology.i5')}</li>
                                    </ul>
                                </>
                            }
                        />
                        <WhyUsContent content={t('sections.team.p2')} />
                    </WhyUsSection>

                    {/* 3. Bölüm: İşleyiş */}
                    <WhyUsSection title={t('sections.process.title')} icon="workflow">
                        <WhyUsContent content={t('sections.process.p1')} />
                        <WhyUsContent content={t('sections.process.p2')} />
                        <WhyUsContent content={t('sections.process.p3')} />
                    </WhyUsSection>

                    {/* 4. Bölüm: Elite Hastanesi */}
                    <WhyUsSection title={t('sections.hospital.title')} icon="building">
                        <WhyUsContent content={t('sections.hospital.p1')} />
                        <WhyUsContent content={t('sections.hospital.p2')} />
                        <WhyUsContent content={t('sections.hospital.p3')} />
                        <WhyUsContent content={t('sections.hospital.p4')} />
                        <WhyUsContent content={t('sections.hospital.p5')} />
                        <WhyUsContent content={t('sections.hospital.p6')} />
                    </WhyUsSection>

                    {/* 5. Bölüm: Teknolojiler */}
                    <WhyUsSection title={t('sections.tech.title')} icon="cpu">
                        <WhyUsContent content={t('sections.tech.p1')} />
                        <WhyUsContent content={t('sections.tech.p2')} />
                    </WhyUsSection>

                    {/* 6. Bölüm: Neden Ayda */}
                    <WhyUsSection title={t('sections.whyAyda.title')} icon="heart">
                        <WhyUsContent content={t('sections.whyAyda.p1')} />
                        <WhyUsContent content={t('sections.whyAyda.p2')} />
                        <WhyUsContent content={t('sections.whyAyda.p3')} />
                    </WhyUsSection>

                    {/* 7. Bölüm: Ek Fayda */}
                    <WhyUsSection title={t('sections.benefits.title')} icon="car">
                        <WhyUsContent content={t('sections.benefits.p1')} />
                    </WhyUsSection>
                </div>
            </div>
        </main>
    );
}

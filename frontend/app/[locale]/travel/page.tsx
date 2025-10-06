import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import {
    TravelSection,
    TravelContent,
    TravelSubtitle,
    TravelHighlight
} from '@/components/sections/travel/TravelSection';

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'travel' });
    return {
        title: t('title'),
        description: t('aboutCyprus.description1')
    };
}

export default async function SeyahatPage({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'travel' });

    return (
        <main className="flex-1 flex flex-col">
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300">
                <Image
                    src="https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg"
                    alt={t('title')}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 py-5 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium mb-5 md:mb-7">
                    {t('title')}
                </p>

                <div className="flex flex-col gap-7 md:gap-10 max-w-4xl mx-auto">
                    <TravelSection title={t('aboutCyprus.title')} icon="info">
                        <TravelContent content={t('aboutCyprus.description1')} />
                        <TravelContent
                            content={t.rich('aboutCyprus.description2', {
                                strong: (chunks) => <TravelHighlight>{chunks}</TravelHighlight>
                            })}
                        />
                    </TravelSection>

                    <TravelSection title={t('northCyprus.title')} icon="mapPin">
                        <TravelContent content={t('northCyprus.description1')} />
                        <TravelContent content={t('northCyprus.description2')} />
                        <TravelContent content={t('northCyprus.description3')} />
                    </TravelSection>

                    <TravelSection title={t('ourCare.title')} icon="hotel">
                        <TravelContent content={t('ourCare.description1')} />
                        <TravelContent content={t('ourCare.description2')} />
                        <TravelContent content={t('ourCare.description3')} />
                        <TravelContent content={t('ourCare.description4')} />
                    </TravelSection>

                    <TravelSection title={t('byAir.title')} icon="plane">
                        <TravelSubtitle>
                            <TravelHighlight>{t('byAir.subtitle')}</TravelHighlight>
                        </TravelSubtitle>

                        <div className="mt-4">
                            <TravelContent
                                content={
                                    <>
                                        <TravelHighlight>{t('byAir.ercan.title')}</TravelHighlight>{' '}
                                        {t('byAir.ercan.description1')}
                                    </>
                                }
                            />
                            <TravelContent content={t('byAir.ercan.description2')} />
                            <TravelContent content={t('byAir.ercan.description3')} />
                            <TravelContent content={t('byAir.ercan.description4')} />
                            <TravelContent content={t('byAir.ercan.description5')} />
                        </div>

                        <div className="mt-6">
                            <TravelContent
                                content={
                                    <>
                                        <TravelHighlight>{t('byAir.south.title')}</TravelHighlight>{' '}
                                        {t('byAir.south.description')}
                                    </>
                                }
                            />
                            <TravelSubtitle>
                                <TravelHighlight>{t('byAir.south.airportsTitle')}</TravelHighlight>
                            </TravelSubtitle>

                            <TravelContent
                                content={
                                    <>
                                        <TravelHighlight>{t('byAir.south.larnaca.title')}</TravelHighlight>
                                    </>
                                }
                            />
                            <TravelContent content={t('byAir.south.larnaca.description')} />

                            <TravelContent
                                className="mt-4"
                                content={
                                    <>
                                        <TravelHighlight>{t('byAir.south.paphos.title')}</TravelHighlight>
                                    </>
                                }
                            />
                            <TravelContent content={t('byAir.south.paphos.description')} />
                        </div>
                    </TravelSection>

                    <TravelSection title={t('bySea.title')} icon="ship">
                        <TravelContent content={t('bySea.description1')} />
                        <TravelContent content={t('bySea.description2')} />
                        <TravelContent content={t('bySea.description3')} />
                    </TravelSection>

                    <div className="mt-6 text-ayda-gray-dark text-sm md:text-base leading-relaxed">
                        <TravelContent content={t('contact.description')} />
                        <TravelContent content={t('contact.farewell')} />
                    </div>
                </div>
            </div>
        </main>
    );
}

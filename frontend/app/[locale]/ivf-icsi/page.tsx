import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getIvfIcsiConfig } from '@/lib/api/ivf-icsi';

export default async function IvfIcsiPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'ivfIcsi' });
    const config = await getIvfIcsiConfig(locale);

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <section
                aria-label="IVF-ICSI Hero"
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage: `url("${config.heroImage}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                }}
            />

            {/* Content */}
            <div className="container mx-auto max-w-4xl px-4 md:px-8 flex flex-col gap-5 py-5 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {t('pageTitle', { defaultValue: config.pageTitle })}
                </p>

                <div className="flex flex-col gap-7 md:gap-10">
                    {/* Section 1: What is IVF-ICSI */}
                    <Section title={t('section1.title')}>
                        <p>{t('section1.p1')}</p>
                        <p>{t('section1.p2')}</p>
                    </Section>

                    {/* Section 2: Who should apply */}
                    <Section title={t('section2.title')}>
                        <h3 className="font-semibold">{t('section2.women.title')}</h3>
                        <ul className="list-disc ml-[30px] space-y-1">
                            <li>{t('section2.women.item1')}</li>
                            <li>{t('section2.women.item2')}</li>
                            <li>{t('section2.women.item3')}</li>
                            <li>{t('section2.women.item4')}</li>
                            <li>{t('section2.women.item5')}</li>
                            <li>{t('section2.women.item6')}</li>
                            <li>{t('section2.women.item7')}</li>
                            <li>{t('section2.women.item8')}</li>
                        </ul>

                        <h3 className="font-semibold mt-4">{t('section2.men.title')}</h3>
                        <ul className="list-disc ml-[30px] space-y-1">
                            <li>{t('section2.men.item1')}</li>
                            <li>{t('section2.men.item2')}</li>
                            <li>{t('section2.men.item3')}</li>
                            <li>{t('section2.men.item4')}</li>
                            <li>{t('section2.men.item5')}</li>
                            <li>{t('section2.men.item6')}</li>
                            <li>{t('section2.men.item7')}</li>
                            <li>{t('section2.men.item8')}</li>
                        </ul>

                        <h3 className="font-semibold mt-4">{t('section2.general.title')}</h3>
                        <ul className="list-disc ml-[30px] space-y-1">
                            <li>{t('section2.general.item1')}</li>
                            <li>{t('section2.general.item2')}</li>
                            <li>{t('section2.general.item3')}</li>
                            <li>{t('section2.general.item4')}</li>
                        </ul>
                    </Section>

                    {/* Section 3: When to apply */}
                    <Section title={t('section3.title')}>
                        <p>{t('section3.p1')}</p>
                        <p>{t('section3.p2')}</p>
                    </Section>

                    {/* Section 4: 10 Steps */}
                    <Section title={t('section4.title')}>
                        <ul className="list-disc ml-[30px] space-y-2">
                            <li>{t('section4.step1')}</li>
                            <li>{t('section4.step2')}</li>
                            <li>{t('section4.step3')}</li>
                            <li>{t('section4.step4')}</li>
                            <li>{t('section4.step5')}</li>
                            <li>{t('section4.step6')}</li>
                            <li>{t('section4.step7')}</li>
                            <li>{t('section4.step8')}</li>
                            <li>{t('section4.step9')}</li>
                            <li>{t('section4.step10')}</li>
                        </ul>
                    </Section>
                </div>
            </div>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="flex-1 flex flex-col gap-2">
                    <h2 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-left">
                        {title}
                    </h2>
                    <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-1 text-left">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getSuccessRatesConfig } from '@/lib/api/success-rates';

export default async function OurSuccessRatesPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'successRates' });
    const config = await getSuccessRatesConfig(locale);

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300  mx-auto rounded-lg overflow-hidden">
                <Image src={config.heroImage} alt={t('hero.title')} fill className="object-cover" priority />
            </div>

            {/* Page container */}
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 md:gap-8 py-6 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {t('hero.title', { defaultValue: config.heroTitle })}
                </p>

                <div className="flex flex-col gap-8">
                    {/* First Section */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex-1 flex flex-col gap-2 text-left">
                                <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t('section1.title')}
                                </p>
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-2">
                                    <p dangerouslySetInnerHTML={{ __html: t('section1.description') }} />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <Suspense fallback={<TableSkeleton />}>
                            <div className="overflow-x-auto mt-3">
                                <figure className="table min-w-full">
                                    <table className="min-w-full border border-gray-300 text-xs md:text-sm">
                                        <thead>
                                        <tr className="bg-gray-100">
                                            <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                                <strong>{t('table.ageRange')}</strong>
                                            </th>
                                            <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                                <strong>{t('table.ivf')}</strong>
                                            </th>
                                            <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                                <strong>{t('table.spermDonation')}</strong>
                                            </th>
                                            <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                                <strong>{t('table.eggDonation')}</strong>
                                            </th>
                                            <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                                <strong>{t('table.embryoDonation')}</strong>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {config.rows.map((r) => (
                                            <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-3 border-b border-gray-300">{r.ageRange}</td>
                                                <td className="p-3 border-b border-gray-300">{r.ivf}%</td>
                                                <td className="p-3 border-b border-gray-300">{r.spermDonation}%</td>
                                                <td className="p-3 border-b border-gray-300">{r.eggDonation}%</td>
                                                <td className="p-3 border-b border-gray-300">{r.embryoDonation}%</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </figure>
                            </div>
                        </Suspense>
                    </section>

                    {/* Section 2 - Menopause */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t('section2.title')}
                                </p>
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-2 text-left">
                                    <p>{t('section2.p1')}</p>
                                    <p dangerouslySetInnerHTML={{ __html: t('section2.p2') }} />
                                    <p>{t('section2.p3')}</p>
                                    <p dangerouslySetInnerHTML={{ __html: t('section2.p4') }} />
                                    <p dangerouslySetInnerHTML={{ __html: t('section2.p5') }} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t('section3.title')}
                                </p>
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-2 text-left">
                                    <p dangerouslySetInnerHTML={{ __html: t('section3.description') }} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 - Age */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t('section4.title')}
                                </p>
                                <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-2 text-left">
                                    <p dangerouslySetInnerHTML={{ __html: t('section4.p1') }} />
                                    <p dangerouslySetInnerHTML={{ __html: t('section4.p2') }} />
                                    <p>{t('section4.p3')}</p>
                                    <p dangerouslySetInnerHTML={{ __html: t('section4.p4') }} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

function TableSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-2" />
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded mb-1" />
            ))}
        </div>
    );
}

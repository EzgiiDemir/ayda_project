// ==========================================
// app/[locale]/our-prices/page.tsx
// ==========================================
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getPricesConfig } from '@/lib/api/prices';

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'prices' });
    return {
        description: t('meta.description'),
    };
}

export default async function OurPricesPage({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'prices' });
    const config = await getPricesConfig(locale);

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300">
                <Image
                    src={config.heroImage}
                    alt="Our Prices"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container max-w-6xl mx-auto flex flex-col gap-5 py-5 md:py-10 px-4">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {config.heroPreTitle}
                </p>

                <div className="flex flex-col gap-7 md:gap-10">
                    {/* Başlık ve açıklama */}
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex-1 flex flex-col gap-2 max-w-3xl">
                            <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                {config.heroTitle}
                            </p>

                        </div>
                    </div>

                    {/* Fiyat Tablosu */}
                    <Suspense fallback={<PriceTableSkeleton />}>
                        <div className="overflow-x-auto mt-3">
                            <figure className="table min-w-full">
                                <table className="min-w-full border border-gray-300 text-xs md:text-sm">
                                    <thead>
                                    <tr className="bg-gray-100">
                                        <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                            {t('table.type')}
                                        </th>
                                        <th className="text-left p-3 border-b border-gray-300 font-semibold">
                                            {t('table.price')}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {config.items.map((row) => (
                                        <tr
                                            key={row.type}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-3 border-b border-gray-300">{row.type}</td>
                                            <td className="p-3 border-b border-gray-300">{row.price}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </figure>
                        </div>
                    </Suspense>

                    {/* Bilgilendirme Bölümü */}
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex-1 flex flex-col gap-2 max-w-3xl">
                            <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                {config.infoTitle}
                            </p>
                            <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3">
                                {config.infoParagraphs.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function PriceTableSkeleton() {
    return (
        <div className="w-full max-w-4xl mx-auto animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
    );
}

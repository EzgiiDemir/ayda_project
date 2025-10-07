import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { getPricesConfig } from '@/lib/api/prices';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'prices' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function OurPricesPage({ params }: Params) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'prices' });
    const config = await getPricesConfig(locale);

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300">
                <Image
                    src={config.heroImage}
                    alt={t('meta.title')}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="container max-w-6xl mx-auto flex flex-col gap-5 py-5 md:py-10 px-4">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {t('hero.preTitle', { defaultValue: config.heroPreTitle })}
                </p>

                <div className="flex flex-col gap-7 md:gap-10">
                    {/* Title */}
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex-1 flex flex-col gap-2 max-w-3xl">
                            <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                {t('hero.title', { defaultValue: config.heroTitle })}
                            </p>
                        </div>
                    </div>

                    {/* Price Table */}
                    <Suspense fallback={<PriceTableSkeleton />}>
                        <div className="overflow-x-auto mt-3 ">
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
                                    {config.items.map((item) => {
                                        // Çeviri varsa kullan, yoksa API'den gelen değeri kullan
                                        const itemType = t(`items.${item.id}.type`, { defaultValue: item.type });
                                        const itemPrice = t(`items.${item.id}.price`, { defaultValue: item.price });

                                        return (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-3 border-b border-gray-300">{itemType}</td>
                                                <td className="p-3 border-b border-gray-300">{itemPrice}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </figure>
                        </div>
                    </Suspense>

                    {/* Info Section */}
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex-1 flex flex-col gap-2 max-w-3xl">
                            <p className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                {t('info.title', { defaultValue: config.infoTitle })}
                            </p>
                            <div className="text-sm md:text-base text-ayda-gray-dark flex flex-col gap-3">
                                <p>{t('info.paragraphs.sperm', { defaultValue: config.infoParagraphs[0] })}</p>
                                <p>{t('info.paragraphs.egg', { defaultValue: config.infoParagraphs[1] })}</p>
                                <p>{t('info.paragraphs.urology', { defaultValue: config.infoParagraphs[2] })}</p>
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
        <div className="overflow-x-auto mt-3 animate-pulse">
            <table className="min-w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 border-b">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                    </th>
                    <th className="p-3 border-b">
                        <div className="h-4 bg-gray-200 rounded w-16" />
                    </th>
                </tr>
                </thead>
                <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                        <td className="p-3 border-b">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                        </td>
                        <td className="p-3 border-b">
                            <div className="h-4 bg-gray-200 rounded w-20" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
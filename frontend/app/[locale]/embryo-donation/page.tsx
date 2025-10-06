// app/[locale]/embryo-donation/page.tsx
import {getTranslations, setRequestLocale} from 'next-intl/server';

type PageProps = {
    params: {locale: string};
};

export default async function EmbryoDonationPage({params: {locale}}: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({locale, namespace: 'embryoDonation'});

    const hero = t.raw('hero') as {imageUrl: string; imageAlt: string};

    const section = (titleKey: string, bodyKey?: string, listKey?: string) => {
        const title = t(titleKey);
        const paragraphs = bodyKey ? (t.raw(bodyKey) as string[]) : [];
        const items = listKey ? (t.raw(listKey) as string[]) : [];
        return (
            <section className="max-w-4xl mx-auto text-ayda-gray-dark leading-relaxed">
                <h2 className="text-primary-pink text-xl md:text-2xl font-semibold mb-4 text-center">
                    {title}
                </h2>
                {paragraphs?.map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                ))}
                {items?.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2">
                        {items.map((li, i) => (
                            <li key={i}>{li}</li>
                        ))}
                    </ul>
                )}
            </section>
        );
    };

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage: `url("${hero.imageUrl}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover'
                }}
                aria-label={hero.imageAlt}
            />

            <div className="container flex flex-col gap-7 md:gap-10 py-8 md:py-12 px-4">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {t('title')}
                </p>

                {/* Nedir */}
                {section('whatIs.title', 'whatIs.paragraphs')}

                {/* Kadınlar için endikasyonlar */}
                {section('whoForWomen.title', undefined, 'whoForWomen.items')}

                {/* Ve aynı zamanda (erkek tarafı vb.) */}
                <h3 className="text-xl md:text-2xl font-semibold text-primary-pink text-center">
                    {t('whoForWomen.andAlsoTitle')}
                </h3>
                <div className="max-w-4xl mx-auto -mt-2">
                    <ul className="list-disc pl-5 space-y-2">
                        {(t.raw('whoForWomen.andAlsoItems') as string[]).map((li, i) => (
                            <li key={i}>{li}</li>
                        ))}
                    </ul>
                </div>

                {/* Benzerlik / bilgiler */}
                {section('similarity.title', 'similarity.paragraphs')}

                {/* Ayda süreci */}
                {section('processAyda.title', 'processAyda.paragraphs')}

                {/* Neden Kıbrıs */}
                {section('whyCyprus.title', 'whyCyprus.paragraphs')}

                {/* Adım adım süreç */}
                <section className="max-w-4xl mx-auto">
                    <h2 className="text-primary-pink text-xl md:text-2xl font-semibold mb-4 text-center">
                        {t('steps.title')}
                    </h2>
                    <ul className="list-decimal pl-5 space-y-2">
                        {(t.raw('steps.items') as string[]).map((li, i) => (
                            <li key={i}>{li}</li>
                        ))}
                    </ul>
                    <p className="mt-4">{t('steps.note1')}</p>
                    <p className="mt-3">{t('steps.note2')}</p>
                </section>

                {/* Sperm bankaları */}
                {section('spermBanks.title', 'spermBanks.paragraphs')}

                {/* Uygun olmayabilir */}
                {section('unsuitable.title', 'unsuitable.paragraphs')}

                {/* Ücret & dahil olanlar */}
                <section className="max-w-4xl mx-auto">
                    <h2 className="text-primary-pink text-xl md:text-2xl font-semibold mb-4 text-center">
                        {t('pricing.title')}
                    </h2>
                    <p className="mb-3">
                        {t('pricing.priceLabel')} <strong>{t('pricing.price')}</strong>
                    </p>

                    <h3 className="font-semibold mt-4 mb-2">{t('pricing.includesTitle')}</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {(t.raw('pricing.includes') as string[]).map((li, i) => (
                            <li key={i}>{li}</li>
                        ))}
                    </ul>

                    <h3 className="font-semibold mt-6 mb-2">{t('pricing.excludesTitle')}</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {(t.raw('pricing.excludes') as string[]).map((li, i) => (
                            <li key={i}>{li}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}

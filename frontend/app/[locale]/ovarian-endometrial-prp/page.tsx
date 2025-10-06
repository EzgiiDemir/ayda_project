// app/[locale]/ovarian-endometrial-prp/page.tsx
import {getTranslations, setRequestLocale} from 'next-intl/server';

type PageProps = {
    params: {locale: string};
};

export default async function PRPPage({params: {locale}}: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({locale, namespace: 'ovarianEndometrial'});
    const hero = t.raw('hero') as {imageUrl: string; imageAlt: string};

    const Section = ({
                         titleKey,
                         paragraphsKey,
                         listKey
                     }: {
        titleKey: string;
        paragraphsKey?: string;
        listKey?: string;
    }) => {
        const title = t(titleKey);
        const paragraphs = paragraphsKey ? (t.raw(paragraphsKey) as string[]) : [];
        const items = listKey ? (t.raw(listKey) as string[]) : [];
        return (
            <section className="max-w-4xl mx-auto text-ayda-gray-dark leading-relaxed">
                <h2 className="text-primary-pink text-xl md:text-2xl font-semibold mb-4 text-center">
                    {title}
                </h2>
                {paragraphs.map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                ))}
                {items.length > 0 && (
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

                {/* PRP nedir */}
                <Section titleKey="whatIs.title" paragraphsKey="whatIs.paragraphs" />

                {/* Tüp bebekte kullanım alanları */}
                <Section titleKey="ivfUse.title" paragraphsKey="ivfUse.paragraphs" />

                {/* Endometrial PRP */}
                <Section titleKey="endometrial.title" />
                <Section
                    titleKey="endometrial.benefitsTitle"
                    paragraphsKey="endometrial.benefitsParagraphs"
                />
                <Section
                    titleKey="endometrial.moreTitle"
                    paragraphsKey="endometrial.moreParagraphs"
                />

                {/* Endometrial PRP zamanlama & fiyat */}
                <section className="max-w-4xl mx-auto text-ayda-gray-dark leading-relaxed">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{t('endometrial.timingTitle')}</h3>
                    <p className="mb-2">{t('endometrial.timingText')}</p>
                    <p className="mb-4">
                        {t('endometrial.priceLabel')} <strong>{t('endometrial.price')}</strong>
                    </p>
                </section>

                {/* Ovarian PRP */}
                <Section titleKey="ovarian.title" />
                <Section
                    titleKey="ovarian.benefitsTitle"
                    paragraphsKey="ovarian.benefitsParagraphs"
                />
                <Section
                    titleKey="ovarian.detailsTitle"
                    paragraphsKey="ovarian.detailsParagraphs"
                />

                {/* Ovarian PRP ön hazırlık & fiyat */}
                <section className="max-w-4xl mx-auto text-ayda-gray-dark leading-relaxed">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{t('ovarian.pretxTitle')}</h3>
                    <p className="mb-2">{t('ovarian.pretxText')}</p>
                    <p className="mb-4">
                        {t('ovarian.priceLabel')} <strong>{t('ovarian.price')}</strong>
                    </p>
                    <p className="mb-2">{t('ovarian.afterText')}</p>
                </section>
            </div>
        </main>
    );
}

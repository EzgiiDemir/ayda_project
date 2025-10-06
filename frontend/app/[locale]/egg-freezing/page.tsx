// app/[locale]/egg-freezing/page.tsx
import {getTranslations, setRequestLocale} from 'next-intl/server';

type PageProps = {
    params: {locale: string};
};

export default async function EggFreezingPage({params: {locale}}: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({locale, namespace: 'eggFreezing'});
    const hero = t.raw('hero') as {imageUrl: string; imageAlt: string};

    const section = (titleKey: string, paragraphsKey?: string, listKey?: string) => {
        const title = t(titleKey);
        const paragraphs = paragraphsKey ? (t.raw(paragraphsKey) as string[]) : [];
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

                {/* Slogan */}
                <h4 className="text-center text-lg md:text-xl font-semibold">
                    {t('tagline')}
                </h4>

                {/* Nedir */}
                {section('whatIs.title', 'whatIs.paragraphs')}

                {/* Kimler için önemlidir */}
                {section('who.title', undefined, 'who.items')}

                {/* Bilgi notu 1 */}
                <section className="max-w-4xl mx-auto">
                    <h3 className="font-semibold text-lg md:text-xl mb-2">{t('infoNote1.title')}</h3>
                    <p>{t('infoNote1.text')}</p>
                </section>

                {/* Tedavi nasıl ilerler */}
                {section('how.title', 'how.paragraphs')}

                {/* Dondurulan yumurtalar nasıl kullanılır */}
                {section('useLater.title', 'useLater.paragraphs')}

                {/* Genel notlar */}
                {section('generalNotes.title', 'generalNotes.paragraphs')}

                {/* Bilgi notu 2 */}
                <section className="max-w-4xl mx-auto">
                    <h3 className="font-semibold text-lg md:text-xl mb-2">{t('infoNote2.title')}</h3>
                    <p>{t('infoNote2.text')}</p>
                </section>

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

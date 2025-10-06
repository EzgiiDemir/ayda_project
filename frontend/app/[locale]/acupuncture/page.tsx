// app/[locale]/acupuncture/page.tsx
import {getTranslations, setRequestLocale} from 'next-intl/server';

type PageProps = { params: { locale: string } };

export default async function AcupuncturePage({params: {locale}}: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({locale, namespace: 'acupuncture'});
    const hero = t.raw('hero') as {imageUrl: string; imageAlt: string};
    const figure = t.raw('figure') as {src: string; alt: string; srcset: string; sizes: string};

    const Section = ({
                         titleKey,
                         paragraphsKey,
                         listKey
                     }: {
        titleKey?: string;
        paragraphsKey?: string;
        listKey?: string;
    }) => {
        const title = titleKey ? t(titleKey) : null;
        const paragraphs = paragraphsKey ? (t.raw(paragraphsKey) as string[]) : [];
        const items = listKey ? (t.raw(listKey) as string[]) : [];
        return (
            <section className="max-w-4xl mx-auto text-ayda-gray-dark leading-relaxed">
                {title && (
                    <h2 className="text-primary-pink text-xl md:text-2xl font-semibold mb-4 text-center">
                        {title}
                    </h2>
                )}
                {paragraphs.map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                ))}
                {items.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2">
                        {items.map((li, i) => <li key={i}>{li}</li>)}
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

                {/* Giriş */}
                <Section paragraphsKey="intro.paragraphs" />

                {/* Görsel */}
                <figure className="image image_resized image-style-block-align-left max-w-4xl mx-auto">
                    <img
                        src={figure.src}
                        alt={figure.alt}
                        srcSet={figure.srcset}
                        sizes={figure.sizes}
                        className="w-full md:w-1/2 float-none md:float-left md:mr-6 mb-4 rounded-lg"
                    />
                </figure>

                {/* Qi açıklaması */}
                <Section paragraphsKey="qi.paragraphs" />

                {/* IVF etkileri */}
                <Section titleKey="ivfEffects.title" paragraphsKey="ivfEffects.paragraphs" />
                <Section listKey="ivfEffects.benefits" />

                {/* Yan etkiler */}
                <Section titleKey="sideEffects.title" paragraphsKey="sideEffects.paragraphs" />

                {/* Uygulama */}
                <Section titleKey="how.title" paragraphsKey="how.paragraphs" />

                {/* Ücret */}
                <section className="max-w-4xl mx-auto text-center">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{t('price.title')}</h3>
                    <p className="text-base">
                        <strong>{t('price.value')}</strong>
                    </p>
                </section>
            </div>
        </main>
    );
}

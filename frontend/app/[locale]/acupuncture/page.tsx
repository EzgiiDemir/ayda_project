// app/[locale]/acupuncture/page.tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';

type PageProps = { params: { locale: string } };

type Block =
    | { type: 'p'; value: string }
    | { type: 'ul'; items: string[] }
    | { type: 'h3'; value: string }
    | { type: 'image'; src: string; alt: string; srcset?: string; sizes?: string; className?: string };

type Section = {
    id: string;
    title?: string;
    order: number;
    isActive?: boolean;
    blocks: Block[];
};

// --- builders: literal type garanti
const P   = (value: string): Block => ({ type: 'p', value } as const);
const H3  = (value: string): Block => ({ type: 'h3', value } as const);
const UL  = (items: string[]): Block => ({ type: 'ul', items } as const);
const IMG = (args: Omit<Extract<Block, { type: 'image' }>, 'type'>): Block =>
    ({ type: 'image', ...args } as const);

export default async function AcupuncturePage({ params: { locale } }: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'acupuncture' });

    const hero = t.raw('hero') as { imageUrl: string; imageAlt: string };
    const figure = t.raw('figure') as { src: string; alt: string; srcset: string; sizes: string };

    const introParagraphs: string[] = t.raw('intro.paragraphs');
    const qiParagraphs: string[] = t.raw('qi.paragraphs');
    const ivfEffectsTitle = t('ivfEffects.title');
    const ivfEffectsParagraphs: string[] = t.raw('ivfEffects.paragraphs');
    const ivfEffectsBenefits: string[] = t.raw('ivfEffects.benefits');
    const sideEffectsTitle = t('sideEffects.title');
    const sideEffectsParagraphs: string[] = t.raw('sideEffects.paragraphs');
    const howTitle = t('how.title');
    const howParagraphs: string[] = t.raw('how.paragraphs');
    const priceTitle = t('price.title');
    const priceValue = t('price.value');

    const sections: Section[] = [
        { id: 'intro', order: 1, isActive: true, blocks: introParagraphs.map(P) },
        {
            id: 'figure',
            order: 2,
            isActive: true,
            blocks: [
                IMG({
                    src: figure.src,
                    alt: figure.alt,
                    srcset: figure.srcset,
                    sizes: figure.sizes,
                    className: 'w-full md:w-1/2 md:float-left md:mr-6 mb-4 rounded-lg',
                }),
            ],
        },
        { id: 'qi', order: 3, isActive: true, blocks: qiParagraphs.map(P) },
        {
            id: 'ivfEffects',
            title: ivfEffectsTitle,
            order: 4,
            isActive: true,
            blocks: [...ivfEffectsParagraphs.map(P), UL(ivfEffectsBenefits)],
        },
        {
            id: 'sideEffects',
            title: sideEffectsTitle,
            order: 5,
            isActive: true,
            blocks: sideEffectsParagraphs.map(P),
        },
        {
            id: 'how',
            title: howTitle,
            order: 6,
            isActive: true,
            blocks: howParagraphs.map(P),
        },
        {
            id: 'price',
            title: priceTitle,
            order: 7,
            isActive: true,
            blocks: [P(priceValue)],
        },
    ]
        .filter((s) => s.isActive !== false)
        .sort((a, b) => a.order - b.order);

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage: `url("${hero.imageUrl}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                }}
                aria-label={hero.imageAlt}
            />

            {/* item ortada, yazılar soldan */}
            <div className="container mx-auto max-w-3xl w-full px-4 flex flex-col gap-7 md:gap-10 py-8 md:py-12">
                {/* Başlık — soldan */}
                <p className="text-secondary text-lg md:text-xl uppercase font-medium text-left">
                    {t('title')}
                </p>

                <div className="flex flex-col gap-7 md:gap-10 text-sm md:text-base text-muted-foreground">
                    {sections.map((section) => (
                        <section key={section.id} className="flex flex-col gap-3">
                            {section.title ? (
                                <h2 className="text-primary-weak text-sm md:text-base capitalize font-medium text-left">
                                    {section.title}
                                </h2>
                            ) : null}

                            <div className="flex flex-col gap-2 after:content-[''] after:block after:clear-both">
                                {section.blocks.map((b, i) => {
                                    if (b.type === 'h3') {
                                        return (
                                            <h3 key={i} className="font-semibold mt-2 text-left">
                                                {b.value}
                                            </h3>
                                        );
                                    }
                                    if (b.type === 'ul') {
                                        return (
                                            <ul key={i} className="list-disc ml-[30px] space-y-1">
                                                {b.items.map((li, j) => (
                                                    <li key={j} className="text-left">
                                                        {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                    if (b.type === 'image') {
                                        return (
                                            <figure key={i} className="image image_resized image-style-block-align-left">
                                                <img
                                                    src={b.src}
                                                    alt={b.alt}
                                                    srcSet={b.srcset}
                                                    sizes={b.sizes}
                                                    className={b.className ?? 'w-full rounded-lg mb-4'}
                                                />
                                            </figure>
                                        );
                                    }
                                    // default: paragraf
                                    return (
                                        <p key={i} className="text-left">
                                            {b.value}
                                        </p>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}

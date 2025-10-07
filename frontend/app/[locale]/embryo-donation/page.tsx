import { getTranslations, setRequestLocale } from 'next-intl/server';

type PageProps = { params: { locale: string } };

type Block =
    | { type: 'p'; value: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'h3'; value: string };

type Section = {
    id: string;
    title?: string;
    order: number;
    isActive?: boolean;
    blocks: Block[];
};

const P  = (value: string): Block => ({ type: 'p', value } as const);
const UL = (items: string[]): Block => ({ type: 'ul', items } as const);
const OL = (items: string[]): Block => ({ type: 'ol', items } as const);
const H3 = (value: string): Block => ({ type: 'h3', value } as const);

export default async function EggFreezingPage({ params: { locale } }: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'eggFreezing' });

    const hero = t.raw('hero') as { imageUrl: string; imageAlt: string };

    const whatIsParagraphs: string[] = t.raw('whatIs.paragraphs');
    const whoItems: string[] = t.raw('who.items');
    const infoNote1Title = t('infoNote1.title');
    const infoNote1Text = t('infoNote1.text');
    const howParagraphs: string[] = t.raw('how.paragraphs');
    const useLaterParagraphs: string[] = t.raw('useLater.paragraphs');
    const generalNotesParagraphs: string[] = t.raw('generalNotes.paragraphs');
    const infoNote2Title = t('infoNote2.title');
    const infoNote2Text = t('infoNote2.text');

    const pricingTitle = t('pricing.title');
    const pricingPriceLabel = t('pricing.priceLabel');
    const pricingPrice = t('pricing.price');
    const pricingIncludesTitle = t('pricing.includesTitle');
    const pricingIncludes: string[] = t.raw('pricing.includes');
    const pricingExcludesTitle = t('pricing.excludesTitle');
    const pricingExcludes: string[] = t.raw('pricing.excludes');

    const sections: Section[] = [
        { id: 'whatIs', title: t('whatIs.title'), order: 1, isActive: true, blocks: whatIsParagraphs.map(P) },
        { id: 'who', title: t('who.title'), order: 2, isActive: true, blocks: [UL(whoItems)] },
        { id: 'infoNote1', title: infoNote1Title, order: 3, isActive: true, blocks: [P(infoNote1Text)] },
        { id: 'how', title: t('how.title'), order: 4, isActive: true, blocks: howParagraphs.map(P) },
        { id: 'useLater', title: t('useLater.title'), order: 5, isActive: true, blocks: useLaterParagraphs.map(P) },
        { id: 'generalNotes', title: t('generalNotes.title'), order: 6, isActive: true, blocks: generalNotesParagraphs.map(P) },
        { id: 'infoNote2', title: infoNote2Title, order: 7, isActive: true, blocks: [P(infoNote2Text)] },
        {
            id: 'pricing',
            title: pricingTitle,
            order: 8,
            isActive: true,
            blocks: [
                P(`${pricingPriceLabel} ${pricingPrice}`),
                H3(pricingIncludesTitle),
                UL(pricingIncludes),
                H3(pricingExcludesTitle),
                UL(pricingExcludes),
            ],
        },
    ]
        .filter(s => s.isActive !== false)
        .sort((a, b) => a.order - b.order);

    return (
        <main className="flex-1 flex flex-col">
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

            <div className="container mx-auto max-w-3xl w-full px-4 flex flex-col gap-6 md:gap-10 py-8 md:py-12">
                <p className="text-secondary text-lg md:text-xl uppercase font-medium text-left">
                    {t('title')}
                </p>

                <h4 className="text-left text-lg md:text-xl font-semibold">
                    {t('tagline')}
                </h4>

                <div className="flex flex-col gap-7 md:gap-10 text-sm md:text-base text-muted-foreground">
                    {sections.map(section => (
                        <section key={section.id} className="flex flex-col gap-3">
                            {section.title ? (
                                <h2 className="text-primary-weak text-sm md:text-base capitalize font-medium text-left">
                                    {section.title}
                                </h2>
                            ) : null}

                            <div className="flex flex-col gap-2">
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
                                    if (b.type === 'ol') {
                                        return (
                                            <ol key={i} className="list-decimal ml-[30px] space-y-1">
                                                {b.items.map((li, j) => (
                                                    <li key={j} className="text-left">
                                                        {li}
                                                    </li>
                                                ))}
                                            </ol>
                                        );
                                    }
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

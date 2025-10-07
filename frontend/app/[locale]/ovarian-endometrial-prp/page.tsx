import { getTranslations, setRequestLocale } from 'next-intl/server';

type PageProps = { params: { locale: string } };

type Block =
    | { type: 'p'; value: string }
    | { type: 'h3'; value: string };

type Section = {
    id: string;
    title?: string;
    order: number;
    isActive?: boolean;
    blocks: Block[];
};

const P  = (value: string): Block => ({ type: 'p', value } as const);
const H3 = (value: string): Block => ({ type: 'h3', value } as const);

export default async function PRPPage({ params: { locale } }: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'ovarianEndometrial' });

    const hero = t.raw('hero') as { imageUrl: string; imageAlt: string };

    const whatIsParagraphs: string[] = t.raw('whatIs.paragraphs');
    const ivfUseParagraphs: string[] = t.raw('ivfUse.paragraphs');

    const endoTitle = t('endometrial.title');
    const endoBenefitsTitle = t('endometrial.benefitsTitle');
    const endoBenefitsParagraphs: string[] = t.raw('endometrial.benefitsParagraphs');
    const endoMoreTitle = t('endometrial.moreTitle');
    const endoMoreParagraphs: string[] = t.raw('endometrial.moreParagraphs');
    const endoTimingTitle = t('endometrial.timingTitle');
    const endoTimingText = t('endometrial.timingText');
    const endoPriceLabel = t('endometrial.priceLabel');
    const endoPrice = t('endometrial.price');

    const ovaTitle = t('ovarian.title');
    const ovaBenefitsTitle = t('ovarian.benefitsTitle');
    const ovaBenefitsParagraphs: string[] = t.raw('ovarian.benefitsParagraphs');
    const ovaDetailsTitle = t('ovarian.detailsTitle');
    const ovaDetailsParagraphs: string[] = t.raw('ovarian.detailsParagraphs');
    const ovaPretxTitle = t('ovarian.pretxTitle');
    const ovaPretxText = t('ovarian.pretxText');
    const ovaPriceLabel = t('ovarian.priceLabel');
    const ovaPrice = t('ovarian.price');
    const ovaAfterText = t('ovarian.afterText');

    const sections: Section[] = [
        {
            id: 'whatIs',
            title: t('whatIs.title'),
            order: 1,
            isActive: true,
            blocks: whatIsParagraphs.map(P),
        },
        {
            id: 'ivfUse',
            title: t('ivfUse.title'),
            order: 2,
            isActive: true,
            blocks: ivfUseParagraphs.map(P),
        },

        // Endometrial PRP
        { id: 'endometrial.heading', title: endoTitle, order: 3, isActive: true, blocks: [] },
        {
            id: 'endometrial.benefits',
            title: endoBenefitsTitle,
            order: 4,
            isActive: true,
            blocks: endoBenefitsParagraphs.map(P),
        },
        {
            id: 'endometrial.more',
            title: endoMoreTitle,
            order: 5,
            isActive: true,
            blocks: endoMoreParagraphs.map(P),
        },
        {
            id: 'endometrial.timingPrice',
            title: endoTimingTitle,
            order: 6,
            isActive: true,
            blocks: [
                P(endoTimingText),
                P(`${endoPriceLabel} ${endoPrice}`),
            ],
        },

        { id: 'ovarian.heading', title: ovaTitle, order: 7, isActive: true, blocks: [] },
        {
            id: 'ovarian.benefits',
            title: ovaBenefitsTitle,
            order: 8,
            isActive: true,
            blocks: ovaBenefitsParagraphs.map(P),
        },
        {
            id: 'ovarian.details',
            title: ovaDetailsTitle,
            order: 9,
            isActive: true,
            blocks: ovaDetailsParagraphs.map(P),
        },
        {
            id: 'ovarian.pretxPrice',
            title: ovaPretxTitle,
            order: 10,
            isActive: true,
            blocks: [
                P(ovaPretxText),
                P(`${ovaPriceLabel} ${ovaPrice}`),
                P(ovaAfterText),
            ],
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

            <div className="container mx-auto max-w-3xl w-full px-4 flex flex-col gap-7 md:gap-10 py-8 md:py-12">
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

                            <div className="flex flex-col gap-2">
                                {section.blocks.map((b, i) => {
                                    if (b.type === 'h3') {
                                        return (
                                            <h3 key={i} className="font-semibold mt-2 text-left">
                                                {b.value}
                                            </h3>
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

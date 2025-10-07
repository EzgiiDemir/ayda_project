import { getTranslations, setRequestLocale } from 'next-intl/server';

type PageProps = { params: { locale: string } };

export async function generateMetadata({ params }: PageProps) {
    const t = await getTranslations({ locale: params.locale, namespace: 'spermDonation' });
    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        alternates: { canonical: `/${params.locale}/sperm-donation` },
    };
}

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

export default async function SpermDonationPage({ params: { locale } }: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'spermDonation' });

    const heroUrl: string = t('hero.imageUrl');
    const heroAlt: string = t('hero.imageAlt');

    const whatIsParagraphs: string[] = t.raw('whatIs.paragraphs');
    const whoItems: string[] = t.raw('who.items');
    const steps8Items: string[] = t.raw('steps8.items');
    const stayPhases: string[] = t.raw('stayInCyprus.phases');
    const remoteParagraphs: string[] = t.raw('remoteOption.paragraphs');
    const bankParagraphs: string[] = t.raw('banks.paragraphs');

    const sections: Section[] = [
        {
            id: 'whatIs',
            title: t('whatIs.title'),
            order: 1,
            isActive: true,
            blocks: whatIsParagraphs.map(P),
        },
        {
            id: 'who',
            title: t('who.title'),
            order: 2,
            isActive: true,
            blocks: [UL(whoItems)],
        },
        {
            id: 'steps8',
            title: t('steps8.title'),
            order: 3,
            isActive: true,
            blocks: [OL(steps8Items)],
        },
        {
            id: 'stayInCyprus',
            title: t('stayInCyprus.title'),
            order: 4,
            isActive: true,
            blocks: [P(t('stayInCyprus.summary')), H3(t('stayInCyprus.phasesTitle')), UL(stayPhases)],
        },
        {
            id: 'remoteOption',
            title: t('remoteOption.title'),
            order: 5,
            isActive: true,
            blocks: remoteParagraphs.map(P),
        },
        {
            id: 'banks',
            title: t('banks.title'),
            order: 6,
            isActive: true,
            blocks: bankParagraphs.map(P),
        },
        {
            id: 'pricing',
            order: 7,
            isActive: true,
            blocks: [P(t('pricing.procedure')), P(t('pricing.storage'))],
        },
    ]
        .filter((s) => s.isActive !== false)
        .sort((a, b) => a.order - b.order);

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div
                className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300"
                style={{ backgroundImage: `url(${heroUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                aria-label={heroAlt}
            />

            <div className="container mx-auto max-w-3xl w-full px-4 flex flex-col gap-5 py-5 md:py-10">
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

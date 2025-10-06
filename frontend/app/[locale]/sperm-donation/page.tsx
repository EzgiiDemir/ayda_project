// app/[locale]/sperm-donation/page.tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';

type PageProps = {
    params: { locale: string };
};

export async function generateMetadata({ params }: PageProps) {
    const t = await getTranslations({
        locale: params.locale,
        namespace: "spermDonation"
    });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: { canonical: `/${params.locale}/sperm-donation` }
    };
}

export default async function SpermDonationPage({ params: { locale } }: PageProps) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'spermDonation' });

    const heroUrl = t("hero.imageUrl");
    const heroAlt = t("hero.imageAlt");

    const whatIsParagraphs: string[] = t.raw("whatIs.paragraphs");
    const whoItems: string[] = t.raw("who.items");
    const steps8Items: string[] = t.raw("steps8.items");
    const stayPhases: string[] = t.raw("stayInCyprus.phases");
    const remoteParagraphs: string[] = t.raw("remoteOption.paragraphs");
    const bankParagraphs: string[] = t.raw("banks.paragraphs");

    return (
        <main className="flex-1 flex flex-col">
            <div
                className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300"
                style={{
                    backgroundImage: `url(${t('hero.imageUrl')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                aria-label={t('hero.imageAlt')}
            />

            {/* Body */}
            <div className="container flex flex-col gap-5 py-5 md:py-10">
                {/* Title */}
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {t("title")}
                </p>

                <div className="flex flex-col gap-7 md:gap-10 text-sm md:text-base text-ayda-gray-dark">
                    {/* WHAT IS */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h2 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t("whatIs.title")}
                                </h2>
                                <div className="flex flex-col gap-1">
                                    {whatIsParagraphs.map((p, i) => (
                                        <p key={i} className="text-ayda-gray-dark">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* WHO */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h3 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t("who.title")}
                                </h3>
                                <ul className="list-disc ml-[30px]">
                                    {whoItems.map((li, i) => (
                                        <li key={i} className="text-ayda-gray-dark">
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 8 STEPS */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h3 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t("steps8.title")}
                                </h3>
                                <ol className="list-decimal ml-[30px] space-y-1">
                                    {steps8Items.map((li, i) => (
                                        <li key={i} className="text-ayda-gray-dark">
                                            {li}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* STAY IN CYPRUS */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h3 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t("stayInCyprus.title")}
                                </h3>
                                <p className="text-ayda-gray-dark">{t("stayInCyprus.summary")}</p>
                                <p className="font-medium">{t("stayInCyprus.phasesTitle")}</p>
                                <ul className="list-disc ml-[30px] space-y-1">
                                    {stayPhases.map((li, i) => (
                                        <li key={i} className="text-ayda-gray-dark">
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* REMOTE OPTION */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h3 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t("remoteOption.title")}
                                </h3>
                                <div className="flex flex-col gap-1">
                                    {remoteParagraphs.map((p, i) => (
                                        <p key={i} className="text-ayda-gray-dark">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* BANKS */}
                    <section className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-6 items-center">
                            <div className="flex-1 flex flex-col gap-2">
                                <h3 className="text-sm md:text-base text-ayda-pink-light capitalize font-medium text-center">
                                    {t("banks.title")}
                                </h3>
                                <div className="flex flex-col gap-1">
                                    {bankParagraphs.map((p, i) => (
                                        <p key={i} className="text-ayda-gray-dark">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PRICING */}
                    <section className="flex flex-col items-center font-semibold text-sm uppercase">
                        <p>
                            <strong>{t("pricing.procedure")}</strong>
                        </p>
                        <p>
                            <strong>{t("pricing.storage")}</strong>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}

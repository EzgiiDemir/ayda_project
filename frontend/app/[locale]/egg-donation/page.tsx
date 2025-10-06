import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "eggDonation" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function EggDonationPage({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: "eggDonation" });

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage:
                        "url('https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                }}
            />

            {/* İçerik */}
            <div className="container flex flex-col gap-5 py-5 md:py-10">
                <p className="text-ayda-blue text-lg md:text-xl text-center uppercase font-medium">
                    {t("title")}
                </p>

                {/* 1. Bölüm */}
                <section className="flex flex-col gap-3">
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex-1 flex flex-col gap-2 text-ayda-gray-dark text-sm md:text-base">
                            <p className="text-ayda-pink-light font-medium text-center capitalize">
                                {t("whatIs.title")}
                            </p>
                            <div className="flex flex-col gap-2">
                                <p>{t("whatIs.paragraph1")}</p>
                                <p>{t("whatIs.paragraph2")}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Bölüm */}
                <section className="flex flex-col gap-3">
                    <p className="text-ayda-pink-light font-medium text-center capitalize">
                        {t("who.title")}
                    </p>
                    <ul className="list-disc ml-[30px] text-ayda-gray-dark text-sm md:text-base flex flex-col gap-2">
                        {t.raw("who.items").map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                {/* 3. Bölüm */}
                <section className="flex flex-col gap-3">
                    <p className="text-ayda-pink-light font-medium text-center capitalize">
                        {t("why.title")}
                    </p>
                    <p className="text-ayda-gray-dark text-sm md:text-base">
                        {t("why.paragraph")}
                    </p>
                </section>
            </div>
        </main>
    );
}

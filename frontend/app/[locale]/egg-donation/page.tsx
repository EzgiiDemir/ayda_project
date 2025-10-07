import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Section, Block } from "@/types/page";
import { p, ul } from "@/lib/blocks";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "eggDonation" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function EggDonationPage({ params }: Params) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "eggDonation" });
    const whoItems = t.raw("who.items") as string[];

    const sections: Section[] = [
        {
            id: "whatIs",
            title: t("whatIs.title"),
            order: 1,
            isActive: true,
            blocks: [p(t("whatIs.paragraph1")), p(t("whatIs.paragraph2"))],
        },
        {
            id: "who",
            title: t("who.title"),
            order: 2,
            isActive: true,
            blocks: [ul(whoItems ?? [])],
        },
        {
            id: "why",
            title: t("why.title"),
            order: 3,
            isActive: true,
            blocks: [p(t("why.paragraph"))],
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
                    backgroundImage:
                        "url('https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                }}
            />

            {/* item ortada, yazılar soldan */}
            <div className="container mx-auto max-w-3xl w-full px-4 flex flex-col gap-5 py-5 md:py-10">
                <p className="text-secondary text-lg md:text-xl font-medium uppercase text-left">
                    {t("title")}
                </p>

                <div className="flex flex-col gap-7 md:gap-10">
                    {sections.map((section) => (
                        <section key={section.id} className="flex flex-col gap-3">
                            <p className="text-primary-weak font-medium capitalize text-left">
                                {section.title}
                            </p>

                            <div className="text-sm md:text-base text-muted-foreground flex flex-col gap-2">
                                {section.blocks.map((b: Block, idx) => {
                                    switch (b.type) {
                                        case "p":
                                            return (
                                                <p key={idx} className="text-left">
                                                    {b.value}
                                                </p>
                                            );
                                        case "h3":
                                            return (
                                                <h3 key={idx} className="font-semibold mt-2 text-left">
                                                    {b.value}
                                                </h3>
                                            );
                                        case "ul":
                                            return (
                                                <ul
                                                    key={idx}
                                                    className="list-disc ml-[30px] flex flex-col gap-2"
                                                >
                                                    {b.items.map((it, i) => (
                                                        <li key={i} className="text-left">
                                                            {it}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        case "ol":
                                            return (
                                                <ol
                                                    key={idx}
                                                    className="list-decimal ml-[30px] space-y-1"
                                                >
                                                    {b.items.map((it, i) => (
                                                        <li key={i} className="text-left">
                                                            {it}
                                                        </li>
                                                    ))}
                                                </ol>
                                            );
                                        case "image":
                                            return (
                                                <img
                                                    key={idx}
                                                    src={b.url}
                                                    alt={b.alt ?? ""}
                                                    className="rounded-lg"
                                                />
                                            );
                                        default: {
                                            const _exhaustive: never = b;
                                            return _exhaustive;
                                        }
                                    }
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}

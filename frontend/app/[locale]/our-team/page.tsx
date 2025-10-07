// app/[locale]/our-team/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { getTeamConfig } from '@/lib/api/team';
import TeamMember from '@/components/team/TeamMember';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale } = await params; // ✅ Next 15
    const t = await getTranslations({ locale, namespace: 'team' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function OurTeamPage({ params }: Params) {
    const { locale } = await params; // ✅ Next 15
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'team' });
    const config = await getTeamConfig(locale);

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300">
                <Image
                    src={config.heroImage}
                    alt={t('hero.title')}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="px-4 py-5 md:py-10">
                <p className="text-primary-blue text-lg md:text-xl text-center uppercase font-medium">
                    {t('hero.preTitle', { defaultValue: config.heroPreTitle })}
                </p>

                <div className="mx-auto flex flex-col gap-10 md:gap-12 max-w-5xl">
                    <Suspense fallback={<TeamSkeleton />}>
                        {(config.members ?? []).map((member) => {
                            const translatedNameTitle = t(`members.${member.id}.nameTitle`, {
                                defaultValue: member.nameTitle,
                            });
                            const translatedParagraphs = (member.paragraphs ?? []).map((p, i) =>
                                t(`members.${member.id}.paragraphs.${i}`, { defaultValue: p })
                            );

                            return (
                                <TeamMember
                                    key={member.id}
                                    nameTitle={translatedNameTitle}
                                    image={member.image}
                                    imageAlt={member.imageAlt}
                                    paragraphs={translatedParagraphs}
                                />
                            );
                        })}
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

function TeamSkeleton() {
    return (
        <div className="flex flex-col gap-10 animate-pulse">
            {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-6">
                    <div className="w-full max-w-[600px] aspect-video bg-gray-200 rounded" />
                    <div className="w-full max-w-3xl space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
                    </div>
                </div>
            ))}
        </div>
    );
}

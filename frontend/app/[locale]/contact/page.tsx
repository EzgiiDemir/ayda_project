import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import ContactForm from '@/components/sections/contact/ContactForm';
import { getContactConfig } from '@/lib/api/contact';

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'contact' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function ContactPage({ params }: Params) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'contact' });
    const config = await getContactConfig(locale);

    const heroImage = config.heroImage || '/images/placeholder-hero.jpg';

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] bg-gray-300">
                <Image
                    src={config.heroImage}
                    alt="Contact"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5 py-5 md:py-10 bg-white">
                <div>
                    <p className="text-xs md:text-base text-primary-pink uppercase text-center font-medium">
                        {t('hero.preTitle')}
                    </p>
                    <p className="text-ayda-black capitalize text-2xl md:text-4xl font-medium text-center">
                        {t('hero.title')}
                    </p>
                </div>

                <Suspense fallback={<ContactFormSkeleton />}>
                    <ContactForm
                        locale={locale}
                        subjects={config.form.subjects}
                        apiEndpoint={config.form.apiEndpoint}
                    />
                </Suspense>
            </div>
        </main>
    );
}

function ContactFormSkeleton() {
    return (
        <div className="w-full flex justify-center px-4 py-8">
            <div className="w-full max-w-3xl animate-pulse">
                <div className="flex flex-col md:flex-row md:gap-4 w-full mb-6">
                    <div className="flex-1 h-20 bg-gray-200 rounded-md" />
                    <div className="flex-1 h-20 bg-gray-200 rounded-md" />
                </div>
                <div className="h-20 bg-gray-200 rounded-md mb-6" />
                <div className="h-48 bg-gray-200 rounded-md mb-6" />
                <div className="h-12 bg-gray-200 rounded-full w-32 mx-auto" />
            </div>
        </div>
    );
}

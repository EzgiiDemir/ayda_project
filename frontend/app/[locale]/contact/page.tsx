import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/sections/contact/ContactForm';

interface PageProps {
    params: { locale: string };
}

export default async function ContactPage({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'contact' });

    const preTitle = t('hero.preTitle', { fallback: 'Aşağıdaki formu doldurarak' });
    const title = t('hero.title', { fallback: 'bizimle iletişime geçebilirsiniz' });
    const heroImage = t('hero.image', {
        fallback: 'https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg'
    }) as string;

    return (
        <main className="flex-1 flex flex-col">
            <div className="">
                <div
                    className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                    style={{
                        backgroundImage: `url("${heroImage}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                />
            </div>

            <div className="container flex flex-col gap-5 py-5 md:py-10">
                <div>
                    <p className="text-xs md:text-base text-primary-pink uppercase text-center font-medium">
                        {preTitle}
                    </p>
                    <p className="text-ayda-black capitalize text-2xl md:text-4xl font-medium text-center">
                        {title}
                    </p>
                </div>

                <ContactForm locale={locale} />
            </div>
        </main>
    );
}

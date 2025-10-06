import { getTranslations } from 'next-intl/server';
import { getFAQConfig } from '@/lib/api/faq';
import FAQItem from './FAQItem';

export default async function FAQAccordion({ locale }: { locale: string }) {
    const t = await getTranslations('faq');
    const config = await getFAQConfig(locale);

    return (
        <section className="w-full py-5 md:py-10">
            {/* 👇 max genişlik + otomatik yatay merkezleme */}
            <div className="container mx-auto flex flex-col items-center gap-5">
                {/*{config.title && (*/}
                {/*    <h1 className="text-2xl md:text-3xl font-bold text-center text-primary-blue mb-2">*/}
                {/*        {t('title', { defaultValue: config.title })}*/}
                {/*    </h1>*/}
                {/*)}*/}
                {/*{config.subtitle && (*/}
                {/*    <p className="text-center text-gray-600 mb-6">*/}
                {/*        {t('subtitle', { defaultValue: config.subtitle })}*/}
                {/*    </p>*/}
                {/*)}*/}

                {/* 👇 tam genişlikte liste */}
                <div className="flex w-full flex-col gap-4">
                    {config.faqs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faqId={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

import { getTranslations } from 'next-intl/server';
import { getFAQConfig } from '@/lib/api/faq';
import FAQItem from './FAQItem';

export default async function FAQAccordion({ locale }: { locale: string }) {
    const t = await getTranslations('faq');
    const config = await getFAQConfig(locale);

    return (
        <section className="w-full py-5 md:py-10 container mx-auto">
            <div className="container mx-auto flex flex-col items-center gap-5">
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

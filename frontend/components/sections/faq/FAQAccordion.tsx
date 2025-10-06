'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    order: number;
}

interface FAQConfig {
    title: string;
    faqs: FAQItem[];
}

const defaultConfig: FAQConfig = {
    title: '',
    faqs: [],
};

export default function FAQAccordion() {
    const t = useTranslations('faq');
    const [config, setConfig] = useState<FAQConfig>(defaultConfig);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const params = useParams();
    const locale = (params?.locale as string) || 'tr';

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/faq`,
                    { params: { locale } }
                );

                setConfig({
                    title: response.data.title || defaultConfig.title,
                    faqs:
                        response.data.faqs?.sort(
                            (a: FAQItem, b: FAQItem) => a.order - b.order
                        ) || defaultConfig.faqs,
                });
            } catch (error) {
                console.error('FAQ fetch failed, using defaultConfig:', error);
                setConfig(defaultConfig);
            }
        };

        fetchConfig();
    }, [locale]);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    {
        return (
            <div className="w-full flex justify-center py-5 md:py-10">
                <div className="w-full max-w-3xl flex flex-col gap-5">
                    {/* Accordion list */}
                    {config.faqs.map((faq, index) => {
                        const question = t(`items.${faq.id}.question`, {
                            defaultMessage: faq.question,
                        });
                        const answer = t(`items.${faq.id}.answer`, {
                            defaultMessage: faq.answer,
                        });

                        return (
                            <div
                                key={faq.id}
                                className="border p-4 md:p-6 rounded-md border-primary-blue transition-all duration-300"
                            >
                                {/* Header */}
                                <div
                                    className="flex items-center justify-between gap-3 cursor-pointer"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <p className="text-left text-base md:text-lg text-primary-pink-light font-medium">
                                        {question}
                                    </p>
                                    <div className="w-10 h-10 rounded-md bg-primary-pink p-2 hover:bg-primary-blue transition-all duration-300 flex justify-center items-center">
                                        <ChevronDown
                                            className={`text-white transition-transform duration-300 ${
                                                openIndex === index ? "rotate-180" : "rotate-0"
                                            }`}
                                            size={28} // ikon büyütüldü
                                        />
                                    </div>
                                </div>

                                {/* Answer */}
                                <div
                                    ref={(el) => {
                                        contentRefs.current[index] = el;
                                    }}
                                    className="text-left text-sm md:text-base text-gray-700 overflow-hidden transition-[max-height] duration-300"
                                    style={{
                                        maxHeight:
                                            openIndex === index
                                                ? `${contentRefs.current[index]?.scrollHeight}px`
                                                : "0px",
                                    }}
                                >
                                    <div
                                        className="pt-2"
                                        dangerouslySetInnerHTML={{ __html: answer }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }  }
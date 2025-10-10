'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowDown   } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FAQItemProps {
    faqId: string;
    question: string;
    answer: string;
}

export default function FAQItem({ faqId, question, answer }: FAQItemProps) {
    const t = useTranslations('faq');
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const translatedQuestion = t(`items.${faqId}.question`, { defaultValue: question });
    const translatedAnswer = t(`items.${faqId}.answer`, { defaultValue: answer });

    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        } else if (contentRef.current) {
            contentRef.current.style.maxHeight = '0px';
        }
    }, [isOpen]);

    return (
        <div className="w-full border p-4 md:p-6 rounded-md border-primary-blue transition-all duration-300 container mx-auto">
            <button
                className="flex items-center justify-between gap-3 cursor-pointer w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                type="button"
            >
                <p className="text-base md:text-lg text-primary-pink-light font-medium">
                    {translatedQuestion}
                </p>
                <div className="w-10 h-10 rounded-md bg-primary-pink p-2 hover:bg-primary-blue transition-all duration-300 flex justify-center items-center flex-shrink-0">
                    <ArrowDown
                        className={`text-white transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        size={24}
                    />
                </div>
            </button>

            <div
                ref={contentRef}
                className="text-left text-sm md:text-base text-gray-700 overflow-hidden transition-all duration-300"
                style={{ maxHeight: '0px' }}
            >
                <div
                    className="pt-4"
                    dangerouslySetInnerHTML={{ __html: translatedAnswer }}
                />
            </div>
        </div>
    );
}

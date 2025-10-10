import { Suspense } from 'react';
import Image from 'next/image';
import { getFAQConfig } from '@/lib/api/faq';
import FAQAccordion from "@/components/sections/faq/FAQAccordion";

// FAQPage.tsx
export default async function FAQPage({ params: { locale } }: { params: { locale: string } }) {
    const config = await getFAQConfig(locale);

    return (
        <main className="flex-1 flex flex-col">
            {config.heroImage && (
                <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]">
                    <Image src={config.heroImage} alt="FAQ Hero" fill className="object-cover" priority />
                </div>
            )}

            {/* 👇 container içinde TEK bir merkezleyici kutu */}
            <div className="py-5 md:py-10 container mx-auto">
                <div className="container mx-auto max-w-7xl ">
                    <Suspense fallback={<FAQSkeleton />}>
                        <FAQAccordion locale={locale} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

function FAQSkeleton() {
    return (
        <div className="w-full max-w-3xl mx-auto animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border p-6 rounded-md mb-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                </div>
            ))}
        </div>
    );
}

// app/[locale]/acupuncture/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function AcupuncturePage() {
    const params = useParams();
    const locale = params.locale as string;
    const [pageData, setPageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPage();
    }, [locale]);

    const loadPage = async () => {
        try {
            const response = await axios.get(`${API_URL}/public/pages/acupuncture`, {
                params: { locale }
            });
            setPageData(response.data.data);
        } catch (err: any) {
            console.error('Failed to load page:', err);
            setError('Failed to load page');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !pageData) {
        return <div className="text-center py-12 text-red-600">{error}</div>;
    }

    const content = pageData.content;

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero - Static image için şimdilik */}
            <div
                className="bg-gray-300 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]"
                style={{
                    backgroundImage: `url("https://api.aydaivf.com/uploads/elitebig_7bc1166778.jpg")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="container mx-auto max-w-3xl w-full px-4 flex flex-col gap-7 md:gap-10 py-8 md:py-12">
                <p className="text-secondary text-lg md:text-xl uppercase font-medium">
                    {content?.title}
                </p>

                <div
                    className="text-sm md:text-base text-muted-foreground prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content?.description || '' }}
                />
            </div>
        </main>
    );
}
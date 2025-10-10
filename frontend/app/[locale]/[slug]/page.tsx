'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface PageContent {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    hero_image?: string;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
}

interface ComponentData {
    id: number;
    name: string;
    type: string;
    order: number;
    data: Record<string, any>;
}

interface PageData {
    page: {
        id: number;
        slug: string;
        template: string;
    };
    content: PageContent;
    components: ComponentData[];
}

export default function DynamicPage() {
    const params = useParams();
    const locale = params.locale as string;
    const slug = params.slug as string;

    const [pageData, setPageData] = useState<PageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPage();
    }, [locale, slug]);

    const loadPage = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(`${API_URL}/public/pages/${slug}`, {
                params: { locale }
            });

            if (response.data.success) {
                console.log('Page data:', response.data.data); // ← DEBUG
                setPageData(response.data.data);
            } else {
                setError('Page not found');
            }
        } catch (err: any) {
            console.error('Failed to load page:', err);
            setError(err.response?.data?.message || 'Failed to load page');
        } finally {
            setIsLoading(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Error state
    if (error || !pageData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
                    <p className="text-gray-600">{error || 'Page not found'}</p>
                </div>
            </div>
        );
    }

    const { content, components } = pageData;

    return (
        <main className="flex-1 flex flex-col">
            {/* Hero Section - Resimli veya Gradient */}
            {content.hero_image ? (
                // Resim varsa göster
                <div className="relative w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px]">
                    <Image
                        src={content.hero_image}
                        alt={content.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay with text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            {content.subtitle && (
                                <p className="text-xl md:text-2xl opacity-90">
                                    {content.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // Resim yoksa gradient
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full aspect-[16/7] md:aspect-[16/5] max-h-[400px] flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {content.title}
                        </h1>
                        {content.subtitle && (
                            <p className="text-xl md:text-2xl opacity-90">
                                {content.subtitle}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="container flex flex-col gap-5 py-5 px-4 md:px-40 md:py-10">
                {/* Sayfa İçeriği */}
                {content.description && (
                    <div
                        className="prose prose-lg max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: content.description }}
                    />
                )}

                {/* Components (Dinamik Bölümler) */}
                {components.length > 0 && (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">
                            Additional Content
                        </h2>
                        {components.map((component) => (
                            <div
                                key={component.id}
                                className="bg-white rounded-lg shadow-sm border p-6"
                            >
                                <h3 className="text-xl font-semibold mb-4">
                                    {component.name}
                                </h3>
                                <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
                                    {JSON.stringify(component.data, null, 2)}
                                </pre>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TreatmentMethods from '@/components/sections/TreatmentMethods';
import Welcome from "@/components/sections/Welcome";
import ContactMap from "@/components/sections/ContactMap";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function DynamicPage() {
    const params = useParams();
    const locale = params.locale as string;
    const slug = params.slug as string || 'home';

    const [pageData, setPageData] = useState<any>(null);
    const [navbar, setNavbar] = useState<any>(null);
    const [footer, setFooter] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPageData();
    }, [locale, slug]);

    const loadPageData = async () => {
        try {
            // Paralel olarak tüm verileri çek
            const [pageRes, navbarRes, footerRes] = await Promise.all([
                axios.get(`${API_URL}/public/pages/${slug}`, { params: { locale } }),
                axios.get(`${API_URL}/public/components/navbar`, { params: { locale } }),
                axios.get(`${API_URL}/public/components/footer`, { params: { locale } }),
            ]);

            setPageData(pageRes.data.data);
            setNavbar(navbarRes.data.data);
            setFooter(footerRes.data.data);
        } catch (err: any) {
            console.error('Failed to load page:', err);
            setError(err.response?.status === 404 ? 'Page not found' : 'Error loading page');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error || !pageData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-8">{error || 'Page not found'}</p>
                    <a href={`/${locale}`} className="text-blue-600 hover:underline">
                        Go back home
                    </a>
                </div>
            </div>
        );
    }

    const content = pageData.content;

    // Component mapper
    const renderComponent = (component: any) => {
        const componentMap: Record<string, any> = {
            'hero': Hero,
            'welcome': Welcome,
            'treatment-methods': TreatmentMethods,
            'contact-map': ContactMap,
            // Diğer componentler...
        };

        const ComponentToRender = componentMap[component.name];

        if (!ComponentToRender) {
            return (
                <div className="bg-yellow-50 border border-yellow-200 p-4 my-4">
                    <p className="text-sm text-yellow-800">
                        Component "{component.name}" not found. Please create it in components folder.
                    </p>
                    <pre className="mt-2 text-xs">{JSON.stringify(component.data, null, 2)}</pre>
                </div>
            );
        }

        return <ComponentToRender key={component.id} data={component.data} locale={locale} />;
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            {navbar && <Navbar data={navbar} locale={locale} />}

            {/* Page Components */}
            {pageData.components?.map((component: any) => renderComponent(component))}

            {/* Default Content if no components */}
            {(!pageData.components || pageData.components.length === 0) && (
                <main className="flex-1 container mx-auto px-4 py-16">
                    <article className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {content?.title}
                        </h1>

                        {content?.subtitle && (
                            <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
                                {content.subtitle}
                            </h2>
                        )}

                        {content?.description && (
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: content.description }}
                            />
                        )}

                        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900">
                                💡 <strong>Admin Tip:</strong> Add components to this page from the admin panel
                                to create a rich layout (Hero, Features, Contact Form, etc.)
                            </p>
                        </div>
                    </article>
                </main>
            )}

            {/* Footer */}
            {footer && <Footer data={footer} locale={locale} />}
        </div>
    );
}
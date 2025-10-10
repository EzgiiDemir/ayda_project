'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { componentService } from '@/lib/services/component.service';

export default function ComponentEditRouter() {
    const params = useParams();
    const router = useRouter();
    const componentId = parseInt(params.id as string);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAndRedirect();
    }, [componentId]);

    const loadAndRedirect = async () => {
        try {
            const component = await componentService.getById(componentId);

            const componentName = component.name.toLowerCase();

            if (componentName === 'navbar') {
                router.replace('/admin/configs/navbar');
            } else if (componentName === 'footer') {
                router.replace('/admin/configs/footer');
            } else if (componentName === 'hero') {
                router.replace('/admin/configs/hero');
            } else if (componentName === 'welcome') {
                router.replace('/admin/configs/welcome');
            } else if (componentName === 'treatments') {
                router.replace('/admin/configs/treatments');
            } else if (componentName === 'faq') {
                router.replace('/admin/configs/faq');
            } else {
                // Diğer component'ler için JSON editor
                router.replace(`/admin/components/${componentId}/edit-json`);
            }
        } catch (error) {
            console.error('Failed to load component:', error);
            alert('Failed to load component');
            router.push('/admin/components');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-gray-600">Redirecting to editor...</p>
            </div>
        );
    }

    return null;
}
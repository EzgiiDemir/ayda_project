'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth.store';
import { pageService } from '@/lib/services/page.service';
import { componentService } from '@/lib/services/component.service';
import { mediaService } from '@/lib/services/media.service';
import { FileText, Component as ComponentIcon, Image, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const [stats, setStats] = useState({
        totalPages: 0,
        totalComponents: 0,
        totalMedia: 0,
        activePages: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [pages, components, media] = await Promise.all([
                pageService.getAll(),
                componentService.getAll(),
                mediaService.getAll({ per_page: 1 }),
            ]);

            setStats({
                totalPages: pages.length,
                totalComponents: components.length,
                totalMedia: media.total,
                activePages: pages.filter((p: { is_active: any; }) => p.is_active).length,
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const statCards = [
        {
            name: 'Total Pages',
            value: stats.totalPages,
            icon: FileText,
            color: 'bg-blue-500',
            href: '/admin/pages',
        },
        {
            name: 'Components',
            value: stats.totalComponents,
            icon: ComponentIcon,
            color: 'bg-green-500',
            href: '/admin/components',
        },
        {
            name: 'Media Files',
            value: stats.totalMedia,
            icon: Image,
            color: 'bg-purple-500',
            href: '/admin/media',
        },
        {
            name: 'Active Pages',
            value: stats.activePages,
            icon: TrendingUp,
            color: 'bg-orange-500',
            href: '/admin/pages?status=active',
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 container mx-auto">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600 mt-1">Here's what's happening with your website today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="text-white" size={24} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/pages/create"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <FileText className="text-blue-600" size={24} />
                        <div>
                            <p className="font-medium text-gray-900">Create New Page</p>
                            <p className="text-sm text-gray-600">Add a new page to your website</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/components/create"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                    >
                        <ComponentIcon className="text-green-600" size={24} />
                        <div>
                            <p className="font-medium text-gray-900">Create Component</p>
                            <p className="text-sm text-gray-600">Build a reusable component</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/media"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                    >
                        <Image className="text-purple-600" size={24} />
                        <div>
                            <p className="font-medium text-gray-900">Upload Media</p>
                            <p className="text-sm text-gray-600">Add images and files</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* System Info */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Ayda IVF CMS</h2>
                <p className="text-blue-100">
                    Version 1.0.0 • Role: <span className="font-semibold capitalize">{user?.role.replace('_', ' ')}</span>
                </p>
                <div className="mt-4 flex gap-4 text-sm">
                    <div>
                        <p className="text-blue-100">Backend</p>
                        <p className="font-semibold">Laravel 12</p>
                    </div>
                    <div>
                        <p className="text-blue-100">Frontend</p>
                        <p className="font-semibold">Next.js 15</p>
                    </div>
                    <div>
                        <p className="text-blue-100">Database</p>
                        <p className="font-semibold">MySQL</p>
                    </div> <div>
                        <p className="text-blue-100">Css</p>
                        <p className="font-semibold">Tailwindcss</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
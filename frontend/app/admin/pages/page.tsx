'use client';

import { useEffect, useState } from 'react';
import { pageService, Page } from '@/lib/services/page.service';
import { useAuthStore } from '@/lib/stores/auth.store';
import Link from 'next/link';
import { Plus, Edit, Trash2, Copy, Eye, EyeOff, Home, Search, Filter } from 'lucide-react';

export default function PagesListPage() {
    const { isAdmin } = useAuthStore();
    const [pages, setPages] = useState<Page[]>([]);
    const [filteredPages, setFilteredPages] = useState<Page[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [currentLocale, setCurrentLocale] = useState<'tr' | 'en'>('tr');

    useEffect(() => {
        loadPages();
    }, [currentLocale]); // currentLocale değişince yeniden yükle

    useEffect(() => {
        filterPages();
    }, [pages, searchQuery, statusFilter]);

    const loadPages = async () => {
        setIsLoading(true);
        try {
            // ✅ Locale parametresini gönder
            const data = await pageService.getAll({ locale: currentLocale });
            console.log('Loaded pages:', data); // Debug için
            setPages(data);
        } catch (error) {
            console.error('Failed to load pages:', error);
            alert('Failed to load pages. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    const filterPages = () => {
        let filtered = pages;

        // Status filter
        if (statusFilter === 'active') {
            filtered = filtered.filter((p) => p.is_active);
        } else if (statusFilter === 'inactive') {
            filtered = filtered.filter((p) => !p.is_active);
        }

        // Search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter((p) => {
                // ✅ contents array'den currentLocale'e göre filtrele
                const content = p.contents?.find(c => c.locale === currentLocale);
                return (
                    p.slug.toLowerCase().includes(q) ||
                    (content?.title?.toLowerCase?.().includes(q) ?? false)
                );
            });
        }

        setFilteredPages(filtered);
    };

    const handleDuplicate = async (id: number) => {
        if (!confirm('Are you sure you want to duplicate this page?')) return;
        try {
            await pageService.duplicate(id);
            loadPages();
        } catch (error) {
            console.error('Failed to duplicate page:', error);
            alert('Failed to duplicate page');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this page? This action cannot be undone.')) return;
        try {
            await pageService.delete(id);
            loadPages();
        } catch (error: any) {
            console.error('Failed to delete page:', error);
            const msg = error?.response?.data?.message || 'Failed to delete page';
            alert(msg);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
                    <p className="text-gray-600 mt-1">Manage your website pages</p>
                </div>
                {isAdmin() && (
                    <Link
                        href="/admin/pages/create"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={20} />
                        <span>Create Page</span>
                    </Link>
                )}
            </div>

            {/* Language Selector */}
            <div className="flex gap-2">
                <button
                    onClick={() => setCurrentLocale('tr')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentLocale === 'tr'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    🇹🇷 Turkish
                </button>
                <button
                    onClick={() => setCurrentLocale('en')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentLocale === 'en'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    🇬🇧 English
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Pages List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Page
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Template
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {filteredPages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    {pages.length === 0 ? 'No pages found in database' : 'No pages match your filters'}
                                </td>
                            </tr>
                        ) : (
                            filteredPages.map((page) => {
                                // ✅ currentLocale'e göre içeriği bul
                                const content = page.contents?.find(c => c.locale === currentLocale);
                                return (
                                    <tr key={page.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {page.is_homepage && <Home size={16} className="text-blue-600" title="Homepage" />}
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {content?.title || 'Untitled'}
                                                    </p>
                                                    {content?.subtitle && (
                                                        <p className="text-sm text-gray-500">{content.subtitle}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">/{page.slug}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                {page.template}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {page.is_active ? (
                                                <span className="flex items-center gap-1 text-sm text-green-600">
                                                    <Eye size={16} />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-sm text-gray-400">
                                                    <EyeOff size={16} />
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/pages/${page.id}/edit`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                {isAdmin() && (
                                                    <>
                                                        <button
                                                            onClick={() => handleDuplicate(page.id)}
                                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                            title="Duplicate"
                                                        >
                                                            <Copy size={18} />
                                                        </button>
                                                        {!page.is_homepage && (
                                                            <button
                                                                onClick={() => handleDelete(page.id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <p>Showing {filteredPages.length} of {pages.length} pages</p>
                <p>
                    {pages.filter((p) => p.is_active).length} active • {pages.filter((p) => !p.is_active).length} inactive
                </p>
            </div>
        </div>
    );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pageService } from '@/lib/services/page.service';
import { Save, ArrowLeft } from 'lucide-react';

export default function CreatePagePage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        slug: '',
        template: 'default',
        is_active: true,
        is_homepage: false,
        order: 0,
    });

    const [trContent, setTrContent] = useState({
        title: '',
        subtitle: '',
        description: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
    });

    const [enContent, setEnContent] = useState({
        title: '',
        subtitle: '',
        description: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        try {
            const newPage = await pageService.create({
                slug: formData.slug,
                template: formData.template,
                is_active: formData.is_active,
                is_homepage: formData.is_homepage,
                order: formData.order,
                contents: [
                    {
                        locale: 'tr',
                        title: trContent.title,
                        subtitle: trContent.subtitle,
                        description: trContent.description,
                        seo: {
                            title: trContent.seo_title,
                            description: trContent.seo_description,
                            keywords: trContent.seo_keywords.split(',').map((k) => k.trim()).filter(Boolean),
                        },
                    },
                    {
                        locale: 'en',
                        title: enContent.title,
                        subtitle: enContent.subtitle,
                        description: enContent.description,
                        seo: {
                            title: enContent.seo_title,
                            description: enContent.seo_description,
                            keywords: enContent.seo_keywords.split(',').map((k) => k.trim()).filter(Boolean),
                        },
                    },
                ],
            });

            alert('Page created successfully!');
            router.push(`/admin/pages/${newPage.id}/edit`);
        } catch (err: any) {
            console.error('Failed to create page:', err);
            setError(err.response?.data?.message || 'Failed to create page');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push('/admin/pages')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Create New Page</h1>
                    <p className="text-gray-600 mt-1">Add a new page to your website</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug * <span className="text-gray-500">(URL path)</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="about-us"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                            <select
                                value={formData.template}
                                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="default">Default</option>
                                <option value="landing">Landing</option>
                                <option value="blog">Blog</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                Active
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_homepage"
                                checked={formData.is_homepage}
                                onChange={(e) => setFormData({ ...formData, is_homepage: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="is_homepage" className="text-sm font-medium text-gray-700">
                                Set as Homepage
                            </label>
                        </div>
                    </div>
                </div>

                {/* Turkish Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🇹🇷 Turkish Content</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input
                                type="text"
                                required
                                value={trContent.title}
                                onChange={(e) => setTrContent({ ...trContent, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Sayfa başlığı"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={trContent.subtitle}
                                onChange={(e) => setTrContent({ ...trContent, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Alt başlık"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={trContent.description}
                                onChange={(e) => setTrContent({ ...trContent, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Açıklama"
                            />
                        </div>
                    </div>
                </div>

                {/* English Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🇬🇧 English Content</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input
                                type="text"
                                required
                                value={enContent.title}
                                onChange={(e) => setEnContent({ ...enContent, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Page title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={enContent.subtitle}
                                onChange={(e) => setEnContent({ ...enContent, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Subtitle"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={enContent.description}
                                onChange={(e) => setEnContent({ ...enContent, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Description"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/pages')}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Save size={20} />
                        <span>{isSaving ? 'Creating...' : 'Create Page'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
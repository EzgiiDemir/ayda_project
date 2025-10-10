// app/admin/pages/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { pageService, Page } from '@/lib/services/page.service';
import { Save, Eye, Image as ImageIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });
const MediaPicker = dynamic(() => import('@/components/admin/MediaPicker'), { ssr: false });

export default function PageEditPage() {
    const router = useRouter();
    const params = useParams();
    const pageId = parseInt(params.id as string);

    const [page, setPage] = useState<Page | null>(null);
    const [currentLocale, setCurrentLocale] = useState<'tr' | 'en'>('tr');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const [pageData, setPageData] = useState({
        slug: '',
        template: 'default',
        is_active: true,
        is_homepage: false,
        order: 0,
        meta: {} as Record<string, any>,
    });

    const [contentData, setContentData] = useState({
        title: '',
        subtitle: '',
        description: '',
        hero_image: '', // ← YENİ
        seo: {
            title: '',
            description: '',
            keywords: [] as string[],
        },
    });

    useEffect(() => {
        loadPage();
    }, [pageId, currentLocale]);

    const loadPage = async () => {
        setIsLoading(true);
        try {
            const data = await pageService.getById(pageId, { locale: currentLocale });
            setPage(data);

            setPageData({
                slug: data.slug,
                template: data.template,
                is_active: data.is_active,
                is_homepage: data.is_homepage,
                order: data.order || 0,
                meta: data.meta || {},
            });

            const content = data.contents?.find((c) => c.locale === currentLocale);
            if (content) {
                setContentData({
                    title: content.title || '',
                    subtitle: content.subtitle || '',
                    description: content.description || '',
                    hero_image: (content as any).hero_image || '', // ← YENİ
                    seo: content.seo || { title: '', description: '', keywords: [] },
                });
            }
        } catch (error) {
            console.error('Failed to load page:', error);
            alert('Failed to load page');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSavePageSettings = async () => {
        setIsSaving(true);
        try {
            await pageService.update(pageId, pageData);
            alert('Page settings saved successfully!');
        } catch (error) {
            console.error('Failed to save page:', error);
            alert('Failed to save page settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveContent = async () => {
        setIsSaving(true);
        try {
            console.log('Saving content:', contentData); // ← LOG EKLE

            const response = await pageService.updateContent(pageId, {
                locale: currentLocale,
                ...contentData,
            });

            console.log('Save response:', response); // ← LOG EKLE

            alert('Content saved successfully!');
            loadPage();
        } catch (error) {
            console.error('Failed to save content:', error);
            alert('Failed to save content');
        } finally {
            setIsSaving(false);
        }
    };
    const handlePreview = () => {
        window.open(`/${currentLocale}/${pageData.slug}`, '_blank');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Page</h1>
                        <p className="text-gray-600 mt-1">{page?.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePreview}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Eye size={20} />
                            <span>Preview</span>
                        </button>
                        <button
                            onClick={() => router.push('/admin/pages')}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveContent}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Save size={20} />
                            <span>{isSaving ? 'Saving...' : 'Save Content'}</span>
                        </button>
                    </div>
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

                {/* Page Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={pageData.slug}
                                onChange={(e) => setPageData({ ...pageData, slug: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="acupuncture"
                            />
                            <p className="text-xs text-gray-500 mt-1">URL: /{pageData.slug}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                            <select
                                value={pageData.template}
                                onChange={(e) => setPageData({ ...pageData, template: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="default">Default</option>
                                <option value="full-width">Full Width</option>
                                <option value="sidebar">With Sidebar</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={pageData.is_active}
                                    onChange={(e) => setPageData({ ...pageData, is_active: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Active</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={pageData.is_homepage}
                                    onChange={(e) => setPageData({ ...pageData, is_homepage: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Homepage</span>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleSavePageSettings}
                        disabled={isSaving}
                        className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>

                {/* Content Editor */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Page Content ({currentLocale.toUpperCase()})
                    </h3>

                    <div className="space-y-4">
                        {/* Hero Image - YENİ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Image
                            </label>
                            {contentData.hero_image ? (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                                    <Image
                                        src={contentData.hero_image}
                                        alt="Hero"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                                        <button
                                            onClick={() => setShowMediaPicker(true)}
                                            className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            Change Image
                                        </button>
                                        <button
                                            onClick={() => setContentData({ ...contentData, hero_image: '' })}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowMediaPicker(true)}
                                    className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2"
                                >
                                    <ImageIcon size={48} className="text-gray-400" />
                                    <span className="text-sm text-gray-600">Click to select hero image</span>
                                </button>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={contentData.title}
                                onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter page title"
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Optional)</label>
                            <input
                                type="text"
                                value={contentData.subtitle}
                                onChange={(e) => setContentData({ ...contentData, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter subtitle"
                            />
                        </div>

                        {/* Rich Text Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <RichTextEditor
                                content={contentData.description}
                                onChange={(html) => setContentData({ ...contentData, description: html })}
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                            <input
                                type="text"
                                value={contentData.seo.title}
                                onChange={(e) =>
                                    setContentData({
                                        ...contentData,
                                        seo: { ...contentData.seo, title: e.target.value },
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="SEO Title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                            <textarea
                                value={contentData.seo.description}
                                onChange={(e) =>
                                    setContentData({
                                        ...contentData,
                                        seo: { ...contentData.seo, description: e.target.value },
                                    })
                                }
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="SEO Description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma separated)</label>
                            <input
                                type="text"
                                value={contentData.seo.keywords.join(', ')}
                                onChange={(e) =>
                                    setContentData({
                                        ...contentData,
                                        seo: {
                                            ...contentData.seo,
                                            keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                                        },
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="keyword1, keyword2, keyword3"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Media Picker Modal */}
            <MediaPicker
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(url) => setContentData({ ...contentData, hero_image: url })}
                currentImage={contentData.hero_image}
            />
        </>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { componentService, Component } from '@/lib/services/component.service';
import { Save } from 'lucide-react';
import dynamic from 'next/dynamic';

const JSONEditor = dynamic(() => import('@/components/admin/JSONEditor'), { ssr: false });

export default function ComponentEditPage() {
    const router = useRouter();
    const params = useParams();
    const componentId = parseInt(params.id as string);

    const [component, setComponent] = useState<Component | null>(null);
    const [currentLocale, setCurrentLocale] = useState<'tr' | 'en'>('tr');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [componentData, setComponentData] = useState({
        name: '',
        type: 'section' as 'layout' | 'section' | 'widget',
        description: '',
        is_global: false,
    });

    const [contentData, setContentData] = useState<Record<string, any>>({});

    useEffect(() => {
        loadComponent();
    }, [componentId]);

    const loadComponent = async () => {
        try {
            const components = await componentService.getAll({ locale: currentLocale });
            const comp = components.find((c) => c.id === componentId);

            if (comp) {
                setComponent(comp);
                setComponentData({
                    name: comp.name,
                    type: comp.type,
                    description: comp.description || '',
                    is_global: comp.is_global,
                });

                const content = comp.contents?.find((c) => c.locale === currentLocale);
                if (content) {
                    setContentData(content.data);
                }
            }
        } catch (error) {
            console.error('Failed to load component:', error);
            alert('Failed to load component');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveBasicInfo = async () => {
        setIsSaving(true);
        try {
            await componentService.update(componentId, componentData);
            alert('Component settings saved successfully!');
        } catch (error) {
            console.error('Failed to save component:', error);
            alert('Failed to save component settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveContent = async () => {
        setIsSaving(true);
        try {
            await componentService.updateContent(componentId, {
                locale: currentLocale,
                data: contentData,
                is_active: true,
            });
            alert('Content saved successfully!');
            loadComponent();
        } catch (error) {
            console.error('Failed to save content:', error);
            alert('Failed to save content');
        } finally {
            setIsSaving(false);
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
                    <h1 className="text-3xl font-bold text-gray-900">Edit Component</h1>
                    <p className="text-gray-600 mt-1">{component?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/admin/components')}
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

            {/* Component Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Component Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={componentData.name}
                            onChange={(e) => setComponentData({ ...componentData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            value={componentData.type}
                            onChange={(e) =>
                                setComponentData({ ...componentData, type: e.target.value as any })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="layout">Layout</option>
                            <option value="section">Section</option>
                            <option value="widget">Widget</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={componentData.description}
                            onChange={(e) =>
                                setComponentData({ ...componentData, description: e.target.value })
                            }
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Component description"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_global"
                            checked={componentData.is_global}
                            onChange={(e) =>
                                setComponentData({ ...componentData, is_global: e.target.checked })
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="is_global" className="text-sm font-medium text-gray-700">
                            Global Component (appears on all pages)
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleSaveBasicInfo}
                    disabled={isSaving}
                    className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Component Content ({currentLocale.toUpperCase()})
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Edit the component data in JSON format. This data will be available to your frontend components.
                </p>

                <JSONEditor
                    data={contentData}
                    onChange={setContentData}
                />

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                        <strong>Tip:</strong> Component data structure depends on your frontend implementation.
                        Common fields include: title, subtitle, description, items, links, images, etc.
                    </p>
                </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">JSON Preview</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          {JSON.stringify(contentData, null, 2)}
        </pre>
            </div>
        </div>
    );
}
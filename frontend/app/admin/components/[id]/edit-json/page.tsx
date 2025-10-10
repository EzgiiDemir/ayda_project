'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { componentService, Component } from '@/lib/services/component.service';
import { Save, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

const JSONEditor = dynamic(() => import('@/components/admin/JSONEditor'), { ssr: false });

export default function ComponentJSONEditPage() {
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
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        loadComponent();
    }, [componentId, currentLocale]);

    const loadComponent = async () => {
        setIsLoading(true);
        try {
            const comp = await componentService.getById(componentId, { locale: currentLocale });
            setComponent(comp);

            setComponentData({
                name: comp.name,
                type: comp.type,
                description: comp.description || '',
                is_global: comp.is_global,
            });

            const content = comp.contents?.find((c) => c.locale === currentLocale);
            if (content) {
                setContentData(content.data || {});
                setIsActive(content.is_active);
            } else {
                setContentData({});
                setIsActive(true);
            }
        } catch (error) {
            console.error('Failed to load component:', error);
            alert('Failed to load component');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            await componentService.update(componentId, componentData);
            alert('Component settings saved successfully!');
        } catch (error) {
            console.error('Failed to save settings:', error);
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
                is_active: isActive,
            });
            alert('Content saved successfully!');
            loadComponent();
        } catch (error) {
            console.error('Failed to save content:', error);
            alert('Failed to save component content');
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
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/admin/components')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Component</h1>
                        <p className="text-gray-600 mt-1">{component?.name}</p>
                    </div>
                </div>
                <button
                    onClick={handleSaveContent}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Save size={20} />
                    <span>{isSaving ? 'Saving...' : 'Save Content'}</span>
                </button>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            value={componentData.type}
                            onChange={(e) => setComponentData({ ...componentData, type: e.target.value as any })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                            onChange={(e) => setComponentData({ ...componentData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_global"
                            checked={componentData.is_global}
                            onChange={(e) => setComponentData({ ...componentData, is_global: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="is_global" className="text-sm font-medium text-gray-700">
                            Global Component
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Component Content ({currentLocale.toUpperCase()})
                </h3>

                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                        Active
                    </label>
                </div>

                <JSONEditor data={contentData} onChange={setContentData} />
            </div>

            {/* JSON Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">JSON Preview</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                    {JSON.stringify(contentData, null, 2)}
                </pre>
            </div>
        </div>
    );
}
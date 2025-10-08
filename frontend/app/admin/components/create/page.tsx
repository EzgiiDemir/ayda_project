'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { componentService } from '@/lib/services/component.service';
import { Save, ArrowLeft } from 'lucide-react';

export default function CreateComponentPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        type: 'section' as 'layout' | 'section' | 'widget',
        description: '',
        is_global: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSaving(true);

        try {
            const newComponent = await componentService.create(formData);
            alert('Component created successfully!');
            router.push(`/admin/components/${newComponent.id}/edit`);
        } catch (err: any) {
            console.error('Failed to create component:', err);
            setError(err.response?.data?.message || 'Failed to create component');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push('/admin/components')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Create New Component</h1>
                    <p className="text-gray-600 mt-1">Build a reusable component</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Component Settings</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name * <span className="text-gray-500">(unique identifier)</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="hero, navbar, footer, etc."
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Use lowercase with hyphens (e.g., "hero-section", "contact-form")
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="layout">Layout - Header, Footer, Sidebar</option>
                                <option value="section">Section - Hero, About, Features</option>
                                <option value="widget">Widget - Button, Card, Form</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Brief description of this component"
                            />
                        </div>

                        <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <input
                                type="checkbox"
                                id="is_global"
                                checked={formData.is_global}
                                onChange={(e) => setFormData({ ...formData, is_global: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="is_global" className="text-sm font-medium text-blue-900">
                                Global Component (appears on all pages automatically)
                            </label>
                        </div>

                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Component Examples:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• <strong>Layout:</strong> navbar, footer, sidebar</li>
                                <li>• <strong>Section:</strong> hero, welcome, treatments, contact-map</li>
                                <li>• <strong>Widget:</strong> button, card, testimonial-card</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/components')}
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
                        <span>{isSaving ? 'Creating...' : 'Create Component'}</span>
                    </button>
                </div>
            </form>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                    <strong>Note:</strong> After creating the component, you'll be able to add content for both Turkish and English languages in the editor.
                </p>
            </div>
        </div>
    );
}
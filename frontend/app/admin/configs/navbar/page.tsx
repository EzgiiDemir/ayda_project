'use client';

import { useEffect, useState } from 'react';
import { configService } from '@/lib/services/config.service';
import { Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const MediaPicker = dynamic(() => import('@/components/admin/MediaPicker'), { ssr: false });

interface NavLink {
    id: string;
    label: string;
    href: string;
}

interface NavbarConfig {
    locale: string;
    logo_url: string | null;
    logo_alt: string | null;
    phone_number: string | null;
    about_links: NavLink[] | null;
    treatments_links: NavLink[] | null;
    regular_links: NavLink[] | null;
}

export default function NavbarConfigPage() {
    const [currentLocale, setCurrentLocale] = useState<'tr' | 'en'>('tr');
    const [config, setConfig] = useState<NavbarConfig>({
        locale: 'tr',
        logo_url: null,
        logo_alt: null,
        phone_number: null,
        about_links: [],
        treatments_links: [],
        regular_links: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    useEffect(() => {
        loadConfig();
    }, [currentLocale]);

    const loadConfig = async () => {
        setIsLoading(true);
        try {
            const data = await configService.getNavbar(currentLocale);
            if (data) {
                setConfig({
                    locale: currentLocale,
                    logo_url: data.logo_url,
                    logo_alt: data.logo_alt,
                    phone_number: data.phone_number,
                    about_links: data.about_links || [],
                    treatments_links: data.treatments_links || [],
                    regular_links: data.regular_links || [],
                });
            }
        } catch (error) {
            console.error('Failed to load navbar config:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await configService.updateNavbar(config);
            alert('Navbar configuration saved successfully!');
        } catch (error) {
            console.error('Failed to save:', error);
            alert('Failed to save configuration');
        } finally {
            setIsSaving(false);
        }
    };

    // About Links Management
    const addAboutLink = () => {
        setConfig({
            ...config,
            about_links: [
                ...(config.about_links || []),
                { id: `about-${Date.now()}`, label: '', href: '' },
            ],
        });
    };

    const updateAboutLink = (index: number, field: 'label' | 'href', value: string) => {
        const newLinks = [...(config.about_links || [])];
        newLinks[index][field] = value;
        setConfig({ ...config, about_links: newLinks });
    };

    const removeAboutLink = (index: number) => {
        const newLinks = (config.about_links || []).filter((_, i) => i !== index);
        setConfig({ ...config, about_links: newLinks });
    };

    // Treatments Links Management
    const addTreatmentLink = () => {
        setConfig({
            ...config,
            treatments_links: [
                ...(config.treatments_links || []),
                { id: `treatment-${Date.now()}`, label: '', href: '' },
            ],
        });
    };

    const updateTreatmentLink = (index: number, field: 'label' | 'href', value: string) => {
        const newLinks = [...(config.treatments_links || [])];
        newLinks[index][field] = value;
        setConfig({ ...config, treatments_links: newLinks });
    };

    const removeTreatmentLink = (index: number) => {
        const newLinks = (config.treatments_links || []).filter((_, i) => i !== index);
        setConfig({ ...config, treatments_links: newLinks });
    };

    // Regular Links Management
    const addRegularLink = () => {
        setConfig({
            ...config,
            regular_links: [
                ...(config.regular_links || []),
                { id: `link-${Date.now()}`, label: '', href: '' },
            ],
        });
    };

    const updateRegularLink = (index: number, field: 'label' | 'href', value: string) => {
        const newLinks = [...(config.regular_links || [])];
        newLinks[index][field] = value;
        setConfig({ ...config, regular_links: newLinks });
    };

    const removeRegularLink = (index: number) => {
        const newLinks = (config.regular_links || []).filter((_, i) => i !== index);
        setConfig({ ...config, regular_links: newLinks });
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
                        <h1 className="text-3xl font-bold text-gray-900">Navbar Configuration</h1>
                        <p className="text-gray-600 mt-1">Manage navigation menu</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Save size={20} />
                        <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
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

                {/* Logo & Basic Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Logo & Contact</h3>
                    <div className="space-y-4">
                        {/* Logo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                            {config.logo_url ? (
                                <div className="relative w-40 h-20 rounded-lg overflow-hidden border border-gray-300">
                                    <Image src={config.logo_url} alt="Logo" fill className="object-contain" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                                        <button
                                            onClick={() => setShowMediaPicker(true)}
                                            className="px-3 py-1 bg-white text-gray-900 rounded text-sm"
                                        >
                                            Change
                                        </button>
                                        <button
                                            onClick={() => setConfig({ ...config, logo_url: null })}
                                            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowMediaPicker(true)}
                                    className="w-40 h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2"
                                >
                                    <ImageIcon size={24} className="text-gray-400" />
                                    <span className="text-xs text-gray-600">Select Logo</span>
                                </button>
                            )}
                        </div>

                        {/* Logo Alt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo Alt Text</label>
                            <input
                                type="text"
                                value={config.logo_alt || ''}
                                onChange={(e) => setConfig({ ...config, logo_alt: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Ayda IVF Logo"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={config.phone_number || ''}
                                onChange={(e) => setConfig({ ...config, phone_number: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="+90 555 123 4567"
                            />
                        </div>
                    </div>
                </div>

                {/* About Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">About Dropdown Links</h3>
                        <button
                            onClick={addAboutLink}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            <Plus size={16} />
                            Add Link
                        </button>
                    </div>
                    <div className="space-y-3">
                        {(config.about_links || []).map((link, index) => (
                            <div key={index} className="flex gap-3 items-start">
                                <input
                                    type="text"
                                    value={link.label}
                                    onChange={(e) => updateAboutLink(index, 'label', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Label (e.g., About Us)"
                                />
                                <input
                                    type="text"
                                    value={link.href}
                                    onChange={(e) => updateAboutLink(index, 'href', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="URL (e.g., /about)"
                                />
                                <button
                                    onClick={() => removeAboutLink(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Treatment Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Treatments Dropdown Links</h3>
                        <button
                            onClick={addTreatmentLink}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            <Plus size={16} />
                            Add Link
                        </button>
                    </div>
                    <div className="space-y-3">
                        {(config.treatments_links || []).map((link, index) => (
                            <div key={index} className="flex gap-3 items-start">
                                <input
                                    type="text"
                                    value={link.label}
                                    onChange={(e) => updateTreatmentLink(index, 'label', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Label (e.g., IVF Treatment)"
                                />
                                <input
                                    type="text"
                                    value={link.href}
                                    onChange={(e) => updateTreatmentLink(index, 'href', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="URL (e.g., /treatments/ivf)"
                                />
                                <button
                                    onClick={() => removeTreatmentLink(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Regular Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Regular Links</h3>
                        <button
                            onClick={addRegularLink}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            <Plus size={16} />
                            Add Link
                        </button>
                    </div>
                    <div className="space-y-3">
                        {(config.regular_links || []).map((link, index) => (
                            <div key={index} className="flex gap-3 items-start">
                                <input
                                    type="text"
                                    value={link.label}
                                    onChange={(e) => updateRegularLink(index, 'label', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Label (e.g., Contact)"
                                />
                                <input
                                    type="text"
                                    value={link.href}
                                    onChange={(e) => updateRegularLink(index, 'href', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="URL (e.g., /contact)"
                                />
                                <button
                                    onClick={() => removeRegularLink(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Media Picker */}
            <MediaPicker
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={(url) => setConfig({ ...config, logo_url: url })}
                currentImage={config.logo_url || undefined}
            />
        </>
    );
}
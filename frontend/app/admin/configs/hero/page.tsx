// app/admin/configs/hero/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { configService } from '@/lib/services/config.service';
import { Save, Plus, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import apiClient from '@/lib/api-client';

interface HeroSlide {
    title: string;
    subtitle: string;
    image: {
        url: string;
    };
}

interface HeroConfig {
    locale: string;
    slides: HeroSlide[];
    dots_pattern: string | null;
    auto_play: boolean;
    auto_play_interval: number;
    show_indicators: boolean;
}

export default function HeroConfigPage() {
    const [currentLocale, setCurrentLocale] = useState<'tr' | 'en'>('tr');
    const [config, setConfig] = useState<HeroConfig>({
        locale: 'tr',
        slides: [],
        dots_pattern: null,
        auto_play: true,
        auto_play_interval: 5000,
        show_indicators: true,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

    useEffect(() => {
        loadConfig();
    }, [currentLocale]);

    const loadConfig = async () => {
        setIsLoading(true);
        try {
            const data = await configService.getHero(currentLocale);
            if (data) {
                setConfig({
                    locale: currentLocale,
                    slides: data.slides || [],
                    dots_pattern: data.dots_pattern,
                    auto_play: data.auto_play,
                    auto_play_interval: data.auto_play_interval,
                    show_indicators: data.show_indicators,
                });
            }
        } catch (error) {
            console.error('Failed to load hero config:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await configService.updateHero(config);
            alert('Hero configuration saved successfully!');
        } catch (error) {
            console.error('Failed to save:', error);
            alert('Failed to save configuration');
        } finally {
            setIsSaving(false);
        }
    };

    const addSlide = () => {
        setConfig({
            ...config,
            slides: [
                ...config.slides,
                {
                    title: '',
                    subtitle: '',
                    image: { url: '' },
                },
            ],
        });
    };

    const removeSlide = (index: number) => {
        const newSlides = config.slides.filter((_, i) => i !== index);
        setConfig({ ...config, slides: newSlides });
    };

    const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
        const newSlides = [...config.slides];
        if (field === 'image') {
            newSlides[index].image.url = value;
        } else {
            newSlides[index][field] = value;
        }
        setConfig({ ...config, slides: newSlides });
    };

    const handleImageUpload = async (index: number, file: File) => {
        setUploadingIndex(index);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await apiClient.post('/admin/media/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                updateSlide(index, 'image', response.data.data.url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingIndex(null);
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
                    <h1 className="text-3xl font-bold text-gray-900">Hero Configuration</h1>
                    <p className="text-gray-600 mt-1">Homepage hero slider settings</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Save size={20} />
                        <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
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

            {/* Slides */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Slides</h2>
                    <button
                        onClick={addSlide}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                        <span>Add Slide</span>
                    </button>
                </div>

                {config.slides.map((slide, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
                            <button
                                onClick={() => removeSlide(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image
                                </label>
                                {slide.image.url ? (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                                        <Image
                                            src={slide.image.url}
                                            alt={slide.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            onClick={() => updateSlide(index, 'image', '')}
                                            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleImageUpload(index, file);
                                            }}
                                            disabled={uploadingIndex === index}
                                        />
                                    </label>
                                )}
                                {uploadingIndex === index && (
                                    <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={slide.title}
                                    onChange={(e) => updateSlide(index, 'title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter slide title"
                                />
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={slide.subtitle}
                                    onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter slide subtitle"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {config.slides.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">No slides added yet</p>
                        <button
                            onClick={addSlide}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mx-auto"
                        >
                            <Plus size={18} />
                            <span>Add First Slide</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Slider Settings</h3>
                <div className="space-y-4">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={config.auto_play}
                            onChange={(e) => setConfig({ ...config, auto_play: e.target.checked })}
                            className="w-5 h-5 text-blue-600 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Auto Play</span>
                    </label>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Auto Play Interval (ms)
                        </label>
                        <input
                            type="number"
                            value={config.auto_play_interval}
                            onChange={(e) =>
                                setConfig({ ...config, auto_play_interval: parseInt(e.target.value) })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            min="1000"
                            step="1000"
                        />
                    </div>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={config.show_indicators}
                            onChange={(e) => setConfig({ ...config, show_indicators: e.target.checked })}
                            className="w-5 h-5 text-blue-600 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Show Indicators</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
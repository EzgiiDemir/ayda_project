// components/admin/MediaPicker.tsx
'use client';

import { useEffect, useState } from 'react';
import { mediaService, Media } from '@/lib/services/media.service';
import { X, Search, Upload, Check } from 'lucide-react';
import Image from 'next/image';

interface MediaPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    currentImage?: string;
}

export default function MediaPicker({ isOpen, onClose, onSelect, currentImage }: MediaPickerProps) {
    const [media, setMedia] = useState<Media[]>([]);
    const [filteredMedia, setFilteredMedia] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUrl, setSelectedUrl] = useState(currentImage || '');

    useEffect(() => {
        if (isOpen) {
            loadMedia();
        }
    }, [isOpen]);

    useEffect(() => {
        filterMedia();
    }, [media, searchQuery]);

    const loadMedia = async () => {
        setIsLoading(true);
        try {
            const data = await mediaService.getAll({ type: 'image', per_page: 100 });
            setMedia(data.data);
        } catch (error) {
            console.error('Failed to load media:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterMedia = () => {
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            setFilteredMedia(media.filter((m) => m.name.toLowerCase().includes(q)));
        } else {
            setFilteredMedia(media);
        }
    };

    const handleSelect = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Select Image</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Choose an image from your media library
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Media Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="text-center py-12">
                            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                            <p className="text-gray-600 mb-4">No images found</p>
                            <a
                                href="/admin/media"
                                target="_blank"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Go to Media Library to upload images
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredMedia.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedUrl(item.url)}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedUrl === item.url
                                            ? 'border-blue-500 ring-2 ring-blue-200'
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <Image
                                        src={item.url}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {selectedUrl === item.url && (
                                        <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                                            <div className="bg-blue-600 text-white rounded-full p-2">
                                                <Check size={20} />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t bg-gray-50">
                    <div className="text-sm text-gray-600">
                        {filteredMedia.length} images available
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSelect}
                            disabled={!selectedUrl}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Select Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
'use client';

import { useEffect, useState, useCallback } from 'react';
import { mediaService, Media } from '@/lib/services/media.service';
import { useDropzone } from 'react-dropzone';
import {
    Upload,
    Image as ImageIcon,
    FileText,
    Film,
    Trash2,
    Download,
    Search,
    Filter,
    Check,
} from 'lucide-react';

export default function MediaLibraryPage() {
    const [media, setMedia] = useState<Media[]>([]);
    const [filteredMedia, setFilteredMedia] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Set<number>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // (şimdilik kullanılmıyor ama korunuyor)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadMedia = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await mediaService.getAll({
                type: typeFilter === 'all' ? undefined : typeFilter,
                per_page: 24,
                page: currentPage,
            });
            setMedia(data.data);
            setTotalPages(data.last_page);
        } catch (error) {
            console.error('Failed to load media:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, typeFilter]);

    useEffect(() => {
        loadMedia();
    }, [loadMedia]);

    useEffect(() => {
        filterMedia();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [media, searchQuery]);

    const filterMedia = () => {
        let filtered = media;

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter((m) => m.name.toLowerCase().includes(q));
        }

        setFilteredMedia(filtered);
    };

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setIsUploading(true);
            try {
                await mediaService.uploadMultiple(acceptedFiles, 'general');
                await loadMedia();
            } catch (error) {
                console.error('Failed to upload files:', error);
                alert('Failed to upload some files');
            } finally {
                setIsUploading(false);
            }
        },
        [loadMedia]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            'video/*': ['.mp4', '.webm'],
            'application/pdf': ['.pdf'],
        },
    });

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this file?')) return;
        try {
            await mediaService.delete(id);
            await loadMedia();
            const newSet = new Set(selectedMedia);
            newSet.delete(id);
            setSelectedMedia(newSet);
        } catch (error) {
            console.error('Failed to delete media:', error);
            alert('Failed to delete file');
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedMedia.size === 0) return;
        if (!confirm(`Delete ${selectedMedia.size} selected files?`)) return;
        try {
            await mediaService.deleteMultiple(Array.from(selectedMedia));
            await loadMedia();
            setSelectedMedia(new Set());
        } catch (error) {
            console.error('Failed to delete files:', error);
            alert('Failed to delete files');
        }
    };

    const toggleSelect = (id: number) => {
        const newSelected = new Set(selectedMedia);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedMedia(newSelected);
    };

    const selectAll = () => {
        if (selectedMedia.size === filteredMedia.length) {
            setSelectedMedia(new Set());
        } else {
            setSelectedMedia(new Set(filteredMedia.map((m) => m.id)));
        }
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) return <ImageIcon size={20} />;
        if (mimeType.startsWith('video/')) return <Film size={20} />;
        return <FileText size={20} />;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 container mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
                    <p className="text-gray-600 mt-1">Manage your images, videos, and documents</p>
                </div>
                {selectedMedia.size > 0 && (
                    <button
                        onClick={handleDeleteSelected}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Trash2 size={20} />
                        <span>Delete {selectedMedia.size} selected</span>
                    </button>
                )}
            </div>

            {/* Upload Area */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
            >
                <input {...getInputProps()} />
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                {isUploading ? (
                    <p className="text-lg font-medium text-gray-900">Uploading files...</p>
                ) : isDragActive ? (
                    <p className="text-lg font-medium text-blue-600">Drop files here</p>
                ) : (
                    <>
                        <p className="text-lg font-medium text-gray-900">Drag & drop files here</p>
                        <p className="text-gray-600 mt-2">or click to browse</p>
                        <p className="text-sm text-gray-500 mt-2">Supports images, videos, and PDFs</p>
                    </>
                )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-400" />
                        <select
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value as 'all' | 'image' | 'video' | 'document');
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Types</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                            <option value="document">Documents</option>
                        </select>
                    </div>

                    {/* Select All */}
                    <button
                        onClick={selectAll}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {selectedMedia.size === filteredMedia.length && filteredMedia.length > 0 ? (
                            <span className="flex items-center gap-2">
                <Check size={18} />
                Deselect All
              </span>
                        ) : (
                            'Select All'
                        )}
                    </button>
                </div>
            </div>

            {/* Media Grid */}
            {filteredMedia.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <ImageIcon className="mx-auto text-gray-400 mb-4" size={64} />
                    <p className="text-lg text-gray-600">No files found</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {filteredMedia.map((item) => (
                            <div
                                key={item.id}
                                className={`relative group bg-white rounded-lg border-2 overflow-hidden transition-all ${
                                    selectedMedia.has(item.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                {/* Selection Checkbox */}
                                <button
                                    onClick={() => toggleSelect(item.id)}
                                    className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                                >
                                    {selectedMedia.has(item.id) && <Check size={14} className="text-blue-600" />}
                                </button>

                                {/* Preview */}
                                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {item.mime_type.startsWith('image/') ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-gray-400">{getFileIcon(item.mime_type)}</div>
                                    )}
                                </div>

                                {/* Info & Actions */}
                                <div className="p-2">
                                    <p className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{item.size_formatted}</p>
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                                        title="Download"
                                    >
                                        <Download size={18} />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-white rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Stats */}
            <div className="text-center text-sm text-gray-600">
                Showing {filteredMedia.length} of {media.length} files
                {selectedMedia.size > 0 && ` • ${selectedMedia.size} selected`}
            </div>
        </div>
    );
}

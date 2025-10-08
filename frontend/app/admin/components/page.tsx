'use client';

import { useEffect, useState } from 'react';
import { componentService, Component } from '@/lib/services/component.service';
import { useAuthStore } from '@/lib/stores/auth.store';
import Link from 'next/link';
import {
    Plus,
    Edit,
    Trash2,
    Globe,
    Search,
    Filter,
    Layout,
    Box,
    Puzzle,
} from 'lucide-react';

export default function ComponentsListPage() {
    const { isAdmin } = useAuthStore();
    const [components, setComponents] = useState<Component[]>([]);
    const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'layout' | 'section' | 'widget'>('all');
    const [currentLocale, setCurrentLocale] = useState<'tr' | 'en'>('tr');

    useEffect(() => {
        loadComponents();
    }, [currentLocale]);

    useEffect(() => {
        filterComponents();
    }, [components, searchQuery, typeFilter]);

    const loadComponents = async () => {
        try {
            const data = await componentService.getAll({ locale: currentLocale });
            setComponents(data);
        } catch (error) {
            console.error('Failed to load components:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterComponents = () => {
        let filtered = components;

        if (typeFilter !== 'all') {
            filtered = filtered.filter((c) => c.type === typeFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(
                (c) =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredComponents(filtered);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this component?')) return;
        try {
            await componentService.delete(id);
            loadComponents();
        } catch (error) {
            console.error('Failed to delete component:', error);
            alert('Failed to delete component');
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'layout':
                return <Layout size={20} />;
            case 'section':
                return <Box size={20} />;
            case 'widget':
                return <Puzzle size={20} />;
            default:
                return <Box size={20} />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'layout':
                return 'bg-blue-100 text-blue-800';
            case 'section':
                return 'bg-green-100 text-green-800';
            case 'widget':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
        <div className="space-y-6 container mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Components</h1>
                    <p className="text-gray-600 mt-1">Manage reusable components</p>
                </div>
                {isAdmin() && (
                    <Link
                        href="/admin/components/create"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={20} />
                        <span>Create Component</span>
                    </Link>
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
                            placeholder="Search components..."
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
                            onChange={(e) => setTypeFilter(e.target.value as any)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Types</option>
                            <option value="layout">Layout</option>
                            <option value="section">Section</option>
                            <option value="widget">Widget</option>
                        </select>
                    </div>

                    {/* Language Selector */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentLocale('tr')}
                            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                                currentLocale === 'tr'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            🇹🇷 TR
                        </button>
                        <button
                            onClick={() => setCurrentLocale('en')}
                            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                                currentLocale === 'en'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            🇬🇧 EN
                        </button>
                    </div>
                </div>
            </div>

            {/* Components Grid */}
            {filteredComponents.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <Puzzle className="mx-auto text-gray-400 mb-4" size={64} />
                    <p className="text-lg text-gray-600">No components found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredComponents.map((component) => (
                        <div
                            key={component.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${getTypeColor(component.type)}`}>
                                        {getTypeIcon(component.type)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{component.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                      <span
                          className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(
                              component.type
                          )}`}
                      >
                        {component.type}
                      </span>
                                            {component.is_global && (
                                                <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                          <Globe size={12} />
                          Global
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {component.description && (
                                <p className="text-sm text-gray-600 mb-4">{component.description}</p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="text-xs text-gray-500">
                                    {component.contents?.[0]?.is_active ? (
                                        <span className="text-green-600 font-medium">Active</span>
                                    ) : (
                                        <span className="text-gray-400">Inactive</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/components/${component.id}/edit`}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    {isAdmin() && !component.is_global && (
                                        <button
                                            onClick={() => handleDelete(component.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <p>
                    Showing {filteredComponents.length} of {components.length} components
                </p>
                <div className="flex items-center gap-4">
                    <p>{components.filter((c) => c.type === 'layout').length} layouts</p>
                    <p>{components.filter((c) => c.type === 'section').length} sections</p>
                    <p>{components.filter((c) => c.type === 'widget').length} widgets</p>
                </div>
            </div>
        </div>
    );
}
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
    Copy,
    Eye,
    EyeOff,
} from 'lucide-react';

export default function ComponentsListPage() {
    const { isAdmin } = useAuthStore();
    const [components, setComponents] = useState<Component[]>([]);
    const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'layout' | 'section' | 'widget'>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [currentLocale, setCurrentLocale] = useState<'tr' | 'en'>('tr');

    useEffect(() => {
        loadComponents();
    }, [currentLocale]);

    useEffect(() => {
        filterComponents();
    }, [components, searchQuery, typeFilter, statusFilter]);

    const loadComponents = async () => {
        setIsLoading(true);
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

        // type filter
        if (typeFilter !== 'all') {
            filtered = filtered.filter((c) => c.type === typeFilter);
        }

        // status filter
        if (statusFilter === 'active') {
            filtered = filtered.filter((c) => c.contents?.some(ct => ct.locale === currentLocale && ct.is_active));
        } else if (statusFilter === 'inactive') {
            filtered = filtered.filter((c) => !c.contents?.some(ct => ct.locale === currentLocale && ct.is_active));
        }

        // search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter((c) => {
                const content = c.contents?.find(ct => ct.locale === currentLocale);
                return (
                    c.name.toLowerCase().includes(q) ||
                    (content?.title?.toLowerCase?.().includes(q) ?? false) ||
                    (c.description?.toLowerCase().includes(q) ?? false)
                );
            });
        }

        setFilteredComponents(filtered);
    };

    const handleDuplicate = async (id: number) => {
        if (!confirm('Are you sure you want to duplicate this component?')) return;
        try {
            await componentService.duplicate(id);
            loadComponents();
        } catch (error) {
            console.error('Failed to duplicate component:', error);
            alert('Failed to duplicate component');
        }
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

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={20} className="text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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
                    <p className="text-lg text-gray-600">
                        {components.length === 0 ? 'No components found in database' : 'No components match your filters'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredComponents.map((component) => {
                        const content = component.contents?.find(ct => ct.locale === currentLocale);

                        return (
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
                                            <h3 className="font-semibold text-gray-900">{content?.title || component.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span
                                                    className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(component.type)}`}
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
                                        {content?.is_active ? (
                                            <span className="flex items-center gap-1 text-green-600 font-medium">
                                                <Eye size={14} /> Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-gray-400">
                                                <EyeOff size={14} /> Inactive
                                            </span>
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
                                        {isAdmin() && (
                                            <>
                                                <button
                                                    onClick={() => handleDuplicate(component.id)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Duplicate"
                                                >
                                                    <Copy size={18} />
                                                </button>
                                                {!component.is_global && (
                                                    <button
                                                        onClick={() => handleDelete(component.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
                    <p>{components.filter((c) => c.contents?.some(ct => ct.is_active)).length} active</p>
                    <p>{components.filter((c) => !c.contents?.some(ct => ct.is_active)).length} inactive</p>
                </div>
            </div>
        </div>
    );
}

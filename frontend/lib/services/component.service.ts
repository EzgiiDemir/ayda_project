// lib/services/component.service.ts
import apiClient from '@/lib/api-client';

export interface Component {
    id: number;
    name: string;
    type: 'layout' | 'section' | 'widget';
    description?: string;
    is_global: boolean;
    schema?: Record<string, any>;
    created_at: string;
    updated_at: string;
    contents?: ComponentContent[];
}

export interface ComponentContent {
    id: number;
    component_id: number;
    locale: string;
    data: Record<string, any>;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateComponentData {
    name: string;
    type: 'layout' | 'section' | 'widget';
    description?: string;
    is_global?: boolean;
    schema?: Record<string, any>;
}

export interface UpdateComponentData {
    name?: string;
    type?: 'layout' | 'section' | 'widget';
    description?: string;
    is_global?: boolean;
    schema?: Record<string, any>;
}

export interface UpdateComponentContentData {
    locale: string;
    data: Record<string, any>;
    is_active?: boolean;
}

class ComponentService {
    async getAll(params?: { type?: string; locale?: string }): Promise<Component[]> {
        const response = await apiClient.get<{ success: boolean; data: Component[] }>(
            '/admin/components',
            { params }
        );
        return response.data.data;
    }

    async getById(id: number, params?: { locale?: string }): Promise<Component> {
        const response = await apiClient.get<{ success: boolean; data: Component }>(
            `/admin/components/${id}`,
            { params }
        );
        return response.data.data;
    }

    async create(data: CreateComponentData): Promise<Component> {
        const response = await apiClient.post<{ success: boolean; data: Component }>(
            '/admin/components',
            data
        );
        return response.data.data;
    }

    async update(id: number, data: UpdateComponentData): Promise<Component> {
        const response = await apiClient.put<{ success: boolean; data: Component }>(
            `/admin/components/${id}`,
            data
        );
        return response.data.data;
    }

    async updateContent(id: number, data: UpdateComponentContentData): Promise<ComponentContent> {
        const response = await apiClient.put<{ success: boolean; data: ComponentContent }>(
            `/admin/components/${id}/content`,
            data
        );
        return response.data.data;
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/admin/components/${id}`);
    }

    async duplicate(id: number): Promise<Component> {
        const response = await apiClient.post<{ success: boolean; data: Component }>(
            `/admin/components/${id}/duplicate`
        );
        return response.data.data;
    }

    // Public API - Frontend için
    async getByName(name: string, locale: string = 'tr'): Promise<Record<string, any>> {
        const response = await apiClient.get<{ success: boolean; data: Record<string, any> }>(
            `/public/components/${name}`,
            { params: { locale } }
        );
        return response.data.data;
    }
}

export const componentService = new ComponentService();
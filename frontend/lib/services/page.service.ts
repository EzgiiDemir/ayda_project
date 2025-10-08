import apiClient from '@/lib/api-client';

export interface Page {
    id: number;
    slug: string;
    template: string;
    is_active: boolean;
    is_homepage: boolean;
    order: number;
    meta?: Record<string, any>;
    created_by?: number;
    updated_by?: number;
    created_at: string;
    updated_at: string;
    contents?: PageContent[];
    components?: PageComponent[];
}

export interface PageContent {
    id: number;
    page_id: number;
    locale: string;
    title: string;
    subtitle?: string;
    description?: string;
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
}

export interface PageComponent {
    id: number;
    name: string;
    type: string;
    order: number;
    settings?: Record<string, any>;
    data?: Record<string, any>;
}

export interface CreatePageData {
    slug: string;
    template: string;
    is_active?: boolean;
    is_homepage?: boolean;
    order?: number;
    meta?: Record<string, any>;
    contents: Array<{
        locale: string;
        title: string;
        subtitle?: string;
        description?: string;
        seo?: Record<string, any>;
    }>;
}

export interface UpdatePageData {
    slug?: string;
    template?: string;
    is_active?: boolean;
    is_homepage?: boolean;
    order?: number;
    meta?: Record<string, any>;
}

export interface UpdatePageContentData {
    locale: string;
    title: string;
    subtitle?: string;
    description?: string;
    seo?: Record<string, any>;
}

class PageService {
    async getAll(params?: { locale?: string; template?: string; status?: string }): Promise<Page[]> {
        const response = await apiClient.get<{ success: boolean; data: Page[] }>('/admin/pages', { params });
        return response.data.data;
    }

    async getById(id: number, locale?: string): Promise<Page> {
        const response = await apiClient.get<{ success: boolean; data: Page }>(`/admin/pages/${id}`, {
            params: { locale },
        });
        return response.data.data;
    }

    async create(data: CreatePageData): Promise<Page> {
        const response = await apiClient.post<{ success: boolean; data: Page }>('/admin/pages', data);
        return response.data.data;
    }

    async update(id: number, data: UpdatePageData): Promise<Page> {
        const response = await apiClient.put<{ success: boolean; data: Page }>(`/admin/pages/${id}`, data);
        return response.data.data;
    }

    async updateContent(id: number, data: UpdatePageContentData): Promise<PageContent> {
        const response = await apiClient.put<{ success: boolean; data: PageContent }>(
            `/admin/pages/${id}/content`,
            data
        );
        return response.data.data;
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/admin/pages/${id}`);
    }

    async duplicate(id: number): Promise<Page> {
        const response = await apiClient.post<{ success: boolean; data: Page }>(`/admin/pages/${id}/duplicate`);
        return response.data.data;
    }

    async attachComponent(pageId: number, componentId: number, order: number, settings?: Record<string, any>): Promise<void> {
        await apiClient.post(`/admin/pages/${pageId}/components`, {
            component_id: componentId,
            order,
            settings,
            is_visible: true,
        });
    }

    async detachComponent(pageId: number, componentId: number): Promise<void> {
        await apiClient.delete(`/admin/pages/${pageId}/components`, {
            data: { component_id: componentId },
        });
    }

    async updateComponentOrder(pageId: number, components: Array<{ id: number; order: number }>): Promise<void> {
        await apiClient.put(`/admin/pages/${pageId}/components/order`, { components });
    }
}

export const pageService = new PageService();
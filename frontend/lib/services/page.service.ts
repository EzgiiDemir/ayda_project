import apiClient from '@/lib/api-client';

export interface Page {
    id: number;
    slug: string;
    template: string;
    is_active: boolean;
    is_homepage: boolean;
    order: number;
    meta?: Record<string, any>;
    created_at: string;
    updated_at: string;
    contents?: PageContent[];
    components?: any[];
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
    created_at: string;
    updated_at: string;
}

export interface CreatePageData {
    slug: string;
    template: string;
    is_active?: boolean;
    is_homepage?: boolean;
    order?: number;
    meta?: Record<string, any>;
    contents: {
        locale: string;
        title: string;
        subtitle?: string;
        description?: string;
        seo?: Record<string, any>;
    }[];
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
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
}

class PageService {
    // Admin - Get all pages
    async getAll(params?: { locale?: string; template?: string; status?: string }): Promise<Page[]> {
        const response = await apiClient.get<{ success: boolean; data: Page[] }>('/admin/pages', { params });
        return response.data.data;
    }

    // Admin - Get single page
    async getById(id: number, params?: { locale?: string }): Promise<Page> {
        const response = await apiClient.get<{ success: boolean; data: Page }>(`/admin/pages/${id}`, { params });
        return response.data.data;
    }

    // Admin - Create page
    async create(data: CreatePageData): Promise<Page> {
        const response = await apiClient.post<{ success: boolean; data: Page }>('/admin/pages', data);
        return response.data.data;
    }

    // Admin - Update page settings
    async update(id: number, data: UpdatePageData): Promise<Page> {
        const response = await apiClient.put<{ success: boolean; data: Page }>(`/admin/pages/${id}`, data);
        return response.data.data;
    }

    // Admin - Update page content (specific locale)
    async updateContent(id: number, data: UpdatePageContentData): Promise<PageContent> {
        const response = await apiClient.put<{ success: boolean; data: PageContent }>(
            `/admin/pages/${id}/content`,
            data
        );
        return response.data.data;
    }

    // Admin - Delete page
    async delete(id: number): Promise<void> {
        await apiClient.delete(`/admin/pages/${id}`);
    }

    // Admin - Duplicate page
    async duplicate(id: number): Promise<Page> {
        const response = await apiClient.post<{ success: boolean; data: Page }>(`/admin/pages/${id}/duplicate`);
        return response.data.data;
    }

    // Admin - Attach component to page
    async attachComponent(
        pageId: number,
        data: {
            component_id: number;
            order?: number;
            settings?: Record<string, any>;
            is_visible?: boolean;
        }
    ): Promise<void> {
        await apiClient.post(`/admin/pages/${pageId}/components`, data);
    }

    // Admin - Detach component from page
    async detachComponent(pageId: number, componentId: number): Promise<void> {
        await apiClient.delete(`/admin/pages/${pageId}/components`, {
            data: { component_id: componentId }
        });
    }

    // Admin - Update component order
    async updateComponentOrder(
        pageId: number,
        components: { id: number; order: number }[]
    ): Promise<void> {
        await apiClient.put(`/admin/pages/${pageId}/components/order`, { components });
    }

    // Public - Get page by slug (Frontend)
    async getBySlug(slug: string, locale: string = 'tr'): Promise<any> {
        const response = await apiClient.get<{ success: boolean; data: any }>(
            `/public/pages/${slug}`,
            { params: { locale } }
        );
        return response.data.data;
    }
}

export const pageService = new PageService();
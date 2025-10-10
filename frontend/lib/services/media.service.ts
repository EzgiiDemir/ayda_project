// lib/services/media.service.ts
import apiClient from '@/lib/api-client';

export interface Media {
    id: number;
    name: string;
    filename: string;
    path: string;
    url: string;
    mime_type: string;
    size: number;
    size_formatted: string;
    type: 'image' | 'video' | 'document';
    collection: string;
    uploaded_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedMediaResponse {
    current_page: number;
    data: Media[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MediaFilters {
    type?: 'image' | 'video' | 'document';
    search?: string;
    per_page?: number;
    page?: number;
}

class MediaService {
    async getAll(filters?: MediaFilters): Promise<PaginatedMediaResponse> {
        try {
            const response = await apiClient.get<PaginatedMediaResponse>('/admin/media', {
                params: filters,
            });

            // Laravel paginate doğrudan response.data döner
            return response.data;
        } catch (error) {
            console.error('Failed to fetch media:', error);
            // Fallback: boş liste döndür
            return {
                current_page: 1,
                data: [],
                first_page_url: '',
                from: 0,
                last_page: 1,
                last_page_url: '',
                next_page_url: null,
                path: '',
                per_page: 24,
                prev_page_url: null,
                to: 0,
                total: 0,
            };
        }
    }

    async getById(id: number): Promise<Media> {
        const response = await apiClient.get<{ success: boolean; data: Media }>(
            `/admin/media/${id}`
        );
        return response.data.data;
    }

    async upload(file: File, collection: string = 'general'): Promise<Media> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('collection', collection);

        const response = await apiClient.post<{ success: boolean; data: Media }>(
            '/admin/media/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    }

    async uploadMultiple(files: File[], collection: string = 'general'): Promise<Media[]> {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files[]', file);
        });
        formData.append('collection', collection);

        const response = await apiClient.post<{ success: boolean; data: Media[] }>(
            '/admin/media/upload-multiple',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    }

    async update(id: number, data: Partial<Media>): Promise<Media> {
        const response = await apiClient.put<{ success: boolean; data: Media }>(
            `/admin/media/${id}`,
            data
        );
        return response.data.data;
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/admin/media/${id}`);
    }

    async deleteMultiple(ids: number[]): Promise<void> {
        await apiClient.post('/admin/media/delete-multiple', { ids });
    }
}

export const mediaService = new MediaService();
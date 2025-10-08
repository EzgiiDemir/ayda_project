import apiClient from '@/lib/api-client';

export interface Media {
    id: number;
    name: string;
    file_name: string;
    mime_type: string;
    path: string;
    disk: string;
    size: number;
    size_formatted: string;
    url: string;
    metadata?: {
        width?: number;
        height?: number;
    };
    collection?: string;
    uploaded_by?: number;
    created_at: string;
    updated_at: string;
}

export interface MediaPagination {
    data: Media[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

class MediaService {
    async getAll(params?: {
        collection?: string;
        type?: 'image' | 'video' | 'document';
        per_page?: number;
        page?: number;
    }): Promise<MediaPagination> {
        const response = await apiClient.get<{ success: boolean; data: MediaPagination }>('/admin/media', { params });
        return response.data.data;
    }

    async getById(id: number): Promise<Media> {
        const response = await apiClient.get<{ success: boolean; data: Media }>(`/admin/media/${id}`);
        return response.data.data;
    }

    async upload(file: File, collection?: string, name?: string): Promise<Media> {
        const formData = new FormData();
        formData.append('file', file);
        if (collection) formData.append('collection', collection);
        if (name) formData.append('name', name);

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

    async uploadMultiple(files: File[], collection?: string): Promise<Media[]> {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files[]', file);
        });
        if (collection) formData.append('collection', collection);

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

    async update(id: number, data: { name?: string; collection?: string }): Promise<Media> {
        const response = await apiClient.put<{ success: boolean; data: Media }>(`/admin/media/${id}`, data);
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
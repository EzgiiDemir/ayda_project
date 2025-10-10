import api from '@/lib/axios';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
}

interface NavbarApiData {
    id: number;
    locale: string;
    logo_url: string | null;
    logo_alt: string | null;
    phone_number: string | null;
    about_links: Array<{
        id: string;
        label: string;
        href: string;
    }> | null;
    treatments_links: Array<{
        id: string;
        label: string;
        href: string;
    }> | null;
    regular_links: Array<{
        id: string;
        label: string;
        href: string;
    }> | null;
    created_at: string;
    updated_at: string;
}

interface NavbarUpdatePayload {
    locale: string;
    logo_url?: string | null;
    logo_alt?: string | null;
    phone_number?: string | null;
    about_links?: Array<{
        id: string;
        label: string;
        href: string;
    }> | null;
    treatments_links?: Array<{
        id: string;
        label: string;
        href: string;
    }> | null;
    regular_links?: Array<{
        id: string;
        label: string;
        href: string;
    }> | null;
}

class ConfigService {
    /**
     * GET /api/public/config/navbar?locale=tr
     */
    async getNavbar(locale: string): Promise<NavbarApiData> {
        try {
            const { data } = await api.get<ApiResponse<NavbarApiData>>('/public/config/navbar', {
                params: { locale },
            });

            if (!data.success || !data.data) {
                throw new Error(data.message || 'Failed to fetch navbar config');
            }

            return data.data;
        } catch (error: any) {
            // 404 ise boş structure dön (ilk kez oluşturulacak)
            if (error.response?.status === 404) {
                console.warn('Navbar config not found, returning empty structure');
                return {
                    id: 0,
                    locale: locale,
                    logo_url: null,
                    logo_alt: null,
                    phone_number: null,
                    about_links: [],
                    treatments_links: [],
                    regular_links: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
            }
            console.error('Error fetching navbar config:', error);
            throw error;
        }
    }

    /**
     * PUT /api/admin/config/navbar
     */
    async updateNavbar(payload: NavbarUpdatePayload): Promise<NavbarApiData> {
        try {
            const { data } = await api.put<ApiResponse<NavbarApiData>>('/admin/config/navbar', payload);

            if (!data.success || !data.data) {
                if (data.errors) {
                    const errorMessages = Object.entries(data.errors)
                        .map(([field, messages]: [string, any]) => `${field}: ${messages.join(', ')}`)
                        .join('\n');
                    throw new Error(errorMessages);
                }
                throw new Error(data.message || 'Failed to update navbar config');
            }

            return data.data;
        } catch (error: any) {
            console.error('Error updating navbar config:', error);
            throw error;
        }
    }

    // Hero
    async getHero(locale: string) {
        const { data } = await api.get<ApiResponse<any>>('/public/config/hero', { params: { locale } });
        return data.data;
    }

    async updateHero(payload: any) {
        const { data } = await api.put<ApiResponse<any>>('/admin/config/hero', payload);
        return data.data;
    }

    // Welcome
    async getWelcome(locale: string) {
        const { data } = await api.get<ApiResponse<any>>('/public/config/welcome', { params: { locale } });
        return data.data;
    }

    async updateWelcome(payload: any) {
        const { data } = await api.put<ApiResponse<any>>('/admin/config/welcome', payload);
        return data.data;
    }

    // Treatments
    async getTreatments(locale: string) {
        const { data } = await api.get<ApiResponse<any>>('/public/config/treatments', { params: { locale } });
        return data.data;
    }

    async updateTreatments(payload: any) {
        const { data } = await api.put<ApiResponse<any>>('/admin/config/treatments', payload);
        return data.data;
    }

    // Footer
    async getFooter(locale: string) {
        const { data } = await api.get<ApiResponse<any>>('/public/config/footer', { params: { locale } });
        return data.data;
    }

    async updateFooter(payload: any) {
        const { data } = await api.put<ApiResponse<any>>('/admin/config/footer', payload);
        return data.data;
    }

    // Contact
    async getContact(locale: string) {
        const { data } = await api.get<ApiResponse<any>>('/public/config/contact', { params: { locale } });
        return data.data;
    }

    async updateContact(payload: any) {
        const { data } = await api.put<ApiResponse<any>>('/admin/config/contact', payload);
        return data.data;
    }

    // FAQ
    async getFaq(locale: string) {
        const { data } = await api.get<ApiResponse<any>>('/public/config/faq', { params: { locale } });
        return data.data;
    }

    async updateFaq(payload: any) {
        const { data } = await api.put<ApiResponse<any>>('/admin/config/faq', payload);
        return data.data;
    }

    // Get All Configs
    async getAllConfigs(locale: string) {
        const { data } = await api.get<ApiResponse<any>>('/admin/config/all', { params: { locale } });
        return data.data;
    }
}

export const configService = new ConfigService();
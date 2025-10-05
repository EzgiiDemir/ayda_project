import axios from 'axios';
import type { TravelApiResponse } from '@/types/travel';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const travelApi = {
    async getTravel(locale: string = 'tr'): Promise<TravelApiResponse> {
        try {
            const response = await api.get<TravelApiResponse>('/travel', {
                params: {
                    locale,
                    populate: 'deep',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching travel data:', error);
            throw error;
        }
    },

    async getTravelSections(locale: string = 'tr') {
        try {
            const response = await api.get('/travel-sections', {
                params: {
                    locale,
                    populate: '*',
                    sort: 'order:asc',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching travel sections:', error);
            throw error;
        }
    },
};
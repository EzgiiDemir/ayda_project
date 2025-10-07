import 'server-only';
import axios from 'axios';
import { PageDoc } from '@/types/page';

const api = axios.create({ baseURL: process.env.BACKEND_URL, timeout: 10000 });

export async function getPage(slug:string, locale:string): Promise<PageDoc|null> {
    try {
        const { data } = await api.get('/api/pages', { params:{ slug, locale } });
        return data ?? null;
    } catch { return null; }
}

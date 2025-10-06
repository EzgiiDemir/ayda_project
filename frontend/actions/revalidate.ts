
'use server';

import { revalidateTag } from 'next/cache';
import { revalidateFooter } from '@/lib/api/footer';

export async function revalidateFooterAction(locale?: string) {
    try {
        await revalidateFooter(locale);
        return { success: true, message: 'Footer revalidated successfully' };
    } catch (error) {
        console.error('Footer revalidation failed:', error);
        return { success: false, message: 'Footer revalidation failed' };
    }
}

// Webhook endpoint for Strapi to call when footer is updated
export async function handleFooterWebhook(locale: string) {
    try {
        revalidateTag(`footer-${locale}`);
        return { success: true };
    } catch (error) {
        console.error('Webhook revalidation failed:', error);
        return { success: false };
    }
}
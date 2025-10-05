import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
    let locale = await requestLocale;
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    const baseMessages = (await import(`../messages/${locale}.json`).catch(() => ({default:{}}))).default;
    const contact      = (await import(`@/messages/${locale}/contact.json`).catch(() => ({default:{}}))).default;
    const footer       = (await import(`@/messages/${locale}/Footer.json`).catch(() => ({default:{}}))).default;
    const treatments   = (await import(`@/messages/${locale}/treatments.json`).catch(() => ({default:{}}))).default;
    const faq          = (await import(`@/messages/${locale}/faq.json`).catch(() => ({default:{}}))).default;

    return {
        locale,
        messages: {
            ...baseMessages,
            contact,
            Footer: footer,
            treatments,
            faq                // 👈 burada
        }
    };
});

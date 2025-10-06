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
    const whyUs        = (await import(`@/messages/${locale}/whyUs.json`).catch(() => ({default:{}}))).default;
    const ourPrices = (await import(`@/messages/${locale}/ourPrices.json`).catch(() => ({ default: {} }))).default;
    const eggDonation = (await import(`@/messages/${locale}/eggDonation.json`).catch(() => ({ default: {} }))).default;
    const spermDonation = (await import(`@/messages/${locale}/spermDonation.json`).catch(() => ({ default: {} }))).default;
    const embryoDonation = (await import(`@/messages/${locale}/embryoDonation.json`).catch(() => ({ default: {} }))).default;
    const eggFreezing = (await import(`@/messages/${locale}/eggFreezing.json`).catch(() => ({ default: {} }))).default;
    const ovarianEndometrial = (await import(`@/messages/${locale}/ovarianEndometrial.json`).catch(() => ({ default: {} }))).default;
    const acupuncture = (await import(`@/messages/${locale}/acupuncture.json`).catch(() => ({ default: {} }))).default;

    return {
        locale,
        messages: {
            ...baseMessages,
            contact,
            Footer: footer,
            treatments,
            faq,
            whyUs,
            ourPrices,
            eggDonation,
            spermDonation,
            embryoDonation,
            eggFreezing,
            ovarianEndometrial,
            acupuncture
        }
    };
});

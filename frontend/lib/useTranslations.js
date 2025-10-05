import tr from '@/messages/tr.json';
import en from '@/messages/en.json';

export function useTranslations(locale = 'tr') {
    const messages = locale === 'en' ? en : tr;
    return (key) => messages[key] || key;
}

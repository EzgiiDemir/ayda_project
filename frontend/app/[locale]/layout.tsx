import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import 'antd/dist/reset.css';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: { locale: string }; // ❗ Promise değil
}) {
    const { locale } = params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
        <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </NextIntlClientProvider>
        </body>
        </html>
    );
}

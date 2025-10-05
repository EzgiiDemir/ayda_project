'use client';

import { useLocale } from 'next-intl'; // ✅ FIXED: useLocale (not useLocal)
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const languages = {
    tr: { name: 'Türkçe', flag: '🇹🇷' },
    en: { name: 'English', flag: '🇬🇧' },
} as const;

export default function LanguageSwitcher() {
    const locale = useLocale(); // ✅ FIXED
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const switchLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <Globe className="w-5 h-5 text-gray-700" />
                <span className="text-lg">{languages[locale as keyof typeof languages].flag}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg overflow-hidden min-w-[140px] z-50 border border-gray-200">
                        {Object.entries(languages).map(([code, lang]) => (
                            <button
                                key={code}
                                onClick={() => switchLocale(code)}
                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-pink-50 transition-colors ${
                                    locale === code ? 'bg-pink-100 text-pink-600' : 'text-gray-700'
                                }`}
                            >
                                <span className="text-xl">{lang.flag}</span>
                                <span className="font-medium">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
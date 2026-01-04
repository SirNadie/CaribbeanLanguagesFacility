import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Language } from './translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detect browser language
const detectBrowserLanguage = (): Language => {
    if (typeof window === 'undefined') return 'es';

    // Check localStorage first
    const stored = localStorage.getItem('clf-language');
    if (stored === 'en' || stored === 'es') return stored;

    // Detect from browser
    const browserLang = navigator.language || (navigator as any).userLanguage || 'es';
    return browserLang.startsWith('en') ? 'en' : 'es';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('es');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const detectedLang = detectBrowserLanguage();
        setLanguageState(detectedLang);
        document.documentElement.lang = detectedLang;

        // Listen for language changes from outside React (e.g. Header)
        const handleLanguageChange = (e: CustomEvent<Language>) => {
            setLanguageState(e.detail);
        };

        window.addEventListener('languageChange', handleLanguageChange as EventListener);
        return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('clf-language', lang);
        document.documentElement.lang = lang;
    };

    // Translation function
    const t = (section: string, key: string): string => {
        try {
            const sectionObj = (translations as any)[section];
            if (!sectionObj) return key;

            const translation = sectionObj[key];
            if (!translation) return key;

            if (typeof translation === 'string') return translation;
            return translation[language] || translation['es'] || key;
        } catch {
            return key;
        }
    };

    // Prevent hydration mismatch by showing nothing until mounted
    // if (!mounted) {
    //    return <>{children}</>;
    // }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Hook for use outside of React (in Astro components)
export function getStoredLanguage(): Language {
    if (typeof window === 'undefined') return 'es';
    const stored = localStorage.getItem('clf-language');
    if (stored === 'en' || stored === 'es') return stored;
    const browserLang = navigator.language || 'es';
    return browserLang.startsWith('en') ? 'en' : 'es';
}

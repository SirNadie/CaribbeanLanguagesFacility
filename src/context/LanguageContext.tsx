"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationKey, Language } from '../i18n/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('es');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('clf-language') as Language;
        if (stored) {
            setLanguageState(stored);
        } else {
            const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
            setLanguageState(browserLang);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('clf-language', lang);
        document.documentElement.lang = lang;
    };

    const t = (keyStr: string): string => {
        const keys = keyStr.split('.');
        let value: any = translations;

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return keyStr;
            }
        }

        if (typeof value === 'object' && value !== null) {
            // @ts-ignore
            return value[language] || value['es'] || keyStr;
        }

        return value || keyStr;
    };



    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

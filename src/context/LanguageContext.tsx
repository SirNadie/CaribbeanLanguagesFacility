"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../i18n/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isModalOpen: boolean;
    selectedService: string;
    setSelectedService: (service: string) => void;
    openModal: (service?: string) => void;
    closeModal: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('es');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('Traducción/Interpretación');

    useEffect(() => {
        const stored = localStorage.getItem('clf-language') as Language;
        if (stored) {
            setLanguageState(stored);
        } else {
            const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
            setLanguageState(browserLang);
        }
    }, []);

    // Listen for modal open events
    useEffect(() => {
        const handleOpenModal = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            if (customEvent.detail) {
                setSelectedService(customEvent.detail);
            }
            setIsModalOpen(true);
        };

        window.addEventListener('openContactModal', handleOpenModal);
        return () => window.removeEventListener('openContactModal', handleOpenModal);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('clf-language', lang);
        document.documentElement.lang = lang;
    };

    const openModal = (service?: string) => {
        if (service) {
            setSelectedService(service);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
            const langValue = value as Record<string, string>;
            return langValue[language] || langValue['es'] || keyStr;
        }

        return value || keyStr;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isModalOpen, selectedService, setSelectedService, openModal, closeModal }}>
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

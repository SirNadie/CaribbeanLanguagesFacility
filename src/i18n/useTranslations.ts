"use client";

import { useLanguage } from '../context/LanguageContext';
import { translations, Language } from './translations';

type TranslationObject = typeof translations;
type TranslationKeys = keyof TranslationObject;

// Helper type to get nested keys
type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<TranslationObject>;

/**
 * Hook for type-safe translations
 * @example
 * const { t } = useTranslations();
 * const title = t('hero.title'); // Type-safe!
 */
export function useTranslations() {
    const { language, t: contextT } = useLanguage();

    const t = (key: TranslationKey): string => {
        return contextT(key);
    };

    /**
     * Get translation with fallback
     */
    const tWithFallback = (key: TranslationKey, fallback: string): string => {
        const result = contextT(key);
        // If the key is returned as-is (not found), use fallback
        return result === key ? fallback : result;
    };

    /**
     * Get translation for current language directly
     */
    const tDirect = (key: TranslationKey): string => {
        const keys = key.split('.');
        let value: any = translations;

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }

        if (typeof value === 'object' && value !== null) {
            const langValue = value as Record<string, string>;
            return langValue[language] || langValue['es'] || key;
        }

        return value || key;
    };

    return {
        t,
        tWithFallback,
        tDirect,
        language,
        isSpanish: language === 'es',
        isEnglish: language === 'en',
    };
}

export default useTranslations;
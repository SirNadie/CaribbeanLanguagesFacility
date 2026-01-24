"use client";

import { useLanguage } from '../context/LanguageContext';

export default function SkipLink() {
    const { t } = useLanguage();
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none"
        >
            {t('accessibility.skipToContent')}
        </a>
    );
}

"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <>
            <Header />
            <main className="pt-28 pb-20 bg-gradient-to-b from-white to-slate-50 min-h-screen flex items-center justify-center">
                <div className="max-w-xl mx-auto px-4 text-center">
                    <div className="mb-8">
                        <span className="text-9xl font-bold text-primary/20">404</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                        {t('notFound.subtitle')}
                    </h1>
                    <p className="text-lg text-text-light/70 mb-8">
                        {t('notFound.description')}
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                    >
                        <span className="material-symbols-outlined">home</span>
                        {t('notFound.backHome')}
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm py-2'
                : 'bg-white/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4'
                }`}
        >
            <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 max-w-7xl mx-auto">
                {/* Logo & Title */}
                <Link href="/" className="flex items-center gap-2 sm:gap-4 z-[101] group" onClick={closeMenu}>
                    <div className="h-10 sm:h-12 w-auto flex-shrink-0 relative transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/images/logos/INSIlogo.png"
                            alt="INSI Logo"
                            className="object-contain drop-shadow-sm"
                            width={48}
                            height={48}
                            priority
                        />
                    </div>
                    <h2 className="font-display font-bold text-lg sm:text-xl tracking-tight text-primary truncate max-w-[200px] sm:max-w-none">
                        <span>{t('header.siteTitle')}</span>
                    </h2>
                </Link>

                {/* Desktop Navigation & Language */}
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-8 text-sm font-medium text-text-light/90">
                        {['home', 'services', 'education', 'contact'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'home' ? '/' : `/#${item === 'contact' ? 'contact-section' : item === 'education' ? 'education-section' : 'services'}`}
                                className="relative py-1 hover:text-accent transition-colors group"
                            >
                                {t(`header.${item}`)}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    <div className="h-6 w-px bg-gray-200"></div>

                    {/* Language Toggle */}
                    <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-gray-200/50 shadow-sm">
                        <button
                            onClick={() => setLanguage('es')}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${language === 'es' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary hover:bg-gray-100'
                                }`}
                        >
                            ES
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${language === 'en' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary hover:bg-gray-100'
                                }`}
                        >
                            EN
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden z-[101]">
                    <button
                        onClick={toggleMenu}
                        className="p-2 -mr-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Menu"
                    >
                        <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${isMenuOpen ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`}>menu</span>
                        <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>close</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 h-[100dvh] bg-white z-[100] pt-28 px-6 pb-[env(safe-area-inset-bottom)] flex flex-col gap-8 md:hidden shadow-xl overflow-y-auto"
                    >
                        <nav className="flex flex-col gap-6 text-3xl font-medium text-primary text-center">
                            {['home', 'services', 'education', 'contact'].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={item === 'home' ? '/' : `/#${item === 'contact' ? 'contact-section' : item === 'education' ? 'education-section' : 'services'}`}
                                        onClick={closeMenu}
                                        className="block py-2 hover:text-accent transition-colors"
                                    >
                                        {t(`header.${item}`)}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center gap-4 mt-auto mb-10 p-4 bg-gray-50 rounded-2xl mx-auto w-full max-w-xs"
                        >
                            <button
                                onClick={() => { setLanguage('es'); }}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold text-center border transition-all ${language === 'es' ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white text-text-muted border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                Español
                            </button>
                            <button
                                onClick={() => { setLanguage('en'); }}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold text-center border transition-all ${language === 'en' ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white text-text-muted border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                English
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { fadeIn, staggerContainer } from '../../lib/animations';
import heroImg from '../../assets/images/hero.jpg';

export default function Hero() {
    const { t, language } = useLanguage();

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden mesh-gradient-hero">
            {/* Abstract Shapes */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col gap-6 sm:gap-8 text-left"
                >
                    <motion.h1 variants={fadeIn} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-primary tracking-tight">
                        {t('hero.title')}
                    </motion.h1>
                    <motion.p variants={fadeIn} className="text-lg sm:text-xl text-text-light/80 max-w-xl font-body leading-relaxed">
                        {t('hero.subtitle')}
                    </motion.p>
                    {/* Badge - Más sutil debajo del subtítulo */}
                    <motion.div variants={fadeIn} className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                            {language === 'es' ? 'Trinidad y Tobago' : 'Trinidad and Tobago'}
                        </span>
                    </motion.div>
                    <motion.div variants={fadeIn} className="flex flex-col sm:flex-row flex-wrap gap-3 w-full pt-4">
                        <Link
                            href="#services"
                            className="group relative flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-2xl bg-primary px-8 sm:px-10 font-bold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                                {t('hero.ctaTranslation')}
                                <span className="material-symbols-outlined text-sm">translate</span>
                            </span>
                            <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-0 bg-accent transition-transform duration-500 ease-out"></div>
                        </Link>
                        <Link
                            href="#education-section"
                            className="group relative flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-2xl bg-secondary px-8 sm:px-10 font-bold text-white shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                                {t('hero.ctaEducation')}
                                <span className="material-symbols-outlined text-sm">school</span>
                            </span>
                            <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-0 bg-orange-600 transition-transform duration-500 ease-out"></div>
                        </Link>
                        <Link
                            href="#casa-section"
                            className="group flex h-12 sm:h-14 items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-white/90 backdrop-blur-sm px-6 sm:px-8 font-bold text-primary shadow-md hover:border-accent hover:text-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 text-sm sm:text-base"
                        >
                            {t('hero.ctaCasa')}
                            <span className="material-symbols-outlined text-sm">workspace_premium</span>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-[4/5] lg:aspect-square max-w-lg mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[2rem] rotate-3 opacity-20 blur-lg"></div>
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/40">
                        <Image
                            src={heroImg}
                            alt={language === 'es' ? 'Estudiantes en clase de idiomas bilingüe' : 'Students in bilingual language class'}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                            fill
                            placeholder="blur"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Oculto en móvil pequeño */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-light/50"
            >
                <span className="text-xs font-medium uppercase tracking-wider">{language === 'es' ? 'Explorar' : 'Explore'}</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span aria-hidden="true" className="material-symbols-outlined text-2xl">expand_more</span>
                </motion.div>
            </motion.div>
        </section>
    );
}

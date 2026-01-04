"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { fadeIn, staggerContainer } from '../../lib/animations';
import heroImg from '../../assets/images/hero.jpg';

export default function Hero() {
    const { t } = useLanguage();

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
                    className="flex flex-col gap-8 text-left"
                >
                    <motion.h1 variants={fadeIn} className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] text-primary tracking-tight">
                        {t('hero.title')}
                    </motion.h1>
                    <motion.p variants={fadeIn} className="text-lg sm:text-xl text-text-light/80 max-w-xl font-body leading-relaxed">
                        {t('hero.subtitle')}
                    </motion.p>
                    <motion.div variants={fadeIn} className="flex flex-col sm:flex-row flex-wrap gap-4 w-full pt-6">
                        <Link
                            href="#services"
                            className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-10 font-bold text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {t('hero.ctaTranslation')}
                                <span className="material-symbols-outlined text-sm">translate</span>
                            </span>
                            <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-0 bg-accent transition-transform duration-500 ease-out"></div>
                        </Link>
                        <Link
                            href="#education-section"
                            className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-secondary px-10 font-bold text-white shadow-xl shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {t('hero.ctaEducation')}
                                <span className="material-symbols-outlined text-sm">school</span>
                            </span>
                            <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-0 bg-orange-600 transition-transform duration-500 ease-out"></div>
                        </Link>
                        <Link
                            href="#casa-section"
                            className="group flex h-14 items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-white/80 backdrop-blur-sm px-10 font-bold text-primary shadow-lg shadow-gray-200/50 hover:border-accent hover:text-accent hover:shadow-accent/20 transition-all duration-300 hover:scale-105"
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
                            alt="Hero"
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                            fill
                            placeholder="blur"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

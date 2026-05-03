"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function CASA() {
    const { t, language, openModal } = useLanguage();

    return (
        <section id="casa-section" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute right-[-10%] top-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl sm:text-4xl text-center font-bold text-primary mb-12"
                >
                    {language === 'es' ? 'Desarrollo Profesional' : 'Professional Development'}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CASA Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-28 h-28 bg-accent/8 rounded-bl-[80px] -mr-6 -mt-6 transition-transform group-hover:scale-125 duration-500"></div>

                        <div className="h-14 mb-6 relative z-10 w-fit">
                            <Image
                                src="/images/logos/CLFlogo.png"
                                alt="CLF"
                                width={56}
                                height={56}
                                className="h-full w-auto object-contain bg-white rounded-xl p-1"
                                loading="lazy"
                            />
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-3 text-primary relative z-10">{t('casa.title')}</h3>
                        <p className="text-text-light/80 mb-6 relative z-10">{t('casa.description')}</p>
                        <div className="mt-auto relative z-10 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => openModal('Capacitación (CASA)')}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg"
                            >
                                {t('translation.requestInfo')}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                            <a
                                href="/programas"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary/10 text-primary font-medium rounded-xl hover:bg-primary/20 transition-colors text-sm"
                            >
                                <span className="material-symbols-outlined text-sm">school</span>
                                {language === 'es' ? 'Programas' : 'Programs'}
                            </a>
                        </div>
                    </motion.div>

                    {/* Classes Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="group bg-slate-900 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent/20 to-transparent"></div>

                        <div className="mb-6 relative z-10 text-secondary">
                            <span className="material-symbols-outlined text-5xl">cast_for_education</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-3 relative z-10">{t('classes.title')}</h3>
                        <p className="text-white/70 mb-6 relative z-10">{t('classes.subtitle')}</p>
                        <div className="mt-auto relative z-10">
                            <button
                                onClick={() => openModal('Otro')}
                                className="w-full sm:w-auto px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-md"
                            >
                                {t('translation.requestInfo')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

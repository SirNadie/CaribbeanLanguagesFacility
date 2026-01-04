"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { selectService } from '../../lib/utils';
import clfLogo from '../../assets/images/logos/CLFlogo.png';

export default function CASA() {
    const { t } = useLanguage();

    return (
        <section id="casa-section" className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute right-[-10%] top-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl text-center font-bold text-primary mb-16"
                >
                    Professional Development
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* CASA Card */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        className="group bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>

                        <div className="h-16 mb-8 relative z-10 w-fit">
                            <Image
                                src="/images/logos/CLFlogo.png"
                                alt="CLF"
                                width={64}
                                height={64}
                                className="h-full w-auto object-contain bg-white rounded-lg p-1"
                            />
                        </div>
                        <h3 className="font-display text-3xl font-bold mb-4 text-primary relative z-10">{t('casa.title')}</h3>
                        <p className="text-text-light/70 mb-8 relative z-10 text-lg">{t('casa.description')}</p>
                        <div className="mt-auto relative z-10">
                            <button
                                onClick={() => selectService('Capacitación (CASA)')}
                                className="text-accent font-bold mt-4 flex items-center gap-2 group-hover:gap-4 transition-all"
                            >
                                {t('translation.requestInfo')}
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Classes Card */}
                    <motion.div
                        whileHover={{ y: -8 }}
                        className="group bg-slate-900 text-white p-10 rounded-3xl shadow-xl flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary to-slate-800 opacity-50"></div>

                        <div className="mb-8 relative z-10 text-secondary">
                            <span className="material-symbols-outlined text-6xl">cast_for_education</span>
                        </div>
                        <h3 className="font-display text-3xl font-bold mb-4 relative z-10">{t('classes.title')}</h3>
                        <p className="text-white/70 mb-8 relative z-10 text-lg">{t('classes.subtitle')}</p>
                        <div className="mt-auto relative z-10">
                            <button
                                onClick={() => selectService('Other')}
                                className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors w-fit"
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

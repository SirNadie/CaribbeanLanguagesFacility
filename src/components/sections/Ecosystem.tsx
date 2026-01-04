"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function Ecosystem() {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-text-light uppercase tracking-widest mb-3">{t('ecosystem.title')}</h2>
                    <p className="text-accent font-medium text-lg">{t('ecosystem.subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Lisa's Kids */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                        <div className="h-20 w-auto mb-2 relative">
                            <Image
                                src="/images/logos/CASAlogo.png"
                                alt="Lisa's Kids"
                                width={80}
                                height={80}
                                className="h-full w-auto object-contain brightness-95"
                            />
                        </div>
                        <h3 className="font-bold text-secondary text-lg leading-tight">{t('ecosystem.childEducation')}</h3>
                        <p className="text-sm text-text-light/70">{t('education.lisasKids')}</p>
                    </motion.div>

                    {/* CASA */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                        <div className="h-20 w-auto mb-2 relative">
                            <Image
                                src="/images/logos/CLFlogo.png"
                                alt="CASA"
                                width={80}
                                height={80}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <h3 className="font-bold text-accent text-lg leading-tight">{t('ecosystem.technicalTraining')}</h3>
                        <p className="text-sm text-text-light/70">{t('casa.title')}</p>
                    </motion.div>

                    {/* Translations */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                        <div className="h-20 w-auto mb-2 relative">
                            <Image
                                src="/images/logos/INSIlogo.png"
                                alt="Translations"
                                width={80}
                                height={80}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <h3 className="font-bold text-primary text-lg leading-tight">{t('ecosystem.linguisticServices')}</h3>
                        <p className="text-sm text-text-light/70">{t('ecosystem.translationInterp')}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

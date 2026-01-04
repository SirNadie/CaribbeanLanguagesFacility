"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { selectService } from '../../lib/utils';
import transImg from '../../assets/images/translation.jpg';

export default function Services() {
    const { t } = useLanguage();

    return (
        <section id="services" className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src={transImg}
                            alt="Translation"
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        <div className="absolute bottom-8 left-8 text-white">
                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl inline-block mb-2">
                                <span className="material-symbols-outlined text-3xl">translate</span>
                            </div>
                            <p className="font-bold text-lg">Professional Certified Services</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2 space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <Image src="/images/logos/INSIlogo.png" alt="Insignia" width={64} height={64} className="h-full w-full object-contain" />
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-primary">{t('translation.title')}</h2>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-accent">{t('translation.servicesTitle')}</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    t('translation.legalDocs'), t('translation.migration'),
                                    t('translation.certificates'), t('translation.academicDocs'),
                                    t('translation.formalLetters')
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-text-light/80">
                                        <span className="material-symbols-outlined text-accent text-sm">check_circle</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => selectService('Traducción/Interpretación')}
                                className="inline-flex items-center gap-2 mt-4 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:gap-4 transition-all shadow-lg shadow-primary/20"
                            >
                                {t('translation.requestInfo')}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

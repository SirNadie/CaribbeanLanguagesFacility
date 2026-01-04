"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { selectService } from '../../lib/utils';
import eduImg from '../../assets/images/kids.jpg';

export default function Education() {
    const { t } = useLanguage();

    return (
        <section id="education-section" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                                <span className="material-symbols-outlined text-4xl">school</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-primary">{t('education.title')}</h2>
                        </div>
                        <h3 className="text-2xl font-bold text-secondary">{t('education.lisasKids')}</h3>
                        <p className="text-lg text-text-light/80 leading-relaxed border-l-4 border-secondary/20 pl-6">
                            {t('education.description')}
                        </p>

                        <button
                            onClick={() => selectService("Educación Bilingüe (Lisa's Kids)")}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 hover:gap-4 transition-all shadow-lg shadow-secondary/20"
                        >
                            {t('translation.requestInfo')}
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100"
                    >
                        <Image
                            src={eduImg}
                            alt="Education"
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

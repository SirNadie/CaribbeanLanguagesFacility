"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { selectService } from '../../lib/utils';
import eduImg from '../../assets/images/kids.jpg';

export default function Education() {
    const { t, language } = useLanguage();
    const [showModal, setShowModal] = useState(false);

    const openModalAndScroll = () => {
        setShowModal(true);
    };

    const closeModalAndContact = () => {
        setShowModal(false);
        selectService("Educación Bilingüe (Lisa's Kids)");
    };

    return (
        <>
            <section id="education-section" className="py-24 sm:py-32 bg-white">
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
                                <div className="h-16 w-16 relative">
                                    <Image
                                        src="/images/logos/CASAlogo.png"
                                        alt="CASA Logo"
                                        fill
                                        className="object-contain"
                                        sizes="64px"
                                    />
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold text-primary">{t('education.title')}</h2>
                            </div>
                            <h3 className="text-2xl font-bold text-secondary">{t('education.lisasKids')}</h3>
                            <p className="text-lg text-text-light/80 leading-relaxed border-l-4 border-secondary/20 pl-6">
                                {t('education.description')}
                            </p>

                            <button
                                onClick={openModalAndScroll}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 hover:gap-4 transition-all shadow-lg shadow-secondary/20"
                            >
                                {t('translation.requestInfo')}
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                            <a
                                href="/inscripciones"
                                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-secondary text-secondary font-bold rounded-full hover:bg-secondary/10 transition-all"
                            >
                                {language === 'es' ? 'Ver detalles de inscripción' : 'View enrollment details'}
                                <span className="material-symbols-outlined text-sm">info</span>
                            </a>
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
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-lg w-full max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-gray-700">close</span>
                            </button>

                            {/* Flyer Image */}
                            <div className="relative w-full">
                                <Image
                                    src="/images/spanish-kids-program.jpg"
                                    alt="Spanish Fun for Kids 3-5 Program"
                                    width={600}
                                    height={900}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>

                            {/* CTA Button - Below the image */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <button
                                    onClick={closeModalAndContact}
                                    className="w-full py-4 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">mail</span>
                                    {t('translation.requestInfo')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { fadeIn } from '../../lib/animations';

export default function About() {
    const { t } = useLanguage();

    return (
        <section className="relative py-20 sm:py-32 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <h2 className="font-display text-4xl sm:text-5xl font-bold mb-8 text-primary">{t('about.title')}</h2>
                    <p className="text-xl text-text-light/70 mb-16 leading-relaxed bg-clip-text">
                        {t('about.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { title: 'about.vision', text: 'about.visionText', color: 'text-accent', icon: 'visibility' },
                        { title: 'about.values', text: 'about.valuesText', color: 'text-secondary', icon: 'diamond' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="glass-card p-10 rounded-3xl text-left hover:bg-gray-50/50"
                        >
                            <span className={`material-symbols-outlined text-4xl mb-4 ${item.color}`}>{item.icon}</span>
                            <h3 className={`font-display text-2xl font-bold ${item.color} mb-3`}>{t(item.title)}</h3>
                            <p className="text-text-light/70 leading-relaxed font-body">{t(item.text)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

const services = [
    { key: 'registration', color: 'bg-blue-500' },
    { key: 'marriage', color: 'bg-pink-500' },
    { key: 'banking', color: 'bg-green-500' },
    { key: 'career', color: 'bg-purple-500' },
    { key: 'counseling', color: 'bg-orange-500' },
] as const;

export default function ProfessionalServices() {
    const { language, t, openModal } = useLanguage();

    const getServiceData = (key: keyof typeof translations.professionalServices.services) => {
        const service = translations.professionalServices.services[key];
        return {
            title: service.title[language],
            description: service.description[language],
            icon: service.icon
        };
    };

    return (
        <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary mb-4">
                        {t('professionalServices.title')}
                    </h2>
                    <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
                        {t('professionalServices.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const data = getServiceData(service.key);
                        return (
                            <motion.div
                                key={service.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <span className="material-symbols-outlined text-white text-2xl">
                                        {data.icon}
                                    </span>
                                </div>

                                <h3 className="font-display text-xl font-bold text-primary mb-3">
                                    {data.title}
                                </h3>

                                <p className="text-text-light/70 mb-6 leading-relaxed">
                                    {data.description}
                                </p>

                                <button
                                    onClick={() => openModal('Servicios Profesionales')}
                                    className="inline-flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all"
                                >
                                    {t('professionalServices.cta')}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

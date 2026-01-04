"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { selectService } from '../../lib/utils';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { PHONE_NUMBER } from '../../consts';

const content = {
    es: {
        title: "Programas de Formación",
        subtitle: "Nivelación Educativa",
        intro: "Segundas oportunidades para continuar, crecer y avanzar. Ofrecemos programas educativos diseñados para jóvenes y adultos cuyo proceso académico fue interrumpido.",

        // Programs
        programs: [
            {
                icon: "menu_book",
                color: "blue",
                title: "Programa Intensivo de Nivelación Primaria",
                audience: "Jóvenes y adultos que interrumpieron su educación primaria",
                duration: "4 a 6 meses",
                modality: "Intensiva | Presencial / Mixta",
                certification: "Constancia de culminación",
                features: [
                    "Desarrollar lectura, escritura y comprensión",
                    "Aplicar matemáticas prácticas para la vida diaria",
                    "Fortalecer hábitos de estudio, disciplina y responsabilidad"
                ]
            },
            {
                icon: "school",
                color: "purple",
                title: "Programa de Educación Secundaria Básica",
                audience: "Jóvenes que interrumpieron su educación desde 7mo grado",
                duration: "6 a 9 meses",
                modality: "Intensiva | Presencial / Mixta",
                certification: "Constancia académica del programa",
                features: [
                    "Lengua y comunicación",
                    "Matemática funcional",
                    "Inglés práctico",
                    "Tecnología básica",
                    "Formación en valores y orientación vocacional"
                ]
            },
            {
                icon: "child_care",
                color: "pink",
                title: "Programa de Asistente de Preescolar",
                audience: "Personas interesadas en trabajar en educación infantil",
                duration: "6 meses",
                modality: "Teórico–práctica",
                certification: "Asistente de Preescolar",
                features: [
                    "Desarrollo y cuidado infantil",
                    "Actividades didácticas y recreativas",
                    "Rutinas de higiene y seguridad",
                    "Apoyo al docente y trabajo en aula"
                ]
            }
        ],

        // Approach
        approachTitle: "Nuestro Enfoque",
        approach: [
            { icon: "diversity_3", text: "Educación accesible y humana" },
            { icon: "psychology", text: "Aprendizaje práctico y significativo" },
            { icon: "favorite", text: "Acompañamiento académico y emocional" },
            { icon: "work", text: "Formación para la vida y el trabajo" }
        ],

        motto: "Nunca es tarde para continuar tu educación. Tu proceso no terminó, solo fue interrumpido.",

        // Labels
        audienceLabel: "Dirigido a:",
        durationLabel: "Duración:",
        modalityLabel: "Modalidad:",
        certLabel: "Certificación:",
        learnLabel: "Aprenderás:",

        // CTA
        cta: "Solicitar Información",
        back: "Volver al inicio"
    },
    en: {
        title: "Training Programs",
        subtitle: "Educational Leveling",
        intro: "Second chances to continue, grow, and advance. We offer educational programs designed for youth and adults whose academic process was interrupted.",

        programs: [
            {
                icon: "menu_book",
                color: "blue",
                title: "Intensive Primary Level Program",
                audience: "Youth and adults who interrupted their primary education",
                duration: "4 to 6 months",
                modality: "Intensive | In-person / Hybrid",
                certification: "Completion certificate",
                features: [
                    "Develop reading, writing, and comprehension",
                    "Apply practical mathematics for daily life",
                    "Strengthen study habits, discipline, and responsibility"
                ]
            },
            {
                icon: "school",
                color: "purple",
                title: "Basic Secondary Education Program",
                audience: "Youth who interrupted their education from 7th grade",
                duration: "6 to 9 months",
                modality: "Intensive | In-person / Hybrid",
                certification: "Academic program certificate",
                features: [
                    "Language and communication",
                    "Functional mathematics",
                    "Practical English",
                    "Basic technology",
                    "Values training and vocational guidance"
                ]
            },
            {
                icon: "child_care",
                color: "pink",
                title: "Preschool Assistant Program",
                audience: "People interested in working in early childhood education",
                duration: "6 months",
                modality: "Theoretical-practical",
                certification: "Preschool Assistant",
                features: [
                    "Child development and care",
                    "Educational and recreational activities",
                    "Hygiene and safety routines",
                    "Teacher support and classroom work"
                ]
            }
        ],

        approachTitle: "Our Approach",
        approach: [
            { icon: "diversity_3", text: "Accessible and humane education" },
            { icon: "psychology", text: "Practical and meaningful learning" },
            { icon: "favorite", text: "Academic and emotional support" },
            { icon: "work", text: "Training for life and work" }
        ],

        motto: "It's never too late to continue your education. Your process didn't end, it was only interrupted.",

        audienceLabel: "For:",
        durationLabel: "Duration:",
        modalityLabel: "Modality:",
        certLabel: "Certification:",
        learnLabel: "You'll learn:",

        cta: "Request Information",
        back: "Back to home"
    }
};

const colorClasses: Record<string, { bg: string; text: string; bgLight: string }> = {
    blue: { bg: "bg-blue-500", text: "text-blue-600", bgLight: "bg-blue-100" },
    purple: { bg: "bg-purple-500", text: "text-purple-600", bgLight: "bg-purple-100" },
    pink: { bg: "bg-pink-500", text: "text-pink-600", bgLight: "bg-pink-100" }
};

export default function ProgramasPage() {
    const { language } = useLanguage();
    const t = content[language];

    const handleCTA = () => {
        selectService("Capacitación (CASA)");
    };

    return (
        <>
            <Header />
            <main className="pt-28 pb-20 bg-gradient-to-b from-white to-slate-50 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-10">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-semibold rounded-full text-sm mb-4">
                            {t.subtitle}
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
                            {t.title}
                        </h1>
                        <p className="text-lg text-text-light/70 max-w-3xl mx-auto">
                            {t.intro}
                        </p>
                    </motion.div>

                    {/* Programs */}
                    <div className="space-y-8 mb-16">
                        {t.programs.map((program, index) => {
                            const colors = colorClasses[program.color];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Left side - Icon and Title */}
                                        <div className={`${colors.bg} p-8 lg:w-1/3 text-white flex flex-col justify-center`}>
                                            <span className="material-symbols-outlined text-6xl mb-4">{program.icon}</span>
                                            <h3 className="text-2xl font-bold">{program.title}</h3>
                                        </div>

                                        {/* Right side - Details */}
                                        <div className="p-8 lg:w-2/3">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                <div className="flex items-start gap-3">
                                                    <span className={`material-symbols-outlined ${colors.text}`}>group</span>
                                                    <div>
                                                        <p className="text-sm text-text-light/60">{t.audienceLabel}</p>
                                                        <p className="text-text-light font-medium">{program.audience}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className={`material-symbols-outlined ${colors.text}`}>schedule</span>
                                                    <div>
                                                        <p className="text-sm text-text-light/60">{t.durationLabel}</p>
                                                        <p className="text-text-light font-medium">{program.duration}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className={`material-symbols-outlined ${colors.text}`}>location_on</span>
                                                    <div>
                                                        <p className="text-sm text-text-light/60">{t.modalityLabel}</p>
                                                        <p className="text-text-light font-medium">{program.modality}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className={`material-symbols-outlined ${colors.text}`}>workspace_premium</span>
                                                    <div>
                                                        <p className="text-sm text-text-light/60">{t.certLabel}</p>
                                                        <p className="text-text-light font-medium">{program.certification}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm text-text-light/60 mb-3">{t.learnLabel}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {program.features.map((feature, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`inline-flex items-center gap-1 px-3 py-1.5 ${colors.bgLight} ${colors.text} rounded-full text-sm`}
                                                        >
                                                            <span className="material-symbols-outlined text-sm">check</span>
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Approach Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 rounded-3xl p-10 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">{t.approachTitle}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {t.approach.map((item, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-3xl text-secondary">{item.icon}</span>
                                    </div>
                                    <p className="text-white/90 text-sm">{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xl text-secondary font-semibold italic">
                            "{t.motto}"
                        </p>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center bg-gradient-to-r from-accent to-accent/80 p-10 rounded-3xl text-white"
                    >
                        <h3 className="text-2xl font-bold mb-6">Caribbean Language Facility</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleCTA}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                <span className="material-symbols-outlined">mail</span>
                                {t.cta}
                            </button>
                            <a
                                href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.487 0-4.807-.798-6.694-2.151l-.48-.353-3.198 1.072 1.072-3.198-.353-.48A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </motion.div>

                    {/* Back Link */}
                    <div className="mt-10 text-center">
                        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                            {t.back}
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

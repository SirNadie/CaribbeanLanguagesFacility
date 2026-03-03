"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { PHONE_NUMBER } from '../../consts';

const content = {
    es: {
        title: "Programas de Formación",
        subtitle: "Nivelación Educativa",
        intro: "Si dejaste de estudiar, aquí puedes continuar. Tenemos programas para completar primaria, secundaria y cursos para trabajar en preescolar.",

        // Promo Banner
        promoTitle: "Nuevo Taller Disponible",
        promoDescription: "Aprende habilidades prácticas con herramientas. ¡Inscríbete ahora!",
        promoButton: "Ver Programa",

        levelingProgramsTitle: "Programas de Nivelación",
        coursesTitle: "Cursos",

        levelingPrograms: [
            {
                icon: "menu_book",
                color: "blue",
                title: "Programa Intensivo de Nivelación Primaria",
                subtitle: "Completa tu educación primaria",
                audience: "Si dejaste la primaria y quieres terminarla",
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
                subtitle: "Completa tu educación secundaria",
                audience: "Si dejaste el bachillerato desde 7mo grado",
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
            }
        ],

        courses: [
            {
                icon: "build",
                color: "orange",
                title: "Fundamentos Prácticos del Manejo de Herramientas",
                subtitle: "Taller práctico con Career and Skills Academy",
                audience: "Jóvenes de 13 a 25+ años",
                duration: "1 día (8:00 am - 5:00 pm)",
                modality: "Presencial | Centro Comunitario St. Charles, Princes Town",
                certification: "Certificado de Participación",
                features: [
                    "Uso de herramientas manuales y eléctricas",
                    "Medición y ensamblaje",
                    "Proyecto práctico (caja o repisa)",
                    "Instructor Bilingüe Profesional",
                    "Materiales del Proyecto incluidos",
                    "Desayuno, Almuerzo y Merienda incluidos"
                ],
                price: "$550 TTD",
                registration: "$100 TTD"
            },
            {
                icon: "child_care",
                color: "pink",
                title: "Cursos de Asistente de Preescolar",
                subtitle: "Aprende a trabajar en preescolar",
                audience: "Si quieres trabajar con niños en preescolar",
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

        // Online Classes
        onlineClassesTitle: "Clases en Línea",
        onlineClasses: [
            {
                title: "Clases de inglés",
                days: "Lunes, miércoles",
                duration: "1 hora académica por sesión",
                schedule: "4:15 p.m. a 5:00 p.m.",
                price: "$400 / mes",
                registration: "$100 inscripción",
                note: "(pago al principio de cada mes)",
                icon: "language",
                color: "blue"
            },
            {
                title: "Clases de nivelación – Primaria",
                days: "Lunes, miércoles, viernes",
                duration: "2 horas académicas (90 mins)",
                schedule: "2:30 PM - 4:00 PM",
                programDuration: "3 meses",
                price: "$1,800 inversión del programa",
                registration: "$150 inscripción",
                icon: "child_care",
                color: "green"
            },
            {
                title: "Clases de nivelación – Secundaria",
                days: "Martes, jueves y viernes",
                duration: "2 horas académicas por sesión",
                schedule: "6:00 p.m. a 7:30 p.m.",
                programDuration: "6 meses",
                price: "$2,400 inversión del programa",
                registration: "$200 inscripción",
                note: "(No reembolso)",
                icon: "school",
                color: "orange"
            },
            {
                title: "Clases de lectura y comprensión",
                days: "Lunes a jueves",
                duration: "30 minutos por sesión",
                schedule: "Horario personalizado",
                price: "$400 / mes",
                note: "(Clases individuales)",
                icon: "menu_book",
                color: "purple"
            }
        ],

        // Approach
        approachTitle: "Nuestro Enfoque",
        approach: [
            { icon: "diversity_3", text: "Educación accesible y humana" },
            { icon: "psychology", text: "Aprendes cosas que usas en la vida" },
            { icon: "favorite", text: "Acompañamiento académico y emocional" },
            { icon: "work", text: "Formación para la vida y el trabajo" }
        ],

        motto: "Nunca es tarde para continuar tu educación. Tu proceso no terminó, solo fue interrumpido.",

        // Labels
        audienceLabel: "Para quién:",
        durationLabel: "Duración:",
        modalityLabel: "Cómo se da:",
        certLabel: "Al terminar recibes:",
        learnLabel: "Vas a aprender:",

        // Class Labels
        daysLabel: "Días:",
        scheduleLabel: "Horario:",
        priceLabel: "Inversión:",
        registrationLabel: "Inscripción:",

        // CTA
        cta: "Solicitar Información",
        back: "Volver al inicio"
    },
    en: {
        title: "Training Programs",
        subtitle: "Educational Leveling",
        intro: "If you left school, you can continue here. We have programs to complete primary, secondary, and courses to work in preschool.",

        // Promo Banner
        promoTitle: "New Workshop Available",
        promoDescription: "Learn practical skills with tools. Sign up now!",
        promoButton: "View Program",

        levelingProgramsTitle: "Leveling Programs",
        coursesTitle: "Courses",

        levelingPrograms: [
            {
                icon: "menu_book",
                color: "blue",
                title: "Intensive Primary Level Program",
                subtitle: "Complete your primary education",
                audience: "If you left primary school and want to finish it",
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
                subtitle: "Complete your secondary education",
                audience: "If you left school from 7th grade",
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
            }
        ],

        courses: [
            {
                icon: "build",
                color: "orange",
                title: "Practical Fundamentals of Tool Handling",
                subtitle: "Practical workshop with Career and Skills Academy",
                audience: "Youth ages 13 to 25+",
                duration: "1 day (8:00 am - 5:00 pm)",
                modality: "In-person | St. Charles Community Centre, Princes Town",
                certification: "Participation Certificate",
                features: [
                    "Use of manual and power tools",
                    "Measurement and assembly",
                    "Practical project (box or shelf)",
                    "Professional Bilingual Instructor",
                    "Project Materials included",
                    "Breakfast, Lunch and Snack included"
                ],
                price: "$550 TTD",
                registration: "$100 TTD"
            },
            {
                icon: "child_care",
                color: "pink",
                title: "Preschool Assistant Courses",
                subtitle: "Learn to work in preschool",
                audience: "If you want to work with children in preschool",
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

        // Online Classes
        onlineClassesTitle: "Online Classes",
        onlineClasses: [
            {
                title: "English Classes",
                days: "Monday, Wednesday",
                duration: "1 academic hour per session",
                schedule: "4:15 p.m. to 5:00 p.m.",
                price: "$400 / month",
                registration: "$100 registration",
                note: "(payment at the beginning of each month)",
                icon: "language",
                color: "blue"
            },
            {
                title: "Leveling Classes – Primary",
                days: "Monday, Wednesday, Friday",
                duration: "2 academic hours (90 mins)",
                schedule: "2:30 PM - 4:00 PM",
                programDuration: "3 months",
                price: "$1,800 program investment",
                registration: "$150 registration",
                icon: "child_care",
                color: "green"
            },
            {
                title: "Leveling Classes – Secondary",
                days: "Tuesday, Thursday, Friday",
                duration: "2 academic hours per session",
                schedule: "6:00 p.m. to 7:30 p.m.",
                programDuration: "6 months",
                price: "$2,400 program investment",
                registration: "$200 registration",
                note: "(No refund)",
                icon: "school",
                color: "orange"
            },
            {
                title: "Reading and Comprehension",
                days: "Monday to Thursday",
                duration: "30 minutes per session",
                schedule: "Customized schedule",
                price: "$400 / month",
                note: "(Individual classes)",
                icon: "menu_book",
                color: "purple"
            }
        ],

        approachTitle: "Our Approach",
        approach: [
            { icon: "diversity_3", text: "Accessible and humane education" },
            { icon: "psychology", text: "You learn things you use in life" },
            { icon: "favorite", text: "Academic and emotional support" },
            { icon: "work", text: "Training for life and work" }
        ],

        motto: "It's never too late to continue your education. Your process didn't end, it was only interrupted.",

        audienceLabel: "For:",
        durationLabel: "Duration:",
        modalityLabel: "How it's done:",
        certLabel: "When you finish you get:",
        learnLabel: "You'll learn:",

        // Class Labels
        daysLabel: "Days:",
        scheduleLabel: "Schedule:",
        priceLabel: "Investment:",
        registrationLabel: "Registration:",

        cta: "Request Information",
        back: "Back to home"
    }
};

const colorClasses: Record<string, { bg: string; text: string; bgLight: string; panelGradient: string }> = {
    blue: { bg: "bg-blue-500", text: "text-blue-600", bgLight: "bg-blue-100", panelGradient: "from-blue-500 to-blue-700" },
    purple: { bg: "bg-purple-500", text: "text-purple-600", bgLight: "bg-purple-100", panelGradient: "from-purple-500 to-purple-700" },
    pink: { bg: "bg-pink-500", text: "text-pink-600", bgLight: "bg-pink-100", panelGradient: "from-pink-500 to-pink-600" },
    green: { bg: "bg-emerald-500", text: "text-emerald-600", bgLight: "bg-emerald-100", panelGradient: "from-emerald-500 to-emerald-700" },
    orange: { bg: "bg-orange-500", text: "text-orange-600", bgLight: "bg-orange-100", panelGradient: "from-orange-500 to-orange-700" }
};

function SectionHeading({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-primary">{title}</h2>
            <div className="h-1 flex-1 bg-gray-100 rounded-full" />
        </div>
    );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-gray-400 text-xl">{icon}</span>
            <div>
                <p className="text-xs text-text-light/60 uppercase tracking-wider font-semibold">{label}</p>
                <p className="text-sm font-medium text-text-light">{value}</p>
            </div>
        </div>
    );
}

export default function ProgramasPage() {
    const { language, openModal } = useLanguage();
    const t = content[language];

    const handleCTA = () => {
        openModal("Capacitación (CASA)");
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

                    {/* Promo Banner - Nuevo Taller */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <a
                            href="#cursos"
                            className="w-full flex items-start gap-4 p-6 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 hover:border-orange-300 transition-all text-left group shadow-lg"
                        >
                            <span className="material-symbols-outlined text-4xl text-orange-500 shrink-0">build</span>
                            <div className="flex-1">
                                <strong className="block text-orange-700 font-bold text-lg mb-1 group-hover:text-orange-600 transition-colors">
                                    {t.promoTitle}
                                </strong>
                                <p className="text-orange-600/80 text-sm">
                                    {t.promoDescription}
                                </p>
                            </div>
                            <span className="material-symbols-outlined text-orange-400 group-hover:text-orange-500 ml-auto shrink-0 transition-transform group-hover:translate-x-1">
                                arrow_forward
                            </span>
                        </a>
                    </motion.div>

                    {/* Programas de Nivelación */}
                    <div className="mb-20">
                        <SectionHeading title={t.levelingProgramsTitle} />
                        <div className="space-y-8">
                            {t.levelingPrograms.map((program, index) => {
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
                                            <div className={`bg-gradient-to-br ${colors.panelGradient} p-8 lg:p-10 lg:w-1/3 text-white flex flex-col justify-center relative overflow-hidden shadow-inner`}>
                                                <span className="material-symbols-outlined text-7xl lg:text-8xl mb-5 opacity-90" aria-hidden="true">{program.icon}</span>
                                                {program.subtitle && <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">{program.subtitle}</h3>}
                                                <p className="text-base lg:text-lg font-medium text-white/80 mt-2">{program.title}</p>
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
                    </div>

                    {/* Cursos */}
                    <div id="cursos" className="mb-20">
                        <SectionHeading title={t.coursesTitle} />
                        <div className="space-y-8">
                            {t.courses.map((program, index) => {
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
                                            <div className={`bg-gradient-to-br ${colors.panelGradient} p-8 lg:p-10 lg:w-1/3 text-white flex flex-col justify-center relative overflow-hidden shadow-inner`}>
                                                <span className="material-symbols-outlined text-7xl lg:text-8xl mb-5 opacity-90" aria-hidden="true">{program.icon}</span>
                                                {program.subtitle && <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">{program.subtitle}</h3>}
                                                <p className="text-base lg:text-lg font-medium text-white/80 mt-2">{program.title}</p>
                                            </div>
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
                                                    {program.price && (
                                                        <div className="flex items-start gap-3">
                                                            <span className={`material-symbols-outlined ${colors.text}`}>payments</span>
                                                            <div>
                                                                <p className="text-sm text-text-light/60">{t.priceLabel}</p>
                                                                <p className="text-text-light font-bold">{program.price}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {program.registration && (
                                                        <div className="flex items-start gap-3">
                                                            <span className={`material-symbols-outlined ${colors.text}`}>edit_note</span>
                                                            <div>
                                                                <p className="text-sm text-text-light/60">{t.registrationLabel}</p>
                                                                <p className="text-text-light font-medium">{program.registration}</p>
                                                            </div>
                                                        </div>
                                                    )}
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
                    </div>

                    {/* Online Classes Section */}
                    <div className="mb-20">
                        <SectionHeading title={t.onlineClassesTitle} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {t.onlineClasses.map((item, index) => {
                                const colors = colorClasses[item.color] || colorClasses.blue;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group"
                                    >
                                        <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-bl-full opacity-10 group-hover:scale-110 transition-transform`} />

                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`w-12 h-12 ${colors.bgLight} ${colors.text} rounded-2xl flex items-center justify-center shrink-0`}>
                                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-primary leading-tight mb-1">{item.title}</h3>
                                                {item.note && <p className="text-xs text-text-light/60 italic">{item.note}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <InfoRow icon="calendar_month" label={t.daysLabel} value={item.days} />
                                            <InfoRow icon="schedule" label={t.scheduleLabel} value={item.schedule} />
                                            <InfoRow icon="timer" label={t.durationLabel} value={item.duration} />
                                            {item.programDuration && (
                                                <InfoRow icon="timelapse" label={t.durationLabel} value={item.programDuration} />
                                            )}

                                            <div className="pt-3 border-t border-gray-100 mt-4 flex flex-col gap-2">
                                                {item.price && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-text-light/70">{t.priceLabel}</span>
                                                        <span className={`font-bold ${colors.text}`}>{item.price}</span>
                                                    </div>
                                                )}
                                                {item.registration && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-text-light/70">{t.registrationLabel}</span>
                                                        <span className="font-semibold text-primary">{item.registration}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
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
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5 duration-300"
                            >
                                <span className="material-symbols-outlined animate-pulse">mail</span>
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

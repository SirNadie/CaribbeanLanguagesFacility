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
        title: "Inscripciones",
        subtitle: "Lisa's Kids Casa Bilingüe",
        intro: "¡Bienvenidos a nuestra familia educativa! Aquí encontrará toda la información necesaria para inscribir a su(s) hijo(s).",

        // Matrícula y Pagos
        pricingTitle: "Matrícula y Pagos",
        matricula: "$100 TT por niño",
        matriculaNote: "(una vez al año)",
        weeklyPayment: "Pago Semanal",
        weeklyAmount: "$200 TT por niño",
        weeklyNote: "(pago todos los lunes)",
        siblingsDiscount: "Descuento Hermanos",
        siblingsAmount: "$350 TT por semana",

        // Horario
        scheduleTitle: "Horario",
        scheduleDays: "Lunes a Viernes",
        scheduleTime: "8:00 a.m. - 12:00 p.m.",

        // Requisitos
        requirementsTitle: "Requisitos de Inscripción",
        requirementsIntro: "Por favor envíe la siguiente información de su(s) hijo(s):",
        requirements: [
            "Nombre completo",
            "Fecha de nacimiento",
            "Alergias o condiciones médicas",
            "Traumas o fobias",
            "Preferencias y aversiones alimenticias",
            "Descripción del comportamiento en casa y fuera de casa",
            "Pasatiempos favoritos"
        ],

        // Proceso de Admisión
        admissionTitle: "Proceso de Admisión",
        admissionP1: "Los niños nuevos estarán en observación durante al menos una semana.",
        admissionP2: "Al finalizar, se entregará una evaluación escrita.",

        // Uniformes
        uniformsTitle: "Uniforme Escolar",
        pantsTitle: "Pantalón Mono",
        pantsSmall: "Tallas pequeñas: $100 TT",
        pantsLarge: "Tallas grandes (+9 años): $150 TT",
        shirtTitle: "Chemises",
        shirtSmall: "Talla pequeña: $120 TT",
        shirtLarge: "Talla grande: $150 TT",
        uniformNote: "Se recomienda esperar una semana antes de adquirir el uniforme.",

        // Alimentos
        foodTitle: "Alimentos",
        foodP1: "Los niños deben traer su desayuno, meriendas, bebidas y frutas diariamente.",
        foodP2: "El desayuno se toma al llegar; el receso es a las 10:30 a.m.",

        // Documentación
        docsTitle: "Documentación",
        docsP1: "Completar formularios de inscripción.",
        docsP2: "Firmar un contrato de acuerdo.",

        // CTA
        cta: "Solicitar Inscripción",
        back: "Volver al inicio",
        thanks: "¡Gracias por su colaboración!"
    },
    en: {
        title: "Enrollment",
        subtitle: "Lisa's Kids Bilingual House",
        intro: "Welcome to our educational family! Here you will find all the information needed to enroll your child(ren).",

        // Pricing
        pricingTitle: "Tuition & Payments",
        matricula: "$100 TT per child",
        matriculaNote: "(once a year)",
        weeklyPayment: "Weekly Payment",
        weeklyAmount: "$200 TT per child",
        weeklyNote: "(due every Monday)",
        siblingsDiscount: "Siblings Discount",
        siblingsAmount: "$350 TT per week",

        // Schedule
        scheduleTitle: "Schedule",
        scheduleDays: "Monday to Friday",
        scheduleTime: "8:00 AM - 12:00 PM",

        // Requirements
        requirementsTitle: "Enrollment Requirements",
        requirementsIntro: "Please send the following information about your child(ren):",
        requirements: [
            "Full name",
            "Date of birth",
            "Allergies or medical conditions",
            "Traumas or phobias",
            "Food preferences and dislikes",
            "Behavior description at home and outside",
            "Favorite hobbies"
        ],

        // Admission
        admissionTitle: "Admission Process",
        admissionP1: "New children will be under observation for at least one week.",
        admissionP2: "At the end, a written evaluation will be provided.",

        // Uniforms
        uniformsTitle: "School Uniform",
        pantsTitle: "Sweatpants",
        pantsSmall: "Small sizes: $100 TT",
        pantsLarge: "Large sizes (9+ years): $150 TT",
        shirtTitle: "Polo Shirts",
        shirtSmall: "Small size: $120 TT",
        shirtLarge: "Large size: $150 TT",
        uniformNote: "It is recommended to wait one week before purchasing the uniform.",

        // Food
        foodTitle: "Food",
        foodP1: "Children must bring their breakfast, snacks, drinks, and fruits daily.",
        foodP2: "Breakfast is taken upon arrival; recess is at 10:30 AM.",

        // Documentation
        docsTitle: "Documentation",
        docsP1: "Complete enrollment forms.",
        docsP2: "Sign an agreement contract.",

        // CTA
        cta: "Request Enrollment",
        back: "Back to home",
        thanks: "Thank you for your cooperation!"
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
    })
};

export default function InscripcionesPage() {
    const { language } = useLanguage();
    const t = content[language];

    const handleCTA = () => {
        selectService("Educación Bilingüe (Lisa's Kids)");
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
                        <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary font-semibold rounded-full text-sm mb-4">
                            {t.subtitle}
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
                            {t.title}
                        </h1>
                        <p className="text-lg text-text-light/70 max-w-2xl mx-auto">
                            {t.intro}
                        </p>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

                        {/* Pricing Card */}
                        <motion.div
                            custom={0}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-secondary">payments</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{t.pricingTitle}</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-2xl font-bold text-primary">{t.matricula}</p>
                                    <p className="text-sm text-text-light/60">{t.matriculaNote}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-text-light">{t.weeklyPayment}</p>
                                    <p className="text-xl font-bold text-accent">{t.weeklyAmount}</p>
                                    <p className="text-sm text-text-light/60">{t.weeklyNote}</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                    <p className="font-semibold text-green-700">{t.siblingsDiscount}</p>
                                    <p className="text-xl font-bold text-green-600">{t.siblingsAmount}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Schedule Card */}
                        <motion.div
                            custom={1}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-accent">schedule</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{t.scheduleTitle}</h3>
                            <div className="p-6 bg-gradient-to-br from-primary to-primary/80 rounded-xl text-white">
                                <p className="text-lg font-semibold">{t.scheduleDays}</p>
                                <p className="text-3xl font-bold mt-2">{t.scheduleTime}</p>
                            </div>
                        </motion.div>

                        {/* Admission Card */}
                        <motion.div
                            custom={2}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-primary">fact_check</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{t.admissionTitle}</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-secondary mt-1">visibility</span>
                                    <p className="text-text-light/80">{t.admissionP1}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-secondary mt-1">assignment</span>
                                    <p className="text-text-light/80">{t.admissionP2}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Requirements Card - Full Width */}
                        <motion.div
                            custom={3}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow md:col-span-2"
                        >
                            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-amber-600">checklist</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{t.requirementsTitle}</h3>
                            <p className="text-text-light/70 mb-4">{t.requirementsIntro}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {t.requirements.map((req, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                                        <span className="text-text-light/80">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Uniforms Card */}
                        <motion.div
                            custom={4}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-purple-600">apparel</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{t.uniformsTitle}</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-text-light">{t.pantsTitle}</p>
                                    <p className="text-sm text-text-light/70">{t.pantsSmall}</p>
                                    <p className="text-sm text-text-light/70">{t.pantsLarge}</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-text-light">{t.shirtTitle}</p>
                                    <p className="text-sm text-text-light/70">{t.shirtSmall}</p>
                                    <p className="text-sm text-text-light/70">{t.shirtLarge}</p>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-amber-600 text-sm">info</span>
                                    <p className="text-sm text-amber-700">{t.uniformNote}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Food Card */}
                        <motion.div
                            custom={5}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-orange-600">restaurant</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{t.foodTitle}</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-orange-500 mt-1">lunch_dining</span>
                                    <p className="text-text-light/80">{t.foodP1}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-orange-500 mt-1">alarm</span>
                                    <p className="text-text-light/80">{t.foodP2}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Documentation Card */}
                        <motion.div
                            custom={6}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 hover:shadow-2xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-blue-600">description</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">{t.docsTitle}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <span className="material-symbols-outlined text-blue-500">edit_document</span>
                                    <p className="text-text-light/80">{t.docsP1}</p>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                    <span className="material-symbols-outlined text-blue-500">contract</span>
                                    <p className="text-text-light/80">{t.docsP2}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center bg-gradient-to-r from-secondary to-secondary/80 p-10 rounded-3xl text-white"
                    >
                        <p className="text-xl mb-6">{t.thanks}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleCTA}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
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

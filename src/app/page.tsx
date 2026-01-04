"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import heroImg from '../assets/images/hero.jpg';
import transImg from '../assets/images/translation.jpg';
import eduImg from '../assets/images/kids.jpg';
import { ADDRESS_LINE_1, ADDRESS_LINE_2, EMAIL_ADDRESS, PHONE_NUMBER } from '../consts';
import { motion, Variants } from 'framer-motion';

// Animation Variants
const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Home() {
    const { t } = useLanguage();

    const selectService = (service: string) => {
        window.dispatchEvent(new CustomEvent('selectService', { detail: service }));
        const el = document.getElementById('contact-section');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Header />
            <main className="flex-1 overflow-hidden">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden mesh-gradient-hero">
                    {/* Abstract Shapes */}
                    <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="flex flex-col gap-8 text-left"
                        >
                            <motion.h1 variants={fadeIn} className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] text-primary tracking-tight">
                                {t('hero.title')}
                            </motion.h1>
                            <motion.p variants={fadeIn} className="text-lg sm:text-xl text-text-light/80 max-w-xl font-body leading-relaxed">
                                {t('hero.subtitle')}
                            </motion.p>
                            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row flex-wrap gap-4 w-full pt-4">
                                <Link
                                    href="#services"
                                    className="group relative flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                                >
                                    <span className="relative z-10">{t('hero.ctaTranslation')}</span>
                                    <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-0 bg-accent transition-transform duration-500 ease-out"></div>
                                </Link>
                                <Link
                                    href="#education-section"
                                    className="group relative flex h-12 items-center justify-center overflow-hidden rounded-full bg-secondary px-8 font-medium text-white shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transition-all duration-300 hover:scale-105"
                                >
                                    <span className="relative z-10">{t('hero.ctaEducation')}</span>
                                    <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-0 bg-orange-600 transition-transform duration-500 ease-out"></div>
                                </Link>
                                <Link
                                    href="#casa-section"
                                    className="flex h-12 items-center justify-center rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm px-8 font-medium text-text-light hover:bg-white hover:border-gray-400 transition-all duration-300"
                                >
                                    {t('hero.ctaCasa')}
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full aspect-[4/5] lg:aspect-square max-w-lg mx-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[2rem] rotate-3 opacity-20 blur-lg"></div>
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white/40">
                                <Image
                                    src={heroImg}
                                    alt="Hero"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                                    fill
                                    placeholder="blur"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* About Us */}
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

                {/* Services - Translation */}
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
                                        <img src="/images/logos/INSIlogo.png" alt="Insignia" className="h-full w-full object-contain" />
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

                {/* Services - Education */}
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

                {/* CASA & Classes Bento Grid */}
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

                                <div className="h-16 mb-8 relative z-10">
                                    <img src="/images/logos/CLFlogo.png" alt="CLF" className="h-full w-auto object-contain bg-white rounded-lg p-1" />
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

                {/* Ecosystem / Divisions Group */}
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
                                <div className="h-20 w-auto mb-2">
                                    <img src="/images/logos/CASAlogo.png" alt="Lisa's Kids" className="h-full w-auto object-contain brightness-95" />
                                </div>
                                <h3 className="font-bold text-secondary text-lg leading-tight">{t('ecosystem.childEducation')}</h3>
                                <p className="text-sm text-text-light/70">{t('education.lisasKids')}</p>
                            </motion.div>

                            {/* CASA */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                            >
                                <div className="h-20 w-auto mb-2">
                                    <img src="/images/logos/CLFlogo.png" alt="CASA" className="h-full w-auto object-contain" />
                                </div>
                                <h3 className="font-bold text-accent text-lg leading-tight">{t('ecosystem.technicalTraining')}</h3>
                                <p className="text-sm text-text-light/70">{t('casa.title')}</p>
                            </motion.div>

                            {/* Translations */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                            >
                                <div className="h-20 w-auto mb-2">
                                    <img src="/images/logos/INSIlogo.png" alt="Translations" className="h-full w-auto object-contain" />
                                </div>
                                <h3 className="font-bold text-primary text-lg leading-tight">{t('ecosystem.linguisticServices')}</h3>
                                <p className="text-sm text-text-light/70">{t('ecosystem.translationInterp')}</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact-section" className="relative py-20 sm:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="flex flex-col gap-8"
                            >
                                <div>
                                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary mb-4">{t('contact.title')}</h2>
                                    <p className="text-xl text-text-light/60">{t('contact.subtitle')}</p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: 'location_on',
                                            title: 'contact.location',
                                            content: <>{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</>
                                        },
                                        {
                                            icon: 'email',
                                            title: 'contact.email',
                                            content: <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-accent transition-colors break-all">{EMAIL_ADDRESS}</a>
                                        },
                                        {
                                            icon: 'call',
                                            title: 'contact.phone',
                                            content: <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">{PHONE_NUMBER}</a>
                                        }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="p-3 bg-white text-primary rounded-xl shadow-sm">
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-primary">{t(item.title)}</h4>
                                                <p className="text-text-light/70">{item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col gap-8"
                            >
                                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                                    <ContactForm />
                                </div>
                                <div className="w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-200 grayscale hover:grayscale-0 transition-all duration-500">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.327424660398!2d-61.42875142416805!3d10.313888367540258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3588cea0155555%3A0x63319042217c1810!2sTrinidad%20and%20Tobago!5e0!3m2!1sen!2s!4v1703020000000!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

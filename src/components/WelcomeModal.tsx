"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const content = {
    es: {
        title: "¿En qué te podemos ayudar?",
        closeLabel: "Cerrar",
        programs: {
            title: "Ver programas",
            desc: "Programas para completar primaria, secundaria y cursos. Todo en un solo lugar."
        },
        inscripciones: {
            title: "Inscripciones",
            desc: "Cómo inscribir a tu hijo en Lisa's Kids. Precios, horario y pasos."
        },
        explorar: {
            title: "Seguir explorando",
            desc: "Ver esta página. Conocer servicios, educación y contacto."
        }
    },
    en: {
        title: "How can we help you?",
        closeLabel: "Close",
        programs: {
            title: "See programs",
            desc: "Programs to complete primary, secondary, and courses. All in one place."
        },
        inscripciones: {
            title: "Enrollment",
            desc: "How to enroll your child in Lisa's Kids. Prices, schedule, and steps."
        },
        explorar: {
            title: "Keep exploring",
            desc: "Stay on this page. See our services, education, and contact."
        }
    }
};

type WelcomeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
    const { language } = useLanguage();
    const router = useRouter();
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const c = content[language];

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !dialogRef.current) return;
        const el = dialogRef.current;
        const focusFirst = () => { closeBtnRef.current?.focus(); };
        const id = setTimeout(focusFirst, 50);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        el.addEventListener('keydown', handleKeyDown);
        return () => { clearTimeout(id); el.removeEventListener('keydown', handleKeyDown); };
    }, [isOpen]);

    const handlePrograms = () => {
        onClose();
        router.push('/programas');
    };

    const handleInscripciones = () => {
        onClose();
        router.push('/inscripciones');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-md -z-10"
                        aria-hidden="true"
                    />
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                        <motion.div
                            ref={dialogRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="welcome-modal-title"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                ref={closeBtnRef}
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-110 hover:rotate-90 duration-300"
                                aria-label={c.closeLabel}
                            >
                                <span className="material-symbols-outlined text-gray-700">close</span>
                            </button>
                            <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                            <div className="p-6 sm:p-8">
                                <h2 id="welcome-modal-title" className="text-2xl sm:text-3xl font-bold text-primary mb-6 pr-10">
                                    {c.title}
                                </h2>
                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        onClick={handlePrograms}
                                        className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-accent/30 transition-all text-left group"
                                    >
                                        <span className="material-symbols-outlined text-3xl text-accent shrink-0">school</span>
                                        <div>
                                            <strong className="block text-primary font-semibold mb-1 group-hover:text-accent transition-colors">{c.programs.title}</strong>
                                            <p className="text-text-light/70 text-sm">{c.programs.desc}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-accent ml-auto shrink-0">arrow_forward</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleInscripciones}
                                        className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-secondary/30 transition-all text-left group"
                                    >
                                        <span className="material-symbols-outlined text-3xl text-secondary shrink-0">edit_document</span>
                                        <div>
                                            <strong className="block text-primary font-semibold mb-1 group-hover:text-secondary transition-colors">{c.inscripciones.title}</strong>
                                            <p className="text-text-light/70 text-sm">{c.inscripciones.desc}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-secondary ml-auto shrink-0">arrow_forward</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-primary/20 transition-all text-left group"
                                    >
                                        <span className="material-symbols-outlined text-3xl text-primary shrink-0">home</span>
                                        <div>
                                            <strong className="block text-primary font-semibold mb-1">{c.explorar.title}</strong>
                                            <p className="text-text-light/70 text-sm">{c.explorar.desc}</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}

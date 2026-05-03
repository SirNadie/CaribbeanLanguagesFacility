"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ContactForm from './ContactForm';

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ContactModal() {
    const { isModalOpen, closeModal, t } = useLanguage();
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) closeModal();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isModalOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    // Focus close button on open; focus trap (Tab / Shift+Tab)
    useEffect(() => {
        if (!isModalOpen || !dialogRef.current) return;
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
    }, [isModalOpen]);

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeModal}>
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
                            aria-labelledby="contact-modal-title"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                ref={closeBtnRef}
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-110 hover:rotate-90 duration-300"
                                aria-label={t('accessibility.closeModal')}
                            >
                                <span className="material-symbols-outlined text-gray-700">close</span>
                            </button>
                            <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                            <div className="p-6 sm:p-8 max-h-[calc(100vh-8rem)] overflow-y-auto">
                                <div className="mb-6 pr-12">
                                    <h2 id="contact-modal-title" className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                                        {t('contact.title')}
                                    </h2>
                                    <p className="text-text-light/70">{t('contact.subtitle')}</p>
                                </div>
                                <ContactForm onSuccess={closeModal} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}

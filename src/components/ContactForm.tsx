"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { WHATSAPP_NUMBER } from '../consts';

const inputClass = "w-full border border-slate-200 rounded-xl bg-white text-text-light focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors px-4 py-3 text-sm";

const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
    const { t, language, selectedService, setSelectedService } = useLanguage();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        contactMethod: 'whatsapp',
        contactInfo: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'contactMethod') {
            setFormData(prev => ({ ...prev, [name]: value, contactInfo: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const gotcha = (e.currentTarget.elements.namedItem('_gotcha') as HTMLInputElement)?.value;
        if (gotcha) {
            setStatus('success');
            setFormData({ name: '', contactMethod: 'whatsapp', contactInfo: '', message: '' });
            return;
        }

        const isValidContact = formData.contactMethod === 'whatsapp'
            ? validatePhone(formData.contactInfo)
            : validateEmail(formData.contactInfo);

        if (!isValidContact || !formData.name.trim() || !formData.message.trim()) {
            setStatus('error');
            return;
        }

        if (!MAKE_WEBHOOK_URL) {
            setStatus('error');
            return;
        }
        setStatus('submitting');

        const payload = {
            name: formData.name,
            contactMethod: formData.contactMethod === 'whatsapp' ? 'WhatsApp/Teléfono' : 'Email',
            contactInfo: formData.contactInfo,
            service: selectedService,
            message: formData.message,
            timestamp: new Intl.DateTimeFormat('es-ES', {
                dateStyle: 'full',
                timeStyle: 'short',
                timeZone: 'America/Port_of_Spain'
            }).format(new Date()),
            source: 'caribbeanlanguagefacility.com',
            language: language
        };

        try {
            const response = await fetch(MAKE_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', contactMethod: 'whatsapp', contactInfo: '', message: '' });
                if (onSuccess) {
                    setTimeout(() => onSuccess(), 2000);
                }
            } else {
                throw new Error('Error');
            }
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-green-50 border border-green-200 text-center"
                role="status"
                aria-live="polite"
            >
                <span className="material-symbols-outlined text-5xl text-green-500" aria-hidden="true">check_circle</span>
                <h3 className="text-xl font-bold text-green-700">{t('form.successTitle')}</h3>
                <p className="text-green-600 text-sm">{t('form.successText')}</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-5">
            {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm" role="alert" aria-live="assertive">
                    <span className="material-symbols-outlined text-red-600 shrink-0" aria-hidden="true">error</span>
                    <span>{t('form.errorText')}</span>
                </div>
            )}

            {/* WhatsApp Quick Action - Más prominente */}
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me interesa el servicio de ${selectedService}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-2xl shadow-lg shadow-[#25D366]/30 transition-all duration-300 active:scale-[0.98]"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                {language === 'es' ? 'Escribir por WhatsApp' : 'Chat on WhatsApp'}
            </a>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 bg-background-light text-sm text-text-muted">{language === 'es' ? 'o enviar mensaje' : 'or send a message'}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="contact-form">
                <input type="text" name="_gotcha" className="hidden" />

                {/* Nombre */}
                <div>
                    <input
                        className={inputClass}
                        id="name"
                        name="name"
                        placeholder={t('form.namePlaceholder')}
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={status === 'submitting'}
                    />
                </div>

                {/* Contacto */}
                <div>
                    <input
                        className={inputClass}
                        id="contactInfo"
                        name="contactInfo"
                        placeholder={formData.contactMethod === 'whatsapp' ? t('form.phonePlaceholder') : t('form.emailPlaceholder')}
                        type={formData.contactMethod === 'whatsapp' ? 'tel' : 'email'}
                        autoComplete={formData.contactMethod === 'whatsapp' ? 'tel' : 'email'}
                        inputMode={formData.contactMethod === 'whatsapp' ? 'tel' : 'email'}
                        required
                        value={formData.contactInfo}
                        onChange={handleInputChange}
                        disabled={status === 'submitting'}
                    />
                </div>

                {/* Servicio */}
                <select
                    className={inputClass}
                    name="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    disabled={status === 'submitting'}
                >
                    <option value="Traducción/Interpretación">{t('translation.servicesTitle')}</option>
                    <option value="Educación Bilingüe (Lisa's Kids)">{t('education.lisasKids')}</option>
                    <option value="Capacitación (CASA)">{t('casa.title')}</option>
                    <option value="Servicios Profesionales">{t('professionalServices.title')}</option>
                    <option value="Otro">{t('form.services.other')}</option>
                </select>

                {/* Mensaje */}
                <textarea
                    className={`${inputClass} resize-none`}
                    id="message"
                    name="message"
                    placeholder={t('form.messagePlaceholder')}
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={status === 'submitting'}
                ></textarea>

                {/* Submit */}
                <button
                    className="w-full flex justify-center items-center gap-2 py-4 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg"
                    type="submit"
                    disabled={status === 'submitting'}
                >
                    {status === 'submitting' ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            {t('form.sending')}
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-sm">send</span>
                            {t('form.submit')}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

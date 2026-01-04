"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Configura tu webhook de Make aquí
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/ifvratfq5tl9d9tnzl8e72m9g80lb6af';

export default function ContactForm() {
    const { t, language } = useLanguage();
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [selectedService, setSelectedService] = useState('Traducción/Interpretación');
    const [formData, setFormData] = useState({
        name: '',
        contactMethod: 'whatsapp', // 'whatsapp' o 'email'
        contactInfo: '',
        modality: 'Presencial',
        message: ''
    });

    useEffect(() => {
        const handleSelection = (e: any) => {
            if (e.detail) {
                setSelectedService(e.detail);
                const form = document.getElementById('contact-form');
                if (form) form.scrollIntoView({ behavior: 'smooth' });
            }
        };

        window.addEventListener('selectService', handleSelection);
        return () => window.removeEventListener('selectService', handleSelection);
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        // Si cambia el método de contacto, limpiar el campo de info
        if (name === 'contactMethod') {
            setFormData(prev => ({ ...prev, [name]: value, contactInfo: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus('submitting');

        const payload = {
            name: formData.name,
            contactMethod: formData.contactMethod === 'whatsapp' ? 'WhatsApp/Teléfono' : 'Email',
            contactInfo: formData.contactInfo,
            service: selectedService,
            modality: formData.modality,
            message: formData.message,
            timestamp: new Date().toLocaleString('es-ES', {
                dateStyle: 'full',
                timeStyle: 'short',
                timeZone: 'America/Port_of_Spain'
            }),
            source: 'caribbeanlanguagefacility.com',
            language: language // Add language to payload for context
        };

        try {
            const response = await fetch(MAKE_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', contactMethod: 'whatsapp', contactInfo: '', modality: 'Presencial', message: '' });
                setSelectedService('Traducción/Interpretación');
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    // Si el envío fue exitoso, mostrar mensaje de éxito
    if (status === 'success') {
        return (
            <div className="flex flex-col items-center gap-4 p-8 rounded-xl border border-green-200 bg-green-50 text-center" id="contact-form">
                <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
                <h3 className="text-xl font-bold text-green-700">{t('form.successTitle')}</h3>
                <p className="text-green-600">{t('form.successText')}</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-6 py-2 text-sm font-medium text-green-700 border border-green-300 rounded-lg hover:bg-green-100 transition-colors"
                >
                    {t('form.sendAnother')}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 rounded-xl border border-gray-200 bg-background-light" id="contact-form">
            {/* Honeypot for spam protection */}
            <input type="text" name="_gotcha" className="hidden" />

            {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {t('form.errorText')}
                </div>
            )}

            {/* Nombre */}
            <div>
                <label className="text-sm font-medium text-text-light" htmlFor="name">{t('form.name')}</label>
                <input
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                    id="name"
                    name="name"
                    placeholder={t('form.namePlaceholder')}
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={status === 'submitting'}
                />
            </div>

            {/* Método de contacto */}
            <div>
                <label className="text-sm font-medium text-text-light mb-3 block">{t('form.contactMethod')}</label>
                <div className="grid grid-cols-2 gap-4">
                    <label className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.contactMethod === 'whatsapp' ? 'border-[#25D366] bg-[#25D366]/10 shadow-lg shadow-[#25D366]/20' : 'border-gray-200 bg-white hover:border-[#25D366]/50 hover:bg-[#25D366]/5'}`}>
                        <input
                            type="radio"
                            name="contactMethod"
                            value="whatsapp"
                            checked={formData.contactMethod === 'whatsapp'}
                            onChange={handleInputChange}
                            className="sr-only"
                            disabled={status === 'submitting'}
                        />
                        <div className="flex items-center gap-2">
                            {/* WhatsApp Icon */}
                            <svg className={`w-8 h-8 ${formData.contactMethod === 'whatsapp' ? 'text-[#25D366]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                            {/* Phone Icon */}
                            <span className={`material-symbols-outlined text-3xl ${formData.contactMethod === 'whatsapp' ? 'text-[#25D366]' : 'text-gray-400'}`}>call</span>
                        </div>
                        <span className={`font-bold text-sm ${formData.contactMethod === 'whatsapp' ? 'text-[#25D366]' : 'text-gray-600'}`}>{t('form.whatsapp')}</span>
                    </label>

                    <label className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.contactMethod === 'email' ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-gray-200 bg-white hover:border-primary/50 hover:bg-primary/5'}`}>
                        <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={handleInputChange}
                            className="sr-only"
                            disabled={status === 'submitting'}
                        />
                        {/* Email Icon */}
                        <span className={`material-symbols-outlined text-4xl ${formData.contactMethod === 'email' ? 'text-primary' : 'text-gray-400'}`}>mail</span>
                        <span className={`font-bold text-sm ${formData.contactMethod === 'email' ? 'text-primary' : 'text-gray-600'}`}>{t('form.emailOption')}</span>
                    </label>
                </div>
            </div>

            {/* Campo de contacto dinámico */}
            <div>
                <label className="text-sm font-medium text-text-light" htmlFor="contactInfo">
                    {formData.contactMethod === 'whatsapp' ? t('form.phoneLabel') : t('form.emailLabel')}
                </label>
                <input
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                    id="contactInfo"
                    name="contactInfo"
                    placeholder={formData.contactMethod === 'whatsapp' ? t('form.phonePlaceholder') : t('form.emailPlaceholder')}
                    type={formData.contactMethod === 'whatsapp' ? 'tel' : 'email'}
                    required
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    disabled={status === 'submitting'}
                />
            </div>

            {/* Servicio y Modalidad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-text-light" htmlFor="service">{t('form.service')}</label>
                    <select
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                        id="service"
                        name="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        disabled={status === 'submitting'}
                    >
                        <option value="Traducción/Interpretación">{t('translation.servicesTitle')}</option>
                        <option value="Educación Bilingüe (Lisa's Kids)">{t('education.lisasKids')}</option>
                        <option value="Capacitación (CASA)">{t('casa.title')}</option>
                        <option value="Otro">{t('form.services.other')}</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-text-light" htmlFor="modality">{t('form.modality')}</label>
                    <select
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                        id="modality"
                        name="modality"
                        value={formData.modality}
                        onChange={handleInputChange}
                        disabled={status === 'submitting'}
                    >
                        <option value="Presencial">{t('form.modalityInPerson')}</option>
                        <option value="Online">{t('form.modalityOnline')}</option>
                        <option value="Híbrido">{t('form.modalityHybrid')}</option>
                    </select>
                </div>
            </div>

            {/* Mensaje */}
            <div>
                <label className="text-sm font-medium text-text-light" htmlFor="message">{t('form.message')}</label>
                <textarea
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                    id="message"
                    name="message"
                    placeholder={t('form.messagePlaceholder')}
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={status === 'submitting'}
                ></textarea>
            </div>

            {/* Botón de envío */}
            <button
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? (
                    <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('form.sending')}
                    </>
                ) : (
                    t('form.submit')
                )}
            </button>
        </form>
    );
}

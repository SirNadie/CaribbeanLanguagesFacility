import React, { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const [selectedService, setSelectedService] = useState('Traducción/Interpretación');

    React.useEffect(() => {
        const handleSelection = (e) => {
            if (e.detail) {
                setSelectedService(e.detail);
                // Optional: visual cue
                const form = document.getElementById('contact-form');
                if (form) form.scrollIntoView({ behavior: 'smooth' });
            }
        };

        window.addEventListener('selectService', handleSelection);
        return () => window.removeEventListener('selectService', handleSelection);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
                window.location.href = "/gracias";
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 rounded-xl border border-gray-200 bg-background-light" id="contact-form">
            {/* Honeypot for spam protection (optional by formspree but good practice) */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            <div>
                <label className="text-sm font-medium text-text-light" htmlFor="name">Nombre</label>
                <input
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                    id="name"
                    name="name"
                    placeholder="Tu Nombre Completo"
                    type="text"
                    required
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-text-light" htmlFor="service">Servicio</label>
                    <select
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                        id="service"
                        name="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                    >
                        <option value="Traducción/Interpretación">Traducción/Interpretación</option>
                        <option value="Educación Bilingüe (Lisa's Kids)">Educación Bilingüe (Lisa's Kids)</option>
                        <option value="Capacitación (CASA)">Capacitación (CASA)</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-text-light" htmlFor="modality">Modalidad</label>
                    <select
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                        id="modality"
                        name="modality"
                    >
                        <option>Presencial</option>
                        <option>Online</option>
                        <option>Híbrido</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="text-sm font-medium text-text-light" htmlFor="message">Mensaje</label>
                <textarea
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-white text-text-light focus:ring-primary focus:border-primary px-3 py-3"
                    id="message"
                    name="message"
                    placeholder="¿Cómo podemos ayudarte?"
                    rows="4"
                    required
                ></textarea>
            </div>
            <button
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                type="submit"
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'Enviando...' : status === 'success' ? '¡Enviado!' : 'Enviar Mensaje'}
            </button>
            {status === 'success' && (
                <div className="p-3 bg-green-100 text-green-700 rounded text-center text-sm">
                    ¡Gracias! Nos pondremos en contacto contigo pronto.
                </div>
            )}
            {status === 'error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded text-center text-sm">
                    Hubo un error. Por favor intenta de nuevo o escríbenos por WhatsApp.
                </div>
            )}
        </form>
    );
}

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Integration disabled as requested
        console.log("Form submission is currently disabled.");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 rounded-xl border border-gray-200 bg-background-light" id="contact-form">
            {/* Honeypot for spam protection (optional by formspree but good practice) */}
            <input type="text" name="_gotcha" className="hidden" />

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
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                type="submit"
            >
                Enviar Mensaje
            </button>
        </form>
    );
}

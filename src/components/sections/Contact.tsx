"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import ContactForm from '../ContactForm';
import { ADDRESS_LINE_1, ADDRESS_LINE_2, EMAIL_ADDRESS, PHONE_NUMBER } from '../../consts';

export default function Contact() {
    const { t } = useLanguage();

    return (
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
    );
}

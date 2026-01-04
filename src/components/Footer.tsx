"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { ADDRESS_LINE_1, ADDRESS_LINE_2, ADDRESS_2_LINE_1, ADDRESS_2_LINE_2, EMAIL_ADDRESS, PHONE_NUMBER } from '../consts';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white pt-24 pb-12 rounded-t-[3rem] mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-20">
                    {/* Brand - Full width on mobile */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <div className="h-16 w-16 bg-white rounded-2xl p-2 relative shadow-lg shadow-white/10">
                            <Image
                                src="/images/logos/INSIlogo.png"
                                alt="INSI Logo"
                                fill
                                className="object-contain p-2"
                                sizes="64px"
                            />
                        </div>
                        <h3 className="font-display text-2xl font-bold">Caribbean Language Facility</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Breaking barriers, building bridges, and fostering connections through language and education.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-4 pt-2">
                            <a
                                href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="WhatsApp"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                </svg>
                            </a>
                            <a
                                href={`mailto:${EMAIL_ADDRESS}`}
                                className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Email"
                            >
                                <span className="material-symbols-outlined text-lg">mail</span>
                            </a>
                            <a
                                href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                                className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Phone"
                            >
                                <span className="material-symbols-outlined text-lg">call</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Half width on mobile */}
                    <div className="col-span-1">
                        <h4 className="font-display text-lg font-bold mb-6 text-secondary">Quick Links</h4>
                        <ul className="space-y-4 text-white/70">
                            {[
                                { id: 'home', label: 'Home', href: '/' },
                                { id: 'services', label: 'Translation', href: '/#services' },
                                { id: 'education', label: 'Education', href: '/#education-section' },
                                { id: 'casa', label: 'CASA', href: '/#casa-section' },
                            ].map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className="hover:text-accent hover:pl-2 transition-all duration-300 inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services - Half width on mobile */}
                    <div className="col-span-1">
                        <h4 className="font-display text-lg font-bold mb-6 text-accent">Services</h4>
                        <ul className="space-y-4 text-white/70">
                            <li>Legal Translation</li>
                            <li>Academic Documents</li>
                            <li>Bilingual Education</li>
                            <li>Professional Training</li>
                        </ul>
                    </div>

                    {/* Contact - Full width on mobile */}
                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="font-display text-lg font-bold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-6 text-white/70">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-secondary shrink-0">location_on</span>
                                <div className="text-sm space-y-2">
                                    <span>{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</span>
                                    <span className="block border-t border-white/10 pt-2">{ADDRESS_2_LINE_1}<br />{ADDRESS_2_LINE_2}</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary shrink-0">email</span>
                                <Link href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-white transition-colors break-all">{EMAIL_ADDRESS}</Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary shrink-0">phone</span>
                                <Link href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{PHONE_NUMBER}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
                    <p>&copy; {new Date().getFullYear()} Caribbean Language Facility. {t('footer.rights')}</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}


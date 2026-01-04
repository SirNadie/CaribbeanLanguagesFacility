"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { ADDRESS_LINE_1, ADDRESS_LINE_2, ADDRESS_2_LINE_1, ADDRESS_2_LINE_2, EMAIL_ADDRESS, PHONE_NUMBER } from '../consts';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white pt-20 pb-10 rounded-t-[3rem] mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    {/* Brand - Full width on mobile */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <div className="h-16 w-16 bg-white rounded-2xl p-2 relative">
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

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>&copy; {new Date().getFullYear()} Caribbean Language Facility. {t('footer.rights')}</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>


        </footer>
    );
}

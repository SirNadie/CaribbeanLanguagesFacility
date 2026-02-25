"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeModal from '../components/WelcomeModal';

// Dynamic imports for below-the-fold sections to improve initial load
const Hero = dynamic(() => import('../components/sections/Hero'), {
    loading: () => <div className="min-h-[90vh]" />
});
const About = dynamic(() => import('../components/sections/About'), {
    loading: () => <div className="py-24 bg-white" />
});
const Services = dynamic(() => import('../components/sections/Services'), {
    loading: () => <div className="py-24 bg-slate-50" />
});
const Education = dynamic(() => import('../components/sections/Education'), {
    loading: () => <div className="py-24 bg-white" />
});
const CASA = dynamic(() => import('../components/sections/CASA'), {
    loading: () => <div className="py-24 bg-slate-50" />
});
const ProfessionalServices = dynamic(() => import('../components/sections/ProfessionalServices'), {
    loading: () => <div className="py-24 bg-white" />
});
const Ecosystem = dynamic(() => import('../components/sections/Ecosystem'), {
    loading: () => <div className="py-24 bg-slate-50" />
});
const Contact = dynamic(() => import('../components/sections/Contact'), {
    loading: () => <div className="py-24 bg-white" />
});

const WELCOME_STORAGE_KEY = 'clf-welcome-seen-v1';

export default function Home() {
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(WELCOME_STORAGE_KEY) !== '1') {
                setIsWelcomeOpen(true);
            }
        }, 1000);
        return () => clearTimeout(id);
    }, []);

    const handleWelcomeClose = () => {
        // Show modal every time by not storing the state
        // Change to localStorage if you want persistence across sessions
        setIsWelcomeOpen(false);
    };

    return (
        <>
            <Header />
            <div className="flex-1 overflow-hidden">
                <Hero />
                <About />
                <Services />
                <Education />
                <CASA />
                <ProfessionalServices />
                <Ecosystem />
                <Contact />
            </div>
            <Footer />
            <WelcomeModal isOpen={isWelcomeOpen} onClose={handleWelcomeClose} />
        </>
    );
}

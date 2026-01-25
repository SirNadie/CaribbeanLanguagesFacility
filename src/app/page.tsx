"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Education from '../components/sections/Education';
import CASA from '../components/sections/CASA';
import ProfessionalServices from '../components/sections/ProfessionalServices';
import Ecosystem from '../components/sections/Ecosystem';
import Contact from '../components/sections/Contact';
import WelcomeModal from '../components/WelcomeModal';

const WELCOME_STORAGE_KEY = 'clf-welcome-seen';

export default function Home() {
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(WELCOME_STORAGE_KEY) !== '1') {
                setIsWelcomeOpen(true);
            }
        }, 700);
        return () => clearTimeout(id);
    }, []);

    const handleWelcomeClose = () => {
        if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(WELCOME_STORAGE_KEY, '1');
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

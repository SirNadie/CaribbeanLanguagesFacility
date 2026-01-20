"use client";

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

export default function Home() {
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
        </>
    );
}

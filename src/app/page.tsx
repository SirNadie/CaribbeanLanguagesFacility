"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Education from '../components/sections/Education';
import CASA from '../components/sections/CASA';
import Ecosystem from '../components/sections/Ecosystem';
import Contact from '../components/sections/Contact';

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex-1 overflow-hidden">
                <Hero />
                <About />
                <Services />
                <Education />
                <CASA />
                <Ecosystem />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Nunito } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { SITE_DESCRIPTION } from '../consts';
import JsonLd from '../components/JsonLd';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
    display: 'swap',
});

// Keeping Nunito as fallback/legacy if needed, but primary is Jakarta
const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL('https://caribbeanlanguagefacility.com'),
    title: {
        default: 'Caribbean Language Facility | Translations & Education',
        template: '%s | Caribbean Language Facility'
    },
    description: SITE_DESCRIPTION,
    keywords: ['Traducción Trinidad', 'Translation Services Trinidad', 'Clases de Inglés', 'English Classes', 'Lisa\'s Kids', 'CASA', 'Spanish Classes', 'Interpreting Services', 'Legal Translation'],
    authors: [{ name: 'Caribbean Language Facility' }],
    creator: 'Caribbean Language Facility',
    publisher: 'Caribbean Language Facility',
    alternates: {
        canonical: '/',
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/images/logos/CLFlogo.png',
    },
    openGraph: {
        title: 'Caribbean Language Facility',
        description: SITE_DESCRIPTION,
        url: 'https://caribbeanlanguagefacility.com',
        siteName: 'Caribbean Language Facility',
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Caribbean Language Facility',
        description: SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={`${jakarta.className} bg-background-light text-text-light antialiased`}>
                <LanguageProvider>
                    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                        <main className="layout-container flex h-full grow flex-col pt-16">
                            {children}
                        </main>

                        <a
                            href="https://wa.me/18682693510"
                            target="_blank"
                            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:rotate-[10deg]"
                            aria-label="Chat on WhatsApp"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                            </svg>
                        </a>
                    </div>
                </LanguageProvider>
                <JsonLd />
            </body>
        </html>
    );
}

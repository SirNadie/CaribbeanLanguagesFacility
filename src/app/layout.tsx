import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { SITE_DESCRIPTION } from '../consts';
import JsonLd from '../components/JsonLd';
import ContactModal from '../components/ContactModal';

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
        icon: [
            { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },

    openGraph: {
        title: 'Caribbean Language Facility',
        description: SITE_DESCRIPTION,
        url: 'https://caribbeanlanguagefacility.com',
        siteName: 'Caribbean Language Facility',
        locale: 'es_ES',
        type: 'website',
        // opengraph-image.png en src/app/ se detecta automáticamente
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Caribbean Language Facility',
        description: SITE_DESCRIPTION,
        // opengraph-image.png se usa también para Twitter automáticamente
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
                {/* Resource hints for performance */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://hook.us2.make.com" crossOrigin="anonymous" />

                {/* Material Symbols - optimizado con subset de iconos usados */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap&text=arrow_forward,arrow_back,info,close,mail,school,cast_for_education,call,location_on,email,phone,check_circle,check,translate,workspace_premium,visibility,diamond,menu,group,schedule,home,payments,fact_check,assignment,checklist,apparel,restaurant,lunch_dining,alarm,description,edit_document,contract,shield,gavel,psychology,favorite,account_balance,expand_more"
                />
            </head>
            <body className={`${jakarta.className} bg-background-light text-text-light antialiased`}>
                {/* Skip Link for Accessibility */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none"
                >
                    Saltar al contenido principal
                </a>
                <LanguageProvider>
                    <ContactModal />
                    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                        <main id="main-content" className="layout-container flex h-full grow flex-col pt-16">
                            {children}
                        </main>

                        {/* WhatsApp Button con tooltip */}
                        <div className="fixed bottom-6 right-6 z-50 group">
                            {/* Tooltip - visible en hover (desktop) */}
                            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0">
                                <div className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg whitespace-nowrap">
                                    ¿Necesitas ayuda? 💬
                                    <div className="absolute -bottom-1 right-6 w-2 h-2 bg-slate-900 rotate-45"></div>
                                </div>
                            </div>
                            <a
                                href="https://wa.me/18682693510"
                                target="_blank"
                                className="whatsapp-float flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
                                aria-label="Chat on WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </LanguageProvider>
                <JsonLd />
            </body>
        </html>
    );
}

import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { SITE_DESCRIPTION } from '../consts';
import JsonLd from '../components/JsonLd';
import ContactModal from '../components/ContactModal';
import SkipLink from '../components/SkipLink';
import WhatsAppFloatWrapper from '../components/WhatsAppFloatWrapper';
import ErrorBoundary from '../components/ErrorBoundary';
import { Toaster } from 'sonner';

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
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
        shortcut: '/favicon.ico',
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
        <html lang="es" data-scroll-behavior="smooth" className={`${playfair.variable} ${jakarta.variable}`}>
            <head>
                {/* Resource hints for performance */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Material Symbols - optimizado con subset de iconos usados */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap&text=arrow_forward,arrow_back,info,close,mail,school,error,cast_for_education,call,location_on,email,phone,check_circle,check,translate,workspace_premium,visibility,diamond,menu,group,schedule,home,payments,fact_check,assignment,checklist,apparel,restaurant,lunch_dining,alarm,description,edit_document,contract,shield,gavel,psychology,favorite,account_balance,expand_more,diversity_3,work,child_care,menu_book,language,timelapse,calendar_month,timer"
                />
            </head>
<body className={`${jakarta.className} bg-background-light text-text-light antialiased`}>
                <LanguageProvider>
                    <ErrorBoundary>
                        <SkipLink />
                        <ContactModal />
                        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                            <main id="main-content" className="layout-container flex h-full grow flex-col pt-0">
                                {children}
                            </main>

                            <WhatsAppFloatWrapper />
                        </div>
                    </ErrorBoundary>
                </LanguageProvider>
                <JsonLd />
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}

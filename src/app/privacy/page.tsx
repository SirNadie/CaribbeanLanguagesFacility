"use client";

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { EMAIL_ADDRESS, PHONE_NUMBER, ADDRESS_LINE_1, ADDRESS_LINE_2, ADDRESS_2_LINE_1, ADDRESS_2_LINE_2 } from '../../consts';

const privacyContent = {
    es: {
        title: 'Política de Privacidad',
        lastUpdated: 'Última actualización: Enero 2026',
        intro: 'En Caribbean Language Facility, nos comprometemos a proteger su privacidad y sus datos personales de conformidad con la Ley de Protección de Datos de Trinidad y Tobago (Data Protection Act, 2011).',
        sections: [
            {
                title: '1. Información que Recopilamos',
                content: `Recopilamos la siguiente información personal cuando usted utiliza nuestros servicios:
                
• **Información de contacto:** Nombre, dirección de correo electrónico, número de teléfono/WhatsApp
• **Información del servicio:** Tipo de servicio solicitado, modalidad preferida, mensajes
• **Información técnica:** Dirección IP, tipo de navegador, páginas visitadas (mediante cookies)
• **Documentos:** Cuando corresponda, documentos proporcionados para traducción o servicios relacionados`
            },
            {
                title: '2. Cómo Usamos su Información',
                content: `Utilizamos su información personal para:
                
• Proporcionar los servicios que usted ha solicitado
• Comunicarnos con usted sobre su consulta o servicio
• Mejorar nuestros servicios y experiencia del usuario
• Cumplir con obligaciones legales y regulatorias
• Enviar información relevante sobre nuestros servicios (con su consentimiento)`
            },
            {
                title: '3. Base Legal para el Procesamiento',
                content: `Procesamos sus datos personales bajo las siguientes bases legales conforme a la Ley de Protección de Datos:
                
• **Consentimiento:** Cuando usted nos proporciona su información voluntariamente
• **Ejecución de contrato:** Para cumplir con los servicios acordados
• **Interés legítimo:** Para mejorar nuestros servicios y operaciones
• **Obligación legal:** Para cumplir con requisitos legales aplicables`
            },
            {
                title: '4. Compartir Información',
                content: `No vendemos ni alquilamos su información personal. Podemos compartir información con:
                
• Proveedores de servicios que nos ayudan a operar (procesamiento de pagos, hosting)
• Autoridades legales cuando sea requerido por ley
• Terceros con su consentimiento expreso

Toda transferencia internacional de datos se realiza con salvaguardas apropiadas según la legislación vigente.`
            },
            {
                title: '5. Seguridad de Datos',
                content: `Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal contra:
                
• Acceso no autorizado
• Pérdida o destrucción accidental
• Divulgación no autorizada

Estas medidas incluyen cifrado, acceso restringido y revisiones regulares de seguridad.`
            },
            {
                title: '6. Sus Derechos',
                content: `Bajo la Ley de Protección de Datos de Trinidad y Tobago, usted tiene derecho a:
                
• **Acceso:** Solicitar copia de sus datos personales
• **Rectificación:** Corregir información inexacta o incompleta
• **Eliminación:** Solicitar la eliminación de sus datos (donde sea aplicable)
• **Oposición:** Oponerse al procesamiento de sus datos
• **Portabilidad:** Recibir sus datos en formato estructurado

Para ejercer estos derechos, contáctenos utilizando la información proporcionada abajo.`
            },
            {
                title: '7. Retención de Datos',
                content: `Conservamos su información personal solo durante el tiempo necesario para:
                
• Cumplir con el propósito para el cual fue recopilada
• Satisfacer requisitos legales, contables o de informes
• Resolver disputas y hacer cumplir nuestros acuerdos

Los documentos de traducción se eliminan después de completar el servicio, a menos que solicite lo contrario.`
            },
            {
                title: '8. Cookies',
                content: `Nuestro sitio web utiliza cookies para mejorar su experiencia. Estas incluyen:
                
• **Cookies esenciales:** Necesarias para el funcionamiento del sitio
• **Cookies de análisis:** Para entender cómo se usa nuestro sitio
• **Cookies de preferencias:** Para recordar sus configuraciones

Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades.`
            },
            {
                title: '9. Cambios a esta Política',
                content: 'Podemos actualizar esta política periódicamente. Los cambios significativos serán notificados en nuestro sitio web. Le recomendamos revisar esta política regularmente.'
            },
            {
                title: '10. Contacto',
                content: `Para preguntas sobre esta política o para ejercer sus derechos de privacidad, contáctenos:`
            }
        ]
    },
    en: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: January 2026',
        intro: 'At Caribbean Language Facility, we are committed to protecting your privacy and personal data in accordance with the Trinidad and Tobago Data Protection Act, 2011.',
        sections: [
            {
                title: '1. Information We Collect',
                content: `We collect the following personal information when you use our services:
                
• **Contact information:** Name, email address, phone/WhatsApp number
• **Service information:** Type of service requested, preferred modality, messages
• **Technical information:** IP address, browser type, pages visited (via cookies)
• **Documents:** When applicable, documents provided for translation or related services`
            },
            {
                title: '2. How We Use Your Information',
                content: `We use your personal information to:
                
• Provide the services you have requested
• Communicate with you about your inquiry or service
• Improve our services and user experience
• Comply with legal and regulatory obligations
• Send relevant information about our services (with your consent)`
            },
            {
                title: '3. Legal Basis for Processing',
                content: `We process your personal data under the following legal bases in accordance with the Data Protection Act:
                
• **Consent:** When you voluntarily provide your information
• **Contract performance:** To fulfill agreed services
• **Legitimate interest:** To improve our services and operations
• **Legal obligation:** To comply with applicable legal requirements`
            },
            {
                title: '4. Information Sharing',
                content: `We do not sell or rent your personal information. We may share information with:
                
• Service providers who help us operate (payment processing, hosting)
• Legal authorities when required by law
• Third parties with your express consent

All international data transfers are made with appropriate safeguards under applicable law.`
            },
            {
                title: '5. Data Security',
                content: `We implement appropriate technical and organizational measures to protect your personal information against:
                
• Unauthorized access
• Accidental loss or destruction
• Unauthorized disclosure

These measures include encryption, restricted access, and regular security reviews.`
            },
            {
                title: '6. Your Rights',
                content: `Under the Trinidad and Tobago Data Protection Act, you have the right to:
                
• **Access:** Request a copy of your personal data
• **Rectification:** Correct inaccurate or incomplete information
• **Erasure:** Request deletion of your data (where applicable)
• **Objection:** Object to the processing of your data
• **Portability:** Receive your data in a structured format

To exercise these rights, contact us using the information provided below.`
            },
            {
                title: '7. Data Retention',
                content: `We retain your personal information only for as long as necessary to:
                
• Fulfill the purpose for which it was collected
• Satisfy legal, accounting, or reporting requirements
• Resolve disputes and enforce our agreements

Translation documents are deleted after service completion unless you request otherwise.`
            },
            {
                title: '8. Cookies',
                content: `Our website uses cookies to enhance your experience. These include:
                
• **Essential cookies:** Necessary for site functionality
• **Analytics cookies:** To understand how our site is used
• **Preference cookies:** To remember your settings

You can configure your browser to reject cookies, although this may affect some functionality.`
            },
            {
                title: '9. Changes to This Policy',
                content: 'We may update this policy periodically. Significant changes will be notified on our website. We recommend reviewing this policy regularly.'
            },
            {
                title: '10. Contact',
                content: 'For questions about this policy or to exercise your privacy rights, contact us:'
            }
        ]
    }
};

export default function PrivacyPage() {
    const { language } = useLanguage();
    const content = privacyContent[language];

    return (
        <>
            <Header />
            <main className="pt-28 pb-20 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">{content.title}</h1>
                    <p className="text-text-light/60 mb-8">{content.lastUpdated}</p>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-text-light/80 mb-10 p-6 bg-slate-50 rounded-2xl border-l-4 border-primary">
                            {content.intro}
                        </p>

                        {content.sections.map((section, index) => (
                            <div key={index} className="mb-10">
                                <h2 className="text-2xl font-bold text-primary mb-4">{section.title}</h2>
                                <div className="text-text-light/80 whitespace-pre-line leading-relaxed">
                                    {section.content.split('**').map((part, i) =>
                                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Contact Info */}
                        <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                            <p className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">email</span>
                                <a href={`mailto:${EMAIL_ADDRESS}`} className="text-accent hover:underline">{EMAIL_ADDRESS}</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">call</span>
                                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="text-accent hover:underline">{PHONE_NUMBER}</a>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <span className="flex flex-col">
                                    <span>{ADDRESS_LINE_1}, {ADDRESS_LINE_2}</span>
                                    <span>{ADDRESS_2_LINE_1}, {ADDRESS_2_LINE_2}</span>
                                </span>
                            </p>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-6">
                            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                                {language === 'es' ? 'Volver al inicio' : 'Back to home'}
                            </Link>
                            <Link href="/terms" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
                                <span className="material-symbols-outlined">gavel</span>
                                {language === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

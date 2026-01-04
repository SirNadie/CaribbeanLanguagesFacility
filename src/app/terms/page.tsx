"use client";

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { EMAIL_ADDRESS, PHONE_NUMBER, ADDRESS_LINE_1, ADDRESS_LINE_2, ADDRESS_2_LINE_1, ADDRESS_2_LINE_2 } from '../../consts';

const termsContent = {
    es: {
        title: 'Términos y Condiciones',
        lastUpdated: 'Última actualización: Enero 2026',
        intro: 'Estos Términos y Condiciones regulan el uso de los servicios ofrecidos por Caribbean Language Facility, operando en Trinidad y Tobago. Al utilizar nuestros servicios, usted acepta estos términos.',
        sections: [
            {
                title: '1. Definiciones',
                content: `Para los efectos de estos términos:
                
• **"CLF", "nosotros", "nuestro":** Se refiere a Caribbean Language Facility
• **"Usuario", "usted", "cliente":** Persona que utiliza nuestros servicios
• **"Servicios":** Traducción, interpretación, educación bilingüe, capacitación y servicios profesionales
• **"Contenido":** Documentos, materiales o información proporcionada para servicios`
            },
            {
                title: '2. Servicios Ofrecidos',
                content: `Caribbean Language Facility ofrece:
                
• Servicios de traducción e interpretación (Español ⇄ Inglés)
• Educación bilingüe para niños y adolescentes (Lisa's Kids)
• Capacitación en carreras y oficios (CASA)
• Servicios profesionales de asesoría y orientación

Los detalles específicos de cada servicio se acuerdan al momento de la contratación.`
            },
            {
                title: '3. Contratación de Servicios',
                content: `Al solicitar nuestros servicios:
                
• Usted proporciona información veraz y completa
• Acepta los términos específicos del servicio solicitado
• Se compromete a pagar las tarifas acordadas
• Autoriza el procesamiento de sus datos según nuestra Política de Privacidad

La confirmación de servicio se realiza por escrito (email o WhatsApp) e incluye alcance, plazos y costos.`
            },
            {
                title: '4. Precios y Pagos',
                content: `Respecto a los pagos:
                
• Los precios se cotizan en Dólares de Trinidad y Tobago (TTD) o Dólares Estadounidenses (USD)
• Se requiere un depósito según el tipo de servicio
• El saldo pendiente se paga al completar el servicio
• Aceptamos efectivo, transferencia bancaria y pagos electrónicos

Los precios pueden variar según complejidad, urgencia y volumen del trabajo.`
            },
            {
                title: '5. Servicios de Traducción',
                content: `Para servicios de traducción:
                
• Entregamos traducciones precisas y profesionales
• Los documentos confidenciales se manejan con discreción
• El tiempo de entrega depende del volumen y complejidad
• Las certificaciones notariales pueden tener costos adicionales

No somos responsables por errores en documentos originales ni por uso posterior de las traducciones.`
            },
            {
                title: '6. Servicios Educativos',
                content: `Para Lisa's Kids y programas educativos:
                
• La inscripción requiere información completa del estudiante
• Los pagos de matrícula y mensualidades son según calendario acordado
• Las cancelaciones requieren aviso previo según políticas del programa
• El progreso se comunica regularmente a padres/tutores

Nos reservamos el derecho de modificar horarios y metodologías según necesidades pedagógicas.`
            },
            {
                title: '7. Propiedad Intelectual',
                content: `Respecto a propiedad intelectual:
                
• Los materiales de CLF (cursos, contenido, logos) son de nuestra propiedad
• Las traducciones entregadas son propiedad del cliente
• No puede reproducir ni distribuir nuestros materiales sin autorización
• Respetamos los derechos de autor de materiales proporcionados por clientes`
            },
            {
                title: '8. Confidencialidad',
                content: `Mantenemos confidencialidad sobre:
                
• Documentos proporcionados para traducción
• Información personal y comercial del cliente
• Detalles de servicios contratados
• Cualquier información sensible compartida

Esta obligación persiste después de finalizar la relación comercial.`
            },
            {
                title: '9. Limitación de Responsabilidad',
                content: `Caribbean Language Facility:
                
• No garantiza resultados específicos de procesos legales o migratorios
• No es responsable por decisiones tomadas basadas en traducciones
• Limita su responsabilidad al monto pagado por el servicio
• No responde por daños indirectos o consecuenciales

Nos esforzamos por la excelencia pero no podemos garantizar resultados externos a nuestro control.`
            },
            {
                title: '10. Cancelaciones y Reembolsos',
                content: `Política de cancelación:
                
• Cancelaciones con 48+ horas de anticipación: reembolso completo menos gastos administrativos
• Cancelaciones con menos de 48 horas: reembolso parcial a discreción
• Servicios iniciados: pago proporcional al trabajo realizado
• Cursos educativos: según política específica del programa

Solicite cancelaciones por escrito a nuestro email de contacto.`
            },
            {
                title: '11. Resolución de Disputas',
                content: `En caso de disputas:
                
• Intentaremos resolver amigablemente cualquier desacuerdo
• Las disputas no resueltas pueden someterse a mediación
• Las leyes de Trinidad y Tobago rigen estos términos
• Los tribunales de Trinidad y Tobago tienen jurisdicción exclusiva`
            },
            {
                title: '12. Modificaciones',
                content: 'Podemos modificar estos términos en cualquier momento. Los cambios se publicarán en nuestro sitio web y entrarán en vigor inmediatamente. El uso continuado de nuestros servicios constituye aceptación de los términos modificados.'
            },
            {
                title: '13. Contacto',
                content: 'Para preguntas sobre estos términos o nuestros servicios:'
            }
        ]
    },
    en: {
        title: 'Terms and Conditions',
        lastUpdated: 'Last updated: January 2026',
        intro: 'These Terms and Conditions govern the use of services offered by Caribbean Language Facility, operating in Trinidad and Tobago. By using our services, you agree to these terms.',
        sections: [
            {
                title: '1. Definitions',
                content: `For the purposes of these terms:
                
• **"CLF", "we", "our":** Refers to Caribbean Language Facility
• **"User", "you", "client":** Person using our services
• **"Services":** Translation, interpretation, bilingual education, training, and professional services
• **"Content":** Documents, materials, or information provided for services`
            },
            {
                title: '2. Services Offered',
                content: `Caribbean Language Facility offers:
                
• Translation and interpretation services (Spanish ⇄ English)
• Bilingual education for children and teenagers (Lisa's Kids)
• Career and skills training (CASA)
• Professional advisory and guidance services

Specific details of each service are agreed upon at the time of contracting.`
            },
            {
                title: '3. Service Contracting',
                content: `When requesting our services:
                
• You provide truthful and complete information
• You accept the specific terms of the requested service
• You commit to paying the agreed fees
• You authorize the processing of your data according to our Privacy Policy

Service confirmation is made in writing (email or WhatsApp) and includes scope, deadlines, and costs.`
            },
            {
                title: '4. Prices and Payments',
                content: `Regarding payments:
                
• Prices are quoted in Trinidad and Tobago Dollars (TTD) or US Dollars (USD)
• A deposit is required depending on the type of service
• The outstanding balance is paid upon service completion
• We accept cash, bank transfer, and electronic payments

Prices may vary based on complexity, urgency, and volume of work.`
            },
            {
                title: '5. Translation Services',
                content: `For translation services:
                
• We deliver accurate and professional translations
• Confidential documents are handled with discretion
• Delivery time depends on volume and complexity
• Notarial certifications may have additional costs

We are not responsible for errors in original documents or for subsequent use of translations.`
            },
            {
                title: '6. Educational Services',
                content: `For Lisa's Kids and educational programs:
                
• Enrollment requires complete student information
• Tuition and monthly payments are according to the agreed schedule
• Cancellations require prior notice according to program policies
• Progress is regularly communicated to parents/guardians

We reserve the right to modify schedules and methodologies according to pedagogical needs.`
            },
            {
                title: '7. Intellectual Property',
                content: `Regarding intellectual property:
                
• CLF materials (courses, content, logos) are our property
• Delivered translations are the client's property
• You may not reproduce or distribute our materials without authorization
• We respect the copyrights of materials provided by clients`
            },
            {
                title: '8. Confidentiality',
                content: `We maintain confidentiality regarding:
                
• Documents provided for translation
• Client's personal and commercial information
• Details of contracted services
• Any sensitive information shared

This obligation persists after the end of the business relationship.`
            },
            {
                title: '9. Limitation of Liability',
                content: `Caribbean Language Facility:
                
• Does not guarantee specific outcomes of legal or immigration processes
• Is not responsible for decisions made based on translations
• Limits its liability to the amount paid for the service
• Is not liable for indirect or consequential damages

We strive for excellence but cannot guarantee outcomes beyond our control.`
            },
            {
                title: '10. Cancellations and Refunds',
                content: `Cancellation policy:
                
• Cancellations 48+ hours in advance: full refund minus administrative costs
• Cancellations less than 48 hours: partial refund at discretion
• Started services: proportional payment for work done
• Educational courses: according to specific program policy

Request cancellations in writing to our contact email.`
            },
            {
                title: '11. Dispute Resolution',
                content: `In case of disputes:
                
• We will attempt to amicably resolve any disagreement
• Unresolved disputes may be submitted to mediation
• The laws of Trinidad and Tobago govern these terms
• Trinidad and Tobago courts have exclusive jurisdiction`
            },
            {
                title: '12. Modifications',
                content: 'We may modify these terms at any time. Changes will be published on our website and will take effect immediately. Continued use of our services constitutes acceptance of the modified terms.'
            },
            {
                title: '13. Contact',
                content: 'For questions about these terms or our services:'
            }
        ]
    }
};

export default function TermsPage() {
    const { language } = useLanguage();
    const content = termsContent[language];

    return (
        <>
            <Header />
            <main className="pt-28 pb-20 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">{content.title}</h1>
                    <p className="text-text-light/60 mb-8">{content.lastUpdated}</p>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-text-light/80 mb-10 p-6 bg-slate-50 rounded-2xl border-l-4 border-accent">
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
                                <span className="material-symbols-outlined text-accent">email</span>
                                <a href={`mailto:${EMAIL_ADDRESS}`} className="text-accent hover:underline">{EMAIL_ADDRESS}</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent">call</span>
                                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="text-accent hover:underline">{PHONE_NUMBER}</a>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-accent">location_on</span>
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
                            <Link href="/privacy" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
                                <span className="material-symbols-outlined">shield</span>
                                {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

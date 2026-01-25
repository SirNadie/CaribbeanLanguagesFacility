import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programas de Formación',
    description: 'Programas de nivelación educativa, educación secundaria básica y cursos de asistente de preescolar. Clases de inglés y nivelación en línea.',
};

export default function ProgramasLayout({ children }: { children: React.ReactNode }) {
    return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Inscripciones',
    description: "Información para inscribir a su(s) hijo(s) en Lisa's Kids Casa Bilingüe. Matrícula, horarios, requisitos, uniformes y más.",
};

export default function InscripcionesLayout({ children }: { children: React.ReactNode }) {
    return children;
}

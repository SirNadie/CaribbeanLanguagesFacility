import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const alumnos = await prisma.alumno.findMany({
      select: {
        id: true,
        nombre: true,
        edad: true,
        telefono: true,
        clase: true,
        tipoPago: true,
        montoPago: true,
        pagaTransporte: true,
        transporteAsignado: true,
        estado: true,
        createdAt: true
      },
      orderBy: { nombre: 'asc' }
    });
    return NextResponse.json({ success: true, data: alumnos });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Error fetching alumnos' }, { status: 500 });
  }
}
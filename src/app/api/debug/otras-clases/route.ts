import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/debug/otras-clases - Mostrar info de debug de OtrasClases
export async function GET() {
  try {
    const otrasClases = await prisma.otrasClases.findMany({
      include: {
        alumno: true
      }
    })

    // Para cada OtraClase, buscar pagos por concepto
    const otrasClasesConPagos = await Promise.all(
      otrasClases.map(async (oc) => {
        const pagos = await prisma.pago.findMany({
          where: {
            alumnoId: oc.alumnoId,
            concepto: oc.nombre
          },
          orderBy: { fechaVencimiento: 'asc' }
        })
        return {
          id: oc.id,
          nombre: oc.nombre,
          monto: oc.monto,
          frecuencia: oc.frecuencia,
          fechaInicio: oc.fechaInicio,
          activo: oc.activo,
          createdAt: oc.createdAt,
          alumnoId: oc.alumnoId,
          alumnoNombre: oc.alumno?.nombre || 'Sin alumno',
          pagosCount: pagos.length,
          pagos: pagos.map(p => ({
            id: p.id,
            concepto: p.concepto,
            monto: p.monto,
            frecuencia: p.frecuencia,
            fechaVencimiento: p.fechaVencimiento,
            pagado: p.pagado
          }))
        }
      })
    )

    return NextResponse.json({
      total: otrasClases.length,
      otrasClases: otrasClasesConPagos
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    )
  }
}
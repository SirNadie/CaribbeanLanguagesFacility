import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/alumnos/fix-conceptos - Corregir conceptos de pagos existentes de OtrasClases
export async function PUT() {
  try {
    // Buscar todos los pagos cuyo concepto empieza con "otra_clase_"
    const pagosConId = await prisma.pago.findMany({
      where: {
        concepto: {
          startsWith: 'otra_clase_'
        }
      }
    })

    let corregidos = 0

    for (const pago of pagosConId) {
      // Extraer el ID de OtrasClases del concepto
      // El concepto tiene formato: "otra_clase_XXXXXXXXXXXXXXX"
      const otraClaseId = pago.concepto.replace('otra_clase_', '')
      
      // Buscar la clase
      const otraClase = await prisma.otrasClases.findUnique({
        where: { id: otraClaseId }
      })

      if (otraClase) {
        // Actualizar el concepto con el nombre de la clase
        await prisma.pago.update({
          where: { id: pago.id },
          data: {
            concepto: otraClase.nombre
          }
        })
        corregidos++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Se corrigieron ${corregidos} pagos`
    })
  } catch (error) {
    console.error('Error al corregir conceptos:', error)
    return NextResponse.json(
      { error: 'Error al corregir conceptos de pagos' },
      { status: 500 }
    )
  }
}
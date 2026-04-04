import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Normalizar fecha a medianoche (00:00:00) para evitar inconsistencias
function normalizarFecha(fecha: Date): Date {
  const normalizada = new Date(fecha)
  normalizada.setHours(0, 0, 0, 0)
  return normalizada
}

// Función para calcular próxima fecha de vencimiento - CORREGIDA para meses
function getNextVencimiento(fechaActual: Date, frecuencia: string): Date {
  const anio = fechaActual.getFullYear()
  const mes = fechaActual.getMonth()
  const dia = fechaActual.getDate()
  
  switch (frecuencia) {
    case 'diario':
      return normalizarFecha(new Date(anio, mes, dia + 1))
    case 'semanal':
      return normalizarFecha(new Date(anio, mes, dia + 7))
    case 'mensual':
      return normalizarFecha(new Date(anio, mes + 1, dia))
    default:
      return normalizarFecha(new Date(anio, mes + 1, dia))
  }
}

// PUT /api/alumnos/[id]/pagos/[pagoId] - Modificar un pago (incluyendo marcar como pagado)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; pagoId: string }> }
) {
  try {
    const { id, pagoId } = await params
    const body = await request.json()
    
    const {
      concepto,
      monto,
      fechaVencimiento,
      pagado
    } = body

    // Verificar que el alumno existe
    const alumnoExistente = await prisma.alumno.findUnique({
      where: { id }
    })

    if (!alumnoExistente) {
      return NextResponse.json(
        { error: 'Alumno no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el pago existe y pertenece al alumno
    const pagoExistente = await prisma.pago.findFirst({
      where: {
        id: pagoId,
        alumnoId: id
      }
    })

    if (!pagoExistente) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    // Construir datos a actualizar
    const dataToUpdate: any = {}
    if (concepto !== undefined) dataToUpdate.concepto = concepto
    if (monto !== undefined) dataToUpdate.monto = parseFloat(monto)
    if (fechaVencimiento !== undefined) dataToUpdate.fechaVencimiento = normalizarFecha(new Date(fechaVencimiento))
    if (pagado !== undefined) {
      dataToUpdate.pagado = pagado
      dataToUpdate.fechaPago = pagado ? normalizarFecha(new Date()) : null
    }

    // Actualizar el pago
    const pagoActualizado = await prisma.pago.update({
      where: { id: pagoId },
      data: dataToUpdate
    })

    // Si se marcó como pagado, crear el siguiente pago
    if (pagado === true && pagoExistente.frecuencia) {
      // Verificar que no exista ya un pago futuro para este concepto
      const existePagoFuturo = await prisma.pago.findFirst({
        where: {
          alumnoId: id,
          concepto: pagoExistente.concepto,
          frecuencia: pagoExistente.frecuencia,
          fechaVencimiento: { gt: normalizarFecha(new Date(pagoExistente.fechaVencimiento)) }
        }
      })

      // Solo crear si no existe ya el siguiente pago
      if (!existePagoFuturo) {
        const siguienteFecha = getNextVencimiento(normalizarFecha(new Date(pagoExistente.fechaVencimiento)), pagoExistente.frecuencia)
        
        await prisma.pago.create({
          data: {
            alumnoId: id,
            concepto: pagoExistente.concepto,
            tipo: pagoExistente.tipo,
            frecuencia: pagoExistente.frecuencia,
            monto: pagoExistente.monto,
            fechaVencimiento: siguienteFecha,
            pagado: false,
            activo: true
          }
        })
      }
    }

    return NextResponse.json(pagoActualizado)
  } catch (error) {
    console.error('Error al modificar pago:', error)
    return NextResponse.json(
      { error: 'Error al modificar el pago' },
      { status: 500 }
    )
  }
}

// DELETE /api/alumnos/[id]/pagos/[pagoId] - Eliminar un pago
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; pagoId: string }> }
) {
  try {
    const { id, pagoId } = await params

    // Verificar que el alumno existe
    const alumnoExistente = await prisma.alumno.findUnique({
      where: { id }
    })

    if (!alumnoExistente) {
      return NextResponse.json(
        { error: 'Alumno no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que el pago existe y pertenece al alumno
    const pagoExistente = await prisma.pago.findFirst({
      where: {
        id: pagoId,
        alumnoId: id
      }
    })

    if (!pagoExistente) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    // Eliminar el pago
    await prisma.pago.delete({
      where: { id: pagoId }
    })

    return NextResponse.json({ message: 'Pago eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar pago:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el pago' },
      { status: 500 }
    )
  }
}
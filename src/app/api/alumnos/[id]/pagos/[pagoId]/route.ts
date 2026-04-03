import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/alumnos/[id]/pagos/[pagoId] - Modificar un pago
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
      fechaVencimiento
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

    // Actualizar el pago
    const pagoActualizado = await prisma.pago.update({
      where: { id: pagoId },
      data: {
        concepto,
        monto: parseFloat(monto),
        fechaVencimiento: new Date(fechaVencimiento)
      }
    })

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
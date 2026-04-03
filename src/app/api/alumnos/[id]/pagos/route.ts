import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/alumnos/[id]/pagos - Agregar un pago a un alumno
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Crear el pago
    const pago = await prisma.pago.create({
      data: {
        alumnoId: id,
        concepto,
        monto: parseFloat(monto),
        fechaVencimiento: new Date(fechaVencimiento),
        pagado: false
      }
    })

    return NextResponse.json(pago, { status: 201 })
  } catch (error) {
    console.error('Error al agregar pago:', error)
    return NextResponse.json(
      { error: 'Error al agregar el pago' },
      { status: 500 }
    )
  }
}

// GET /api/alumnos/[id]/pagos - Obtener todos los pagos de un alumno
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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

    // Obtener todos los pagos del alumno
    const pagos = await prisma.pago.findMany({
      where: { alumnoId: id },
      orderBy: {
        fechaVencimiento: 'asc'
      }
    })

    return NextResponse.json(pagos)
  } catch (error) {
    console.error('Error al obtener pagos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los pagos' },
      { status: 500 }
    )
  }
}
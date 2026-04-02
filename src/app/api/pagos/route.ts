import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/pagos - Listar todos los pagos
export async function GET() {
  try {
    const pagos = await prisma.pago.findMany({
      include: {
        alumno: {
          select: {
            id: true,
            nombre: true,
            tipoPago: true
          }
        }
      },
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

// PUT /api/pagos - Actualizar estado de pago
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, pagado, fechaPago } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID de pago requerido' },
        { status: 400 }
      )
    }

    const pago = await prisma.pago.update({
      where: { id },
      data: {
        pagado: pagado ?? true,
        fechaPago: pagado ? (fechaPago ? new Date(fechaPago) : new Date()) : null
      },
      include: {
        alumno: {
          select: {
            id: true,
            nombre: true,
            tipoPago: true
          }
        }
      }
    })

    return NextResponse.json(pago)
  } catch (error) {
    console.error('Error al actualizar pago:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el pago' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: Promise<{ id: string }>
}

// Función helper para calcular próxima fecha de vencimiento
function getNextVencimiento(fechaActual: Date, frecuencia: string): Date {
  const siguiente = new Date(fechaActual)
  switch (frecuencia) {
    case 'diario':
      siguiente.setDate(siguiente.getDate() + 1)
      break
    case 'semanal':
      siguiente.setDate(siguiente.getDate() + 7)
      break
    case 'mensual':
      siguiente.setMonth(siguiente.getMonth() + 1)
      break
    default:
      siguiente.setMonth(siguiente.getMonth() + 1)
  }
  return siguiente
}

// POST /api/alumnos/[id]/pagos - Registrar un pago (con soporte para recurrencia)
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const { 
      concepto, 
      monto, 
      fechaVencimiento, 
      pagado, 
      fechaPago,
      frecuencia, // null = único, 'diario', 'semanal', 'mensual'
      recurrencias // número de pagos a generar si hay recurrencia
    } = body

    // Validaciones
    if (!concepto || !monto || !fechaVencimiento) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: concepto, monto, fechaVencimiento' },
        { status: 400 }
      )
    }

    // Verificar que el alumno existe
    const alumno = await prisma.alumno.findUnique({
      where: { id }
    })

    if (!alumno) {
      return NextResponse.json(
        { error: 'Alumno no encontrado' },
        { status: 404 }
      )
    }

    // Si hay recurrencia, generar múltiples pagos
    if (frecuencia && recurrencias && recurrencias > 0) {
      const pagos = []
      let fechaActual = new Date(fechaVencimiento)
      
      for (let i = 0; i < recurrencias; i++) {
        pagos.push({
          alumnoId: id,
          concepto: i === 0 ? concepto : `${concepto} (${i + 1})`,
          tipo: 'adicional',
          frecuencia,
          monto: parseFloat(monto),
          fechaVencimiento: new Date(fechaActual),
          pagado: false,
          activo: true
        })
        fechaActual = getNextVencimiento(fechaActual, frecuencia)
      }

      await prisma.pago.createMany({
        data: pagos
      })

      return NextResponse.json({ 
        success: true, 
        message: `${recurrencias} pagos recurrentes creados`,
        cantidad: recurrencias
      }, { status: 201 })
    }

    // Pago único
    const pago = await prisma.pago.create({
      data: {
        alumnoId: id,
        concepto,
        monto: parseFloat(monto),
        fechaVencimiento: new Date(fechaVencimiento),
        pagado: pagado || false,
        fechaPago: fechaPago ? new Date(fechaPago) : null
      }
    })

    return NextResponse.json(pago, { status: 201 })
  } catch (error) {
    console.error('Error creating pago:', error)
    return NextResponse.json(
      { error: 'Error al registrar el pago' },
      { status: 500 }
    )
  }
}

// GET /api/alumnos/[id]/pagos - Listar pagos de un alumno
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    
    const pagos = await prisma.pago.findMany({
      where: { alumnoId: id },
      orderBy: { fechaVencimiento: 'desc' }
    })

    return NextResponse.json(pagos)
  } catch (error) {
    console.error('Error fetching pagos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los pagos' },
      { status: 500 }
    )
  }
}

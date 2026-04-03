import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/alumnos - Listar todos los alumnos
export async function GET() {
  try {
    const alumnos = await prisma.alumno.findMany({
      include: {
        pagos: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(alumnos)
  } catch (error) {
    console.error('Error al obtener alumnos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los alumnos' },
      { status: 500 }
    )
  }
}

// POST /api/alumnos - Crear un nuevo alumno
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      nombre,
      edad,
      telefono,
      clase,
      tipoPago,
      montoPago,
      pagaTransporte,
      montoTransporte,
      transporteAsignado,
      fechaRegistro,
      estado,
      notasInactividad
    } = body

    // Validaciones básicas
    if (!nombre || !edad || !tipoPago || !montoPago || !fechaRegistro) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      )
    }

    // Crear el alumno
    const alumno = await prisma.alumno.create({
      data: {
        nombre,
        edad: parseInt(edad),
        telefono: telefono || null,
        clase: clase || null,
        tipoPago,
        montoPago: parseFloat(montoPago),
        pagaTransporte: pagaTransporte || false,
        montoTransporte: pagaTransporte ? parseFloat(montoTransporte) : null,
        transporteAsignado: pagaTransporte ? transporteAsignado : null,
        fechaRegistro: new Date(fechaRegistro),
        estado: estado || 'Activo',
        notasInactividad: notasInactividad || null
      },
      include: {
        pagos: true
      }
    })

    // Generar pagos automáticamente según el tipo de pago
    const fechaBase = new Date(fechaRegistro)
    const pagosACrear = []

    // Generar pagos para los próximos 12 períodos
    for (let i = 0; i < 12; i++) {
      let fechaVencimiento = new Date(fechaBase)
      
      // Calcular fecha de vencimiento según tipo de pago
      switch (tipoPago) {
        case 'diario':
          fechaVencimiento.setDate(fechaBase.getDate() + i)
          break
        case 'semanal':
          fechaVencimiento.setDate(fechaBase.getDate() + (i * 7))
          break
        case 'mensual':
          fechaVencimiento.setMonth(fechaBase.getMonth() + i)
          break
      }

      // Pago de clases
      pagosACrear.push({
        alumnoId: alumno.id,
        concepto: 'clase',
        monto: parseFloat(montoPago),
        fechaVencimiento,
        pagado: false
      })

      // Pago de transporte si aplica
      if (pagaTransporte && montoTransporte) {
        pagosACrear.push({
          alumnoId: alumno.id,
          concepto: 'transporte',
          monto: parseFloat(montoTransporte),
          fechaVencimiento,
          pagado: false
        })
      }
    }

    // Crear todos los pagos
    await prisma.pago.createMany({
      data: pagosACrear
    })

    // Obtener el alumno con los pagos creados
    const alumnoConPagos = await prisma.alumno.findUnique({
      where: { id: alumno.id },
      include: {
        pagos: {
          orderBy: {
            fechaVencimiento: 'asc'
          }
        }
      }
    })

    return NextResponse.json(alumnoConPagos, { status: 201 })
  } catch (error) {
    console.error('Error al crear alumno:', error)
    return NextResponse.json(
      { error: 'Error al crear el alumno' },
      { status: 500 }
    )
  }
}
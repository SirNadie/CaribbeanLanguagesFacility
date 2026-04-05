import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: Promise<{ id: string }>
}

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

// Función para generar pagos recurrentes de OtrasClases hasta HOY
function generarPagosOtrasClases(
  nombre: string,
  monto: number,
  frecuencia: string,
  fechaInicio: Date | null,
  alumnoId: string
) {
  const pagos = []
  const hoy = normalizarFecha(new Date())
  let fechaActual = fechaInicio ? normalizarFecha(new Date(fechaInicio)) : normalizarFecha(new Date())
  
  // Generar pagos desde fechaInicio hasta hoy (inclusive)
  while (fechaActual <= hoy) {
    pagos.push({
      alumnoId,
      concepto: nombre,
      tipo: 'adicional',
      frecuencia,
      monto,
      fechaVencimiento: fechaActual,
      pagado: false,
      activo: true
    })
    
    fechaActual = getNextVencimiento(fechaActual, frecuencia)
  }
  
  return pagos
}

// POST /api/alumnos/[id]/otras-clases - Crear una nueva clase adicional
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const { nombre, monto, frecuencia, activo, fechaInicio } = body

    // Validaciones
    if (!nombre || !monto || !frecuencia) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, monto, frecuencia' },
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

    // Normalizar fecha de inicio
    const fechaInicioNormalizada = fechaInicio 
      ? normalizarFecha(new Date(fechaInicio)) 
      : null

    const otraClase = await prisma.otrasClases.create({
      data: {
        alumnoId: id,
        nombre,
        monto: parseFloat(monto),
        frecuencia,
        activo: activo ?? false,
        fechaInicio: fechaInicioNormalizada
      }
    })

    // Generar pagos recurrentes si la clase está activa y el monto es mayor a 0
    if ((activo ?? false) && parseFloat(monto) > 0) {
      const pagos = generarPagosOtrasClases(
        nombre,
        parseFloat(monto),
        frecuencia,
        fechaInicioNormalizada,
        id
      )
      
      await prisma.pago.createMany({
        data: pagos
      })
    }

    return NextResponse.json(otraClase, { status: 201 })
  } catch (error) {
    console.error('Error creating otras clases:', error)
    return NextResponse.json(
      { error: 'Error al crear la clase adicional' },
      { status: 500 }
    )
  }
}

// PUT /api/alumnos/[id]/otras-clases - Actualizar una clase adicional
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const { otraClaseId, nombre, monto, frecuencia, activo, fechaInicio } = body

    if (!otraClaseId) {
      return NextResponse.json(
        { error: 'Se requiere el ID de la clase' },
        { status: 400 }
      )
    }

    // Verificar que la clase existe y pertenece al alumno
    const otraClaseExistente = await prisma.otrasClases.findFirst({
      where: {
        id: otraClaseId,
        alumnoId: id
      }
    })

    if (!otraClaseExistente) {
      return NextResponse.json(
        { error: 'Clase adicional no encontrada' },
        { status: 404 }
      )
    }

    // Normalizar fecha de inicio si se proporciona
    let fechaInicioNormalizada = otraClaseExistente.fechaInicio
    if (fechaInicio !== undefined) {
      fechaInicioNormalizada = fechaInicio ? normalizarFecha(new Date(fechaInicio)) : null
    }

    const otraClase = await prisma.otrasClases.update({
      where: { id: otraClaseId },
      data: {
        nombre: nombre ?? otraClaseExistente.nombre,
        monto: monto ? parseFloat(monto) : otraClaseExistente.monto,
        frecuencia: frecuencia ?? otraClaseExistente.frecuencia,
        activo: activo ?? otraClaseExistente.activo,
        fechaInicio: fechaInicioNormalizada
      }
    })

    return NextResponse.json(otraClase)
  } catch (error) {
    console.error('Error updating otras clases:', error)
    return NextResponse.json(
      { error: 'Error al actualizar la clase adicional' },
      { status: 500 }
    )
  }
}

// GET /api/alumnos/[id]/otras-clases - Listar clases adicionales de un alumno
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    
    const otrasClases = await prisma.otrasClases.findMany({
      where: { alumnoId: id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(otrasClases)
  } catch (error) {
    console.error('Error fetching otras clases:', error)
    return NextResponse.json(
      { error: 'Error al obtener las clases adicionales' },
      { status: 500 }
    )
  }
}

// DELETE /api/alumnos/[id]/otras-clases - Eliminar una clase adicional
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const otraClaseId = searchParams.get('otraClaseId')

    if (!otraClaseId) {
      return NextResponse.json(
        { error: 'Se requiere el ID de la clase' },
        { status: 400 }
      )
    }

    // Verificar que la clase existe y pertenece al alumno
    const otraClaseExistente = await prisma.otrasClases.findFirst({
      where: {
        id: otraClaseId,
        alumnoId: id
      }
    })

    if (!otraClaseExistente) {
      return NextResponse.json(
        { error: 'Clase adicional no encontrada' },
        { status: 404 }
      )
    }

    // Eliminar la clase
    await prisma.otrasClases.delete({
      where: { id: otraClaseId }
    })

    // Eliminar pagos asociados a esta clase
    await prisma.pago.deleteMany({
      where: {
        alumnoId: id,
        concepto: otraClaseExistente.nombre
      }
    })

    return NextResponse.json({ success: true, message: 'Clase eliminada' })
  } catch (error) {
    console.error('Error deleting otras clases:', error)
    return NextResponse.json(
      { error: 'Error al eliminar la clase adicional' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/alumnos - Listar todos los alumnos
export async function GET() {
  try {
    const alumnos = await prisma.alumno.findMany({
      include: {
        pagos: {
          orderBy: { fechaVencimiento: 'asc' }
        },
        otrasClases: true
      },
      orderBy: { nombre: 'asc' }
    })

    return NextResponse.json(alumnos)
  } catch (error) {
    console.error('Error fetching alumnos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los alumnos' },
      { status: 500 }
    )
  }
}

// Normalizar fecha a medianoche (00:00:00) para evitar inconsistencias
function normalizarFecha(fecha: Date): Date {
  const normalizada = new Date(fecha)
  normalizada.setHours(0, 0, 0, 0)
  return normalizada
}

/// Función helper para calcular próxima fecha de vencimiento - CORREGIDA para meses
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
      // Mantener el mismo día del mes, pasar al siguiente mes
      return normalizarFecha(new Date(anio, mes + 1, dia))
    default:
      return normalizarFecha(new Date(anio, mes + 1, dia))
  }
}

// Función para generar pagos recurrentes desde fechaCobro hasta HOY (pagos vencidos)
function generarPagosRecurrentes(
  monto: number,
  frecuencia: string,
  fechaInicio: Date,
  alumnoId: string,
  concepto: string,
  tipo: string
) {
  const pagos = []
  const hoy = normalizarFecha(new Date())
  let fechaActual = normalizarFecha(new Date(fechaInicio))
  
  // Generar pagos desde fechaInicio hasta hoy (inclusive)
  while (fechaActual <= hoy) {
    pagos.push({
      alumnoId,
      concepto,
      tipo,
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

// POST /api/alumnos - Crear nuevo alumno
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      nombre,
      fechaNacimiento,
      telefono,
      clase,
      tipoPago,
      montoPago,
      pagaTransporte,
      montoTransporte,
      transporteAsignado,
      fechaCobro,
      estado,
      notasInactividad
    } = body

    // Validaciones básicas
    if (!nombre || !fechaNacimiento || !tipoPago || montoPago === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, fechaNacimiento, tipoPago, montoPago' },
        { status: 400 }
      )
    }
    
    // Validar que fechaNacimiento sea una fecha válida
    const fechaNacimientoDate = new Date(fechaNacimiento)
    if (isNaN(fechaNacimientoDate.getTime())) {
      return NextResponse.json(
        { error: 'La fecha de nacimiento no es válida' },
        { status: 400 }
      )
    }
    
    // Validar que no sea una fecha futura
    if (fechaNacimientoDate > new Date()) {
      return NextResponse.json(
        { error: 'La fecha de nacimiento no puede ser futura' },
        { status: 400 }
      )
    }
    
    const tipoPagoValido = ['diario', 'semanal', 'mensual']
    if (!tipoPagoValido.includes(tipoPago)) {
      return NextResponse.json(
        { error: 'El tipo de pago debe ser: diario, semanal o mensual' },
        { status: 400 }
      )
    }

    // Determinar fecha de cobro normalizada
    const fechaCobroNormalizada = fechaCobro 
      ? normalizarFecha(new Date(fechaCobro)) 
      : normalizarFecha(new Date())

    // Crear el alumno
    const alumno = await prisma.alumno.create({
      data: {
        nombre,
        fechaNacimiento: fechaNacimientoDate,
        telefono: telefono || null,
        clase: clase || null,
        tipoPago,
        montoPago: parseFloat(montoPago) || 0,
        pagaTransporte: pagaTransporte || false,
        montoTransporte: montoTransporte ? parseFloat(montoTransporte) : null,
        transporteAsignado: transporteAsignado || null,
        fechaCobro: fechaCobroNormalizada,
        estado: estado || 'Activo',
        notasInactividad: estado === 'Retirado' ? (notasInactividad || null) : null
      }
    })

    // Generar pagos recurrentes si el monto es mayor a 0
    const pagos_a_crear = []
    
    // Pago de clase principal
    if (parseFloat(montoPago) > 0) {
      const conceptoClase = tipoPago === 'diario' ? 'Pago Diario' : tipoPago === 'semanal' ? 'Pago Semanal' : 'Mensualidad'
      pagos_a_crear.push(...generarPagosRecurrentes(
        parseFloat(montoPago),
        tipoPago,
        fechaCobroNormalizada,
        alumno.id,
        conceptoClase,
        'cuota'
      ))
    }
    
    // Pago de transporte si aplica
    if (pagaTransporte && montoTransporte && parseFloat(montoTransporte) > 0) {
      pagos_a_crear.push(...generarPagosRecurrentes(
        parseFloat(montoTransporte),
        tipoPago, // Misma frecuencia que la clase
        fechaCobroNormalizada,
        alumno.id,
        'Transporte',
        'transporte'
      ))
    }

    // Crear todos los pagos
    if (pagos_a_crear.length > 0) {
      await prisma.pago.createMany({
        data: pagos_a_crear
      })
    }

    // Obtener el alumno con todos los datos
    const alumnoCompleto = await prisma.alumno.findUnique({
      where: { id: alumno.id },
      include: {
        pagos: {
          orderBy: { fechaVencimiento: 'asc' }
        },
        otrasClases: true
      }
    })

    return NextResponse.json(alumnoCompleto, { status: 201 })
  } catch (error) {
    console.error('Error creating alumno:', error)
    return NextResponse.json(
      { error: 'Error al crear el alumno' },
      { status: 500 }
    )
  }
}
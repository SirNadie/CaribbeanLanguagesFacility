import { NextResponse } from 'next/server'
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

// PUT /api/alumnos/regenerar-pagos - Regenerar pagos históricos para alumnos existentes
export async function PUT() {
  try {
    const alumnos = await prisma.alumno.findMany({
      where: { estado: 'Activo' }
    })

    let totalPagosCreados = 0

    for (const alumno of alumnos) {
      if (!alumno.fechaCobro || parseFloat(alumno.montoPago.toString()) <= 0) continue

      const hoy = normalizarFecha(new Date())
      const fechaCobro = normalizarFecha(new Date(alumno.fechaCobro))
      
      // Determinar el concepto basado en el tipo de pago
      const conceptoClase = alumno.tipoPago === 'diario' 
        ? 'Pago Diario' 
        : alumno.tipoPago === 'semanal' 
        ? 'Pago Semanal' 
        : 'Mensualidad'

      // Obtener la última fecha de pago existente para este concepto
      const ultimoPagoClase = await prisma.pago.findFirst({
        where: {
          alumnoId: alumno.id,
          concepto: conceptoClase
        },
        orderBy: { fechaVencimiento: 'desc' }
      })

      let fechaInicio = ultimoPagoClase 
        ? normalizarFecha(new Date(ultimoPagoClase.fechaVencimiento)) 
        : fechaCobro

      // Si hay un último pago, calcular el siguiente inicio
      if (ultimoPagoClase) {
        fechaInicio = getNextVencimiento(fechaInicio, alumno.tipoPago)
      }

      // Generar pagos desde fechaInicio hasta hoy
      const pagosClase: any[] = []
      while (fechaInicio <= hoy) {
        // Verificar que no exista ya este pago
        const existePago = await prisma.pago.findFirst({
          where: {
            alumnoId: alumno.id,
            concepto: conceptoClase,
            fechaVencimiento: fechaInicio
          }
        })

        if (!existePago) {
          pagosClase.push({
            alumnoId: alumno.id,
            concepto: conceptoClase,
            tipo: 'cuota',
            frecuencia: alumno.tipoPago,
            monto: parseFloat(alumno.montoPago.toString()),
            fechaVencimiento: fechaInicio,
            pagado: false,
            activo: true
          })
        }

        fechaInicio = getNextVencimiento(fechaInicio, alumno.tipoPago)
      }

      // Crear pagos de la clase principal
      if (pagosClase.length > 0) {
        await prisma.pago.createMany({ data: pagosClase })
        totalPagosCreados += pagosClase.length
      }

      // Pagos de transporte
      if (alumno.pagaTransporte && alumno.montoTransporte) {
        const ultimoPagoTransporte = await prisma.pago.findFirst({
          where: {
            alumnoId: alumno.id,
            concepto: 'Transporte'
          },
          orderBy: { fechaVencimiento: 'desc' }
        })

        let fechaInicioTransporte = ultimoPagoTransporte 
          ? normalizarFecha(new Date(ultimoPagoTransporte.fechaVencimiento)) 
          : fechaCobro

        if (ultimoPagoTransporte) {
          fechaInicioTransporte = getNextVencimiento(fechaInicioTransporte, alumno.tipoPago)
        }

        const pagosTransporte: any[] = []
        while (fechaInicioTransporte <= hoy) {
          const existePago = await prisma.pago.findFirst({
            where: {
              alumnoId: alumno.id,
              concepto: 'Transporte',
              fechaVencimiento: fechaInicioTransporte
            }
          })

          if (!existePago) {
            pagosTransporte.push({
              alumnoId: alumno.id,
              concepto: 'Transporte',
              tipo: 'transporte',
              frecuencia: alumno.tipoPago,
              monto: parseFloat(alumno.montoTransporte.toString()),
              fechaVencimiento: fechaInicioTransporte,
              pagado: false,
              activo: true
            })
          }

          fechaInicioTransporte = getNextVencimiento(fechaInicioTransporte, alumno.tipoPago)
        }

        if (pagosTransporte.length > 0) {
          await prisma.pago.createMany({ data: pagosTransporte })
          totalPagosCreados += pagosTransporte.length
        }
      }

      // Pagos de OtrasClases
      const otrasClases = await prisma.otrasClases.findMany({
        where: {
          alumnoId: alumno.id,
          activo: true
        }
      })

      for (const otraClase of otrasClases) {
        const ultimoPagoOC = await prisma.pago.findFirst({
          where: {
            alumnoId: alumno.id,
            concepto: otraClase.nombre
          },
          orderBy: { fechaVencimiento: 'desc' }
        })

        // Usar fechaInicio de OtrasClases si existe, sino la fechaCobro del alumno
        let fechaInicioOC = otraClase.fechaInicio 
          ? normalizarFecha(new Date(otraClase.fechaInicio)) 
          : fechaCobro

        // Si existe un pago, empezar desde el siguiente
        if (ultimoPagoOC) {
          fechaInicioOC = getNextVencimiento(normalizarFecha(new Date(ultimoPagoOC.fechaVencimiento)), otraClase.frecuencia)
        }

        const pagosOC: any[] = []
        while (fechaInicioOC <= hoy) {
          const existePago = await prisma.pago.findFirst({
            where: {
              alumnoId: alumno.id,
              concepto: otraClase.nombre,
              fechaVencimiento: fechaInicioOC
            }
          })

          if (!existePago) {
            pagosOC.push({
              alumnoId: alumno.id,
              concepto: otraClase.nombre,
              tipo: 'adicional',
              frecuencia: otraClase.frecuencia,
              monto: parseFloat(otraClase.monto.toString()),
              fechaVencimiento: fechaInicioOC,
              pagado: false,
              activo: true
            })
          }

          fechaInicioOC = getNextVencimiento(fechaInicioOC, otraClase.frecuencia)
        }

        if (pagosOC.length > 0) {
          await prisma.pago.createMany({ data: pagosOC })
          totalPagosCreados += pagosOC.length
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Se crearon ${totalPagosCreados} pagos históricos para ${alumnos.length} alumnos`
    })
  } catch (error) {
    console.error('Error al regenerar pagos:', error)
    return NextResponse.json(
      { error: 'Error al regenerar pagos' },
      { status: 500 }
    )
  }
}
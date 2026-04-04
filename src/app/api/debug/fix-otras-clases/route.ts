import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Función para calcular próxima fecha de vencimiento
function calcularSiguienteFecha(anio: number, mes: number, dia: number, frecuencia: string): Date {
  switch (frecuencia) {
    case 'diario':
      return new Date(anio, mes, dia + 1)
    case 'semanal':
      return new Date(anio, mes, dia + 7)
    case 'mensual': {
      const sigMes = mes + 1
      const sigAnio = anio + (sigMes > 11 ? 1 : 0)
      const mesFinal = sigMes > 11 ? 0 : sigMes
      const ultimoDiaDelMes = new Date(sigAnio, mesFinal + 1, 0).getDate()
      const diaFinal = Math.min(dia, ultimoDiaDelMes)
      return new Date(sigAnio, mesFinal, diaFinal)
    }
    default: {
      const sigMes = mes + 1
      const sigAnio = anio + (sigMes > 11 ? 1 : 0)
      const mesFinal = sigMes > 11 ? 0 : sigMes
      const ultimoDiaDelMes = new Date(sigAnio, mesFinal + 1, 0).getDate()
      const diaFinal = Math.min(dia, ultimoDiaDelMes)
      return new Date(sigAnio, mesFinal, diaFinal)
    }
  }
}

// PUT /api/debug/fix-otras-clases - Corregir pagos de OtrasClases usando fechaInicio
export async function PUT() {
  try {
    const otrasClases = await prisma.otrasClases.findMany({
      where: { activo: true }
    })

    let totalCorregidos = 0

    for (const otraClase of otrasClases) {
      // Obtener fecha de inicio como objeto Date
      let fechaInicioDate: Date
      if (otraClase.fechaInicio) {
        // Es un Date de Prisma, usar directamente
        fechaInicioDate = new Date(otraClase.fechaInicio)
      } else {
        fechaInicioDate = new Date(otraClase.createdAt)
      }
      
      // Verificar que la fecha es válida
      if (isNaN(fechaInicioDate.getTime())) {
        fechaInicioDate = new Date()
      }
      
      const frecuencia = otraClase.frecuencia
      const monto = parseFloat(otraClase.monto.toString())
      const hoy = new Date()

      // Eliminar pagos existentes de esta clase
      await prisma.pago.deleteMany({
        where: {
          alumnoId: otraClase.alumnoId,
          concepto: otraClase.nombre
        }
      })

      // Extraer año, mes, día de la fecha
      const anio = fechaInicioDate.getUTCFullYear()
      const mes = fechaInicioDate.getUTCMonth()
      const dia = fechaInicioDate.getUTCDate()
      
      // Crear fecha inicial en UTC
      let fechaActual = new Date(Date.UTC(anio, mes, dia))
      
      // Mes límite (mes actual en UTC)
      const mesLimite = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), 1))
      
      // Generar pagos
      while (true) {
        // Verificar si ya pasamos el mes límite
        if (fechaActual.getUTCFullYear() > mesLimite.getUTCFullYear() || 
            (fechaActual.getUTCFullYear() === mesLimite.getUTCFullYear() && 
             fechaActual.getUTCMonth() > mesLimite.getUTCMonth())) {
          break
        }
        
        await prisma.pago.create({
          data: {
            alumnoId: otraClase.alumnoId,
            concepto: otraClase.nombre,
            tipo: 'adicional',
            frecuencia: frecuencia,
            monto: monto,
            fechaVencimiento: new Date(Date.UTC(
              fechaActual.getUTCFullYear(),
              fechaActual.getUTCMonth(),
              fechaActual.getUTCDate()
            )),
            pagado: false,
            activo: true
          }
        })
        totalCorregidos++
        
        // Calcular siguiente fecha
        const siguiente = calcularSiguienteFecha(
          fechaActual.getUTCFullYear(),
          fechaActual.getUTCMonth(),
          fechaActual.getUTCDate(),
          frecuencia
        )
        fechaActual = new Date(Date.UTC(siguiente.getUTCFullYear(), siguiente.getUTCMonth(), siguiente.getUTCDate()))
      }
    }

    return NextResponse.json({
      success: true,
      message: `Se corrigieron ${totalCorregidos} pagos para ${otrasClases.length} OtrasClases`
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    )
  }
}
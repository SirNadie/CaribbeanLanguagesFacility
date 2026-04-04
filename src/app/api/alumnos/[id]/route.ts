import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: Promise<{ id: string }>
}

// GET /api/alumnos/[id] - Obtener un alumno específico
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    
    const alumno = await prisma.alumno.findUnique({
      where: { id },
      include: {
        pagos: {
          orderBy: { fechaVencimiento: 'asc' }
        },
        otrasClases: true
      }
    })

    if (!alumno) {
      return NextResponse.json(
        { error: 'Alumno no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(alumno)
  } catch (error) {
    console.error('Error fetching alumno:', error)
    return NextResponse.json(
      { error: 'Error al obtener el alumno' },
      { status: 500 }
    )
  }
}

// PUT /api/alumnos/[id] - Actualizar un alumno
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
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
      estado,
      notasInactividad,
      fechaRegistro // Del formulario (fechaCobro)
    } = body

    const updateData: any = {}
    if (nombre !== undefined) updateData.nombre = nombre
    if (edad !== undefined) updateData.edad = parseInt(edad)
    if (telefono !== undefined) updateData.telefono = telefono
    if (clase !== undefined) updateData.clase = clase
    if (tipoPago !== undefined) updateData.tipoPago = tipoPago
    if (montoPago !== undefined) updateData.montoPago = parseFloat(montoPago)
    if (pagaTransporte !== undefined) updateData.pagaTransporte = pagaTransporte
    if (montoTransporte !== undefined) updateData.montoTransporte = montoTransporte ? parseFloat(montoTransporte) : null
    if (transporteAsignado !== undefined) updateData.transporteAsignado = transporteAsignado
    if (estado !== undefined) updateData.estado = estado
    if (notasInactividad !== undefined) updateData.notasInactividad = notasInactividad
    if (fechaRegistro !== undefined) updateData.fechaCobro = fechaRegistro ? new Date(fechaRegistro) : null

    const alumno = await prisma.alumno.update({
      where: { id },
      data: updateData,
      include: {
        pagos: true,
        otrasClases: true
      }
    })

    return NextResponse.json(alumno)
  } catch (error) {
    console.error('Error updating alumno:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el alumno' },
      { status: 500 }
    )
  }
}

// DELETE /api/alumnos/[id] - Eliminar un alumno
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    
    await prisma.alumno.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Alumno eliminado' })
  } catch (error) {
    console.error('Error deleting alumno:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el alumno' },
      { status: 500 }
    )
  }
}

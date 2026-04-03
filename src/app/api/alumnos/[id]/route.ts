import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/alumnos/[id] - Obtener un alumno por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const alumno = await prisma.alumno.findUnique({
      where: { id },
      include: {
        pagos: {
          orderBy: {
            fechaVencimiento: 'asc'
          }
        }
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
    console.error('Error al obtener alumno:', error)
    return NextResponse.json(
      { error: 'Error al obtener el alumno' },
      { status: 500 }
    )
  }
}

// PUT /api/alumnos/[id] - Actualizar un alumno
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
      notasInactividad
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

    // Actualizar el alumno
    const alumnoActualizado = await prisma.alumno.update({
      where: { id },
      data: {
        nombre: nombre || alumnoExistente.nombre,
        edad: edad ? parseInt(edad) : alumnoExistente.edad,
        telefono: telefono !== undefined ? telefono : alumnoExistente.telefono,
        clase: clase !== undefined ? clase : alumnoExistente.clase,
        tipoPago: tipoPago || alumnoExistente.tipoPago,
        montoPago: montoPago ? parseFloat(montoPago) : alumnoExistente.montoPago,
        pagaTransporte: pagaTransporte !== undefined ? pagaTransporte : alumnoExistente.pagaTransporte,
        montoTransporte: pagaTransporte && montoTransporte ? parseFloat(montoTransporte) : (pagaTransporte === false ? null : alumnoExistente.montoTransporte),
        transporteAsignado: pagaTransporte && transporteAsignado ? transporteAsignado : (pagaTransporte === false ? null : alumnoExistente.transporteAsignado),
        estado: estado || alumnoExistente.estado,
        notasInactividad: notasInactividad !== undefined ? notasInactividad : alumnoExistente.notasInactividad
      },
      include: {
        pagos: {
          orderBy: {
            fechaVencimiento: 'asc'
          }
        }
      }
    })

    return NextResponse.json(alumnoActualizado)
  } catch (error) {
    console.error('Error al actualizar alumno:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el alumno' },
      { status: 500 }
    )
  }
}

// DELETE /api/alumnos/[id] - Eliminar un alumno
export async function DELETE(
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

    // Eliminar el alumno (los pagos se eliminan en cascada)
    await prisma.alumno.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Alumno eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar alumno:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el alumno' },
      { status: 500 }
    )
  }
}
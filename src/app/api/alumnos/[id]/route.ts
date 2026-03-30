import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/alumnos/[id] - Obtener un alumno por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const alumno = await prisma.alumno.findUnique({
      where: { id }
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    const {
      telefono,
      direccion,
      mensualidad,
      montoTransporte,
      transporte,
      representante,
      fechaRegistro,
      estado,
      solvente,
      motivoRetiro
    } = body

    // Verificar que el alumno existe
    const existingAlumno = await prisma.alumno.findUnique({
      where: { id }
    })

    if (!existingAlumno) {
      return NextResponse.json(
        { error: 'Alumno no encontrado' },
        { status: 404 }
      )
    }

    // Validaciones básicas
    if (!telefono || !direccion || !mensualidad || !montoTransporte || !transporte || !representante || !fechaRegistro) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      )
    }

    const alumno = await prisma.alumno.update({
      where: { id },
      data: {
        telefono,
        direccion,
        mensualidad: parseFloat(mensualidad),
        montoTransporte: parseFloat(montoTransporte),
        transporte,
        representante,
        fechaRegistro: new Date(fechaRegistro),
        estado: estado || 'Activo',
        solvente: solvente || false,
        motivoRetiro: motivoRetiro || null
      }
    })

    return NextResponse.json(alumno)
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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Verificar que el alumno existe
    const existingAlumno = await prisma.alumno.findUnique({
      where: { id }
    })

    if (!existingAlumno) {
      return NextResponse.json(
        { error: 'Alumno no encontrado' },
        { status: 404 }
      )
    }

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
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/alumnos - Listar todos los alumnos
export async function GET() {
  try {
    const alumnos = await prisma.alumno.findMany({
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

    // Validaciones básicas
    if (!telefono || !direccion || !mensualidad || !montoTransporte || !transporte || !representante || !fechaRegistro) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      )
    }

    const alumno = await prisma.alumno.create({
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

    return NextResponse.json(alumno, { status: 201 })
  } catch (error) {
    console.error('Error al crear alumno:', error)
    return NextResponse.json(
      { error: 'Error al crear el alumno' },
      { status: 500 }
    )
  }
}
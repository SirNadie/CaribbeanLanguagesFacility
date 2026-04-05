import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/transportes - Listar todos los transportes activos
export async function GET() {
  try {
    const transportes = await prisma.transporte.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' }
    })
    return NextResponse.json(transportes)
  } catch (error) {
    console.error('Error al obtener transportes:', error)
    return NextResponse.json(
      { error: 'Error al obtener los transportes' },
      { status: 500 }
    )
  }
}

// POST /api/transportes - Crear nuevo transporte
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre } = body

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre del transporte es requerido' },
        { status: 400 }
      )
    }

    // Verificar si ya existe
    const existente = await prisma.transporte.findFirst({
      where: { 
        nombre: nombre.trim()
      }
    })

    if (existente) {
      return NextResponse.json(
        { error: 'Ya existe un transporte con ese nombre' },
        { status: 400 }
      )
    }

    const transporte = await prisma.transporte.create({
      data: { nombre: nombre.trim() }
    })

    return NextResponse.json(transporte, { status: 201 })
  } catch (error) {
    console.error('Error al crear transporte:', error)
    return NextResponse.json(
      { error: 'Error al crear el transporte' },
      { status: 500 }
    )
  }
}

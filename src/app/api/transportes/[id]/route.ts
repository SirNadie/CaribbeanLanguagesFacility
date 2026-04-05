import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: Promise<{ id: string }>
}

// GET /api/transportes/[id] - Obtener un transporte
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const transporte = await prisma.transporte.findUnique({
      where: { id }
    })

    if (!transporte) {
      return NextResponse.json(
        { error: 'Transporte no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(transporte)
  } catch (error) {
    console.error('Error al obtener transporte:', error)
    return NextResponse.json(
      { error: 'Error al obtener el transporte' },
      { status: 500 }
    )
  }
}

// PUT /api/transportes/[id] - Actualizar transporte
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()
    const { nombre } = body

    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre del transporte es requerido' },
        { status: 400 }
      )
    }

    // Verificar si ya existe otro transporte con ese nombre
    const existente = await prisma.transporte.findFirst({
      where: {
        nombre: { equals: nombre.trim(), mode: 'insensitive' },
        id: { not: id }
      }
    })

    if (existente) {
      return NextResponse.json(
        { error: 'Ya existe un transporte con ese nombre' },
        { status: 400 }
      )
    }

    const transporte = await prisma.transporte.update({
      where: { id },
      data: { nombre: nombre.trim() }
    })

    return NextResponse.json(transporte)
  } catch (error) {
    console.error('Error al actualizar transporte:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el transporte' },
      { status: 500 }
    )
  }
}

// DELETE /api/transportes/[id] - Eliminar transporte (soft delete)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    await prisma.transporte.update({
      where: { id },
      data: { activo: false }
    })

    return NextResponse.json({ success: true, message: 'Transporte eliminado' })
  } catch (error) {
    console.error('Error al eliminar transporte:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el transporte' },
      { status: 500 }
    )
  }
}

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const nombres = await prisma.otrasClases.findMany({
      select: { nombre: true },
      distinct: ['nombre'],
      where: { nombre: { not: '' } },
      orderBy: { nombre: 'asc' }
    })
    
    return NextResponse.json(nombres.map(n => n.nombre))
  } catch (error) {
    console.error('Error al obtener nombres de clases:', error)
    return NextResponse.json([], { status: 500 })
  }
}

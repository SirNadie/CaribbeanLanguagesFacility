import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/debug/create-admin - Crear usuario admin si no existe
export async function GET() {
  try {
    // Verificar si ya existe
    const existing = await prisma.adminUser.findUnique({
      where: { email: 'liscetaguilera2022@gmail.com' }
    })

    if (existing) {
      return NextResponse.json({ 
        success: true, 
        message: 'El usuario admin ya existe',
        email: existing.email
      })
    }

    // Crear el usuario admin
    const admin = await prisma.adminUser.create({
      data: {
        email: 'liscetaguilera2022@gmail.com',
        password: 'CLF#2026!Dashboard$Secure',
        name: 'Admin'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Usuario admin creado',
      email: admin.email
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error al crear usuario admin' },
      { status: 500 }
    )
  }
}
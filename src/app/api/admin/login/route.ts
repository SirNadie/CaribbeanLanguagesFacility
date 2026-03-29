import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin, createSessionToken } from '@/lib/auth'

const AUTH_SECRET = process.env.AUTH_SECRET || 'your-super-secret-key-change-this-in-production'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const isValid = await authenticateAdmin(email, password)
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }
    
    // Create session token
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2)
    const token = Buffer.from(`${timestamp}:${randomString}:${AUTH_SECRET}`).toString('base64')
    
    // Set cookie in response
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

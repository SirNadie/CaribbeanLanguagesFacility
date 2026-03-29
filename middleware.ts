import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_SECRET = process.env.AUTH_SECRET || 'your-super-secret-key-change-this-in-production'

// Verify session token inline (middleware context)
function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [timestamp, , secret] = decoded.split(':')
    
    // Check if token is valid and not expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    
    return secret === AUTH_SECRET && tokenAge < maxAge && !isNaN(parseInt(timestamp))
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  // Only protect admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const sessionCookie = request.cookies.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    const isValid = verifyToken(sessionCookie.value)
    
    if (!isValid) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

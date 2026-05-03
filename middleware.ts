import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_SECRET = process.env.AUTH_SECRET

// Verify session token inline (middleware context)
function verifyToken(token: string): boolean {
  if (!AUTH_SECRET) return false
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
  if (!AUTH_SECRET) {
    console.error('AUTH_SECRET environment variable is not set')
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

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
    
    // Add cache control headers to prevent browser caching
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

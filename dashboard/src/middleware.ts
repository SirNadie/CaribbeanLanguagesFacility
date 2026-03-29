import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public paths that don't require authentication
    const publicPaths = ['/', '/api/auth/login', '/api/auth/register'];
    
    // Check if the path is public
    const isPublicPath = publicPaths.some(path => pathname === path);

    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value;

    // If it's a public path, allow access
    if (isPublicPath) {
        // If user is logged in and tries to access login, redirect to dashboard
        if (pathname === '/' && token) {
            const payload = verifyToken(token);
            if (payload) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
        return NextResponse.next();
    }

    // For protected paths, check authentication
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const payload = verifyToken(token);
    
    if (!payload) {
        // Invalid token, redirect to login
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('auth_token');
        return response;
    }

    // User is authenticated, allow access
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
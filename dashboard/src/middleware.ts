import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public paths that don't require authentication
    const publicPaths = ['/', '/api/auth/login', '/api/init-db'];

    // Check if the path is public
    const isPublicPath = publicPaths.includes(pathname);

    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value;

    // If it's a public path and user is logged in, redirect to dashboard
    if (isPublicPath && token) {
        const payload = verifyToken(token);
        if (payload) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // For protected paths, check authentication
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Verify token for protected paths
    if (!isPublicPath && token) {
        const payload = verifyToken(token);
        if (!payload) {
            const response = NextResponse.redirect(new URL('/', request.url));
            response.cookies.delete('auth_token');
            return response;
        }
    }

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
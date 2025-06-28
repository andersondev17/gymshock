// middleware.ts - Debug Version
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Routes that require authentication
    const protectedPaths = ['/admin', '/dashboard', '/profile', '/trainer'];
    
    // Routes that should redirect if already authenticated
    const authPaths = ['/login', '/register'];

    // Skip middleware for static assets and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/assets') ||
        pathname.includes('.') ||
        pathname === '/' ||
        pathname.startsWith('/exercises') ||
        pathname.startsWith('/programs')
    ) {
        return NextResponse.next();
    }

    // Check if current path needs protection
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    const isAuthPath = authPaths.some(path => pathname.startsWith(path));

    // ✅ Enhanced session detection with debugging
    const sessionCookie = request.cookies.get('connect.sid');
    const cookieValue = sessionCookie?.value;
    
    // ✅ More robust session validation
    const hasValidSession = !!(cookieValue && cookieValue !== 'undefined' && cookieValue.length > 10);

    // ✅ Enhanced logging
    console.log(`🔒 Middleware Debug:`, {
        pathname,
        sessionCookie: cookieValue ? `${cookieValue.substring(0, 20)}...` : 'none',
        hasValidSession,
        isProtectedPath,
        isAuthPath
    });

    // ✅ Don't redirect based on cookie alone for auth paths
    // Let the AuthProvider handle the real auth check
    if (isAuthPath) {
        console.log(`ℹ️  Auth path ${pathname} - letting AuthProvider handle auth state`);
        return NextResponse.next();
    }

    // Redirect unauthenticated users from protected routes
    if (isProtectedPath && !hasValidSession) {
        console.log(`❌ No valid session for protected path ${pathname} - redirecting to login`);
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Log admin access attempts
    if (pathname.startsWith('/admin')) {
        console.log(`🛡️  Admin route access: ${pathname} - session: ${hasValidSession ? 'valid' : 'invalid'}`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
};
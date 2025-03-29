import { auth as middleware } from '@/auth';
import { signOut } from 'next-auth/react';
import { NextResponse } from 'next/server';

// 1. Specify protected and public routes
const routePermissions: Record<string, string[]> = {
  '/admin/blogs': ['my-blogs-publisher'], // Only "editor", explicitly exclude "admin"
  '/admin/users': ['my-blogs-admin'], // Only "admin" can manage users
  '/admin': ['my-blogs-admin', 'my-blogs-publisher'] // General /admin access for both roles
};

export default middleware((req) => {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;

  if (!path.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Logic to check for auth in the middleware
  const auth = req.auth;
  if (!auth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Logic to check expired token
  const expires = auth?.accessTokenExp;
  if (expires && new Date(expires) <= new Date()) {
    console.info('Token expired, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Logic to check user roles
  const userRoles: string[] = auth?.user?.roles || [];
  // Check required roles for the path
  for (const [route, allowedRoles] of Object.entries(routePermissions)) {
    if (path.startsWith(route)) {
      const isAllowed = allowedRoles.some((role) => userRoles.includes(role));
      if (!isAllowed) {
        return NextResponse.redirect(new URL('/403', req.url)); // Redirect unauthorized users
      }
    }
  }

  return NextResponse.next();
});

// Routes Middleware should not run on
export const config = {
  // matcher: ['/admin/:path*'] // Apply middleware only to /admin routes
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};

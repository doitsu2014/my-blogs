import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';

// 1. Specify protected and public routes
const routePermissions: Record<string, string[]> = {
  '/admin/blog-management': ['editor'], // Only "editor", explicitly exclude "admin"
  '/admin/user-management': ['admin'], // Only "admin" can manage users
  '/admin': ['admin', 'editor'] // General /admin access for both roles
};

export default middleware((req) => {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const auth = req.auth;

  console.log('Auth Data:', auth);

  if (!auth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const userRoles: string[] = auth.user.roles || [];

  // Check required roles for the path
  for (const [route, allowedRoles] of Object.entries(routePermissions)) {
    if (path.startsWith(route)) {
      const isAllowed = allowedRoles.some((role) => userRoles.includes(role));
      const isExplicitlyDenied =
        path.startsWith('/admin/blog-management') && userRoles.includes('admin');

      if (isExplicitlyDenied) {
        return NextResponse.redirect(new URL('/403', req.url)); // Deny access to admin for blog management
      }

      if (!isAllowed) {
        return NextResponse.redirect(new URL('/403', req.url)); // Redirect unauthorized users
      }
    }
  }

  return NextResponse.next();
});

// Routes Middleware should not run on
export const config = {
  matcher: ['/admin/:path*'] // Apply middleware only to /admin routes
};

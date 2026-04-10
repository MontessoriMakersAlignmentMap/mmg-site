import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Residency routes that require authentication
const PROTECTED_RESIDENCY_ROUTES = ['/residency/portal', '/residency/admin', '/residency/mentor']

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // Inject pathname header for canonical URL generation
  response.headers.set('x-pathname', pathname)

  // Residency auth: check for Supabase auth cookie on protected routes
  const isProtectedResidency = PROTECTED_RESIDENCY_ROUTES.some(route => pathname.startsWith(route))
  if (isProtectedResidency) {
    const hasAuthCookie = request.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))
    if (!hasAuthCookie) {
      const loginUrl = new URL('/residency/auth/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)$).*)'],
}

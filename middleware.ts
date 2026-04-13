import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Residency routes that require authentication
const PROTECTED_RESIDENCY_ROUTES = ['/residency/portal', '/residency/admin', '/residency/mentor']

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // Inject pathname header for canonical URL generation
  response.headers.set('x-pathname', pathname)

  // Residency auth is handled client-side by useResidencyAuth hook.
  // Supabase JS v2 stores sessions in localStorage, not cookies,
  // so middleware cannot reliably check auth state.

  return response
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)$).*)'],
}

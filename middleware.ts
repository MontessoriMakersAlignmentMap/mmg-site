import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Injects the request pathname as a header so the root layout's
 * generateMetadata can produce a correct canonical URL for every route
 * without modifying each page file individually.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)$).*)'],
}

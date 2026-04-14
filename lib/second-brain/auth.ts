import { NextRequest } from 'next/server'

/**
 * Gate for Second Brain admin routes. Matches the `generate-outreach` pattern:
 * caller passes `x-admin-password` header, we compare to ADMIN_PASSWORD env.
 */
export function checkAdminAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

import { createClient } from '@supabase/supabase-js'

// Anon client — respects RLS. Use for public reads.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Service-role client — bypasses RLS. Use only in trusted server routes.
// Requires SUPABASE_SERVICE_ROLE_KEY in environment variables.
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

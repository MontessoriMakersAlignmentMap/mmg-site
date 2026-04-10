'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { ResidencyProfile } from './types'

export function useResidencyAuth(requiredRoles?: string[]) {
  const router = useRouter()
  const [profile, setProfile] = useState<ResidencyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/residency/auth/login')
        return
      }

      const { data: prof } = await supabase
        .from('residency_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!prof) {
        router.replace('/residency/auth/login')
        return
      }

      if (requiredRoles && !requiredRoles.includes(prof.role)) {
        // Redirect to the right place based on actual role
        if (prof.role === 'admin') router.replace('/residency/admin')
        else if (prof.role === 'mentor') router.replace('/residency/mentor')
        else router.replace('/residency/portal')
        return
      }

      setProfile(prof)
      setLoading(false)
    }
    check()
  }, [router, requiredRoles])

  return { profile, loading }
}

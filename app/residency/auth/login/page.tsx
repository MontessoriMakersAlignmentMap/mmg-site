'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      // Check the user's residency role to redirect appropriately
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Sign in succeeded but session could not be established. Please try again.')
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('residency_profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      // Use redirect param if present, otherwise route by role
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('redirect')

      if (redirect && redirect.startsWith('/residency/')) {
        router.push(redirect)
      } else if (profile?.role === 'admin') {
        router.push('/residency/admin')
      } else if (profile?.role === 'instructor') {
        router.push('/residency/instructor')
      } else if (profile?.role === 'mentor') {
        router.push('/residency/mentor')
      } else if (profile?.role === 'school_partner') {
        router.push('/residency/school')
      } else {
        router.push('/residency/portal')
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="r-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Image
            src="/mmr-logo-light.png"
            alt="Montessori Makers Institute Residency"
            width={160}
            height={80}
            style={{ objectFit: 'contain', margin: '0 auto 1.25rem', mixBlendMode: 'multiply' }}
          />
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Sign In</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Access your Residency account
          </p>
        </div>

        <form onSubmit={handleLogin} className="r-card" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="r-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="r-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="r-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
            />
          </div>

          {error && (
            <p style={{
              color: 'var(--r-error)',
              fontSize: '0.8125rem',
              marginBottom: '1rem',
              padding: '0.5rem 0.75rem',
              background: 'var(--r-error-light)',
              borderRadius: '6px',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="r-btn r-btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
          New resident?{' '}
          <Link href="/residency/auth/register" style={{ color: 'var(--r-navy)', fontWeight: 600 }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

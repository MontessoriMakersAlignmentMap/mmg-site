'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Create residency profile
    if (data.user) {
      await supabase.from('residency_profiles').insert({
        id: data.user.id,
        role: 'resident',
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
      })

      // Create resident record
      await supabase.from('residency_residents').insert({
        profile_id: data.user.id,
        status: 'enrolled',
      })
    }

    router.push('/residency/portal')
  }

  return (
    <div className="r-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Image
            src="/mmr-logo-light.png"
            alt="Montessori Makers Institute Residency"
            width={180}
            height={90}
            style={{ objectFit: 'contain', margin: '0 auto 1.25rem' }}
          />
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Begin your residency journey
          </p>
        </div>

        <form onSubmit={handleRegister} className="r-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label" htmlFor="firstName">First Name</label>
              <input id="firstName" type="text" className="r-input"
                value={form.firstName} onChange={e => update('firstName', e.target.value)} required />
            </div>
            <div>
              <label className="r-label" htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" className="r-input"
                value={form.lastName} onChange={e => update('lastName', e.target.value)} required />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label" htmlFor="email">Email</label>
            <input id="email" type="email" className="r-input"
              value={form.email} onChange={e => update('email', e.target.value)} required
              placeholder="you@example.com" />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label" htmlFor="password">Password</label>
            <input id="password" type="password" className="r-input"
              value={form.password} onChange={e => update('password', e.target.value)} required
              placeholder="At least 8 characters" />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="r-label" htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" className="r-input"
              value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required />
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

          <button type="submit" className="r-btn r-btn-primary" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
          Already have an account?{' '}
          <Link href="/residency/auth/login" style={{ color: 'var(--r-navy)', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

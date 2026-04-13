'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WaitlistPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    track_interest: '',
    applicant_role: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/residency/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to join waitlist')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section style={{
        background: 'var(--r-navy)',
        color: 'var(--r-white)',
        padding: '6rem 0 5rem',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="r-container" style={{ maxWidth: '550px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            You&apos;re On the List
          </p>
          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: 'var(--r-white)',
          }}>
            Thank You, {form.first_name}
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
            We will notify you when enrollment opens for the next cohort. In the meantime, explore our curriculum and resources.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/residency/curriculum" className="r-btn r-btn-gold" style={{ padding: '0.75rem 2rem' }}>
              Explore Curriculum
            </Link>
            <Link href="/residency" className="r-btn r-btn-secondary" style={{ padding: '0.75rem 2rem', color: 'var(--r-white)', borderColor: 'rgba(255,255,255,0.3)' }}>
              Back to Residency
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section style={{
        background: 'var(--r-navy)',
        color: 'var(--r-white)',
        padding: '5rem 0 4rem',
        textAlign: 'center',
      }}>
        <div className="r-container" style={{ maxWidth: '600px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            Stay Connected
          </p>
          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: 'var(--r-white)',
          }}>
            Join the Waitlist
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
            Be the first to know when enrollment opens for the next Montessori Makers Residency cohort.
          </p>
        </div>
      </section>

      <section className="r-section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="r-container" style={{ maxWidth: '480px' }}>
          <form onSubmit={handleSubmit} className="r-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="r-label" htmlFor="first_name">First Name *</label>
                <input id="first_name" type="text" className="r-input" required
                  value={form.first_name} onChange={e => update('first_name', e.target.value)} />
              </div>
              <div>
                <label className="r-label" htmlFor="last_name">Last Name *</label>
                <input id="last_name" type="text" className="r-input" required
                  value={form.last_name} onChange={e => update('last_name', e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="r-label" htmlFor="email">Email Address *</label>
              <input id="email" type="email" className="r-input" required
                value={form.email} onChange={e => update('email', e.target.value)} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="r-label" htmlFor="phone">Phone (Optional)</label>
              <input id="phone" type="tel" className="r-input"
                value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="r-label" htmlFor="applicant_role">Current Role (Optional)</label>
              <input id="applicant_role" type="text" className="r-input" placeholder="e.g., Lead Teacher, Student"
                value={form.applicant_role} onChange={e => update('applicant_role', e.target.value)} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="r-label" htmlFor="track_interest">Track of Interest</label>
              <select id="track_interest" className="r-input" value={form.track_interest} onChange={e => update('track_interest', e.target.value)}>
                <option value="">Not sure yet</option>
                <option value="primary">Primary (Ages 3-6)</option>
                <option value="elementary">Elementary (Ages 6-12)</option>
              </select>
            </div>

            {error && (
              <div style={{
                color: 'var(--r-error)',
                fontSize: '0.8125rem',
                padding: '0.5rem 0.75rem',
                background: 'var(--r-error-light)',
                borderRadius: '6px',
                marginBottom: '1rem',
              }}>
                {error}
              </div>
            )}

            <button type="submit" className="r-btn r-btn-primary" disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
              {submitting ? 'Joining...' : 'Join Waitlist'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
              Ready to apply now?{' '}
              <Link href="/residency/apply" style={{ color: 'var(--r-navy)', fontWeight: 600 }}>
                Start your application
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

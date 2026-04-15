'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TRACK_TUITION } from '@/lib/residency/tuition'

const states = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]

const educationLevels = [
  'High School Diploma',
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  'Doctoral Degree',
  'Other',
]

const heardAboutOptions = [
  'Social media',
  'Google search',
  'Conference or event',
  'Colleague or friend',
  'Montessori school or organization',
  'Other',
]

export default function ApplyPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    applicant_role: '',
    school_name: '',
    years_experience: '',
    education_level: '',
    track_interest: 'primary',
    montessori_experience: '',
    why_montessori: '',
    equity_fellows: false,
    equity_statement: '',
    heard_about: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/residency/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          years_experience: form.years_experience ? parseInt(form.years_experience) : null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit application')
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
              Application Received
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
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
              We have received your application to the Montessori Makers Residency. You will receive a confirmation email shortly.
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>
              Our team reviews applications on a rolling basis. We will be in touch within two weeks regarding your application status.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/residency" className="r-btn r-btn-gold" style={{ padding: '0.75rem 2rem' }}>
                Back to Residency
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--r-navy)',
        color: 'var(--r-white)',
        padding: '5rem 0 4rem',
        textAlign: 'center',
      }}>
        <div className="r-container" style={{ maxWidth: '700px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            Montessori Makers Institute
          </p>
          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: 'var(--r-white)',
          }}>
            Apply to the Residency
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
            The Montessori Makers Residency is a teacher preparation program grounded in the belief that every child deserves an educator who is deeply prepared, culturally responsive, and committed to equity in Montessori education.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="r-section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="r-container" style={{ maxWidth: '720px' }}>
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Personal Information</h2>

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
                <label className="r-label" htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" className="r-input"
                  value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="r-label" htmlFor="city">City</label>
                  <input id="city" type="text" className="r-input"
                    value={form.city} onChange={e => update('city', e.target.value)} />
                </div>
                <div>
                  <label className="r-label" htmlFor="state">State</label>
                  <select id="state" className="r-input" value={form.state} onChange={e => update('state', e.target.value)}>
                    <option value="">Select</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Professional Background</h2>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label" htmlFor="applicant_role">Current Role</label>
                <input id="applicant_role" type="text" className="r-input" placeholder="e.g., Lead Teacher, Assistant, Paraprofessional"
                  value={form.applicant_role} onChange={e => update('applicant_role', e.target.value)} />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label" htmlFor="school_name">School or Organization</label>
                <input id="school_name" type="text" className="r-input"
                  value={form.school_name} onChange={e => update('school_name', e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="r-label" htmlFor="years_experience">Years in Education</label>
                  <input id="years_experience" type="number" className="r-input" min="0" max="50"
                    value={form.years_experience} onChange={e => update('years_experience', e.target.value)} />
                </div>
                <div>
                  <label className="r-label" htmlFor="education_level">Highest Degree</label>
                  <select id="education_level" className="r-input" value={form.education_level} onChange={e => update('education_level', e.target.value)}>
                    <option value="">Select</option>
                    {educationLevels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="r-label" htmlFor="montessori_experience">Prior Montessori Experience</label>
                <textarea id="montessori_experience" className="r-textarea" rows={3}
                  placeholder="Describe any prior Montessori training, classroom experience, or exposure..."
                  value={form.montessori_experience} onChange={e => update('montessori_experience', e.target.value)} />
              </div>
            </div>

            {/* Program Interest */}
            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Program Interest</h2>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">Track of Interest *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                  {(['primary', 'elementary'] as const).map(key => {
                    const t = TRACK_TUITION[key]
                    const selected = form.track_interest === key
                    return (
                      <label key={key} style={{
                        display: 'block',
                        padding: '1rem 1.25rem',
                        border: `2px solid ${selected ? 'var(--r-navy)' : 'var(--r-border)'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: selected ? 'rgba(14,26,122,0.04)' : 'transparent',
                      }}>
                        <input type="radio" name="track_interest" value={key}
                          checked={selected}
                          onChange={e => update('track_interest', e.target.value)}
                          style={{ display: 'none' }} />
                        <p style={{ fontSize: '0.9375rem', fontWeight: selected ? 700 : 600, marginBottom: '0.25rem' }}>
                          {t.name}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
                          {t.programLength} &middot; {t.lessons} lessons
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--r-navy)', fontWeight: 600 }}>
                          ${t.payInFull.toLocaleString()} pay-in-full &middot; ${t.monthly}/mo &times; {t.monthlyTermMonths}
                        </p>
                      </label>
                    )
                  })}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.5rem' }}>
                  Annual materials intensive ($200&ndash;$300) billed separately. Remote practice option available at no additional cost.
                </p>
              </div>

              <div>
                <label className="r-label" htmlFor="why_montessori">Why Montessori? *</label>
                <textarea id="why_montessori" className="r-textarea" rows={4} required
                  placeholder="Tell us about your interest in Montessori education and what draws you to this residency program..."
                  value={form.why_montessori} onChange={e => update('why_montessori', e.target.value)} />
              </div>
            </div>

            {/* Equity Fellows */}
            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Equity Fellows Track</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                The Equity Fellows track provides additional mentorship and tuition support for educators from underrepresented communities in Montessori education. Checking this box is optional and will not affect your application.
              </p>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                cursor: 'pointer',
                marginBottom: form.equity_fellows ? '1.25rem' : 0,
              }}>
                <input type="checkbox" checked={form.equity_fellows}
                  onChange={e => update('equity_fellows', e.target.checked)}
                  style={{ marginTop: '0.2rem', width: '18px', height: '18px', accentColor: 'var(--r-navy)' }} />
                <span style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                  I am interested in being considered for the Equity Fellows track
                </span>
              </label>

              {form.equity_fellows && (
                <div>
                  <label className="r-label" htmlFor="equity_statement">Brief Statement (Optional)</label>
                  <textarea id="equity_statement" className="r-textarea" rows={3}
                    placeholder="Share anything you'd like us to know about your background or perspective..."
                    value={form.equity_statement} onChange={e => update('equity_statement', e.target.value)} />
                </div>
              )}
            </div>

            {/* How Did You Hear */}
            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <label className="r-label" htmlFor="heard_about">How did you hear about the Residency?</label>
              <select id="heard_about" className="r-input" value={form.heard_about} onChange={e => update('heard_about', e.target.value)}>
                <option value="">Select</option>
                {heardAboutOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {error && (
              <div style={{
                color: 'var(--r-error)',
                fontSize: '0.875rem',
                padding: '0.75rem 1rem',
                background: 'var(--r-error-light)',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}>
                {error}
              </div>
            )}

            <button type="submit" className="r-btn r-btn-primary" disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}>
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
              Not ready to apply?{' '}
              <Link href="/residency/waitlist" style={{ color: 'var(--r-navy)', fontWeight: 600 }}>
                Join our waitlist
              </Link>{' '}
              to be notified about future cohorts.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'

const credentialOptions = [
  'AMI Primary',
  'AMS Primary',
  'AMI Elementary',
  'AMS Elementary',
  'Other Montessori Credential',
  'No Credential',
]

const schoolTypeOptions = [
  'Private Independent',
  'Public District',
  'Charter',
  'Bilingual or Dual Language',
  'Justice-Centered or Equity-Focused',
]

const availabilityOptions = [
  'Available to Host a Resident at My School',
  'Available for Remote Mentorship Only',
  'Available for Either',
]

export default function MentorApplyPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    school_name: '',
    role_at_school: '',
    credential_type: '',
    years_experience: '',
    school_types: [] as string[],
    mentoring_interest: '',
    equity_statement: '',
    availability: [] as string[],
    role_description_confirmed: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function toggleArray(field: 'school_types' | 'availability', value: string) {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.role_description_confirmed) {
      setError('Please confirm you have read the mentor role description.')
      return
    }
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/residency/mentor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          years_experience: form.years_experience ? parseInt(form.years_experience) : null,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
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
      <section style={{ background: 'var(--r-navy)', color: '#fff', padding: '6rem 0', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="r-container" style={{ maxWidth: '550px' }}>
          <p style={{ color: 'var(--r-gold)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Application Received
          </p>
          <h1 style={{ fontFamily: 'var(--r-font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2, marginBottom: '1.5rem', color: '#fff' }}>
            Thank You, {form.first_name}
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
            We have received your mentor application and will review it carefully. You will hear from us within two weeks.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/residency" className="r-btn r-btn-gold" style={{ padding: '0.75rem 2rem' }}>Back to Residency</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section style={{ background: 'var(--r-navy)', color: '#fff', padding: '5rem 0 4rem', textAlign: 'center' }}>
        <div className="r-container" style={{ maxWidth: '600px' }}>
          <p style={{ color: 'var(--r-gold)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Montessori Makers Residency
          </p>
          <h1 style={{ fontFamily: 'var(--r-font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2, marginBottom: '1.5rem', color: '#fff' }}>
            Mentor Application
          </h1>
        </div>
      </section>

      <section className="r-section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="r-container" style={{ maxWidth: '680px' }}>
          <form onSubmit={handleSubmit}>
            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Personal Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="r-label">First Name *</label>
                  <input className="r-input" required value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
                </div>
                <div>
                  <label className="r-label">Last Name *</label>
                  <input className="r-input" required value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">Email *</label>
                <input className="r-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">Phone</label>
                <input className="r-input" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="r-label">School / Organization</label>
                  <input className="r-input" value={form.school_name} onChange={e => setForm({ ...form, school_name: e.target.value })} />
                </div>
                <div>
                  <label className="r-label">Current Role</label>
                  <input className="r-input" value={form.role_at_school} onChange={e => setForm({ ...form, role_at_school: e.target.value })} placeholder="e.g., Lead Guide" />
                </div>
              </div>
            </div>

            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Qualifications</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label className="r-label">Montessori Credential *</label>
                  <select className="r-input" required value={form.credential_type} onChange={e => setForm({ ...form, credential_type: e.target.value })}>
                    <option value="">Select</option>
                    {credentialOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="r-label">Years of Montessori Experience</label>
                  <input className="r-input" type="number" min="0" value={form.years_experience} onChange={e => setForm({ ...form, years_experience: e.target.value })} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">School Types Worked In</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {schoolTypeOptions.map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                      <input type="checkbox" checked={form.school_types.includes(opt)}
                        onChange={() => toggleArray('school_types', opt)}
                        style={{ accentColor: 'var(--r-navy)' }} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="r-label">Availability *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {availabilityOptions.map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                      <input type="checkbox" checked={form.availability.includes(opt)}
                        onChange={() => toggleArray('availability', opt)}
                        style={{ accentColor: 'var(--r-navy)' }} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Short Responses</h2>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">What draws you to mentoring a developing Montessori educator? *</label>
                <textarea className="r-textarea" rows={5} required
                  value={form.mentoring_interest} onChange={e => setForm({ ...form, mentoring_interest: e.target.value })}
                  placeholder="200 words maximum" />
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                  {form.mentoring_interest.split(/\s+/).filter(Boolean).length}/200 words
                </p>
              </div>
              <div>
                <label className="r-label">How does your practice reflect equity and anti-bias values? *</label>
                <textarea className="r-textarea" rows={5} required
                  value={form.equity_statement} onChange={e => setForm({ ...form, equity_statement: e.target.value })}
                  placeholder="200 words maximum" />
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                  {form.equity_statement.split(/\s+/).filter(Boolean).length}/200 words
                </p>
              </div>
            </div>

            <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', lineHeight: 1.6, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.role_description_confirmed}
                  onChange={e => setForm({ ...form, role_description_confirmed: e.target.checked })}
                  style={{ marginTop: '0.2rem', accentColor: 'var(--r-navy)', width: '18px', height: '18px' }} />
                I have read the <Link href="/residency/mentors" style={{ color: 'var(--r-navy)', fontWeight: 600 }}>mentor role description</Link> and understand the responsibilities and time commitment involved. *
              </label>
            </div>

            {error && (
              <div style={{ color: 'var(--r-error)', fontSize: '0.875rem', padding: '0.75rem 1rem', background: '#fef2f2', borderRadius: '8px', marginBottom: '1.5rem' }}>
                {error}
              </div>
            )}

            <button type="submit" className="r-btn r-btn-primary" disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem' }}>
              {submitting ? 'Submitting...' : 'Submit Mentor Application'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

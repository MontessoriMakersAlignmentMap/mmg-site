'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

const SCHOOL_TYPES = [
  { value: 'private_independent', label: 'Private Independent Montessori' },
  { value: 'public_district', label: 'Public District Montessori' },
  { value: 'charter', label: 'Charter Montessori' },
  { value: 'bilingual_dual_language', label: 'Bilingual or Dual Language Montessori' },
  { value: 'other', label: 'Other' },
]

const SCHOOL_TYPE_LABELS: Record<string, string> = Object.fromEntries(SCHOOL_TYPES.map(t => [t.value, t.label]))

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: 'var(--r-cream)', color: 'var(--r-text-muted)', label: 'Pending' },
  approved: { bg: 'var(--r-success-light)', color: 'var(--r-success)', label: 'Approved' },
  declined: { bg: '#fde8e8', color: 'var(--r-error)', label: 'Declined' },
}

export default function SiteApprovalsPage() {
  const { profile } = useResidencyAuth(['resident'])
  const [sites, setSites] = useState<any[]>([])
  const [residentId, setResidentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [schoolName, setSchoolName] = useState('')
  const [address, setAddress] = useState('')
  const [schoolType, setSchoolType] = useState('')
  const [contactName, setContactName] = useState('')
  const [plannedMonth, setPlannedMonth] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', profile!.id)
        .single()

      if (!resident) { setLoading(false); return }
      setResidentId(resident.id)

      const { data } = await supabase
        .from('residency_observation_site_approvals')
        .select('*')
        .eq('resident_id', resident.id)
        .order('submitted_at', { ascending: false })

      if (data) setSites(data)
      setLoading(false)
    }
    load()
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!residentId) return
    setSaving(true)

    const { error } = await supabase
      .from('residency_observation_site_approvals')
      .insert({
        resident_id: residentId,
        school_name: schoolName,
        address: address || null,
        school_type: schoolType || null,
        contact_name: contactName || null,
        planned_month: plannedMonth ? parseInt(plannedMonth) : null,
      })

    if (!error) {
      const { data } = await supabase
        .from('residency_observation_site_approvals')
        .select('*')
        .eq('resident_id', residentId)
        .order('submitted_at', { ascending: false })
      if (data) setSites(data)
      setShowForm(false)
      setSchoolName('')
      setAddress('')
      setSchoolType('')
      setContactName('')
      setPlannedMonth('')
    }
    setSaving(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/residency/portal/observations" style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none' }}>
          &larr; Back to Observation Log
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Observation Sites</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Submit sites for approval before scheduling your observation visits.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'Submit a Site'}
        </button>
      </div>

      {/* Submit form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>New Site Submission</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">School Name</label>
            <input type="text" className="r-input" value={schoolName}
              onChange={e => setSchoolName(e.target.value)} required
              placeholder="Name of the Montessori school" />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Address</label>
            <input type="text" className="r-input" value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Full school address" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">School Type</label>
              <select className="r-input" value={schoolType} onChange={e => setSchoolType(e.target.value)}>
                <option value="">Select type...</option>
                {SCHOOL_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Contact Name</label>
              <input type="text" className="r-input" value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="Guide or administrator name" />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Planned Month</label>
            <select className="r-input" value={plannedMonth} onChange={e => setPlannedMonth(e.target.value)}>
              <option value="">Select month...</option>
              {monthNames.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Submitting...' : 'Submit for Approval'}
          </button>
        </form>
      )}

      {/* Existing sites */}
      {sites.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>No sites submitted yet.</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            Submit a Montessori school for approval to use as your observation site.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sites.map(site => {
            const status = STATUS_STYLES[site.status] || STATUS_STYLES.pending
            return (
              <div key={site.id} className="r-card" style={{
                borderLeft: `4px solid ${status.color}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{site.school_name}</h3>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.5rem',
                    background: status.bg, color: status.color, borderRadius: '9999px',
                  }}>
                    {status.label}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                  {site.address && <span>{site.address}</span>}
                  {site.school_type && <span>{SCHOOL_TYPE_LABELS[site.school_type] || site.school_type}</span>}
                  {site.contact_name && <span>Contact: {site.contact_name}</span>}
                  {site.planned_month && <span>Planned: {monthNames[site.planned_month - 1]}</span>}
                </div>
                {site.admin_note && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: 'var(--r-cream)', borderRadius: '6px', lineHeight: 1.5 }}>
                    <strong style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Note:</strong>{' '}
                    {site.admin_note}
                  </p>
                )}
                <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
                  Submitted {new Date(site.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

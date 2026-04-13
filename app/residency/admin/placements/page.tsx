'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const SITE_STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)' },
  approved: { bg: 'var(--r-info-light)', color: 'var(--r-info)' },
  active: { bg: 'var(--r-success-light)', color: 'var(--r-success)' },
  inactive: { bg: 'var(--r-muted-light)', color: 'var(--r-muted)' },
  suspended: { bg: '#fce4ec', color: '#c62828' },
}

export default function PlacementsPage() {
  const [sites, setSites] = useState<any[]>([])
  const [placements, setPlacements] = useState<any[]>([])
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSiteForm, setShowSiteForm] = useState(false)
  const [showPlacementForm, setShowPlacementForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Site form
  const [siteName, setSiteName] = useState('')
  const [siteCity, setSiteCity] = useState('')
  const [siteState, setSiteState] = useState('')
  const [siteType, setSiteType] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  // Placement form
  const [placementResident, setPlacementResident] = useState('')
  const [placementSite, setPlacementSite] = useState('')
  const [placementStart, setPlacementStart] = useState('')
  const [supervisingTeacher, setSupervisingTeacher] = useState('')

  async function loadData() {
    const [{ data: s }, { data: p }, { data: r }] = await Promise.all([
      supabase.from('residency_placement_sites').select('*').order('name'),
      supabase.from('residency_placements')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name)), site:residency_placement_sites(name, city, state)')
        .order('start_date', { ascending: false }),
      supabase.from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name)')
        .in('status', ['active', 'enrolled'])
        .order('created_at'),
    ])
    if (s) setSites(s)
    if (p) setPlacements(p)
    if (r) setResidents(r)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function createSite(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('residency_placement_sites').insert({
      name: siteName,
      city: siteCity || null,
      state: siteState || null,
      site_type: siteType || null,
      contact_name: contactName || null,
      contact_email: contactEmail || null,
      status: 'pending',
    })
    setShowSiteForm(false)
    setSiteName(''); setSiteCity(''); setSiteState(''); setSiteType(''); setContactName(''); setContactEmail('')
    setSaving(false)
    setLoading(true); loadData()
  }

  async function createPlacement(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('residency_placements').insert({
      resident_id: placementResident,
      site_id: placementSite,
      start_date: placementStart,
      supervising_teacher: supervisingTeacher || null,
      status: 'active',
    })
    setShowPlacementForm(false)
    setPlacementResident(''); setPlacementSite(''); setPlacementStart(''); setSupervisingTeacher('')
    setSaving(false)
    setLoading(true); loadData()
  }

  async function approveSite(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('residency_placement_sites').update({
      status: 'approved',
      approved_at: new Date().toISOString(),
      approved_by: user.id,
    }).eq('id', id)
    setSites(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s))
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Placement Sites</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Manage practicum placement sites and candidate assignments.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => { setShowSiteForm(!showSiteForm); setShowPlacementForm(false) }}
            className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
            {showSiteForm ? 'Cancel' : 'Add Site'}
          </button>
          <button onClick={() => { setShowPlacementForm(!showPlacementForm); setShowSiteForm(false) }}
            style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--r-border)', background: 'transparent', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
            {showPlacementForm ? 'Cancel' : 'Assign Placement'}
          </button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Sites', value: sites.length },
          { label: 'Active Sites', value: sites.filter(s => s.status === 'active' || s.status === 'approved').length },
          { label: 'Active Placements', value: placements.filter(p => p.status === 'active').length },
          { label: 'Pending Approval', value: sites.filter(s => s.status === 'pending').length },
        ].map(s => (
          <div key={s.label} className="r-card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>{s.value}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add site form */}
      {showSiteForm && (
        <form onSubmit={createSite} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>New Placement Site</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">School/Site Name</label>
              <input className="r-input" value={siteName} onChange={e => setSiteName(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">City</label>
              <input className="r-input" value={siteCity} onChange={e => setSiteCity(e.target.value)} />
            </div>
            <div>
              <label className="r-label">State</label>
              <input className="r-input" value={siteState} onChange={e => setSiteState(e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Site Type</label>
              <select className="r-input" value={siteType} onChange={e => setSiteType(e.target.value)}>
                <option value="">Select...</option>
                <option value="montessori_school">Montessori School</option>
                <option value="public_montessori">Public Montessori</option>
                <option value="charter">Charter School</option>
                <option value="community_program">Community Program</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="r-label">Contact Name</label>
              <input className="r-input" value={contactName} onChange={e => setContactName(e.target.value)} />
            </div>
            <div>
              <label className="r-label">Contact Email</label>
              <input type="email" className="r-input" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Saving...' : 'Add Site'}
          </button>
        </form>
      )}

      {/* Assign placement form */}
      {showPlacementForm && (
        <form onSubmit={createPlacement} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Assign Placement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={placementResident} onChange={e => setPlacementResident(e.target.value)} required>
                <option value="">Select...</option>
                {residents.map(r => (
                  <option key={r.id} value={r.id}>{r.profile?.first_name} {r.profile?.last_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Site</label>
              <select className="r-input" value={placementSite} onChange={e => setPlacementSite(e.target.value)} required>
                <option value="">Select...</option>
                {sites.filter(s => s.status !== 'suspended').map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Start Date</label>
              <input type="date" className="r-input" value={placementStart} onChange={e => setPlacementStart(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">Supervising Teacher</label>
              <input className="r-input" value={supervisingTeacher} onChange={e => setSupervisingTeacher(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Assigning...' : 'Assign Placement'}
          </button>
        </form>
      )}

      {/* Sites list */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>All Sites</h2>
        {sites.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No placement sites added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {sites.map(s => {
              const st = SITE_STATUS_STYLES[s.status] ?? SITE_STATUS_STYLES.pending
              const sitePlacements = placements.filter(p => p.site_id === s.id && p.status === 'active')
              return (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0.875rem', background: 'var(--r-cream)', borderRadius: '6px' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{s.name}</p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                      {[s.city, s.state].filter(Boolean).join(', ')}
                      {s.site_type && ` — ${s.site_type.replace(/_/g, ' ')}`}
                      {sitePlacements.length > 0 && ` — ${sitePlacements.length} active placement${sitePlacements.length > 1 ? 's' : ''}`}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.625rem', fontWeight: 600, background: st.bg, color: st.color, textTransform: 'capitalize' }}>
                      {s.status}
                    </span>
                    {s.status === 'pending' && (
                      <button onClick={() => approveSite(s.id)} style={{
                        padding: '0.25rem 0.625rem', borderRadius: '6px', border: '1px solid var(--r-border)',
                        background: 'transparent', fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer', color: 'var(--r-success)',
                      }}>Approve</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Active placements */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Candidate Placements</h2>
        {placements.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No placements assigned yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {placements.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0.875rem', background: 'var(--r-cream)', borderRadius: '6px' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    {p.resident?.profile?.first_name} {p.resident?.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                    {p.site?.name}{p.site?.city ? `, ${p.site.city}` : ''}
                    {p.supervising_teacher && ` — Supervisor: ${p.supervising_teacher}`}
                  </p>
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                  Since {new Date(p.start_date + 'T12:00:00').toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

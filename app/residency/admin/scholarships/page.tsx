'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

const statusColors: Record<string, { color: string; bg: string }> = {
  pending: { color: '#b45309', bg: 'var(--r-warning-light)' },
  full_award: { color: '#2d6a4f', bg: 'var(--r-success-light)' },
  partial_award: { color: '#0E1A7A', bg: '#e8e9f5' },
  declined: { color: '#991b1b', bg: 'var(--r-error-light)' },
}

export default function AdminScholarshipsPage() {
  const [scholarships, setScholarships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [form, setForm] = useState({ award_status: 'pending', award_amount: '', funding_source: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [budget, setBudget] = useState('')
  const [tab, setTab] = useState<'review' | 'reporting'>('review')

  useEffect(() => { load() }, [])

  async function load() {
    // Load scholarships with related data
    const { data } = await supabase
      .from('residency_scholarships')
      .select('*, application:residency_applications(first_name, last_name, email, track_interest, why_montessori, equity_statement), resident:residency_residents(cohort:residency_cohorts(name))')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
    setScholarships(data || [])

    // Also check for equity fellows applications that don't have scholarship records yet
    const existingAppIds = (data || []).map((s: any) => s.application_id).filter(Boolean)
    const { data: unflaggedApps } = await supabase
      .from('residency_applications')
      .select('*')
      .eq('equity_fellows', true)
      .is('deleted_at', null)

    // Create scholarship records for equity fellows apps that don't have one
    const newApps = (unflaggedApps || []).filter(a => !existingAppIds.includes(a.id))
    for (const app of newApps) {
      await supabase.from('residency_scholarships').insert({
        application_id: app.id,
        award_status: 'pending',
      })
    }

    if (newApps.length > 0) {
      // Reload with new records
      const { data: refreshed } = await supabase
        .from('residency_scholarships')
        .select('*, application:residency_applications(first_name, last_name, email, track_interest, why_montessori, equity_statement), resident:residency_residents(cohort:residency_cohorts(name))')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
      setScholarships(refreshed || [])
    }

    setLoading(false)
  }

  async function selectScholarship(s: any) {
    setSelected(s)
    setForm({
      award_status: s.award_status,
      award_amount: s.award_amount ? String(s.award_amount) : '',
      funding_source: s.funding_source || '',
      notes: s.notes || '',
    })
    // Load full application if available
    if (s.application_id) {
      const { data } = await supabase.from('residency_applications').select('*').eq('id', s.application_id).single()
      setApplication(data)
    }
  }

  async function saveDecision() {
    if (!selected) return
    setSaving(true)
    const isAwarding = form.award_status === 'full_award' || form.award_status === 'partial_award'

    await supabase.from('residency_scholarships').update({
      award_status: form.award_status,
      award_amount: form.award_amount ? parseFloat(form.award_amount) : null,
      funding_source: form.funding_source || null,
      notes: form.notes || null,
      awarded_at: isAwarding ? new Date().toISOString() : null,
    }).eq('id', selected.id)

    // If awarded and resident exists, update resident record
    if (isAwarding && selected.resident_id) {
      await supabase.from('residency_residents').update({
        equity_fellow: true,
        scholarship_amount: form.award_amount ? parseFloat(form.award_amount) : null,
        scholarship_funding_source: form.funding_source || null,
      }).eq('id', selected.resident_id)
    }

    setSelected(null)
    setSaving(false)
    await load()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const pending = scholarships.filter(s => s.award_status === 'pending')
  const awarded = scholarships.filter(s => s.award_status === 'full_award' || s.award_status === 'partial_award')
  const declined = scholarships.filter(s => s.award_status === 'declined')
  const totalAwarded = awarded.reduce((sum, s) => sum + (Number(s.award_amount) || 0), 0)
  const budgetNum = budget ? parseFloat(budget) : 0

  // Group by funding source
  const fundingBreakdown: Record<string, number> = {}
  for (const s of awarded) {
    const source = s.funding_source || 'Unspecified'
    fundingBreakdown[source] = (fundingBreakdown[source] || 0) + (Number(s.award_amount) || 0)
  }

  if (selected) {
    const app = selected.application || application
    return (
      <div>
        <button onClick={() => setSelected(null)}
          style={{ background: 'none', border: 'none', color: 'var(--r-navy)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem', padding: 0 }}>
          &larr; Back to Scholarships
        </button>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
          {app?.first_name} {app?.last_name}
        </h1>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {app?.track_interest === 'primary' ? 'Primary' : 'Elementary'} Track &middot; Equity Fellows Applicant
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          <div>
            {app?.why_montessori && (
              <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Why Montessori</h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{app.why_montessori}</p>
              </div>
            )}

            {app?.equity_statement && (
              <div className="r-card" style={{ padding: '1.5rem', borderLeft: '3px solid #6b21a8' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Equity Statement</h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{app.equity_statement}</p>
              </div>
            )}
          </div>

          <div className="r-card" style={{ padding: '1.5rem', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Scholarship Decision</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Award Status</label>
              <select className="r-input" value={form.award_status}
                onChange={e => setForm({ ...form, award_status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="full_award">Full Award</option>
                <option value="partial_award">Partial Award</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            {(form.award_status === 'full_award' || form.award_status === 'partial_award') && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="r-label">Award Amount ($)</label>
                  <input className="r-input" type="number" step="0.01" min="0"
                    value={form.award_amount} onChange={e => setForm({ ...form, award_amount: e.target.value })}
                    placeholder="0.00" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="r-label">Funding Source</label>
                  <input className="r-input" value={form.funding_source}
                    onChange={e => setForm({ ...form, funding_source: e.target.value })}
                    placeholder="e.g., Ford Foundation Grant 2026" />
                </div>
              </>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Internal Notes</label>
              <textarea className="r-textarea" rows={3} value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="Notes for grant reporting..." />
            </div>

            <button className="r-btn r-btn-primary" onClick={saveDecision} disabled={saving}
              style={{ width: '100%', justifyContent: 'center' }}>
              {saving ? 'Saving...' : 'Save Decision'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Scholarships</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Equity Fellows scholarship management
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)' }}>
        {[
          { key: 'review' as const, label: 'Review' },
          { key: 'reporting' as const, label: 'Reporting' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              background: 'none', border: 'none',
              borderBottom: tab === t.key ? '2px solid var(--r-navy)' : '2px solid transparent',
              padding: '0.5rem 1rem', fontSize: '0.8125rem',
              fontWeight: tab === t.key ? 600 : 400,
              color: tab === t.key ? 'var(--r-navy)' : 'var(--r-text-muted)',
              cursor: 'pointer',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'review' && (
        <div>
          {pending.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Pending Review ({pending.length})
              </h2>
              {pending.map(s => (
                <div key={s.id} className="r-card" onClick={() => selectScholarship(s)}
                  style={{ padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                      {(s.application as any)?.first_name} {(s.application as any)?.last_name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                      {(s.application as any)?.track_interest === 'primary' ? 'Primary' : 'Elementary'}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase',
                    padding: '0.25rem 0.5rem', borderRadius: '4px',
                    ...statusColors.pending,
                  }}>Pending</span>
                </div>
              ))}
            </div>
          )}

          {awarded.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Awarded ({awarded.length})
              </h2>
              {awarded.map(s => (
                <div key={s.id} className="r-card" onClick={() => selectScholarship(s)}
                  style={{ padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                      {(s.application as any)?.first_name} {(s.application as any)?.last_name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                      ${Number(s.award_amount || 0).toLocaleString()} &middot; {s.funding_source || 'No source'}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase',
                    padding: '0.25rem 0.5rem', borderRadius: '4px',
                    ...statusColors[s.award_status],
                  }}>
                    {s.award_status === 'full_award' ? 'Full' : 'Partial'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {declined.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Declined ({declined.length})
              </h2>
              {declined.map(s => (
                <div key={s.id} className="r-card" onClick={() => selectScholarship(s)}
                  style={{ padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer', opacity: 0.7 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {(s.application as any)?.first_name} {(s.application as any)?.last_name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {scholarships.length === 0 && (
            <EmptyState title="No scholarship applications" message="When applicants check the Equity Fellows box, they appear here for scholarship review." />
          )}
        </div>
      )}

      {tab === 'reporting' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{awarded.length}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Total Awarded</p>
            </div>
            <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>${totalAwarded.toLocaleString()}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Dollars Committed</p>
            </div>
            <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{pending.length}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Pending Review</p>
            </div>
            <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: budgetNum > 0 && totalAwarded > budgetNum ? '#991b1b' : 'var(--r-navy)' }}>
                {budgetNum > 0 ? `$${(budgetNum - totalAwarded).toLocaleString()}` : '—'}
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Remaining Budget</p>
            </div>
          </div>

          <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Scholarship Budget</h2>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label className="r-label">Total Budget ($)</label>
                <input className="r-input" type="number" step="0.01" value={budget}
                  onChange={e => setBudget(e.target.value)} placeholder="Enter total scholarship budget" />
              </div>
            </div>
          </div>

          {Object.keys(fundingBreakdown).length > 0 && (
            <div className="r-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Funding Source Breakdown</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Object.entries(fundingBreakdown).map(([source, amount]) => (
                  <div key={source} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--r-border)' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{source}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-navy)' }}>${amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

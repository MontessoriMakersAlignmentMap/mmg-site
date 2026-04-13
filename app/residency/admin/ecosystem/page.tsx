'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function EcosystemConnectionsPage() {
  const [tab, setTab] = useState<'matchhub' | 'mmap'>('matchhub')
  const [referrals, setReferrals] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [graduates, setGraduates] = useState<any[]>([])
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const [refRes, leadRes, gradRes, schoolRes] = await Promise.all([
      supabase.from('residency_matchhub_referrals').select('*, graduate:residency_graduates(id, track, certificate_number, profile:residency_profiles(first_name, last_name))').is('deleted_at', null),
      supabase.from('residency_mmap_leads').select('*, school:residency_schools(id, name, city, state)').is('deleted_at', null),
      supabase.from('residency_graduates').select('id, track, certificate_number, profile:residency_profiles(first_name, last_name)').is('deleted_at', null),
      supabase.from('residency_schools').select('id, name, city, state').eq('partnership_status', 'active').is('deleted_at', null),
    ])
    setReferrals(refRes.data || [])
    setLeads(leadRes.data || [])
    setGraduates(gradRes.data || [])
    setSchools(schoolRes.data || [])
    setLoading(false)
  }

  async function createReferral(graduateId: string) {
    setSaving(true)
    await supabase.from('residency_matchhub_referrals').insert({
      graduate_id: graduateId,
      status: 'pending',
    })
    setSaving(false)
    await load()
  }

  async function updateReferralStatus(id: string, status: string) {
    await supabase.from('residency_matchhub_referrals').update({ status }).eq('id', id)
    await load()
  }

  async function createLead(schoolId: string) {
    setSaving(true)
    await supabase.from('residency_mmap_leads').insert({
      school_id: schoolId,
      lead_status: 'new',
    })
    setSaving(false)
    await load()
  }

  async function updateLeadStatus(id: string, status: string, notes?: string) {
    const update: any = { lead_status: status }
    if (notes !== undefined) update.notes = notes
    await supabase.from('residency_mmap_leads').update(update).eq('id', id)
    await load()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const referredGradIds = new Set(referrals.map(r => r.graduate_id))
  const unreferredGrads = graduates.filter(g => !referredGradIds.has(g.id))
  const leadSchoolIds = new Set(leads.map(l => l.school_id))
  const unleadSchools = schools.filter(s => !leadSchoolIds.has(s.id))

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Ecosystem Connections</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Connect graduates to MatchHub and partner schools to MMAP.
      </p>

      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)' }}>
        {(['matchhub', 'mmap'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              background: 'none', border: 'none',
              borderBottom: tab === t ? '2px solid var(--r-navy)' : '2px solid transparent',
              padding: '0.5rem 1rem', fontSize: '0.8125rem',
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? 'var(--r-navy)' : 'var(--r-text-muted)',
              cursor: 'pointer',
            }}>
            {t === 'matchhub' ? `MatchHub Referrals (${referrals.length})` : `MMAP Leads (${leads.length})`}
          </button>
        ))}
      </div>

      {tab === 'matchhub' && (
        <div>
          {unreferredGrads.length > 0 && (
            <div className="r-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Graduates Not Yet Referred ({unreferredGrads.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {unreferredGrads.map(g => (
                  <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--r-border)' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {(g.profile as any)?.first_name} {(g.profile as any)?.last_name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginLeft: '0.5rem' }}>
                        {g.track} &middot; {g.certificate_number}
                      </span>
                    </div>
                    <button className="r-btn" onClick={() => createReferral(g.id)} disabled={saving}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                      Refer to MatchHub
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {referrals.length === 0 ? (
            <EmptyState title="No referrals yet" message="Refer graduates to MatchHub for job placement matching." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {referrals.map(r => (
                <div key={r.id} className="r-card" style={{ padding: '0.875rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {(r.graduate as any)?.profile?.first_name} {(r.graduate as any)?.profile?.last_name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {(r.graduate as any)?.track} &middot; {(r.graduate as any)?.certificate_number}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <select value={r.status} onChange={e => updateReferralStatus(r.id, e.target.value)}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--r-border)', borderRadius: '4px', background: 'white' }}>
                      <option value="pending">Pending</option>
                      <option value="referred">Referred</option>
                      <option value="matched">Matched</option>
                      <option value="placed">Placed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'mmap' && (
        <div>
          {unleadSchools.length > 0 && (
            <div className="r-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Partner Schools Not Yet Flagged ({unleadSchools.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {unleadSchools.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--r-border)' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{s.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginLeft: '0.5rem' }}>
                        {[s.city, s.state].filter(Boolean).join(', ')}
                      </span>
                    </div>
                    <button className="r-btn" onClick={() => createLead(s.id)} disabled={saving}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                      Flag as MMAP Lead
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {leads.length === 0 ? (
            <EmptyState title="No MMAP leads yet" message="Flag partner schools as leads for MMAP assessment adoption." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {leads.map(l => (
                <div key={l.id} className="r-card" style={{ padding: '0.875rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{(l.school as any)?.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {[(l.school as any)?.city, (l.school as any)?.state].filter(Boolean).join(', ')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <select value={l.lead_status} onChange={e => updateLeadStatus(l.id, e.target.value)}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--r-border)', borderRadius: '4px', background: 'white' }}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="demo_scheduled">Demo Scheduled</option>
                      <option value="converted">Converted</option>
                      <option value="not_interested">Not Interested</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const STANDING_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  good_standing: { bg: 'var(--r-success-light)', color: 'var(--r-success)', label: 'Good Standing' },
  academic_watch: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)', label: 'Academic Watch' },
  formal_remediation: { bg: '#fce4ec', color: '#c62828', label: 'Formal Remediation' },
}

export default function StandingManagementPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Change standing form
  const [selectedResident, setSelectedResident] = useState('')
  const [newStanding, setNewStanding] = useState<string>('')
  const [reason, setReason] = useState('')
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  async function loadData() {
    const { data: r } = await supabase
      .from('residency_residents')
      .select('*, profile:residency_profiles(first_name, last_name), assigned_level:residency_levels(name)')
      .in('status', ['active', 'enrolled'])
      .order('created_at')

    if (r) setResidents(r)

    const { data: h } = await supabase
      .from('residency_standing_history')
      .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name)), changed_by_profile:residency_profiles!residency_standing_history_changed_by_fkey(first_name, last_name)')
      .order('created_at', { ascending: false })
      .limit(50)

    if (h) setHistory(h)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function changeStanding(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }

    // Insert standing history
    await supabase.from('residency_standing_history').insert({
      resident_id: selectedResident,
      standing: newStanding,
      reason,
      changed_by: user.id,
      mentor_checkin_due_at: newStanding !== 'good_standing'
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : null,
    })

    // Update resident
    await supabase
      .from('residency_residents')
      .update({ current_standing: newStanding })
      .eq('id', selectedResident)

    // Notify resident
    const resident = residents.find(r => r.id === selectedResident)
    if (resident) {
      const standingLabel = STANDING_STYLES[newStanding]?.label ?? newStanding
      await supabase.from('residency_notifications').insert({
        recipient_id: resident.profile_id,
        type: 'standing_change',
        title: `Standing updated: ${standingLabel}`,
        message: reason,
        link: '/residency/portal/portfolio',
      })

      // If not good standing, also notify mentor
      if (newStanding !== 'good_standing' && resident.mentor_id) {
        await supabase.from('residency_notifications').insert({
          recipient_id: resident.mentor_id,
          type: 'standing_change',
          title: `${resident.profile?.first_name} ${resident.profile?.last_name} — ${standingLabel}`,
          message: `Check-in required within 7 days. Reason: ${reason}`,
          link: `/residency/mentor/residents/${selectedResident}`,
        })
      }
    }

    setShowForm(false)
    setSelectedResident('')
    setNewStanding('')
    setReason('')
    setSaving(false)
    setLoading(true)
    loadData()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const watchCount = residents.filter(r => r.current_standing === 'academic_watch').length
  const remediationCount = residents.filter(r => r.current_standing === 'formal_remediation').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Candidate Standing</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Monitor and update candidate standing. Changes notify residents and mentors.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'Change Standing'}
        </button>
      </div>

      {/* Alert counts */}
      {(watchCount > 0 || remediationCount > 0) && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {watchCount > 0 && (
            <div style={{ padding: '0.75rem 1.25rem', background: 'var(--r-feedback-bg)', borderRadius: '8px', border: '1px solid #ffe082' }}>
              <span style={{ fontWeight: 700, color: 'var(--r-feedback-color)', fontSize: '1.25rem' }}>{watchCount}</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--r-feedback-color)', marginLeft: '0.5rem' }}>on Academic Watch</span>
            </div>
          )}
          {remediationCount > 0 && (
            <div style={{ padding: '0.75rem 1.25rem', background: '#fce4ec', borderRadius: '8px', border: '1px solid #ef9a9a' }}>
              <span style={{ fontWeight: 700, color: '#c62828', fontSize: '1.25rem' }}>{remediationCount}</span>
              <span style={{ fontSize: '0.8125rem', color: '#c62828', marginLeft: '0.5rem' }}>in Formal Remediation</span>
            </div>
          )}
        </div>
      )}

      {/* Change standing form */}
      {showForm && (
        <form onSubmit={changeStanding} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Update Candidate Standing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={selectedResident} onChange={e => setSelectedResident(e.target.value)} required>
                <option value="">Select resident...</option>
                {residents.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.profile?.first_name} {r.profile?.last_name}
                    {' '}({STANDING_STYLES[r.current_standing]?.label ?? r.current_standing})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">New Standing</label>
              <select className="r-input" value={newStanding} onChange={e => setNewStanding(e.target.value)} required>
                <option value="">Select...</option>
                <option value="good_standing">Good Standing</option>
                <option value="academic_watch">Academic Watch</option>
                <option value="formal_remediation">Formal Remediation</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Reason</label>
            <textarea className="r-textarea" value={reason} onChange={e => setReason(e.target.value)}
              placeholder="Document the reason for this standing change..."
              style={{ minHeight: '100px' }}
              required />
          </div>
          {newStanding && newStanding !== 'good_standing' && (
            <p style={{ fontSize: '0.75rem', color: 'var(--r-feedback-color)', marginBottom: '1rem', padding: '0.5rem', background: 'var(--r-feedback-bg)', borderRadius: '6px' }}>
              A 7-day mentor check-in window will be created. The mentor will be notified.
            </p>
          )}
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Updating...' : 'Update Standing'}
          </button>
        </form>
      )}

      {/* Current standings */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>All Candidates</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {residents.map(r => {
            const s = STANDING_STYLES[r.current_standing] ?? STANDING_STYLES.good_standing
            return (
              <div key={r.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.625rem 0.875rem',
                background: 'var(--r-cream)',
                borderRadius: '6px',
              }}>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                    {r.assigned_level?.name} {r.cohort ? `— ${r.cohort}` : ''}
                  </p>
                </div>
                <span style={{
                  padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  background: s.bg,
                  color: s.color,
                }}>
                  {s.label}
                </span>
              </div>
            )
          })}
          {residents.length === 0 && (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No active residents.</p>
          )}
        </div>
      </div>

      {/* Standing history */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Standing Change History</h2>
        {history.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No standing changes recorded.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {history.map(h => {
              const s = STANDING_STYLES[h.standing] ?? STANDING_STYLES.good_standing
              return (
                <div key={h.id} style={{
                  padding: '0.625rem 0.875rem',
                  background: 'var(--r-cream)',
                  borderRadius: '6px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {h.resident?.profile?.first_name} {h.resident?.profile?.last_name}
                      </span>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        background: s.bg,
                        color: s.color,
                      }}>
                        {s.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                      {new Date(h.created_at).toLocaleDateString()}
                      {h.changed_by_profile && ` by ${h.changed_by_profile.first_name} ${h.changed_by_profile.last_name}`}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>{h.reason}</p>
                  {h.mentor_checkin_due_at && (
                    <p style={{ fontSize: '0.6875rem', color: h.mentor_checkin_at ? 'var(--r-success)' : 'var(--r-feedback-color)', marginTop: '0.25rem' }}>
                      {h.mentor_checkin_at
                        ? `Mentor checked in ${new Date(h.mentor_checkin_at).toLocaleDateString()}`
                        : `Mentor check-in due by ${new Date(h.mentor_checkin_due_at).toLocaleDateString()}`
                      }
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

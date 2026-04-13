'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  draft: { bg: 'var(--r-muted-light)', color: 'var(--r-muted)' },
  active: { bg: 'var(--r-info-light)', color: 'var(--r-info)' },
  completed: { bg: 'var(--r-success-light)', color: 'var(--r-success)' },
  extended: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)' },
  withdrawn: { bg: '#fce4ec', color: '#c62828' },
}

export default function SupportPlansPage() {
  const [plans, setPlans] = useState<any[]>([])
  const [residents, setResidents] = useState<any[]>([])
  const [checkins, setCheckins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)

  // Create form
  const [selectedResident, setSelectedResident] = useState('')
  const [reason, setReason] = useState('')
  const [goals, setGoals] = useState('')
  const [strategies, setStrategies] = useState('')
  const [timelineWeeks, setTimelineWeeks] = useState('4')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])

  // Check-in form
  const [checkinPlanId, setCheckinPlanId] = useState<string | null>(null)
  const [checkinNotes, setCheckinNotes] = useState('')
  const [checkinGoalsMet, setCheckinGoalsMet] = useState('')

  async function loadData() {
    const [{ data: p }, { data: r }, { data: c }] = await Promise.all([
      supabase.from('residency_support_plans')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name)), creator:residency_profiles!residency_support_plans_created_by_fkey(first_name, last_name)')
        .order('created_at', { ascending: false }),
      supabase.from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name)')
        .in('status', ['active', 'enrolled'])
        .order('created_at'),
      supabase.from('residency_support_checkins')
        .select('*, checker:residency_profiles!residency_support_checkins_checked_by_fkey(first_name, last_name)')
        .order('checkin_date', { ascending: false }),
    ])
    if (p) setPlans(p)
    if (r) setResidents(r)
    if (c) setCheckins(c)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function createPlan(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }

    const weeks = parseInt(timelineWeeks)
    const end = new Date(startDate)
    end.setDate(end.getDate() + weeks * 7)

    await supabase.from('residency_support_plans').insert({
      resident_id: selectedResident,
      created_by: user.id,
      reason,
      goals: goals.split('\n').filter(g => g.trim()),
      strategies: strategies.split('\n').filter(s => s.trim()),
      timeline_weeks: weeks,
      start_date: startDate,
      end_date: end.toISOString().split('T')[0],
      status: 'active',
    })

    // Notify resident
    const resident = residents.find(r => r.id === selectedResident)
    if (resident) {
      await supabase.from('residency_notifications').insert({
        recipient_id: resident.profile_id,
        type: 'support_plan',
        title: 'Support Plan Created',
        message: `A ${weeks}-week support plan has been created for you. Reason: ${reason}`,
        link: '/residency/portal/portfolio',
      })
    }

    setShowCreate(false)
    setSelectedResident('')
    setReason('')
    setGoals('')
    setStrategies('')
    setTimelineWeeks('4')
    setSaving(false)
    setLoading(true)
    loadData()
  }

  async function addCheckin(e: React.FormEvent) {
    e.preventDefault()
    if (!checkinPlanId) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }

    await supabase.from('residency_support_checkins').insert({
      plan_id: checkinPlanId,
      checkin_date: new Date().toISOString().split('T')[0],
      progress_notes: checkinNotes,
      goals_met: checkinGoalsMet.split('\n').filter(g => g.trim()),
      checked_by: user.id,
    })

    setCheckinPlanId(null)
    setCheckinNotes('')
    setCheckinGoalsMet('')
    setSaving(false)
    setLoading(true)
    loadData()
  }

  async function completePlan(planId: string, outcome: string) {
    await supabase.from('residency_support_plans').update({
      status: outcome === 'completed' ? 'completed' : 'extended',
      outcome,
      outcome_date: new Date().toISOString(),
    }).eq('id', planId)
    setLoading(true)
    loadData()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const activePlans = plans.filter(p => p.status === 'active' || p.status === 'extended')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Support Plans</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            MACTE-required intervention plans with 4-12 week timelines and monthly check-ins.
          </p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showCreate ? 'Cancel' : 'Create Plan'}
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="r-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{activePlans.length}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Active Plans</p>
        </div>
        <div className="r-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-success)' }}>{plans.filter(p => p.status === 'completed').length}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Completed</p>
        </div>
        <div className="r-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{checkins.length}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Total Check-ins</p>
        </div>
      </div>

      {/* Create form */}
      {showCreate && (
        <form onSubmit={createPlan} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>New Support Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={selectedResident} onChange={e => setSelectedResident(e.target.value)} required>
                <option value="">Select...</option>
                {residents.map(r => (
                  <option key={r.id} value={r.id}>{r.profile?.first_name} {r.profile?.last_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Start Date</label>
              <input type="date" className="r-input" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">Timeline (weeks)</label>
              <select className="r-input" value={timelineWeeks} onChange={e => setTimelineWeeks(e.target.value)}>
                {[4, 6, 8, 10, 12].map(w => <option key={w} value={w}>{w} weeks</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Reason for Support Plan</label>
            <textarea className="r-textarea" value={reason} onChange={e => setReason(e.target.value)} required
              placeholder="Document the specific concerns that initiated this plan..."
              style={{ minHeight: '80px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Goals (one per line)</label>
            <textarea className="r-textarea" value={goals} onChange={e => setGoals(e.target.value)} required
              placeholder="Achieve proficient rubric score on practice rubric&#10;Complete 3 additional observation records&#10;Attend all remaining seminars"
              style={{ minHeight: '80px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Strategies & Supports (one per line)</label>
            <textarea className="r-textarea" value={strategies} onChange={e => setStrategies(e.target.value)}
              placeholder="Weekly mentor meetings&#10;Peer observation sessions&#10;Additional workshop attendance"
              style={{ minHeight: '80px' }} />
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Creating...' : 'Create Support Plan'}
          </button>
        </form>
      )}

      {/* Check-in form */}
      {checkinPlanId && (
        <form onSubmit={addCheckin} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Add Check-In</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Progress Notes</label>
            <textarea className="r-textarea" value={checkinNotes} onChange={e => setCheckinNotes(e.target.value)} required
              placeholder="Document progress toward goals..." style={{ minHeight: '80px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Goals Met (one per line)</label>
            <textarea className="r-textarea" value={checkinGoalsMet} onChange={e => setCheckinGoalsMet(e.target.value)}
              placeholder="List any goals that have been met..." style={{ minHeight: '60px' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
              {saving ? 'Saving...' : 'Save Check-In'}
            </button>
            <button type="button" onClick={() => setCheckinPlanId(null)} style={{
              padding: '0.5rem 1rem', border: '1px solid var(--r-border)', borderRadius: '6px',
              background: 'transparent', fontSize: '0.8125rem', cursor: 'pointer',
            }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Plans list */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>All Support Plans</h2>
        {plans.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No support plans created yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {plans.map(p => {
              const st = STATUS_STYLES[p.status] ?? STATUS_STYLES.draft
              const planCheckins = checkins.filter(c => c.plan_id === p.id)
              const daysRemaining = Math.ceil((new Date(p.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              return (
                <div key={p.id} style={{
                  padding: '1rem',
                  background: 'var(--r-cream)',
                  borderRadius: '8px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {p.resident?.profile?.first_name} {p.resident?.profile?.last_name}
                      </span>
                      <span style={{
                        padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.625rem',
                        fontWeight: 600, background: st.bg, color: st.color, textTransform: 'capitalize',
                      }}>
                        {p.status}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                      {p.timeline_weeks} weeks — {daysRemaining > 0 ? `${daysRemaining} days left` : 'Ended'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>{p.reason}</p>
                  {p.goals && p.goals.length > 0 && (
                    <div style={{ marginBottom: '0.375rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 600, marginBottom: '0.125rem' }}>Goals:</p>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                        {p.goals.map((g: string, i: number) => <li key={i}>{g}</li>)}
                      </ul>
                    </div>
                  )}
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                    {planCheckins.length} check-in{planCheckins.length !== 1 ? 's' : ''} recorded
                    {p.creator && ` — Created by ${p.creator.first_name} ${p.creator.last_name}`}
                  </p>
                  {(p.status === 'active' || p.status === 'extended') && (
                    <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.5rem' }}>
                      <button onClick={() => setCheckinPlanId(p.id)} style={{
                        padding: '0.25rem 0.625rem', borderRadius: '6px', border: '1px solid var(--r-border)',
                        background: 'transparent', fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer', color: 'var(--r-navy)',
                      }}>Add Check-In</button>
                      <button onClick={() => completePlan(p.id, 'completed')} style={{
                        padding: '0.25rem 0.625rem', borderRadius: '6px', border: '1px solid var(--r-border)',
                        background: 'transparent', fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer', color: 'var(--r-success)',
                      }}>Complete</button>
                      <button onClick={() => completePlan(p.id, 'extended')} style={{
                        padding: '0.25rem 0.625rem', borderRadius: '6px', border: '1px solid var(--r-border)',
                        background: 'transparent', fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer', color: 'var(--r-feedback-color)',
                      }}>Extend</button>
                    </div>
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

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  upcoming: { bg: 'var(--r-info-light)', color: 'var(--r-info)' },
  active: { bg: 'var(--r-success-light)', color: 'var(--r-success)' },
  completed: { bg: 'var(--r-cream)', color: 'var(--r-text-muted)' },
}

export default function IntensivesAdminPage() {
  const [intensives, setIntensives] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Create form
  const [name, setName] = useState('')
  const [level, setLevel] = useState('primary')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [locationName, setLocationName] = useState('')
  const [locationAddress, setLocationAddress] = useState('')
  const [capacity, setCapacity] = useState('30')
  const [costDollars, setCostDollars] = useState('0')
  const [deadline, setDeadline] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from('residency_intensives')
      .select('*')
      .order('start_date', { ascending: false })

    if (data) {
      setIntensives(data)
      // Load registrations for each
      const regs: Record<string, any[]> = {}
      await Promise.all(data.map(async (i: any) => {
        const { data: r } = await supabase
          .from('residency_intensive_registrations')
          .select('*, resident:residency_residents(id, profile:residency_profiles(first_name, last_name, email))')
          .eq('intensive_id', i.id)
          .order('registered_at')
        regs[i.id] = r || []
      }))
      setRegistrations(regs)
    }
    setLoading(false)
  }

  async function createIntensive(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase.from('residency_intensives').insert({
      name,
      level,
      start_date: startDate,
      end_date: endDate,
      location_name: locationName,
      location_address: locationAddress || null,
      capacity: parseInt(capacity) || 30,
      cost_cents: Math.round(parseFloat(costDollars) * 100),
      registration_deadline: deadline,
      description: description || null,
    })

    if (!error) {
      setShowCreate(false)
      resetForm()
      await load()
    }
    setSaving(false)
  }

  function resetForm() {
    setName(''); setLevel('primary'); setStartDate(''); setEndDate('')
    setLocationName(''); setLocationAddress(''); setCapacity('30')
    setCostDollars('0'); setDeadline(''); setDescription('')
  }

  async function toggleAttendance(regId: string, attended: boolean) {
    await supabase
      .from('residency_intensive_registrations')
      .update({ attended })
      .eq('id', regId)

    setRegistrations(prev => {
      const updated = { ...prev }
      for (const key of Object.keys(updated)) {
        updated[key] = updated[key].map(r =>
          r.id === regId ? { ...r, attended } : r
        )
      }
      return updated
    })
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('residency_intensives').update({ status }).eq('id', id)
    setIntensives(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  function exportCSV(intensiveId: string) {
    const regs = registrations[intensiveId] || []
    const intensive = intensives.find(i => i.id === intensiveId)
    if (!intensive || regs.length === 0) return

    const headers = ['Name', 'Email', 'Registered', 'Attended']
    const rows = regs.map(r => [
      `${r.resident?.profile?.first_name || ''} ${r.resident?.profile?.last_name || ''}`,
      r.resident?.profile?.email || '',
      new Date(r.registered_at).toLocaleDateString(),
      r.attended ? 'Yes' : 'No',
    ])

    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${intensive.name.replace(/\s+/g, '-').toLowerCase()}-registrations.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Annual Intensives</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showCreate ? 'Cancel' : 'Create Intensive'}
        </button>
      </div>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Create and manage in-person intensive events for residents.
      </p>

      {/* Create form */}
      {showCreate && (
        <form onSubmit={createIntensive} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>New Intensive</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Intensive Name</label>
            <input type="text" className="r-input" value={name} onChange={e => setName(e.target.value)} required
              placeholder="e.g., Primary Spring Intensive 2027" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Credential Level</label>
              <select className="r-input" value={level} onChange={e => setLevel(e.target.value)}>
                <option value="primary">Primary</option>
                <option value="elementary">Elementary</option>
              </select>
            </div>
            <div>
              <label className="r-label">Start Date</label>
              <input type="date" className="r-input" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">End Date</label>
              <input type="date" className="r-input" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Location Name</label>
              <input type="text" className="r-input" value={locationName} onChange={e => setLocationName(e.target.value)} required
                placeholder="e.g., Lincoln Park Montessori" />
            </div>
            <div>
              <label className="r-label">Location Address</label>
              <input type="text" className="r-input" value={locationAddress} onChange={e => setLocationAddress(e.target.value)}
                placeholder="Full address" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Capacity</label>
              <input type="number" min="1" className="r-input" value={capacity} onChange={e => setCapacity(e.target.value)} />
            </div>
            <div>
              <label className="r-label">Cost per Resident ($)</label>
              <input type="number" min="0" step="0.01" className="r-input" value={costDollars} onChange={e => setCostDollars(e.target.value)} />
            </div>
            <div>
              <label className="r-label">Registration Deadline</label>
              <input type="date" className="r-input" value={deadline} onChange={e => setDeadline(e.target.value)} required />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Description / Logistics</label>
            <textarea className="r-textarea" value={description} onChange={e => setDescription(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="What should residents know about this intensive? Include lodging, schedule, what to bring..." />
          </div>

          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Creating...' : 'Create Intensive'}
          </button>
        </form>
      )}

      {/* Intensives list */}
      {intensives.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--r-text-muted)' }}>
          <p>No intensives created yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {intensives.map(i => {
            const regs = registrations[i.id] || []
            const expanded = expandedId === i.id
            const statusStyle = STATUS_STYLES[i.status] || STATUS_STYLES.upcoming

            return (
              <div key={i.id} className="r-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', margin: 0, marginBottom: '0.125rem' }}>{i.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', margin: 0 }}>
                      {new Date(i.start_date).toLocaleDateString()} – {new Date(i.end_date).toLocaleDateString()} &bull; {i.location_name}
                      {i.cost_cents > 0 && ` \u2022 $${(i.cost_cents / 100).toFixed(0)}`}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 600,
                      padding: '0.25rem 0.625rem', borderRadius: '9999px',
                      background: statusStyle.bg, color: statusStyle.color,
                    }}>
                      {i.status}
                    </span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)' }}>
                      {regs.length}/{i.capacity}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setExpandedId(expanded ? null : i.id)}
                    className="r-btn r-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                    {expanded ? 'Collapse' : `View Registrations (${regs.length})`}
                  </button>

                  <select
                    value={i.status}
                    onChange={e => updateStatus(i.id, e.target.value)}
                    style={{
                      fontSize: '0.75rem', padding: '0.375rem 0.5rem',
                      borderRadius: '6px', border: '1px solid var(--r-border)',
                      background: 'white', cursor: 'pointer',
                    }}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>

                  {regs.length > 0 && (
                    <button onClick={() => exportCSV(i.id)}
                      className="r-btn r-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                      Export CSV
                    </button>
                  )}
                </div>

                {expanded && (
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--r-border)', paddingTop: '1rem' }}>
                    {i.description && (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginBottom: '1rem', lineHeight: 1.5 }}>{i.description}</p>
                    )}

                    {regs.length === 0 ? (
                      <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>No registrations yet.</p>
                    ) : (
                      <table style={{ width: '100%', fontSize: '0.8125rem', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--r-border)' }}>
                            <th style={{ textAlign: 'left', padding: '0.5rem 0.375rem', fontWeight: 600, fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--r-text-muted)' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem 0.375rem', fontWeight: 600, fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--r-text-muted)' }}>Email</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem 0.375rem', fontWeight: 600, fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--r-text-muted)' }}>Registered</th>
                            <th style={{ textAlign: 'center', padding: '0.5rem 0.375rem', fontWeight: 600, fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--r-text-muted)' }}>Attended</th>
                          </tr>
                        </thead>
                        <tbody>
                          {regs.map((r: any) => (
                            <tr key={r.id} style={{ borderBottom: '1px solid var(--r-border)' }}>
                              <td style={{ padding: '0.5rem 0.375rem' }}>
                                {r.resident?.profile?.first_name} {r.resident?.profile?.last_name}
                              </td>
                              <td style={{ padding: '0.5rem 0.375rem', color: 'var(--r-text-muted)' }}>
                                {r.resident?.profile?.email}
                              </td>
                              <td style={{ padding: '0.5rem 0.375rem' }}>
                                {new Date(r.registered_at).toLocaleDateString()}
                              </td>
                              <td style={{ padding: '0.5rem 0.375rem', textAlign: 'center' }}>
                                <input type="checkbox" checked={r.attended || false}
                                  onChange={e => toggleAttendance(r.id, e.target.checked)}
                                  style={{ accentColor: 'var(--r-navy)', cursor: 'pointer' }} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

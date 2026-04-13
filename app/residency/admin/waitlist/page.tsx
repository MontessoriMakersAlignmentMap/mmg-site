'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

interface WaitlistEntry {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  track_interest: string | null
  applicant_role: string | null
  source: string | null
  created_at: string
  notified_at: string | null
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [sending, setSending] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from('residency_waitlist')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    setEntries(data || [])
    setLoading(false)
  }

  async function removeEntry(id: string) {
    if (!confirm('Remove this person from the waitlist?')) return
    await supabase.from('residency_waitlist').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    await load()
  }

  async function notifyAll() {
    if (!confirm(`Send enrollment notification to ${filtered.length} people on the waitlist?`)) return
    setSending(true)

    try {
      const res = await fetch('/api/residency/waitlist-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: filtered.map(e => e.id),
          track: filter === 'all' ? null : filter,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        alert(`Notifications sent to ${data.sent} people.`)
        await load()
      }
    } finally {
      setSending(false)
    }
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const filtered = filter === 'all'
    ? entries
    : entries.filter(e => e.track_interest === filter)

  const trackCounts = {
    all: entries.length,
    primary: entries.filter(e => e.track_interest === 'primary').length,
    elementary: entries.filter(e => e.track_interest === 'elementary').length,
    unspecified: entries.filter(e => !e.track_interest).length,
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Waitlist</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {entries.length} people on the waitlist
          </p>
        </div>
        {filtered.length > 0 && (
          <button className="r-btn r-btn-primary" onClick={notifyAll} disabled={sending}>
            {sending ? 'Sending...' : `Notify ${filtered.length} People`}
          </button>
        )}
      </div>

      {/* Filter by track */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)' }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'primary', label: 'Primary' },
          { key: 'elementary', label: 'Elementary' },
          { key: 'unspecified', label: 'Undecided' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setFilter(tab.key)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: filter === tab.key ? '2px solid var(--r-navy)' : '2px solid transparent',
              padding: '0.5rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: filter === tab.key ? 600 : 400,
              color: filter === tab.key ? 'var(--r-navy)' : 'var(--r-text-muted)',
              cursor: 'pointer',
            }}>
            {tab.label} ({trackCounts[tab.key as keyof typeof trackCounts]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No waitlist entries" message="People who sign up for the waitlist will appear here." />
      ) : (
        <div className="r-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--r-border)' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Track</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Role</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Signed Up</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Notified</th>
                <th style={{ padding: '0.75rem 1rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid var(--r-border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
                    {entry.first_name} {entry.last_name}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--r-text-muted)' }}>{entry.email}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {entry.track_interest ? (
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '4px',
                        background: 'var(--r-gold-light)',
                        color: 'var(--r-navy)',
                      }}>
                        {entry.track_interest}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--r-text-muted)' }}>{entry.applicant_role || '—'}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--r-text-muted)', fontSize: '0.8125rem' }}>
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {entry.notified_at ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-success)' }}>
                        {new Date(entry.notified_at).toLocaleDateString()}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Not yet</span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <button onClick={() => removeEntry(entry.id)}
                      style={{ fontSize: '0.6875rem', color: '#991b1b', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

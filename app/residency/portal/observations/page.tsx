'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

export default function ObservationsListPage() {
  const { profile } = useResidencyAuth(['resident'])
  const [logs, setLogs] = useState<any[]>([])
  const [totalRequired, setTotalRequired] = useState(9)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id, assigned_level:residency_levels(*)')
        .eq('profile_id', profile!.id)
        .single()

      if (!resident) { setLoading(false); return }

      const level = Array.isArray(resident.assigned_level) ? resident.assigned_level[0] : resident.assigned_level
      const track = level?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'

      const { data: settings } = await supabase
        .from('residency_observation_settings')
        .select('total_required_observations')
        .eq('track', track)
        .single()

      if (settings?.total_required_observations) setTotalRequired(settings.total_required_observations)

      const { data } = await supabase
        .from('residency_observation_logs')
        .select('*')
        .eq('resident_id', resident.id)
        .order('month_number')

      if (data) setLogs(data)
      setLoading(false)
    }
    load()
  }, [profile])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const completedCount = logs.length
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Observation Log</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Your monthly observation visits across the residency year.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/residency/portal/observations/sites" style={{
            fontSize: '0.8125rem', color: 'var(--r-navy)', textDecoration: 'none', fontWeight: 600,
          }}>
            Manage Sites
          </Link>
          <span style={{
            fontSize: '0.875rem', fontWeight: 700, color: 'var(--r-navy)',
            background: 'var(--r-cream)', padding: '0.375rem 0.875rem', borderRadius: '9999px',
          }}>
            {completedCount} of {totalRequired} complete
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Observation Progress</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            {Math.round((completedCount / totalRequired) * 100)}%
          </span>
        </div>
        <div style={{ height: '8px', background: 'var(--r-border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.min(100, (completedCount / totalRequired) * 100)}%`,
            background: completedCount >= totalRequired ? 'var(--r-success)' : 'var(--r-navy)',
            borderRadius: '4px',
            transition: 'width 0.3s',
          }} />
        </div>
      </div>

      {/* Month grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {Array.from({ length: totalRequired }, (_, i) => i + 1).map(month => {
          const log = logs.find(l => l.month_number === month)
          return (
            <div key={month} className="r-card" style={{
              borderLeft: log ? '4px solid var(--r-success)' : '4px solid var(--r-border)',
              opacity: log ? 1 : 0.75,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.125rem' }}>
                    Month {month}
                  </p>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                    {monthNames[month - 1] || `Month ${month}`}
                  </h3>
                </div>
                {log ? (
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.5rem',
                    background: 'var(--r-success-light)', color: 'var(--r-success)',
                    borderRadius: '9999px',
                  }}>
                    Complete
                  </span>
                ) : (
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.5rem',
                    background: 'var(--r-cream)', color: 'var(--r-text-muted)',
                    borderRadius: '9999px',
                  }}>
                    Pending
                  </span>
                )}
              </div>

              {log ? (
                <div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
                    <span>{new Date(log.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>{log.school_name}</span>
                    <span>{Number(log.hours)}h</span>
                  </div>
                  <Link href={`/residency/portal/observations/${log.id}`} style={{
                    fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)', textDecoration: 'none',
                  }}>
                    View Entry &rarr;
                  </Link>
                </div>
              ) : (
                <Link href={`/residency/portal/observations/new?month=${month}`} style={{
                  fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)', textDecoration: 'none',
                }}>
                  Log Observation &rarr;
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

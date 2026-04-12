'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function InstructorDashboard() {
  const [cohorts, setCohorts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('residency_cohorts')
        .select('*')
        .eq('instructor_id', user.id)
        .is('deleted_at', null)
        .order('start_date', { ascending: false })

      if (!data || data.length === 0) {
        setCohorts([])
        setLoading(false)
        return
      }

      // For each cohort, load stats
      const enriched = await Promise.all(data.map(async (cohort: any) => {
        const startDate = new Date(cohort.start_date)
        const now = new Date()
        const weekNum = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)))

        // Get resident count
        const { count: residentCount } = await supabase
          .from('residency_residents')
          .select('id', { count: 'exact', head: true })
          .eq('cohort_id', cohort.id)
          .in('status', ['enrolled', 'active'])

        // Get current bundle
        const { data: currentBundle } = await supabase
          .from('residency_bundles')
          .select('weekly_theme, week_number')
          .eq('cohort_id', cohort.id)
          .eq('week_number', weekNum)
          .maybeSingle()

        // Bundle completion stats
        const { data: engagements } = await supabase
          .from('residency_bundle_engagements')
          .select('completion_status')
          .eq('bundle_id', (await supabase.from('residency_bundles').select('id').eq('cohort_id', cohort.id).lte('week_number', weekNum)).data?.map((b: any) => b.id)?.[0] || '')

        // Entries pending AI review
        const { count: pendingAI } = await supabase
          .from('residency_album_entries')
          .select('id', { count: 'exact', head: true })
          .in('resident_id', (await supabase.from('residency_residents').select('id').eq('cohort_id', cohort.id)).data?.map((r: any) => r.id) || [])
          .eq('status', 'ai_review')

        // Entries pending mentor review
        const { count: pendingMentor } = await supabase
          .from('residency_album_entries')
          .select('id', { count: 'exact', head: true })
          .in('resident_id', (await supabase.from('residency_residents').select('id').eq('cohort_id', cohort.id)).data?.map((r: any) => r.id) || [])
          .eq('status', 'ai_passed')

        // Next live session
        const { data: nextSession } = await supabase
          .from('residency_live_sessions')
          .select('scheduled_date')
          .eq('cohort_id', cohort.id)
          .eq('status', 'scheduled')
          .gte('scheduled_date', now.toISOString().split('T')[0])
          .order('scheduled_date')
          .limit(1)
          .maybeSingle()

        const daysUntilSession = nextSession
          ? Math.ceil((new Date(nextSession.scheduled_date).getTime() - now.getTime()) / (86400000))
          : null

        return {
          ...cohort,
          weekNum,
          residentCount: residentCount || 0,
          currentTheme: currentBundle?.weekly_theme || 'N/A',
          pendingAI: pendingAI || 0,
          pendingMentor: pendingMentor || 0,
          daysUntilSession,
        }
      }))

      setCohorts(enriched)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Instructor Dashboard</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Your cohort command center.
      </p>

      {cohorts.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--r-text-muted)' }}>
          <p>No cohorts assigned yet. The program director will assign you to a cohort.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {cohorts.map((c: any) => (
            <Link key={c.id} href={`/residency/instructor/cohorts/${c.id}`}
              className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{c.name}</h2>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', textTransform: 'capitalize' }}>
                    {c.track} Track &middot; Week {c.weekNum}
                  </p>
                </div>
                {c.daysUntilSession !== null && (
                  <div style={{
                    padding: '0.375rem 0.75rem', borderRadius: '6px', fontSize: '0.6875rem', fontWeight: 600,
                    background: c.daysUntilSession <= 3 ? '#fff8e1' : 'var(--r-bg-muted)',
                    color: c.daysUntilSession <= 3 ? '#f57f17' : 'var(--r-text-muted)',
                  }}>
                    {c.daysUntilSession === 0 ? 'Session TODAY' :
                     c.daysUntilSession === 1 ? 'Session tomorrow' :
                     `Session in ${c.daysUntilSession} days`}
                  </div>
                )}
              </div>

              <div style={{
                padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem',
                background: 'linear-gradient(135deg, #0E1A7A 0%, #1a2980 100%)', color: 'white',
              }}>
                <p style={{ fontSize: '0.6875rem', opacity: 0.7, marginBottom: '0.25rem' }}>Current Bundle Theme</p>
                <p style={{ fontSize: '1.0625rem', fontWeight: 600 }}>{c.currentTheme}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                <StatBox label="Residents" value={c.residentCount} />
                <StatBox label="Pending AI Review" value={c.pendingAI} highlight={c.pendingAI > 0} />
                <StatBox label="Pending Mentor Review" value={c.pendingMentor} highlight={c.pendingMentor > 0} />
                <StatBox label="Week" value={c.weekNum} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function StatBox({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div style={{
      textAlign: 'center', padding: '0.75rem 0.5rem', borderRadius: '8px',
      background: highlight ? '#fff8e1' : 'var(--r-bg-muted)',
    }}>
      <p style={{
        fontSize: '1.5rem', fontWeight: 700,
        color: highlight ? '#f57f17' : 'var(--r-navy)',
      }}>{value}</p>
      <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{label}</p>
    </div>
  )
}

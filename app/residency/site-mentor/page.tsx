'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

export default function SiteMentorDashboard() {
  const { profile } = useResidencyAuth(['site_mentor'])
  const [assignments, setAssignments] = useState<any[]>([])
  const [onboarding, setOnboarding] = useState<any>(null)
  const [observations, setObservations] = useState<any[]>([])
  const [checkins, setCheckins] = useState<any[]>([])
  const [stipends, setStipends] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    async function load() {
      const [
        { data: assign },
        { data: onb },
        { data: obs },
        { data: chk },
        { data: stip },
      ] = await Promise.all([
        supabase.from('residency_site_mentor_assignments')
          .select('*, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name)), site:residency_placement_sites(name)')
          .eq('site_mentor_profile_id', profile!.id)
          .eq('status', 'active'),
        supabase.from('residency_site_mentor_onboarding')
          .select('*')
          .eq('site_mentor_profile_id', profile!.id)
          .maybeSingle(),
        supabase.from('residency_site_mentor_observations')
          .select('id, observation_date, quarter, status, resident_id')
          .eq('site_mentor_profile_id', profile!.id)
          .order('observation_date', { ascending: false })
          .limit(10),
        supabase.from('residency_site_mentor_checkins')
          .select('id, checkin_date, resident_id')
          .eq('site_mentor_profile_id', profile!.id)
          .order('checkin_date', { ascending: false })
          .limit(5),
        supabase.from('residency_site_mentor_stipends')
          .select('*')
          .eq('site_mentor_profile_id', profile!.id)
          .order('created_at', { ascending: false }),
      ])

      if (assign) setAssignments(assign)
      if (onb) setOnboarding(onb)
      if (obs) setObservations(obs)
      if (chk) setCheckins(chk)
      if (stip) setStipends(stip)
      setLoading(false)
    }
    load()
  }, [profile])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const onboardingComplete = onboarding?.onboarding_completed_at
  const stepsComplete = onboarding
    ? [onboarding.step_1_complete, onboarding.step_2_complete, onboarding.step_3_complete, onboarding.step_4_complete, onboarding.step_5_complete].filter(Boolean).length
    : 0

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
        {profile ? `Welcome, ${profile.first_name}` : 'Site Mentor Dashboard'}
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Your assigned residents, observations, and check-ins.
      </p>

      {/* Onboarding Banner */}
      {!onboardingComplete && (
        <Link href="/residency/site-mentor/onboarding" className="r-card" style={{
          padding: '1.5rem', marginBottom: '1.5rem', textDecoration: 'none', color: 'inherit',
          borderLeft: '4px solid var(--r-gold)', display: 'block',
          background: 'var(--r-gold-light)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>Complete Your Onboarding</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                {stepsComplete}/5 steps complete{onboarding?.quiz_passed ? ' · Quiz passed' : ''}
              </p>
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--r-navy)' }}>Continue →</span>
          </div>
        </Link>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="r-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{assignments.length}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Assigned Residents</p>
        </div>
        <Link href="/residency/site-mentor/observations" className="r-card" style={{ textAlign: 'center', padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{observations.filter(o => o.status === 'submitted').length}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Observations Submitted</p>
        </Link>
        <Link href="/residency/site-mentor/checkins" className="r-card" style={{ textAlign: 'center', padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{checkins.length}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Check-Ins Logged</p>
        </Link>
        <div className="r-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>
            ${stipends.filter(s => s.status === 'paid').reduce((sum: number, s: any) => sum + Number(s.amount), 0).toFixed(0)}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Stipend Earned</p>
        </div>
      </div>

      {/* Assigned Residents */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>My Residents</h2>
      {assignments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {assignments.map(a => (
            <div key={a.id} className="r-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {a.resident?.profile?.first_name} {a.resident?.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    {a.site?.name} · {a.academic_year}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/residency/site-mentor/observations/new?resident=${a.resident_id}`}
                    className="r-btn r-btn-secondary" style={{ fontSize: '0.6875rem', padding: '0.25rem 0.75rem', textDecoration: 'none' }}>
                    New Observation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No residents assigned yet.</p>
        </div>
      )}

      {/* Quick Links */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Quick Links</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <Link href="/residency/site-mentor/observations" className="r-card" style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Observations</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>View and submit quarterly observations</p>
        </Link>
        <Link href="/residency/site-mentor/checkins" className="r-card" style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Check-Ins</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Monthly notes with Cohort Guide</p>
        </Link>
        <Link href="/residency/site-mentor/evaluation" className="r-card" style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Final Evaluation</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>End-of-year readiness assessment</p>
        </Link>
        <Link href="/residency/site-mentor/onboarding" className="r-card" style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Onboarding</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{onboardingComplete ? 'Review materials' : 'Complete your setup'}</p>
        </Link>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

const SCHOOL_TYPE_LABELS: Record<string, string> = {
  private_independent: 'Private Independent Montessori',
  public_district: 'Public District Montessori',
  charter: 'Charter Montessori',
  bilingual_dual_language: 'Bilingual or Dual Language Montessori',
  other: 'Other',
}

export default function ObservationDetailPage() {
  const params = useParams()
  const [log, setLog] = useState<any>(null)
  const [prompt, setPrompt] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_observation_logs')
        .select('*')
        .eq('id', params.id)
        .single()

      if (data) {
        setLog(data)

        // Load the prompt for this month
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: resident } = await supabase
            .from('residency_residents')
            .select('assigned_level:residency_levels(*)')
            .eq('profile_id', user.id)
            .single()

          const level = Array.isArray(resident?.assigned_level) ? resident.assigned_level[0] : resident?.assigned_level
          const track = level?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'

          const { data: obsPrompt } = await supabase
            .from('residency_observation_prompts')
            .select('*')
            .eq('track', track)
            .eq('month_number', data.month_number)
            .single()

          if (obsPrompt) setPrompt(obsPrompt)
        }
      }
      setLoading(false)
    }
    load()
  }, [params.id])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  if (!log) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--r-text-muted)' }}>Observation entry not found.</p>
      <Link href="/residency/portal/observations" style={{ color: 'var(--r-navy)', fontSize: '0.875rem' }}>
        &larr; Back to Observation Log
      </Link>
    </div>
  )

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/residency/portal/observations" style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none' }}>
          &larr; Back to Observation Log
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
            {monthNames[log.month_number - 1]} Observation
          </h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Submitted {new Date(log.submitted_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span style={{
          fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem',
          background: 'var(--r-success-light)', color: 'var(--r-success)',
          borderRadius: '9999px',
        }}>
          Complete
        </span>
      </div>

      {/* Curriculum prompt context */}
      {prompt && (
        <div style={{
          background: '#f5e8cc',
          borderLeft: '4px solid var(--r-navy)',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-navy)', marginBottom: '0.25rem' }}>
            Month {log.month_number} Focus
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--r-text)' }}>
            {prompt.curriculum_connection}
          </p>
        </div>
      )}

      {/* Site details */}
      <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>Site Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.125rem' }}>
              Date
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
              {new Date(log.observation_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.125rem' }}>
              Hours
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{Number(log.hours)}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.125rem' }}>
              School
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{log.school_name}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.125rem' }}>
              School Type
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
              {log.school_type ? (SCHOOL_TYPE_LABELS[log.school_type] || log.school_type) : '--'}
            </p>
          </div>
          {log.supervising_guide && (
            <div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.125rem' }}>
                Supervising Guide
              </p>
              <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{log.supervising_guide}</p>
            </div>
          )}
          {log.guide_credential && (
            <div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.125rem' }}>
                Guide Credential
              </p>
              <p style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{log.guide_credential}</p>
            </div>
          )}
        </div>
      </div>

      {/* Reflections */}
      <div className="r-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem', color: 'var(--r-navy)' }}>Reflections</h2>

        {log.reflection_connection && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
              What did you observe that connected directly to what you have been studying this month?
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--r-text)', whiteSpace: 'pre-wrap' }}>
              {log.reflection_connection}
            </p>
          </div>
        )}

        {log.reflection_surprise && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
              What surprised you?
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--r-text)', whiteSpace: 'pre-wrap' }}>
              {log.reflection_surprise}
            </p>
          </div>
        )}

        {log.reflection_questions && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
              What questions did this observation raise for you?
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--r-text)', whiteSpace: 'pre-wrap' }}>
              {log.reflection_questions}
            </p>
          </div>
        )}

        {log.reflection_next_month && (
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
              What will you look for differently next month?
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--r-text)', whiteSpace: 'pre-wrap' }}>
              {log.reflection_next_month}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

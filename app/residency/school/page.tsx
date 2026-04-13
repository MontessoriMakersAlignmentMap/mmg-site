'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function SchoolPortalPage() {
  const [school, setSchool] = useState<any>(null)
  const [residentCount, setResidentCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get school partner record
      const { data: partner } = await supabase
        .from('residency_school_partners')
        .select('school_id')
        .eq('profile_id', user.id)
        .is('deleted_at', null)
        .single()

      if (partner?.school_id) {
        const { data: schoolData } = await supabase
          .from('residency_schools')
          .select('*')
          .eq('id', partner.school_id)
          .single()

        setSchool(schoolData)

        // Count placed residents
        const { count } = await supabase
          .from('residency_placements')
          .select('*', { count: 'exact', head: true })
          .eq('site_id', partner.school_id)

        setResidentCount(count || 0)
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  if (!school) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome</h1>
        <p style={{ color: 'var(--r-text-muted)' }}>Your school account is being set up. Please check back soon.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{school.name}</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        {[school.city, school.state].filter(Boolean).join(', ')}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{residentCount}</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Placed Residents</p>
        </div>
        <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: school.practicum_agreement_signed ? 'var(--r-success)' : 'var(--r-warning)' }}>
            {school.practicum_agreement_signed ? 'Yes' : 'No'}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Agreement Signed</p>
        </div>
        <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)', textTransform: 'capitalize' }}>
            {school.partnership_status}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Partnership Status</p>
        </div>
      </div>

      <div className="r-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>School Information</h2>
        <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
          {school.address && <p><span style={{ color: 'var(--r-text-muted)' }}>Address:</span> {school.address}</p>}
          {school.contact_name && <p><span style={{ color: 'var(--r-text-muted)' }}>Contact:</span> {school.contact_name}</p>}
          {school.contact_email && <p><span style={{ color: 'var(--r-text-muted)' }}>Email:</span> {school.contact_email}</p>}
          {school.contact_phone && <p><span style={{ color: 'var(--r-text-muted)' }}>Phone:</span> {school.contact_phone}</p>}
        </div>
      </div>
    </div>
  )
}

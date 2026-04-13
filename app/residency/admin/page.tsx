'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ residents: 0, lessons: 0, published: 0, submissions: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [residents, lessons, submissions] = await Promise.all([
        supabase.from('residency_residents').select('id', { count: 'exact', head: true }),
        supabase.from('residency_lessons').select('id, status'),
        supabase.from('residency_album_entries').select('id', { count: 'exact', head: true }).eq('status', 'submitted'),
      ])

      const published = (lessons.data ?? []).filter((l: any) => l.status === 'published').length

      setStats({
        residents: residents.count ?? 0,
        lessons: (lessons.data ?? []).length,
        published,
        submissions: submissions.count ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const cards = [
    { label: 'Total Residents', value: stats.residents, href: '/residency/admin/residents' },
    { label: 'Total Lessons', value: stats.lessons, href: '/residency/admin/lessons' },
    { label: 'Published Lessons', value: stats.published, href: '/residency/admin/lessons' },
    { label: 'Pending Submissions', value: stats.submissions, href: '/residency/admin/progress' },
  ]

  return (
    <div>
      <div className="r-page-header">
        <h1>Admin Overview</h1>
        <p>Program-wide metrics and management.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="r-stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <p className="r-stat-value">{c.value}</p>
            <p className="r-stat-label">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/residency/admin/lessons/new" className="r-btn r-btn-primary">
            Upload Lesson
          </Link>
          <Link href="/residency/admin/residents" className="r-btn r-btn-secondary">
            Manage Residents
          </Link>
          <Link href="/residency/admin/progress" className="r-btn r-btn-secondary">
            View Progress
          </Link>
        </div>
      </div>
    </div>
  )
}

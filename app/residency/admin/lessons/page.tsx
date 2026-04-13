'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_lessons')
        .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
        .order('sort_order')

      if (data) setLessons(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Lessons</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Manage the residency curriculum.
          </p>
        </div>
        <Link href="/residency/admin/lessons/new" className="r-btn r-btn-primary">
          New Lesson
        </Link>
      </div>

      {lessons.length === 0 ? (
        <EmptyState
          title="No lessons created"
          message="Create your first lesson to begin building the curriculum."
          action={
            <Link href="/residency/admin/lessons/new" className="r-btn r-btn-primary">
              Create Lesson
            </Link>
          }
        />
      ) : (
        <div className="r-card" style={{ overflow: 'auto' }}>
          <table className="r-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Strand</th>
                <th>Level</th>
                <th>Category</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((l: any) => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 500 }}>{l.title}</td>
                  <td>{l.strand?.name ?? '\u2014'}</td>
                  <td>{l.level?.name ?? '\u2014'}</td>
                  <td>{l.category?.name ?? '\u2014'}</td>
                  <td><StatusBadge status={l.status} /></td>
                  <td>
                    <Link href={`/residency/admin/lessons/${l.id}`}
                      style={{ fontSize: '0.8125rem', color: 'var(--r-navy)' }}>
                      Edit
                    </Link>
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

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

export default function AdminSiteMentorStipendsPage() {
  useResidencyAuth(['admin'])
  const [stipends, setStipends] = useState<any[]>([])
  const [mentors, setMentors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formMentor, setFormMentor] = useState('')
  const [formYear, setFormYear] = useState('2026-2027')
  const [formSemester, setFormSemester] = useState('fall')
  const [formAmount, setFormAmount] = useState('')
  const [formNotes, setFormNotes] = useState('')

  useEffect(() => {
    async function load() {
      const [{ data: stip }, { data: m }] = await Promise.all([
        supabase.from('residency_site_mentor_stipends')
          .select('*, mentor:residency_profiles!residency_site_mentor_stipends_site_mentor_profile_id_fkey(first_name, last_name, email)')
          .order('created_at', { ascending: false }),
        supabase.from('residency_profiles')
          .select('id, first_name, last_name, email')
          .eq('role', 'site_mentor'),
      ])
      if (stip) setStipends(stip)
      if (m) setMentors(m)
      setLoading(false)
    }
    load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('residency_site_mentor_stipends').insert({
      site_mentor_profile_id: formMentor,
      academic_year: formYear,
      semester: formSemester,
      amount: parseFloat(formAmount),
      notes: formNotes || null,
    })
    const { data } = await supabase.from('residency_site_mentor_stipends')
      .select('*, mentor:residency_profiles!residency_site_mentor_stipends_site_mentor_profile_id_fkey(first_name, last_name, email)')
      .order('created_at', { ascending: false })
    if (data) setStipends(data)
    setShowForm(false)
    setFormAmount(''); setFormNotes('')
    setSaving(false)
  }

  async function markPaid(id: string) {
    await supabase.from('residency_site_mentor_stipends')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', id)
    setStipends(prev => prev.map(s => s.id === id ? { ...s, status: 'paid', paid_at: new Date().toISOString() } : s))
  }

  async function markApproved(id: string) {
    await supabase.from('residency_site_mentor_stipends')
      .update({ status: 'approved' })
      .eq('id', id)
    setStipends(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s))
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const totalPending = stipends.filter(s => s.status === 'pending').reduce((sum, s) => sum + Number(s.amount), 0)
  const totalPaid = stipends.filter(s => s.status === 'paid').reduce((sum, s) => sum + Number(s.amount), 0)

  return (
    <div>
      <Link href="/residency/admin" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Admin
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Site Mentor Stipends</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Track and manage stipend payments to Site Mentors.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'Add Stipend'}
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="r-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--r-gold)' }}>${totalPending.toFixed(0)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Pending/Approved</p>
        </div>
        <div className="r-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--r-success)' }}>${totalPaid.toFixed(0)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Total Paid</p>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Site Mentor</label>
              <select className="r-input" value={formMentor} onChange={e => setFormMentor(e.target.value)} required>
                <option value="">Select...</option>
                {mentors.map(m => <option key={m.id} value={m.id}>{m.first_name} {m.last_name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Year</label>
              <input type="text" className="r-input" value={formYear} onChange={e => setFormYear(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">Semester</label>
              <select className="r-input" value={formSemester} onChange={e => setFormSemester(e.target.value)} required>
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
              </select>
            </div>
            <div>
              <label className="r-label">Amount ($)</label>
              <input type="number" min="0" step="0.01" className="r-input" value={formAmount} onChange={e => setFormAmount(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Adding...' : 'Add Stipend'}
          </button>
        </form>
      )}

      {stipends.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {stipends.map(s => (
            <div key={s.id} className="r-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {s.mentor?.first_name} {s.mentor?.last_name}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                    {s.semester.charAt(0).toUpperCase() + s.semester.slice(1)} {s.academic_year} · ${Number(s.amount).toFixed(0)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.6875rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontWeight: 600,
                    background: s.status === 'paid' ? 'var(--r-success-light)' : s.status === 'approved' ? '#E3F2FD' : '#FEF3C7',
                    color: s.status === 'paid' ? 'var(--r-success)' : s.status === 'approved' ? '#1565C0' : '#92400E',
                  }}>
                    {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                  </span>
                  {s.status === 'pending' && (
                    <button onClick={() => markApproved(s.id)} className="r-btn r-btn-secondary"
                      style={{ fontSize: '0.6875rem', padding: '0.125rem 0.5rem' }}>Approve</button>
                  )}
                  {s.status === 'approved' && (
                    <button onClick={() => markPaid(s.id)} className="r-btn r-btn-secondary"
                      style={{ fontSize: '0.6875rem', padding: '0.125rem 0.5rem' }}>Mark Paid</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No stipend records yet.</p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    name: '', city: '', state: '', address: '',
    contact_name: '', contact_email: '', contact_phone: '',
    practicum_agreement_signed: false,
  })
  const [selected, setSelected] = useState<any>(null)
  const [partners, setPartners] = useState<any[]>([])

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from('residency_schools')
      .select('*')
      .is('deleted_at', null)
      .order('name')
    setSchools(data || [])
    setLoading(false)
  }

  async function createSchool() {
    if (!form.name) return
    setCreating(true)
    await supabase.from('residency_schools').insert(form)
    setForm({ name: '', city: '', state: '', address: '', contact_name: '', contact_email: '', contact_phone: '', practicum_agreement_signed: false })
    setShowForm(false)
    setCreating(false)
    await load()
  }

  async function selectSchool(school: any) {
    setSelected(school)
    // Load partners and placed residents
    const { data: partnerData } = await supabase
      .from('residency_school_partners')
      .select('*, profile:residency_profiles(first_name, last_name, email)')
      .eq('school_id', school.id)
      .is('deleted_at', null)

    setPartners(partnerData || [])
  }

  async function removeSchool(id: string) {
    if (!confirm('Remove this school?')) return
    await supabase.from('residency_schools').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    setSelected(null)
    await load()
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)}
          style={{ background: 'none', border: 'none', color: 'var(--r-navy)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem', padding: 0 }}>
          &larr; Back to Schools
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{selected.name}</h1>
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
              {[selected.city, selected.state].filter(Boolean).join(', ') || 'No location'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase',
              padding: '0.25rem 0.75rem', borderRadius: '6px',
              color: selected.practicum_agreement_signed ? '#2d6a4f' : '#b45309',
              background: selected.practicum_agreement_signed ? '#d1fae5' : '#fef3c7',
            }}>
              {selected.practicum_agreement_signed ? 'Agreement Signed' : 'Agreement Pending'}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="r-card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Contact</h2>
            <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
              <p><span style={{ color: 'var(--r-text-muted)' }}>Name:</span> {selected.contact_name || '—'}</p>
              <p><span style={{ color: 'var(--r-text-muted)' }}>Email:</span> {selected.contact_email || '—'}</p>
              <p><span style={{ color: 'var(--r-text-muted)' }}>Phone:</span> {selected.contact_phone || '—'}</p>
              {selected.address && <p><span style={{ color: 'var(--r-text-muted)' }}>Address:</span> {selected.address}</p>}
            </div>
          </div>

          <div className="r-card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>
              School Partners ({partners.length})
            </h2>
            {partners.length === 0 ? (
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>No portal users linked to this school.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {partners.map(p => (
                  <div key={p.id} style={{ fontSize: '0.875rem' }}>
                    <p style={{ fontWeight: 500 }}>{(p.profile as any)?.first_name} {(p.profile as any)?.last_name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {(p.profile as any)?.email} {p.role_at_school ? `\u00b7 ${p.role_at_school}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button onClick={() => removeSchool(selected.id)}
            style={{ fontSize: '0.8125rem', color: '#991b1b', background: 'none', border: 'none', cursor: 'pointer' }}>
            Remove School
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>School Partners</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {schools.length} partner {schools.length === 1 ? 'school' : 'schools'}
          </p>
        </div>
        <button className="r-btn r-btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add School'}
        </button>
      </div>

      {showForm && (
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>New School Partner</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">School Name *</label>
              <input className="r-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem' }}>
              <div>
                <label className="r-label">City</label>
                <input className="r-input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className="r-label">State</label>
                <input className="r-input" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Address</label>
            <input className="r-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Contact Name</label>
              <input className="r-input" value={form.contact_name} onChange={e => setForm({ ...form, contact_name: e.target.value })} />
            </div>
            <div>
              <label className="r-label">Contact Email</label>
              <input className="r-input" type="email" value={form.contact_email} onChange={e => setForm({ ...form, contact_email: e.target.value })} />
            </div>
            <div>
              <label className="r-label">Contact Phone</label>
              <input className="r-input" type="tel" value={form.contact_phone} onChange={e => setForm({ ...form, contact_phone: e.target.value })} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
            <input type="checkbox" checked={form.practicum_agreement_signed}
              onChange={e => setForm({ ...form, practicum_agreement_signed: e.target.checked })}
              style={{ accentColor: 'var(--r-navy)' }} />
            Practicum agreement signed
          </label>
          <button className="r-btn r-btn-primary" onClick={createSchool} disabled={creating || !form.name}>
            {creating ? 'Creating...' : 'Add School'}
          </button>
        </div>
      )}

      {schools.length === 0 ? (
        <EmptyState title="No schools yet" message="Add school partners for practicum placements." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {schools.map(s => (
            <div key={s.id} className="r-card" onClick={() => selectSchool(s)}
              style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.125rem' }}>{s.name}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                  {[s.city, s.state].filter(Boolean).join(', ') || 'No location'}
                  {s.contact_name && ` \u00b7 ${s.contact_name}`}
                </p>
              </div>
              <span style={{
                fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase',
                padding: '0.25rem 0.5rem', borderRadius: '4px',
                color: s.practicum_agreement_signed ? '#2d6a4f' : '#b45309',
                background: s.practicum_agreement_signed ? '#d1fae5' : '#fef3c7',
              }}>
                {s.partnership_status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

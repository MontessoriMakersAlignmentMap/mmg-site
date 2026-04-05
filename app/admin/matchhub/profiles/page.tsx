'use client'

import { useEffect, useState, useCallback } from 'react'
import type { GuideProfile, ProfileStatus } from '@/lib/types/matchhub'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type Filter = 'all' | 'pending' | 'approved' | 'rejected'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'pending',  label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
]

function applyFilter(profiles: GuideProfile[], filter: Filter): GuideProfile[] {
  if (filter === 'all') return profiles
  return profiles.filter(p => p.status === filter)
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProfileStatus }) {
  const styles: Record<ProfileStatus, string> = {
    pending:  'bg-yellow-50 text-yellow-700 border-yellow-200',
    approved: 'bg-green-50  text-green-700  border-green-200',
    rejected: 'bg-red-50    text-red-600    border-red-200',
  }
  return (
    <span className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 border ${styles[status]}`}>
      {status}
    </span>
  )
}

// ─── Credential badge ─────────────────────────────────────────────────────────

function CredBadge({ cred }: { cred: string }) {
  const colors: Record<string, string> = {
    AMI:   'text-[#0e1a7a] bg-[#0e1a7a0d] border-[#0e1a7a30]',
    AMS:   'text-[#2D6A4F] bg-[#2D6A4F0d] border-[#2D6A4F30]',
    MACTE: 'text-purple-700 bg-purple-50 border-purple-200',
    Other: 'text-amber-700 bg-amber-50 border-amber-200',
  }
  return (
    <span className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 border ${colors[cred] ?? colors.Other}`}>
      {cred}
    </span>
  )
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionButton({
  label, onClick, loading, variant,
}: {
  label: string; onClick: () => void; loading: boolean; variant: 'approve' | 'reject'
}) {
  const styles = {
    approve: 'bg-[#0e1a7a] text-white hover:bg-[#162270]',
    reject:  'bg-red-600   text-white hover:bg-red-700',
  }
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`text-[11px] font-medium px-3 py-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${styles[variant]}`}
    >
      {loading ? '…' : label}
    </button>
  )
}

// ─── Profile detail drawer ────────────────────────────────────────────────────

function ProfileDrawer({ profile, onClose }: { profile: GuideProfile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl">
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>

          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Profile Detail</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {profile.first_name} {profile.last_initial}.
          </h2>
          <p className="text-sm text-gray-500 mb-6">{profile.email}</p>

          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-5 mb-6 text-sm">
            {[
              { label: 'Role Type',   value: profile.role_type ?? '—' },
              { label: 'Credential',  value: profile.credential },
              { label: 'Location',    value: profile.location },
              { label: 'Relocate',    value: profile.open_to_relocate },
              { label: 'Experience',  value: `${profile.years_experience} yrs` },
              { label: 'Submitted',   value: fmt(profile.created_at) },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {profile.levels?.length > 0 && (
            <div className="mb-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Age Levels</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.levels.map(l => (
                  <span key={l} className="text-xs text-gray-700 bg-gray-100 border border-gray-200 px-2.5 py-0.5">{l}</span>
                ))}
              </div>
            </div>
          )}

          {profile.tags?.length > 0 && (
            <div className="mb-5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.tags.map(t => (
                  <span key={t} className="text-xs text-gray-700 bg-gray-100 border border-gray-200 px-2.5 py-0.5">{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-5">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Summary</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{profile.summary}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-6">
            {profile.leadership_experience && <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5">Leadership exp.</span>}
            {profile.bilingual            && <span className="bg-blue-50   text-blue-700   border border-blue-200   px-2 py-0.5">Bilingual</span>}
            {profile.public_montessori    && <span className="bg-green-50  text-green-700  border border-green-200  px-2 py-0.5">Public Montessori</span>}
          </div>

          {(profile.resume_url || profile.photo_url) && (
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              {profile.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#0e1a7a] border border-[#0e1a7a] px-4 py-2 hover:bg-[#0e1a7a] hover:text-white transition-colors">
                  View Resume
                </a>
              )}
              {profile.photo_url && (
                <a href={profile.photo_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-600 border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors">
                  View Photo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminProfilesPage() {
  const [auth, setAuth]           = useState(false)
  const [adminPw, setAdminPw]     = useState('')
  const [pwInput, setPwInput]     = useState('')
  const [pwError, setPwError]     = useState<string | null>(null)
  const [profiles, setProfiles]   = useState<GuideProfile[]>([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState<Filter>('pending')
  const [acting, setActing]       = useState<Record<string, string>>({})
  const [error, setError]         = useState<string | null>(null)
  const [selected, setSelected]   = useState<GuideProfile | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('adminPw')
    if (saved) { setAdminPw(saved); setAuth(true) }
  }, [])

  const load = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setLoading(true)
    try {
      const res = await fetch('/api/admin/profiles', {
        headers: { 'x-admin-password': password },
      })
      if (res.status === 401) {
        setAuth(false)
        localStorage.removeItem('adminPw')
        setError('Session expired. Please log in again.')
        return
      }
      if (!res.ok) throw new Error('Failed to load')
      setProfiles(await res.json())
    } catch {
      setError('Could not load profiles.')
    } finally {
      setLoading(false)
    }
  }, [adminPw])

  useEffect(() => { if (auth) load() }, [auth, load])

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPwError(null)
    const res = await fetch('/api/admin/profiles', {
      headers: { 'x-admin-password': pwInput },
    })
    if (res.status === 401) { setPwError('Incorrect password.'); return }
    const data = await res.json()
    localStorage.setItem('adminPw', pwInput)
    setAdminPw(pwInput)
    setAuth(true)
    setProfiles(data)
    setLoading(false)
  }

  async function handleAction(id: string, action: 'approve' | 'reject') {
    setActing(prev => ({ ...prev, [id]: action }))
    try {
      const res = await fetch(`/api/admin/profiles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ action }),
      })
      if (res.status === 401) {
        setAuth(false)
        localStorage.removeItem('adminPw')
        setError('Session expired.')
        return
      }
      if (!res.ok) throw new Error()
      const newStatus: ProfileStatus = action === 'approve' ? 'approved' : 'rejected'
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null)
    } catch {
      setError(`Action failed. Please try again.`)
    } finally {
      setActing(prev => { const n = { ...prev }; delete n[id]; return n })
    }
  }

  const visible = applyFilter(profiles, filter)

  const counts: Record<Filter, number> = {
    all:      profiles.length,
    pending:  profiles.filter(p => p.status === 'pending').length,
    approved: profiles.filter(p => p.status === 'approved').length,
    rejected: profiles.filter(p => p.status === 'rejected').length,
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 text-center">Admin</p>
          <h1 className="text-xl font-semibold text-gray-900 text-center mb-8">MatchHub Profiles</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0e1a7a]"
            />
            {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
            <button type="submit" className="w-full bg-[#0e1a7a] text-white text-sm py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium">
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Admin</p>
            <h1 className="text-2xl font-semibold text-gray-900">MatchHub Profiles</h1>
            <p className="text-sm text-gray-500 mt-1">Review and approve educator & leader submissions.</p>
          </div>
          <a href="/admin/matchhub/jobs" className="text-xs text-gray-400 hover:text-gray-700 transition-colors pt-1">
            ← Jobs
          </a>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 ml-4 text-lg leading-none">×</button>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200 pb-4">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`text-xs px-3 py-1.5 rounded transition-colors ${
                filter === key ? 'bg-[#0e1a7a] text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
              <span className={`ml-1.5 text-[10px] ${filter === key ? 'text-white/70' : 'text-gray-400'}`}>
                {counts[key]}
              </span>
            </button>
          ))}
          <button onClick={() => load()} className="ml-auto text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 transition-colors">
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-sm text-gray-400 py-16 text-center">Loading…</div>
        ) : visible.length === 0 ? (
          <div className="text-sm text-gray-400 py-16 text-center">No profiles match this filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  {['Name', 'Email', 'Role', 'Credential', 'Location', 'Exp', 'Levels', 'Summary', 'Status', 'Submitted', 'Actions'].map(h => (
                    <th key={h} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 pr-4 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(profile => {
                  const loadingAction = acting[profile.id]
                  return (
                    <tr key={profile.id} className="border-b border-gray-100 hover:bg-white transition-colors">
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => setSelected(profile)}
                          className="font-medium text-[#0e1a7a] hover:underline text-left"
                        >
                          {profile.first_name} {profile.last_initial}.
                        </button>
                      </td>
                      <td className="py-3 pr-4">
                        <a href={`mailto:${profile.email}`} className="text-xs text-gray-500 hover:text-[#0e1a7a] transition-colors">
                          {profile.email}
                        </a>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-xs text-gray-700">{profile.role_type ?? '—'}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <CredBadge cred={profile.credential} />
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-xs text-gray-600">{profile.location}</span>
                        {profile.open_to_relocate === 'Yes' && (
                          <span className="block text-[10px] text-green-600">Open to relocate</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-xs text-gray-600 whitespace-nowrap">
                        {profile.years_experience} yrs
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-col gap-0.5">
                          {(profile.levels ?? []).slice(0, 2).map(l => (
                            <span key={l} className="text-[10px] text-gray-500">{l}</span>
                          ))}
                          {(profile.levels ?? []).length > 2 && (
                            <span className="text-[10px] text-gray-400">+{profile.levels.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4 max-w-[220px]">
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{profile.summary}</p>
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={profile.status} />
                      </td>
                      <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">
                        {fmt(profile.created_at)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {profile.status !== 'approved' && (
                            <ActionButton
                              label="Approve"
                              variant="approve"
                              loading={loadingAction === 'approve'}
                              onClick={() => handleAction(profile.id, 'approve')}
                            />
                          )}
                          {profile.status !== 'rejected' && (
                            <ActionButton
                              label="Reject"
                              variant="reject"
                              loading={loadingAction === 'reject'}
                              onClick={() => handleAction(profile.id, 'reject')}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-8">
          {visible.length} {visible.length === 1 ? 'record' : 'records'} shown.
          Approved profiles appear in the MatchHub talent pool.
        </p>
      </div>

      {selected && (
        <ProfileDrawer profile={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

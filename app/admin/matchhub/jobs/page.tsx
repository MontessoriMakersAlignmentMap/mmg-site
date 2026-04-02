'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Job } from '@/lib/types/matchhub'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function isExpired(job: Job) {
  return !!job.expires_at && new Date(job.expires_at) < new Date()
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type Filter = 'all' | 'pending' | 'paid' | 'approved' | 'rejected' | 'archived' | 'expired'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'pending',  label: 'Pending' },
  { key: 'paid',     label: 'Paid' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'archived', label: 'Archived' },
  { key: 'expired',  label: 'Expired' },
]

function applyFilter(jobs: Job[], filter: Filter): Job[] {
  if (filter === 'all')      return jobs
  if (filter === 'pending')  return jobs.filter(j => j.status === 'pending')
  if (filter === 'paid')     return jobs.filter(j => j.payment_status === 'paid')
  if (filter === 'approved') return jobs.filter(j => j.status === 'approved' && !isExpired(j))
  if (filter === 'rejected') return jobs.filter(j => j.status === 'rejected')
  if (filter === 'archived') return jobs.filter(j => j.status === 'archived')
  if (filter === 'expired')  return jobs.filter(j => j.status === 'approved' && isExpired(j))
  return jobs
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ job }: { job: Job }) {
  const expired = isExpired(job)
  const label = expired && job.status === 'approved' ? 'expired' : job.status
  const styles: Record<string, string> = {
    pending:  'bg-yellow-50  text-yellow-700  border-yellow-200',
    approved: 'bg-green-50   text-green-700   border-green-200',
    rejected: 'bg-red-50     text-red-600     border-red-200',
    archived: 'bg-gray-100   text-gray-500    border-gray-200',
    expired:  'bg-orange-50  text-orange-600  border-orange-200',
  }
  return (
    <span className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 border ${styles[label] ?? styles.pending}`}>
      {label}
    </span>
  )
}

function PaymentBadge({ status }: { status: Job['payment_status'] }) {
  if (status === 'paid') {
    return <span className="text-[10px] font-semibold uppercase tracking-wide text-green-700 bg-green-50 border border-green-200 px-2 py-0.5">paid</span>
  }
  return <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5">unpaid</span>
}

function AddOnBadges({ notes }: { notes: string | null }) {
  let addOns = { featured: false, social: false }
  try { if (notes) addOns = JSON.parse(notes)?.addOns ?? addOns } catch {}
  if (!addOns.featured && !addOns.social) return null
  return (
    <div className="flex gap-1 mt-1 flex-wrap">
      {addOns.featured && (
        <span className="text-[9px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5">
          ★ Featured
        </span>
      )}
      {addOns.social && (
        <span className="text-[9px] font-semibold uppercase tracking-wide text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5">
          📣 Social Boost
        </span>
      )}
    </div>
  )
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionButton({
  label, onClick, loading, variant,
}: {
  label: string
  onClick: () => void
  loading: boolean
  variant: 'approve' | 'reject' | 'archive'
}) {
  const styles = {
    approve: 'bg-[#0e1a7a] text-white hover:bg-[#162270]',
    reject:  'bg-red-600   text-white hover:bg-red-700',
    archive: 'bg-gray-200  text-gray-700 hover:bg-gray-300',
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



function SourceBadge({ source }: { source: string | null }) {
  const isMMAP = source?.toLowerCase().includes('mmap')
  const label = isMMAP ? 'MMAP' : 'MatchHub'
  const style = isMMAP
    ? 'text-[#0e1a7a] bg-[#eef0fb] border-[#c7ccf0]'
    : 'text-gray-500 bg-gray-50 border-gray-200'
  return (
    <span className={`inline-block text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 border mt-1 ${style}`}>
      {label}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminJobsPage() {
  const [auth, setAuth] = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [acting, setActing] = useState<Record<string, string>>({}) // jobId → action
  const [error, setError] = useState<string | null>(null)

  // Restore saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem('adminPw')
    if (saved) {
      setAdminPw(saved)
      setAuth(true)
    }
  }, [])

  const load = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setLoading(true)
    try {
      const res = await fetch('/api/admin/jobs', {
        headers: { 'x-admin-password': password },
      })
      if (res.status === 401) {
        setAuth(false)
        localStorage.removeItem('adminPw')
        setError('Session expired. Please log in again.')
        return
      }
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setJobs(data)
    } catch {
      setError('Could not load jobs.')
    } finally {
      setLoading(false)
    }
  }, [adminPw])

  useEffect(() => { if (auth) load() }, [auth, load])

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPwError(null)
    const res = await fetch('/api/admin/jobs', {
      headers: { 'x-admin-password': pwInput },
    })
    if (res.status === 401) {
      setPwError('Incorrect password.')
      return
    }
    const data = await res.json()
    localStorage.setItem('adminPw', pwInput)
    setAdminPw(pwInput)
    setAuth(true)
    setJobs(data)
    setLoading(false)
  }

  async function handleAction(jobId: string, action: 'approve' | 'reject' | 'archive') {
    setActing(prev => ({ ...prev, [jobId]: action }))
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ action }),
      })
      if (res.status === 401) {
        setAuth(false)
        localStorage.removeItem('adminPw')
        setError('Session expired. Please log in again.')
        return
      }
      if (!res.ok) throw new Error()
      // Optimistic update
      setJobs(prev => prev.map(j => {
        if (j.id !== jobId) return j
        const now = new Date().toISOString()
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        if (action === 'approve') return { ...j, status: 'approved', approved_at: now, expires_at: expires }
        if (action === 'reject')  return { ...j, status: 'rejected' }
        if (action === 'archive') return { ...j, status: 'archived' }
        return j
      }))
    } catch {
      setError(`Action failed for job ${jobId}. Please try again.`)
    } finally {
      setActing(prev => { const n = { ...prev }; delete n[jobId]; return n })
    }
  }

  const visible = applyFilter(jobs, filter)

  // Count per filter
  const counts: Record<Filter, number> = {
    all:      jobs.length,
    pending:  jobs.filter(j => j.status === 'pending').length,
    paid:     jobs.filter(j => j.payment_status === 'paid').length,
    approved: jobs.filter(j => j.status === 'approved' && !isExpired(j)).length,
    rejected: jobs.filter(j => j.status === 'rejected').length,
    archived: jobs.filter(j => j.status === 'archived').length,
    expired:  jobs.filter(j => j.status === 'approved' && isExpired(j)).length,
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 text-center">Admin</p>
          <h1 className="text-xl font-semibold text-gray-900 text-center mb-8">MatchHub Jobs</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0e1a7a] transition-colors"
            />
            {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
            <button
              type="submit"
              className="w-full bg-[#0e1a7a] text-white text-sm py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium"
            >
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

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-2xl font-semibold text-gray-900">MatchHub Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">Review, approve, reject, or archive job submissions.</p>
        </div>

        {/* Error */}
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
                filter === key
                  ? 'bg-[#0e1a7a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
              <span className={`ml-1.5 text-[10px] ${filter === key ? 'text-white/70' : 'text-gray-400'}`}>
                {counts[key]}
              </span>
            </button>
          ))}
          <button
            onClick={() => load()}
            className="ml-auto text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-sm text-gray-400 py-16 text-center">Loading…</div>
        ) : visible.length === 0 ? (
          <div className="text-sm text-gray-400 py-16 text-center">No jobs match this filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  {['School', 'Job Title', 'Plan', 'Payment', 'Status', 'Created', 'Approved', 'Expires', 'Actions'].map(h => (
                    <th key={h} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 pr-5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(job => {
                  const loadingAction = acting[job.id]
                  return (
                    <tr key={job.id} className="border-b border-gray-100 hover:bg-white transition-colors">
                      <td className="py-3 pr-5">
                        <span className="font-medium text-gray-900">{job.school_name}</span>
                        <span className="block text-xs text-gray-400">{job.location}</span>
                      </td>
                      <td className="py-3 pr-5">
                        <span className="text-gray-800">{job.job_title}</span>
                        <span className="block text-xs text-gray-400">{job.level}</span>
                      </td>
                      <td className="py-3 pr-5">
                        <span className="text-xs text-gray-600">{job.plan_type}</span>
                        <SourceBadge source={job.source} />
                      </td>
                      <td className="py-3 pr-5">
                        <PaymentBadge status={job.payment_status} />
                        <AddOnBadges notes={job.notes} />
                      </td>
                      <td className="py-3 pr-5">
                        <StatusBadge job={job} />
                      </td>
                      <td className="py-3 pr-5 text-xs text-gray-500 whitespace-nowrap">
                        {fmt(job.created_at)}
                      </td>
                      <td className="py-3 pr-5 text-xs text-gray-500 whitespace-nowrap">
                        {fmt(job.approved_at)}
                      </td>
                      <td className="py-3 pr-5 text-xs text-gray-500 whitespace-nowrap">
                        {fmt(job.expires_at)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {job.status !== 'approved' && (
                            <ActionButton
                              label="Approve"
                              variant="approve"
                              loading={loadingAction === 'approve'}
                              onClick={() => handleAction(job.id, 'approve')}
                            />
                          )}
                          {job.status !== 'rejected' && (
                            <ActionButton
                              label="Reject"
                              variant="reject"
                              loading={loadingAction === 'reject'}
                              onClick={() => handleAction(job.id, 'reject')}
                            />
                          )}
                          {job.status !== 'archived' && (
                            <ActionButton
                              label="Archive"
                              variant="archive"
                              loading={loadingAction === 'archive'}
                              onClick={() => handleAction(job.id, 'archive')}
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
          Refunds are handled manually in the Stripe dashboard.
        </p>
      </div>
    </div>
  )
}

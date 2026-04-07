'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Job = {
  id: string
  title: string
  location: string
  job_type: string
  teaser: string
  is_active: boolean
  created_at: string
  original_filename: string | null
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  'contract': 'Contract',
  'per-engagement': 'Per Engagement',
}

export default function CareersAdminPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const loadJobs = useCallback(async () => {
    const res = await fetch('/api/careers/jobs')
    if (res.status === 401) { router.push('/admin/careers/login'); return }
    const data = await res.json()
    setJobs(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [router])

  useEffect(() => { loadJobs() }, [loadJobs])

  async function toggleActive(job: Job) {
    setTogglingId(job.id)
    await fetch(`/api/careers/jobs/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !job.is_active }),
    })
    await loadJobs()
    setTogglingId(null)
  }

  async function confirmDelete(id: string) {
    await fetch(`/api/careers/jobs/${id}`, { method: 'DELETE' })
    setDeleteId(null)
    loadJobs()
  }

  async function handleLogout() {
    await fetch('/api/careers/auth', { method: 'DELETE' })
    router.push('/admin/careers/login')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-1">Admin</p>
            <h1 className="text-2xl text-[#0e1a7a] font-semibold"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Careers
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/careers/new"
              className="bg-[#d6a758] text-white text-xs px-5 py-2.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
            >
              + Add Position
            </Link>
            <button
              onClick={handleLogout}
              className="border border-[#E2DDD6] text-[#64748B] text-xs px-4 py-2.5 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-[#64748B] text-sm">Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-[#E2DDD6] px-8 py-12 text-center">
            <p className="text-[#64748B] text-sm mb-4">No positions yet.</p>
            <Link href="/admin/careers/new" className="text-[#0e1a7a] text-sm underline">
              Add the first position
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-[#E2DDD6] divide-y divide-[#E2DDD6]">
            {jobs.map(job => (
              <div key={job.id} className="flex items-start gap-6 px-6 py-5 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <p className="text-[#0e1a7a] font-semibold text-sm">{job.title}</p>
                    <span className={`text-[10px] tracking-wide px-2 py-0.5 ${
                      job.is_active
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-[#64748B] text-xs">
                    {job.location} &middot; {TYPE_LABELS[job.job_type] ?? job.job_type}
                  </p>
                  <p className="text-[#374151] text-xs mt-1 leading-relaxed">{job.teaser}</p>
                  {job.original_filename && (
                    <p className="text-[#94A3B8] text-[10px] mt-1">{job.original_filename}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(job)}
                    disabled={togglingId === job.id}
                    className="text-[#0e1a7a] text-xs border border-[#0e1a7a]/30 px-3 py-1.5 hover:bg-[#0e1a7a] hover:text-white transition-colors disabled:opacity-50"
                  >
                    {togglingId === job.id ? '...' : job.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <Link
                    href={`/admin/careers/edit/${job.id}`}
                    className="text-[#64748B] text-xs border border-[#E2DDD6] px-3 py-1.5 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteId(job.id)}
                    className="text-red-400 text-xs border border-red-200 px-3 py-1.5 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href="/careers" target="_blank"
            className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors">
            View public careers page →
          </Link>
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-6 z-50">
          <div className="bg-white max-w-sm w-full p-8">
            <h2 className="text-[#0e1a7a] font-semibold text-lg mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Delete this position?
            </h2>
            <p className="text-[#374151] text-sm mb-6">
              This cannot be undone. Consider deactivating instead if you may want to reuse it.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => confirmDelete(deleteId)}
                className="bg-red-600 text-white text-sm px-5 py-2.5 hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="border border-[#E2DDD6] text-[#374151] text-sm px-5 py-2.5 hover:border-[#0e1a7a] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

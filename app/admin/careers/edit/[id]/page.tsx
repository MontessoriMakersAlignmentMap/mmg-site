'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

type Job = {
  id: string
  title: string
  location: string
  job_type: string
  teaser: string
  content_html: string
  original_filename: string | null
  is_active: boolean
}

export default function EditCareerPosition() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [form, setForm] = useState({ title: '', location: '', job_type: '', teaser: '' })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/careers/jobs/${id}`)
      .then(r => r.json())
      .then(data => {
        setJob(data)
        setForm({ title: data.title, location: data.location, job_type: data.job_type, teaser: data.teaser })
      })
  }, [id])

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('location', form.location)
    fd.append('job_type', form.job_type)
    fd.append('teaser', form.teaser)
    if (file) fd.append('file', file)

    const res = await fetch(`/api/careers/jobs/${id}`, { method: 'PUT', body: fd })
    setLoading(false)

    if (res.status === 401) { router.push('/admin/careers/login'); return }
    if (!res.ok) {
      const { error: msg } = await res.json()
      setError(msg ?? 'Something went wrong.')
      return
    }
    router.push('/admin/careers')
  }

  if (!job) return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
      <p className="text-[#64748B] text-sm">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/admin/careers" className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors mb-8 inline-block">
          Back to Careers Admin
        </Link>
        <h1 className="text-2xl text-[#0e1a7a] font-semibold mb-8" style={serif}>Edit Position</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">Job Title</label>
            <input type="text" required value={form.title} onChange={e => set('title', e.target.value)}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white" />
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">Location</label>
            <input type="text" required value={form.location} onChange={e => set('location', e.target.value)}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white" />
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">Type</label>
            <select value={form.job_type} onChange={e => set('job_type', e.target.value)}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white">
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="per-engagement">Per Engagement</option>
            </select>
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">Teaser</label>
            <input type="text" required value={form.teaser} onChange={e => set('teaser', e.target.value)}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white" />
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">Replace Posting (.docx)</label>
            {job.original_filename && (
              <p className="text-[#94A3B8] text-xs mb-2">Current: {job.original_filename}</p>
            )}
            <input type="file"
              accept=".docx,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white file:mr-4 file:border-0 file:bg-[#F2EDE6] file:text-[#374151] file:text-xs file:px-3 file:py-1" />
            <p className="text-[#94A3B8] text-xs mt-1">Leave empty to keep the current content.</p>
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">Current Content Preview</label>
            {/* content_html is server-generated from admin-uploaded .docx only — trusted source */}
            <div className="border border-[#E2DDD6] bg-white px-6 py-4 max-h-64 overflow-y-auto text-sm text-[#374151]"
              ref={el => { if (el && job?.content_html) el.innerHTML = job.content_html }} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="bg-[#d6a758] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#c09240] transition-colors font-medium disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/careers"
              className="border border-[#E2DDD6] text-[#374151] text-sm px-6 py-3 hover:border-[#0e1a7a] transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

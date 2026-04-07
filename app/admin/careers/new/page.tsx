'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function NewCareerPosition() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    location: '',
    job_type: 'full-time',
    teaser: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) { setError('Please select a .docx file.'); return }
    setError(null)
    setLoading(true)

    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('location', form.location)
    fd.append('job_type', form.job_type)
    fd.append('teaser', form.teaser)
    fd.append('file', file)

    const res = await fetch('/api/careers/jobs', { method: 'POST', body: fd })
    setLoading(false)

    if (res.status === 401) { router.push('/admin/careers/login'); return }
    if (!res.ok) {
      const { error: msg } = await res.json()
      setError(msg ?? 'Something went wrong.')
      return
    }

    router.push('/admin/careers')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/admin/careers"
          className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors mb-8 inline-block">
          ← Back to Careers Admin
        </Link>

        <h1 className="text-2xl text-[#0e1a7a] font-semibold mb-8" style={serif}>
          Add Position
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">
              Job Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. Elementary Lead Guide"
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
            />
          </div>

          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">
              Location
            </label>
            <input
              type="text"
              required
              value={form.location}
              onChange={e => set('location', e.target.value)}
              placeholder="e.g. Remote, New York NY, Hybrid"
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
            />
          </div>

          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">
              Type
            </label>
            <select
              value={form.job_type}
              onChange={e => set('job_type', e.target.value)}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="per-engagement">Per Engagement</option>
            </select>
          </div>

          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">
              Teaser (one line)
            </label>
            <input
              type="text"
              required
              value={form.teaser}
              onChange={e => set('teaser', e.target.value)}
              placeholder="A short description shown on the listing page"
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
            />
          </div>

          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.1em] uppercase mb-2">
              Job Posting (.docx or .pdf)
            </label>
            <input
              type="file"
              accept=".docx,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
              required
              onChange={e => setFile(e.target.files?.[0] ?? null)}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white file:mr-4 file:border-0 file:bg-[#F2EDE6] file:text-[#374151] file:text-xs file:px-3 file:py-1"
            />
            <p className="text-[#94A3B8] text-xs mt-1">
              Upload a .docx or PDF. Google Docs: File &gt; Download &gt; PDF works great.
            </p>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#d6a758] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#c09240] transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Position'}
            </button>
            <Link
              href="/admin/careers"
              className="border border-[#E2DDD6] text-[#374151] text-sm px-6 py-3 hover:border-[#0e1a7a] transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

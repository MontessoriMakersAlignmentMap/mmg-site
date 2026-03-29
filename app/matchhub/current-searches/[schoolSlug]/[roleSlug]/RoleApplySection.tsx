'use client'

import { useState, useRef } from 'react'
import type { SearchRole } from '@/lib/types/searches'

const inputClass =
  'w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors'
const labelClass = 'block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2'
const labelLongClass = 'block text-[#374151] text-sm font-medium mb-2'
const serif = { fontFamily: 'var(--font-heading)' }

interface Props {
  role: SearchRole
  schoolName: string
}

export default function RoleApplySection({ role, schoolName }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('email', email)
      fd.append('phone', phone)
      fd.append('message', message)
      fd.append('roleTitle', role.title)
      fd.append('schoolName', schoolName)
      fd.append('hp', hp)

      if (role.apply_method === 'upload' && fileRef.current?.files?.[0]) {
        fd.append('resume', fileRef.current.files[0])
      }

      const res = await fetch('/api/apply-role', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us at info@montessorimakers.org.')
    } finally {
      setLoading(false)
    }
  }

  // External link method
  if (role.apply_method === 'link' && role.apply_url) {
    return (
      <section id="apply" className="bg-[#F2EDE6] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Apply</p>
          <h2 className="text-3xl text-[#0e1a7a] mb-4" style={serif}>
            Apply for This Role
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-8">
            This position is accepting applications through the school's direct portal.
          </p>
          <a
            href={role.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
          >
            Apply Now ↗
          </a>
        </div>
      </section>
    )
  }

  // Email method
  if (role.apply_method === 'email' && role.apply_email) {
    return (
      <section id="apply" className="bg-[#F2EDE6] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Apply</p>
          <h2 className="text-3xl text-[#0e1a7a] mb-4" style={serif}>
            Apply for This Role
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-4">
            Send your resume and a brief introduction to:
          </p>
          <a
            href={`mailto:${role.apply_email}?subject=Application: ${encodeURIComponent(role.title)} — ${encodeURIComponent(schoolName)}`}
            className="inline-block bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium mb-4"
          >
            Email Application ↗
          </a>
          <p className="text-[#64748B] text-sm">{role.apply_email}</p>
        </div>
      </section>
    )
  }

  // Upload / form method (default)
  return (
    <section id="apply" className="bg-[#F2EDE6] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Apply</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
            Apply for This Role
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-6">
            This search is managed by Montessori Makers. Submit your application below
            and Hannah will be in touch if there is alignment.
          </p>
          <div className="bg-white border border-[#E2DDD6] p-6">
            <p className="text-[#64748B] text-sm leading-relaxed">
              Applications are reviewed individually. Not every submission will move
              forward to conversation.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {submitted ? (
            <div className="bg-white border border-[#E2DDD6] p-10">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Received</p>
              <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>
                Thank you, {name || 'there'}.
              </p>
              <p className="text-[#374151] text-sm leading-relaxed">
                Your application for <strong>{role.title}</strong> has been received.
                If there&rsquo;s alignment, you&rsquo;ll hear back within two weeks.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={e => setHp(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
              />

              <div>
                <label className={labelClass}>
                  Full Name <span className="text-[#8A6014]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Email <span className="text-[#8A6014]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className={inputClass}
                />
              </div>

              {role.apply_method === 'upload' && (
                <div>
                  <label className={labelClass}>Resume (PDF or Word)</label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-medium file:bg-[#0e1a7a] file:text-white hover:file:bg-[#162270] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className={labelLongClass}>
                  Brief introduction or cover letter
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Tell us about yourself and why you're a strong fit for this role."
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

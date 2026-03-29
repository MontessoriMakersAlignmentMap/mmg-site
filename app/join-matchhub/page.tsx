'use client'

import { useState } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

const trainingOptions = ['AMI', 'AMS', 'Other']
const ageLevelOptions = ['Primary (3–6)', 'Lower Elementary (6–9)', 'Upper Elementary (9–12)', 'Adolescent (12–15)']

export default function JoinMatchHubPage() {
  const [submitted, setSubmitted] = useState(false)
  const [resumeName, setResumeName] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <section className="bg-[#0e1a7a] min-h-screen flex items-center px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center py-32">
          <div className="w-14 h-14 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center mx-auto mb-10">
            <span className="text-[#d6a758] text-2xl">✓</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-white leading-tight mb-6" style={serif}>
            Profile received.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-4 max-w-lg mx-auto">
            Thank you for submitting your MatchHub guide profile. We&rsquo;ll review your information
            and be in touch if there&rsquo;s a match.
          </p>
          <p className="text-[#64748B] text-sm max-w-sm mx-auto">
            In the meantime, browse open positions at Montessori schools actively hiring on the platform.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">For Guides</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-6" style={serif}>
            Join MatchHub.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            Submit your profile and get in front of Montessori schools looking for trained, aligned
            guides. Free to join. Always.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#374151] text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#374151] text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#374151] text-sm font-medium mb-2">Montessori Training</label>
                <select
                  required
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] transition-colors bg-white appearance-none"
                >
                  <option value="">Select training</option>
                  {trainingOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#374151] text-sm font-medium mb-2">Age Level</label>
                <select
                  required
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] transition-colors bg-white appearance-none"
                >
                  <option value="">Select age level</option>
                  {ageLevelOptions.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#374151] text-sm font-medium mb-2">Years of Experience</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="50"
                  placeholder="e.g. 4"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#374151] text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  required
                  placeholder="City, State"
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#374151] text-sm font-medium mb-2">Short Bio</label>
              <textarea
                required
                rows={5}
                placeholder="Tell schools who you are, what you bring, and what you're looking for..."
                className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors resize-none"
              />
              <p className="text-[#64748B] text-xs mt-1.5">Keep it to 2–3 sentences. This is what schools see first.</p>
            </div>

            {/* Resume upload */}
            <div>
              <label className="block text-[#374151] text-sm font-medium mb-2">
                Resume <span className="text-[#94A3B8] font-normal">(optional)</span>
              </label>
              <label className="flex items-center gap-4 border border-dashed border-[#E2DDD6] px-5 py-4 cursor-pointer hover:border-[#0e1a7a] transition-colors group">
                <span className="text-[#64748B] text-xs tracking-wide group-hover:text-[#0e1a7a] transition-colors">
                  {resumeName || 'Choose a file — PDF or Word'}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setResumeName(e.target.files?.[0]?.name || '')}
                />
                <span className="ml-auto text-[#0e1a7a] text-xs font-medium border border-[#0e1a7a] px-3 py-1.5 flex-shrink-0 group-hover:bg-[#0e1a7a] group-hover:text-white transition-colors">
                  Browse
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-[#d6a758] text-white text-sm px-12 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
              >
                Submit Profile
              </button>
              <p className="text-[#64748B] text-xs mt-3">
                Profiles are reviewed by the MatchHub team. Free to submit, always.
              </p>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

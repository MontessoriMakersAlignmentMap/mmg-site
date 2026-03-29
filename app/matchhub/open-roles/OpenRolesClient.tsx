'use client'

import { useState } from 'react'
import type { Job } from '@/lib/types/matchhub'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

interface Props {
  jobs: Job[]
}

// ── Job detail modal ──────────────────────────────────────────────────────────

function JobModal({
  job,
  onClose,
}: {
  job: Job
  onClose: () => void
}) {
  const meta = [
    job.level && { label: 'Level', value: job.level },
    job.employment_type && { label: 'Type', value: job.employment_type },
    job.start_date && { label: 'Start', value: job.start_date },
    job.credential && { label: 'Credential', value: job.credential },
    job.school_type && { label: 'School type', value: job.school_type },
    job.compensation && { label: 'Compensation', value: job.compensation },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0e1a7a] px-8 py-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-2">Open Role</p>
            <h2 className="text-2xl text-white leading-tight" style={serif}>
              {job.job_title}
            </h2>
            <p className="text-[#94A3B8] text-sm mt-1">
              {job.school_name}
              {job.location ? ` · ${job.location}` : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl leading-none flex-shrink-0 mt-1"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-7">
          {/* Quick metadata */}
          {meta.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {meta.map(item => (
                <div key={item.label}>
                  <p className="text-[#64748B] text-xs tracking-[0.12em] uppercase mb-1">{item.label}</p>
                  <p className="text-[#374151] text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* About the Role */}
          {job.job_summary && (
            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3">About the Role</p>
              <p className="text-[#374151] text-base leading-relaxed whitespace-pre-wrap">{job.job_summary}</p>
            </div>
          )}

          {/* About the School */}
          {job.school_description && (
            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3">About the School</p>
              <p className="text-[#374151] text-base leading-relaxed">{job.school_description}</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-4">
            <p className="text-[#64748B] text-xs leading-relaxed">
              This listing was posted by the school and is managed through MatchHub. Apply directly
              through the school's application portal.
            </p>
          </div>

          {/* CTA */}
          {job.application_link && (
            <a
              href={job.application_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
            >
              Apply Now ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Job card ──────────────────────────────────────────────────────────────────

function JobCard({
  job,
  onView,
}: {
  job: Job
  onView: () => void
}) {
  const chips = [job.level, job.employment_type, job.start_date ? `Starts ${job.start_date}` : null]
    .filter(Boolean) as string[]

  return (
    <div className="bg-white border border-[#E2DDD6] flex flex-col hover:border-[#0e1a7a] transition-colors">
      <div className="p-7 flex-1">
        {/* Eyebrow */}
        <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">Open Role</p>

        {/* Title */}
        <h3 className="text-[#0e1a7a] font-semibold text-lg leading-snug mb-2" style={serif}>
          {job.job_title}
        </h3>

        {/* School + location */}
        <p className="text-[#374151] text-sm mb-4">
          {job.school_name}
          {job.location ? (
            <span className="text-[#64748B]"> · {job.location}</span>
          ) : null}
        </p>

        {/* Detail chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {chips.map(chip => (
              <span
                key={chip}
                className="bg-[#F2EDE6] text-[#8A6014] text-[10px] px-2 py-0.5 border border-[#E2DDD6]"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Summary — 3 lines max */}
        {job.job_summary && (
          <p className="text-[#374151] text-sm leading-relaxed line-clamp-3">
            {job.job_summary}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-7 pb-7 pt-4 border-t border-[#E2DDD6] mt-auto">
        <button
          onClick={onView}
          className="w-full border border-[#0e1a7a] text-[#0e1a7a] text-xs px-4 py-2.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
        >
          View Role →
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function OpenRolesClient({ jobs }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [modalJob, setModalJob] = useState<Job | null>(null)

  const allLevels = Array.from(new Set(jobs.map(j => j.level).filter(Boolean)))
  const filtered =
    activeFilter === 'all' ? jobs : jobs.filter(j => j.level === activeFilter)

  return (
    <>
      {/* Filters + grid */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Filter bar */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase">
              {filtered.length} Open {filtered.length === 1 ? 'Role' : 'Roles'}
            </p>
            {allLevels.length > 1 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`text-xs px-3 py-1.5 transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-[#0e1a7a] text-white'
                      : 'text-[#64748B] border border-[#E2DDD6] hover:border-[#0e1a7a]'
                  }`}
                >
                  All Levels
                </button>
                {allLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => setActiveFilter(level)}
                    className={`text-xs px-3 py-1.5 transition-colors ${
                      activeFilter === level
                        ? 'bg-[#0e1a7a] text-white'
                        : 'text-[#64748B] border border-[#E2DDD6] hover:border-[#0e1a7a]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="py-20 max-w-lg">
              <p className="text-[#374151] text-lg leading-relaxed mb-4">
                No open roles match this filter.
              </p>
              <p className="text-[#64748B] text-base leading-relaxed">
                Check back soon — new roles are added as searches come in.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onView={() => setModalJob(job)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom crosslinks */}
      <section className="bg-[#FAF9F7] py-12 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[#374151] text-sm mb-1">A Montessori educator?</p>
            <Link
              href="/matchhub/submit-profile"
              className="text-[#0e1a7a] text-sm font-medium hover:underline"
            >
              Create your guide profile →
            </Link>
          </div>
          <div>
            <p className="text-[#374151] text-sm mb-1">Want a fully managed search?</p>
            <Link
              href="/matchhub/strategic-search"
              className="text-[#0e1a7a] text-sm font-medium hover:underline"
            >
              Learn about Strategic Search →
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalJob && (
        <JobModal job={modalJob} onClose={() => setModalJob(null)} />
      )}
    </>
  )
}

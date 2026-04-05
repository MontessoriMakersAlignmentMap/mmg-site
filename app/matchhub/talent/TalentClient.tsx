'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GuideProfile } from '@/lib/types/matchhub'

const serif = { fontFamily: 'var(--font-heading)' }

// ─── Types ────────────────────────────────────────────────────────────────────

type Credential = 'AMI' | 'AMS' | 'MACTE' | 'Other'
type ExperienceBucket = '0–2' | '3–5' | '6–10' | '10+'

type Guide = {
  id: number
  firstName: string
  lastInitial: string
  roleSought: string
  credential: Credential
  levels: string[]
  region: string
  openToRelocate: boolean
  experienceYears: number
  summary: string
  philosophy: string
  availability: string
  tags: string[]
  resumeUrl?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVELS = ['Infant', 'Toddler', 'Primary', 'Lower Elementary', 'Upper Elementary', 'Adolescent', 'Leadership']
const REGIONS = ['Northeast', 'Southeast', 'Midwest', 'Mountain West', 'Southwest', 'Pacific Northwest']
const CREDENTIALS: Credential[] = ['AMI', 'AMS', 'MACTE', 'Other']
const EXP_BUCKETS: ExperienceBucket[] = ['0–2', '3–5', '6–10', '10+']
const ROLE_TYPES = [
  'Head of School / Executive Director',
  'Principal / Assistant Principal',
  'Assistant Head / Associate Director',
  'Program Director',
  'Coach',
  'Primary Guide (3–6)',
  'Elementary Guide (6–12)',
  'Infant & Toddler Guide (0–3)',
  'Adolescent / Middle School Guide',
  'Admissions & Enrollment',
  'Administrative & Operations',
  'Other',
]

const ONBOARDING_LOCATIONS = ['Chicago, IL', 'Atlanta, GA', 'St. Louis, MO', 'Remote / Relocation-ready']

function expBucket(years: number): ExperienceBucket {
  if (years <= 2) return '0–2'
  if (years <= 5) return '3–5'
  if (years <= 10) return '6–10'
  return '10+'
}

// ─── Map GuideProfile to Guide UI type ───────────────────────────────────────

function mapProfile(guide: GuideProfile): Guide {
  return {
    id: parseInt(guide.id.replace(/-/g, '').slice(0, 8), 16),
    firstName: guide.first_name,
    lastInitial: guide.last_initial,
    roleSought: guide.role_type || (guide.levels[0] ? `${guide.levels[0]} Guide` : 'Montessori Educator'),
    credential: (guide.credential as Credential) ?? 'Other',
    levels: guide.levels,
    region: guide.location,
    openToRelocate: guide.open_to_relocate === 'Yes',
    experienceYears: guide.years_experience,
    summary: guide.summary,
    philosophy: '',
    availability: '',
    tags: guide.tags,
  }
}

// ─── Credential badge ─────────────────────────────────────────────────────────

const credentialStyle: Record<string, { color: string; bg: string }> = {
  AMI:   { color: '#0e1a7a', bg: '#0e1a7a12' },
  AMS:   { color: '#2D6A4F', bg: '#2D6A4F12' },
  MACTE: { color: '#7C3AED', bg: '#7C3AED12' },
  Other: { color: '#8A6014', bg: '#d6a75820' },
}

// ─── Initials avatar ──────────────────────────────────────────────────────────

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-11 h-11 rounded-full bg-[#0e1a7a] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-xs font-semibold tracking-wide">{name[0].toUpperCase()}</span>
    </div>
  )
}

// ─── Tag pill ─────────────────────────────────────────────────────────────────

const tagColors: Record<string, string> = {
  Leadership: '#7C3AED',
  Bilingual: '#1D4ED8',
  'Open to relocate': '#2D6A4F',
}

function TagPill({ label }: { label: string }) {
  const color = tagColors[label] ?? '#64748B'
  if (['AMI', 'AMS', 'MACTE', 'Other'].includes(label)) return null
  return (
    <span className="text-[10px] font-medium tracking-[0.08em] px-2 py-0.5" style={{ color, backgroundColor: `${color}14` }}>
      {label}
    </span>
  )
}

// ─── Pro gate modal ───────────────────────────────────────────────────────────

function ProGateModal({ onBack, onActivate }: { onBack: () => void; onActivate: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0e1a7a]/80 backdrop-blur-sm" />
      <div className="relative bg-white max-w-md w-full p-10 shadow-2xl">
        <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-4">MatchHub Pro</p>
        <h2 className="text-[#0e1a7a] text-2xl font-semibold mb-3 leading-snug" style={serif}>
          Full profiles require MatchHub Pro.
        </h2>
        <p className="text-[#374151] text-sm leading-relaxed mb-2">
          Pro unlocks complete profiles for every educator and leader in the pool — full summaries, experience detail, and direct introduction requests.
        </p>
        <p className="text-[#64748B] text-xs leading-relaxed mb-8">
          $499/year. Includes unlimited job posts, auto featured placement, and social promotion on every role.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="https://buy.stripe.com/bJecN7ees8X61grc3T2cg0i"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
          >
            Upgrade to Pro — $499/year
          </a>
          <button onClick={onActivate} className="text-[#64748B] text-xs py-2 hover:text-[#0e1a7a] transition-colors">
            I already have Pro — activate access
          </button>
          <button onClick={onBack} className="text-[#94A3B8] text-xs py-1 hover:text-[#374151] transition-colors">
            ← Back to browsing
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Profile modal ────────────────────────────────────────────────────────────

function ProfileModal({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  const cs = credentialStyle[guide.credential]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-[#0e1a7a]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8 md:p-10">
          <button onClick={onClose} className="absolute top-5 right-5 text-[#94A3B8] hover:text-[#374151] transition-colors text-xl leading-none">×</button>
          <div className="flex items-start gap-5 mb-8">
            <Avatar name={guide.firstName} />
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-0.5">
                <h2 className="text-[#0e1a7a] text-2xl font-semibold" style={serif}>{guide.firstName} {guide.lastInitial}.</h2>
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1" style={cs}>{guide.credential}</span>
              </div>
              <p className="text-[#64748B] text-sm">{guide.roleSought}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#FAF9F7] p-6 mb-8">
            {[
              { label: 'Levels', value: guide.levels.join(', ') },
              { label: 'Region', value: guide.region },
              { label: 'Experience', value: `${guide.experienceYears} years` },
              { label: 'Relocation', value: guide.openToRelocate ? 'Open to relocate' : 'Local only' },
              { label: 'Availability', value: guide.availability },
              { label: 'Credential', value: guide.credential },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[#8A6014] text-[10px] tracking-[0.15em] uppercase mb-1">{label}</p>
                <p className="text-[#374151] text-sm">{value}</p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <p className="text-[#8A6014] text-[10px] tracking-[0.15em] uppercase mb-3">About</p>
            <p className="text-[#374151] text-base leading-relaxed">{guide.summary}</p>
          </div>
          <div className="border-l-[3px] border-[#d6a758] pl-5 mb-8">
            <p className="text-[#8A6014] text-[10px] tracking-[0.15em] uppercase mb-2">Teaching Philosophy</p>
            <p className="text-[#374151] text-sm leading-relaxed italic">&ldquo;{guide.philosophy}&rdquo;</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-[#E2DDD6]">
            <Link href="/contact" className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium flex-1">
              Request Introduction
            </Link>
            {guide.resumeUrl && (
              <a href={guide.resumeUrl} className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center">
                Download Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Guide card ───────────────────────────────────────────────────────────────

function GuideCard({ guide, isPro, onViewProfile }: { guide: Guide; isPro: boolean; onViewProfile: () => void }) {
  const cs = credentialStyle[guide.credential]
  const nonCredTags = guide.tags.filter(t => !['AMI', 'AMS', 'MACTE', 'Other'].includes(t))
  const teaser = guide.summary.length > 90 ? guide.summary.slice(0, 90).trimEnd() + '…' : guide.summary

  return (
    <div className="bg-white border border-[#E2DDD6] flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(14,26,122,0.09)] overflow-hidden">
      {/* Always-visible teaser */}
      <div className="p-7 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <Avatar name={guide.firstName} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>
                  {guide.firstName} {guide.lastInitial}.
                </h3>
                <p className="text-[#64748B] text-xs mt-0.5">{guide.roleSought}</p>
              </div>
              <span className="text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 flex-shrink-0" style={cs}>
                {guide.credential}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats — always visible */}
        <div className="flex flex-wrap gap-1.5">
          {guide.levels.map(l => (
            <span key={l} className="text-[11px] text-[#374151] bg-[#F2EDE6] px-2.5 py-0.5">{l}</span>
          ))}
          <span className="text-[11px] text-[#374151] bg-[#F2EDE6] px-2.5 py-0.5">{guide.experienceYears} yrs</span>
          {guide.openToRelocate
            ? <span className="text-[11px] text-[#2D6A4F] bg-[#2D6A4F12] px-2.5 py-0.5 font-medium">Open to relocate</span>
            : <span className="text-[11px] text-[#64748B] bg-[#FAF9F7] px-2.5 py-0.5">{guide.region}</span>
          }
        </div>

        {/* Summary teaser — always visible but truncated */}
        <p className="text-[#374151] text-sm leading-relaxed">{teaser}</p>
      </div>

      {/* Gated section */}
      {isPro ? (
        <div className="px-7 pb-7 flex flex-col gap-4">
          {nonCredTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {nonCredTags.map(t => <TagPill key={t} label={t} />)}
            </div>
          )}
          <div className="flex items-center justify-between pt-4 border-t border-[#F2EDE6]">
            <p className="text-[#94A3B8] text-xs">{guide.availability}</p>
            <button onClick={onViewProfile} className="text-xs font-medium tracking-wide text-[#0e1a7a] hover:underline transition-colors">
              View Full Profile →
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Blurred placeholder of what's below */}
          <div className="px-7 pb-7 pt-2 select-none pointer-events-none blur-[3px] opacity-60" aria-hidden="true">
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[11px] text-[#7C3AED] bg-[#7C3AED14] px-2.5 py-0.5">Leadership</span>
              <span className="text-[11px] text-[#1D4ED8] bg-[#1D4ED814] px-2.5 py-0.5">Bilingual</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#F2EDE6]">
              <p className="text-[#94A3B8] text-xs">Available now</p>
              <span className="text-xs font-medium text-[#0e1a7a]">View Full Profile →</span>
            </div>
          </div>
          {/* Lock overlay */}
          <button
            onClick={onViewProfile}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 hover:bg-white/85 transition-colors group"
          >
            <span className="text-[#0e1a7a] text-lg">🔒</span>
            <span className="text-[#0e1a7a] text-xs font-semibold tracking-wide group-hover:underline">
              Unlock with Pro →
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Filter bar ───────────────────────────────────────────────────────────────

function FilterBar({
  roleType, setRoleType, level, setLevel, region, setRegion, credential, setCredential,
  expBucketFilter, setExpBucketFilter, relocate, setRelocate, onClear, hasFilters,
}: {
  roleType: string; setRoleType: (v: string) => void
  level: string; setLevel: (v: string) => void
  region: string; setRegion: (v: string) => void
  credential: string; setCredential: (v: string) => void
  expBucketFilter: string; setExpBucketFilter: (v: string) => void
  relocate: boolean; setRelocate: (v: boolean) => void
  onClear: () => void; hasFilters: boolean
}) {
  const selectClass = "w-full border border-[#E2DDD6] bg-white px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] appearance-none transition-colors"

  return (
    <div className="bg-white border border-[#E2DDD6] p-6 mb-10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase">
          Curated Montessori Talent Pool &nbsp;&middot;&nbsp; Filter by role, credential, and location
        </p>
        {hasFilters && (
          <button onClick={onClear} className="text-[#94A3B8] text-xs hover:text-[#0e1a7a] transition-colors">
            Clear filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[#374151] text-xs font-medium mb-2">Role</label>
          <select value={roleType} onChange={e => setRoleType(e.target.value)} className={selectClass}>
            <option value="">All roles</option>
            {ROLE_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[130px]">
          <label className="block text-[#374151] text-xs font-medium mb-2">Age Level</label>
          <select value={level} onChange={e => setLevel(e.target.value)} className={selectClass}>
            <option value="">All levels</option>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[130px]">
          <label className="block text-[#374151] text-xs font-medium mb-2">Credential</label>
          <select value={credential} onChange={e => setCredential(e.target.value)} className={selectClass}>
            <option value="">All credentials</option>
            {CREDENTIALS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[130px]">
          <label className="block text-[#374151] text-xs font-medium mb-2">Location</label>
          <select value={region} onChange={e => setRegion(e.target.value)} className={selectClass}>
            <option value="">All regions</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[110px]">
          <label className="block text-[#374151] text-xs font-medium mb-2">Experience</label>
          <select value={expBucketFilter} onChange={e => setExpBucketFilter(e.target.value)} className={selectClass}>
            <option value="">Any</option>
            {EXP_BUCKETS.map(b => <option key={b} value={b}>{b} yrs</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer pb-0.5 flex-shrink-0">
          <div
            onClick={() => setRelocate(!relocate)}
            className={`w-4 h-4 border flex items-center justify-center cursor-pointer transition-colors ${relocate ? 'bg-[#0e1a7a] border-[#0e1a7a]' : 'border-[#E2DDD6]'}`}
          >
            {relocate && <span className="text-white" style={{ fontSize: 9 }}>✓</span>}
          </div>
          <span className="text-[#374151] text-sm whitespace-nowrap">Open to relocate</span>
        </label>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="py-20 flex flex-col items-center text-center max-w-xl mx-auto">
      <div className="w-12 h-12 rounded-full border border-[#E2DDD6] bg-white flex items-center justify-center mb-8">
        <div className="w-2 h-2 rounded-full bg-[#d6a758]" />
      </div>

      <h3 className="text-[#0e1a7a] text-2xl font-semibold mb-4 leading-snug" style={serif}>
        No profiles available yet.
      </h3>
      <p className="text-[#374151] text-base leading-relaxed mb-3">
        We&rsquo;re currently onboarding Montessori educators and leaders into MatchHub. New profiles will
        appear here as they are reviewed and added.
      </p>
      <p className="text-[#64748B] text-sm mb-10 italic">
        This is a curated space — profiles are not automatically listed.
      </p>

      {/* Onboarding locations */}
      <div className="border-t border-[#E2DDD6] pt-8 w-full">
        <p className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase mb-4">
          Currently onboarding guides in
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {ONBOARDING_LOCATIONS.map((loc) => (
            <span key={loc} className="text-[#64748B] text-xs bg-white border border-[#E2DDD6] px-4 py-2">
              {loc}
            </span>
          ))}
        </div>
      </div>

      {/* Submit CTA */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <Link
          href="/matchhub/submit-profile"
          className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium"
        >
          Submit Your Profile
        </Link>
        <p className="text-[#94A3B8] text-xs">
          Profiles are reviewed before being added to the MatchHub pool.
        </p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TalentClient({ guides: rawGuides }: { guides: GuideProfile[] }) {
  const guides: Guide[] = rawGuides.map(mapProfile)

  const [roleTypeFilter, setRoleTypeFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [credentialFilter, setCredentialFilter] = useState('')
  const [expFilter, setExpFilter] = useState('')
  const [relocateFilter, setRelocateFilter] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)
  const [showProGate, setShowProGate] = useState(false)
  const [isPro, setIsPro] = useState(false)

  const hasFilters = !!(roleTypeFilter || levelFilter || regionFilter || credentialFilter || expFilter || relocateFilter)

  function clearFilters() {
    setRoleTypeFilter(''); setLevelFilter(''); setRegionFilter('')
    setCredentialFilter(''); setExpFilter(''); setRelocateFilter(false)
  }

  const filtered = guides.filter(g => {
    if (roleTypeFilter && g.roleSought !== roleTypeFilter) return false
    if (levelFilter && !g.levels.includes(levelFilter)) return false
    if (regionFilter && g.region !== regionFilter) return false
    if (credentialFilter && g.credential !== credentialFilter) return false
    if (expFilter && expBucket(g.experienceYears) !== expFilter) return false
    if (relocateFilter && !g.openToRelocate) return false
    return true
  })

  function handleViewProfile(guide: Guide) {
    isPro ? setSelectedGuide(guide) : setShowProGate(true)
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              MatchHub Talent Pool
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.04] tracking-tight mb-7" style={serif}>
              Browse Montessori talent with more clarity and less chaos.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              A curated space for schools seeking guides and leaders aligned with Montessori practice,
              professionalism, and purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              {['Curated Montessori educators', 'Clear, structured profiles', 'Designed for values-aligned hiring'].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1 h-1 rounded-full bg-[#d6a758] flex-shrink-0" />
                  <span className="text-[#94A3B8] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/matchhub/post-job" className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium">
                Post a Role
              </Link>
              <Link href="/matchhub/submit-profile" className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center">
                Submit Your Profile &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURATION STATEMENT ───────────────────────────────────────────── */}
      <div className="bg-[#F2EDE6] border-b border-[#E2DDD6] px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-0.5 h-7 bg-[#d6a758] flex-shrink-0" />
          <p className="text-[#374151] text-sm leading-relaxed">
            <span className="font-semibold text-[#0e1a7a]">This is not a public job board.</span>{' '}
            Profiles are reviewed and selected to prioritize alignment, clarity, and Montessori integrity.
          </p>
        </div>
      </div>

      {/* ── FILTERS + GRID ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FilterBar
            roleType={roleTypeFilter} setRoleType={setRoleTypeFilter}
            level={levelFilter} setLevel={setLevelFilter}
            region={regionFilter} setRegion={setRegionFilter}
            credential={credentialFilter} setCredential={setCredentialFilter}
            expBucketFilter={expFilter} setExpBucketFilter={setExpFilter}
            relocate={relocateFilter} setRelocate={setRelocateFilter}
            onClear={clearFilters} hasFilters={hasFilters}
          />

          {/* Launching message */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p className="text-[#64748B] text-sm italic">
              Launching with our first cohort of Montessori educators and leaders.
            </p>
          </div>

          {/* Pro upgrade banner for non-Pro users */}
          {!isPro && guides.length > 0 && (
            <div className="bg-[#0e1a7a] px-7 py-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm font-medium leading-snug mb-1">
                  You&rsquo;re seeing a preview. Full profiles are unlocked with MatchHub Pro.
                </p>
                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  Role, credential, and experience visible now. Complete summary, skills, and introduction requests require Pro.
                </p>
              </div>
              <a
                href="https://buy.stripe.com/bJecN7ees8X61grc3T2cg0i"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-xs px-6 py-3 tracking-wide hover:bg-[#c09240] transition-colors whitespace-nowrap font-medium flex-shrink-0 text-center"
              >
                Upgrade to Pro — $499/yr
              </a>
            </div>
          )}

          {/* Results or empty state */}
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(guide => (
                <GuideCard key={guide.id} guide={guide} isPro={isPro} onViewProfile={() => handleViewProfile(guide)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-4">Hire well. Hire aligned.</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-4" style={serif}>
              Post a role or unlock full access with Pro.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Single job posts from $49. School Unlimited $299/year. Full profile access with Pro.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/matchhub/post-job" className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap">
              Post a Job
            </Link>
            <button onClick={() => setShowProGate(true)} className="border border-white/30 text-white text-sm px-10 py-3 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center whitespace-nowrap">
              Unlock with Pro &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── MODALS ───────────────────────────────────────────────────────── */}
      {showProGate && (
        <ProGateModal onBack={() => setShowProGate(false)} onActivate={() => { setIsPro(true); setShowProGate(false) }} />
      )}
      {selectedGuide && isPro && (
        <ProfileModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
      )}
    </>
  )
}

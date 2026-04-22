'use client'

import { useEffect, useState, useCallback } from 'react'
import type { Job, GuideProfile } from '@/lib/types/matchhub'
import type { Search, SearchRole } from '@/lib/types/searches'
import type { TalentProfile } from '@/lib/types/talent-pool'
import type { Partner } from '@/lib/types/partners'
import type { CommunityOrg } from '@/lib/types/community'

const toSlug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ─── Course registry ──────────────────────────────────────────────────────────
// course.id must match the course_id used in the course platform's
// courseRegistry / products.ts. All platform URLs are derived from
// NEXT_PUBLIC_COURSE_PLATFORM_URL (set in .env.local).
const COURSES = [
  {
    id: 'montessori-meets-science-of-reading',
    name: 'Montessori Meets Science of Reading',
    price: '$250',
    hours: '7 hours',
    stripeLink: 'https://buy.stripe.com/eVqdRbgmA7T24sDgk92cg0b',
  },
  {
    id: 'montessori-math-materials-to-mastery',
    name: 'Montessori Math: Materials to Mastery',
    price: '$250',
    hours: '7 hours',
    stripeLink: 'https://buy.stripe.com/eVqeVf9Ycc9i2kvd7X2cg0c',
  },
  {
    id: 'adult-culture-montessori-practice',
    name: 'Adult Culture & Montessori Practice',
    price: '$250',
    hours: '7 hours',
    stripeLink: 'https://buy.stripe.com/6oU8wR7Q40qA0cn1pf2cg0d',
  },
  {
    id: 'art-of-observation',
    name: 'The Art of Observation',
    price: '$250',
    hours: '7 hours',
    stripeLink: 'https://buy.stripe.com/7sYdRbfiw0qAe3daZP2cg0e',
  },
  {
    id: 'equity-in-montessori',
    name: 'Equity in Montessori: A Practitioner Course',
    price: '$250',
    hours: '7 hours',
    stripeLink: 'https://buy.stripe.com/bJeaEZ2vK1uE2kvc3T2cg0f',
  },
]

const PLATFORM_BASE = process.env.NEXT_PUBLIC_COURSE_PLATFORM_URL ?? 'http://localhost:3002'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function isExpired(job: Job) {
  return !!job.expires_at && new Date(job.expires_at) < new Date()
}

// ─── Badges ───────────────────────────────────────────────────────────────────
function StatusBadge({ status, expired }: { status: string; expired?: boolean }) {
  const label = expired ? 'expired' : status
  const s: Record<string, string> = {
    pending:  'bg-yellow-50 text-yellow-700 border-yellow-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-600 border-red-200',
    archived: 'bg-gray-100 text-gray-500 border-gray-200',
    expired:  'bg-orange-50 text-orange-600 border-orange-200',
  }
  return (
    <span className={`inline-block text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 border ${s[label] ?? s.pending}`}>
      {label}
    </span>
  )
}

// ─── Tiny action button ───────────────────────────────────────────────────────
function Btn({ label, onClick, loading, color }: {
  label: string; onClick: () => void; loading: boolean
  color: 'navy' | 'red' | 'gray'
}) {
  const c = { navy: 'bg-[#0e1a7a] text-white hover:bg-[#162270]', red: 'bg-red-600 text-white hover:bg-red-700', gray: 'bg-gray-200 text-gray-700 hover:bg-gray-300' }
  return (
    <button onClick={onClick} disabled={loading}
      className={`text-[11px] font-medium px-3 py-1.5 transition-colors disabled:opacity-40 ${c[color]}`}>
      {loading ? '…' : label}
    </button>
  )
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type Tab = 'institute' | 'courses' | 'jobs' | 'profiles' | 'searches' | 'talent' | 'partners' | 'community'

interface InstituteSetting {
  course_slug: string
  course_title: string
  registration_open: boolean
  updated_at: string
}
interface InstituteRegistration {
  id: string
  course_slug: string
  course_title: string
  name: string
  email: string
  phone: string | null
  organization: string | null
  role: string | null
  notes: string | null
  status: string
  created_at: string
}
type JobFilter = 'all' | 'pending' | 'approved' | 'rejected' | 'archived' | 'expired'
type ProfileFilter = 'all' | 'pending' | 'approved' | 'rejected'

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const ADMIN_EMAIL = 'hannah@montessorimakers.org'

  const [auth, setAuth] = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)

  const [tab, setTab] = useState<Tab>('institute')

  // Institute state
  const [instituteSettings, setInstituteSettings] = useState<InstituteSetting[]>([])
  const [instituteRegs, setInstituteRegs] = useState<InstituteRegistration[]>([])
  const [instituteLoading, setInstituteLoading] = useState(false)
  const [instituteToggling, setInstituteToggling] = useState<string | null>(null)
  const [instituteError, setInstituteError] = useState<string | null>(null)

  const loadInstitute = useCallback(async (pw: string) => {
    setInstituteLoading(true)
    setInstituteError(null)
    try {
      const [settingsRes, regsRes] = await Promise.all([
        fetch('/api/institute/course-settings', {
          headers: { 'x-admin-key': pw },
        }),
        fetch('/api/admin/institute-registrations', {
          headers: { 'x-admin-pw': pw, 'x-admin-email': 'hannah@montessorimakers.org' },
        }),
      ])
      if (settingsRes.ok) {
        const d = await settingsRes.json()
        setInstituteSettings(d.settings ?? [])
      }
      if (regsRes.ok) {
        const d = await regsRes.json()
        setInstituteRegs(d.registrations ?? [])
      }
    } catch {
      setInstituteError('Failed to load institute data')
    } finally {
      setInstituteLoading(false)
    }
  }, [ADMIN_EMAIL])

  const toggleRegistration = async (slug: string, currentOpen: boolean) => {
    setInstituteToggling(slug)
    try {
      const res = await fetch('/api/institute/course-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminPw },
        body: JSON.stringify({ course_slug: slug, registration_open: !currentOpen }),
      })
      if (res.ok) {
        setInstituteSettings(prev =>
          prev.map(s => s.course_slug === slug ? { ...s, registration_open: !currentOpen } : s)
        )
      }
    } finally {
      setInstituteToggling(null)
    }
  }

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobsLoading, setJobsLoading] = useState(false)
  const [jobFilter, setJobFilter] = useState<JobFilter>('all')
  const [actingJob, setActingJob] = useState<Record<string, string>>({})

  // Profiles state
  const [profiles, setProfiles] = useState<GuideProfile[]>([])
  const [profilesLoading, setProfilesLoading] = useState(false)
  const [profileFilter, setProfileFilter] = useState<ProfileFilter>('all')
  const [actingProfile, setActingProfile] = useState<Record<string, string>>({})

  // Current Searches state
  const [searches, setSearches] = useState<Search[]>([])
  const [searchesLoading, setSearchesLoading] = useState(false)
  const [expandedSearch, setExpandedSearch] = useState<string | null>(null)
  const [showNewSearchForm, setShowNewSearchForm] = useState(false)
  const [newSearch, setNewSearch] = useState({ school_name: '', school_slug: '', school_website: '', school_logo_url: '', school_blurb: '', active: true })
  type DraftRole = { title: string; role_slug: string; description: string; apply_method: 'upload' | 'link' | 'email'; apply_url: string; apply_email: string; job_description_pdf: string; active: boolean }
  const [newSearchRoles, setNewSearchRoles] = useState<DraftRole[]>([])
  const [showNewSearchRoleForm, setShowNewSearchRoleForm] = useState(false)
  const [newSearchRole, setNewSearchRole] = useState<DraftRole>({ title: '', role_slug: '', description: '', apply_method: 'upload', apply_url: '', apply_email: '', job_description_pdf: '', active: true })
  const [editingSearch, setEditingSearch] = useState<string | null>(null)
  const [editSearchData, setEditSearchData] = useState<Partial<Search>>({})
  const [actingSearch, setActingSearch] = useState<Record<string, string>>({})
  const [showNewRoleForm, setShowNewRoleForm] = useState<string | null>(null)
  const [newRole, setNewRole] = useState({ title: '', role_slug: '', description: '', apply_method: 'upload' as 'upload' | 'link' | 'email', apply_url: '', apply_email: '', job_description_pdf: '', active: true })
  const [editingRole, setEditingRole] = useState<string | null>(null)
  const [editRoleData, setEditRoleData] = useState<Partial<SearchRole>>({})
  const [actingRole, setActingRole] = useState<Record<string, string>>({})
  const [uploadingPdf, setUploadingPdf] = useState<string | null>(null)

  // Talent Pool state
  const [talentProfiles, setTalentProfiles] = useState<TalentProfile[]>([])
  const [talentLoading, setTalentLoading] = useState(false)
  const [showNewTalentForm, setShowNewTalentForm] = useState(false)
  const [newTalent, setNewTalent] = useState({ candidate_id: '', full_name: '', internal_email: '', resume_url: '', private_notes: '', display_title: '', training: '', years_experience: '', levels: '', region: '', open_to_relocate: false, public_summary: '', tags: '', photo_url: '', active: true })
  const [editingTalent, setEditingTalent] = useState<string | null>(null)
  const [editTalentData, setEditTalentData] = useState<Partial<TalentProfile & { levels_raw: string; tags_raw: string }>>({})
  const [actingTalent, setActingTalent] = useState<Record<string, string>>({})

  // Partners state
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnersLoading, setPartnersLoading] = useState(false)
  const [showNewPartnerForm, setShowNewPartnerForm] = useState(false)
  const [newPartner, setNewPartner] = useState({ partner_name: '', logo_image: '', website_url: '', short_description: '', category: 'organization' as Partner['category'], display_order: 0, is_featured: false, is_published: true })
  const [editingPartner, setEditingPartner] = useState<string | null>(null)
  const [editPartnerData, setEditPartnerData] = useState<Partial<Partner>>({})
  const [actingPartner, setActingPartner] = useState<Record<string, string>>({})

  // Community orgs state
  const [communityOrgs, setCommunityOrgs] = useState<CommunityOrg[]>([])
  const [communityLoading, setCommunityLoading] = useState(false)
  const [showNewCommunityForm, setShowNewCommunityForm] = useState(false)
  const [newCommunityOrg, setNewCommunityOrg] = useState({ name: '', logo_url: '', website_url: '', blurb: '', display_order: 0, published: true })
  const [editingCommunityOrg, setEditingCommunityOrg] = useState<string | null>(null)
  const [editCommunityData, setEditCommunityData] = useState<Partial<CommunityOrg>>({})
  const [actingCommunity, setActingCommunity] = useState<Record<string, string>>({})

  // Course enrollment stats from course platform
  const [enrollmentStats, setEnrollmentStats] = useState<{
    enrollments: Record<string, number>
    purchases: Record<string, number>
    unclaimed: Record<string, number>
  } | null>(null)
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)

  // Restore session
  useEffect(() => {
    const saved = localStorage.getItem('adminPw')
    if (saved) { setAdminPw(saved); setAuth(true) }
  }, [])

  const loadJobs = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setJobsLoading(true)
    try {
      const res = await fetch('/api/admin/jobs', { headers: { 'x-admin-password': password } })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setJobs(await res.json())
    } catch { setError('Could not load jobs.') }
    finally { setJobsLoading(false) }
  }, [adminPw])

  const loadProfiles = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setProfilesLoading(true)
    try {
      const res = await fetch('/api/admin/profiles', { headers: { 'x-admin-password': password } })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setProfiles(await res.json())
    } catch { setError('Could not load profiles.') }
    finally { setProfilesLoading(false) }
  }, [adminPw])

  const loadSearches = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setSearchesLoading(true)
    try {
      const res = await fetch('/api/admin/searches', { headers: { 'x-admin-password': password } })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setSearches(await res.json())
    } catch { setError('Could not load searches.') }
    finally { setSearchesLoading(false) }
  }, [adminPw])

  const loadTalent = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setTalentLoading(true)
    try {
      const res = await fetch('/api/admin/talent-pool', { headers: { 'x-admin-password': password } })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setTalentProfiles(await res.json())
    } catch { setError('Could not load talent profiles.') }
    finally { setTalentLoading(false) }
  }, [adminPw])

  const loadPartners = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setPartnersLoading(true)
    try {
      const res = await fetch('/api/admin/partners', { headers: { 'x-admin-password': password } })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setPartners(await res.json())
    } catch { setError('Could not load partners.') }
    finally { setPartnersLoading(false) }
  }, [adminPw])

  const loadCommunity = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setCommunityLoading(true)
    try {
      const res = await fetch('/api/admin/community', { headers: { 'x-admin-password': password } })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setCommunityOrgs(await res.json())
    } catch { setError('Could not load community organizations.') }
    finally { setCommunityLoading(false) }
  }, [adminPw])

  const loadEnrollments = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setEnrollmentsLoading(true)
    try {
      const res = await fetch(`${PLATFORM_BASE}/api/admin/enrollments`, {
        headers: { 'x-admin-password': password },
      })
      if (!res.ok) return // course platform may not be running — fail silently
      setEnrollmentStats(await res.json())
    } catch {
      // Course platform offline or CORS — ignore, stats will show as unavailable
    } finally {
      setEnrollmentsLoading(false)
    }
  }, [adminPw])

  function handleExpired() {
    setAuth(false)
    localStorage.removeItem('adminPw')
    setError('Session expired — please log in again.')
  }

  useEffect(() => {
    if (auth) { loadJobs(); loadProfiles(); loadEnrollments(); loadSearches(); loadTalent(); loadPartners(); loadCommunity(); loadInstitute(adminPw) }
  }, [auth, loadJobs, loadProfiles, loadEnrollments, loadSearches, loadTalent, loadCommunity, loadInstitute, adminPw])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setPwError(null)
    if (emailInput.trim().toLowerCase() !== ADMIN_EMAIL) {
      setPwError('Unrecognized email address.')
      return
    }
    const res = await fetch('/api/admin/jobs', { headers: { 'x-admin-password': pwInput } })
    if (res.status === 401) { setPwError('Incorrect password.'); return }
    const data = await res.json()
    localStorage.setItem('adminPw', pwInput)
    setAdminPw(pwInput)
    setAuth(true)
    setJobs(data)
    setJobsLoading(false)
    loadProfiles(pwInput)
    loadEnrollments(pwInput)
    loadSearches(pwInput)
    loadTalent(pwInput)
    loadPartners(pwInput)
    loadCommunity(pwInput)
    loadInstitute(pwInput)
  }

  async function handleJobAction(jobId: string, action: 'approve' | 'reject' | 'archive') {
    setActingJob(prev => ({ ...prev, [jobId]: action }))
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ action }),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setJobs(prev => prev.map(j => {
        if (j.id !== jobId) return j
        const now = new Date().toISOString()
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        if (action === 'approve') return { ...j, status: 'approved', approved_at: now, expires_at: expires }
        if (action === 'reject')  return { ...j, status: 'rejected' }
        if (action === 'archive') return { ...j, status: 'archived' }
        return j
      }))
    } catch { setError(`Job action failed. Try again.`) }
    finally { setActingJob(prev => { const n = { ...prev }; delete n[jobId]; return n }) }
  }

  async function handleProfileAction(profileId: string, action: 'approve' | 'reject') {
    setActingProfile(prev => ({ ...prev, [profileId]: action }))
    try {
      const res = await fetch(`/api/admin/profiles/${profileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ action }),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setProfiles(prev => prev.map(p =>
        p.id === profileId ? { ...p, status: action === 'approve' ? 'approved' : 'rejected' } : p
      ))
    } catch { setError(`Profile action failed. Try again.`) }
    finally { setActingProfile(prev => { const n = { ...prev }; delete n[profileId]; return n }) }
  }

  // ── Partners CRUD ─────────────────────────────────────────────────────────────

  async function handleCreatePartner() {
    setActingPartner(prev => ({ ...prev, new: 'creating' }))
    try {
      const res = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(newPartner),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setShowNewPartnerForm(false)
      setNewPartner({ partner_name: '', logo_image: '', website_url: '', short_description: '', category: 'organization', display_order: 0, is_featured: false, is_published: true })
      await loadPartners()
    } catch { setError('Could not create partner.') }
    finally { setActingPartner(prev => { const n = { ...prev }; delete n.new; return n }) }
  }

  async function handleUpdatePartner(id: string) {
    setActingPartner(prev => ({ ...prev, [id]: 'saving' }))
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(editPartnerData),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setEditingPartner(null)
      await loadPartners()
    } catch { setError('Could not update partner.') }
    finally { setActingPartner(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  async function handleDeletePartner(id: string) {
    if (!confirm('Delete this partner? This cannot be undone.')) return
    setActingPartner(prev => ({ ...prev, [id]: 'deleting' }))
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPw },
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setPartners(prev => prev.filter(p => p.id !== id))
    } catch { setError('Could not delete partner.') }
    finally { setActingPartner(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  async function handleTogglePartner(id: string, field: 'is_published' | 'is_featured', current: boolean) {
    setActingPartner(prev => ({ ...prev, [id]: field }))
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ [field]: !current }),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setPartners(prev => prev.map(p => p.id === id ? { ...p, [field]: !current } : p))
    } catch { setError('Could not update partner.') }
    finally { setActingPartner(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  // ── Community Orgs CRUD ───────────────────────────────────────────────────────

  async function handleCreateCommunityOrg() {
    setActingCommunity(prev => ({ ...prev, new: 'creating' }))
    try {
      const res = await fetch('/api/admin/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(newCommunityOrg),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setShowNewCommunityForm(false)
      setNewCommunityOrg({ name: '', logo_url: '', website_url: '', blurb: '', display_order: 0, published: true })
      await loadCommunity()
    } catch { setError('Could not create organization.') }
    finally { setActingCommunity(prev => { const n = { ...prev }; delete n.new; return n }) }
  }

  async function handleUpdateCommunityOrg(id: string) {
    setActingCommunity(prev => ({ ...prev, [id]: 'saving' }))
    try {
      const res = await fetch(`/api/admin/community/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(editCommunityData),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setEditingCommunityOrg(null)
      await loadCommunity()
    } catch { setError('Could not update organization.') }
    finally { setActingCommunity(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  async function handleDeleteCommunityOrg(id: string) {
    if (!confirm('Delete this organization? This cannot be undone.')) return
    setActingCommunity(prev => ({ ...prev, [id]: 'deleting' }))
    try {
      const res = await fetch(`/api/admin/community/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPw },
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setCommunityOrgs(prev => prev.filter(o => o.id !== id))
    } catch { setError('Could not delete organization.') }
    finally { setActingCommunity(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  async function handleToggleCommunityOrg(id: string, current: boolean) {
    setActingCommunity(prev => ({ ...prev, [id]: 'published' }))
    try {
      const res = await fetch(`/api/admin/community/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ published: !current }),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setCommunityOrgs(prev => prev.map(o => o.id === id ? { ...o, published: !current } : o))
    } catch { setError('Could not update organization.') }
    finally { setActingCommunity(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  // ── PDF Upload ────────────────────────────────────────────────────────────────

  async function handlePdfUpload(file: File, key: string, onSuccess: (url: string) => void) {
    setUploadingPdf(key)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/upload-pdf', {
        method: 'POST',
        headers: { 'x-admin-password': adminPw },
        body: form,
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) { const e = await res.json(); setError(e.error ?? 'PDF upload failed.'); return }
      const { url } = await res.json()
      onSuccess(url)
    } catch { setError('PDF upload failed.') }
    finally { setUploadingPdf(null) }
  }

  // ── Search CRUD ──────────────────────────────────────────────────────────────

  async function handleCreateSearch() {
    setActingSearch(prev => ({ ...prev, new: 'creating' }))
    try {
      const res = await fetch('/api/admin/searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(newSearch),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      const { id: searchId } = await res.json()
      for (const role of newSearchRoles) {
        await fetch(`/api/admin/searches/${searchId}/roles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
          body: JSON.stringify({ ...role, search_id: searchId }),
        })
      }
      setShowNewSearchForm(false)
      setNewSearch({ school_name: '', school_slug: '', school_website: '', school_logo_url: '', school_blurb: '', active: true })
      setNewSearchRoles([])
      setShowNewSearchRoleForm(false)
      await loadSearches()
    } catch { setError('Could not create search.') }
    finally { setActingSearch(prev => { const n = { ...prev }; delete n.new; return n }) }
  }

  async function handleUpdateSearch(id: string) {
    setActingSearch(prev => ({ ...prev, [id]: 'saving' }))
    try {
      const res = await fetch(`/api/admin/searches/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(editSearchData),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setEditingSearch(null)
      await loadSearches()
    } catch { setError('Could not update search.') }
    finally { setActingSearch(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  async function handleDeleteSearch(id: string) {
    if (!confirm('Delete this search and all its roles? This cannot be undone.')) return
    setActingSearch(prev => ({ ...prev, [id]: 'deleting' }))
    try {
      const res = await fetch(`/api/admin/searches/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPw },
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setSearches(prev => prev.filter(s => s.id !== id))
    } catch { setError('Could not delete search.') }
    finally { setActingSearch(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  async function handleCreateRole(searchId: string) {
    setActingRole(prev => ({ ...prev, [`${searchId}-new`]: 'creating' }))
    try {
      const res = await fetch(`/api/admin/searches/${searchId}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ ...newRole, search_id: searchId }),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setShowNewRoleForm(null)
      setNewRole({ title: '', role_slug: '', description: '', apply_method: 'upload', apply_url: '', apply_email: '', job_description_pdf: '', active: true })
      await loadSearches()
    } catch { setError('Could not create role.') }
    finally { setActingRole(prev => { const n = { ...prev }; delete n[`${searchId}-new`]; return n }) }
  }

  async function handleUpdateRole(searchId: string, roleId: string) {
    setActingRole(prev => ({ ...prev, [roleId]: 'saving' }))
    try {
      const res = await fetch(`/api/admin/searches/${searchId}/roles/${roleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(editRoleData),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setEditingRole(null)
      await loadSearches()
    } catch { setError('Could not update role.') }
    finally { setActingRole(prev => { const n = { ...prev }; delete n[roleId]; return n }) }
  }

  async function handleDeleteRole(searchId: string, roleId: string) {
    if (!confirm('Delete this role?')) return
    setActingRole(prev => ({ ...prev, [roleId]: 'deleting' }))
    try {
      const res = await fetch(`/api/admin/searches/${searchId}/roles/${roleId}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPw },
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setSearches(prev => prev.map(s =>
        s.id === searchId
          ? { ...s, roles: (s.roles ?? []).filter(r => r.id !== roleId) }
          : s
      ))
    } catch { setError('Could not delete role.') }
    finally { setActingRole(prev => { const n = { ...prev }; delete n[roleId]; return n }) }
  }

  // ── Talent CRUD ───────────────────────────────────────────────────────────────

  async function handleCreateTalent() {
    setActingTalent(prev => ({ ...prev, new: 'creating' }))
    try {
      const levelsArr = newTalent.levels.split(',').map(s => s.trim()).filter(Boolean)
      const tagsArr = newTalent.tags.split(',').map(s => s.trim()).filter(Boolean)
      const res = await fetch('/api/admin/talent-pool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ ...newTalent, levels: levelsArr, tags: tagsArr }),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setShowNewTalentForm(false)
      setNewTalent({ candidate_id: '', full_name: '', internal_email: '', resume_url: '', private_notes: '', display_title: '', training: '', years_experience: '', levels: '', region: '', open_to_relocate: false, public_summary: '', tags: '', photo_url: '', active: true })
      await loadTalent()
    } catch { setError('Could not create talent profile.') }
    finally { setActingTalent(prev => { const n = { ...prev }; delete n.new; return n }) }
  }

  async function handleUpdateTalent(id: string) {
    setActingTalent(prev => ({ ...prev, [id]: 'saving' }))
    try {
      const data = { ...editTalentData }
      if (typeof (data as Record<string, unknown>).levels_raw === 'string') {
        data.levels = ((data as Record<string, unknown>).levels_raw as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        delete (data as Record<string, unknown>).levels_raw
      }
      if (typeof (data as Record<string, unknown>).tags_raw === 'string') {
        data.tags = ((data as Record<string, unknown>).tags_raw as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        delete (data as Record<string, unknown>).tags_raw
      }
      const res = await fetch(`/api/admin/talent-pool/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify(data),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setEditingTalent(null)
      await loadTalent()
    } catch { setError('Could not update talent profile.') }
    finally { setActingTalent(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  async function handleDeleteTalent(id: string) {
    if (!confirm('Delete this talent profile? This cannot be undone.')) return
    setActingTalent(prev => ({ ...prev, [id]: 'deleting' }))
    try {
      const res = await fetch(`/api/admin/talent-pool/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': adminPw },
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setTalentProfiles(prev => prev.filter(t => t.id !== id))
    } catch { setError('Could not delete talent profile.') }
    finally { setActingTalent(prev => { const n = { ...prev }; delete n[id]; return n }) }
  }

  // Derived
  const visibleJobs = jobs.filter(j => {
    if (jobFilter === 'all') return true
    if (jobFilter === 'pending')  return j.status === 'pending'
    if (jobFilter === 'approved') return j.status === 'approved' && !isExpired(j)
    if (jobFilter === 'rejected') return j.status === 'rejected'
    if (jobFilter === 'archived') return j.status === 'archived'
    if (jobFilter === 'expired')  return j.status === 'approved' && isExpired(j)
    return true
  })

  const visibleProfiles = profiles.filter(p => {
    if (profileFilter === 'all') return true
    return p.status === profileFilter
  })

  const pendingJobs     = jobs.filter(j => j.status === 'pending').length
  const pendingProfiles = profiles.filter(p => p.status === 'pending').length

  // ── Login gate ───────────────────────────────────────────────────────────────
  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 text-center">Montessori Makers Group</p>
          <h1 className="text-xl font-semibold text-gray-900 text-center mb-8">Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Email address"
              autoFocus
              autoComplete="email"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0e1a7a] transition-colors"
            />
            <input
              type="password"
              value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0e1a7a] transition-colors"
            />
            {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
            <button type="submit"
              className="w-full bg-[#0e1a7a] text-white text-sm py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium">
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Montessori Makers Group</p>
            <h1 className="text-2xl font-semibold text-gray-900">Admin</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            {pendingJobs > 0 && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {pendingJobs} job{pendingJobs > 1 ? 's' : ''} pending
              </span>
            )}
            {pendingProfiles > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {pendingProfiles} profile{pendingProfiles > 1 ? 's' : ''} pending
              </span>
            )}
            <button
              onClick={() => { localStorage.removeItem('adminPw'); setAuth(false) }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 flex items-center justify-between rounded">
            {error}
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 ml-4 text-lg leading-none">×</button>
          </div>
        )}

        {/* Quick links */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={async () => {
              await fetch('/api/careers/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: adminPw }),
              })
              window.location.href = '/admin/careers'
            }}
            className="text-xs border border-[#0e1a7a] text-[#0e1a7a] px-4 py-2 hover:bg-[#0e1a7a] hover:text-white transition-colors"
          >
            Careers Admin →
          </button>
          <button
            onClick={() => { window.location.href = '/admin/candidates' }}
            className="text-xs border border-[#0e1a7a] text-[#0e1a7a] px-4 py-2 hover:bg-[#0e1a7a] hover:text-white transition-colors"
          >
            Candidate Discovery →
          </button>
          <button
            onClick={() => { window.location.href = '/admin/placement-crm' }}
            className="text-xs border border-[#060d3a] text-[#060d3a] px-4 py-2 hover:bg-[#060d3a] hover:text-white transition-colors"
          >
            Placement CRM →
          </button>
          <button
            onClick={() => { window.location.href = '/admin/interim-leaders' }}
            className="text-xs border border-[#0e1a7a] text-[#0e1a7a] px-4 py-2 hover:bg-[#0e1a7a] hover:text-white transition-colors"
          >
            Interim Leaders →
          </button>
          <button
            onClick={() => { navigator.clipboard.writeText('https://montessorimakersgroup.org/interim-leader-profile') }}
            className="text-xs border border-gray-200 bg-gray-50 text-gray-500 px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-colors font-mono"
            title="Copy intake form link"
          >
            📋 /interim-leader-profile
          </button>
          <button
            onClick={() => { window.location.href = '/matchhub/match' }}
            className="text-xs border border-emerald-600 bg-emerald-50 text-emerald-700 px-4 py-2 hover:bg-emerald-600 hover:text-white transition-colors"
          >
            Match Engine →
          </button>
          <button
            onClick={() => { window.location.href = '/admin/second-brain' }}
            className="text-xs border border-[#d6a758] bg-[#f5e8cc] text-[#0e1a7a] px-4 py-2 hover:bg-[#d6a758] hover:text-white transition-colors"
          >
            Second Brain →
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
          {([
            { key: 'institute', label: 'Institute', count: instituteRegs.length, badge: instituteRegs.filter(r => r.status === 'registered').length > 0 ? instituteRegs.filter(r => r.status === 'registered').length : undefined },
            { key: 'courses', label: 'Async Courses', count: COURSES.length },
            { key: 'jobs',    label: 'MatchHub Jobs', count: jobs.length, badge: pendingJobs },
            { key: 'profiles', label: 'Educator Profiles', count: profiles.length, badge: pendingProfiles },
            { key: 'searches', label: 'Current Searches', count: searches.length },
            { key: 'talent', label: 'Talent Pool', count: talentProfiles.length },
            { key: 'partners', label: 'Partners', count: partners.length },
            { key: 'community', label: 'In Community With', count: communityOrgs.length },
          ] as { key: Tab; label: string; count: number; badge?: number }[]).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 text-sm px-4 py-3 border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-[#0e1a7a] text-[#0e1a7a] font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
              <span className="text-[10px] text-gray-400">({t.count})</span>
              {(t.badge ?? 0) > 0 && (
                <span className="bg-yellow-400 text-yellow-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── INSTITUTE TAB ───────────────────────────────────────────────────── */}
        {tab === 'institute' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Institute — Live Course Registrations</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Toggle registration open/closed per course. Closes automatically Sunday before each course starts (manual for now).
                </p>
              </div>
              <button onClick={() => loadInstitute(adminPw)} className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5">
                ↻ Refresh
              </button>
            </div>

            {instituteError && (
              <div className="bg-red-50 border border-red-100 px-4 py-3 text-xs text-red-700 mb-6">{instituteError}</div>
            )}

            {/* Registration toggles */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Registration Status</p>
              <div className="space-y-2">
                {instituteSettings.length === 0 && !instituteLoading && (
                  <p className="text-xs text-gray-400">No courses found.</p>
                )}
                {instituteSettings.map(s => {
                  const regsForCourse = instituteRegs.filter(r => r.course_slug === s.course_slug)
                  return (
                    <div key={s.course_slug} className="bg-white border border-gray-200 px-5 py-4 flex items-center justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{s.course_title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {regsForCourse.length} registration{regsForCourse.length !== 1 ? 's' : ''}
                          {' · '}updated {new Date(s.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleRegistration(s.course_slug, s.registration_open)}
                        disabled={instituteToggling === s.course_slug}
                        className={`flex items-center gap-2 text-xs px-4 py-2 font-medium transition-colors disabled:opacity-40 ${
                          s.registration_open
                            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${s.registration_open ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {instituteToggling === s.course_slug ? '…' : s.registration_open ? 'Open — click to close' : 'Closed — click to open'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Registrations list */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                All Registrations ({instituteRegs.length})
              </p>
              {instituteLoading && <p className="text-xs text-gray-400">Loading…</p>}
              {!instituteLoading && instituteRegs.length === 0 && (
                <p className="text-xs text-gray-400">No registrations yet.</p>
              )}
              {instituteRegs.length > 0 && (
                <div className="border border-gray-200 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {['Name', 'Email', 'Phone', 'Organization', 'Role', 'Course', 'Registered'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {instituteRegs.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{r.name}</td>
                          <td className="px-4 py-3 text-gray-600">
                            <a href={`mailto:${r.email}`} className="hover:underline text-[#0e1a7a]">{r.email}</a>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{r.phone ?? '—'}</td>
                          <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{r.organization ?? '—'}</td>
                          <td className="px-4 py-3 text-gray-500">{r.role ?? '—'}</td>
                          <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">{r.course_title}</td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                            {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── COURSES TAB ─────────────────────────────────────────────────────── */}
        {tab === 'courses' && (
          <div>
            {/* Login notice */}
            <div className="bg-blue-50 border border-blue-100 px-4 py-3 mb-6 flex items-start gap-3">
              <span className="text-blue-400 mt-0.5 text-base leading-none">ℹ</span>
              <p className="text-xs text-blue-700 leading-relaxed">
                <span className="font-semibold">Course platform login is separate.</span>{' '}
                &ldquo;Open Course →&rdquo; links open on the course platform at{' '}
                <code className="bg-blue-100 px-1 rounded">{PLATFORM_BASE}</code>.
                You must be signed in there as <span className="font-medium">hannah@montessorimakers.org</span> for the links to work.
                If you&apos;re not logged in, you&apos;ll be taken to the course platform login page and redirected
                to your course automatically after signing in.
              </p>
            </div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">5 async courses · $250 each · 90-day access (customers) · Lifetime access (you)</p>
              <div className="flex items-center gap-3">
                {enrollmentsLoading && <span className="text-xs text-gray-400">Loading stats…</span>}
                {!enrollmentsLoading && !enrollmentStats && (
                  <span className="text-xs text-orange-500">Course platform offline — stats unavailable</span>
                )}
                <button
                  onClick={() => loadEnrollments()}
                  className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5"
                >↻ Refresh stats</button>
                <a
                  href={`${PLATFORM_BASE}/admin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0e1a7a] hover:underline"
                >
                  Course platform admin ↗
                </a>
              </div>
            </div>
            <div className="space-y-3">
              {COURSES.map(course => {
                const enrolled = enrollmentStats?.enrollments[course.id] ?? null
                const purchased = enrollmentStats?.purchases[course.id] ?? null
                const unclaimed = enrollmentStats?.unclaimed[course.id] ?? null
                const platformUrl = `${PLATFORM_BASE}/course?id=${course.id}`
                return (
                  <div key={course.id} className="bg-white border border-gray-200 px-6 py-5 flex items-center justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{course.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{course.hours} &middot; {course.price} &middot; Async, self-paced</p>
                      {enrollmentStats && (
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[11px] text-gray-500">
                            <span className="font-semibold text-gray-800">{enrolled ?? 0}</span> enrolled
                          </span>
                          <span className="text-[11px] text-gray-500">
                            <span className="font-semibold text-gray-800">{purchased ?? 0}</span> purchases
                          </span>
                          {(unclaimed ?? 0) > 0 && (
                            <span className="text-[11px] text-orange-600 font-medium">
                              {unclaimed} unclaimed
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <a
                        href={course.stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 transition-colors"
                      >
                        Stripe ↗
                      </a>
                      <a
                        href={platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] bg-[#0e1a7a] text-white hover:bg-[#162270] px-3 py-1.5 transition-colors"
                      >
                        Open Course →
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
              Course platform: <code className="bg-gray-100 px-1 rounded">{PLATFORM_BASE}</code> · Login: <span className="font-medium">hannah@montessorimakers.org</span> ·
              Update <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_COURSE_PLATFORM_URL</code> in .env.local when the platform is deployed.
            </p>
          </div>
        )}

        {/* ── JOBS TAB ────────────────────────────────────────────────────────── */}
        {tab === 'jobs' && (
          <div>
            {/* Filter row */}
            <div className="flex flex-wrap gap-1 mb-5 pb-4 border-b border-gray-200">
              {(['all','pending','approved','rejected','archived','expired'] as JobFilter[]).map(f => {
                const count =
                  f === 'all'      ? jobs.length :
                  f === 'pending'  ? jobs.filter(j => j.status === 'pending').length :
                  f === 'approved' ? jobs.filter(j => j.status === 'approved' && !isExpired(j)).length :
                  f === 'rejected' ? jobs.filter(j => j.status === 'rejected').length :
                  f === 'archived' ? jobs.filter(j => j.status === 'archived').length :
                  jobs.filter(j => j.status === 'approved' && isExpired(j)).length
                return (
                  <button key={f} onClick={() => setJobFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
                      jobFilter === f ? 'bg-[#0e1a7a] text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                    <span className={`ml-1.5 text-[10px] ${jobFilter === f ? 'text-white/70' : 'text-gray-400'}`}>{count}</span>
                  </button>
                )
              })}
              <button onClick={() => loadJobs()} className="ml-auto text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5">
                ↻ Refresh
              </button>
            </div>

            {jobsLoading ? (
              <p className="text-sm text-gray-400 py-16 text-center">Loading…</p>
            ) : visibleJobs.length === 0 ? (
              <p className="text-sm text-gray-400 py-16 text-center">No jobs match this filter.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-left">
                      {['School', 'Role', 'Payment', 'Status', 'Created', 'Expires', 'Actions'].map(h => (
                        <th key={h} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3 pr-5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleJobs.map(job => {
                      const expired = isExpired(job)
                      const loadingAction = actingJob[job.id]
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
                            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 border ${
                              job.payment_status === 'paid'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-gray-100 text-gray-500 border-gray-200'
                            }`}>{job.payment_status ?? 'unpaid'}</span>
                          </td>
                          <td className="py-3 pr-5">
                            <StatusBadge status={job.status} expired={expired && job.status === 'approved'} />
                          </td>
                          <td className="py-3 pr-5 text-xs text-gray-500 whitespace-nowrap">{fmt(job.created_at)}</td>
                          <td className="py-3 pr-5 text-xs text-gray-500 whitespace-nowrap">{fmt(job.expires_at)}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              {job.status !== 'approved' && (
                                <Btn label="Approve" color="navy" loading={loadingAction === 'approve'} onClick={() => handleJobAction(job.id, 'approve')} />
                              )}
                              {job.status !== 'rejected' && (
                                <Btn label="Reject" color="red" loading={loadingAction === 'reject'} onClick={() => handleJobAction(job.id, 'reject')} />
                              )}
                              {job.status !== 'archived' && (
                                <Btn label="Archive" color="gray" loading={loadingAction === 'archive'} onClick={() => handleJobAction(job.id, 'archive')} />
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
            <p className="text-xs text-gray-400 mt-6">{visibleJobs.length} record{visibleJobs.length !== 1 ? 's' : ''} shown. Refunds handled in Stripe dashboard.</p>
          </div>
        )}

        {/* ── PROFILES TAB ────────────────────────────────────────────────────── */}
        {tab === 'profiles' && (
          <div>
            <div className="flex flex-wrap gap-1 mb-5 pb-4 border-b border-gray-200">
              {(['all','pending','approved','rejected'] as ProfileFilter[]).map(f => {
                const count = f === 'all' ? profiles.length : profiles.filter(p => p.status === f).length
                return (
                  <button key={f} onClick={() => setProfileFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
                      profileFilter === f ? 'bg-[#0e1a7a] text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                    <span className={`ml-1.5 text-[10px] ${profileFilter === f ? 'text-white/70' : 'text-gray-400'}`}>{count}</span>
                  </button>
                )
              })}
              <button onClick={() => loadProfiles()} className="ml-auto text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5">↻ Refresh</button>
            </div>

            {profilesLoading ? (
              <p className="text-sm text-gray-400 py-16 text-center">Loading…</p>
            ) : visibleProfiles.length === 0 ? (
              <p className="text-sm text-gray-400 py-16 text-center">No profiles match this filter.</p>
            ) : (
              <div className="space-y-3">
                {visibleProfiles.map(profile => {
                  const loadingAction = actingProfile[profile.id]
                  return (
                    <div key={profile.id} className="bg-white border border-gray-200 px-6 py-5">
                      <div className="flex items-start justify-between gap-6">
                        {/* Profile info */}
                        <div className="flex items-start gap-4">
                          {profile.photo_url ? (
                            <img src={profile.photo_url} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-400 text-lg font-medium">{profile.first_name[0]}</span>
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-semibold text-gray-900 text-sm">{profile.first_name} {profile.last_initial}.</p>
                              <StatusBadge status={profile.status} />
                            </div>
                            <p className="text-xs text-gray-500 mb-1">
                              {profile.location} &middot; {profile.years_experience}y exp &middot; {profile.credential}
                            </p>
                            <p className="text-xs text-gray-500 mb-2">
                              {profile.levels?.join(', ')}
                              {profile.bilingual && ' · Bilingual'}
                              {profile.public_montessori && ' · Public Montessori'}
                              {profile.leadership_experience && ' · Leadership exp'}
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">{profile.summary}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          <div className="flex gap-2">
                            {profile.status !== 'approved' && (
                              <Btn label="Approve" color="navy" loading={loadingAction === 'approve'} onClick={() => handleProfileAction(profile.id, 'approve')} />
                            )}
                            {profile.status !== 'rejected' && (
                              <Btn label="Reject" color="red" loading={loadingAction === 'reject'} onClick={() => handleProfileAction(profile.id, 'reject')} />
                            )}
                          </div>
                          <div className="flex gap-3">
                            {profile.resume_url && (
                              <a href={profile.resume_url} target="_blank" rel="noopener noreferrer"
                                className="text-[11px] text-[#0e1a7a] hover:underline">Resume ↗</a>
                            )}
                            <p className="text-[11px] text-gray-400">{fmt(profile.created_at)}</p>
                          </div>
                          <a href={`mailto:${profile.email}`} className="text-[11px] text-gray-400 hover:text-gray-600">{profile.email}</a>
                        </div>
                      </div>

                      {/* Tags */}
                      {profile.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
                          {profile.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
            <p className="text-xs text-gray-400 mt-6">{visibleProfiles.length} profile{visibleProfiles.length !== 1 ? 's' : ''} shown.</p>
          </div>
        )}

        {/* ── CURRENT SEARCHES TAB ────────────────────────────────────────────── */}
        {tab === 'searches' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{searches.length} search{searches.length !== 1 ? 'es' : ''}</p>
              <div className="flex gap-3">
                <button onClick={() => loadSearches()} className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5">↻ Refresh</button>
                <button
                  onClick={() => setShowNewSearchForm(!showNewSearchForm)}
                  className="text-xs bg-[#0e1a7a] text-white px-4 py-2 hover:bg-[#162270] transition-colors"
                >
                  + New Search
                </button>
              </div>
            </div>

            {/* New search form */}
            {showNewSearchForm && (
              <div className="border border-[#0e1a7a] bg-white p-6 mb-6">
                <p className="text-sm font-semibold text-[#0e1a7a] mb-5">New Search</p>

                {/* School details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <input placeholder="School name *" value={newSearch.school_name} onChange={e => setNewSearch(p => ({ ...p, school_name: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <div>
                    <input placeholder="Page slug (e.g. sunrise-montessori) *" value={newSearch.school_slug} onChange={e => setNewSearch(p => ({ ...p, school_slug: toSlug(e.target.value) }))} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                    <p className="text-[10px] text-gray-400 mt-0.5">URL: /matchhub/current-searches/<span className="font-mono">{newSearch.school_slug || 'slug'}</span></p>
                  </div>
                  <div>
                    <input placeholder="School website (e.g. https://sunrisemontessori.org)" value={newSearch.school_website} onChange={e => setNewSearch(p => ({ ...p, school_website: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                    <p className="text-[10px] text-gray-400 mt-0.5">The school&apos;s own website — shown as an external link</p>
                  </div>
                  <input placeholder="Logo URL" value={newSearch.school_logo_url} onChange={e => setNewSearch(p => ({ ...p, school_logo_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <textarea placeholder="School blurb" value={newSearch.school_blurb} onChange={e => setNewSearch(p => ({ ...p, school_blurb: e.target.value }))} rows={2} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] col-span-2 resize-none" />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 mb-5">
                  <input type="checkbox" checked={newSearch.active} onChange={e => setNewSearch(p => ({ ...p, active: e.target.checked }))} className="accent-[#0e1a7a]" />
                  Active (visible publicly)
                </label>

                {/* Roles */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Roles</p>
                    {!showNewSearchRoleForm && (
                      <button onClick={() => setShowNewSearchRoleForm(true)} className="text-xs bg-[#0e1a7a] text-white px-3 py-1.5 hover:bg-[#162270] transition-colors">+ Add Role</button>
                    )}
                  </div>

                  {/* Draft roles list */}
                  {newSearchRoles.length > 0 && (
                    <div className="space-y-1.5 mb-3">
                      {newSearchRoles.map((role, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 px-3 py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-sm font-medium text-gray-800">{role.title}</span>
                            <span className="text-[10px] text-gray-400 font-mono">/{role.role_slug}</span>
                            <span className="text-[10px] text-gray-400">{role.apply_method}</span>
                            {role.job_description_pdf && <a href={role.job_description_pdf} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#0e1a7a] hover:underline">JD PDF ↗</a>}
                          </div>
                          <button onClick={() => setNewSearchRoles(r => r.filter((_, idx) => idx !== i))} className="text-[10px] text-red-400 hover:text-red-600 flex-shrink-0 ml-3">Remove</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline role form */}
                  {showNewSearchRoleForm && (
                    <div className="bg-gray-50 border border-gray-200 p-4 mb-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          placeholder="Role title *"
                          value={newSearchRole.title}
                          onChange={e => {
                            const title = e.target.value
                            const auto = toSlug(title)
                            setNewSearchRole(p => ({ ...p, title, role_slug: p.role_slug === '' || p.role_slug === toSlug(p.title) ? auto : p.role_slug }))
                          }}
                          className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]"
                        />
                        <div>
                          <input placeholder="Role slug *" value={newSearchRole.role_slug} onChange={e => setNewSearchRole(p => ({ ...p, role_slug: toSlug(e.target.value) }))} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                          <p className="text-[10px] text-gray-400 mt-0.5">Auto-filled from title — edit if needed</p>
                        </div>
                        <select value={newSearchRole.apply_method} onChange={e => setNewSearchRole(p => ({ ...p, apply_method: e.target.value as 'upload' | 'link' | 'email' }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] bg-white">
                          <option value="upload">Upload (form + file)</option>
                          <option value="link">External link</option>
                          <option value="email">Email</option>
                        </select>
                        {newSearchRole.apply_method === 'link' && <input placeholder="Apply URL" value={newSearchRole.apply_url} onChange={e => setNewSearchRole(p => ({ ...p, apply_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />}
                        {newSearchRole.apply_method === 'email' && <input placeholder="Apply email" value={newSearchRole.apply_email} onChange={e => setNewSearchRole(p => ({ ...p, apply_email: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />}
                        <textarea placeholder="Role description — shown publicly on the position page (strongly recommended)" value={newSearchRole.description} onChange={e => setNewSearchRole(p => ({ ...p, description: e.target.value }))} rows={4} className="border border-[#d6a758]/60 bg-[#fffdf7] px-3 py-2 text-sm focus:outline-none focus:border-[#d6a758] col-span-2 resize-none" />
                        <div className="col-span-2">
                          <p className="text-[11px] text-gray-500 mb-1.5 uppercase tracking-wide">Job Description PDF</p>
                          {newSearchRole.job_description_pdf ? (
                            <div className="flex items-center gap-3">
                              <a href={newSearchRole.job_description_pdf} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0e1a7a] hover:underline">PDF uploaded ↗</a>
                              <button type="button" onClick={() => setNewSearchRole(p => ({ ...p, job_description_pdf: '' }))} className="text-[10px] text-red-500 hover:underline">Remove</button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                              <input type="file" accept="application/pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handlePdfUpload(f, 'new-search-role', url => setNewSearchRole(p => ({ ...p, job_description_pdf: url }))) }} />
                              <span className={`inline-block text-xs px-3 py-1.5 border border-gray-300 text-gray-600 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors ${uploadingPdf === 'new-search-role' ? 'opacity-50 pointer-events-none' : ''}`}>
                                {uploadingPdf === 'new-search-role' ? 'Uploading…' : 'Choose PDF'}
                              </span>
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => {
                            if (!newSearchRole.title || !newSearchRole.role_slug) return
                            setNewSearchRoles(r => [...r, newSearchRole])
                            setNewSearchRole({ title: '', role_slug: '', description: '', apply_method: 'upload', apply_url: '', apply_email: '', job_description_pdf: '', active: true })
                            setShowNewSearchRoleForm(false)
                          }}
                          className="text-xs bg-[#0e1a7a] text-white px-3 py-1.5 hover:bg-[#162270] transition-colors"
                        >
                          Add to Search
                        </button>
                        <button onClick={() => setShowNewSearchRoleForm(false)} className="text-xs border border-gray-200 px-3 py-1.5 text-gray-600 hover:border-gray-400">Cancel</button>
                      </div>
                    </div>
                  )}

                  {newSearchRoles.length === 0 && !showNewSearchRoleForm && (
                    <p className="text-xs text-gray-400 mb-1">No roles added yet.</p>
                  )}
                </div>

                <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                  <Btn label="Create Search" color="navy" loading={!!actingSearch.new} onClick={handleCreateSearch} />
                  <Btn label="Cancel" color="gray" loading={false} onClick={() => { setShowNewSearchForm(false); setNewSearchRoles([]); setShowNewSearchRoleForm(false) }} />
                </div>
              </div>
            )}

            {searchesLoading ? (
              <p className="text-sm text-gray-400 py-16 text-center">Loading…</p>
            ) : searches.length === 0 ? (
              <p className="text-sm text-gray-400 py-16 text-center">No searches yet.</p>
            ) : (
              <div className="space-y-4">
                {searches.map(search => (
                  <div key={search.id} className="bg-white border border-gray-200">
                    {/* Search header */}
                    <div className="px-6 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={() => setExpandedSearch(expandedSearch === search.id ? null : search.id)}
                          className="text-gray-400 hover:text-gray-600 text-xs font-mono"
                        >
                          {expandedSearch === search.id ? '▼' : '▶'}
                        </button>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 text-sm">{search.school_name}</span>
                            <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 border ${search.active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                              {search.active ? 'active' : 'inactive'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">/matchhub/current-searches/{search.school_slug} · {(search.roles ?? []).length} role{(search.roles ?? []).length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Btn label="Edit" color="gray" loading={false} onClick={() => { setEditingSearch(search.id); setExpandedSearch(search.id); setEditSearchData({ school_name: search.school_name, school_slug: search.school_slug, school_website: search.school_website ?? '', school_logo_url: search.school_logo_url ?? '', school_blurb: search.school_blurb ?? '', active: search.active }) }} />
                        <Btn label="Delete" color="red" loading={actingSearch[search.id] === 'deleting'} onClick={() => handleDeleteSearch(search.id)} />
                      </div>
                    </div>

                    {/* Edit form */}
                    {editingSearch === search.id && (
                      <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 space-y-3">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Edit Search</p>
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="School name" value={editSearchData.school_name ?? ''} onChange={e => setEditSearchData(p => ({ ...p, school_name: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                          <div>
                            <input placeholder="Page slug (e.g. sunrise-montessori)" value={editSearchData.school_slug ?? ''} onChange={e => setEditSearchData(p => ({ ...p, school_slug: toSlug(e.target.value) }))} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                            <p className="text-[10px] text-gray-400 mt-0.5">Sets the URL: /matchhub/current-searches/<span className="font-mono">{editSearchData.school_slug || 'slug'}</span></p>
                          </div>
                          <div>
                            <input placeholder="School website (e.g. https://sunrisemontessori.org)" value={(editSearchData.school_website as string) ?? ''} onChange={e => setEditSearchData(p => ({ ...p, school_website: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                            <p className="text-[10px] text-gray-400 mt-0.5">The school&apos;s own website — shown as an external link</p>
                          </div>
                          <input placeholder="Logo URL" value={(editSearchData.school_logo_url as string) ?? ''} onChange={e => setEditSearchData(p => ({ ...p, school_logo_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                          <textarea placeholder="School blurb" value={(editSearchData.school_blurb as string) ?? ''} onChange={e => setEditSearchData(p => ({ ...p, school_blurb: e.target.value }))} rows={2} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] col-span-2 resize-none" />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={editSearchData.active ?? false} onChange={e => setEditSearchData(p => ({ ...p, active: e.target.checked }))} className="accent-[#0e1a7a]" />
                          Active
                        </label>
                        <div className="flex gap-2">
                          <Btn label="Save" color="navy" loading={actingSearch[search.id] === 'saving'} onClick={() => handleUpdateSearch(search.id)} />
                          <Btn label="Cancel" color="gray" loading={false} onClick={() => setEditingSearch(null)} />
                        </div>
                      </div>
                    )}

                    {/* Expanded: roles */}
                    {(expandedSearch === search.id || editingSearch === search.id) && (
                      <div className="border-t border-gray-100 px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Roles</p>
                          <button
                            onClick={() => { setShowNewRoleForm(search.id); setNewRole({ title: '', role_slug: '', description: '', apply_method: 'upload', apply_url: '', apply_email: '', job_description_pdf: '', active: true }) }}
                            className="text-xs bg-[#0e1a7a] text-white px-3 py-1.5 hover:bg-[#162270] transition-colors"
                          >
                            + Add Role
                          </button>
                        </div>

                        {/* New role form */}
                        {showNewRoleForm === search.id && (
                          <div className="bg-blue-50 border border-blue-100 p-4 mb-4 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <input placeholder="Role title *" value={newRole.title} onChange={e => setNewRole(p => ({ ...p, title: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                              <div>
                                <input placeholder="Role slug (e.g. lead-guide) *" value={newRole.role_slug} onChange={e => setNewRole(p => ({ ...p, role_slug: toSlug(e.target.value) }))} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                                <p className="text-[10px] text-gray-400 mt-0.5">Appended to the search URL: .../current-searches/school/<span className="font-mono">{newRole.role_slug || 'role'}</span></p>
                              </div>
                              <select value={newRole.apply_method} onChange={e => setNewRole(p => ({ ...p, apply_method: e.target.value as 'upload' | 'link' | 'email' }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]">
                                <option value="upload">Upload (form + file)</option>
                                <option value="link">External link</option>
                                <option value="email">Email</option>
                              </select>
                              {newRole.apply_method === 'link' && <input placeholder="Apply URL" value={newRole.apply_url} onChange={e => setNewRole(p => ({ ...p, apply_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />}
                              {newRole.apply_method === 'email' && <input placeholder="Apply email" value={newRole.apply_email} onChange={e => setNewRole(p => ({ ...p, apply_email: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />}
                              <textarea placeholder="Role description" value={newRole.description} onChange={e => setNewRole(p => ({ ...p, description: e.target.value }))} rows={2} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] col-span-2 resize-none" />
                              <div className="col-span-2">
                                <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">Job Description PDF</p>
                                {newRole.job_description_pdf ? (
                                  <div className="flex items-center gap-2">
                                    <a href={newRole.job_description_pdf} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0e1a7a] hover:underline truncate">PDF uploaded ↗</a>
                                    <button type="button" onClick={() => setNewRole(p => ({ ...p, job_description_pdf: '' }))} className="text-[10px] text-red-500 hover:underline flex-shrink-0">Remove</button>
                                  </div>
                                ) : (
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="file" accept="application/pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handlePdfUpload(f, `new-${search.id}`, url => setNewRole(p => ({ ...p, job_description_pdf: url }))) }} />
                                    <span className={`text-xs px-3 py-1.5 border border-gray-300 text-gray-600 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors ${uploadingPdf === `new-${search.id}` ? 'opacity-50 pointer-events-none' : ''}`}>
                                      {uploadingPdf === `new-${search.id}` ? 'Uploading…' : 'Choose PDF'}
                                    </span>
                                  </label>
                                )}
                              </div>
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="checkbox" checked={newRole.active} onChange={e => setNewRole(p => ({ ...p, active: e.target.checked }))} className="accent-[#0e1a7a]" />
                              Active
                            </label>
                            <div className="flex gap-2">
                              <Btn label="Add Role" color="navy" loading={!!actingRole[`${search.id}-new`]} onClick={() => handleCreateRole(search.id)} />
                              <Btn label="Cancel" color="gray" loading={false} onClick={() => setShowNewRoleForm(null)} />
                            </div>
                          </div>
                        )}

                        {(search.roles ?? []).length === 0 ? (
                          <p className="text-xs text-gray-400 py-4">No roles yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {(search.roles ?? []).map(role => (
                              <div key={role.id} className="border border-gray-100 px-4 py-3">
                                {editingRole === role.id ? (
                                  <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                      <input placeholder="Role title" value={editRoleData.title ?? ''} onChange={e => setEditRoleData(p => ({ ...p, title: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                                      <div>
                                        <input placeholder="Role slug" value={editRoleData.role_slug ?? ''} onChange={e => setEditRoleData(p => ({ ...p, role_slug: toSlug(e.target.value) }))} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                                        <p className="text-[10px] text-gray-400 mt-0.5">Appended to the search URL</p>
                                      </div>
                                      <select value={editRoleData.apply_method ?? 'upload'} onChange={e => setEditRoleData(p => ({ ...p, apply_method: e.target.value as 'upload' | 'link' | 'email' }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                                        <option value="upload">Upload</option>
                                        <option value="link">Link</option>
                                        <option value="email">Email</option>
                                      </select>
                                      {editRoleData.apply_method === 'link' && <input placeholder="Apply URL" value={(editRoleData.apply_url as string) ?? ''} onChange={e => setEditRoleData(p => ({ ...p, apply_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />}
                                      {editRoleData.apply_method === 'email' && <input placeholder="Apply email" value={(editRoleData.apply_email as string) ?? ''} onChange={e => setEditRoleData(p => ({ ...p, apply_email: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />}
                                      <textarea placeholder="Description" value={(editRoleData.description as string) ?? ''} onChange={e => setEditRoleData(p => ({ ...p, description: e.target.value }))} rows={2} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none col-span-2 resize-none" />
                                      <div className="col-span-2">
                                        <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">Job Description PDF</p>
                                        {editRoleData.job_description_pdf ? (
                                          <div className="flex items-center gap-2">
                                            <a href={editRoleData.job_description_pdf as string} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0e1a7a] hover:underline truncate">View current PDF ↗</a>
                                            <button type="button" onClick={() => setEditRoleData(p => ({ ...p, job_description_pdf: '' }))} className="text-[10px] text-red-500 hover:underline flex-shrink-0">Remove</button>
                                          </div>
                                        ) : null}
                                        <label className="flex items-center gap-2 cursor-pointer mt-1">
                                          <input type="file" accept="application/pdf" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handlePdfUpload(f, `edit-${role.id}`, url => setEditRoleData(p => ({ ...p, job_description_pdf: url }))) }} />
                                          <span className={`text-xs px-3 py-1.5 border border-gray-300 text-gray-600 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors ${uploadingPdf === `edit-${role.id}` ? 'opacity-50 pointer-events-none' : ''}`}>
                                            {uploadingPdf === `edit-${role.id}` ? 'Uploading…' : editRoleData.job_description_pdf ? 'Replace PDF' : 'Choose PDF'}
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                      <input type="checkbox" checked={editRoleData.active ?? true} onChange={e => setEditRoleData(p => ({ ...p, active: e.target.checked }))} className="accent-[#0e1a7a]" />
                                      Active
                                    </label>
                                    <div className="flex gap-2">
                                      <Btn label="Save" color="navy" loading={actingRole[role.id] === 'saving'} onClick={() => handleUpdateRole(search.id, role.id)} />
                                      <Btn label="Cancel" color="gray" loading={false} onClick={() => setEditingRole(null)} />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between gap-4">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-800">{role.title}</span>
                                        <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 border ${role.active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                          {role.active ? 'active' : 'inactive'}
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-400">/{role.role_slug} · {role.apply_method}{role.job_description_pdf ? ' · ' : ''}{role.job_description_pdf && <a href={role.job_description_pdf} target="_blank" rel="noopener noreferrer" className="text-[#0e1a7a] hover:underline">JD PDF ↗</a>}</p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                      <Btn label="Edit" color="gray" loading={false} onClick={() => { setEditingRole(role.id); setEditRoleData({ title: role.title, role_slug: role.role_slug, description: role.description ?? '', apply_method: role.apply_method, apply_url: role.apply_url ?? '', apply_email: role.apply_email ?? '', job_description_pdf: role.job_description_pdf ?? '', active: role.active }) }} />
                                      <Btn label="Delete" color="red" loading={actingRole[role.id] === 'deleting'} onClick={() => handleDeleteRole(search.id, role.id)} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TALENT POOL TAB ──────────────────────────────────────────────────── */}
        {tab === 'talent' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{talentProfiles.length} profile{talentProfiles.length !== 1 ? 's' : ''}</p>
              <div className="flex gap-3">
                <button onClick={() => loadTalent()} className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5">↻ Refresh</button>
                <button
                  onClick={() => setShowNewTalentForm(!showNewTalentForm)}
                  className="text-xs bg-[#0e1a7a] text-white px-4 py-2 hover:bg-[#162270] transition-colors"
                >
                  + New Profile
                </button>
              </div>
            </div>

            {/* New talent form */}
            {showNewTalentForm && (
              <div className="bg-blue-50 border border-blue-100 p-6 mb-6 space-y-3">
                <p className="text-xs font-semibold text-blue-800 mb-3">New Talent Profile</p>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Candidate ID (e.g. MMG-001) *" value={newTalent.candidate_id} onChange={e => setNewTalent(p => ({ ...p, candidate_id: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Full name (private)" value={newTalent.full_name} onChange={e => setNewTalent(p => ({ ...p, full_name: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Internal email (private)" type="email" value={newTalent.internal_email} onChange={e => setNewTalent(p => ({ ...p, internal_email: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Display title (public, e.g. Primary Guide)" value={newTalent.display_title} onChange={e => setNewTalent(p => ({ ...p, display_title: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Training (e.g. AMI 3-6)" value={newTalent.training} onChange={e => setNewTalent(p => ({ ...p, training: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Years experience (e.g. 8 years)" value={newTalent.years_experience} onChange={e => setNewTalent(p => ({ ...p, years_experience: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Levels — comma separated (e.g. Primary, Lower El)" value={newTalent.levels} onChange={e => setNewTalent(p => ({ ...p, levels: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Region (e.g. Southwest)" value={newTalent.region} onChange={e => setNewTalent(p => ({ ...p, region: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Resume URL (private)" value={newTalent.resume_url} onChange={e => setNewTalent(p => ({ ...p, resume_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Photo URL (public)" value={newTalent.photo_url} onChange={e => setNewTalent(p => ({ ...p, photo_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <input placeholder="Tags — comma separated" value={newTalent.tags} onChange={e => setNewTalent(p => ({ ...p, tags: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  <textarea placeholder="Public summary (shown on profile)" value={newTalent.public_summary} onChange={e => setNewTalent(p => ({ ...p, public_summary: e.target.value }))} rows={3} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] col-span-2 resize-none" />
                  <textarea placeholder="Private notes (internal only)" value={newTalent.private_notes} onChange={e => setNewTalent(p => ({ ...p, private_notes: e.target.value }))} rows={2} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] col-span-2 resize-none" />
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={newTalent.open_to_relocate} onChange={e => setNewTalent(p => ({ ...p, open_to_relocate: e.target.checked }))} className="accent-[#0e1a7a]" />
                    Open to relocate
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={newTalent.active} onChange={e => setNewTalent(p => ({ ...p, active: e.target.checked }))} className="accent-[#0e1a7a]" />
                    Active (visible publicly)
                  </label>
                </div>
                <div className="flex gap-2">
                  <Btn label="Create Profile" color="navy" loading={!!actingTalent.new} onClick={handleCreateTalent} />
                  <Btn label="Cancel" color="gray" loading={false} onClick={() => setShowNewTalentForm(false)} />
                </div>
              </div>
            )}

            {talentLoading ? (
              <p className="text-sm text-gray-400 py-16 text-center">Loading…</p>
            ) : talentProfiles.length === 0 ? (
              <p className="text-sm text-gray-400 py-16 text-center">No talent profiles yet.</p>
            ) : (
              <div className="space-y-3">
                {talentProfiles.map(profile => (
                  <div key={profile.id} className="bg-white border border-gray-200 px-6 py-5">
                    {editingTalent === profile.id ? (
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Edit Profile — {profile.candidate_id}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="Candidate ID" value={editTalentData.candidate_id ?? ''} onChange={e => setEditTalentData(p => ({ ...p, candidate_id: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Full name (private)" value={(editTalentData.full_name as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, full_name: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Internal email" value={(editTalentData.internal_email as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, internal_email: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Display title" value={(editTalentData.display_title as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, display_title: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Training" value={(editTalentData.training as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, training: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Years experience" value={(editTalentData.years_experience as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, years_experience: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Levels — comma separated" value={(editTalentData as Record<string, unknown>).levels_raw as string ?? (editTalentData.levels ?? []).join(', ')} onChange={e => setEditTalentData(p => ({ ...p, levels_raw: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Region" value={(editTalentData.region as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, region: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Resume URL (private)" value={(editTalentData.resume_url as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, resume_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Photo URL (public)" value={(editTalentData.photo_url as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, photo_url: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <input placeholder="Tags — comma separated" value={(editTalentData as Record<string, unknown>).tags_raw as string ?? (editTalentData.tags ?? []).join(', ')} onChange={e => setEditTalentData(p => ({ ...p, tags_raw: e.target.value }))} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                          <textarea placeholder="Public summary" value={(editTalentData.public_summary as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, public_summary: e.target.value }))} rows={3} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none col-span-2 resize-none" />
                          <textarea placeholder="Private notes (internal only)" value={(editTalentData.private_notes as string) ?? ''} onChange={e => setEditTalentData(p => ({ ...p, private_notes: e.target.value }))} rows={2} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none col-span-2 resize-none" />
                        </div>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" checked={editTalentData.open_to_relocate ?? false} onChange={e => setEditTalentData(p => ({ ...p, open_to_relocate: e.target.checked }))} className="accent-[#0e1a7a]" />
                            Open to relocate
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" checked={editTalentData.active ?? true} onChange={e => setEditTalentData(p => ({ ...p, active: e.target.checked }))} className="accent-[#0e1a7a]" />
                            Active
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <Btn label="Save" color="navy" loading={actingTalent[profile.id] === 'saving'} onClick={() => handleUpdateTalent(profile.id)} />
                          <Btn label="Cancel" color="gray" loading={false} onClick={() => setEditingTalent(null)} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-4 min-w-0">
                          {profile.photo_url ? (
                            <img src={profile.photo_url} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-400 text-sm font-medium">{profile.candidate_id}</span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <p className="font-semibold text-gray-900 text-sm">{profile.candidate_id}</p>
                              {profile.display_title && <p className="text-gray-600 text-sm">{profile.display_title}</p>}
                              <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 border ${profile.active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                {profile.active ? 'active' : 'inactive'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">
                              {[profile.training, profile.years_experience, profile.region].filter(Boolean).join(' · ')}
                              {profile.open_to_relocate && ' · Open to relocate'}
                            </p>
                            {profile.full_name && <p className="text-xs text-orange-600 font-medium">Private: {profile.full_name} {profile.internal_email ? `— ${profile.internal_email}` : ''}</p>}
                            {profile.levels?.length > 0 && <p className="text-xs text-gray-400">Levels: {profile.levels.join(', ')}</p>}
                            {profile.public_summary && <p className="text-xs text-gray-600 mt-1 line-clamp-2 max-w-xl">{profile.public_summary}</p>}
                            {profile.tags?.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {profile.tags.map(tag => (
                                  <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className="flex gap-2">
                            <Btn label="Edit" color="gray" loading={false} onClick={() => { setEditingTalent(profile.id); setEditTalentData({ ...profile, levels_raw: (profile.levels ?? []).join(', '), tags_raw: (profile.tags ?? []).join(', ') } as Partial<TalentProfile & { levels_raw: string; tags_raw: string }>) }} />
                            <Btn label="Delete" color="red" loading={actingTalent[profile.id] === 'deleting'} onClick={() => handleDeleteTalent(profile.id)} />
                          </div>
                          {profile.resume_url && (
                            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#0e1a7a] hover:underline">Resume ↗</a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* ── PARTNERS TAB ────────────────────────────────────────────────────── */}
        {tab === 'partners' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{partners.length} partner{partners.length !== 1 ? 's' : ''}</p>
              <button
                onClick={() => setShowNewPartnerForm(true)}
                className="bg-[#0e1a7a] text-white text-xs font-medium px-4 py-2 hover:bg-[#162270] transition-colors"
              >
                + Add Partner
              </button>
            </div>

            {/* New partner form */}
            {showNewPartnerForm && (
              <div className="border border-[#0e1a7a] p-6 mb-6 bg-white">
                <p className="text-sm font-semibold text-[#0e1a7a] mb-4">New Partner</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Partner Name *</label>
                    <input value={newPartner.partner_name} onChange={e => setNewPartner(p => ({ ...p, partner_name: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="Organization name" />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Category</label>
                    <select value={newPartner.category} onChange={e => setNewPartner(p => ({ ...p, category: e.target.value as Partner['category'] }))} className="w-full border border-gray-200 px-3 py-2 text-sm bg-white">
                      <option value="school">School</option>
                      <option value="nonprofit">Nonprofit</option>
                      <option value="network">Network</option>
                      <option value="organization">Organization</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Logo Image URL</label>
                    <input value={newPartner.logo_image} onChange={e => setNewPartner(p => ({ ...p, logo_image: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Website URL</label>
                    <input value={newPartner.website_url} onChange={e => setNewPartner(p => ({ ...p, website_url: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Short Description</label>
                    <input value={newPartner.short_description} onChange={e => setNewPartner(p => ({ ...p, short_description: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="Optional one-line description" />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Display Order</label>
                    <input type="number" value={newPartner.display_order} onChange={e => setNewPartner(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} className="w-full border border-gray-200 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex items-end gap-4 pb-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={newPartner.is_featured} onChange={e => setNewPartner(p => ({ ...p, is_featured: e.target.checked }))} />
                      Featured
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={newPartner.is_published} onChange={e => setNewPartner(p => ({ ...p, is_published: e.target.checked }))} />
                      Published
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Btn label="Save Partner" color="navy" loading={actingPartner.new === 'creating'} onClick={handleCreatePartner} />
                  <Btn label="Cancel" color="gray" loading={false} onClick={() => setShowNewPartnerForm(false)} />
                </div>
              </div>
            )}

            {partnersLoading ? (
              <p className="text-sm text-gray-400 py-8 text-center">Loading…</p>
            ) : partners.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No partners yet. Add one above.</p>
            ) : (
              <div className="space-y-3">
                {partners.map(partner => (
                  <div key={partner.id} className="border border-gray-100 bg-white p-5">
                    {editingPartner === partner.id ? (
                      <div>
                        <div className="grid sm:grid-cols-2 gap-3 mb-4">
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Partner Name *</label>
                            <input value={editPartnerData.partner_name ?? ''} onChange={e => setEditPartnerData(p => ({ ...p, partner_name: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Category</label>
                            <select value={editPartnerData.category ?? 'organization'} onChange={e => setEditPartnerData(p => ({ ...p, category: e.target.value as Partner['category'] }))} className="w-full border border-gray-200 px-3 py-2 text-sm bg-white">
                              <option value="school">School</option>
                              <option value="nonprofit">Nonprofit</option>
                              <option value="network">Network</option>
                              <option value="organization">Organization</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Logo Image URL</label>
                            <input value={editPartnerData.logo_image ?? ''} onChange={e => setEditPartnerData(p => ({ ...p, logo_image: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Website URL</label>
                            <input value={editPartnerData.website_url ?? ''} onChange={e => setEditPartnerData(p => ({ ...p, website_url: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Short Description</label>
                            <input value={editPartnerData.short_description ?? ''} onChange={e => setEditPartnerData(p => ({ ...p, short_description: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Display Order</label>
                            <input type="number" value={editPartnerData.display_order ?? 0} onChange={e => setEditPartnerData(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} className="w-full border border-gray-200 px-3 py-2 text-sm" />
                          </div>
                          <div className="flex items-end gap-4 pb-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input type="checkbox" checked={editPartnerData.is_featured ?? false} onChange={e => setEditPartnerData(p => ({ ...p, is_featured: e.target.checked }))} />
                              Featured
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input type="checkbox" checked={editPartnerData.is_published ?? false} onChange={e => setEditPartnerData(p => ({ ...p, is_published: e.target.checked }))} />
                              Published
                            </label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Btn label="Save" color="navy" loading={actingPartner[partner.id] === 'saving'} onClick={() => handleUpdatePartner(partner.id)} />
                          <Btn label="Cancel" color="gray" loading={false} onClick={() => setEditingPartner(null)} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {partner.logo_image && (
                            <img src={partner.logo_image} alt={partner.partner_name} className="w-12 h-12 object-contain flex-shrink-0 border border-gray-100" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <p className="text-sm font-semibold text-gray-800">{partner.partner_name}</p>
                              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 uppercase tracking-wide">{partner.category}</span>
                              {partner.is_featured && <span className="text-[10px] bg-[#d6a758]/20 text-[#8A6014] px-2 py-0.5 uppercase tracking-wide font-medium">Featured</span>}
                              {partner.is_published
                                ? <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 uppercase tracking-wide">Published</span>
                                : <span className="text-[10px] bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 uppercase tracking-wide">Draft</span>}
                            </div>
                            {partner.short_description && <p className="text-xs text-gray-500 mb-1">{partner.short_description}</p>}
                            {partner.website_url && <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#0e1a7a] hover:underline">{partner.website_url}</a>}
                            <p className="text-[10px] text-gray-400 mt-1">Order: {partner.display_order}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className="flex gap-2">
                            <Btn label="Edit" color="gray" loading={false} onClick={() => { setEditingPartner(partner.id); setEditPartnerData({ ...partner }) }} />
                            <Btn label={partner.is_published ? 'Unpublish' : 'Publish'} color="navy" loading={actingPartner[partner.id] === 'is_published'} onClick={() => handleTogglePartner(partner.id, 'is_published', partner.is_published)} />
                            <Btn label="Delete" color="red" loading={actingPartner[partner.id] === 'deleting'} onClick={() => handleDeletePartner(partner.id)} />
                          </div>
                          <Btn label={partner.is_featured ? 'Unfeature' : 'Feature'} color="gray" loading={actingPartner[partner.id] === 'is_featured'} onClick={() => handleTogglePartner(partner.id, 'is_featured', partner.is_featured)} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── IN COMMUNITY WITH TAB ─────────────────────────────────────────── */}
        {tab === 'community' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{communityOrgs.length} organization{communityOrgs.length !== 1 ? 's' : ''}</p>
              <button
                onClick={() => setShowNewCommunityForm(true)}
                className="bg-[#0e1a7a] text-white text-xs font-medium px-4 py-2 hover:bg-[#162270] transition-colors"
              >
                + Add Organization
              </button>
            </div>

            {/* New org form */}
            {showNewCommunityForm && (
              <div className="border border-[#0e1a7a] p-6 mb-6 bg-white">
                <p className="text-sm font-semibold text-[#0e1a7a] mb-4">New Organization</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Organization Name *</label>
                    <input value={newCommunityOrg.name} onChange={e => setNewCommunityOrg(o => ({ ...o, name: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="Organization name" />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Logo URL</label>
                    <input value={newCommunityOrg.logo_url} onChange={e => setNewCommunityOrg(o => ({ ...o, logo_url: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Website URL</label>
                    <input value={newCommunityOrg.website_url} onChange={e => setNewCommunityOrg(o => ({ ...o, website_url: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Blurb</label>
                    <textarea value={newCommunityOrg.blurb} onChange={e => setNewCommunityOrg(o => ({ ...o, blurb: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" rows={3} placeholder="1–3 sentences about the organization and why you uplift them" />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Display Order</label>
                    <input type="number" value={newCommunityOrg.display_order} onChange={e => setNewCommunityOrg(o => ({ ...o, display_order: parseInt(e.target.value) || 0 }))} className="w-full border border-gray-200 px-3 py-2 text-sm" />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={newCommunityOrg.published} onChange={e => setNewCommunityOrg(o => ({ ...o, published: e.target.checked }))} />
                      Published
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Btn label="Save Organization" color="navy" loading={actingCommunity.new === 'creating'} onClick={handleCreateCommunityOrg} />
                  <Btn label="Cancel" color="gray" loading={false} onClick={() => setShowNewCommunityForm(false)} />
                </div>
              </div>
            )}

            {communityLoading ? (
              <p className="text-sm text-gray-400 py-8 text-center">Loading…</p>
            ) : communityOrgs.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No organizations yet. Add one above.</p>
            ) : (
              <div className="space-y-3">
                {communityOrgs.map(org => (
                  <div key={org.id} className="border border-gray-100 bg-white p-5">
                    {editingCommunityOrg === org.id ? (
                      <div>
                        <div className="grid sm:grid-cols-2 gap-3 mb-4">
                          <div className="sm:col-span-2">
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Organization Name *</label>
                            <input value={editCommunityData.name ?? ''} onChange={e => setEditCommunityData(o => ({ ...o, name: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Logo URL</label>
                            <input value={editCommunityData.logo_url ?? ''} onChange={e => setEditCommunityData(o => ({ ...o, logo_url: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Website URL</label>
                            <input value={editCommunityData.website_url ?? ''} onChange={e => setEditCommunityData(o => ({ ...o, website_url: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" placeholder="https://..." />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Blurb</label>
                            <textarea value={editCommunityData.blurb ?? ''} onChange={e => setEditCommunityData(o => ({ ...o, blurb: e.target.value }))} className="w-full border border-gray-200 px-3 py-2 text-sm" rows={3} />
                          </div>
                          <div>
                            <label className="text-[11px] uppercase tracking-wide text-gray-500 mb-1 block">Display Order</label>
                            <input type="number" value={editCommunityData.display_order ?? 0} onChange={e => setEditCommunityData(o => ({ ...o, display_order: parseInt(e.target.value) || 0 }))} className="w-full border border-gray-200 px-3 py-2 text-sm" />
                          </div>
                          <div className="flex items-end pb-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input type="checkbox" checked={editCommunityData.published ?? false} onChange={e => setEditCommunityData(o => ({ ...o, published: e.target.checked }))} />
                              Published
                            </label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Btn label="Save" color="navy" loading={actingCommunity[org.id] === 'saving'} onClick={() => handleUpdateCommunityOrg(org.id)} />
                          <Btn label="Cancel" color="gray" loading={false} onClick={() => setEditingCommunityOrg(null)} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {org.logo_url && (
                            <img src={org.logo_url} alt={org.name} className="w-12 h-12 object-contain flex-shrink-0 border border-gray-100" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <p className="text-sm font-semibold text-gray-800">{org.name}</p>
                              {org.published
                                ? <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 uppercase tracking-wide">Published</span>
                                : <span className="text-[10px] bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 uppercase tracking-wide">Draft</span>}
                            </div>
                            {org.blurb && <p className="text-xs text-gray-500 mb-1 line-clamp-2">{org.blurb}</p>}
                            {org.website_url && <a href={org.website_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#0e1a7a] hover:underline">{org.website_url}</a>}
                            <p className="text-[10px] text-gray-400 mt-1">Order: {org.display_order}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Btn label="Edit" color="gray" loading={false} onClick={() => { setEditingCommunityOrg(org.id); setEditCommunityData({ ...org }) }} />
                          <Btn label={org.published ? 'Unpublish' : 'Publish'} color="navy" loading={actingCommunity[org.id] === 'published'} onClick={() => handleToggleCommunityOrg(org.id, org.published)} />
                          <Btn label="Delete" color="red" loading={actingCommunity[org.id] === 'deleting'} onClick={() => handleDeleteCommunityOrg(org.id)} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { CRMCandidate, CRMSearch, CREDENTIALS, LEVELS, SOURCES, SEARCH_STATUSES, ROLE_TYPES } from './types'

type Props = {
  candidates: CRMCandidate[]
  searches: CRMSearch[]
  adminPw: string
  api: (path: string, opts?: RequestInit) => Promise<Response>
  onRefresh: () => void
}

type SubTab = 'candidate' | 'search' | 'pipeline'

// ── Reusable multi-checkbox ───────────────────────────────────────────────────
function CheckList({ label, options, selected, onChange, goldAccent }: {
  label: string; options: readonly string[]; selected: string[]; onChange: (v: string[]) => void; goldAccent?: boolean
}) {
  return (
    <div>
      <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-1">{label}</label>
      <div className="flex flex-wrap gap-1">
        {options.map(opt => (
          <label key={opt} className={`flex items-center gap-1 text-xs border px-2 py-1 cursor-pointer hover:bg-[#FAF9F7] ${
            selected.includes(opt) ? (goldAccent ? 'border-[#d6a758] bg-[#f5e8cc]' : 'border-[#0e1a7a] bg-[#E8F0FE]') : 'border-[#E2DDD6]'
          }`}>
            <input type="checkbox" className={goldAccent ? 'accent-[#d6a758]' : 'accent-[#0e1a7a]'}
              checked={selected.includes(opt)}
              onChange={e => onChange(e.target.checked ? [...selected, opt] : selected.filter(s => s !== opt))} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}

// ── Add Candidate form ────────────────────────────────────────────────────────
function AddCandidateForm({ api, onDone }: { api: Props['api']; onDone: () => void }) {
  const blank = {
    full_name: '', email: '', phone: '', location_city: '', location_state: '',
    credential: '', training_program: '', levels_certified: [] as string[],
    languages: '', years_experience: '', actively_looking: false,
    source: '', source_detail: '', resume_url: '', linkedin_url: '', notes: '',
    role_types: [] as string[], open_to_role_types: [] as string[],
    email_enriched: false, enrichment_source: '',
  }
  const [form, setForm] = useState({ ...blank })
  const [resumeText, setResumeText] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [extractErr, setExtractErr] = useState<string | null>(null)
  const [enriching, setEnriching] = useState(false)
  const [enrichMsg, setEnrichMsg] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState<string | null>(null)

  const set = (k: string, v: unknown) => setForm(prev => ({ ...prev, [k]: v }))

  async function extractResume() {
    if (!resumeText.trim()) return
    setExtracting(true)
    setExtractErr(null)
    try {
      const res = await api('/api/placement/extract-resume', {
        method: 'POST',
        body: JSON.stringify({ resumeText }),
      })
      const data = await res.json()
      if (!res.ok) { setExtractErr(data.error ?? 'Extraction failed'); return }
      setForm(prev => ({
        ...prev,
        full_name:        data.full_name ?? prev.full_name,
        email:            data.email ?? prev.email,
        phone:            data.phone ?? prev.phone,
        location_city:    data.location_city ?? prev.location_city,
        location_state:   data.location_state ?? prev.location_state,
        credential:       data.credential ?? prev.credential,
        training_program: data.training_program ?? prev.training_program,
        levels_certified: data.levels_certified ?? prev.levels_certified,
        languages:        Array.isArray(data.languages) ? data.languages.join(', ') : prev.languages,
        years_experience: data.years_experience != null ? String(data.years_experience) : prev.years_experience,
        actively_looking: data.actively_looking ?? prev.actively_looking,
        source:           data.source ?? prev.source,
        linkedin_url:     data.linkedin_url ?? prev.linkedin_url,
        notes:            data.notes ?? prev.notes,
        role_types:       data.role_types ?? prev.role_types,
        open_to_role_types: data.open_to_role_types ?? prev.open_to_role_types,
      }))
    } finally {
      setExtracting(false)
    }
  }

  async function enrichContact() {
    if (!form.full_name) return
    setEnriching(true)
    setEnrichMsg(null)
    try {
      const res = await api('/api/placement/enrich-contact', {
        method: 'POST',
        body: JSON.stringify({ full_name: form.full_name, linkedin_url: form.linkedin_url || undefined }),
      })
      const data = await res.json()
      if (data.not_found) { setEnrichMsg('No match found in Apollo.'); return }
      if (data.error) { setEnrichMsg(`Error: ${data.error}`); return }
      if (data.email) set('email', data.email)
      if (data.phone) set('phone', data.phone)
      set('email_enriched', true)
      set('enrichment_source', 'Apollo')
      setEnrichMsg('Enriched via Apollo')
    } finally {
      setEnriching(false)
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name.trim()) { setSaveErr('Full name required'); return }
    setSaving(true)
    setSaveErr(null)
    try {
      const payload = {
        ...form,
        languages: form.languages ? form.languages.split(',').map(l => l.trim()).filter(Boolean) : [],
        years_experience: form.years_experience ? parseInt(form.years_experience) : null,
      }
      const res = await api('/api/admin/crm/candidates', { method: 'POST', body: JSON.stringify(payload) })
      if (!res.ok) { const d = await res.json(); setSaveErr(d.error ?? 'Save failed'); return }
      setForm({ ...blank })
      setResumeText('')
      onDone()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-2xl">

      {/* Resume paste + AI extract */}
      <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-4">
        <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-2">
          Paste Resume or LinkedIn Profile Text
        </label>
        <textarea rows={6} value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste raw resume text or LinkedIn profile here, then click AI Extract…"
          className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] resize-y bg-white mb-2" />
        <button type="button" onClick={extractResume} disabled={!resumeText.trim() || extracting}
          className="bg-[#060d3a] text-white text-sm px-5 py-2 hover:bg-[#0e1a7a] transition-colors disabled:opacity-50">
          {extracting ? 'Extracting…' : '✦ AI Extract Fields'}
        </button>
        {extractErr && <p className="text-red-600 text-xs mt-2">{extractErr}</p>}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { k: 'full_name', label: 'Full Name *', type: 'text', required: true },
          { k: 'phone', label: 'Phone', type: 'text' },
          { k: 'location_city', label: 'City', type: 'text' },
          { k: 'location_state', label: 'State', type: 'text' },
          { k: 'training_program', label: 'Training Program', type: 'text' },
          { k: 'years_experience', label: 'Years Experience', type: 'number' },
          { k: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
          { k: 'resume_url', label: 'Resume URL', type: 'url' },
          { k: 'source_detail', label: 'Source Detail', type: 'text' },
        ].map(({ k, label, type }) => (
          <div key={k}>
            <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">{label}</label>
            <input type={type} value={(form as Record<string, unknown>)[k] as string ?? ''}
              onChange={e => set(k, e.target.value)}
              className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
          </div>
        ))}

        {/* Email with enrich */}
        <div className="md:col-span-2">
          <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Email</label>
          <div className="flex gap-2 items-center">
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
              className="flex-1 border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
            {form.email_enriched && (
              <span className="text-[10px] bg-[#f5e8cc] text-[#8A6014] border border-[#d6a758]/40 px-2 py-1 font-medium whitespace-nowrap">
                Enriched via Apollo
              </span>
            )}
            <button type="button" onClick={enrichContact} disabled={enriching || !form.full_name}
              className="text-xs border border-[#d6a758] text-[#8A6014] px-3 py-2 hover:bg-[#f5e8cc] transition-colors disabled:opacity-50 whitespace-nowrap">
              {enriching ? 'Enriching…' : '⚡ Enrich via Apollo'}
            </button>
          </div>
          {enrichMsg && (
            <p className={`text-xs mt-1 ${enrichMsg.startsWith('No match') ? 'text-[#64748B]' : enrichMsg.startsWith('Enriched') ? 'text-green-700' : 'text-red-600'}`}>
              {enrichMsg}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Languages (comma-separated)</label>
        <input type="text" value={form.languages} onChange={e => set('languages', e.target.value)}
          placeholder="Spanish, French…"
          className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Credential</label>
          <select value={form.credential} onChange={e => set('credential', e.target.value)}
            className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
            <option value="">Select…</option>
            {CREDENTIALS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Source</label>
          <select value={form.source} onChange={e => set('source', e.target.value)}
            className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
            <option value="">Select…</option>
            {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <CheckList label="Levels Certified" options={LEVELS} selected={form.levels_certified}
        onChange={v => set('levels_certified', v)} />

      <CheckList label="Role Types (currently holds)" options={ROLE_TYPES} selected={form.role_types}
        onChange={v => set('role_types', v)} />

      <CheckList label="Open To Role Types (growth targets)" options={ROLE_TYPES} selected={form.open_to_role_types}
        onChange={v => set('open_to_role_types', v)} goldAccent />

      <label className="flex items-center gap-2 text-sm text-[#374151]">
        <input type="checkbox" className="accent-[#0e1a7a]" checked={form.actively_looking}
          onChange={e => set('actively_looking', e.target.checked)} />
        Actively looking for work
      </label>

      <div>
        <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Notes</label>
        <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)}
          className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] resize-y" />
      </div>

      {saveErr && <p className="text-red-600 text-sm">{saveErr}</p>}
      <button type="submit" disabled={saving}
        className="bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#060d3a] transition-colors disabled:opacity-50 w-fit">
        {saving ? 'Saving…' : 'Add Candidate'}
      </button>
    </form>
  )
}

// ── Start New Search form ─────────────────────────────────────────────────────
function AddSearchForm({ api, onDone }: { api: Props['api']; onDone: () => void }) {
  const [form, setForm] = useState({
    school_name: '', position_title: '', level: '', location_city: '', location_state: '',
    start_date: '', target_fill_date: '', status: 'active',
    fee_notes: '', school_contact_name: '', school_contact_email: '', notes: '',
  })
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.school_name.trim() || !form.position_title.trim()) { setSaveErr('School name and position are required'); return }
    setSaving(true)
    setSaveErr(null)
    try {
      const payload = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v || null]))
      payload.status = form.status
      const res = await api('/api/admin/crm/searches', { method: 'POST', body: JSON.stringify(payload) })
      if (!res.ok) { const d = await res.json(); setSaveErr(d.error ?? 'Save failed'); return }
      onDone()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { k: 'school_name', label: 'School Name *' },
          { k: 'position_title', label: 'Position Title *' },
          { k: 'level', label: 'Level (e.g. Primary, Elementary)' },
          { k: 'location_city', label: 'City' },
          { k: 'location_state', label: 'State' },
          { k: 'start_date', label: 'Start Date', type: 'date' },
          { k: 'target_fill_date', label: 'Target Fill Date', type: 'date' },
          { k: 'school_contact_name', label: 'School Contact Name' },
          { k: 'school_contact_email', label: 'School Contact Email', type: 'email' },
          { k: 'fee_notes', label: 'Fee Notes' },
        ].map(({ k, label, type }) => (
          <div key={k}>
            <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">{label}</label>
            <input type={type ?? 'text'} value={(form as Record<string, string>)[k]}
              onChange={e => set(k, e.target.value)}
              className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
          </div>
        ))}

        <div>
          <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Status</label>
          <select value={form.status} onChange={e => set('status', e.target.value)}
            className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
            {SEARCH_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Notes</label>
        <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)}
          className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] resize-y" />
      </div>

      {saveErr && <p className="text-red-600 text-sm">{saveErr}</p>}
      <button type="submit" disabled={saving}
        className="bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#060d3a] transition-colors disabled:opacity-50 w-fit">
        {saving ? 'Saving…' : 'Start Search'}
      </button>
    </form>
  )
}

// ── Add to Pipeline form ──────────────────────────────────────────────────────
function AddToPipelineForm({ candidates, searches, api, onDone }: { candidates: CRMCandidate[]; searches: CRMSearch[]; api: Props['api']; onDone: () => void }) {
  const [form, setForm] = useState({
    candidate_id: '', search_id: '', date_applied: new Date().toISOString().slice(0, 10),
  })
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.candidate_id || !form.search_id) { setSaveErr('Select a candidate and a search'); return }
    setSaving(true)
    setSaveErr(null)
    try {
      const res = await api('/api/admin/crm/pipeline', { method: 'POST', body: JSON.stringify(form) })
      if (!res.ok) { const d = await res.json(); setSaveErr(d.error ?? 'Save failed — candidate may already be in this search pipeline'); return }
      onDone()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-lg">
      <div>
        <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Candidate</label>
        <select value={form.candidate_id} onChange={e => setForm(p => ({ ...p, candidate_id: e.target.value }))}
          className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
          <option value="">Select candidate…</option>
          {[...candidates].sort((a, b) => a.full_name.localeCompare(b.full_name)).map(c => (
            <option key={c.id} value={c.id}>{c.full_name}{c.credential ? ` (${c.credential})` : ''}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Search / School Engagement</label>
        <select value={form.search_id} onChange={e => setForm(p => ({ ...p, search_id: e.target.value }))}
          className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
          <option value="">Select search…</option>
          {searches.filter(s => s.status === 'active').map(s => (
            <option key={s.id} value={s.id}>{s.school_name} — {s.position_title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Date Applied</label>
        <input type="date" value={form.date_applied} onChange={e => setForm(p => ({ ...p, date_applied: e.target.value }))}
          className="border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
      </div>
      {saveErr && <p className="text-red-600 text-sm">{saveErr}</p>}
      <button type="submit" disabled={saving}
        className="bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#060d3a] transition-colors disabled:opacity-50 w-fit">
        {saving ? 'Adding…' : 'Add to Pipeline'}
      </button>
    </form>
  )
}

// ── Main tab ──────────────────────────────────────────────────────────────────
export default function AddNewTab({ candidates, searches, api, onRefresh }: Props) {
  const [subTab, setSubTab] = useState<SubTab>('candidate')

  return (
    <div>
      <div className="flex gap-0 mb-6 border-b border-[#E2DDD6]">
        {([['candidate', 'Add Candidate'], ['search', 'Start New Search'], ['pipeline', 'Add to Pipeline']] as [SubTab, string][]).map(([id, label]) => (
          <button key={id} onClick={() => setSubTab(id)}
            className={`px-5 py-3 text-sm transition-colors border-b-2 ${
              subTab === id ? 'border-[#0e1a7a] text-[#0e1a7a] font-medium' : 'border-transparent text-[#64748B] hover:text-[#0e1a7a]'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {subTab === 'candidate' && <AddCandidateForm api={api} onDone={() => { onRefresh() }} />}
      {subTab === 'search' && <AddSearchForm api={api} onDone={() => { onRefresh() }} />}
      {subTab === 'pipeline' && <AddToPipelineForm candidates={candidates} searches={searches} api={api} onDone={() => { onRefresh() }} />}
    </div>
  )
}

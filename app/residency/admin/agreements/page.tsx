'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

function openPrintableAgreement(html: string) {
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}

export default function AdminAgreementsPage() {
  useResidencyAuth(['admin'])
  const [agreements, setAgreements] = useState<any[]>([])
  const [sites, setSites] = useState<any[]>([])
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formSite, setFormSite] = useState('')
  const [formResident, setFormResident] = useState('')
  const [formYear, setFormYear] = useState('2026-2027')
  const [formMentorName, setFormMentorName] = useState('')
  const [formMentorEmail, setFormMentorEmail] = useState('')
  const [formMentorPhone, setFormMentorPhone] = useState('')
  const [formMentorQualifications, setFormMentorQualifications] = useState('')
  const [formMentorYears, setFormMentorYears] = useState('')
  const [formMentorCredential, setFormMentorCredential] = useState('')
  const [formStipend, setFormStipend] = useState('')
  const [formStipendStructure, setFormStipendStructure] = useState('')
  const [formRecordingConsent, setFormRecordingConsent] = useState(false)
  const [formEmploymentConfirmed, setFormEmploymentConfirmed] = useState(false)
  const [formEmploymentRole, setFormEmploymentRole] = useState('')
  const [formEmploymentHours, setFormEmploymentHours] = useState('')

  useEffect(() => {
    async function load() {
      const [{ data: a }, { data: s }, { data: r }] = await Promise.all([
        supabase.from('residency_partner_agreements')
          .select('*, site:residency_placement_sites(name, city, state), resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
          .order('created_at', { ascending: false }),
        supabase.from('residency_placement_sites').select('id, name, city, state').eq('is_active', true).order('name'),
        supabase.from('residency_residents')
          .select('id, profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name)')
          .in('status', ['active', 'enrolled']),
      ])
      if (a) setAgreements(a)
      if (s) setSites(s)
      if (r) setResidents(r)
      setLoading(false)
    }
    load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { data, error } = await supabase.from('residency_partner_agreements').insert({
      site_id: formSite,
      resident_id: formResident || null,
      academic_year: formYear,
      site_mentor_name: formMentorName || null,
      site_mentor_email: formMentorEmail || null,
      site_mentor_phone: formMentorPhone || null,
      site_mentor_qualifications: formMentorQualifications || null,
      site_mentor_years_experience: formMentorYears ? parseInt(formMentorYears) : null,
      site_mentor_montessori_credential: formMentorCredential || null,
      stipend_amount_per_semester: formStipend ? parseFloat(formStipend) : null,
      stipend_structure: formStipendStructure || null,
      recording_consent_confirmed: formRecordingConsent,
      resident_employment_confirmed: formEmploymentConfirmed,
      resident_employment_role: formEmploymentRole || null,
      resident_employment_hours_per_week: formEmploymentHours ? parseFloat(formEmploymentHours) : null,
    }).select('*, site:residency_placement_sites(name, city, state), resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))').single()

    if (data) setAgreements([data, ...agreements])
    setShowForm(false)
    setSaving(false)
  }

  function generateAgreementDoc(agreement: any) {
    const siteName = agreement.site?.name ?? 'Partner School'
    const siteLocation = [agreement.site?.city, agreement.site?.state].filter(Boolean).join(', ')
    const residentName = agreement.resident?.profile
      ? `${agreement.resident.profile.first_name} ${agreement.resident.profile.last_name}`
      : '________________________________'
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const escape = (s: string) => (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Partner School Agreement — ${escape(siteName)}</title>
<style>
  body { font-family: 'Garamond', 'Times New Roman', serif; max-width: 700px; margin: 0 auto; padding: 2rem; color: #222; font-size: 11pt; line-height: 1.7; }
  h1 { font-size: 16pt; text-align: center; color: #0e1a7a; margin-bottom: 0.25rem; }
  h2 { font-size: 13pt; color: #0e1a7a; margin-top: 2rem; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; }
  h3 { font-size: 11pt; margin-top: 1.25rem; }
  .subtitle { text-align: center; font-size: 10pt; color: #666; margin-bottom: 2rem; }
  .sig-line { border-bottom: 1px solid #333; width: 280px; display: inline-block; margin-bottom: 0.25rem; }
  .sig-block { margin-top: 2rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2rem; }
  .sig-item { flex: 1; min-width: 250px; }
  .sig-item p { margin: 0.25rem 0; font-size: 9pt; color: #666; }
  ol { padding-left: 1.25rem; }
  ol li { margin-bottom: 0.75rem; }
  .addendum { page-break-before: always; margin-top: 3rem; }
  @media print { body { padding: 0.5in; } }
</style></head><body>

<h1>Montessori Makers Residency</h1>
<h1>Partner School Agreement</h1>
<p class="subtitle">Academic Year ${escape(agreement.academic_year)} · ${escape(siteName)}${siteLocation ? `, ${escape(siteLocation)}` : ''}</p>

<h2>1. Purpose</h2>
<p>This agreement establishes the partnership between <strong>${escape(siteName)}</strong> ("Partner School") and <strong>Montessori Makers Group</strong> ("MMR") for the placement of teacher candidates in the MMR Residency Program. The agreement covers the responsibilities of each party, the role of the Site Mentor, classroom recording consent, and the terms of the residency placement.</p>

<h2>2. Partner School Responsibilities</h2>
<ol>
  <li>Provide the resident with a prepared Montessori environment appropriate to their certification level for the duration of the placement.</li>
  <li>Designate a qualified Site Mentor who meets the requirements outlined in the Site Mentor Addendum.</li>
  <li>Allow the resident to practice teaching, give lessons, and lead classroom activities under mentorship.</li>
  <li>Permit classroom recording for observation purposes as outlined in Section 5.</li>
  <li>Communicate promptly with the MMR Cohort Guide regarding resident progress, concerns, or scheduling changes.</li>
  <li>Provide the resident with access to curriculum materials, observation records, and planning resources as appropriate.</li>
</ol>

<h2>3. MMR Responsibilities</h2>
<ol>
  <li>Assign a Cohort Guide to oversee the resident's academic and practicum progress.</li>
  <li>Provide the curriculum, assessment rubrics, and competency frameworks the resident is working toward.</li>
  <li>Conduct formal observations (virtual and/or in-person) at least quarterly.</li>
  <li>Communicate regularly with the Site Mentor and Partner School administration.</li>
  <li>Address resident performance concerns in a timely manner, including support plans when needed.</li>
  <li>Maintain all records required for MACTE accreditation.</li>
</ol>

<h2>4. Resident Employment & Expectations</h2>
<p>The resident, <strong>${escape(residentName)}</strong>, ${agreement.resident_employment_confirmed ? `is employed by the Partner School as <strong>${escape(agreement.resident_employment_role || 'classroom assistant')}</strong> for approximately <strong>${agreement.resident_employment_hours_per_week ?? '—'} hours per week</strong>.` : 'is placed at the Partner School for practicum purposes.'} The resident is expected to:</p>
<ol>
  <li>Maintain professional conduct consistent with the Partner School's policies and culture.</li>
  <li>Complete all practicum hour requirements as defined by MMR and MACTE standards.</li>
  <li>Participate actively in Site Mentor check-ins, Cohort Guide observations, and seminar sessions.</li>
  <li>Submit classroom recordings, practicum logs, and reflections on the MMR platform as required.</li>
</ol>

<h2>5. Classroom Recording Consent</h2>
<p>Virtual observations require the resident to submit recordings of classroom activity. The Partner School confirms that:</p>
<ol>
  <li>Written consent has been obtained from all families whose children may appear in recordings.</li>
  <li>Recordings are used exclusively for teacher preparation, observation, and feedback within the MMR program.</li>
  <li>Recordings are not published, shared externally, or used for marketing purposes.</li>
  <li>The school's consent forms align with applicable privacy regulations.</li>
</ol>
<p><strong>Recording consent confirmed:</strong> ${agreement.recording_consent_confirmed ? '✓ Yes' : '☐ Pending'}${agreement.recording_consent_note ? ` — ${escape(agreement.recording_consent_note)}` : ''}</p>

<h2>6. Communication & Reporting</h2>
<ol>
  <li>The Site Mentor and Cohort Guide will communicate at minimum once per month regarding resident progress.</li>
  <li>The Partner School will notify MMR within 48 hours of any concern regarding resident performance, professionalism, or safety.</li>
  <li>MMR will provide the Partner School with a mid-year and end-of-year summary of the resident's progress.</li>
  <li>Either party may request a meeting at any time to discuss resident placement status.</li>
</ol>

<h2>7. Term & Termination</h2>
<p>This agreement is effective for the <strong>${escape(agreement.academic_year)}</strong> academic year. Either party may terminate the agreement with 30 days written notice. In the event of termination, MMR will work with the resident to secure an alternative placement.</p>

<div class="addendum">
<h1 style="font-size: 14pt;">Addendum: Site Mentor Role & Responsibilities</h1>

<h2>A. Designated Site Mentor</h2>
<p><strong>Name:</strong> ${escape(agreement.site_mentor_name || '________________________________')}<br>
<strong>Email:</strong> ${escape(agreement.site_mentor_email || '________________________________')}<br>
<strong>Phone:</strong> ${escape(agreement.site_mentor_phone || '________________________________')}</p>

<h2>B. Qualifications</h2>
<p>The Site Mentor must meet the following minimum qualifications:</p>
<ol>
  <li>Hold a Montessori credential from a MACTE-accredited program at the same level or higher than the resident's certification level.</li>
  <li>Have a minimum of 3 years of lead Montessori classroom experience.</li>
  <li>Be currently employed at the Partner School in a teaching or leadership role.</li>
  <li>Demonstrate a commitment to the resident's professional development.</li>
</ol>
<p><strong>Credential:</strong> ${escape(agreement.site_mentor_montessori_credential || '________________________________')}<br>
<strong>Years of experience:</strong> ${agreement.site_mentor_years_experience ?? '____'}<br>
<strong>Qualifications summary:</strong> ${escape(agreement.site_mentor_qualifications || '________________________________')}</p>

<h2>C. Site Mentor Responsibilities</h2>
<ol>
  <li><strong>Daily mentorship:</strong> Provide the resident with ongoing guidance, modeling, and feedback during the school day.</li>
  <li><strong>Quarterly formal observation:</strong> Conduct one structured observation per quarter using the MMR observation rubric, submitted on the platform.</li>
  <li><strong>Monthly check-in with Cohort Guide:</strong> Participate in a brief (15–30 min) check-in with the MMR Cohort Guide to align on resident progress and goals.</li>
  <li><strong>End-of-year evaluation:</strong> Submit a final written evaluation of the resident's readiness for independent teaching.</li>
  <li><strong>Support the recording process:</strong> Assist with camera placement and ensure recordings capture the resident's practice in a representative way.</li>
  <li><strong>Model professional practice:</strong> Demonstrate Montessori principles in their own classroom work as a living reference for the resident.</li>
</ol>

<h2>D. Stipend</h2>
<p>In recognition of the Site Mentor's time and expertise, MMR provides a stipend:</p>
<p><strong>Amount:</strong> $${agreement.stipend_amount_per_semester ? Number(agreement.stipend_amount_per_semester).toFixed(0) : '____'} per semester<br>
<strong>Structure:</strong> ${escape(agreement.stipend_structure || 'Paid at the end of each semester upon completion of quarterly observations and end-of-year evaluation.')}</p>
<p>The stipend is paid directly to the Site Mentor (not the school) and is contingent on fulfillment of the responsibilities outlined above.</p>

<h2>E. What the Site Mentor is NOT</h2>
<p>The Site Mentor is distinct from the MMR Cohort Guide. The Site Mentor provides daily, in-classroom mentorship. The Cohort Guide provides academic oversight, formal assessment, and accreditation-level evaluation. The Site Mentor does not assign grades, determine standing, or make completion decisions.</p>
</div>

<h2>Signatures</h2>
<div class="sig-block">
  <div class="sig-item">
    <p><strong>Partner School Representative</strong></p>
    <span class="sig-line">${escape(agreement.school_signatory_name || '')}</span>
    <p>Name: ${escape(agreement.school_signatory_name || '')}</p>
    <p>Title: ${escape(agreement.school_signatory_title || '')}</p>
    <p>Date: ${agreement.school_signed_at ? new Date(agreement.school_signed_at).toLocaleDateString() : '____________'}</p>
  </div>
  <div class="sig-item">
    <p><strong>MMR Program Director</strong></p>
    <span class="sig-line"></span>
    <p>Hannah Richardson</p>
    <p>Founder & Program Director</p>
    <p>Date: ${agreement.mmr_signed_at ? new Date(agreement.mmr_signed_at).toLocaleDateString() : '____________'}</p>
  </div>
  <div class="sig-item">
    <p><strong>Site Mentor</strong></p>
    <span class="sig-line">${escape(agreement.site_mentor_name || '')}</span>
    <p>Name: ${escape(agreement.site_mentor_name || '')}</p>
    <p>Date: ${agreement.site_mentor_signed_at ? new Date(agreement.site_mentor_signed_at).toLocaleDateString() : '____________'}</p>
  </div>
</div>

<p style="margin-top: 3rem; font-size: 9pt; color: #999; text-align: center;">
  Montessori Makers Residency · montessorimakersgroup.org · Generated ${escape(today)}
</p>

</body></html>`

    openPrintableAgreement(html)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <Link href="/residency/admin" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Admin
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Partner School Agreements</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Manage agreements with placement sites including Site Mentor addendum.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'New Agreement'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="r-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Create Agreement</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Partner School</label>
              <select className="r-input" value={formSite} onChange={e => setFormSite(e.target.value)} required>
                <option value="">Select site...</option>
                {sites.map(s => <option key={s.id} value={s.id}>{s.name}{s.city ? ` (${s.city})` : ''}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Resident (optional)</label>
              <select className="r-input" value={formResident} onChange={e => setFormResident(e.target.value)}>
                <option value="">Select resident...</option>
                {residents.map((r: any) => <option key={r.id} value={r.id}>{r.profile?.first_name} {r.profile?.last_name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Academic Year</label>
              <input type="text" className="r-input" value={formYear} onChange={e => setFormYear(e.target.value)} required />
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Site Mentor</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Name</label>
              <input type="text" className="r-input" value={formMentorName} onChange={e => setFormMentorName(e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <label className="r-label">Email</label>
              <input type="email" className="r-input" value={formMentorEmail} onChange={e => setFormMentorEmail(e.target.value)} />
            </div>
            <div>
              <label className="r-label">Phone</label>
              <input type="tel" className="r-input" value={formMentorPhone} onChange={e => setFormMentorPhone(e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Montessori Credential</label>
              <input type="text" className="r-input" value={formMentorCredential} onChange={e => setFormMentorCredential(e.target.value)} placeholder="e.g., AMS Early Childhood" />
            </div>
            <div>
              <label className="r-label">Years Experience</label>
              <input type="number" min="0" className="r-input" value={formMentorYears} onChange={e => setFormMentorYears(e.target.value)} />
            </div>
            <div>
              <label className="r-label">Stipend/Semester</label>
              <input type="number" min="0" className="r-input" value={formStipend} onChange={e => setFormStipend(e.target.value)} placeholder="e.g., 500" />
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Qualifications Summary</label>
            <textarea className="r-textarea" value={formMentorQualifications} onChange={e => setFormMentorQualifications(e.target.value)}
              style={{ minHeight: '60px' }} placeholder="Brief summary of mentor's background..." />
          </div>

          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Employment & Consent</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input type="checkbox" checked={formRecordingConsent} onChange={e => setFormRecordingConsent(e.target.checked)} />
              School has confirmed classroom recording consent from families
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input type="checkbox" checked={formEmploymentConfirmed} onChange={e => setFormEmploymentConfirmed(e.target.checked)} />
              Resident is employed at this school
            </label>
          </div>
          {formEmploymentConfirmed && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="r-label">Role</label>
                <input type="text" className="r-input" value={formEmploymentRole} onChange={e => setFormEmploymentRole(e.target.value)} placeholder="e.g., Assistant Teacher" />
              </div>
              <div>
                <label className="r-label">Hours/Week</label>
                <input type="number" min="0" step="0.5" className="r-input" value={formEmploymentHours} onChange={e => setFormEmploymentHours(e.target.value)} />
              </div>
            </div>
          )}

          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Creating...' : 'Create Agreement'}
          </button>
        </form>
      )}

      {/* Agreement List */}
      {agreements.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {agreements.map(a => (
            <div key={a.id} className="r-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                    {a.site?.name ?? 'Unknown Site'}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    {a.academic_year}
                    {a.resident?.profile && ` · ${a.resident.profile.first_name} ${a.resident.profile.last_name}`}
                    {a.site_mentor_name && ` · Mentor: ${a.site_mentor_name}`}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.6875rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontWeight: 600,
                    background: a.status === 'signed' ? 'var(--r-success-light)' : a.status === 'sent' ? '#E3F2FD' : 'var(--r-border)',
                    color: a.status === 'signed' ? 'var(--r-success)' : a.status === 'sent' ? '#1565C0' : 'var(--r-text-muted)',
                  }}>
                    {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                  </span>
                  <button onClick={() => generateAgreementDoc(a)} className="r-btn r-btn-secondary"
                    style={{ fontSize: '0.6875rem', padding: '0.25rem 0.75rem' }}>
                    View Document
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No partner agreements created yet.</p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PRACTICE_DOMAINS = [
  {
    key: 'prepared_environment',
    name: 'Prepared Environment',
    description: 'Classroom is orderly, beautiful, and culturally responsive. Materials are complete, accessible, organized to support independence. Environment reflects diverse families and cultures.',
    indicators: {
      1: 'Environment is cluttered or incomplete. Materials are scattered or inaccessible. Limited cultural representation.',
      2: 'Environment is mostly organized. Materials accessible but some incomplete. Some cultural diversity represented.',
      3: 'Environment is orderly, beautiful, and inviting. Materials complete, logically organized, easily accessible. Diverse cultural materials present.',
      4: 'Environment is exceptionally beautiful and functional. All materials complete and accessible. Rich cultural representation throughout. Children recognize and maintain environment\'s beauty.',
    },
  },
  {
    key: 'lesson_presentation',
    name: 'Lesson Presentation',
    description: 'Lessons are presented with precise, economical movement. Language is clear and developmentally appropriate. Presentations follow Montessori key points with appropriate pacing.',
    indicators: {
      1: 'Presentations lack clarity or precision. Movement is unclear or excessive. Language is not developmentally appropriate.',
      2: 'Presentations are generally clear but need refinement. Movement is mostly precise but sometimes excessive.',
      3: 'Presentations are clear and precise with economical movement. Language is developmentally appropriate and accurate. Follows Montessori key points.',
      4: 'Presentations are models of clarity and beauty. Movement is minimal and intentional. Masterful pacing keeps children engaged without directing.',
    },
  },
  {
    key: 'observation_documentation',
    name: 'Observation & Documentation',
    description: 'Candidate gathers objective data through careful observation. Reflects on patterns, adjusts instruction based on findings. Maintains systematic records.',
    indicators: {
      1: 'Observation is infrequent or subjective. No systematic documentation. Instruction not adjusted based on observation.',
      2: 'Observation is inconsistent. Some documentation but not systematic. Limited reflection on patterns.',
      3: 'Observation is regular and objective. Documentation is systematic and accessible. Reflects on patterns and adjusts instruction.',
      4: 'Observation is meticulous and ongoing. Documentation is thorough, organized, and informs all decisions. Proactively adjusts curriculum.',
    },
  },
  {
    key: 'child_independence',
    name: 'Child Independence & Concentration',
    description: 'Candidate promotes freedom within clearly established limits. Children initiate purposeful work and sustain focus. Transitions are handled with care.',
    indicators: {
      1: 'Children are directed excessively. Limited purposeful choice. Concentration is fragmented. Transitions are rushed.',
      2: 'Some freedom offered but limits unclear. Children initiate work with guidance. Concentration is developing.',
      3: 'Clear limits established. Children initiate purposeful work independently. Sustained focus is common. Transitions are calm.',
      4: 'Freedom and limits are expertly balanced. Children are deeply engaged. Long work cycles evident. Transitions are seamless.',
    },
  },
  {
    key: 'adult_presence',
    name: 'Adult Presence',
    description: 'Candidate is calm, respectful, and grounded. Demonstrates patience and trust in children\'s process. Models grace and courtesy at all times.',
    indicators: {
      1: 'Adult presence is controlling or anxious. Lacks patience. Does not model courtesy or grace.',
      2: 'Adult is mostly calm but occasionally reactive. Shows patience at times. Attempts to model grace.',
      3: 'Adult is calm and respectful. Patient and trusting. Models grace and courtesy consistently.',
      4: 'Adult presence is grounded and peaceful. Extraordinary patience and trust. Grace and courtesy embedded in every gesture.',
    },
  },
  {
    key: 'community_grace',
    name: 'Community & Grace',
    description: 'Creates positive classroom tone, uses restorative conflict resolution, supports belonging, and builds culture of kindness and collaboration.',
    indicators: {
      1: 'Classroom tone is negative or punitive. Conflicts handled harshly. Limited sense of belonging.',
      2: 'Tone is mostly positive. Conflicts addressed but not always restoratively. Some sense of belonging.',
      3: 'Tone is consistently positive and welcoming. Restorative practices used for conflicts. Children feel they belong.',
      4: 'Community is exceptionally warm and inclusive. Restorative practices masterfully used. Every child visibly belongs.',
    },
  },
  {
    key: 'equity_inclusion',
    name: 'Equity & Inclusion',
    description: 'Materials reflect cultural diversity. Accommodations are normalized. Anti-bias perspective is evident. Multilingual elements are present and respected.',
    indicators: {
      1: 'Limited cultural diversity in materials. Accommodations are visible and stigmatizing. No anti-bias practices.',
      2: 'Some diverse materials present. Accommodations provided but not fully normalized. Limited anti-bias awareness.',
      3: 'Diverse materials are visible and used meaningfully. Accommodations normalized. Anti-bias perspective guides practice.',
      4: 'Equity and inclusion embedded in all decisions. Diverse materials extensive and thoughtful. Anti-bias teaching is sophisticated.',
    },
  },
  {
    key: 'professionalism',
    name: 'Professionalism',
    description: 'Communicates effectively with families and colleagues, maintains ethical standards, engages in professional growth, and contributes to school community.',
    indicators: {
      1: 'Communication is limited or unclear. Ethical lapses occur. No engagement in professional growth.',
      2: 'Communication is generally clear. Maintains basic ethical standards. Engages in some professional growth.',
      3: 'Communication with families and colleagues is clear and consistent. Ethical standards maintained. Seeks professional growth.',
      4: 'Communication is exceptional and collaborative. Ethical standards modeled. Actively pursues growth. Leadership evident.',
    },
  },
]

const REFLECTIVE_DIMENSIONS = [
  {
    key: 'awareness',
    name: 'Awareness',
    description: 'Candidate recognizes own biases, learning edges, and growth goals.',
    indicators: [
      'Self-identifies bias patterns in practice and teaching decisions',
      'Names specific strategies for improvement and personal growth',
      'Acknowledges gaps in knowledge and skills',
      'Asks for and receives feedback with openness',
    ],
  },
  {
    key: 'integration',
    name: 'Integration',
    description: 'Candidate connects coursework, readings, and field experiences to deepen understanding.',
    indicators: [
      'Links theory from seminars and readings to observed practice',
      'Connects child development concepts to specific child outcomes',
      'Uses Montessori philosophy to guide decision-making',
      'Synthesizes multiple perspectives into coherent practice',
    ],
  },
  {
    key: 'responsiveness',
    name: 'Responsiveness',
    description: 'Candidate adapts teaching based on observation and feedback.',
    indicators: [
      'Implements new strategies based on feedback or data',
      'Reflects on impact of changes on children\'s learning',
      'Adjusts lessons in response to child engagement',
      'Modifies environment based on observations',
    ],
  },
  {
    key: 'voice',
    name: 'Voice',
    description: 'Candidate communicates authentic perspective rooted in Montessori values.',
    indicators: [
      'Writes and speaks with clarity and authenticity',
      'Articulates personal Montessori philosophy',
      'Demonstrates humility while standing in own convictions',
      'Shows emerging leadership in educational perspective',
    ],
  },
  {
    key: 'impact',
    name: 'Impact',
    description: 'Candidate tracks and reflects on how practice affects children and environment.',
    indicators: [
      'Provides evidence of change through data',
      'Documents child progress and learning over time',
      'Reflects on how own growth affects classroom community',
      'Shows understanding of ripple effect of practice',
    ],
  },
]

const EQUITY_AREAS = [
  { key: 'representation', name: 'Representation', description: 'Materials, books, visuals, and curriculum reflect racial, cultural, and family diversity.' },
  { key: 'accessibility', name: 'Accessibility', description: 'Environment accommodates sensory, language, and physical needs.' },
  { key: 'belonging', name: 'Belonging', description: 'Classroom routines and practices invite voice and participation from every child.' },
  { key: 'language', name: 'Language', description: 'Dual-language or multilingual elements are visible and respected.' },
  { key: 'discipline', name: 'Discipline', description: 'Responses to behavior emphasize connection, repair, and restoration over control.' },
  { key: 'equity_in_planning', name: 'Equity in Planning', description: 'Lesson adaptations and groupings avoid bias or exclusion.' },
  { key: 'reflection', name: 'Reflection', description: 'Teacher logs evidence of bias awareness and documents change in practice.' },
]

function getBand(score: number): { band: string; label: string } {
  if (score >= 3.5) return { band: 'highly_proficient', label: 'Highly Proficient' }
  if (score >= 2.5) return { band: 'proficient', label: 'Proficient' }
  if (score >= 1.5) return { band: 'developing', label: 'Developing' }
  return { band: 'needs_support', label: 'Needs Support' }
}

export default function NewAssessmentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedResident = searchParams.get('resident')
  const preselectedType = searchParams.get('type') as 'practice' | 'reflective' | 'equity' | null

  const [residents, setResidents] = useState<any[]>([])
  const [sites, setSites] = useState<any[]>([])
  const [rubricType, setRubricType] = useState<'practice' | 'reflective' | 'equity'>(preselectedType ?? 'practice')
  const [residentId, setResidentId] = useState(preselectedResident ?? '')
  const [observationDate, setObservationDate] = useState(new Date().toISOString().split('T')[0])
  const [siteId, setSiteId] = useState('')
  const [semester, setSemester] = useState('')
  const [scores, setScores] = useState<Record<string, number | string>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [overallSummary, setOverallSummary] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: res } = await supabase
        .from('residency_residents')
        .select('id, profile:residency_profiles(first_name, last_name)')
        .eq('mentor_id', user.id)

      if (res) setResidents(res)

      const { data: s } = await supabase
        .from('residency_placement_sites')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (s) setSites(s)
    }
    load()
  }, [])

  function updateScore(key: string, value: number | string) {
    setScores(prev => ({ ...prev, [key]: value }))
  }

  function updateNotes(key: string, value: string) {
    setNotes(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not authenticated'); setSaving(false); return }

    let overallScore: number | null = null
    let proficiencyBand: string | null = null

    if (rubricType === 'practice' || rubricType === 'reflective') {
      const numericScores = Object.values(scores).map(Number).filter(n => !isNaN(n))
      if (numericScores.length > 0) {
        overallScore = numericScores.reduce((a, b) => a + b, 0) / numericScores.length
        const bandInfo = getBand(overallScore)
        proficiencyBand = bandInfo.band
      }
    }

    const { error: insertError } = await supabase
      .from('residency_rubric_submissions')
      .insert({
        resident_id: residentId,
        mentor_id: user.id,
        rubric_type: rubricType,
        observation_date: observationDate,
        placement_site_id: siteId || null,
        semester: semester || null,
        scores,
        narrative_notes: notes,
        overall_summary: overallSummary || null,
        overall_score: overallScore,
        proficiency_band: proficiencyBand,
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    // Notify resident
    const residentRecord = residents.find(r => r.id === residentId)
    if (residentRecord) {
      const { data: resData } = await supabase
        .from('residency_residents')
        .select('profile_id')
        .eq('id', residentId)
        .single()

      if (resData) {
        const typeLabels: Record<string, string> = {
          practice: 'Montessori Practice Rubric',
          reflective: 'Reflective Practice Rubric',
          equity: 'Equity & Belonging Checklist',
        }

        await supabase.from('residency_notifications').insert({
          recipient_id: resData.profile_id,
          type: 'rubric_completed',
          title: 'Formal Assessment Completed',
          message: `Your mentor has completed a ${typeLabels[rubricType]} assessment. You can view the results and add a reflection from your portfolio.`,
          link: '/residency/portal/portfolio',
        })
      }
    }

    router.push('/residency/mentor/assessments')
  }

  const typeLabels: Record<string, string> = {
    practice: 'Montessori Practice Rubric',
    reflective: 'Reflective Practice Rubric',
    equity: 'Equity & Belonging Checklist',
  }

  return (
    <div>
      <Link href="/residency/mentor/assessments" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Assessments
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Formal Assessment</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Complete this assessment thoughtfully. Your scores and narrative notes become part of the resident's
        accreditation record and candidate portfolio.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Assessment details */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Assessment Details</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Assessment Type</label>
              <select className="r-input" value={rubricType}
                onChange={e => { setRubricType(e.target.value as any); setScores({}); setNotes({}) }}>
                <option value="practice">Montessori Practice Rubric</option>
                <option value="reflective">Reflective Practice Rubric</option>
                <option value="equity">Equity & Belonging Checklist</option>
              </select>
            </div>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={residentId} onChange={e => setResidentId(e.target.value)} required>
                <option value="">Select resident...</option>
                {residents.map((r: any) => (
                  <option key={r.id} value={r.id}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="r-label">Observation Date</label>
              <input type="date" className="r-input" value={observationDate}
                onChange={e => setObservationDate(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">Placement Site</label>
              <select className="r-input" value={siteId} onChange={e => setSiteId(e.target.value)}>
                <option value="">Select site...</option>
                {sites.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Semester</label>
              <input type="text" className="r-input" value={semester}
                onChange={e => setSemester(e.target.value)}
                placeholder="e.g. Fall 2026" />
            </div>
          </div>
        </div>

        {/* Practice Rubric */}
        {rubricType === 'practice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {PRACTICE_DOMAINS.map((domain, idx) => (
              <div key={domain.key} className="r-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'var(--r-navy)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 700, flexShrink: 0,
                  }}>{idx + 1}</span>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', color: 'var(--r-navy)', marginBottom: '0.25rem' }}>
                      {domain.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', lineHeight: 1.6 }}>
                      {domain.description}
                    </p>
                  </div>
                </div>

                {/* Score buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                  {([1, 2, 3, 4] as const).map(score => (
                    <button key={score} type="button"
                      onClick={() => updateScore(domain.key, score)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: scores[domain.key] === score ? '2px solid var(--r-navy)' : '1px solid var(--r-border)',
                        background: scores[domain.key] === score ? 'var(--r-navy)' : 'var(--r-white)',
                        color: scores[domain.key] === score ? '#fff' : 'var(--r-text)',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
                        {score} - {score === 1 ? 'Beginning' : score === 2 ? 'Developing' : score === 3 ? 'Proficient' : 'Exemplary'}
                      </p>
                      <p style={{ fontSize: '0.6875rem', lineHeight: 1.4, opacity: 0.85 }}>
                        {domain.indicators[score]}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Narrative notes */}
                <textarea className="r-textarea" value={notes[domain.key] ?? ''}
                  onChange={e => updateNotes(domain.key, e.target.value)}
                  placeholder={`Narrative notes for ${domain.name}...`}
                  style={{ minHeight: '80px' }} />
              </div>
            ))}
          </div>
        )}

        {/* Reflective Practice Rubric */}
        {rubricType === 'reflective' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {REFLECTIVE_DIMENSIONS.map((dim, idx) => (
              <div key={dim.key} className="r-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'var(--r-gold)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 700, flexShrink: 0,
                  }}>{idx + 1}</span>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', color: 'var(--r-navy)', marginBottom: '0.25rem' }}>
                      {dim.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      {dim.description}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Evidence / Indicators:</p>
                      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                        {dim.indicators.map((ind, i) => <li key={i}>{ind}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                  {([1, 2, 3, 4] as const).map(score => (
                    <button key={score} type="button"
                      onClick={() => updateScore(dim.key, score)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: scores[dim.key] === score ? '2px solid var(--r-gold)' : '1px solid var(--r-border)',
                        background: scores[dim.key] === score ? 'var(--r-gold)' : 'var(--r-white)',
                        color: scores[dim.key] === score ? '#fff' : 'var(--r-text)',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {score} - {score === 1 ? 'Beginning' : score === 2 ? 'Developing' : score === 3 ? 'Proficient' : 'Exemplary'}
                    </button>
                  ))}
                </div>

                <textarea className="r-textarea" value={notes[dim.key] ?? ''}
                  onChange={e => updateNotes(dim.key, e.target.value)}
                  placeholder={`Narrative feedback for ${dim.name}...`}
                  style={{ minHeight: '80px' }} />
              </div>
            ))}
          </div>
        )}

        {/* Equity & Belonging Checklist */}
        {rubricType === 'equity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {EQUITY_AREAS.map((area, idx) => (
              <div key={area.key} className="r-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--r-navy)', marginBottom: '0.25rem' }}>
                      {idx + 1}. {area.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', lineHeight: 1.6 }}>
                      {area.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                    {(['yes', 'in_progress', 'not_yet'] as const).map(val => (
                      <button key={val} type="button"
                        onClick={() => updateScore(area.key, val)}
                        style={{
                          padding: '0.5rem 0.875rem',
                          borderRadius: '6px',
                          border: scores[area.key] === val ? '2px solid var(--r-navy)' : '1px solid var(--r-border)',
                          background: scores[area.key] === val
                            ? val === 'yes' ? '#059669' : val === 'in_progress' ? 'var(--r-gold)' : '#dc2626'
                            : 'var(--r-white)',
                          color: scores[area.key] === val ? '#fff' : 'var(--r-text)',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {val === 'yes' ? 'Yes' : val === 'in_progress' ? 'In Progress' : 'Not Yet'}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea className="r-textarea" value={notes[area.key] ?? ''}
                  onChange={e => updateNotes(area.key, e.target.value)}
                  placeholder={`Notes for ${area.name}...`}
                  style={{ minHeight: '60px', marginTop: '0.75rem' }} />
              </div>
            ))}
          </div>
        )}

        {/* Overall summary */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Overall Summary</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Synthesize your observations. What are this resident's key strengths? Where do they most need to grow?
          </p>
          <textarea className="r-textarea" value={overallSummary}
            onChange={e => setOverallSummary(e.target.value)}
            style={{ minHeight: '120px' }}
            placeholder="Overall assessment summary..." />

          {/* Score preview for practice/reflective */}
          {(rubricType === 'practice' || rubricType === 'reflective') && Object.keys(scores).length > 0 && (() => {
            const numericScores = Object.values(scores).map(Number).filter(n => !isNaN(n))
            if (numericScores.length === 0) return null
            const avg = numericScores.reduce((a, b) => a + b, 0) / numericScores.length
            const { label } = getBand(avg)
            return (
              <div style={{
                marginTop: '1rem', padding: '1rem',
                background: 'var(--r-gold-light)', borderRadius: '8px',
                border: '1px solid var(--r-gold)',
              }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--r-navy)' }}>
                  <strong>Overall Score: {avg.toFixed(2)}</strong> -- {label}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                  {numericScores.length} of {rubricType === 'practice' ? 8 : 5} domains scored
                </p>
              </div>
            )
          })()}
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.75rem', background: '#fef2f2', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving || !residentId}>
            {saving ? 'Submitting...' : `Submit ${typeLabels[rubricType]}`}
          </button>
          <Link href="/residency/mentor/assessments" className="r-btn r-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

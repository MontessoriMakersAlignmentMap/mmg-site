'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

const STEPS = [
  {
    title: 'Welcome & Role Overview',
    description: 'Understand what it means to be an MMR Site Mentor and how your role supports the resident\'s growth.',
    content: `As a Site Mentor, you are the resident's daily guide in the classroom. You model Montessori practice, provide real-time feedback, and create a safe space for professional growth.

Your role is distinct from the Cohort Guide (who provides academic oversight and formal assessment). You provide the practical, day-to-day mentorship that makes the difference between theory and lived practice.

Key responsibilities:
• Daily mentorship and modeling
• Quarterly formal observations using the MMR rubric
• Monthly check-ins with the Cohort Guide
• Supporting classroom recording for virtual observations
• End-of-year evaluation of the resident's readiness`,
  },
  {
    title: 'The MMR Observation Rubric',
    description: 'Learn the 6 focus areas and indicators you\'ll use during quarterly observations.',
    content: `The MMR observation rubric covers 6 focus areas:

1. Prepared Environment — Is the space orderly, beautiful, and accessible? Are materials complete and rotated?

2. Lesson Presentation — Are movements precise? Is language clear? Does pacing follow the child?

3. Child Interaction & Independence — Are interactions respectful? Do children choose freely? Is concentration protected?

4. Observation & Documentation — Is observation systematic? Are records organized? Are patterns noted?

5. Adult Presence & Grace — Is the adult calm, patient, and positioned at the child's level?

6. Classroom Management & Flow — Are transitions smooth? Is the work cycle protected? Are routines clear?

Each focus area has 6 specific indicators you'll check during observation. You don't need to cover all 6 areas in one observation — pick the area most relevant to the resident's current growth edge.`,
  },
  {
    title: 'Recording & Consent',
    description: 'How to support the classroom recording process for virtual observations.',
    content: `Virtual observations require the resident to submit a recording of at least 90 continuous minutes. Your role:

• Help the resident position the camera to capture their interactions naturally
• Ensure the recording shows representative practice (not a staged performance)
• Confirm that your school has obtained written family consent for recording
• Do not coach or intervene during the recording unless there is a safety concern

The recording is reviewed by the Cohort Guide, not by you — but you may discuss it with the resident afterward as part of your mentoring conversations.

Privacy: Recordings are used exclusively within the MMR program for teacher preparation. They are never published or shared externally.`,
  },
  {
    title: 'Communication Expectations',
    description: 'How and when you\'ll connect with the Cohort Guide and the platform.',
    content: `Monthly check-in with Cohort Guide:
• 15–30 minutes, scheduled at a time that works for both of you
• Topics: resident progress, concerns, alignment on goals
• Log your notes on the platform after each check-in

What to communicate immediately (within 48 hours):
• Safety concerns in the classroom
• Significant professionalism issues
• Any incident that affects the resident's ability to practice
• Scheduling changes that impact observation requirements

Platform usage:
• Submit quarterly observations through this portal
• Log check-in notes after each monthly meeting
• Complete the end-of-year evaluation when prompted
• You can view (but not edit) the resident's practicum logs and virtual observation feedback`,
  },
  {
    title: 'Stipend & Completion',
    description: 'Understand how and when your stipend is paid.',
    content: `Your stipend is paid directly to you (not through your school) at the end of each semester.

To receive your stipend, you must complete:
• At least 2 quarterly observations per semester (submitted on the platform)
• Monthly check-ins with the Cohort Guide (logged on the platform)
• The end-of-year evaluation (spring semester only)

Payment timeline:
• Fall semester stipend: paid in January after observations and check-ins are verified
• Spring semester stipend: paid in June after end-of-year evaluation is submitted

If you have questions about your stipend amount or payment, contact the MMR program director directly.`,
  },
]

const QUIZ_QUESTIONS = [
  {
    question: 'How often must you submit a formal observation?',
    options: ['Weekly', 'Monthly', 'Quarterly', 'Annually'],
    correct: 2,
  },
  {
    question: 'What is the minimum recording length for a virtual observation?',
    options: ['30 minutes', '60 minutes', '90 minutes', '120 minutes'],
    correct: 2,
  },
  {
    question: 'Who reviews virtual observation recordings?',
    options: ['The Site Mentor', 'The Cohort Guide', 'The School Principal', 'The Resident'],
    correct: 1,
  },
  {
    question: 'When should you notify the Cohort Guide of a concern?',
    options: ['At the next monthly check-in', 'Within 48 hours', 'At the end of the semester', 'Only if it happens twice'],
    correct: 1,
  },
  {
    question: 'Your stipend is contingent on completing which of the following?',
    options: [
      'Only quarterly observations',
      'Only check-ins',
      'Observations, check-ins, and end-of-year evaluation',
      'Only the end-of-year evaluation',
    ],
    correct: 2,
  },
]

export default function SiteMentorOnboardingPage() {
  const { profile } = useResidencyAuth(['site_mentor'])
  const [onboarding, setOnboarding] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null))
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data } = await supabase
        .from('residency_site_mentor_onboarding')
        .select('*')
        .eq('site_mentor_profile_id', profile!.id)
        .maybeSingle()

      if (data) {
        setOnboarding(data)
        if (data.quiz_passed) setQuizSubmitted(true)
      } else {
        const { data: created } = await supabase
          .from('residency_site_mentor_onboarding')
          .insert({ site_mentor_profile_id: profile!.id })
          .select()
          .single()
        if (created) setOnboarding(created)
      }
      setLoading(false)
    }
    load()
  }, [profile])

  async function markStepComplete(stepNum: number) {
    const field = `step_${stepNum + 1}_complete`
    await supabase
      .from('residency_site_mentor_onboarding')
      .update({ [field]: true })
      .eq('site_mentor_profile_id', profile!.id)
    setOnboarding({ ...onboarding, [field]: true })
  }

  async function handleNext() {
    await markStepComplete(currentStep)
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowQuiz(true)
    }
  }

  async function handleQuizSubmit() {
    const score = quizAnswers.reduce((count: number, ans, i) => {
      return count + (ans === QUIZ_QUESTIONS[i].correct ? 1 : 0)
    }, 0)
    const passed = score >= 4

    await supabase
      .from('residency_site_mentor_onboarding')
      .update({
        quiz_score: score,
        quiz_passed: passed,
        quiz_completed_at: new Date().toISOString(),
        ...(passed ? { onboarding_completed_at: new Date().toISOString() } : {}),
      })
      .eq('site_mentor_profile_id', profile!.id)

    setOnboarding({ ...onboarding, quiz_score: score, quiz_passed: passed })
    setQuizSubmitted(true)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const stepsComplete = onboarding
    ? [onboarding.step_1_complete, onboarding.step_2_complete, onboarding.step_3_complete, onboarding.step_4_complete, onboarding.step_5_complete].filter(Boolean).length
    : 0

  return (
    <div>
      <Link href="/residency/site-mentor" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Dashboard
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Site Mentor Onboarding</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        {onboarding?.onboarding_completed_at
          ? 'Onboarding complete. You can review these materials at any time.'
          : `Complete all 5 steps and pass the quiz to finish onboarding. (${stepsComplete}/5 steps done)`}
      </p>

      {/* Step Navigation */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem' }}>
        {STEPS.map((step, i) => {
          const complete = onboarding?.[`step_${i + 1}_complete`]
          return (
            <button key={i} onClick={() => { setCurrentStep(i); setShowQuiz(false) }}
              style={{
                flex: 1, padding: '0.5rem 0.25rem', border: 'none', cursor: 'pointer',
                background: currentStep === i ? 'var(--r-navy)' : complete ? 'var(--r-success-light)' : 'var(--r-border)',
                color: currentStep === i ? 'white' : complete ? 'var(--r-success)' : 'var(--r-text-muted)',
                fontSize: '0.6875rem', fontWeight: 600, borderRadius: '4px',
              }}>
              {i + 1}
            </button>
          )
        })}
        <button onClick={() => setShowQuiz(true)}
          style={{
            flex: 1, padding: '0.5rem 0.25rem', border: 'none', cursor: 'pointer',
            background: showQuiz ? 'var(--r-navy)' : onboarding?.quiz_passed ? 'var(--r-success-light)' : 'var(--r-border)',
            color: showQuiz ? 'white' : onboarding?.quiz_passed ? 'var(--r-success)' : 'var(--r-text-muted)',
            fontSize: '0.6875rem', fontWeight: 600, borderRadius: '4px',
          }}>
          Quiz
        </button>
      </div>

      {/* Step Content */}
      {!showQuiz && (
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{STEPS[currentStep].title}</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.5rem' }}>
            {STEPS[currentStep].description}
          </p>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {STEPS[currentStep].content}
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNext} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
              {currentStep < STEPS.length - 1 ? 'Next Step →' : 'Continue to Quiz →'}
            </button>
          </div>
        </div>
      )}

      {/* Quiz */}
      {showQuiz && (
        <div className="r-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Knowledge Check</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.5rem' }}>
            Answer at least 4 of 5 correctly to complete onboarding.
          </p>

          {QUIZ_QUESTIONS.map((q, qi) => (
            <div key={qi} style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9375rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                {qi + 1}. {q.question}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {q.options.map((opt, oi) => {
                  const selected = quizAnswers[qi] === oi
                  const isCorrect = quizSubmitted && oi === q.correct
                  const isWrong = quizSubmitted && selected && oi !== q.correct
                  return (
                    <label key={oi} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.5rem 0.75rem', borderRadius: '6px', cursor: quizSubmitted ? 'default' : 'pointer',
                      background: isCorrect ? 'var(--r-success-light)' : isWrong ? 'var(--r-error-light)' : selected ? 'var(--r-cream)' : 'transparent',
                      border: selected ? '1px solid var(--r-navy)' : '1px solid var(--r-border)',
                    }}>
                      <input type="radio" name={`q${qi}`} checked={selected}
                        onChange={() => {
                          if (quizSubmitted) return
                          const newAnswers = [...quizAnswers]
                          newAnswers[qi] = oi
                          setQuizAnswers(newAnswers)
                        }}
                        disabled={quizSubmitted} />
                      <span style={{ fontSize: '0.875rem' }}>{opt}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}

          {!quizSubmitted && (
            <button onClick={handleQuizSubmit} className="r-btn r-btn-primary"
              disabled={quizAnswers.some(a => a === null)}
              style={{ fontSize: '0.8125rem' }}>
              Submit Quiz
            </button>
          )}

          {quizSubmitted && (
            <div style={{
              padding: '1rem', borderRadius: '6px', marginTop: '1rem',
              background: onboarding?.quiz_passed ? 'var(--r-success-light)' : 'var(--r-error-light)',
            }}>
              <p style={{
                fontSize: '0.9375rem', fontWeight: 600,
                color: onboarding?.quiz_passed ? 'var(--r-success)' : 'var(--r-error)',
              }}>
                {onboarding?.quiz_passed
                  ? `You passed! Score: ${onboarding.quiz_score}/5. Onboarding is complete.`
                  : `Score: ${onboarding?.quiz_score}/5. You need at least 4/5 to pass. Review the materials and try again.`}
              </p>
              {!onboarding?.quiz_passed && (
                <button onClick={() => { setQuizSubmitted(false); setQuizAnswers(Array(5).fill(null)) }}
                  className="r-btn r-btn-secondary" style={{ marginTop: '0.75rem', fontSize: '0.8125rem' }}>
                  Retry Quiz
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

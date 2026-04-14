'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const STEPS = [
  {
    number: 1,
    title: 'Your Role as Cohort Guide',
    description: 'Understand the full scope of the Cohort Guide role — seminar facilitation and practicum supervision.',
    content: `As an MMR Cohort Guide, you are the primary clinical guide for a developing Montessori educator. Your role combines two responsibilities that were traditionally separate:

**Seminar Facilitation**
You facilitate twice-monthly sessions for your cohort:
• Session A (first half of month): Curriculum Integration — connecting coursework themes to classroom practice
• Session B (second half of month): Practicum & Community — reflecting on practicum experiences, observation debriefs, peer support

**Practicum Supervision**
You are also the practicum supervisor for your assigned residents:
• Host or support a resident in your classroom during their practicum
• Provide direct feedback on teaching at least bi-weekly
• Review album entries through the Cohort Guide portal
• Meet regularly with your resident for coaching conversations
• Participate in the capstone review process
• Collaborate with the program instructor on resident progress

This combined role means you know your residents deeply — you see their growth in both the seminar room and the classroom. MACTE requires that residents complete 540 hours of teaching practice and 90 hours of observation, and you are the primary guide through that journey.`,
  },
  {
    number: 2,
    title: 'Seminar Facilitation Guide',
    description: 'How to prepare for and lead Session A and Session B each month.',
    content: `**Session A — Curriculum Integration (1st half of month)**
Your dashboard automatically pulls the curriculum themes and bundle content from the past two weeks. Use this as your preparation starting point.

Facilitation approach:
• Open with a brief review of the curriculum themes covered in the past cycle
• Ask each resident to share one classroom observation that connects to the current curriculum focus
• Facilitate discussion on how the curriculum themes are showing up in practice
• Close with key takeaways and connections to the upcoming curriculum cycle

**Session B — Practicum & Community (2nd half of month)**
Your dashboard automatically pulls practicum log highlights and observation entries from the past two weeks.

Facilitation approach:
• Open by asking each resident to share one thing they are proud of from the past two weeks
• Move to one thing they are struggling with — facilitate peer support and problem-solving
• Review any observation visit notes or practicum highlights
• Discuss patterns you are seeing across your residents' practice
• Close with goals for the next two weeks

**Session Preparation**
48 hours before each session, residents receive a reminder email with their preparation prompt. You will see this same prompt on your dashboard. Review the preparation materials on your dashboard before each session.

**Attendance**
MACTE requires 90% session attendance. Both sessions must be attended each month for the month to count as complete. Track attendance through the admin panel after each session.`,
  },
  {
    number: 3,
    title: 'Knowledge Check',
    description: 'Quick quiz to confirm your understanding of the Cohort Guide role.',
    quiz: [
      {
        question: 'How many sessions does a Cohort Guide facilitate each month?',
        options: ['One', 'Two', 'Four', 'As needed'],
        correct: 1,
      },
      {
        question: 'What is the focus of Session A?',
        options: ['Practicum reflection', 'Curriculum integration', 'Portfolio review', 'Observation debrief'],
        correct: 1,
      },
      {
        question: 'What content does Session B preparation pull from your dashboard?',
        options: ['Bundle content and curriculum themes', 'Practicum log highlights and observation entries', 'Album entry submissions', 'Assessment scores'],
        correct: 1,
      },
      {
        question: 'What minimum attendance percentage does MACTE require for sessions?',
        options: ['75%', '80%', '85%', '90%'],
        correct: 3,
      },
      {
        question: 'For a month to count as complete, the resident must attend:',
        options: ['At least one session', 'Both Session A and Session B', 'Three sessions', 'Only Session A'],
        correct: 1,
      },
    ],
  },
]

export default function CohortGuideOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    async function checkCompletion() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('residency_profiles')
        .select('onboarding_completed_at')
        .eq('id', user.id)
        .single()
      if (data?.onboarding_completed_at) setCompleted(true)
    }
    checkCompletion()
  }, [])

  async function markComplete() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('residency_profiles').update({
      onboarding_completed_at: new Date().toISOString(),
    }).eq('id', user.id)
    setCompleted(true)
  }

  const step = STEPS[currentStep]
  const isQuiz = !!step.quiz
  const quizPassed = isQuiz && quizSubmitted && step.quiz?.every((q, i) => quizAnswers[i] === q.correct)
  const totalCorrect = isQuiz ? step.quiz?.filter((q, i) => quizAnswers[i] === q.correct).length ?? 0 : 0

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Cohort Guide Onboarding</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Complete all three steps to begin your role as a Cohort Guide.
      </p>

      {completed && (
        <div style={{
          background: 'var(--r-success-light)', border: '1px solid var(--r-success)',
          borderRadius: '8px', padding: '1rem 1.5rem', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.25rem' }}>✓</span>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-success)' }}>
            Onboarding complete! You&apos;re ready to guide your cohort.
          </p>
        </div>
      )}

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => setCurrentStep(i)} style={{
            flex: 1, padding: '0.75rem', borderRadius: '8px', cursor: 'pointer',
            border: currentStep === i ? '2px solid var(--r-navy)' : '1px solid var(--r-border)',
            background: currentStep === i ? 'rgba(14,26,122,0.06)' : 'transparent',
            textAlign: 'left',
          }}>
            <p style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Step {s.number}
            </p>
            <p style={{ fontSize: '0.8125rem', fontWeight: currentStep === i ? 600 : 400 }}>{s.title}</p>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="r-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.5rem' }}>{step.description}</p>

        {step.content && (
          <div style={{ fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {step.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h3 key={i} style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1.25rem', marginBottom: '0.5rem', color: 'var(--r-navy)' }}>{line.replace(/\*\*/g, '')}</h3>
              }
              if (line.startsWith('• ')) {
                return <p key={i} style={{ paddingLeft: '1.5rem', position: 'relative', marginBottom: '0.25rem' }}>
                  <span style={{ position: 'absolute', left: '0.5rem' }}>•</span>{line.substring(2)}
                </p>
              }
              return <p key={i} style={{ marginBottom: line === '' ? '0.75rem' : '0.25rem' }}>{line}</p>
            })}
          </div>
        )}

        {isQuiz && step.quiz && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {step.quiz.map((q, qi) => (
              <div key={qi}>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {qi + 1}. {q.question}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {q.options.map((opt, oi) => {
                    const selected = quizAnswers[qi] === oi
                    const isCorrect = quizSubmitted && oi === q.correct
                    const isWrong = quizSubmitted && selected && oi !== q.correct
                    return (
                      <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                        style={{
                          padding: '0.5rem 0.75rem', borderRadius: '6px', textAlign: 'left',
                          border: selected ? '2px solid var(--r-navy)' : '1px solid var(--r-border)',
                          background: isCorrect ? 'var(--r-success-light)' : isWrong ? '#fce4ec' : selected ? 'rgba(14,26,122,0.06)' : 'transparent',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                          fontSize: '0.875rem',
                          color: isCorrect ? 'var(--r-success)' : isWrong ? '#c62828' : 'inherit',
                          fontWeight: selected ? 600 : 400,
                        }}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                className="r-btn r-btn-primary"
                disabled={Object.keys(quizAnswers).length < step.quiz.length}
                style={{ fontSize: '0.8125rem', alignSelf: 'flex-start' }}
              >
                Submit Answers
              </button>
            ) : (
              <div style={{
                padding: '1rem', borderRadius: '8px',
                background: quizPassed ? 'var(--r-success-light)' : 'var(--r-feedback-bg)',
              }}>
                <p style={{
                  fontWeight: 600, fontSize: '0.9375rem',
                  color: quizPassed ? 'var(--r-success)' : 'var(--r-feedback-color)',
                }}>
                  {quizPassed
                    ? `All ${totalCorrect} correct — you're ready!`
                    : `${totalCorrect} of ${step.quiz.length} correct. Review the material and try again.`
                  }
                </p>
                {!quizPassed && (
                  <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false) }}
                    className="r-btn" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Try Again
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--r-border)' }}>
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="r-btn" style={{ fontSize: '0.8125rem', opacity: currentStep === 0 ? 0.3 : 1 }}
          >
            ← Previous
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button onClick={() => setCurrentStep(prev => prev + 1)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
              Next →
            </button>
          ) : quizPassed && !completed ? (
            <button onClick={markComplete} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
              Complete Onboarding
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

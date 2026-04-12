'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SampleLesson } from '@/lib/residency/sampleLessons'
import {
  primaryLessons,
  elementaryLessons,
  strandDescriptions,
} from '@/lib/residency/sampleLessons'

// ── Lesson Reader ─────────────────────────────────────────────────────────────

function LessonReader({ lesson, onClose }: { lesson: SampleLesson; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(14,26,122,0.6)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '2rem 1rem',
        overflowY: 'auto',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: '#fff',
          maxWidth: '780px',
          width: '100%',
          padding: '0',
          position: 'relative',
          boxShadow: '0 25px 80px rgba(14,26,122,0.3)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#0e1a7a',
            padding: '2rem 2.5rem',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
            }}
          >
            Close ✕
          </button>
          <p
            style={{
              color: '#d6a758',
              fontSize: '0.6875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}
          >
            {lesson.strand} · {lesson.level === 'primary' ? 'Primary 3–6' : 'Elementary 6–12'}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            {lesson.title}
          </h2>
        </div>

        {/* Body */}
        <div style={{ padding: '2.5rem' }}>
          <LessonSection label="Why This Lesson Matters" content={lesson.whyThisMatters} />
          <LessonSection label="Direct Aim" content={lesson.directAim} />
          <LessonSection label="Indirect Aim" content={lesson.indirectAim} />
          <LessonSection label="Equity Aim" content={lesson.equityAim} highlighted />
          <LessonSection label="Materials" content={lesson.materials} />
          <LessonSection label="The Presentation" content={lesson.presentation} />
          <LessonSection label="Points of Interest" content={lesson.pointsOfInterest} />
          <LessonSection label="Variations & Extensions" content={lesson.variationsAndExtensions} />
          <LessonSection label="Neurodivergence & Behavior" content={lesson.neurodivergenceNotes} highlighted />

          {/* CTA */}
          <div
            style={{
              marginTop: '2.5rem',
              padding: '1.75rem',
              background: '#0e1a7a',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}
            >
              This is one lesson. The full{' '}
              {lesson.level === 'primary' ? 'Primary' : 'Elementary'} curriculum has{' '}
              {lesson.level === 'primary' ? '213' : '303'} lessons written at this depth.
              Join the waitlist to be notified when applications open.
            </p>
            <a
              href="/residency/waitlist"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#d6a758',
                color: '#fff',
                padding: '0.75rem 1.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.03em',
              }}
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function LessonSection({
  label,
  content,
  highlighted = false,
}: {
  label: string
  content: string
  highlighted?: boolean
}) {
  return (
    <div
      style={{
        marginBottom: '1.75rem',
        background: highlighted ? '#fdf5e4' : 'transparent',
        padding: highlighted ? '1.25rem 1.5rem' : '0',
        borderLeft: highlighted ? '3px solid #d6a758' : 'none',
      }}
    >
      <h3
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#0e1a7a',
          marginBottom: '0.625rem',
        }}
      >
        {label}
      </h3>
      <p
        style={{
          fontSize: '0.9375rem',
          lineHeight: 1.85,
          color: '#374151',
        }}
      >
        {content}
      </p>
    </div>
  )
}

// ── Strand Card ───────────────────────────────────────────────────────────────

function StrandCard({
  lesson,
  onRead,
}: {
  lesson: SampleLesson
  onRead: () => void
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E2DDD6',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div>
        <p
          style={{
            color: '#d6a758',
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.375rem',
          }}
        >
          {lesson.strand}
        </p>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#0e1a7a',
            lineHeight: 1.3,
            marginBottom: '0.5rem',
          }}
        >
          {lesson.title}
        </h3>
        <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6 }}>
          {strandDescriptions[lesson.strand] ?? ''}
        </p>
      </div>
      <button
        onClick={onRead}
        style={{
          alignSelf: 'flex-start',
          background: '#0e1a7a',
          color: '#fff',
          border: 'none',
          padding: '0.6rem 1.25rem',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.03em',
          marginTop: 'auto',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#162270' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#0e1a7a' }}
      >
        Read Sample Lesson
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SampleLessonsPage() {
  const [activeTab, setActiveTab] = useState<'primary' | 'elementary'>('primary')
  const [openLesson, setOpenLesson] = useState<SampleLesson | null>(null)

  const activeLessons = activeTab === 'primary' ? primaryLessons : elementaryLessons

  return (
    <>
      {openLesson && (
        <LessonReader lesson={openLesson} onClose={() => setOpenLesson(null)} />
      )}

      {/* ── Hero ── */}
      <section
        className="grain"
        style={{ background: '#0e1a7a', padding: '7rem 0 4rem' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-5 font-medium">
            <Link href="/residency" style={{ color: 'inherit', textDecoration: 'none' }}>
              Montessori Makers Residency
            </Link>{' '}
            / Sample Lessons
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              color: '#fff',
              lineHeight: 1.15,
              maxWidth: '780px',
              marginBottom: '1.25rem',
            }}
          >
            Sample Lessons from the MMR Curriculum
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              maxWidth: '640px',
              marginBottom: '2.5rem',
            }}
          >
            These are real lessons from the MMR curriculum. Every lesson in the program
            is written at this depth, with this equity lens, and with this level of
            attention to the full range of children in your classroom. What you see here
            is not a sample of what MMR aspires to be. It is what MMR already is.
          </p>
          <a
            href="/residency/waitlist"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer"
            style={{
              display: 'inline-block',
              background: '#d6a758',
              color: '#fff',
              padding: '0.875rem 2rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              textDecoration: 'none',
            }}
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* ── Tab nav ── */}
      <div
        style={{
          background: '#070e3d',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          position: 'sticky',
          top: '0',
          zIndex: 40,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ display: 'flex', gap: '0' }}>
            {(
              [
                { key: 'primary', label: 'Primary 3–6', count: '5 strands · 213 lessons' },
                { key: 'elementary', label: 'Elementary 6–12', count: '9 strands · 303 lessons' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '1.25rem 1.75rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.key ? '3px solid #d6a758' : '3px solid transparent',
                  transition: 'border-color 0.15s',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.5)',
                    lineHeight: 1.3,
                  }}
                >
                  {tab.label}
                </p>
                <p style={{ fontSize: '0.6875rem', color: '#d6a758', opacity: 0.75, marginTop: '0.125rem' }}>
                  {tab.count}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Strand grid ── */}
      <section style={{ background: '#FAF9F7', padding: '4rem 0 6rem' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p
            style={{
              fontSize: '0.875rem',
              color: '#64748B',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginBottom: '3rem',
            }}
          >
            {activeTab === 'primary'
              ? 'The Primary curriculum covers five strands across 213 lessons. Each sample below is drawn from a different strand so you can experience the full range of what residents study.'
              : 'The Elementary curriculum covers nine strands across 303 lessons. Each sample below represents a different strand — from the Great Lessons to Geometry to Music — all written at the same depth.'}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {activeLessons.map((lesson) => (
              <StrandCard
                key={lesson.id}
                lesson={lesson}
                onRead={() => setOpenLesson(lesson)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="grain"
        style={{ background: '#0e1a7a', padding: '5rem 0', textAlign: 'center' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            MMR is forming its first cohort for fall 2026.
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem',
              lineHeight: 1.75,
              maxWidth: '580px',
              margin: '0 auto 2rem',
            }}
          >
            Every lesson in the program is written at this depth. If what you read here
            is what you have been looking for, join the waitlist.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/residency/waitlist"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer"
              style={{
                display: 'inline-block',
                background: '#d6a758',
                color: '#fff',
                padding: '0.875rem 2rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.03em',
              }}
            >
              Join the Waitlist
            </a>
            <Link
              href="/residency"
              style={{
                display: 'inline-block',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                padding: '0.875rem 2rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Learn About MMR
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const tiers = [
  {
    id: 'surveyor',
    name: 'Surveyor',
    scope: 'Classroom level',
    color: '#d6a758',
    description:
      'Classroom visibility and guide workflow. Track lessons, observations, and each child\u2019s progress without retrofitting generic tools.',
    features: [
      'Lesson tracking and planning',
      'Observation records',
      'Classroom material inventory',
      'Individual child progress visibility',
    ],
  },
  {
    id: 'north-star',
    name: 'North Star',
    scope: 'School level',
    color: '#2D6A4F',
    description:
      'The operational layer that keeps the school running. Student records, attendance, family communication, and daily systems.',
    features: [
      'Student records and profiles',
      'Attendance and daily operations',
      'Family communication',
      'School-wide scheduling',
    ],
  },
  {
    id: 'mapmaker',
    name: 'Mapmaker',
    scope: 'Organization level',
    color: '#1D4ED8',
    description:
      'Organizational coordination. Admissions, staffing, adult culture, and the systems that make a school function as an institution.',
    features: [
      'Admissions and enrollment',
      'Staffing and HR systems',
      'Adult culture and performance',
      'Cross-team communication',
    ],
  },
  {
    id: 'atlas',
    name: 'Atlas',
    scope: 'Leadership level',
    color: '#7C3AED',
    description:
      'Leadership and governance. Financial visibility, board tools, strategic planning, and the insight that enables values-aligned decisions at scale.',
    features: [
      'Financial dashboards and planning',
      'Governance and board tools',
      'Strategic planning workflows',
      'Leadership insight and reporting',
    ],
  },
]

const tierLinks: Record<string, string> = {
  surveyor: '/mmap/surveyor',
  'north-star': '/mmap/north-star',
  mapmaker: '/mmap/mapmaker',
  atlas: '/mmap/atlas',
}

const problemStatements = [
  'Guides tracking lessons in one app, attendance in another, observations in a notebook',
  'Family communication that bypasses leadership because there\u2019s no unified system',
  'Directors holding institutional memory in their heads because there\u2019s no place to put it',
  'Leadership making decisions without data that reflects Montessori values',
]

const whatMmapContrasts = [
  { before: 'Five disconnected apps', after: 'One unified system where data flows between layers' },
  { before: 'Generic lesson plan templates', after: 'Workflows built for the three-hour work cycle' },
  { before: 'Compliance-first data collection', after: 'Observation-first documentation that serves the guide' },
  { before: 'Equity as a premium add-on', after: 'Equity embedded across every tier from day one' },
]

const differentiationCards = [
  {
    title: 'One system, not patchwork',
    body: 'The Alignment Map replaces the collection of disconnected tools most Montessori schools are held together by. One login. One data model. One system that knows what the other parts are doing.',
  },
  {
    title: 'Built for Montessori practice',
    body: 'Not adapted from a generic school platform. Every workflow, every data point, every report reflects how Montessori schools actually operate\u2014from the three-hour work cycle to multi-age progression.',
  },
  {
    title: 'Equity in the architecture',
    body: 'Equity isn\u2019t an add-on or a premium tier. It runs through every layer of the Alignment Map\u2014surfacing patterns in attendance, belonging, access, and adult culture from day one.',
  },
  {
    title: 'Clarity without corporatizing',
    body: 'The Alignment Map gives schools the operational clarity and data infrastructure they need to run well\u2014without turning a Montessori school into a managed corporate entity.',
  },
]

const ecosystemCards = [
  { title: 'Advisory', desc: 'System design & leadership support', href: '/advisory' },
  { title: 'Institute', desc: 'Leadership development', href: '/institute' },
  { title: 'MatchHub', desc: 'Philosophy-aligned hiring', href: '/matchhub' },
  { title: 'MMAS', desc: 'Montessori-native assessment', href: '/mmas' },
]

function TopographicIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const gridLines = [48, 96, 144, 192, 240, 288, 336, 384, 432]
  const contours = [
    { rx: 218, ry: 142, opacity: 0.10 },
    { rx: 182, ry: 118, opacity: 0.17 },
    { rx: 146, ry: 95,  opacity: 0.24 },
    { rx: 110, ry: 71,  opacity: 0.32 },
    { rx:  74, ry: 47,  opacity: 0.44 },
    { rx:  38, ry: 24,  opacity: 0.60 },
  ]
  return (
    <svg
      ref={ref}
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full max-w-md"
    >
      {/* Fine orthogonal grid */}
      {gridLines.map((v) => (
        <g key={v}>
          <line x1={v}   y1={0}   x2={v}   y2={480} stroke="white" strokeWidth={0.5} strokeOpacity={0.05} />
          <line x1={0}   y1={v}   x2={480} y2={v}   stroke="white" strokeWidth={0.5} strokeOpacity={0.05} />
        </g>
      ))}

      {/* Diagonal guide lines (45°) */}
      <line x1={0}   y1={0}   x2={480} y2={480} stroke="white" strokeWidth={0.5} strokeOpacity={0.04} strokeDasharray="3 9" />
      <line x1={480} y1={0}   x2={0}   y2={480} stroke="white" strokeWidth={0.5} strokeOpacity={0.04} strokeDasharray="3 9" />

      {/* Center alignment axes */}
      <line x1={0}   y1={240} x2={480} y2={240} stroke="white" strokeWidth={0.5} strokeOpacity={0.09} strokeDasharray="4 8" />
      <line x1={240} y1={0}   x2={240} y2={480} stroke="white" strokeWidth={0.5} strokeOpacity={0.09} strokeDasharray="4 8" />

      {/* Topographic contour rings — draw in from outside → center */}
      {contours.map(({ rx, ry, opacity }, i) => (
        <motion.ellipse
          key={i}
          cx={240}
          cy={240}
          rx={rx}
          ry={ry}
          transform="rotate(-20 240 240)"
          stroke="#d6a758"
          strokeWidth={1}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity } : {}}
          transition={{
            pathLength: { duration: 1.4, delay: i * 0.18, ease: 'easeInOut' },
            opacity: { duration: 0.4, delay: i * 0.18 },
          }}
        />
      ))}

      {/* Corner registration marks */}
      <motion.path
        d="M 22 50 L 22 22 L 50 22"
        stroke="#d6a758" strokeWidth={1} strokeLinecap="square"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
      />
      <motion.path
        d="M 430 22 L 458 22 L 458 50"
        stroke="#d6a758" strokeWidth={1} strokeLinecap="square"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 0.5, delay: 1.1 }}
      />
      <motion.path
        d="M 22 430 L 22 458 L 50 458"
        stroke="#d6a758" strokeWidth={1} strokeLinecap="square"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 0.5, delay: 1.15 }}
      />
      <motion.path
        d="M 430 458 L 458 458 L 458 430"
        stroke="#d6a758" strokeWidth={1} strokeLinecap="square"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* Crosshair at center */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        <line x1={222} y1={240} x2={258} y2={240} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.75} />
        <line x1={240} y1={222} x2={240} y2={258} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.75} />
        <circle cx={240} cy={240} r={4.5} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.75} />
        <circle cx={240} cy={240} r={1.5} fill="#d6a758" fillOpacity={0.75} />
      </motion.g>
    </svg>
  )
}

// ─── Tier icon components (scaled-down versions of the hero band glyphs) ──────

function SurveyorIcon({ className = 'w-10 h-10' }: { className?: string }) {
  const ticks = [-15, -10, 10, 15]
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <circle cx={20} cy={20} r={18} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.35} />
      <circle cx={20} cy={20} r={12} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.45} />
      <circle cx={20} cy={20} r={6}  stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.60} />
      <line x1={2}  y1={20} x2={38} y2={20} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.65} />
      <line x1={20} y1={2}  x2={20} y2={38} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.65} />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={20+v} y1={18} x2={20+v} y2={22} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.45} />
          <line x1={18} y1={20+v} x2={22} y2={20+v} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.45} />
        </g>
      ))}
      <circle cx={20} cy={20} r={1.5} fill="#d6a758" fillOpacity={0.80} />
    </svg>
  )
}

function NorthStarIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const isCard = deg % 90 === 0
        const r1 = isCard ? 5 : 3
        const r2 = isCard ? 18 : 12
        const rad = (deg * Math.PI) / 180
        return (
          <line key={deg}
            x1={20 + Math.cos(rad) * r1} y1={20 + Math.sin(rad) * r1}
            x2={20 + Math.cos(rad) * r2} y2={20 + Math.sin(rad) * r2}
            stroke="#d6a758" strokeWidth={isCard ? 0.85 : 0.6}
            strokeOpacity={isCard ? 0.70 : 0.40}
          />
        )
      })}
      <circle cx={20} cy={20} r={19} stroke="#d6a758" strokeWidth={0.6} strokeOpacity={0.22} />
      <path d="M 20 5.5 L 21.8 9.5 L 20 11.5 L 18.2 9.5 Z" fill="#d6a758" fillOpacity={0.80} />
      <circle cx={20} cy={20} r={2.5} stroke="#d6a758" strokeWidth={1} strokeOpacity={0.80} />
      <circle cx={20} cy={20} r={1}   fill="#d6a758" fillOpacity={0.80} />
    </svg>
  )
}

function MapmakerIcon({ className = 'w-10 h-10' }: { className?: string }) {
  const contours = [
    { rx: 18, ry: 12, op: 0.22 },
    { rx: 14, ry:  9, op: 0.32 },
    { rx: 10, ry:  6, op: 0.44 },
    { rx:  6, ry:  4, op: 0.58 },
    { rx:  3, ry:  2, op: 0.75 },
  ]
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      {contours.map(({ rx, ry, op }, i) => (
        <ellipse key={i} cx={20} cy={20} rx={rx} ry={ry}
          transform="rotate(-22 20 20)"
          stroke="#d6a758" strokeWidth={0.75} strokeOpacity={op} />
      ))}
      <line x1={14} y1={20} x2={26} y2={20} stroke="#d6a758" strokeWidth={1} strokeOpacity={0.70} />
      <line x1={20} y1={14} x2={20} y2={26} stroke="#d6a758" strokeWidth={1} strokeOpacity={0.70} />
      <circle cx={20} cy={20} r={1.5} fill="#d6a758" fillOpacity={0.80} />
    </svg>
  )
}

function AtlasIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <circle cx={20} cy={20} r={18} stroke="#d6a758" strokeWidth={0.85} strokeOpacity={0.30} />
      <ellipse cx={20} cy={20} rx={18} ry={11} stroke="#d6a758" strokeWidth={0.6} strokeOpacity={0.28} />
      <ellipse cx={20} cy={20} rx={18} ry={5.5} stroke="#d6a758" strokeWidth={0.6} strokeOpacity={0.22} />
      {[-36, 0, 36].map((deg, i) => (
        <ellipse key={i} cx={20} cy={20} rx={7} ry={18}
          transform={`rotate(${deg} 20 20)`}
          stroke="#d6a758" strokeWidth={0.6} strokeOpacity={0.22} />
      ))}
      <circle cx={20} cy={2}  r={1.5} fill="#d6a758" fillOpacity={0.55} />
      <circle cx={20} cy={38} r={1.5} fill="#d6a758" fillOpacity={0.55} />
      <circle cx={20} cy={20} r={2}   stroke="#d6a758" strokeWidth={1} strokeOpacity={0.70} />
    </svg>
  )
}

const TIER_ICONS: Record<string, React.ReactNode> = {
  surveyor:     <SurveyorIcon  className="w-9 h-9" />,
  'north-star': <NorthStarIcon className="w-9 h-9" />,
  mapmaker:     <MapmakerIcon  className="w-9 h-9" />,
  atlas:        <AtlasIcon     className="w-9 h-9" />,
}

// ─── Data Flow Diagram ────────────────────────────────────────────────────────

function DataFlowDiagram() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  // Listed top→bottom in SVG space (Atlas = smallest y = top)
  const layers = [
    {
      label: 'Atlas', scope: 'Leadership', color: '#7C3AED', y: 55,
      data: 'Financial dashboards · Governance · Strategic planning',
    },
    {
      label: 'Mapmaker', scope: 'Organization', color: '#1D4ED8', y: 175,
      data: 'Admissions & staffing · Adult culture · Cross-team ops',
    },
    {
      label: 'North Star', scope: 'School', color: '#2D6A4F', y: 295,
      data: 'Attendance · Family comms · Student records',
    },
    {
      label: 'Surveyor', scope: 'Classroom', color: '#d6a758', y: 415,
      data: 'Lesson plans · Observations · Work cycle records',
    },
  ]

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 490"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg"
      aria-hidden="true"
    >
      {/* Spine — draws from Surveyor (bottom) up to Atlas (top) */}
      <motion.path
        d="M 72 415 L 72 55"
        stroke="rgba(14,26,122,0.15)"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Arrow at top of spine — sits above Atlas node (y=55), placed at y=42 */}
      <motion.path
        d="M 67 48 L 72 36 L 77 48"
        stroke="rgba(124,58,237,0.45)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.1 }}
      />

      {/* Axis labels — clear of all node text */}
      <motion.text x={10} y={444} fontSize={8} fill="rgba(214,167,88,0.65)"
        fontFamily="system-ui, sans-serif" letterSpacing={1.6}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >OBSERVATION</motion.text>
      <motion.text x={10} y={32} fontSize={8} fill="rgba(124,58,237,0.55)"
        fontFamily="system-ui, sans-serif" letterSpacing={1.6}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.15 }}
      >INSIGHT</motion.text>

      {/* Tier nodes, labels, and data tags — stagger bottom→top */}
      {layers.map(({ label, scope, color, y, data }, i) => {
        const d = (3 - i) * 0.15 // bottom first: Surveyor(i=3)→Atlas(i=0)
        return (
          <g key={label}>
            {/* Horizontal connector from spine to label area */}
            <motion.path
              d={`M 72 ${y} L 108 ${y}`}
              stroke={color} strokeWidth={1} strokeOpacity={0.45}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.75 + d }}
            />

            {/* Node ring */}
            <motion.circle cx={72} cy={y} r={12}
              stroke={color} strokeWidth={1.5} fill={color} fillOpacity={0.09}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + d, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Node dot */}
            <motion.circle cx={72} cy={y} r={4.5}
              fill={color} fillOpacity={0.9}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.72 + d }}
            />

            {/* Text block — tier name, scope, and data items */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.88 + d }}
            >
              <text x={118} y={y - 4} fontSize={14} fontWeight={600}
                fill="#0e1a7a" fontFamily="system-ui, sans-serif">{label}</text>
              <text x={118} y={y + 11} fontSize={9}
                fill="rgba(100,116,139,0.85)"
                fontFamily="system-ui, sans-serif" letterSpacing={1.4}
              >{scope.toUpperCase()}</text>
              <text x={118} y={y + 27} fontSize={9.5}
                fill={color} fillOpacity={0.72}
                fontFamily="system-ui, sans-serif">{data}</text>
            </motion.g>
          </g>
        )
      })}

      {/* Flowing data dots — travel up the spine continuously */}
      {([0, 0.38, 0.72] as number[]).map((phase, i) => (
        <motion.circle
          key={i}
          cx={72}
          r={2.8}
          fill="#d6a758"
          initial={{ cy: 415, opacity: 0 }}
          animate={inView ? {
            cy: [415, 55],
            opacity: [0, 0.85, 0.85, 0],
          } : {}}
          transition={{
            cy: { duration: 2.6, delay: phase * 2.6, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 2.6, delay: phase * 2.6, repeat: Infinity, times: [0, 0.07, 0.93, 1] },
          }}
        />
      ))}
    </svg>
  )
}

// ─── Dashboard UI Mockup ───────────────────────────────────────────────────────

function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const bars = [72, 88, 61, 95, 78, 84, 69, 92, 74, 87]
  const tiers = [
    { name: 'Surveyor',   color: '#d6a758', pct: 94 },
    { name: 'North Star', color: '#2D6A4F', pct: 87 },
    { name: 'Mapmaker',   color: '#1D4ED8', pct: 76 },
    { name: 'Atlas',      color: '#7C3AED', pct: 68 },
  ]
  return (
    <div
      ref={ref}
      className="w-full rounded-sm overflow-hidden shadow-2xl"
      style={{
        background: '#0a1260',
        border: '1px solid rgba(255,255,255,0.10)',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: 560,
      }}
    >
      {/* Window chrome */}
      <div style={{ background: '#070e3d', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ flex: 1 }} />
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, letterSpacing: '0.12em' }}>MMAP · WORKSPACE</span>
      </div>

      <div style={{ display: 'flex', minHeight: 380 }}>
        {/* Sidebar */}
        <div style={{ width: 140, background: '#070e3d', borderRight: '1px solid rgba(255,255,255,0.07)', padding: '20px 0', flexShrink: 0 }}>
          <div style={{ padding: '0 14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 12 }}>
            <div style={{ color: '#d6a758', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 2 }}>School</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 500 }}>Lincoln Montessori</div>
          </div>
          {[
            { label: 'Overview', active: true },
            { label: 'Surveyor', dot: '#d6a758' },
            { label: 'North Star', dot: '#2D6A4F' },
            { label: 'Mapmaker', dot: '#1D4ED8' },
            { label: 'Atlas', dot: '#7C3AED' },
            { label: 'Reports', dot: null },
            { label: 'Settings', dot: null },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: item.active ? 'rgba(214,167,88,0.10)' : 'transparent',
                borderLeft: item.active ? '2px solid #d6a758' : '2px solid transparent',
              }}
            >
              {item.dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />}
              <span style={{ color: item.active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)', fontSize: 11 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 18, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600 }}>School Overview</div>
              <div style={{ color: 'rgba(255,255,255,0.30)', fontSize: 10, marginTop: 2 }}>2025–26 Academic Year</div>
            </div>
            <div style={{ background: 'rgba(214,167,88,0.12)', border: '1px solid rgba(214,167,88,0.25)', borderRadius: 2, padding: '4px 10px', color: '#d6a758', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Pilot Active
            </div>
          </div>

          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Alignment Score', value: '91%', delta: '+4%' },
              { label: 'Active Guides', value: '18',   delta: 'all tiers' },
              { label: 'Observations', value: '1,204', delta: 'this month' },
            ].map((m) => (
              <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 2, padding: '10px 12px' }}>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.90)', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{m.value}</div>
                <div style={{ color: '#d6a758', fontSize: 9, marginTop: 4 }}>{m.delta}</div>
              </div>
            ))}
          </div>

          {/* Attendance bar chart */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>Daily Attendance — Last 10 Days</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 48 }}>
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === bars.length - 1 ? '#d6a758' : 'rgba(214,167,88,0.30)',
                    borderRadius: 1,
                    transformOrigin: 'bottom',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </div>

          {/* Tier alignment indicators */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2, padding: '12px 14px' }}>
            <div style={{ color: 'rgba(255,255,255,0.40)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>Tier Alignment</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tiers.map((t, ti) => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, width: 70, flexShrink: 0 }}>{t.name}</span>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                    <motion.div
                      style={{ width: `${t.pct}%`, height: '100%', background: t.color, borderRadius: 2, transformOrigin: 'left center' }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.65, delay: 0.6 + ti * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span style={{ color: t.color, fontSize: 10, width: 28, textAlign: 'right', flexShrink: 0 }}>{t.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Subtle grid background (used on select sections) ─────────────────────────

const systemGridStyle: React.CSSProperties = {
  backgroundImage: [
    'linear-gradient(rgba(14,26,122,0.035) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(14,26,122,0.035) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '48px 48px',
}

function TierExplorer() {
  const [active, setActive] = useState(0)
  const tier = tiers[active]

  return (
    <div className="flex flex-col md:flex-row gap-0 overflow-hidden border border-[#E2DDD6]">
      {/* ── Left: tier selector stack ─────────────────────────────────── */}
      <div className="flex flex-row md:flex-col md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-[#E2DDD6]">
        {tiers.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className="relative flex-1 md:flex-none text-left px-5 py-4 md:py-5 transition-colors duration-150"
            style={{
              background: active === i ? '#fff' : '#F7F4EE',
              borderBottom: i < tiers.length - 1 ? '1px solid #E2DDD6' : 'none',
            }}
          >
            {/* Active indicator */}
            {active === i && (
              <motion.div
                layoutId="tier-active-bar"
                className="absolute left-0 top-0 bottom-0 w-[3px] md:w-[3px]"
                style={{ background: t.color }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <div className="pl-2">
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-medium mb-0.5"
                style={{ color: active === i ? t.color : '#94A3B8' }}
              >
                {String(i + 1).padStart(2, '0')} · {t.scope}
              </p>
              <p
                className="text-sm md:text-base font-semibold leading-tight"
                style={{
                  color: active === i ? '#0e1a7a' : '#94A3B8',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {t.name}
              </p>
            </div>
          </button>
        ))}
        {/* Architecture hint — bottom label */}
        <div className="hidden md:flex items-center gap-2 px-5 py-4 mt-auto border-t border-[#E2DDD6]">
          <svg width="12" height="28" viewBox="0 0 12 28" fill="none" aria-hidden="true">
            <line x1="6" y1="0" x2="6" y2="28" stroke="#d6a758" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M 3 22 L 6 28 L 9 22" stroke="#d6a758" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          </svg>
          <span className="text-[9px] tracking-[0.16em] uppercase text-[#94A3B8]">Foundation up</span>
        </div>
      </div>

      {/* ── Right: detail panel ────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden bg-white">
        {/* Faint tier-color wash behind the panel */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{ background: `${tier.color}06` }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-8 md:p-10 flex flex-col gap-6 h-full"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="inline-block text-[10px] tracking-[0.2em] uppercase font-semibold px-2 py-0.5 mb-3"
                  style={{ background: `${tier.color}18`, color: tier.color }}
                >
                  {tier.scope}
                </div>
                <h3
                  className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {tier.name}
                </h3>
              </div>
              <div className="opacity-40 flex-shrink-0 mt-1">
                {TIER_ICONS[tier.id]}
              </div>
            </div>

            {/* Description */}
            <p className="text-[#374151] text-base md:text-lg leading-relaxed max-w-xl">
              {tier.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {tier.features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-[5px] w-[5px] h-[5px] rounded-full" style={{ background: tier.color }} />
                  <span className="text-sm text-[#374151] leading-snug">{f}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E2DDD6]">
              <Link
                href={tierLinks[tier.id]}
                className="text-[#0e1a7a] text-sm font-medium hover:underline"
              >
                Watch how it works &rarr;
              </Link>
              <div className="flex gap-1.5">
                {tiers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                    style={{ background: i === active ? tier.color : '#D1D5DB' }}
                    aria-label={`View ${tiers[i].name}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function DemoCTA() {
  return (
    <div className="flex justify-center py-10">
      <Link
        href="/mmap/demo"
        className="inline-flex items-center gap-3 text-[#0e1a7a] text-sm font-medium border-b border-[#0e1a7a] pb-0.5 hover:text-[#d6a758] hover:border-[#d6a758] transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-[#d6a758]" />
        See this in action &rarr; Watch the demo
      </Link>
    </div>
  )
}

export default function MMAPPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-[#0e1a7a] pt-28 pb-20 md:pt-32 md:pb-24 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div>
            <FadeIn>
              <div className="mb-5">
                <Logo name="mmap" heroWidth={220} heroHeight={220} />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-5">
                <span className="relative flex items-center justify-center w-1.5 h-1.5 flex-shrink-0">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#d6a758]"
                    animate={{ scale: [1, 2.2, 1], opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[#d6a758]" />
                </span>
                <span className="text-white text-xs tracking-[0.15em] uppercase">Pilot Platform &mdash; Limited Early Access</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.18}>
              <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-5" style={serif}>
                The operating system for Montessori schools.
              </h1>
            </FadeIn>
            <FadeIn delay={0.26}>
              <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                A digital prepared environment for Montessori schools. No patchwork. No
                competing tools. Just systems that finally reflect what you believe.
              </p>
            </FadeIn>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mmap/signin"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Sign In to Platform &rarr;
              </Link>
              <Link
                href="/mmap/demo"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Watch the Demo
              </Link>
              <Link
                href="/contact?source=MMAP"
                className="text-white/50 text-sm px-2 py-4 hover:text-white transition-colors text-center"
              >
                Request Early Access
              </Link>
            </div>
          </div>

          {/* Real platform screenshot */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-[560px] rounded-sm overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/images/mmap/mmap-01-leadership-dashboard.png"
                alt="Alignment Map Leadership Dashboard"
                width={1200}
                height={678}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#070e3d] border-b border-white/10 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '4',      label: 'Integrated tiers',       sub: 'Classroom to boardroom' },
            { value: '1',      label: 'Login. One system.',      sub: 'No patchwork' },
            { value: '100%',   label: 'Montessori-native',       sub: 'Not adapted — built' },
            { value: '0',      label: 'Generic workarounds',     sub: 'Every workflow is yours' },
          ].map((stat) => (
            <div key={stat.value} className="text-center md:text-left">
              <div className="text-[#d6a758] text-3xl md:text-4xl font-bold tracking-tight mb-1" style={serif}>
                {stat.value}
              </div>
              <div className="text-white text-sm font-medium leading-snug">{stat.label}</div>
              <div className="text-white/35 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Why */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why the Alignment Map Exists</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Montessori schools don&apos;t need more tools. They need their systems to
              work together.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori schools are rich in mission. But their systems often lag behind
              their values. Generic school software wasn&apos;t built for Montessori&mdash;it
              forces you to translate everything, and something always gets lost.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Alignment Map brings mission and infrastructure into alignment. Built from the ground
              up for the way Montessori schools actually operate&mdash;without corporatizing what
              makes them unique.
            </p>
            <p className="text-[#0e1a7a] font-semibold text-lg">
              Alignment is not an aspiration. It is infrastructure.
            </p>
            <div className="mt-4">
              {problemStatements.map((statement, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-3 border-b border-[#E2DDD6] py-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <p className="text-[#374151] text-sm leading-relaxed">{statement}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DemoCTA />

      {/* Visual break — North Star · Mapmaker · Atlas */}
      <div className="w-full bg-[#0e1a7a] h-56 md:h-72 overflow-hidden">
        <svg
          viewBox="0 0 1200 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Background grid */}
          {[52, 104, 156, 208].map((v) => (
            <line key={`h${v}`} x1={0} y1={v} x2={1200} y2={v}
              stroke="white" strokeWidth={0.5} strokeOpacity={0.04} />
          ))}
          {Array.from({ length: 24 }, (_, i) => (i + 1) * 50).map((v) => (
            <line key={`v${v}`} x1={v} y1={0} x2={v} y2={260}
              stroke="white" strokeWidth={0.5} strokeOpacity={0.04} />
          ))}

          {/* Full-width mid-axis */}
          <line x1={0} y1={130} x2={1200} y2={130}
            stroke="white" strokeWidth={0.5} strokeOpacity={0.07} strokeDasharray="4 8" />

          {/* ── SURVEYOR (x=150) — survey reticle ──────────────────────── */}
          <g transform="translate(150 130)">
            {/* Concentric reference rings */}
            <circle cx={0} cy={0} r={90} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.14} />
            <circle cx={0} cy={0} r={62} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.18} />
            <circle cx={0} cy={0} r={34} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.26} />
            {/* Full crosshair to outer ring */}
            <line x1={-90} y1={0} x2={90} y2={0} stroke="#d6a758" strokeWidth={1} strokeOpacity={0.55} />
            <line x1={0} y1={-90} x2={0} y2={90} stroke="#d6a758" strokeWidth={1} strokeOpacity={0.55} />
            {/* Graduated tick marks along axes */}
            {[-75, -62, -50, -34, -18, 18, 34, 50, 62, 75].map((v) => (
              <g key={v}>
                <line x1={v} y1={-5} x2={v} y2={5} stroke="#d6a758" strokeWidth={1} strokeOpacity={0.38} />
                <line x1={-5} y1={v} x2={5} y2={v} stroke="#d6a758" strokeWidth={1} strokeOpacity={0.38} />
              </g>
            ))}
            {/* Center point */}
            <circle cx={0} cy={0} r={4} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.80} />
            <circle cx={0} cy={0} r={1.5} fill="#d6a758" fillOpacity={0.80} />
            <text x={0} y={112} textAnchor="middle"
              fontSize={9} letterSpacing={3}
              fill="#d6a758" fillOpacity={0.40}
              fontFamily="system-ui, sans-serif"
            >SURVEYOR</text>
          </g>

          {/* ── NORTH STAR (x=450) — compass rose ───────────────────────── */}
          <g transform="translate(450 130)">
            {/* 8 radiating spokes: cardinal=longer, ordinal=shorter */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const isCardinal = deg % 90 === 0
              const r1 = isCardinal ? 22 : 14
              const r2 = isCardinal ? 90 : 60
              const rad = (deg * Math.PI) / 180
              return (
                <line key={deg}
                  x1={Math.cos(rad) * r1} y1={Math.sin(rad) * r1}
                  x2={Math.cos(rad) * r2} y2={Math.sin(rad) * r2}
                  stroke="#d6a758" strokeWidth={isCardinal ? 1 : 0.75}
                  strokeOpacity={isCardinal ? 0.55 : 0.30}
                />
              )
            })}
            {/* Outer reference circle */}
            <circle cx={0} cy={0} r={92} stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.18} />
            <circle cx={0} cy={0} r={60} stroke="#d6a758" strokeWidth={0.5} strokeOpacity={0.12} />
            {/* North point diamond */}
            <path d="M 0 -22 L 5 -10 L 0 -4 L -5 -10 Z"
              fill="#d6a758" fillOpacity={0.75} />
            {/* Center dot */}
            <circle cx={0} cy={0} r={4} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.80} />
            <circle cx={0} cy={0} r={1.5} fill="#d6a758" fillOpacity={0.80} />
            {/* Label */}
            <text x={0} y={116} textAnchor="middle"
              fontSize={9} letterSpacing={3}
              fill="#d6a758" fillOpacity={0.40}
              fontFamily="system-ui, sans-serif"
            >NORTH STAR</text>
          </g>

          {/* ── MAPMAKER (x=750) — topographic contours ─────────────────── */}
          <g transform="translate(750 130)">
            {[
              { rx: 100, ry: 68, op: 0.10 },
              { rx:  82, ry: 55, op: 0.17 },
              { rx:  64, ry: 43, op: 0.24 },
              { rx:  46, ry: 30, op: 0.33 },
              { rx:  28, ry: 18, op: 0.46 },
              { rx:  12, ry:  8, op: 0.62 },
            ].map(({ rx, ry, op }, i) => (
              <ellipse key={i} cx={0} cy={0} rx={rx} ry={ry}
                transform="rotate(-22 0 0)"
                stroke="#d6a758" strokeWidth={1} strokeOpacity={op} />
            ))}
            {/* Crosshair */}
            <line x1={-16} y1={0} x2={16} y2={0} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.70} />
            <line x1={0} y1={-16} x2={0} y2={16} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.70} />
            <circle cx={0} cy={0} r={4} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.70} />
            <circle cx={0} cy={0} r={1.5} fill="#d6a758" fillOpacity={0.70} />
            <text x={0} y={120} textAnchor="middle"
              fontSize={9} letterSpacing={3}
              fill="#d6a758" fillOpacity={0.40}
              fontFamily="system-ui, sans-serif"
            >MAPMAKER</text>
          </g>

          {/* ── ATLAS (x=1050) — globe / layered sphere ──────────────────── */}
          <g transform="translate(1050 130)">
            {/* Latitude rings */}
            {[
              { ry: 90, rx: 90, op: 0.14 },
              { ry: 56, rx: 90, op: 0.19 },
              { ry: 28, rx: 90, op: 0.24 },
            ].map(({ rx, ry, op }, i) => (
              <ellipse key={i} cx={0} cy={0} rx={rx} ry={ry}
                stroke="#d6a758" strokeWidth={1} strokeOpacity={op} />
            ))}
            {/* Longitude arcs — vertical ellipses at rotations */}
            {[-60, -30, 0, 30, 60].map((deg, i) => (
              <ellipse key={i} cx={0} cy={0} rx={30} ry={90}
                transform={`rotate(${deg} 0 0)`}
                stroke="#d6a758" strokeWidth={0.75} strokeOpacity={0.18} />
            ))}
            {/* Clip longitude to globe boundary using equator as reference */}
            {/* Equator (prime) — slightly brighter */}
            <ellipse cx={0} cy={0} rx={90} ry={90}
              stroke="#d6a758" strokeWidth={1} strokeOpacity={0.28} />
            {/* Pole dots */}
            <circle cx={0} cy={-90} r={2.5} fill="#d6a758" fillOpacity={0.55} />
            <circle cx={0} cy={90}  r={2.5} fill="#d6a758" fillOpacity={0.55} />
            {/* Center */}
            <circle cx={0} cy={0} r={3} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.65} />
            <text x={0} y={112} textAnchor="middle"
              fontSize={9} letterSpacing={3}
              fill="#d6a758" fillOpacity={0.40}
              fontFamily="system-ui, sans-serif"
            >ATLAS</text>
          </g>
        </svg>
      </div>

      {/* What the Alignment Map Is */}
      <section className="bg-[#F7F5F1] py-24 md:py-32 px-6 md:px-10" style={systemGridStyle}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What the Alignment Map Is</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Not a bundle of tools. One coherent operational environment.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Alignment Map is a digital prepared environment for Montessori schools. The same
              philosophical commitment that shapes the prepared physical environment &mdash;
              intentionality, coherence, respect for the person &mdash; shapes how the Alignment Map is
              built. Every feature, every workflow, every data point is designed to reflect
              what Montessori schools actually believe. Not translated from generic school
              software. Built from the ground up.
            </p>
          </div>
          <div>
            {/* Comparison table */}
            <div className="overflow-hidden border border-[#DDD8D0]">
              {/* Column headers */}
              <div className="grid grid-cols-2 bg-[#EDE8E1] border-b border-[#DDD8D0]">
                <span className="px-5 py-3 text-[#94A3B8] text-[10px] tracking-[0.22em] uppercase">
                  Current reality
                </span>
                <span className="px-5 py-3 text-[#8A6014] text-[10px] tracking-[0.22em] uppercase border-l border-[#DDD8D0]">
                  With the Alignment Map
                </span>
              </div>
              {whatMmapContrasts.map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-b border-[#E8E3DC] last:border-0">
                  <div className="px-5 py-4 bg-[#F7F5F1]">
                    <span className="text-[#94A3B8] text-sm leading-snug">{row.before}</span>
                  </div>
                  <div className="relative px-5 py-4 bg-white border-l border-[#DDD8D0]">
                    <span className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#d6a758] opacity-60" />
                    <span className="text-[#0e1a7a] text-sm font-medium leading-snug pl-1">{row.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DemoCTA />

      {/* Pathway tiers */}
      <section id="pathway" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10" style={systemGridStyle}>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Alignment Map Pathway</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Four tiers. One coherent system.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              From the classroom to the boardroom&mdash;The Alignment Map covers every level of the
              organization with tools that are built to work together.
            </p>
          </div>
          <FadeIn delay={0.1}>
            <TierExplorer />
          </FadeIn>
        </div>
      </section>

      <DemoCTA />

      {/* Platform Screenshots */}
      <section className="bg-[#F7F5F1] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Platform</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              What it actually looks like.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Every screen below is the live platform — not a mockup. This is what pilot schools
              are using today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                src: '/images/mmap/mmap-01-leadership-dashboard.png',
                alt: 'Alignment Map Leadership Dashboard',
                label: 'Leadership Dashboard',
                desc: 'Real-time school snapshot — attendance, coverage alerts, observation data, and top priorities surfaced automatically for administrators.',
              },
              {
                src: '/images/mmap/mmap-06-enrollment-hub.png',
                alt: 'Enrollment Season Hub',
                label: 'Enrollment Season Hub',
                desc: 'The entire admissions-to-billing workflow in one command center — from first inquiry through signed agreements and reconciled tuition.',
              },
              {
                src: '/images/mmap/mmap-07-equity-hub.png',
                alt: 'Equity & Belonging Hub',
                label: 'Equity & Belonging Hub',
                desc: 'Student demographics, equity dashboards, community health, ABAR pathways, and pulse surveys — built in from day one, not bolted on.',
              },
              {
                src: '/images/mmap/mmap-03-board-dashboard.png',
                alt: 'Board Dashboard',
                label: 'Board Dashboard',
                desc: 'Mission-level oversight for governance — equity indicators, financial sustainability, strategic plan progress, and exportable board reports.',
              },
              {
                src: '/images/mmap/mmap-05-lesson-tracking.png',
                alt: 'Lesson Tracking',
                label: 'Lesson Tracking & Planning',
                desc: 'Log lessons, track mastery progression, and plan upcoming presentations — built around the three-hour work cycle, not a generic gradebook.',
              },
              {
                src: '/images/mmap/mmap-02-staff-dashboard.png',
                alt: 'Faculty & Staff Workspace',
                label: 'Faculty & Staff Workspace',
                desc: 'Each role sees exactly what they need — guides have their own workspace with observations, appraisals, goals, messages, and portfolios in one place.',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden border border-[#DDD8D0] shadow-sm">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1200}
                      height={678}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-[#0e1a7a] font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <DemoCTA />

      {/* Data Flow — observation becomes insight */}
      <section className="bg-[#F7F5F1] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">How Data Moves</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Observation becomes insight.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              A guide records an observation in the classroom. That data doesn&apos;t disappear into a notebook — it flows upward, informing the school director, the organizational team, and ultimately the board.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Alignment Map is built on the same principle Montessori education is: concrete experience at the bottom, abstract understanding at the top. Each layer sees exactly what it needs — nothing more, nothing less.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <DataFlowDiagram />
          </div>
        </div>
      </section>

      {/* Pilot cohort */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Pilot Cohort</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight mb-8" style={serif}>
              Currently accepting pilot schools.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
              The Alignment Map is in active pilot with a limited cohort of Montessori schools.
              Pilot participants get direct access to the product team, discounted
              access, and direct influence on the roadmap.
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              This is not a beta test&mdash;it&apos;s a founding partnership. Schools that
              join the pilot are shaping what the Alignment Map becomes.
            </p>
          </div>
          <div className="space-y-0">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">Pilot benefits include</p>
            {[
              'Early access to all four pathway tiers',
              'Dedicated onboarding and implementation support',
              'Direct line to Hannah and our team',
              'Discounted pricing locked in at pilot rate',
              'Priority feature request consideration',
              'Seat at the table as the Alignment Map evolves',
            ].map((benefit, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="flex items-start gap-4 py-3 border-b border-white/10 last:border-0">
                  <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                  <span className="text-white text-sm">{benefit}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why schools are choosing the Alignment Map */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 border-t border-[#E2DDD6] px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Difference</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight" style={serif}>
              Montessori-native. Not Montessori-adapted.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {differentiationCards.map((card, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div
                  className="bg-white border border-[#E2DDD6] p-7 h-full"
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(14,26,122,0.07)' }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <h3 className="text-[#0e1a7a] font-semibold text-lg mb-3" style={serif}>
                    {card.title}
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <DemoCTA />

      {/* Part of a larger system */}
      <section className="bg-[#0e1a7a] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              Montessori Makers Ecosystem
            </p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-4" style={serif}>
              The Alignment Map is where the systems live.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Montessori Makers builds aligned schools across multiple dimensions. The Alignment Map
              holds the operational systems. Advisory helps design them. Institute develops
              the leaders who run them. MatchHub finds aligned staff when growth requires it.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {ecosystemCards.map((card) => (
              <Link key={card.href} href={card.href} className="border border-white/15 p-5 hover:border-white/30 transition-colors">
                <p className="text-white text-sm font-semibold">{card.title}</p>
                <p className="text-[#94A3B8] text-xs mt-1">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">See It in Action</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Watch how the Alignment Map works.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Short videos grouped by function. See exactly how each part of the platform works
              before you ever talk to anyone.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/mmap/demo" className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap font-medium">
              Watch the Demo &rarr;
            </Link>
            <Link href="/contact?source=MMAP" className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium">
              Request Early Access
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}

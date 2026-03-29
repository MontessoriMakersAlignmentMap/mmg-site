import Link from 'next/link'
import Image from 'next/image'
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
    body: 'MMAP replaces the collection of disconnected tools most Montessori schools are held together by. One login. One data model. One system that knows what the other parts are doing.',
  },
  {
    title: 'Built for Montessori practice',
    body: 'Not adapted from a generic school platform. Every workflow, every data point, every report reflects how Montessori schools actually operate\u2014from the three-hour work cycle to multi-age progression.',
  },
  {
    title: 'Equity in the architecture',
    body: 'Equity isn\u2019t an add-on or a premium tier. It runs through every layer of MMAP\u2014surfacing patterns in attendance, belonging, access, and adult culture from day one.',
  },
  {
    title: 'Clarity without corporatizing',
    body: 'MMAP gives schools the operational clarity and data infrastructure they need to run well\u2014without turning a Montessori school into a managed corporate entity.',
  },
]

const ecosystemCards = [
  { title: 'Advisory', desc: 'System design & leadership support', href: '/advisory' },
  { title: 'Institute', desc: 'Leadership development', href: '/institute' },
  { title: 'MatchHub', desc: 'Philosophy-aligned hiring', href: '/matchhub' },
  { title: 'MMAS', desc: 'Montessori-native assessment', href: '/mmas' },
]

function TopographicIllustration() {
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

      {/* Topographic contour rings */}
      {contours.map(({ rx, ry, opacity }, i) => (
        <ellipse
          key={i}
          cx={240}
          cy={240}
          rx={rx}
          ry={ry}
          transform="rotate(-20 240 240)"
          stroke="#d6a758"
          strokeWidth={1}
          strokeOpacity={opacity}
        />
      ))}

      {/* Corner registration marks */}
      <path d="M 22 50 L 22 22 L 50 22"   stroke="#d6a758" strokeWidth={1} strokeOpacity={0.35} strokeLinecap="square" />
      <path d="M 430 22 L 458 22 L 458 50" stroke="#d6a758" strokeWidth={1} strokeOpacity={0.35} strokeLinecap="square" />
      <path d="M 22 430 L 22 458 L 50 458" stroke="#d6a758" strokeWidth={1} strokeOpacity={0.35} strokeLinecap="square" />
      <path d="M 430 458 L 458 458 L 458 430" stroke="#d6a758" strokeWidth={1} strokeOpacity={0.35} strokeLinecap="square" />

      {/* Crosshair at center */}
      <line x1={222} y1={240} x2={258} y2={240} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.75} />
      <line x1={240} y1={222} x2={240} y2={258} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.75} />
      <circle cx={240} cy={240} r={4.5} stroke="#d6a758" strokeWidth={1.5} strokeOpacity={0.75} />
      <circle cx={240} cy={240} r={1.5} fill="#d6a758" fillOpacity={0.75} />
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

// ─── Subtle grid background (used on select sections) ─────────────────────────

const systemGridStyle: React.CSSProperties = {
  backgroundImage: [
    'linear-gradient(rgba(14,26,122,0.035) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(14,26,122,0.035) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '48px 48px',
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
      {/* Sticky demo button */}
      <div className="fixed top-5 right-5 z-50 hidden md:block">
        <Link
          href="/mmap/demo"
          className="bg-[#d6a758] text-white text-xs px-5 py-2.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium shadow-lg whitespace-nowrap"
        >
          Watch Demo
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div>
            <div className="mb-6">
              <Logo name="mmap" heroWidth={460} heroHeight={130} />
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
              <span className="text-white text-xs tracking-[0.15em] uppercase">Pilot Platform &mdash; Limited Early Access</span>
            </div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">
              Montessori Makers Alignment Map
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              The operating system for Montessori schools.
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
              A digital prepared environment for Montessori schools. No patchwork. No
              competing tools. Just systems that finally reflect what you believe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mmap/demo"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Watch the Demo
              </Link>
              <Link
                href="/contact?source=MMAP"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Request Early Access &rarr;
              </Link>
            </div>
          </div>

          {/* Topographic illustration */}
          <div className="hidden md:flex items-center justify-center opacity-90">
            <TopographicIllustration />
          </div>
        </div>
      </section>

      {/* Problem / Why */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why MMAP Exists</p>
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
              MMAP brings mission and infrastructure into alignment. Built from the ground
              up for the way Montessori schools actually operate&mdash;without corporatizing what
              makes them unique.
            </p>
            <p className="text-[#0e1a7a] font-semibold text-lg">
              Alignment is not an aspiration. It is infrastructure.
            </p>
            <div className="mt-4">
              {problemStatements.map((statement, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-[#E2DDD6] py-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <p className="text-[#374151] text-sm leading-relaxed">{statement}</p>
                </div>
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

      {/* What MMAP Is */}
      <section className="bg-[#F7F5F1] py-24 md:py-32 px-6 md:px-10" style={systemGridStyle}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What MMAP Is</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Not a bundle of tools. One coherent operational environment.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              MMAP is a digital prepared environment for Montessori schools. The same
              philosophical commitment that shapes the prepared physical environment &mdash;
              intentionality, coherence, respect for the person &mdash; shapes how MMAP is
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
                  With MMAP
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
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The MMAP Pathway</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Four tiers. One coherent system.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              From the classroom to the boardroom&mdash;MMAP covers every level of the
              organization with tools that are built to work together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div key={tier.id} className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5">
                {/* Icon + name header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-10 flex-shrink-0" style={{ backgroundColor: tier.color }} />
                    <div>
                      <h3 className="text-[#0e1a7a] font-semibold text-xl">{tier.name}</h3>
                      <p className="text-[#64748B] text-xs uppercase tracking-wider mt-0.5">{tier.scope}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-50">
                    {TIER_ICONS[tier.id]}
                  </div>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                      <span style={{ color: tier.color }} className="flex-shrink-0 mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Link
                    href={tierLinks[tier.id]}
                    className="text-[#0e1a7a] text-xs font-medium hover:underline"
                  >
                    Watch how it works &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoCTA />

      {/* Pilot cohort */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Pilot Cohort</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight mb-8" style={serif}>
              Currently accepting pilot schools.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
              MMAP is in active pilot with a limited cohort of Montessori schools.
              Pilot participants get direct access to the product team, discounted
              access, and direct influence on the roadmap.
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              This is not a beta test&mdash;it&apos;s a founding partnership. Schools that
              join the pilot are shaping what MMAP becomes.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">Pilot benefits include</p>
            {[
              'Early access to all four pathway tiers',
              'Dedicated onboarding and implementation support',
              'Direct line to Hannah and the MMAP team',
              'Discounted pricing locked in at pilot rate',
              'Priority feature request consideration',
              'Seat at the table as MMAP evolves',
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-white/10 last:border-0">
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <span className="text-white text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why schools are choosing MMAP */}
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
              <div key={i} className="bg-white border border-[#E2DDD6] p-7">
                <h3 className="text-[#0e1a7a] font-semibold text-lg mb-3" style={serif}>
                  {card.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{card.body}</p>
              </div>
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
              MMAP is where the systems live.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Montessori Makers builds aligned schools across multiple dimensions. MMAP
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
              Watch how MMAP works.
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

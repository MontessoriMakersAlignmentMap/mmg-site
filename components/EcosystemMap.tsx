'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Logo, type LogoName } from '@/components/Logo'

// ─── Node positions (x, y as % of container) ─────────────────────────────────
// Container aspect ratio: 5:3 (paddingBottom: 60%)
// SVG viewBox: 0 0 100 60 → SVG_y = node.y * 0.6

const NODES = [
  {
    id: 'advisory',  name: 'Advisory',  logo: 'advisory'  as LogoName,
    href: '/advisory',  tagline: 'Consulting & alignment',   x: 18, y: 22,
  },
  {
    id: 'institute', name: 'Institute', logo: 'institute' as LogoName,
    href: '/institute', tagline: 'Leadership formation',      x: 50, y: 13,
  },
  {
    id: 'matchhub',  name: 'MatchHub',  logo: 'matchhub'  as LogoName,
    href: '/matchhub',  tagline: 'Montessori hiring',         x: 82, y: 22,
  },
  {
    id: 'mmap',      name: 'MMAP',      logo: 'mmap'      as LogoName,
    href: '/mmap',      tagline: 'School operating system',   x: 50, y: 52,
  },
  {
    id: 'toolbox',   name: 'Toolbox',   logo: 'toolbox'   as LogoName,
    href: '/toolbox',   tagline: 'Templates & frameworks',   x: 18, y: 79,
  },
  {
    id: 'studio',    name: 'Studio',    logo: 'studio'    as LogoName,
    href: '/studio',    tagline: 'Web & communication',      x: 50, y: 88,
  },
  {
    id: 'learning',  name: 'Learning',  logo: 'learning'  as LogoName,
    href: '/learning',  tagline: 'Curriculum & materials',   x: 82, y: 79,
  },
] as const

type NodeId = typeof NODES[number]['id']

const EDGES: { from: NodeId; to: NodeId; primary: boolean }[] = [
  { from: 'advisory',  to: 'institute', primary: true  },
  { from: 'institute', to: 'matchhub',  primary: true  },
  { from: 'advisory',  to: 'mmap',      primary: true  },
  { from: 'institute', to: 'mmap',      primary: true  },
  { from: 'matchhub',  to: 'mmap',      primary: true  },
  { from: 'mmap',      to: 'toolbox',   primary: false },
  { from: 'mmap',      to: 'studio',    primary: false },
  { from: 'mmap',      to: 'learning',  primary: false },
  { from: 'toolbox',   to: 'learning',  primary: false },
]

const nodePos = (id: NodeId) => {
  const n = NODES.find(n => n.id === id)!
  return { x: n.x, y: n.y * 0.6 } // scale y for SVG viewBox 0 0 100 60
}

export function EcosystemMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const [hovered, setHovered] = useState<NodeId | null>(null)

  return (
    <div ref={ref} className="relative w-full select-none" style={{ paddingBottom: '60%' }}>

      {/* ── Connection lines ─────────────────────────────────────────── */}
      <svg
        viewBox="0 0 100 60"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      >
        {EDGES.map(({ from, to, primary }, i) => {
          const f = nodePos(from)
          const t = nodePos(to)
          const lit = hovered === from || hovered === to
          return (
            <motion.path
              key={`${from}-${to}`}
              d={`M ${f.x} ${f.y} L ${t.x} ${t.y}`}
              fill="none"
              stroke={lit ? '#d6a758' : primary ? 'rgba(14,26,122,0.22)' : 'rgba(14,26,122,0.10)'}
              strokeWidth={primary ? 0.32 : 0.18}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 0.8, delay: 0.2 + i * 0.09, ease: 'easeInOut' },
                opacity:    { duration: 0.3, delay: 0.2 + i * 0.09 },
                stroke:     { duration: 0.15 },
              }}
            />
          )
        })}
      </svg>

      {/* ── Nodes ────────────────────────────────────────────────────── */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.85 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={node.href}
            className="relative flex flex-col items-center gap-1.5 group"
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Circle */}
            <motion.div
              className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center
                         bg-white border border-[#E2DDD6]"
              style={{ width: 52, height: 52 }}
              whileHover={{ scale: 1.14 }}
              animate={{
                borderColor: hovered === node.id ? '#d6a758' : '#E2DDD6',
                boxShadow: hovered === node.id
                  ? '0 4px 18px rgba(214,167,88,0.30)'
                  : '0 1px 5px rgba(0,0,0,0.07)',
              }}
              transition={{ duration: 0.18 }}
            >
              <Logo name={node.logo} size={22} />
            </motion.div>

            {/* Label */}
            <span className="text-[#0e1a7a] text-[9px] font-semibold tracking-[0.10em] uppercase whitespace-nowrap">
              {node.name}
            </span>

            {/* Tooltip */}
            <div
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                         bg-[#0e1a7a] text-white text-[9px] px-2.5 py-1.5
                         opacity-0 group-hover:opacity-100 transition-opacity duration-150
                         whitespace-nowrap pointer-events-none z-30 shadow-lg"
              style={{ borderRadius: 2 }}
            >
              {node.tagline}
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 block w-0 h-0
                               border-l-[4px] border-r-[4px] border-t-[5px]
                               border-l-transparent border-r-transparent border-t-[#0e1a7a]" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

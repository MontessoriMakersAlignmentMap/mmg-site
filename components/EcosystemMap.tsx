'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { Logo, type LogoName } from '@/components/Logo'

const SIZE = 160
const HALF = SIZE / 2

const FACES: {
  id: string
  name: string
  logo: LogoName
  href: string
  tagline: string
  transform: string
}[] = [
  { id: 'advisory',  name: 'Advisory',  logo: 'advisory',  href: '/advisory',  tagline: 'Consulting & alignment', transform: `translateZ(${HALF}px)` },
  { id: 'matchhub',  name: 'MatchHub',  logo: 'matchhub',  href: '/matchhub',  tagline: 'Montessori hiring',       transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { id: 'learning',  name: 'Learning',  logo: 'learning',  href: '/learning',  tagline: 'Curriculum & materials',  transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { id: 'toolbox',   name: 'Toolbox',   logo: 'toolbox',   href: '/toolbox',   tagline: 'Templates & frameworks',  transform: `rotateY(-90deg) translateZ(${HALF}px)` },
  { id: 'institute', name: 'Institute', logo: 'institute', href: '/institute', tagline: 'Leadership formation',     transform: `rotateX(-90deg) translateZ(${HALF}px)` },
  { id: 'studio',    name: 'Studio',    logo: 'studio',    href: '/studio',    tagline: 'Web & communication',     transform: `rotateX(90deg) translateZ(${HALF}px)` },
]

export function EcosystemMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const [paused, setPaused] = useState(false)

  return (
    <div ref={ref} className="flex flex-col items-center gap-10 select-none">
      <style>{`
        @keyframes mmgCubeRotate {
          from { transform: rotateX(-22deg) rotateY(0deg); }
          to   { transform: rotateX(-22deg) rotateY(360deg); }
        }
        .mmg-cube-face {
          position: absolute;
          top: 0; left: 0;
          width: ${SIZE}px;
          height: ${SIZE}px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #0e1a7a;
          border: 1.5px solid #d6a758;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          text-decoration: none;
          cursor: pointer;
          box-sizing: border-box;
        }
        .mmg-cube-face:hover {
          background: #162270;
        }
      `}</style>

      {/* ── 3D Scene ──────────────────────────────────────────────────────── */}
      <div
        style={{
          perspective: '700px',
          width: SIZE * 2.2,
          height: SIZE * 2.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade-in wrapper */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.82)',
            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Cube */}
          <div
            style={{
              width: SIZE,
              height: SIZE,
              position: 'relative',
              transformStyle: 'preserve-3d',
              animation: 'mmgCubeRotate 30s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {FACES.map((face) => (
              // position:absolute + transform must be on the <a> itself, not a child
              <Link
                key={face.id}
                href={face.href}
                className="mmg-cube-face"
                style={{ transform: face.transform }}
                tabIndex={-1}
              >
                {/* White logo square */}
                <div style={{
                  width: 52, height: 52,
                  background: '#fff',
                  border: '1px solid rgba(214,167,88,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Logo name={face.logo} size={26} />
                </div>

                <span style={{
                  color: '#d6a758',
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  {face.name}
                </span>

                <span style={{
                  color: 'rgba(148,163,184,0.75)',
                  fontSize: 8,
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  padding: '0 14px',
                  lineHeight: 1.5,
                }}>
                  {face.tagline}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── MMAP node ─────────────────────────────────────────────────────── */}
      <div style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
      }}>
        <Link href="/mmap" className="flex flex-col items-center gap-1.5 group">
          <div
            className="flex items-center justify-center bg-white border border-[#E2DDD6] group-hover:border-[#d6a758] group-hover:shadow-[0_4px_18px_rgba(214,167,88,0.25)] transition-all duration-200"
            style={{ width: 48, height: 48 }}
          >
            <Logo name="mmap" size={22} />
          </div>
          <span className="text-[#0e1a7a] text-[9px] font-semibold tracking-[0.14em] uppercase">MMAP</span>
          <span className="text-[#64748B] text-[8px] tracking-wide">School operating system</span>
        </Link>
      </div>
    </div>
  )
}

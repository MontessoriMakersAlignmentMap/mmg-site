'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Cube size in px — small enough to be an accent, not a distraction
const S = 28
const H = S / 2

// Colors extracted from the MMG logo cube
// top = lightest gold, left-front = medium, right-front = darkest
const FACES = [
  { key: 'front',  bg: '#CF9C38', transform: `translateZ(${H}px)` },
  { key: 'back',   bg: '#A87428', transform: `rotateY(180deg) translateZ(${H}px)` },
  { key: 'left',   bg: '#CF9C38', transform: `rotateY(-90deg) translateZ(${H}px)` },
  { key: 'right',  bg: '#A87428', transform: `rotateY(90deg) translateZ(${H}px)` },
  { key: 'top',    bg: '#EDD07C', transform: `rotateX(90deg) translateZ(${H}px)` },
  { key: 'bottom', bg: '#7A5418', transform: `rotateX(-90deg) translateZ(${H}px)` },
]

export function CursorCube() {
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Spring physics — cube trails slightly behind, feels alive
  const x = useSpring(rawX, { stiffness: 160, damping: 20, mass: 0.8 })
  const y = useSpring(rawY, { stiffness: 160, damping: 20, mass: 0.8 })

  useEffect(() => {
    function onMove(e: MouseEvent) {
      rawX.set(e.clientX + 12)
      rawY.set(e.clientY + 12)
    }
    function onLeave() {
      rawX.set(-200)
      rawY.set(-200)
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [rawX, rawY])

  return (
    // hidden on touch devices (no mouse), visible on md+ desktop
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden [@media(pointer:fine)]:block"
      style={{ x, y }}
    >
      {/* perspective wrapper */}
      <div style={{ width: S, height: S, perspective: 110 }}>
        <motion.div
          style={{
            width: S,
            height: S,
            position: 'relative',
            transformStyle: 'preserve-3d',
            // Tilt so top face is visible — matches the logo's isometric angle
            rotateX: -28,
          }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          {FACES.map(({ key, bg, transform }) => (
            <div
              key={key}
              style={{
                position: 'absolute',
                inset: 0,
                background: bg,
                transform,
                // Subtle edge highlight between faces
                boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.20)',
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

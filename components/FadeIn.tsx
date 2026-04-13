'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── FadeIn ─────────────────────────────────────────────────────────────────────

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'none'
}

export function FadeIn({ children, delay = 0, className = '', direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-72px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: direction === 'up' ? 22 : 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface FadeInStaggerProps {
  children: React.ReactNode[]
  stagger?: number
  className?: string
}

export function FadeInStagger({ children, stagger = 0.08, className = '' }: FadeInStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-72px 0px' })

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// ── RevealEyebrow ──────────────────────────────────────────────────────────────
// Scroll-triggered: gold line sweeps in left → right, then label fades up.

export function RevealEyebrow({
  children,
  className = '',
  variant = 'light',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'dark'
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  const textColor = variant === 'dark' ? 'text-[#d6a758]' : 'text-[#8A6014]'

  return (
    <div ref={ref} className={`flex items-center gap-3 ${className}`}>
      <motion.span
        className="h-px bg-[#d6a758] flex-shrink-0 inline-block"
        initial={{ width: 0 }}
        animate={inView ? { width: 20 } : { width: 0 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className={`${textColor} text-[11px] tracking-[0.24em] uppercase`}
        initial={{ opacity: 0, x: -5 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </div>
  )
}

// ── GoldUnderline ──────────────────────────────────────────────────────────────
// Wraps inline text with a gold underline that scales in from left on scroll.

export function GoldUnderline({
  children,
  className = '',
  delay = 0.2,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <span ref={ref} className={`relative inline ${className}`}>
      {children}
      <motion.span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-[2.5px] bg-[#d6a758] w-full block pointer-events-none"
        style={{ transformOrigin: 'left center' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  )
}

'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'

/**
 * Parses a stat string like '20+', '100%', '6', '0' into a numeric value,
 * prefix, and suffix for animation.
 */
function parseStat(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/)
  if (!match) return { num: 0, prefix: '', suffix: value }
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

interface AnimatedStatProps {
  value: string
  className?: string
  style?: React.CSSProperties
  duration?: number
}

export function AnimatedStat({ value, className, style, duration = 1600 }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const { num, prefix, suffix } = parseStat(value)

  useEffect(() => {
    if (!inView || num === 0) {
      setCount(num)
      return
    }
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * num))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, num, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{count}{suffix}
    </span>
  )
}

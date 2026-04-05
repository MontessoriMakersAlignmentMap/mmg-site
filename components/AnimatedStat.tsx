'use client'

import { useRef, useState, useEffect } from 'react'

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
  const [count, setCount] = useState(0)
  const { num, prefix, suffix } = parseStat(value)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (num === 0) {
      setCount(0)
      return
    }

    function run() {
      if (animated.current) return
      animated.current = true
      const start = performance.now()
      function tick(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * num))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    // If already visible in the viewport, animate immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      run()
      return
    }

    // Otherwise wait for it to scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
          run()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [num, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{count}{suffix}
    </span>
  )
}

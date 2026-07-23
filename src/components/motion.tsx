import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fade-up reveal on scroll into view (GSAP ScrollTrigger, once). */
export function Reveal({ children, className = '', delay = 0, y = 24 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, y])
  return (
    <div ref={ref} className={className} style={{ opacity: reducedMotion() ? 1 : undefined }}>
      {children}
    </div>
  )
}

/** Formats a number in Swiss/German style: 7502 -> 7'502, 0.1 -> 0,1 */
export function formatCH(value: number, decimals = 0): string {
  const fixed = value.toFixed(decimals)
  const [int, dec] = fixed.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, "'")
  return dec ? `${grouped},${dec}` : grouped
}

/** Count-up number, triggers once at 60% viewport. */
export function CountUp({
  end,
  decimals = 0,
  duration = 1.6,
  suffix = '',
  prefix = '',
  className = '',
  start,
}: {
  end: number
  decimals?: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  start?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) {
      el.textContent = prefix + formatCH(end, decimals) + suffix
      setDone(true)
      return
    }
    const obj = { v: start ?? 0 }
    const tween = gsap.to(obj, {
      v: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 60%', once: true },
      onUpdate: () => {
        el.textContent = prefix + formatCH(obj.v, decimals) + suffix
      },
      onComplete: () => setDone(true),
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [end, decimals, duration, suffix, prefix, start])
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {done || reducedMotion() ? undefined : prefix + formatCH(start ?? 0, decimals) + suffix}
    </span>
  )
}

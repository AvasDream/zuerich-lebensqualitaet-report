import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '@/components/motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Pin-Sektion: Farbwechsel am Viewport.
 * toDark: paper→night («Die Kehrseite.»), sonst night→paper («Wer misst, …»).
 */
export default function ThemeTransition({ sentence, accentWord, toDark = true }: { sentence: string[]; accentWord?: string; toDark?: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (reducedMotion()) {
      el.style.backgroundColor = toDark ? '#0B1117' : '#FAF7F2'
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { backgroundColor: toDark ? '#FAF7F2' : '#0B1117' },
        {
          backgroundColor: toDark ? '#0B1117' : '#FAF7F2',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: '+=100%', scrub: true, pin: true },
        },
      )
      gsap.fromTo(
        '.tt-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: '+=100%', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [toDark])

  return (
    <div ref={root} className={`noise-overlay flex min-h-[100dvh] items-center justify-center ${toDark ? 'bg-paper' : 'bg-night'}`}>
      <p className={`max-w-4xl px-6 text-center font-display font-bold leading-[1.1] ${toDark ? 'text-ink' : 'text-paper'}`} style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
        {sentence.map((w, i) => (
          <span key={i} className={`tt-word ${accentWord && w.includes(accentWord) ? (toDark ? 'text-signal' : 'text-lake') : ''}`}>
            {w}{' '}
          </span>
        ))}
      </p>
    </div>
  )
}

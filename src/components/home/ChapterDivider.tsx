import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '@/components/motion'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  id?: string
  number: string
  title: string
  teaser: string
  dark?: boolean
}

export default function ChapterDivider({ id, number, title, teaser, dark = false }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.divider-num',
        { y: 60 },
        { y: -60, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      gsap.fromTo(
        '.divider-title',
        { y: 60, opacity: 0, rotate: 2 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } },
      )
      gsap.fromTo(
        line.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'bottom 40%', scrub: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div id={id} ref={root} className={`relative overflow-hidden py-28 sm:py-36 ${dark ? 'bg-night text-paper' : 'bg-paper text-ink'}`}>
      <div className="mx-auto flex max-w-content items-center gap-8 px-4 sm:gap-16 sm:px-6">
        <span aria-hidden className="divider-num outline-number shrink-0 font-display font-extrabold leading-none" style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}>
          {number}
        </span>
        <div className="min-w-0">
          <p className={`kicker ${dark ? 'text-signal' : 'text-lake'}`}>Kapitel {number}</p>
          <h2 className="divider-title mt-3 font-display font-bold leading-[1.02]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            {title}
          </h2>
          <p className={`mt-5 max-w-xl text-lg leading-relaxed ${dark ? 'text-paper/70' : 'text-ink-soft'}`}>{teaser}</p>
          <div ref={line} className={`mt-8 h-[2px] w-full origin-left ${dark ? 'bg-signal' : 'bg-lake'}`} />
        </div>
      </div>
    </div>
  )
}

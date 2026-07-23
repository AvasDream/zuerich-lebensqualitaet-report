import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { reducedMotion } from '@/components/motion'

gsap.registerPlugin(ScrollTrigger)

const QUESTIONS = [
  { label: 'Wie gut?', target: '#kapitel-1' },
  { label: 'Warum?', target: '#kapitel-2' },
  { label: 'Für wen?', target: '#kapitel-4' },
]

function scrollTo(sel: string) {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const line1 = useRef<HTMLHeadingElement>(null)
  const line2 = useRef<HTMLHeadingElement>(null)
  const underline = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { scale: 1.15 }, { scale: 1, duration: 2.2, ease: 'power2.out' })

      const chars = [line1.current, line2.current].map((el) => {
        if (!el) return []
        const text = el.textContent ?? ''
        el.textContent = ''
        return text.split('').map((ch) => {
          const s = document.createElement('span')
          s.textContent = ch === ' ' ? ' ' : ch
          s.style.display = 'inline-block'
          el.appendChild(s)
          return s
        })
      })
      gsap.fromTo(
        chars.flat(),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.02, delay: 0.3 },
      )

      if (underline.current) {
        const len = underline.current.getTotalLength()
        gsap.fromTo(
          underline.current,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.8, delay: 1.2, ease: 'power2.inOut' },
        )
      }

      gsap.to(imgRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '50% top', scrub: true },
      })
      gsap.fromTo(
        '.hero-chip',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: { trigger: root.current, start: 'top top', end: '40% top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative -mt-16 flex min-h-[100dvh] items-end overflow-hidden bg-night text-paper">
      <img
        ref={imgRef}
        src="/hero-zuerichsee.jpg"
        alt="Zürichsee im Morgenlicht mit Skyline und Alpen"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,17,23,0.75)] via-[rgba(11,17,23,0.25)] to-transparent" />
      <div className="noise-overlay absolute inset-0 opacity-[0.05]" />

      <div className="relative z-10 mx-auto w-full max-w-content px-4 pb-24 pt-40 sm:px-6">
        <p className="kicker text-gold">Ein evidenzbasierter Report · Stand: Juli 2026</p>
        <h1 className="mt-6 font-display font-extrabold leading-[0.95] tracking-[-0.02em]" style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}>
          <span ref={line1} className="block overflow-hidden font-expanded">Wie lebenswert</span>
          <span className="block">
            ist{' '}
            <span className="relative inline-block">
              <span ref={line2} className="relative z-10 inline-block overflow-hidden text-lake-soft">Zürich?</span>
              <svg className="absolute -bottom-3 left-0 h-5 w-full" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
                <path ref={underline} d="M4 14 C 60 6, 140 4, 296 12" stroke="#E63329" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/85">
          Rankings, Treiber und Schattenseiten — zwischen Mercer-Rang 1 und 0,1 Prozent Leerstand.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {QUESTIONS.map((q) => (
            <button
              key={q.label}
              onClick={() => scrollTo(q.target)}
              className="hero-chip rounded-full border border-paper/30 bg-white/5 px-5 py-2 font-mono text-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-lake hover:bg-lake/20"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollTo('#summary')}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70"
        aria-label="Nach unten scrollen"
      >
        Scrollen
        <ArrowDown size={16} className="animate-bounce-soft" />
      </button>
    </section>
  )
}

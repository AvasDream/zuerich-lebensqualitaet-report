import { useEffect, useState } from 'react'

export const CHAPTERS = [
  { id: 'kapitel-1', n: '01', label: 'Die Rankings' },
  { id: 'kapitel-2', n: '02', label: 'Die Treiber' },
  { id: 'kapitel-3', n: '03', label: 'Die Schattenseiten' },
  { id: 'kapitel-4', n: '04', label: 'Wessen Lebensqualität?' },
  { id: 'kapitel-5', n: '05', label: 'Der Vergleich' },
  { id: 'kapitel-6', n: '06', label: 'Die Zukunftsfrage' },
]

/** Sticky Chapter Rail (Desktop): vertikale Kapitelnummern mit Fortschrittsfüllung. */
export function ChapterRail() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      let idx = 0
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) idx = i
      })
      setActive(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = active === 2 // Kapitel 03 = Schattenseiten

  return (
    <nav aria-label="Kapitel-Navigation" className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center"
          aria-label={`Kapitel ${c.n}: ${c.label}`}
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border font-mono text-[11px] transition-colors"
            style={{
              borderColor: i === active ? (dark ? '#E63329' : '#1B5FD9') : 'rgba(125,125,125,0.35)',
              color: i === active ? '#FAF7F2' : dark ? 'rgba(250,247,242,0.55)' : 'rgba(61,72,82,0.7)',
            }}
          >
            {i === active && <span className={`absolute inset-0 ${dark ? 'bg-signal' : 'bg-lake'}`} />}
            <span className="relative">{c.n}</span>
          </span>
          <span className={`pointer-events-none absolute left-12 whitespace-nowrap rounded-md px-2 py-1 font-mono text-[10px] opacity-0 shadow transition-opacity group-hover:opacity-100 ${dark ? 'bg-night-raised text-paper' : 'bg-ink text-paper'}`}>
            {c.label}
          </span>
        </button>
      ))}
    </nav>
  )
}

/** Scroll-Progress-Bar oben (3px), Akzent wechselt in dunklen Kapiteln. */
export function ScrollProgress() {
  const [p, setP] = useState(0)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? (window.scrollY / max) * 100 : 0)
      const el = document.getElementById('kapitel-3')
      const el4 = document.getElementById('kapitel-4')
      if (el && el4) {
        const t3 = el.getBoundingClientRect().top
        const t4 = el4.getBoundingClientRect().top
        setDark(t3 < window.innerHeight * 0.4 && t4 > window.innerHeight * 0.4)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div className={`h-full transition-[width] duration-100 ${dark ? 'bg-signal' : 'bg-lake'}`} style={{ width: `${p}%` }} />
    </div>
  )
}

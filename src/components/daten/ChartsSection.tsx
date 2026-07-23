import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cite from '@/components/Cite'
import { reducedMotion } from '@/components/motion'
import { MIETDYNAMIK, EIU_TEILWERTE } from './data'

gsap.registerPlugin(ScrollTrigger)

/**
 * Chart-Sektion «Drei Blicke» — GSAP-Isolation: scroll-getriebene Balkenanimationen
 * leben ausschliesslich in dieser Komponente (kein Framer Motion im Baum).
 */
export default function ChartsSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-bar-v]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
            transformOrigin: 'bottom',
            scrollTrigger: { trigger: el.closest('[data-panel]') as Element, start: 'top 80%', once: true },
          },
        )
      })
      gsap.utils.toArray<HTMLElement>('[data-bar-h]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out',
            transformOrigin: 'left',
            scrollTrigger: { trigger: el.closest('[data-panel]') as Element, start: 'top 80%', once: true },
          },
        )
      })
      const slope = root.querySelector<SVGLineElement>('[data-slope]')
      if (slope) {
        const len = slope.getTotalLength()
        gsap.fromTo(
          slope,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: slope.closest('[data-panel]') as Element, start: 'top 80%', once: true },
          },
        )
      }
    }, root)
    return () => ctx.revert()
  }, [])

  const maxMiete = Math.max(...MIETDYNAMIK.map((m) => m.value))

  return (
    <section className="mx-auto max-w-content px-4 py-20 sm:px-6" ref={rootRef} aria-label="Drei Blicke">
      <p className="kicker text-lake">Drei Blicke</p>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Das Doppelbild in drei Charts</h2>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Panel 1: Mietdynamik (vertikale Balken) */}
        <div data-panel className="group rounded-xl border border-line bg-paper-warm p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-soft decoration-lake decoration-2 underline-offset-4 group-hover:underline">
            Mietdynamik
          </h3>
          <div className="mt-6 flex h-48 items-end gap-4">
            {MIETDYNAMIK.map((m) => (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
                <span className={`font-mono text-xs tabular-nums ${m.hot ? 'font-semibold text-signal' : 'text-ink-soft'}`}>{m.display}</span>
                <div className="flex h-32 w-full items-end">
                  <div
                    data-bar-v
                    className={`w-full rounded-t-md ${m.hot ? 'bg-signal' : 'bg-ink-soft/40'}`}
                    style={{ height: `${(m.value / maxMiete) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-4">
            {MIETDYNAMIK.map((m) => (
              <p key={m.label} className="flex-1 text-center font-mono text-[10px] leading-tight text-ink-soft/80">
                {m.label}
              </p>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft/70">
            Mieten steigen in der Stadt deutlich schneller als im Landesdurchschnitt.
            <Cite n={52} />
            <Cite n={60} />
          </p>
        </div>

        {/* Panel 2: EIU-Teilwerte (horizontale Balken) */}
        <div data-panel className="group rounded-xl border border-line bg-paper-warm p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-soft decoration-lake decoration-2 underline-offset-4 group-hover:underline">
            EIU-Teilwerte Zürich 2025
          </h3>
          <div className="mt-6 space-y-4">
            {EIU_TEILWERTE.map((t) => (
              <div key={t.label}>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-ink-soft">{t.label}</span>
                  <span className="font-mono text-xs tabular-nums text-lake">{t.value.toFixed(1).replace('.', ',').replace(',0', '')}</span>
                </div>
                <div className="relative mt-1.5 h-3 w-full rounded-full bg-line/60">
                  <div data-bar-h className="h-full rounded-full bg-lake" style={{ width: `${t.value}%` }} />
                  <span className="absolute -top-1 bottom-auto h-5 w-px bg-gold" style={{ left: '100%' }} aria-hidden />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-soft/70">
            Zwei Maximalwerte von 100 Punkten; tiefster Wert ist die Stabilität mit 95,0. Zielwert-Linie bei 100.
            <Cite n={3} />
          </p>
        </div>

        {/* Panel 3: Slope-Chart Qualität vs. Kosten */}
        <div data-panel className="group rounded-xl border border-line bg-paper-warm p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-soft decoration-lake decoration-2 underline-offset-4 group-hover:underline">
            Qualität vs. Kosten
          </h3>
          <svg viewBox="0 0 320 200" className="mt-6 w-full" role="img" aria-label="Slope-Chart: Rang in Qualitätsindizes gegen Rang in Kostenindizes">
            <line x1="70" y1="20" x2="70" y2="170" stroke="#E3DCD0" strokeWidth="1" />
            <line x1="250" y1="20" x2="250" y2="170" stroke="#E3DCD0" strokeWidth="1" />
            <text x="70" y="190" textAnchor="middle" fontSize="10" fill="#3D4852" fontFamily="IBM Plex Mono, monospace">Qualität</text>
            <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#3D4852" fontFamily="IBM Plex Mono, monospace">Kosten</text>
            <line data-slope x1="70" y1="55" x2="250" y2="135" stroke="#E63329" strokeWidth="3" strokeLinecap="round" />
            <circle cx="70" cy="55" r="6" fill="#1B5FD9" />
            <circle cx="250" cy="135" r="6" fill="#E63329" />
            <text x="88" y="50" fontSize="13" fontWeight="600" fill="#1B5FD9" fontFamily="IBM Plex Mono, monospace">Rang ~1–2</text>
            <text x="188" y="128" fontSize="13" fontWeight="600" fill="#E63329" fontFamily="IBM Plex Mono, monospace">Rang 3–24</text>
            <text x="70" y="14" textAnchor="middle" fontSize="9" fill="#3D4852" fontFamily="IBM Plex Mono, monospace">Mercer / EIU / IMD</text>
            <text x="250" y="14" textAnchor="middle" fontSize="9" fill="#3D4852" fontFamily="IBM Plex Mono, monospace">Mercer CoL / Numbeo</text>
          </svg>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft/70">
            Das Report-Muster in einem Bild: Spitze bei der Qualität, Mittelfeld bis Schlussgruppe bei den Kosten.
            <Cite n={1} />
            <Cite n={6} />
            <Cite n={8} />
          </p>
        </div>
      </div>
    </section>
  )
}

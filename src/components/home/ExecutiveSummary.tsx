import { useRef, useState } from 'react'
import { Reveal } from '@/components/motion'
import Cite from '@/components/Cite'

const KERNAUSSAGEN = [
  { n: '01', title: 'Ranking-Dominanz — real, aber selektiv', text: 'In allen reinen Qualitätsindizes liegt Zürich an oder nahe der Spitze. Sobald Kosten oder soziale Integration einfliessen, fällt die Stadt deutlich zurück.' },
  { n: '02', title: 'Die Stärken sind Kollektivgüter', text: 'Sicherheit, ÖV, Spitäler, Bildung, See und Wald sind öffentlich finanziert und einkommensunabhängig zugänglich — praktisch alle auf Rekordniveau.' },
  { n: '03', title: 'Die Schwäche ist der Wohnungsmarkt', text: 'Leerstand nahe null, ein breiter Graben zwischen Bestands- und Angebotsmieten, Wohnraum als Sorge Nummer eins der Bevölkerung.' },
  { n: '04', title: 'Lebensqualität ist perspektivenabhängig', text: 'Für etablierte Einheimische und gutverdienende Fachkräfte funktioniert die Stadt exzellent; für Geringverdienende und Zuziehende zeigt sie Brüche.' },
  { n: '05', title: 'Die Zukunftsfrage ist die Wohnungspolitik', text: 'Wien und Kopenhagen gewinnen genau dort, wo Zürich verliert — beim Verhältnis von Qualität und Bezahlbarkeit.' },
]

/** Duell-Modul: helle vs. dunkle Karte mit Drag-Slider (clip-path). */
function Duell() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos(Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className="relative h-[420px] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-line shadow-xl sm:h-[380px]"
      onPointerDown={(e) => {
        dragging.current = true
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        update(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      role="slider"
      aria-label="Vergleich beider Zürich-Bilder"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 4))
        if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 4))
      }}
    >
      {/* Helle Seite */}
      <div className="absolute inset-0 bg-paper-warm p-8 sm:p-12">
        <p className="kicker text-lake">Das offizielle Bild</p>
        <h3 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">«Beste Stadt der Welt»</h3>
        <ul className="mt-6 space-y-3 font-mono text-sm text-ink-soft">
          <li className="flex gap-3"><span className="text-gold">#1</span> Mercer Quality of Living 2024<Cite n={1} /></li>
          <li className="flex gap-3"><span className="text-gold">#1</span> IMD Smart City Index — seit 2019<Cite n={4} /></li>
          <li className="flex gap-3"><span className="text-gold">#2</span> EIU Global Liveability Index 2025<Cite n={2} /></li>
        </ul>
      </div>
      {/* Dunkle Seite (clip) */}
      <div className="absolute inset-0 bg-night p-8 text-paper sm:p-12" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <p className="kicker text-signal">Die andere Wahrheit</p>
        <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">«Drittteuerste Stadt der Welt»</h3>
        <ul className="mt-6 space-y-3 font-mono text-sm text-paper/80">
          <li className="flex gap-3"><span className="text-signal">0,1 %</span> Leerwohnungsziffer<Cite n={49} /></li>
          <li className="flex gap-3"><span className="text-signal">49/53</span> Einleben (InterNations)<Cite n={62} /></li>
          <li className="flex gap-3"><span className="text-signal">#24</span> Numbeo Quality of Life 2026<Cite n={8} /></li>
        </ul>
      </div>
      {/* Handle */}
      <div className="absolute inset-y-0 z-10 w-[3px] bg-signal" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 animate-pulse items-center justify-center rounded-full bg-signal font-mono text-xs font-medium text-white shadow-lg">
          ⇔
        </div>
      </div>
    </div>
  )
}

export default function ExecutiveSummary() {
  return (
    <section id="summary" className="bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker text-lake">Executive Summary</p>
            <h2 className="mt-4 font-display font-bold leading-[1.02]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
              Beide Bilder sind wahr<span className="text-signal">.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-[1.7] text-ink-soft">
              Zürich gilt offiziell als lebenswerteste Stadt der Welt — und ist zugleich die drittteuerste Stadt der Welt
              mit einer Leerwohnungsziffer von 0,1 Prozent und Rang 49 von 53 beim «Einleben». Genau daraus ergibt sich
              die Fragestellung dieses Reports.<Cite n={1} /><Cite n={6} /><Cite n={62} />
            </p>
            <p className="mt-4 max-w-md text-lg leading-[1.7] text-ink-soft">
              Drei Leitfragen: Wie lebenswert ist Zürich gemessen an Rankings und harten Indikatoren? Für wen — und für
              wen nicht? Und warum schneidet die Stadt so ab?
            </p>
          </div>
          <div className="space-y-5">
            <Reveal>
              <Duell />
            </Reveal>
            {KERNAUSSAGEN.map((k, i) => (
              <Reveal key={k.n} delay={i * 0.05}>
                <div className="flex gap-5 rounded-xl border border-line bg-paper-warm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lake hover:shadow-lg">
                  <span className="font-mono text-sm text-lake">{k.n}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{k.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-soft">{k.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

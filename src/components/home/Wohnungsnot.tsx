import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cite from '@/components/Cite'
import { Reveal, CountUp, reducedMotion } from '@/components/motion'

gsap.registerPlugin(ScrollTrigger)

const TABLE = [
  ['Leerwohnungsziffer Stadt Zürich', '0,1 % (235 Wohnungen)', '1. Juni 2025', [49], true],
  ['Leerwohnungsziffer Kanton Zürich', '0,48 %', '1. Juni 2025', [50], false],
  ['Median-Nettomiete 3-Zi (Bestand)', "1'578 CHF/Monat", 'Mietpreiserhebung 2024', [52], false],
  ['Davon gemeinnützig / privat', "1'022 / 1'875 CHF/Monat", '2024', [52], true],
  ['Median-Angebotsmiete', '497 CHF/m²/Jahr', '2025', [53], true],
  ['Kaufpreis Eigentumswohnung', "16'000–19'000 CHF/m²", '2025/2026', [55], false],
  ['Krankenkassenprämien (mittlere Prämie)', '393,30 CHF/Monat; Kanton ZH +5,2 %', '2026', [56], true],
  ['Prämienanstieg kumuliert seit 2022', 'über 25 %', '2022–2026', [56], false],
  ['Mercer Cost of Living', 'Rang 3 weltweit', '2024', [32], false],
  ['EIU Worldwide Cost of Living', 'Rang 1 (mit Singapur)', '2023', [57], false],
] as const

export default function Wohnungsnot() {
  const bars = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.graben-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: bars.current, start: 'top 85%', end: 'top 35%', scrub: true },
        },
      )
    }, bars)
    return () => ctx.revert()
  }, [])

  return (
    <section className="noise-overlay bg-night pb-24 text-paper sm:pb-36">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        {/* 0,1-%-Monument */}
        <div className="py-20 text-center sm:py-28">
          <p className="kicker text-signal">Wohnungsnot & Lebenskosten</p>
          <p className="mt-6 font-mono font-medium leading-none text-signal" style={{ fontSize: 'clamp(5rem, 18vw, 18rem)' }}>
            <CountUp end={0.1} decimals={1} suffix=" %" duration={2} />
          </p>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-paper/75">
            Leerwohnungsziffer — <strong className="text-paper">235 leerstehende Wohnungen</strong>. Stadt Zürich,
            1. Juni 2025.<Cite n={49} /> Als Schwellenwert für Wohnungsknappheit gilt 1 Prozent: Zürich liegt um den
            Faktor zehn darunter.
          </p>
        </div>

        {/* Graben-Visual */}
        <div ref={bars} className="mx-auto max-w-3xl">
          <div className="flex items-end justify-center gap-10 sm:gap-20">
            <div className="flex w-40 flex-col items-center gap-3 sm:w-52">
              <div className="flex h-64 w-full flex-col justify-end overflow-hidden rounded-t-lg sm:h-80">
                <div className="graben-bar w-full origin-bottom bg-lake" style={{ height: '55%' }} title="Nicht gemeinnützig" />
                <div className="graben-bar w-full origin-bottom bg-lake-soft/60" style={{ height: '45%' }} title="Gemeinnützig" />
              </div>
              <p className="text-center font-mono text-xs leading-relaxed text-paper/80">
                Bestandsmiete 3-Zi<br />
                <span className="text-xl text-paper">CHF 1'578</span><br />
                <span className="text-paper/60">davon gemeinnützig 1'022</span>
                <Cite n={52} />
              </p>
            </div>
            <div className="mb-24 font-display text-3xl font-bold text-signal sm:text-4xl">≠</div>
            <div className="flex w-40 flex-col items-center gap-3 sm:w-52">
              <div className="flex h-64 w-full flex-col justify-end overflow-hidden rounded-t-lg sm:h-80">
                <div className="graben-bar w-full origin-bottom bg-signal" style={{ height: '100%' }} />
              </div>
              <p className="text-center font-mono text-xs leading-relaxed text-paper/80">
                Angebotsmiete-Niveau<br />
                <span className="text-xl text-paper">≈ 2× so hoch</span><br />
                <span className="text-paper/60">497 CHF/m²/Jahr</span>
                <Cite n={53} />
              </p>
            </div>
          </div>
          <p className="mt-8 text-center font-display text-xl font-semibold text-signal sm:text-2xl">
            «Der Graben» — er schützt Etablierte und bestraft Zuziehende.
          </p>
        </div>

        {/* Fliesstext */}
        <div className="mx-auto mt-16 max-w-prose2 space-y-5 text-lg leading-[1.7] text-paper/80">
          <Reveal>
            <p>
              Die Konsequenz ist ein Anbietermarkt mit ausgeprägter Selektionsfunktion: Medienberichte dokumentieren
              hunderte Bewerbungen pro Inserat und jahrelange Suchzeiten. Für Genossenschaftswohnungen sind{' '}
              <span className="text-signal">Suchzeiten von 6 bis 18 Monaten</span> und{' '}
              <span className="text-signal">30 bis 100 Bewerbungen</span> die beschriebene Realität.<Cite n={51} />
            </p>
          </Reveal>
          <Reveal>
            <p>
              Seit 2000 stiegen die nicht gemeinnützigen Medianmieten um 43 Prozent, in den Kreisen 4 und 8 um über
              60 Prozent.<Cite n={52} /> Beim Wohneigentum ist Zürich mit rund 16'000 bis 19'000 Franken pro Quadratmeter
              der teuerste Markt der Schweiz.<Cite n={55} /> Caritas Zürich beziffert die Folge: Bei ärmeren Haushalten
              verschlingen Wohnen und Gesundheit zusammen im Schnitt <span className="text-signal">etwa die Hälfte des
              Bruttoeinkommens</span>.<Cite n={58} />
            </p>
          </Reveal>
        </div>

        {/* Dunkle Tabelle */}
        <Reveal className="mt-16 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-night-raised text-left font-mono text-xs uppercase tracking-wider text-paper/60">
                <th className="px-5 py-3">Indikator</th>
                <th className="px-5 py-3">Wert</th>
                <th className="px-5 py-3">Zeitraum / Stichtag</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map(([label, wert, zeit, cites, alert], i) => (
                <tr key={label} className={`transition-colors hover:bg-lake/10 ${i % 2 ? 'bg-white/[0.03]' : ''} ${alert ? 'border-l-2 border-l-signal' : ''}`}>
                  <td className="px-5 py-3 text-paper/85">{label}</td>
                  <td className="px-5 py-3 font-mono text-paper">
                    {wert}
                    {cites.map((n) => <Cite key={n} n={n} />)}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-paper/60">{zeit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

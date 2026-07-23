import { useState } from 'react'
import Cite from '@/components/Cite'
import { Reveal } from '@/components/motion'

interface City {
  name: string
  flag: string
  ranks: [string, string][]
  wins: { text: string; cites: number[] }[]
  loses: { text: string; cites: number[] }[]
}

const CITIES: City[] = [
  {
    name: 'Zürich',
    flag: 'CH · ZH',
    ranks: [['Mercer', '#1'], ['EIU', '#2'], ['IMD', '#1']],
    wins: [{ text: 'Lohnniveau, ÖV-Qualität, Sicherheit, Steuerbelastung', cites: [1, 13] }],
    loses: [{ text: 'Bezahlbarkeit, Einleben', cites: [6, 62] }],
  },
  {
    name: 'Wien',
    flag: 'AT',
    ranks: [['Mercer', '#2'], ['EIU', '#2'], ['Monocle', 'Best for housing']],
    wins: [{ text: 'Bezahlbarer Wohnraum (~25 % gemeinnützig), Kulturdichte', cites: [87, 5] }],
    loses: [{ text: 'Stabilitätswerte gesunken; Wohnraum für Expats zuletzt knapper', cites: [2, 87] }],
  },
  {
    name: 'Kopenhagen',
    flag: 'DK',
    ranks: [['EIU', '#1'], ['Happy City', '#1'], ['Deutsche Bank', '#2']],
    wins: [{ text: 'EIU- und Happy-City-Spitze, besseres Preis-Lebens-Verhältnis', cites: [2, 9] }],
    loses: [{ text: 'Tieferes Lohnniveau, höhere Steuerlast', cites: [] }],
  },
  {
    name: 'Genf',
    flag: 'CH · GE',
    ranks: [['Mercer', '#3'], ['EIU', '#5'], ['IMD', '#3']],
    wins: [{ text: 'Gleiche Qualitätsstruktur, internationale Institutionen', cites: [87, 2] }],
    loses: [{ text: 'Gleiche Kostenproblematik, kleinerer Arbeitsmarkt', cites: [2] }],
  },
]

const BARS: [string, Record<string, number>][] = [
  ['Qualität', { 'Zürich': 96, 'Wien': 90, 'Kopenhagen': 98, 'Genf': 92 }],
  ['Bezahlbarkeit', { 'Zürich': 22, 'Wien': 80, 'Kopenhagen': 62, 'Genf': 25 }],
  ['Löhne', { 'Zürich': 98, 'Wien': 70, 'Kopenhagen': 66, 'Genf': 95 }],
  ['Integration', { 'Zürich': 30, 'Wien': 55, 'Kopenhagen': 70, 'Genf': 45 }],
  ['Stabilität', { 'Zürich': 95, 'Wien': 78, 'Kopenhagen': 100, 'Genf': 92 }],
]

const CITY_COLORS: Record<string, string> = { 'Zürich': '#1B5FD9', 'Wien': '#C9A227', 'Kopenhagen': '#3D4852', 'Genf': '#7FA8E8' }

export default function StaedteDuell() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="bg-paper pb-24 sm:pb-36">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {CITIES.map((c, i) => {
            const isZh = c.name === 'Zürich'
            const dim = hovered && !isZh && hovered !== c.name && hovered !== 'Zürich' ? false : hovered !== null && hovered !== c.name && isZh
            return (
              <Reveal key={c.name} delay={i * 0.08}>
                <div
                  onMouseEnter={() => !isZh && setHovered(c.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`h-full cursor-pointer rounded-xl border bg-paper-warm p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    isZh ? 'border-2 border-lake shadow-lg' : 'border-line'
                  } ${dim ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                    <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-paper">{c.flag}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.ranks.map(([k, v]) => (
                      <span key={k} className="rounded-full bg-lake-soft px-2.5 py-1 font-mono text-[10px] text-lake">
                        {k} {v}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-lake">Gewinnt bei</p>
                      {c.wins.map((w) => (
                        <p key={w.text} className="mt-1 text-ink-soft">
                          {w.text}
                          {w.cites.map((n) => <Cite key={n} n={n} />)}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-signal">Verliert bei</p>
                      {c.loses.map((w) => (
                        <p key={w.text} className="mt-1 text-ink-soft">
                          {w.text}
                          {w.cites.map((n) => <Cite key={n} n={n} />)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Balken-Vergleich */}
        <Reveal className="mt-16 rounded-xl border border-line bg-paper-warm p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Fünf Achsen im Überblick (qualitativ, aus dem Report belegt)</p>
          <div className="mt-6 space-y-5">
            {BARS.map(([axis, vals]) => (
              <div key={axis} className="grid items-center gap-2 sm:grid-cols-[130px_1fr]">
                <span className={`font-mono text-xs ${axis === 'Bezahlbarkeit' ? 'font-semibold text-signal' : 'text-ink-soft'}`}>{axis}</span>
                <div className="space-y-1">
                  {Object.entries(vals).map(([city, v]) => (
                    <div key={city} className="flex items-center gap-2">
                      <span className="w-20 shrink-0 font-mono text-[10px] text-ink-soft/70">{city}</span>
                      <div className="h-2 flex-1 rounded bg-line">
                        <div
                          className="h-2 rounded transition-all duration-700"
                          style={{ width: `${v}%`, backgroundColor: axis === 'Bezahlbarkeit' && city === 'Zürich' ? '#E63329' : CITY_COLORS[city] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-prose2">
          <p className="text-lg leading-[1.7] text-ink-soft">
            Zürichs Konkurrenten gewinnen überall dort, wo Zürich verliert — bei den Wohnkosten und der alltäglichen
            Zugänglichkeit —, während keiner Zürichs Kombination aus Lohnniveau, ÖV-Qualität und Sicherheit erreicht.
            Der Ausreisser ist Wien: die einzige Stadt, die Zürichs strukturelle Schwäche mit einer eigenen strukturellen
            Stärke beantwortet.<Cite n={87} />
          </p>
        </Reveal>
      </div>
    </section>
  )
}

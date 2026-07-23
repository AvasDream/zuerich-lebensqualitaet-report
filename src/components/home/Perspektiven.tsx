import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Cite from '@/components/Cite'
import { Reveal, CountUp } from '@/components/motion'

const TABS = ['Die Einheimischen', 'Die Expats', 'Die Geringverdienenden'] as const

const PANES: Record<(typeof TABS)[number], { stats: { v: string; l: string; cites?: number[] }[]; text: ReactNode }> = {
  'Die Einheimischen': {
    stats: [
      { v: "CHF 1'578", l: 'Bestandsmiete 3-Zi — Schutz statt Belastung', cites: [52] },
      { v: '84 %', l: 'bewerten Lebensqualität mit Note 5 oder 6', cites: [85] },
      { v: '1/2', l: 'der ausländisch Zugezogenen bewertet das Leben als «sehr gut»', cites: [85] },
    ],
    text: (
      <>
        Wer eine Bestandsmiete oder Eigentum hält, profitiert von der Kollektivgut-Struktur: exzellenter ÖV, hohe
        Sicherheit, sauberes Wasser, See und Wald vor der Tür, gute Schulen und Spitäler — bei einem Medianlohn, der der
        höchste der Schweiz ist. Der Graben zwischen Bestands- und Angebotsmieten wirkt für diese Gruppe als Schutz.
        Bemerkenswert: Ausländisch Zugezogene bewerten das Leben in Zürich sogar häufiger als «sehr gut» (jede zweite
        Person) als Einheimische (jede dritte).<Cite n={85} />
      </>
    ),
  },
  'Die Expats': {
    stats: [
      { v: '#9', l: 'Lebensqualität (InterNations 2024)', cites: [64] },
      { v: '#2', l: 'Sicherheit — nach Kopenhagen', cites: [64] },
      { v: '53/53', l: 'Letzter Platz: lokale Freundschaften', cites: [62] },
      { v: '65 %', l: 'überwiegend mit anderen Expats befreundet', cites: [62] },
    ],
    text: (
      <>
        Die internationalen Hochqualifizierten erleben eine gespaltene Stadt: materiell Weltklasse, sozial verschlossen.
        Die Stadt optimiert exakt jene Güter, die Entsendungen erleichtern — und genau jene, die Integration erschweren,
        bleiben ungesteuert. Das Muster ist stabil über Jahre und betrifft die gesamte Schweiz (Länder-Rang 46 von 53
        beim Einleben), nicht nur Zürich.<Cite n={65} />
      </>
    ),
  },
  'Die Geringverdienenden': {
    stats: [
      { v: "17'000", l: 'Beschäftigte verdienen < CHF 23/h — zwei Drittel Frauen', cites: [58] },
      { v: '50 %', l: 'des Einkommens fürs Wohnen bei Geringverdienenden', cites: [60] },
      { v: '≈ 0', l: 'Wanderungssaldo — die Stadt als Filter', cites: [80] },
    ],
    text: (
      <>
        Für diese Gruppe ist Zürich nicht «die beste Stadt der Welt», sondern ein Filter: Wohnen und Krankenkasse
        verschlingen rund die Hälfte des Bruttoeinkommens. Wer die Eintrittshürden (Wohnung, Einkommen, Netzwerk) nicht
        schafft, landet in der Agglomeration — und pendelt zur Arbeit zurück in die Stadt, deren Lebensqualität er
        mitfinanziert, aber nicht teilt.<Cite n={58} /><Cite n={60} />
      </>
    ),
  },
}

const SPEKTRUM = [
  { name: 'Mercer QoL', rank: 1, note: 'Infrastruktur für Entsandte' },
  { name: 'IMD Smart City', rank: 1, note: 'Wahrnehmung der Einheimischen' },
  { name: 'EIU Liveability', rank: 2, note: 'Standard-Indikatoren' },
  { name: 'Monocle', rank: 6, note: 'Alltagsfaktoren' },
  { name: 'Deutsche Bank', rank: 8, note: 'Kostenbereinigt' },
  { name: 'Numbeo', rank: 24, note: 'Preis-Leistung' },
]

export default function Perspektiven() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Die Einheimischen')

  return (
    <section className="bg-paper pb-24 sm:pb-36">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        {/* Methodik-Kritik */}
        <div className="mx-auto max-w-prose2">
          <Reveal>
            <p className="text-lg leading-[1.7] text-ink-soft">
              Die einflussreichsten Liveability-Indizes wurden nicht gebaut, um das Leben der Einheimischen abzubilden,
              sondern um Geschäftsprobleme zu lösen. Mercer selbst beschreibt den Zweck unmissverständlich: Die Studie
              bewertet Lebensbedingungen, damit Unternehmen «faire und konsistente Zulagen für international Entsandte»
              berechnen können.<Cite n={1} />
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-8 space-y-6">
              <blockquote className="rounded-xl border-l-4 border-lake bg-lake-soft/50 p-6 font-display text-xl font-semibold leading-snug">
                «Livability-Rankings messen den Lebensstandard, nicht die Lebensqualität.»<Cite n={82} />
                <span className="mt-2 block font-serif text-sm font-normal text-ink-soft">— Okulicz-Kozaryn, Social Indicators Research</span>
              </blockquote>
            </div>
          </Reveal>
        </div>

        {/* Spektrum-Leiste */}
        <Reveal className="mt-14">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-ink-soft">
            Zürichs Rang wandert mit der Referenzpopulation — Hover für Details
          </p>
          <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between gap-1 font-mono text-[10px] text-ink-soft">
            <span>Infrastruktur für Entsandte</span>
            <span>Preis-Leistung für Durchschnittshaushalte</span>
          </div>
          <div className="relative mx-auto mt-2 h-2 max-w-4xl rounded-full bg-gradient-to-r from-lake via-gold to-signal">
            {SPEKTRUM.map((s) => (
              <div key={s.name} className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${((s.rank - 1) / 25) * 96 + 2}%` }}>
                <div className="h-5 w-5 cursor-pointer rounded-full border-2 border-paper bg-ink shadow transition-transform hover:scale-125" />
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-40 -translate-x-1/2 rounded-lg bg-night p-3 text-center opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                  <p className="font-mono text-xs font-semibold text-paper">{s.name}</p>
                  <p className="font-mono text-[10px] text-gold">Rang {s.rank}</p>
                  <p className="mt-1 text-[10px] text-paper/70">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Drei Zürich — Tabs */}
        <div className="mt-24">
          <h3 className="text-center font-display text-3xl font-bold sm:text-4xl">Drei Zürich</h3>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Perspektiven">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`relative rounded-full px-6 py-2.5 font-mono text-sm transition-colors ${tab === t ? 'text-white' : 'bg-paper-warm text-ink-soft hover:text-ink'}`}
              >
                {tab === t && <motion.span layoutId="persp-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
          <div className="relative mx-auto mt-10 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PANES[tab].stats.map((s) => (
                    <div key={s.l} className="rounded-xl border border-line bg-paper-warm p-5">
                      <p className="font-mono text-3xl font-medium text-lake">{s.v}</p>
                      <p className="mt-2 text-sm leading-snug text-ink-soft">
                        {s.l}
                        {s.cites?.map((n) => <Cite key={n} n={n} />)}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-lg leading-[1.7] text-ink-soft">{PANES[tab].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bevölkerungsbefragung */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-8">
              <div className="relative">
                <svg width="190" height="190" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#E3DCD0" strokeWidth="14" />
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#1B5FD9" strokeWidth="14" strokeLinecap="round" transform="rotate(-90 70 70)" strokeDasharray={2 * Math.PI * 54} strokeDashoffset={2 * Math.PI * 54 * 0.16} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-4xl font-medium"><CountUp end={84} suffix=" %" /></span>
                </div>
              </div>
              <div>
                <h4 className="font-display text-2xl font-bold">Note 5 oder 6</h4>
                <p className="mt-2 max-w-xs leading-relaxed text-ink-soft">
                  bewerten die Lebensqualität — sehr hoch, aber rückläufig gegenüber knapp 90 % (2019).<Cite n={85} />
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Bestbewertete Leistungen (gute bis sehr gute Noten)</p>
            <div className="mt-4 space-y-3">
              {[
                ['Öffentlicher Verkehr', 87],
                ['Einkaufsangebot', 85],
                ['Ausgeh- & Kulturangebot', 82],
                ['Gesundheitsangebot', 80],
                ['Wohnraum — grösste Sorge', 56],
              ].map(([label, pct]) => (
                <div key={label as string}>
                  <div className="flex justify-between font-mono text-xs">
                    <span>{label}</span>
                    <span className={label === 'Wohnraum — grösste Sorge' ? 'text-signal' : 'text-lake'}>{pct} %</span>
                  </div>
                  <div className="mt-1 h-2.5 rounded bg-line">
                    <div className={`h-2.5 rounded ${label === 'Wohnraum — grösste Sorge' ? 'bg-signal' : 'bg-lake'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Erstmals seit Erhebungsbeginn 1999 wurde Wohnraum zur grössten Sorge; <strong>83 %</strong> finden, die
              Stadt unternehme zu wenig für preisgünstigen Wohnungsbau.<Cite n={48} /> Die Zürcher kritisieren nicht, was
              die Stadt tut — sie fürchten, sich die Stadt bald nicht mehr leisten zu können.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Cite from '@/components/Cite'
import { Reveal } from '@/components/motion'

type Cat = 'qualitaet' | 'kosten' | 'alle'

interface Ranking {
  publisher: string
  name: string
  rank: string
  rankNum: number // für Scatter (1-25+)
  trend: 'up' | 'down' | 'flat'
  edition: string
  comment: string
  cites: number[]
  kosten: boolean
}

const RANKINGS: Ranking[] = [
  { publisher: 'Mercer', name: 'Quality of Living', rank: '1', rankNum: 1, trend: 'up', edition: '2024', comment: 'Erstmals vor Wien; Expat-Fokus', cites: [1], kosten: false },
  { publisher: 'EIU', name: 'Global Liveability Index', rank: '2', rankNum: 2, trend: 'up', edition: '2025', comment: 'Geteilt mit Wien; 97,1 Punkte', cites: [2], kosten: false },
  { publisher: 'IMD', name: 'Smart City Index', rank: '1', rankNum: 1, trend: 'flat', edition: '2026', comment: 'Stabil seit 2019; AAA-Rating', cites: [4], kosten: false },
  { publisher: 'Monocle', name: 'Quality of Life Survey', rank: '6', rankNum: 6, trend: 'down', edition: '2025', comment: '«Best for mobility»; 2024: Rang 3', cites: [5], kosten: false },
  { publisher: 'Numbeo', name: 'Quality of Life', rank: '24', rankNum: 24, trend: 'down', edition: '2026', comment: 'Kostenfaktoren dominieren', cites: [8], kosten: true },
  { publisher: 'Deutsche Bank', name: "Mapping the World's Prices", rank: '8', rankNum: 8, trend: 'down', edition: '2025', comment: 'Erstmals seit 2012 ausserhalb Top 5', cites: [9], kosten: true },
  { publisher: 'Mercer', name: 'Cost of Living', rank: '3†', rankNum: 3, trend: 'flat', edition: '2024', comment: '3. teuerste Stadt — Gegenindikator', cites: [6], kosten: true },
]

const TABS: { key: Cat; label: string }[] = [
  { key: 'qualitaet', label: 'Qualitätsindizes' },
  { key: 'kosten', label: 'Kostenindizes' },
  { key: 'alle', label: 'Alle' },
]

const Trend = ({ t }: { t: Ranking['trend'] }) =>
  t === 'up' ? <TrendingUp size={16} className="text-lake" /> : t === 'down' ? <TrendingDown size={16} className="text-signal" /> : <Minus size={16} className="text-ink-soft" />

export default function RankingExplorer() {
  const [cat, setCat] = useState<Cat>('alle')
  const visible = RANKINGS.filter((r) => cat === 'alle' || (cat === 'kosten') === r.kosten)

  return (
    <section className="bg-paper pb-24 sm:pb-36">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        {/* Toggle */}
        <Reveal>
          <div className="flex flex-wrap gap-2 rounded-full border border-line bg-paper-warm p-1.5 sm:inline-flex" role="tablist" aria-label="Ranking-Kategorien">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={cat === t.key}
                onClick={() => setCat(t.key)}
                className={`relative rounded-full px-5 py-2 font-mono text-sm transition-colors ${cat === t.key ? 'text-white' : 'text-ink-soft hover:text-ink'}`}
              >
                {cat === t.key && <motion.span layoutId="ranking-pill" className="absolute inset-0 rounded-full bg-lake" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Kartenraster */}
        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((r) => (
              <motion.article
                layout
                key={r.name + r.publisher}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`cursor-pointer rounded-xl border border-line bg-paper-warm p-6 shadow-sm transition-shadow hover:-translate-y-1.5 hover:shadow-xl ${r.kosten ? 'border-l-4 border-l-signal' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">{r.publisher}</p>
                  <span className="rounded-full bg-lake-soft px-2 py-0.5 font-mono text-[10px] text-lake">{r.edition}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-ink-soft">{r.name}</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="font-mono text-6xl font-medium leading-none tabular-nums">{r.rank}</span>
                  <Trend t={r.trend} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft/80">
                  {r.comment}
                  {r.cites.map((n) => <Cite key={n} n={n} />)}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Scatter-Achse */}
        <Reveal className="mt-16">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Das Muster in einer Geste — Rang-Positionen</p>
          <div className="relative mt-6 border-t-2 border-ink/70 pb-14 pt-8">
            <span className="absolute -top-3 left-0 bg-paper pr-2 font-mono text-xs text-lake">Rang 1</span>
            <span className="absolute -top-3 right-0 bg-paper pl-2 font-mono text-xs text-signal">Rang 25+</span>
            {RANKINGS.filter((r) => cat === 'alle' || (cat === 'kosten') === r.kosten).map((r) => (
              <motion.div
                key={r.name + r.publisher + '-dot'}
                className="group absolute -translate-x-1/2"
                animate={{ left: `${(Math.min(r.rankNum, 25) / 26) * 96 + 2}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              >
                <div className={`h-4 w-4 rounded-full border-2 border-paper shadow ${r.kosten ? 'bg-signal' : 'bg-lake'}`} />
                <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">
                  {r.publisher} {r.edition}
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Textblock 2.3 */}
        <Reveal className="mx-auto mt-20 max-w-prose2">
          <p className="text-lg leading-[1.7] text-ink-soft">
            Die Divergenz ist kein Widerspruch, sondern ein Messproblem: Mercer misst den Lebensstandard international
            Entsandter mit überdurchschnittlichem Einkommen, die IMD-Umfrage die Zufriedenheit der Einheimischen mit
            Infrastruktur und Services — beide Perspektiven blenden aus, was dieser Standard kostet.<Cite n={1} /><Cite n={4} />
          </p>
          <div className="mt-8 rounded-xl border-l-4 border-lake bg-lake-soft/50 p-6">
            <p className="font-display text-xl font-semibold leading-snug">
              «76,6 % der befragten Zürcherinnen und Zürcher nennen bezahlbares Wohnen als wichtigste Priorität ihrer
              Stadt»<Cite n={4} />
            </p>
            <p className="mt-2 text-sm text-ink-soft">— gefolgt von Verkehrsstaus (58,1 %). IMD Smart City Index.</p>
          </div>
          <p className="mt-8 text-lg leading-[1.7] text-ink-soft">
            Zürich dominiert praktisch alle Qualitätsindizes und verliert überall dort, wo Kosten einfliessen. Die
            Rankingspitze ist real, aber selektiv — sie gilt für die Leistungsfähigkeit der Stadt, nicht für deren
            Bezahlbarkeit.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

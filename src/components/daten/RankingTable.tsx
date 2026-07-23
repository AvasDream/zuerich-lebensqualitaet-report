import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Cite from '@/components/Cite'
import { Reveal } from '@/components/motion'
import type { RankingRow } from './data'
import { RANKINGS } from './data'

type SortKey = 'name' | 'herausgeber' | 'rang' | 'trend'

const TREND_ORDER = { up: 0, flat: 1, down: 2 } as const

const COLUMNS: { key: SortKey | 'kommentar' | 'quelle'; label: string; sortable: boolean }[] = [
  { key: 'name', label: 'Ranking', sortable: true },
  { key: 'herausgeber', label: 'Herausgeber', sortable: true },
  { key: 'rang', label: 'Rang', sortable: true },
  { key: 'trend', label: 'Trend', sortable: true },
  { key: 'kommentar', label: 'Kommentar', sortable: false },
  { key: 'quelle', label: 'Quelle', sortable: false },
]

function TrendBadge({ row }: { row: RankingRow }) {
  if (row.trend === 'up')
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-lake">
        <TrendingUp size={14} aria-hidden />
        <span>{row.trendText}</span>
      </span>
    )
  if (row.trend === 'down')
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-signal">
        <TrendingDown size={14} aria-hidden />
        <span>{row.trendText}</span>
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
      <Minus size={14} aria-hidden />
      <span>{row.trendText}</span>
    </span>
  )
}

export default function RankingTable() {
  const [sortKey, setSortKey] = useState<SortKey>('rang')
  const [asc, setAsc] = useState(true)

  const rows = useMemo(() => {
    const sorted = [...RANKINGS].sort((a, b) => {
      let cmp = 0
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name, 'de')
      else if (sortKey === 'herausgeber') cmp = a.herausgeber.localeCompare(b.herausgeber, 'de')
      else if (sortKey === 'rang') cmp = a.rang - b.rang
      else cmp = TREND_ORDER[a.trend] - TREND_ORDER[b.trend] || a.rang - b.rang
      return asc ? cmp : -cmp
    })
    return sorted
  }, [sortKey, asc])

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setAsc((v) => !v)
    else {
      setSortKey(key)
      setAsc(true)
    }
  }

  return (
    <section className="mx-auto max-w-content px-4 pb-24 sm:px-6" aria-label="Ranking-Tabelle">
      <Reveal>
        <p className="kicker text-lake">Tabelle</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Alle Rankings im Überblick</h2>
        <p className="mt-2 max-w-prose text-sm text-ink-soft">
          Die vollständige Tabelle aus Kapitel 2 des Reports — Spaltenköpfe anklicken zum Sortieren.
        </p>
      </Reveal>

      {/* Desktop-Tabelle */}
      <Reveal className="mt-8 hidden overflow-hidden rounded-xl border border-line bg-paper-warm md:block" delay={0.1}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-paper">
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                  {c.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(c.key as SortKey)}
                      className="inline-flex items-center gap-1 transition-colors hover:text-lake"
                      aria-label={`Nach ${c.label} sortieren`}
                    >
                      {c.label}
                      <ArrowDown
                        size={12}
                        aria-hidden
                        className={`transition-transform duration-200 ${sortKey === c.key ? 'text-lake' : 'opacity-30'} ${
                          sortKey === c.key && !asc ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((r, i) => (
                <motion.tr
                  key={r.name}
                  layout
                  transition={{ duration: 0.3 }}
                  className={`border-b border-line/60 transition-colors last:border-0 hover:bg-lake-soft/40 ${i % 2 === 1 ? 'bg-paper/50' : ''}`}
                >
                  <td className="px-4 py-3 font-semibold text-ink">{r.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.herausgeber}</td>
                  <td className="px-4 py-3 font-mono tabular-nums text-ink">{r.rangText}</td>
                  <td className="px-4 py-3">
                    <TrendBadge row={r} />
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-ink-soft">{r.kommentar}</td>
                  <td className="px-4 py-3">
                    <Cite n={r.quelle} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </Reveal>

      {/* Mobile: Karten-Stack */}
      <div className="mt-8 space-y-3 md:hidden">
        {rows.map((r) => (
          <div key={r.name} className="rounded-xl border border-line bg-paper-warm p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-ink">{r.name}</p>
              <span className="shrink-0 rounded-full bg-lake-soft px-2 py-0.5 font-mono text-[10px] tabular-nums text-lake">
                Rang {r.rangText}
              </span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft/70">{r.herausgeber}</p>
            <div className="mt-2">
              <TrendBadge row={r} />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">{r.kommentar}</p>
            <p className="mt-2">
              <Cite n={r.quelle} />
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

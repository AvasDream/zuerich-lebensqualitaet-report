import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StatCard from '@/components/StatCard'
import type { Category } from '@/components/daten/data'
import { INDICATORS, CAT_LABEL, CAT_TAG_CLASS } from '@/components/daten/data'
import FilterBar from '@/components/daten/FilterBar'
import ChartsSection from '@/components/daten/ChartsSection'
import RankingTable from '@/components/daten/RankingTable'

const TITLE_WORDS = ['Zürich', 'in', 'Zahlen']

export default function Daten() {
  const [cat, setCat] = useState<Category | 'alle'>('alle')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INDICATORS.filter((i) => {
      if (cat !== 'alle' && i.cat !== cat) return false
      if (!q) return true
      return `${i.label} ${i.note} ${CAT_LABEL[i.cat]}`.toLowerCase().includes(q)
    })
  }, [cat, query])

  return (
    <div className="bg-paper">
      {/* Header */}
      <header className="mx-auto max-w-content px-4 pb-12 pt-16 sm:px-6 sm:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="kicker text-lake"
        >
          Daten-Dashboard
        </motion.p>
        <h1 className="mt-4 font-display font-bold text-ink" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.05 }}>
          {TITLE_WORDS.map((w, i) => (
            <span key={w} className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft"
        >
          Sämtliche Kennzahlen des Reports — mit Jahr, Quelle und Einordnung. Datenstand: Juli 2026.
        </motion.p>
      </header>

      {/* Sticky Filter-Leiste */}
      <FilterBar active={cat} onCategory={setCat} query={query} onQuery={setQuery} count={filtered.length} />

      {/* Kennzahlen-Raster */}
      <section className="mx-auto max-w-content px-4 py-12 sm:px-6" aria-label="Kennzahlen">
        {filtered.length === 0 ? (
          <p className="py-16 text-center font-mono text-sm text-ink-soft">
            Keine Kennzahl gefunden — Suchbegriff anpassen oder Filter zurücksetzen.
          </p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((ind, i) => (
                <motion.div
                  key={ind.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.4), ease: 'easeOut' }}
                  className="relative"
                >
                  <span
                    className={`absolute -top-2 left-4 z-10 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${CAT_TAG_CLASS[ind.cat]}`}
                  >
                    {CAT_LABEL[ind.cat]}
                  </span>
                  <StatCard
                    value={ind.value}
                    decimals={ind.decimals}
                    prefix={ind.prefix}
                    suffix={ind.suffix}
                    label={ind.label}
                    year={ind.year}
                    note={ind.note}
                    cites={ind.cites}
                    variant={ind.variant === 'alert' ? 'light' : 'light'}
                    className={ind.variant === 'alert' ? 'h-full border-l-4 border-l-signal pt-7' : 'h-full pt-7'}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Chart-Sektion «Drei Blicke» */}
      <div className="border-y border-line bg-paper">
        <ChartsSection />
      </div>

      {/* Sortierbare Ranking-Tabelle */}
      <div className="pt-16">
        <RankingTable />
      </div>
    </div>
  )
}

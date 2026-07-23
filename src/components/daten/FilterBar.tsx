import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import type { Category } from './data'
import { CATEGORIES } from './data'

interface FilterBarProps {
  active: Category | 'alle'
  onCategory: (c: Category | 'alle') => void
  query: string
  onQuery: (q: string) => void
  count: number
}

export default function FilterBar({ active, onCategory, query, onQuery, count }: FilterBarProps) {
  return (
    <div className="sticky top-12 z-30 border-b border-line bg-paper-warm/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 max-w-content flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 sm:px-6">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Kategorie-Filter">
          {CATEGORIES.map((c) => {
            const isActive = active === c.id
            return (
              <motion.button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategory(c.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  isActive ? 'text-white' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="chip-fill"
                    className="absolute inset-0 rounded-full bg-lake"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </motion.button>
            )
          })}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden font-mono text-[11px] tabular-nums text-ink-soft/70 sm:inline">{count} Kennzahlen</span>
          <label className="relative block">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Kennzahl suchen…"
              aria-label="Kennzahl suchen"
              className="w-48 rounded-full border border-line bg-paper py-1.5 pl-8 pr-3 font-mono text-xs text-ink placeholder:text-ink-soft/50 focus:border-lake focus:outline-none sm:w-56"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

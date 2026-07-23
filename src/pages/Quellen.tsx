import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { SOURCES } from '@/data/sources'
import { CountUp, Reveal } from '@/components/motion'
import SourceRow from '@/components/quellen/SourceRow'

const CHAPTER_FILTERS = [
  { value: 0, label: 'Alle' },
  { value: 2, label: 'Kap. 2 Rankings' },
  { value: 3, label: 'Kap. 3 Treiber' },
  { value: 4, label: 'Kap. 4 Schattenseiten' },
  { value: 5, label: 'Kap. 5 Perspektiven' },
  { value: 6, label: 'Kap. 6 Vergleich' },
]

const HASH_RE = /^#q-(\d+)$/

export default function Quellen() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [chapter, setChapter] = useState(0)
  const [openIds, setOpenIds] = useState<Set<number>>(new Set())
  const [flashId, setFlashId] = useState<number | null>(null)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SOURCES.filter((s) => {
      if (chapter !== 0 && !s.chapter.includes(chapter)) return false
      if (!q) return true
      return (
        s.title.toLowerCase().includes(q) ||
        s.publisher.toLowerCase().includes(q) ||
        s.date.toLowerCase().includes(q) ||
        String(s.n) === q
      )
    })
  }, [query, chapter])

  const toggle = useCallback((n: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }, [])

  // Deep-Link: #q-N -> Eintrag öffnen, scrollen, 2s highlighten
  useEffect(() => {
    const m = location.hash.match(HASH_RE)
    if (!m) return
    const n = Number(m[1])
    if (!SOURCES.some((s) => s.n === n)) return
    setOpenIds((prev) => new Set(prev).add(n))
    const t = setTimeout(() => {
      document.getElementById(`q-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setFlashId(n)
      if (flashTimer.current) clearTimeout(flashTimer.current)
      flashTimer.current = setTimeout(() => setFlashId(null), 2000)
    }, 150)
    return () => clearTimeout(t)
  }, [location.hash])

  useEffect(
    () => () => {
      if (flashTimer.current) clearTimeout(flashTimer.current)
    },
    [],
  )

  return (
    <div className="bg-paper text-ink">
      {/* Header */}
      <section className="mx-auto max-w-content px-4 pb-12 pt-20 sm:px-6 sm:pt-28">
        <Reveal>
          <p className="kicker text-lake">Quellenverzeichnis</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            <CountUp end={87} duration={1.4} className="font-mono" /> Quellen
          </h1>
          <p className="mt-6 max-w-prose2 text-lg leading-relaxed text-ink-soft">
            Primär amtliche Statistiken von Stadt und Kanton Zürich sowie Originalquellen der
            Ranking-Herausgeber. Datenstand: Juli 2026.
          </p>
        </Reveal>
      </section>

      {/* Werkzeug-Leiste */}
      <div className="sticky top-12 z-40 border-y border-line bg-paper-warm/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[900px] flex-col gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <label className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quelle, Herausgeber oder Stichwort…"
                aria-label="Quellen durchsuchen"
                className="w-full rounded-md border border-line bg-paper py-2 pl-9 pr-8 font-mono text-sm text-ink placeholder:text-ink-soft/60 focus:border-lake focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Suche zurücksetzen"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ink-soft hover:text-ink"
                >
                  <X size={14} />
                </button>
              )}
            </label>
            <span className="shrink-0 font-mono text-xs tabular-nums text-ink-soft" aria-live="polite">
              {filtered.length} von {SOURCES.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Kapitel-Filter">
            {CHAPTER_FILTERS.map((f) => {
              const active = chapter === f.value
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setChapter(f.value)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                    active
                      ? 'border-lake bg-lake text-paper'
                      : 'border-ink/20 text-ink-soft hover:border-lake hover:text-lake'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quellen-Liste */}
      <section className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        {filtered.length === 0 ? (
          <p className="py-16 text-center font-mono text-sm text-ink-soft">
            Keine Quelle gefunden — Suche oder Filter anpassen.
          </p>
        ) : (
          <motion.div layout="position" className="border-t border-line">
            {filtered.map((s, i) => (
              <motion.div
                key={s.n}
                layout="position"
                initial={i < 15 ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i < 15 ? i * 0.03 : 0, ease: [0.16, 1, 0.3, 1] }}
              >
                <SourceRow
                  source={s}
                  open={openIds.has(s.n)}
                  flash={flashId === s.n}
                  onToggle={() => toggle(s.n)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Methodik-Box */}
        <Reveal className="mt-16">
          <div className="rounded-xl border border-line bg-paper-warm p-6 sm:p-8">
            <p className="kicker text-lake">Methodik &amp; Datenlücken</p>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Datenstand</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Juli 2026. Alle Angaben wurden zum Stichtag aus den Originalquellen übernommen;
                  Abrufdaten sind in den einzelnen Einträgen vermerkt.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Primärquellen</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Stadt und Kanton Zürich, BFS, SBB, ZVV sowie die Originalquellen der
                  Ranking-Herausgeber Mercer, EIU und IMD.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide">Ausgewiesene Datenlücken</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Keine Zürich-spezifische Armutsquote, kein EIU-Cost-of-Living-Wert für 2024/25 und
                  keine Einsamkeitsstatistik auf Stadtebene. Diese Lücken sind im Report als solche
                  ausgewiesen und nicht durch Schätzwerte ersetzt.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

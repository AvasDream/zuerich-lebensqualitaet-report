import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ExternalLink } from 'lucide-react'
import type { Source } from '@/data/sources'

const CHAPTER_LABELS: Record<number, string> = {
  1: 'Kap. 1 · Rankings',
  2: 'Kap. 2 · Treiber',
  3: 'Kap. 3 · Schattenseiten',
  4: 'Kap. 4 · Wessen Lebensqualität?',
  5: 'Kap. 5 · Der Vergleich',
  6: 'Kap. 6 · Die Zukunftsfrage',
}

interface Props {
  source: Source
  open: boolean
  flash: boolean
  onToggle: () => void
}

export default function SourceRow({ source, open, flash, onToggle }: Props) {
  const { n, publisher, title, url, date, chapter } = source
  return (
    <div
      id={`q-${n}`}
      className={`scroll-mt-32 border-b border-line transition-colors duration-700 ${
        flash ? 'bg-lake-soft' : 'bg-transparent hover:bg-paper-warm'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`q-${n}-detail`}
        className="flex w-full items-center gap-3 px-3 py-4 text-left sm:gap-4 sm:px-4"
      >
        <span className="w-10 shrink-0 font-mono text-sm tabular-nums text-lake">[{n}]</span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-[15px] font-semibold leading-snug text-ink sm:text-base">
            {title}
          </span>
          <span className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
              {publisher}
            </span>
            <span className="rounded-full bg-paper-warm px-2 py-0.5 font-mono text-[10px] tabular-nums text-ink-soft">
              {date}
            </span>
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-ink-soft"
          aria-hidden
        >
          <ChevronRight size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`q-${n}-detail`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-5 pr-4 sm:px-4 sm:pl-14">
              <dl className="grid gap-2 text-sm sm:grid-cols-[7rem_1fr] sm:gap-x-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Herausgeber</dt>
                <dd className="text-ink">{publisher}</dd>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Titel</dt>
                <dd className="text-ink">{title}</dd>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Stand / Datum</dt>
                <dd className="font-mono text-[13px] tabular-nums text-ink">{date}</dd>
                {url && (
                  <>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">URL</dt>
                    <dd>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1.5 break-all font-mono text-[13px] text-lake underline decoration-lake/40 underline-offset-2 hover:decoration-lake"
                      >
                        <span className="break-all">{url}</span>
                        <ExternalLink size={13} className="shrink-0" aria-hidden />
                      </a>
                    </dd>
                  </>
                )}
              </dl>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Verwendet in:</span>
                {chapter.map((c) => (
                  <Link
                    key={c}
                    to={`/#kapitel-${c}`}
                    className="rounded-full border border-lake/40 px-2.5 py-0.5 font-mono text-[11px] text-lake transition-colors hover:bg-lake hover:text-paper"
                  >
                    {CHAPTER_LABELS[c] ?? `Kap. ${c}`}
                  </Link>
                ))}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

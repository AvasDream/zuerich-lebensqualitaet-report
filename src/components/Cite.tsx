import { useNavigate } from 'react-router-dom'
import { getSource } from '@/data/sources'

/**
 * Quellenmarker [^N^] — IBM Plex Mono, superscript, lake-Unterstrich.
 * Hover: Tooltip mit Quellenangabe. Klick: navigiert zu /quellen#q-N.
 */
export default function Cite({ n }: { n: number }) {
  const navigate = useNavigate()
  const src = getSource(n)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        navigate(`/quellen#q-${n}`)
      }}
      aria-label={`Quelle ${n}${src ? `: ${src.publisher}, ${src.title}` : ''}`}
      className="group relative mx-[1px] inline-block cursor-pointer align-super font-mono text-[0.7em] leading-none text-lake underline decoration-lake/60 underline-offset-2 transition-colors hover:text-signal hover:decoration-signal"
    >
      [^{n}^]
      {src && (
        <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-64 -translate-x-1/2 rounded-lg bg-night p-3 text-left font-serif text-xs not-italic leading-snug text-paper shadow-xl group-hover:block group-focus-visible:block">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-gold">Quelle {n}</span>
          <span className="mt-1 block font-semibold">{src.publisher}</span>
          <span className="mt-0.5 block text-paper/80">{src.title}</span>
          <span className="mt-1 block font-mono text-[10px] text-paper/50">{src.date}</span>
        </span>
      )}
    </button>
  )
}

import { Link } from 'react-router-dom'

const CHAPTERS = [
  { n: '01', title: 'Die Rankings', anchor: '#kapitel-1' },
  { n: '02', title: 'Die Treiber', anchor: '#kapitel-2' },
  { n: '03', title: 'Die Schattenseiten', anchor: '#kapitel-3' },
  { n: '04', title: 'Wessen Lebensqualität?', anchor: '#kapitel-4' },
  { n: '05', title: 'Der Vergleich', anchor: '#kapitel-5' },
  { n: '06', title: 'Die Zukunftsfrage', anchor: '#kapitel-6' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-paper">
      <div className="relative z-10 mx-auto max-w-content px-4 py-20 sm:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold">
              Wie lebenswert ist <span className="text-lake">Zürich</span>?
            </p>
            <p className="mt-3 text-sm text-paper/70">
              Rankings, Treiber und Schattenseiten — ein evidenzbasierter Report. Stand: Juli 2026.
            </p>
            <ul className="mt-4 space-y-1 font-mono text-xs text-paper/60">
              <li>· Wie gut ist Zürich?</li>
              <li>· Für wen ist es lebenswert?</li>
              <li>· Warum schneidet es so ab?</li>
            </ul>
          </div>
          <nav aria-label="Kapitel-Index">
            <p className="kicker text-lake">Kapitel</p>
            <ul className="mt-4 space-y-2">
              {CHAPTERS.map((c) => (
                <li key={c.n}>
                  <Link to={`/${c.anchor}`} className="group flex items-baseline gap-3 text-sm text-paper/75 transition-colors hover:text-paper">
                    <span className="font-mono text-xs text-lake">{c.n}</span>
                    <span className="border-b border-transparent group-hover:border-lake">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="kicker text-lake">Methodik</p>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">
              Evidenzbasierter Report auf Grundlage von <Link to="/quellen" className="text-lake underline underline-offset-2">87 Quellen</Link>,
              primär amtliche Statistiken von Stadt und Kanton Zürich sowie die Originalquellen der Ranking-Herausgeber.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/daten" className="rounded-md bg-lake px-4 py-2 font-mono text-xs text-white transition-transform hover:scale-[1.03]">
                Daten-Dashboard →
              </Link>
              <Link to="/quellen" className="rounded-md border border-paper/30 px-4 py-2 font-mono text-xs transition-colors hover:border-lake">
                Quellen →
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t hairline-dark pt-6 text-center font-mono text-[11px] text-paper/50">
          Erstellt als interaktiver Datenreport · Keine kommerzielle Publikation
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-10 select-none text-center font-display text-[22vw] font-extrabold leading-none tracking-tight text-white/[0.04]">
        ZÜRICH
      </div>
    </footer>
  )
}

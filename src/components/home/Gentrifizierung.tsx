import { ArrowLeftRight } from 'lucide-react'
import Cite from '@/components/Cite'
import { Reveal, CountUp } from '@/components/motion'

const CHIPS = [
  { text: 'Grundstückspreise Langstrasse ×4 seit 2009', cites: [74] },
  { text: 'Jugendliche −64 % an der Langstrasse', cites: [75] },
  { text: 'Ausländeranteil 50 → 39 %', cites: [75] },
  { text: 'Sozialhilfequote Kinder Stadt Zürich: 6,5 %', cites: [73] },
]

export default function Gentrifizierung() {
  return (
    <section className="bg-night pb-28 text-paper sm:pb-40">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <img src="/map-zuerich.svg" alt="Stilisierte Karte der Stadt Zürich mit 12 Kreisen, Kreis 4 hervorgehoben" className="w-full rounded-2xl border border-white/10 bg-night-raised p-4" />
          </Reveal>
          <div>
            <p className="kicker text-signal">Ungleichheit & Gentrifizierung</p>
            <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Armut ist hier Kinder- und Migrationsarmut</h3>
            <p className="mt-5 leading-[1.7] text-paper/75">
              Die Sozialhilfequote des Kantons liegt mit 2,5 Prozent tief — doch Kinder und Jugendliche weisen 4,3 Prozent
              auf, in der Stadt Zürich 6,5 Prozent; Personen mit ausländischer Staatsangehörigkeit liegen bei 4,9 gegenüber
              1,7 Prozent.<Cite n={73} /> Im Langstrassen-Quartier haben sich die Grundstückspreise seit 2009 fast
              vervierfacht; über 200 Wohnungen im gehobenen Segment entstehen, Häuser wurden leergekündigt.<Cite n={74} />
              Eine ETH-Studie belegt, dass Ersatzneubauten und Verdichtung vulnerable Haushalte systematisch verdrängen.<Cite n={76} />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {CHIPS.map((c) => (
                <span key={c.text} className="rounded-full border border-signal/40 bg-signal/10 px-4 py-1.5 font-mono text-xs text-paper/90">
                  {c.text}
                  {c.cites.map((n) => <Cite key={n} n={n} />)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wanderungssaldo */}
        <Reveal className="mx-auto mt-20 max-w-3xl rounded-xl border border-white/10 bg-night-raised p-7">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center font-mono">
            <div>
              <p className="text-2xl text-lake-soft"><CountUp end={39324} /></p>
              <p className="text-xs text-paper/60">Zuzüge 2024</p>
            </div>
            <ArrowLeftRight className="text-signal" size={22} />
            <div>
              <p className="text-2xl text-signal"><CountUp end={39024} /></p>
              <p className="text-xs text-paper/60">Wegzüge 2024</p>
            </div>
            <span className="font-display text-xl font-bold text-paper">→ Saldo ≈ <span className="text-gold">+300</span></span>
          </div>
          <p className="mt-4 text-center text-sm leading-relaxed text-paper/70">
            Die Stadt bleibt attraktiv, stösst aber fast ebenso viele Menschen wieder ab — der Abwanderungsdruck eines
            gesättigten, teuren Wohnungsmarkts.<Cite n={80} />
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-3xl">
          <blockquote className="text-center font-serif text-2xl italic leading-snug text-paper sm:text-3xl">
            <span className="text-signal not-italic">«</span>Die Folgen sind keine Randerscheinungen eines ansonsten
            intakten Modells, sondern dessen struktureller Preis.<span className="text-signal not-italic">»</span>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

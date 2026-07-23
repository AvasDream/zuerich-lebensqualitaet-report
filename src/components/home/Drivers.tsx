import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, TramFront, Briefcase, HeartPulse, Trees, ChevronDown } from 'lucide-react'
import StatCard from '@/components/StatCard'
import Cite from '@/components/Cite'
import { Reveal } from '@/components/motion'

interface StatDef {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  year: string
  note: string
  cites: number[]
}

const STATS: StatDef[] = [
  { value: 7502, prefix: 'CHF ', label: 'Medianlohn (Vollzeit, brutto, Grossregion Zürich)', year: '2024', note: 'Höchster Wert aller Schweizer Grossregionen (CH: CHF 7’024)', cites: [11] },
  { value: 2.6, decimals: 1, suffix: ' %', label: 'Arbeitslosenquote Kanton Zürich', year: '2025', note: 'Jahresdurchschnitt; langjähriger Schnitt ~3 %', cites: [12] },
  { value: 94.1, decimals: 1, suffix: ' %', label: 'SBB-Pünktlichkeit Personenverkehr', year: '2025', note: 'Rekordwert; strenges 3-Minuten-Mass', cites: [13] },
  { value: 687, suffix: ' Mio.', label: 'ZVV-Fahrgäste', year: '2025', note: 'Höchste Fahrgastzahl der Verbundgeschichte', cites: [14] },
  { value: 86, prefix: '~', label: 'Lebenserwartung Frauen (Männer ~82)', year: '2023', note: 'Auf oder über Schweizer Niveau', cites: [15] },
  { value: 85, suffix: ' %', label: 'fühlen sich nachts im Quartier sicher', year: '2023', note: 'Seit 1999 gestiegen, seither stabil hoch', cites: [16] },
  { value: 44434, label: 'registrierte Straftaten (−8 %)', year: '2025', note: 'Rückgang nach drei Anstiegsjahren', cites: [17] },
]

interface Driver {
  icon: typeof Shield
  title: string
  chips: string[]
  body: ReactNode
}

const DRIVERS: Driver[] = [
  {
    icon: Shield,
    title: 'Sicherheit & Stabilität',
    chips: ['44’434 Straftaten (−8 %)', '85 % Sicherheitsgefühl', 'WGI 88,6-Perzentil'],
    body: (
      <>
        <p>
          Zürich gehört objektiv wie subjektiv zu den sichersten Grossstädten der Welt. 2025 registrierte die Stadtpolizei
          44’434 Straftaten, 8 % weniger als im Vorjahr; der Rückgang geht vor allem auf Vermögensdelikte (−3’051) und
          Einbruchdiebstähle (−19,5 % auf 2’266) zurück.<Cite n={17} /> Damit endete eine dreijährige Anstiegsphase, die
          wesentlich auf das parallele Bevölkerungswachstum zurückging.<Cite n={19} />
        </p>
        <p className="mt-4">
          Das subjektive Sicherheitsgefühl zeigt jedoch ein deutliches Geschlechtergefälle: Während knapp 40 % der Männer
          nachts gewisse Orte meiden, sind es bei den Frauen 70 %; 41 % der 18- bis 29-jährigen Frauen berichten von
          Belästigungen innerhalb der letzten zwölf Monate.<Cite n={16} /> Dahinter steht ein nationaler Stabilitätsanker:
          Die Schweiz erreicht im Weltbank-Indikator «Politische Stabilität» das 88,6-Perzentil.<Cite n={20} />
        </p>
      </>
    ),
  },
  {
    icon: TramFront,
    title: 'ÖV & Infrastruktur',
    chips: ['687 Mio. Fahrgäste', '94,1 % Pünktlichkeit', 'Rang 9 Urban Mobility'],
    body: (
      <>
        <p>
          Der ZVV verzeichnete 2025 mit 687 Millionen Fahrgästen die höchste Fahrgastzahl seiner Geschichte (+2,6 %), bei
          einem Kostendeckungsgrad von 65,2 %; die Fahrgastzufriedenheit liegt bei 78 von 100 Punkten.<Cite n={14} /> Die
          SBB erreichte eine Rekordpünktlichkeit von 94,1 % — gemessen ab drei Minuten Verspätung, während die Deutsche
          Bahn erst ab sechs Minuten zählt.<Cite n={13} /><Cite n={23} />
        </p>
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Pünktlichkeits-Vergleich (strengeres Mass = härterer Massstab)</p>
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between font-mono text-xs"><span>SBB · 3-Minuten-Mass</span><span>94,1 %</span></div>
              <div className="mt-1 h-3 rounded bg-line"><div className="h-3 rounded bg-lake" style={{ width: '94.1%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-xs"><span>Deutsche Bahn · 6-Minuten-Mass</span><span>großzügigeres Mass</span></div>
              <div className="mt-1 h-3 rounded bg-line"><div className="h-3 rounded bg-ink-soft/40" style={{ width: '70%' }} /></div>
            </div>
          </div>
        </div>
        <p className="mt-4">
          Zwei Drittel der Erwerbstätigen mit Arbeitsweg innerhalb der Stadt nutzen den ÖV; der MIV-Anteil liegt bei nur
          11–13 % — der höchste ÖV-Anteil unter den verglichenen Schweizer Städten.<Cite n={25} /> Im Urban Mobility
          Readiness Index liegt Zürich auf Rang 9 gesamt.<Cite n={27} />
        </p>
      </>
    ),
  },
  {
    icon: Briefcase,
    title: 'Wirtschaft, Löhne & Arbeitsmarkt',
    chips: ['CHF 7’502 Medianlohn', '2,6 % Arbeitslosigkeit', 'AAA-Rating'],
    body: (
      <>
        <p>
          Der Medianlohn einer Vollzeitstelle liegt in der Grossregion Zürich bei CHF 7’502 brutto pro Monat — rund
          CHF 480 über dem Landesmedian. Branchenspitzen: Banken (CHF 10’723), Pharma (CHF 10’159), F&amp;E (CHF 9’139).<Cite n={11} />
          Die Arbeitslosenquote lag 2025 bei 2,6 %.<Cite n={12} />
        </p>
        <p className="mt-4">
          Der regionale Finanzsektor erwirtschaftete 2023 eine Bruttowertschöpfung von CHF 32,8 Milliarden; in der Stadt
          stammt mehr als jeder vierte Wertschöpfungsfranken aus der Finanzbranche.<Cite n={29} /> Google unterhält in
          Zürich sein grösstes Entwicklungszentrum ausserhalb der USA.<Cite n={30} /> Das BIP der Stadt beträgt rund
          CHF 89 Milliarden.<Cite n={31} /> Die Kaufkraft relativiert die Preise: In der letzten UBS-Studie «Prices and
          Earnings» (2018) rangierte Zürich weltweit auf Platz 2 bei Einkommen und Kaufkraft.<Cite n={33} />
        </p>
      </>
    ),
  },
  {
    icon: HeartPulse,
    title: 'Gesundheit & Bildung',
    chips: ['USZ Rang 9 weltweit', 'ETH Rang 7/8 (QS)', '320’000 Lernende'],
    body: (
      <>
        <p>
          Die Lebenserwartung beträgt im Kanton Zürich rund 86 Jahre (Frauen) bzw. 82 Jahre (Männer).<Cite n={15} /> Das
          Universitätsspital Zürich liegt im Newsweek-Ranking «World’s Best Hospitals 2026» auf Rang 9 weltweit.<Cite n={35} />
        </p>
        <p className="mt-4">
          Die ETH Zürich steht seit über elf Jahren ununterbrochen in den weltweiten Top 10 der QS-Rankings (2024–2026
          Rang 7, 2027 Rang 8).<Cite n={37} /> Über 320’000 Personen besuchen im Kanton eine Bildungseinrichtung; viermal
          mehr Jugendliche wählen eine Lehre als das Gymnasium — das duale System erklärt die tiefe
          Jugendarbeitslosigkeit mit.<Cite n={38} />
        </p>
      </>
    ),
  },
  {
    icon: Trees,
    title: 'Umwelt, See & Grünraum',
    chips: ['67 Badestellen Topqualität', '~25 % Wald', 'Netto-Null bis 2040'],
    body: (
      <>
        <p>
          Sämtliche rund 67 geprüften Badestellen des Kantons erreichen seit Jahren die höchste Qualitätsstufe; rund 40 %
          des Kantons werden mit Trinkwasser aus dem Zürichsee versorgt.<Cite n={40} /><Cite n={41} /> 18 Sommerbäder,
          sieben Hallenbäder und ein Thermalbad ergeben eine aussergewöhnliche Bäderdichte.<Cite n={42} /> Rund ein
          Viertel der Stadtfläche ist bewaldet (~2’200 ha, ~57 m² pro Einwohner).<Cite n={43} /><Cite n={44} />
        </p>
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">PM2.5-Jahresmittel vs. WHO-Richtwert (µg/m³)<Cite n={39} /></p>
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between font-mono text-xs"><span>Zürich-Kaserne 2024</span><span>11,2</span></div>
              <div className="mt-1 h-3 rounded bg-line"><div className="h-3 rounded bg-signal" style={{ width: `${(11.2 / 12) * 100}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-xs"><span>WHO-Richtwert</span><span>5</span></div>
              <div className="mt-1 h-3 rounded bg-line"><div className="h-3 rounded bg-lake" style={{ width: `${(5 / 12) * 100}%` }} /></div>
            </div>
          </div>
        </div>
        <p className="mt-4">
          Urbane Hitzeinseln erzeugen in Zürich bis zu 10 °C höhere Temperaturen als im Umland — der Erhalt von Wald und
          Grünflächen wird klimapolitisch aufgewertet.<Cite n={47} />
        </p>
      </>
    ),
  },
]

export default function Drivers() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-paper pb-24 sm:pb-36">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        {/* Kennzahlen-Band */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} decimals={s.decimals ?? 0} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} label={s.label} year={s.year} note={s.note} cites={s.cites} />
          ))}
          {/* AAA-Karte mit statischem Wert */}
          <div className="group cursor-pointer rounded-xl border border-line bg-paper-warm p-5 shadow-sm transition-all duration-250 hover:-translate-y-1 hover:border-lake hover:shadow-lg">
            <div className="flex items-start justify-between">
              <p className="font-mono text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-none text-gold transition-transform group-hover:scale-[1.02]">AAA</p>
              <span className="rounded-full bg-lake-soft px-2 py-0.5 font-mono text-[10px] text-lake">2025</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-ink-soft">Bonitätsrating — Ausblick stabil<Cite n={18} /></p>
            <p className="mt-1.5 text-xs text-ink-soft/70">Bestätigung durch S&amp;P Global Ratings</p>
          </div>
        </div>

        {/* Überleitungs-Quote */}
        <Reveal className="mx-auto mt-24 max-w-prose2">
          <blockquote className="border-l-4 border-lake pl-6 font-serif text-2xl italic leading-snug text-ink">
            Die meisten dieser Treiber sind öffentlich finanzierte <span className="text-lake not-italic font-semibold">Kollektivgüter</span> —
            gespeist aus dem hohen Steueraufkommen eines wirtschaftlich starken Standorts.
          </blockquote>
        </Reveal>

        {/* Akkordeons */}
        <div className="mx-auto mt-16 max-w-4xl space-y-3">
          {DRIVERS.map((d, i) => {
            const Icon = d.icon
            const isOpen = open === i
            return (
              <Reveal key={d.title} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-xl border bg-paper-warm transition-colors ${isOpen ? 'border-l-4 border-l-lake border-line' : 'border-line'}`}>
                  <button
                    className="flex w-full items-center gap-4 p-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className={`rounded-lg p-2.5 ${isOpen ? 'bg-lake text-white' : 'bg-lake-soft text-lake'}`}>
                      <Icon size={20} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-semibold">{d.title}</span>
                      <span className="mt-1 hidden flex-wrap gap-2 sm:flex">
                        {d.chips.map((c) => (
                          <span key={c} className="rounded-full bg-white/60 px-2.5 py-0.5 font-mono text-[10px] text-ink-soft">{c}</span>
                        ))}
                      </span>
                    </span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 pl-[4.5rem] text-[1.05rem] leading-[1.7] text-ink-soft">{d.body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

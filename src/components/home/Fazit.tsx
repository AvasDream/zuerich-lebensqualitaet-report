import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, BookOpen, Database } from 'lucide-react'
import { Reveal, reducedMotion } from '@/components/motion'

gsap.registerPlugin(ScrollTrigger)

const STATEMENT = ['Ob', 'Zürich', 'an', 'der', 'Spitze', 'bleibt,', 'entscheidet', 'nicht', 'Mercer.', 'Sondern', 'der', 'Wohnungsmarkt.']

const STELLSCHRAUBEN = [
  {
    title: 'Wohnungspolitik',
    text: 'Der beste ÖV nützt dem Verdrängten nur noch als Pendelverkehr. Wien belegt, dass ein hoher gemeinnütziger Anteil das Preisproblem strukturell dämpft — Zürich nutzt denselben Hebel in zu kleinem Umfang.',
  },
  {
    title: 'Soziale Zugänglichkeit',
    text: 'InterNations-Befunde und steigende Einsamkeit junger Erwachsener deuten auf ein Sozialkapital-Defizit hin, das sich mit Infrastruktur allein nicht beheben lässt: Vereinsleben, Quartierstrukturen, Integrationsangebote.',
  },
  {
    title: 'Fiskalische Grundlage',
    text: 'Das Kollektivgut-Modell setzt das hohe Steueraufkommen voraus (AAA-Rating). Das Budgetdefizit 2026 und die angekündigte Investitionsbremse ab 2027 zeigen: Auch diese Grundlage ist nicht unbegrenzt.',
  },
]

export default function Fazit() {
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stmt-word',
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 1,
          ease: 'none',
          scrollTrigger: { trigger: pinRef.current, start: 'top top', end: '+=120%', scrub: true, pin: true },
        },
      )
    }, pinRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-prose2 px-4 pb-8 sm:px-6">
        <Reveal>
          <p className="text-lg leading-[1.7] text-ink-soft">
            Zürichs Lebensqualität ist Weltspitze und zugleich gefährdet — nicht durch externe Konkurrenz, sondern durch
            den eigenen Erfolg. Die Attraktivität erzeugt Zuzug, der Zuzug trifft auf ein nicht wachsendes
            Wohnungsangebot, und die Knappheit verteilt die Stadt neu: Etablierte und Hochqualifizierte bleiben,
            Mittelverdiener ziehen an den Stadtrand, Geringverdienende werden verdrängt.
          </p>
        </Reveal>
      </div>

      {/* Statement-Pin */}
      <div ref={pinRef} className="flex min-h-[100dvh] items-center justify-center bg-paper">
        <p className="max-w-5xl px-6 text-center font-display font-bold leading-[1.15]" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)' }}>
          {STATEMENT.map((w, i) => (
            <span key={i} className={`stmt-word ${i >= 10 ? 'text-signal' : ''}`}>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>

      {/* Stellschrauben */}
      <div className="mx-auto max-w-content px-4 pb-20 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {STELLSCHRAUBEN.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="h-full rounded-xl border border-line bg-paper-warm p-7 transition-all duration-300 hover:-translate-y-1 hover:border-lake hover:shadow-lg">
                <p className="font-mono text-xs text-lake">Stellschraube {String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-prose2">
          <p className="text-lg leading-[1.7] text-ink-soft">
            Die ehrlichste Antwort auf die Leitfrage bleibt eine differenzierte: Für jene, die es sich leisten können,
            ist Zürich so lebenswert wie kaum ein zweiter Ort der Welt — belegt durch Rankings, Rekordindikatoren und
            84 % Zustimmung der eigenen Bevölkerung. Weil die Stadt über Jahrzehnte in Kollektivgüter investierte, die
            niemand kaufen muss — und das eine Gut, das alle brauchen, dem Markt überliess.
          </p>
        </Reveal>

        {/* CTA-Band */}
        <Reveal className="mt-16 flex flex-wrap justify-center gap-4">
          <Link
            to="/daten"
            className="group flex items-center gap-2 rounded-lg bg-lake px-7 py-3.5 font-mono text-sm text-white shadow-lg transition-transform duration-200 hover:scale-[1.03]"
          >
            <Database size={16} />
            Alle Daten im Dashboard
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/quellen"
            className="group flex items-center gap-2 rounded-lg border-2 border-ink px-7 py-3.5 font-mono text-sm transition-all duration-200 hover:scale-[1.03] hover:border-lake hover:text-lake"
          >
            <BookOpen size={16} />
            87 Quellen ansehen
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

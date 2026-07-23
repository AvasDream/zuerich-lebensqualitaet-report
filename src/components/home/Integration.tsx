import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cite from '@/components/Cite'
import { Reveal, CountUp, reducedMotion } from '@/components/motion'

gsap.registerPlugin(ScrollTrigger)

function Donut({ pct, label, color = '#E63329', sub }: { pct: number; label: string; sub?: string; color?: string }) {
  const ref = useRef<SVGCircleElement>(null)
  const R = 54
  const C = 2 * Math.PI * R
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion()) {
      el.style.strokeDashoffset = String(C * (1 - pct / 100))
      return
    }
    const tween = gsap.fromTo(
      el,
      { strokeDasharray: C, strokeDashoffset: C },
      {
        strokeDashoffset: C * (1 - pct / 100),
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [pct, C])
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" />
        <circle ref={ref} cx="70" cy="70" r={R} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" transform="rotate(-90 70 70)" strokeDasharray={C} strokeDashoffset={C} />
        <text x="70" y="78" textAnchor="middle" className="fill-paper font-mono" fontSize="24" fontWeight="500">
          {pct.toString().replace('.', ',')}%
        </text>
      </svg>
      <p className="max-w-[180px] text-sm font-semibold leading-snug text-paper/85">{label}</p>
      {sub && <p className="max-w-[180px] text-xs text-paper/60">{sub}</p>}
    </div>
  )
}

export default function Integration() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rank-bar',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: barRef.current, start: 'top 85%', end: 'bottom 50%', scrub: true } },
      )
    }, barRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-night pb-24 text-paper sm:pb-36">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        {/* InterNations-Modul */}
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker text-signal">Soziale Integration</p>
            <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">«Ease of Settling In» — Rang 49 von 53</h3>
            <p className="mt-5 leading-[1.7] text-paper/75">
              Im Expat City Ranking 2024 von InterNations (12'543 Befragte in 53 Städten) fiel Zürich von Rang 16 auf
              Rang 31.<Cite n={61} /> Beim Knüpfen lokaler Freundschaften belegt die Stadt den{' '}
              <span className="text-signal">letzten Platz weltweit</span>.<Cite n={62} /> Der Kontrast: Bei der
              Lebensqualität liegt Zürich auf <span className="text-lake-soft">Rang 9</span>, bei der Sicherheit auf{' '}
              <span className="text-lake-soft">Rang 2</span> — die Stadt funktioniert exzellent, aber sie lässt
              Zuziehende sozial nicht hinein.<Cite n={64} />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-signal/15 px-4 py-1.5 font-mono text-xs text-signal">Letzter Platz: lokale Freunde<Cite n={62} /></span>
              <span className="rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs text-paper/85">65 % nur mit Expats befreundet (Ø 37 %)<Cite n={62} /></span>
              <span className="rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs text-paper/85">33 % gewöhnen sich leicht ein<Cite n={63} /></span>
            </div>
          </div>
          <div ref={barRef} className="space-y-1">
            {Array.from({ length: 53 }, (_, i) => {
              const rank = i + 1
              const isZh = rank === 49
              return (
                <div key={rank} className="flex items-center gap-2">
                  <span className={`w-8 text-right font-mono text-[10px] ${isZh ? 'font-semibold text-signal' : 'text-paper/40'}`}>{rank}</span>
                  <div
                    className={`rank-bar h-2 origin-left rounded-r ${isZh ? 'bg-signal' : 'bg-white/15'}`}
                    style={{ width: `${((54 - rank) / 53) * 88 + 6}%` }}
                  />
                  {isZh && <span className="font-mono text-[10px] font-semibold text-signal">ZÜRICH</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Einsamkeit */}
        <div className="mt-24">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold sm:text-3xl">Einsamkeit — nicht nur ein Expat-Phänomen</h3>
            <p className="mx-auto mt-4 max-w-prose2 text-center leading-[1.7] text-paper/70">
              Schweizerische Gesundheitsbefragung 2022: steigende Tendenz seit 2007, am stärksten bei jungen Erwachsenen
              und Personen mit ausländischer Staatsangehörigkeit.<Cite n={66} /><Cite n={67} />
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            <Donut pct={42} label="fühlen sich einsam" sub="Schweiz ab 15 Jahren" />
            <Donut pct={59.1} label="der 15–24-Jährigen" sub="25–39 Jahre: 47,6 %" />
            <Donut pct={35.9} label="Ausländer:innen" sub="Schweizer:innen: 25,7 %" />
          </div>
        </div>

        {/* Notschlafstelle & Drogenszene */}
        <div className="mt-24 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-white/10 bg-night-raised p-7">
              <p className="kicker text-signal">Notschlafstelle, Winter 2024/25</p>
              <div className="mt-5 flex gap-8">
                <div>
                  <p className="font-mono text-4xl text-paper"><CountUp end={367} /></p>
                  <p className="mt-1 text-xs text-paper/60">Personen</p>
                </div>
                <div>
                  <p className="font-mono text-4xl text-paper"><CountUp end={7256} /></p>
                  <p className="mt-1 text-xs text-paper/60">Übernachtungen (+1'537)</p>
                </div>
                <div>
                  <p className="font-mono text-4xl text-paper"><CountUp end={49} /></p>
                  <p className="mt-1 text-xs text-paper/60">Ø Belegung pro Nacht</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-paper/70">
                Hinzu kamen 60 Familien in der Notunterkunft; rund 90 im Freien schlafende Personen wurden aufgesucht.
                41 % der Nutzenden waren Auswärtige — Zürcher Sozialinfrastruktur fängt auch überregionale Armut auf.<Cite n={68} />
                Die Schweiz erfasst Obdachlosigkeit nicht systematisch; eine FHNW-Hochrechnung kommt auf rund 3'810
                Obdachlose schweizweit.<Cite n={69} />
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-xl border border-white/10 bg-night-raised p-7">
              <p className="kicker text-signal">Drogenszene — vom Platzspitz zur Bäckeranlage</p>
              <div className="mt-6 space-y-0">
                {[
                  ['1992', 'Räumung des Platzspitz — zuvor grösste offene Drogenszene Europas; 1991 starben dort 21 Menschen.', [70]],
                  ['2008', 'Vier-Säulen-Politik (Prävention, Therapie, Schadensminderung, Repression) von 68 % der Stimmenden bestätigt.', [70]],
                  ['2023', 'Neue offene Szene an der Bäckeranlage (Kreis 4), dominiert von Crack-Konsum.', [71]],
                  ['2025', 'Stadt führt das Gebiet als «Brennpunkt»; rund 60 Polizeieinsätze im ersten Halbjahr, Szene weicht in Seitengassen aus.', [71, 72]],
                ].map(([year, text, cites], i, arr) => (
                  <div key={year as string} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < arr.length - 1 && <span className="absolute left-[7px] top-5 h-full w-px bg-white/15" />}
                    <span className="relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-signal" />
                    <div>
                      <span className="font-mono text-sm font-semibold text-paper">{year}</span>
                      <p className="mt-1 text-sm leading-relaxed text-paper/70">
                        {text}
                        {(cites as number[]).map((n) => <Cite key={n} n={n} />)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

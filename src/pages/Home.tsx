import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '@/components/home/Hero'
import ExecutiveSummary from '@/components/home/ExecutiveSummary'
import ChapterDivider from '@/components/home/ChapterDivider'
import RankingExplorer from '@/components/home/RankingExplorer'
import Drivers from '@/components/home/Drivers'
import ThemeTransition from '@/components/home/ThemeTransition'
import Wohnungsnot from '@/components/home/Wohnungsnot'
import Integration from '@/components/home/Integration'
import Gentrifizierung from '@/components/home/Gentrifizierung'
import Perspektiven from '@/components/home/Perspektiven'
import StaedteDuell from '@/components/home/StaedteDuell'
import Fazit from '@/components/home/Fazit'
import { ChapterRail, ScrollProgress } from '@/components/home/ChapterRail'

export default function Home() {
  const { hash } = useLocation()

  // Deep-Links (z. B. /#kapitel-3 aus dem Footer) anspringen.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
    }
  }, [hash])

  return (
    <>
      <ScrollProgress />
      <ChapterRail />
      <Hero />
      <ExecutiveSummary />
      <ChapterDivider
        id="kapitel-1"
        number="01"
        title="Zürich in den Rankings"
        teaser="Auszeichnungen im Überblick: Rang 1 bei Mercer und IMD, Rang 2 beim EIU — und die Kehrseite der Kostenindizes."
      />
      <RankingExplorer />
      <ChapterDivider
        id="kapitel-2"
        number="02"
        title="Warum Zürich punktet"
        teaser="Die Treiber: Sicherheit, ÖV, Wirtschaft, Gesundheit und Umwelt — ein Bündel von Kollektivgütern auf Rekordniveau."
      />
      <Drivers />
      <ThemeTransition toDark sentence={['Die', 'Kehrseite.']} accentWord="Kehrseite." />
      <div className="theme-dark">
        <ChapterDivider
          id="kapitel-3"
          number="03"
          title="Die Schattenseiten"
          teaser="Wohnungsnot, Lebenskosten, soziale Integration und Ungleichheit — dort, wo Lebensqualität über den Markt verteilt wird."
          dark
        />
        <Wohnungsnot />
        <Integration />
        <Gentrifizierung />
      </div>
      <ThemeTransition toDark={false} sentence={['Wer', 'misst,', 'entscheidet,', 'wer', 'gewinnt.']} accentWord="gewinnt." />
      <ChapterDivider
        id="kapitel-4"
        number="04"
        title="Wessen Lebensqualität?"
        teaser="Perspektiven und Ranking-Kritik: Rankings messen nicht «die» Lebensqualität einer Stadt, sondern jeweils die einer bestimmten Population."
      />
      <Perspektiven />
      <ChapterDivider
        id="kapitel-5"
        number="05"
        title="Der Vergleich"
        teaser="Wien, Kopenhagen, Genf: Alle drei schlagen Zürich in je einem eigenen Feld — und alle verlieren in Zürichs Kernfeldern."
      />
      <StaedteDuell />
      <ChapterDivider
        id="kapitel-6"
        number="06"
        title="Fazit & Ausblick"
        teaser="Die Zukunftsfrage: Ob Zürich an der Spitze bleibt, entscheidet nicht Mercer — sondern der Wohnungsmarkt."
      />
      <Fazit />
    </>
  )
}

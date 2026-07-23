export type Category = 'rankings' | 'treiber' | 'wohnen' | 'soziales' | 'bevoelkerung'

export interface Indicator {
  id: string
  cat: Category
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  year: string
  note: string
  cites: number[]
  variant?: 'light' | 'alert'
}

export const CATEGORIES: { id: Category | 'alle'; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  { id: 'rankings', label: 'Rankings' },
  { id: 'treiber', label: 'Treiber' },
  { id: 'wohnen', label: 'Wohnen & Kosten' },
  { id: 'soziales', label: 'Soziales' },
  { id: 'bevoelkerung', label: 'Bevölkerung' },
]

export const CAT_LABEL: Record<Category, string> = {
  rankings: 'Rankings',
  treiber: 'Treiber',
  wohnen: 'Wohnen & Kosten',
  soziales: 'Soziales',
  bevoelkerung: 'Bevölkerung',
}

export const CAT_TAG_CLASS: Record<Category, string> = {
  rankings: 'bg-gold/15 text-gold border-gold/40',
  treiber: 'bg-lake-soft text-lake border-lake/30',
  wohnen: 'bg-signal/10 text-signal border-signal/30',
  soziales: 'bg-ink-soft/10 text-ink-soft border-ink-soft/30',
  bevoelkerung: 'bg-transparent text-ink-soft border-ink-soft/50',
}

// Alle Kennzahlen aus dem Report «Wie lebenswert ist Zürich?», Stand Juli 2026.
export const INDICATORS: Indicator[] = [
  // — Rankings
  { id: 'mercer-qol', cat: 'rankings', value: 1, prefix: 'Rang ', label: 'Mercer Quality of Living', year: '2024', note: 'Erstmals Rang 1 weltweit – 241 Städte, 39 Kriterien.', cites: [1] },
  { id: 'eiu', cat: 'rankings', value: 2, prefix: 'Rang ', label: 'EIU Global Liveability Index', year: '2025', note: '97,1 Punkte, geteilt mit Wien; 100 Punkte in Gesundheit und Bildung.', cites: [2, 3] },
  { id: 'imd', cat: 'rankings', value: 1, prefix: 'Rang ', label: 'IMD Smart City Index', year: '2026', note: 'Ununterbrochen seit 2019; Höchstrating AAA in beiden Säulen.', cites: [4] },
  { id: 'monocle', cat: 'rankings', value: 6, prefix: 'Rang ', label: 'Monocle Quality of Life Survey', year: '2025', note: 'Abstieg von Rang 3 (2024); Prädikat «Best for mobility».', cites: [5] },
  { id: 'numbeo', cat: 'rankings', value: 24, prefix: 'Rang ', label: 'Numbeo Quality of Life Index', year: '2026', note: 'Kosten stark gewichtet: hinter Den Haag, Basel (15) und Bern (19).', cites: [8] },
  { id: 'db', cat: 'rankings', value: 8, prefix: 'Rang ', label: 'Deutsche Bank «Mapping the World’s Prices»', year: '2025', note: 'Erstmals seit 2012 aus den Top 5 gefallen.', cites: [9] },
  { id: 'mercer-col', cat: 'rankings', value: 3, prefix: 'Rang ', label: 'Mercer Cost of Living (Teuerung)', year: '2024', note: 'Drittteuerste Stadt der Welt hinter Hongkong und Singapur.', cites: [6, 32], variant: 'alert' },

  // — Treiber
  { id: 'lohn', cat: 'treiber', value: 7502, prefix: 'CHF ', label: 'Medianlohn Vollzeit (Grossregion Zürich)', year: '2024', note: 'Höchster Wert aller Schweizer Grossregionen (Schweiz: CHF 7’024).', cites: [11] },
  { id: 'arbeitslos', cat: 'treiber', value: 2.6, decimals: 1, suffix: ' %', label: 'Arbeitslosenquote Kanton Zürich', year: '2025', note: 'Jahresdurchschnitt; langjähriger Schnitt ~3 %.', cites: [12] },
  { id: 'sbb', cat: 'treiber', value: 94.1, decimals: 1, suffix: ' %', label: 'SBB-Pünktlichkeit Personenverkehr', year: '2025', note: 'Rekordwert – gemessen nach strengem 3-Minuten-Mass.', cites: [13] },
  { id: 'zvv', cat: 'treiber', value: 687, suffix: ' Mio.', label: 'ZVV-Fahrgäste', year: '2025', note: 'Höchste Fahrgastzahl der Verbundgeschichte (+2,6 %).', cites: [14] },
  { id: 'lebenserwartung', cat: 'treiber', value: 86, prefix: '~', suffix: ' / ~82', label: 'Lebenserwartung Frauen / Männer (Jahre)', year: '2023', note: 'Strukturell träge Grösse mit älterem Datenstand.', cites: [15] },
  { id: 'sicherheit', cat: 'treiber', value: 85, suffix: ' %', label: 'Sicherheitsgefühl nachts im Quartier', year: '2023', note: 'Bevölkerungsbefragung der Stadt Zürich.', cites: [16] },
  { id: 'straftaten', cat: 'treiber', value: 44434, label: 'Registrierte Straftaten Stadt Zürich', year: '2025', note: '−8 % gegenüber Vorjahr nach drei Anstiegsjahren.', cites: [17] },
  { id: 'bonitaet', cat: 'treiber', value: 3, suffix: '×A', label: 'Kredit-Rating der Stadt Zürich', year: '2025', note: 'Bestnote AAA bestätigt – «aussergewöhnlich starker Wirtschaftsplatz».', cites: [18] },

  // — Wohnen & Kosten
  { id: 'leerstand', cat: 'wohnen', value: 0.1, decimals: 1, suffix: ' %', label: 'Leerwohnungsziffer Stadt Zürich', year: '2025', note: 'Auf sehr tiefem Niveau – praktisch kein freier Wohnraum.', cites: [49], variant: 'alert' },
  { id: 'leerstand-kt', cat: 'wohnen', value: 0.48, decimals: 2, suffix: ' %', label: 'Leerwohnungsziffer Kanton Zürich', year: '2025', note: 'Ebenfalls deutlich unter dem Marktgleichgewicht.', cites: [50], variant: 'alert' },
  { id: 'bestandsmiete', cat: 'wohnen', value: 1578, prefix: 'CHF ', label: 'Bestandsmiete 3-Zimmer-Wohnung (Median)', year: '2024', note: 'Mietpreiserhebung der Stadt Zürich.', cites: [52] },
  { id: 'gemeinnuetzig', cat: 'wohnen', value: 1022, prefix: 'CHF ', suffix: ' vs. 1’875', label: 'Gemeinnützige vs. private Miete (3 Zi.)', year: '2024', note: 'Gemeinnützige Wohnungen sind rund CHF 850 günstiger.', cites: [51] },
  { id: 'angebotsmiete', cat: 'wohnen', value: 497, prefix: 'CHF ', suffix: ' /m²/Jahr', label: 'Angebotsmiete bei Wohnungswechsel', year: '2025', note: 'Inseratsdaten – die reale Einstiegsbarriere.', cites: [53] },
  { id: 'kaufpreis', cat: 'wohnen', value: 16000, prefix: 'CHF ', suffix: '–19’000', label: 'Kaufpreis Eigentumswohnung pro m²', year: '2025', note: 'Eigentum bleibt für die meisten unerreichbar.', cites: [55] },
  { id: 'praemie', cat: 'wohnen', value: 393.3, decimals: 1, prefix: 'CHF ', label: 'Krankenkassenprämie (Monat, Ø Schweiz)', year: '2026', note: '+5,2 % im Kanton Zürich; über +25 % in vier Jahren.', cites: [56], variant: 'alert' },

  // — Soziales
  { id: 'einleben', cat: 'soziales', value: 49, prefix: 'Rang ', suffix: '/53', label: '«Einleben» im Expat City Ranking (InterNations)', year: '2024', note: 'Zürich gehört für Zuzüger zu den schwierigsten Städten.', cites: [61, 62], variant: 'alert' },
  { id: 'expat-freunde', cat: 'soziales', value: 65, suffix: ' %', label: 'Expats mit überwiegend Expat-Freunden', year: '2024', note: 'Kontakt zur einheimischen Bevölkerung bleibt dünn.', cites: [62, 65] },
  { id: 'einsamkeit', cat: 'soziales', value: 42, suffix: ' %', label: 'Einsamkeit in der Bevölkerung', year: '2022', note: 'Fühlen sich zumindest manchmal einsam.', cites: [66] },
  { id: 'einsamkeit-jung', cat: 'soziales', value: 59.1, decimals: 1, suffix: ' %', label: 'Einsamkeit bei 15- bis 24-Jährigen', year: '2022', note: 'Die Jungen sind am stärksten betroffen.', cites: [66, 67], variant: 'alert' },
  { id: 'notschlafstelle', cat: 'soziales', value: 367, label: 'Personen in der Notschlafstelle', year: '2024/25', note: 'Bilanz der Stadt Zürich zum Winter 2024/25.', cites: [68], variant: 'alert' },
  { id: 'sozialhilfe', cat: 'soziales', value: 6.5, decimals: 1, suffix: ' %', label: 'Sozialhilfequote bei Kindern (Stadt Zürich)', year: '2024', note: 'Armut ist auch in der reichen Stadt Realität.', cites: [73] },

  // — Bevölkerung
  { id: 'zufriedenheit', cat: 'bevoelkerung', value: 84, suffix: ' %', label: 'Zufriedenheit Note 5 oder 6', year: '2025', note: 'Die grosse Mehrheit lebt gerne in Zürich.', cites: [48, 85] },
  { id: 'sorge-wohnen', cat: 'bevoelkerung', value: 56, suffix: ' %', label: 'Sorgen sich wegen Wohnraum', year: '2025', note: 'Wohnen erstmals grösste Sorge der Stadtbevölkerung.', cites: [85] },
  { id: 'stadt-zu-wenig', cat: 'bevoelkerung', value: 83, suffix: ' %', label: '«Die Stadt tut zu wenig gegen Verdrängung»', year: '2025', note: 'Deutlicher Handlungsauftrag aus der Bevölkerung.', cites: [79, 85], variant: 'alert' },
  { id: 'oev-noten', cat: 'bevoelkerung', value: 87, suffix: ' %', label: 'Top-Noten für den öffentlichen Verkehr', year: '2025', note: 'Der ÖV bleibt der beliebteste Treiber der Lebensqualität.', cites: [48] },
  { id: 'imd-prioritaet', cat: 'bevoelkerung', value: 76.6, decimals: 1, suffix: ' %', label: 'Priorität «bezahlbares Wohnen» (IMD)', year: '2025', note: 'Wichtigstes Anliegen vor Verkehrsstau (58,1 %).', cites: [4] },
  { id: 'wanderung', cat: 'bevoelkerung', value: 300, prefix: '≈ +', label: 'Wanderungssaldo Stadt Zürich (Personen)', year: '2024', note: 'Fast ausgeglichen – die Stadt wächst kaum noch durch Zuzug.', cites: [80] },
]

// Sortierbare Ranking-Tabelle (Kap. 2.1/2.2 des Reports).
export interface RankingRow {
  name: string
  herausgeber: string
  rang: number
  rangText: string
  trend: 'up' | 'down' | 'flat'
  trendText: string
  kommentar: string
  quelle: number
}

export const RANKINGS: RankingRow[] = [
  { name: 'Quality of Living 2024', herausgeber: 'Mercer', rang: 1, rangText: '1', trend: 'up', trendText: 'erstmals Rang 1', kommentar: '241 Städte, 39 Kriterien – Referenz für internationale Entsandte.', quelle: 1 },
  { name: 'Global Liveability Index 2025', herausgeber: 'EIU', rang: 2, rangText: '2 (geteilt)', trend: 'up', trendText: 'aufsteigend (6 → 3 → 2)', kommentar: '97,1 Punkte; 100 in Gesundheit und Bildung.', quelle: 2 },
  { name: 'Smart City Index 2026', herausgeber: 'IMD', rang: 1, rangText: '1', trend: 'flat', trendText: 'seit 2019 ununterbrochen', kommentar: '148 Städte; Rating AAA in beiden Säulen.', quelle: 4 },
  { name: 'Quality of Life Survey 2025', herausgeber: 'Monocle', rang: 6, rangText: '6', trend: 'down', trendText: 'absteigend (4 → 3 → 6)', kommentar: 'Prädikat «Best for mobility»; Kritik an Graffiti und Sonntagsregeln.', quelle: 5 },
  { name: 'Cost of Living 2024', herausgeber: 'Mercer', rang: 3, rangText: '3 (teuerste)', trend: 'flat', trendText: 'stabil auf Rang 3', kommentar: 'Hinter Hongkong und Singapur, vor Genf (4).', quelle: 6 },
  { name: 'Quality of Life Index 2026', herausgeber: 'Numbeo', rang: 24, rangText: '24', trend: 'down', trendText: 'absteigend (22 → 24)', kommentar: 'Crowd-basiert; Wohnkosten drücken den Rang.', quelle: 8 },
  { name: '«Mapping the World’s Prices» 2025', herausgeber: 'Deutsche Bank', rang: 8, rangText: '8', trend: 'down', trendText: 'erstmals aus den Top 5', kommentar: 'Hohe Löhne werden durch extreme Preise teilweise aufgezehrt.', quelle: 9 },
]

// Chart-Daten: «Drei Blicke»
export const MIETDYNAMIK = [
  { label: 'Stadt Zürich 2022–24', value: 7.5, display: '+6–9 %', hot: true, note: 'Anstieg seit 2022' },
  { label: 'National 2024', value: 4.7, display: '+4,7 %', hot: true, note: 'stärkster Anstieg seit 25 Jahren' },
  { label: 'National 2025', value: 1.3, display: '+1,3 %', hot: false, note: 'Abschwächung' },
  { label: 'Prognose 2026', value: 0.7, display: '+0,7 %', hot: false, note: 'Prognose' },
]

export const EIU_TEILWERTE = [
  { label: 'Gesundheit', value: 100 },
  { label: 'Bildung', value: 100 },
  { label: 'Kultur & Umwelt', value: 96.3 },
  { label: 'Infrastruktur', value: 96.4 },
  { label: 'Stabilität', value: 95.0 },
]

# Wie lebenswert ist Zürich?

Ein evidenzbasierter, interaktiver Datenreport zur Lebensqualität in Zürich – zwischen Mercer-Rang 1 und 0,1 % Leerstand. Stand: Juli 2026.

## Inhalt

- **Home:** Narrativ aufbereiteter Report mit Executive Summary, Kapitel-Navigation, Rankings, Treibern und Schattenseiten (Wohnungsnot, Gentrifizierung, Integration), Städte-Duell, Perspektiven und Fazit.
- **Daten:** Interaktive Charts, Filter und Ranking-Tabellen.
- **Quellen:** Vollständiges, durchsuchbares Quellenverzeichnis mit Zitierhinweisen.

## Tech-Stack

- React 19 + TypeScript + Vite 7
- Tailwind CSS 3 + shadcn/ui (Radix UI)
- GSAP (ScrollTrigger), Lenis, Framer Motion, Recharts
- React Router (BrowserRouter mit `basename = import.meta.env.BASE_URL`)

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server auf Port 3000
npm run build    # Produktionsbuild nach dist/
npm run preview
```

## Deployment

Die Seite wird automatisch über GitHub Actions (`.github/workflows/deploy.yml`) auf **GitHub Pages** deployed. Die Vite-`base` ist auf `/zuerich-lebensqualitaet-report/` gesetzt.

Live: https://avasdream.github.io/zuerich-lebensqualitaet-report/

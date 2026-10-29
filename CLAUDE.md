# CLAUDE.md – SkillForge

## Projekt-Kontext

- App: SkillForge – Interaktive Kompetenz-Schmiede fuer Recruiter
- Typ: React SPA (Vite + Tailwind CSS v4)
- Hosting: apps.p3coaching.de/skillforge/
- Design-System: P3 Designsystem (Markenkompass 2026) als Tailwind v4 Theme (src/index.css)
- Sprache UI: Deutsch (Zielmarkt DACH)
- Code/Commits: Englisch
- Dev-Server: Port 5180 (`npm run dev`)

## Tech-Stack

- React 19 + Vite 7
- Tailwind CSS v4 (CSS-first config, kein tailwind.config.js)
- @dnd-kit/core (Drag & Drop)
- Framer Motion (Animationen)
- Kein Backend, alle Daten als JSON

## Deployment

- DEPLOY_TARGET Pattern (wie Quest Board)
- `allinkl` → /skillforge/ (apps.p3coaching.de)
- `github-pages` → /SkillForge/
- dev → /
- GitHub Repo: https://github.com/grischan15/SkillForge
- GitHub Pages: https://grischan15.github.io/SkillForge/
- ALL-INKL: https://apps.p3coaching.de/skillforge/
- Workflows: `.github/workflows/deploy.yml` + `deploy-to-allinkl.yml`
- **KRITISCH:** base-Pfad in vite.config.js MUSS mit server-dir im Workflow uebereinstimmen!

## Datenquelle

- Quelle: 801_Jobhunt/35_scoring_data_jobhunt/ (clusters.json, skills.json, roles.json)
- clusters.json + skills.json: kopieren (lokale Tag-Ergaenzungen siehe STATE.md)
- **roles.json NIE blind kopieren:** SkillForge-eigene Felder `uniqueValue`/`businessImpact` per Merge erhalten
- **Englisch:** Deutsche Daten sind die Quelle, englische Texte liegen als Overlay nach id in
  src/data/i18n/en/ (skills, roles, clusters). Nach jedem Sync neue/geaenderte Texte dort nachziehen,
  dann `npm run check:i18n` (fehlende ids, abweichende Evidence-Anzahl). Fehlt ein Eintrag, zeigt die App Deutsch.
- UI-Texte: je Komponente ein `TEXT = { de, en }`-Objekt, Sprache via `useLang()` (src/i18n/LanguageContext.jsx).
  Link fuer internationale Kontakte: `?lang=en`
- **skills.json:** Evidence-validiert (v0.2.0), Klienten-Namen anonymisiert (v0.3.0)
- **roles.json:** Enthaelt KI-generierte Inhalte, MUSS noch manuell validiert werden!
- Referenz fuer Validierung: Jobhunt/docs/01_profil/

## Design-Regeln

- **CD:** P3 Designsystem (Markenkompass 2026). Token-Dateien in `src/styles/p3-designsystem/` sind
  1:1-Kopien aus `OneDrive - P3Coaching/41_Design_System_CD_CI/p3-designsystem/tokens/`. Nie editieren,
  bei DS-Update komplett ersetzen. Tailwind-Bruecke in `src/index.css` (Muster: Template `p3-theme.css`)
- Farben nur ueber Theme-Utilities (`bg-moosgruen`, `text-ink`, `bg-cta` …), Tailwind-Standardpalette ist aus.
  Terrakotta nur CTA (`p3-button data-variant="primary"`) und grosse Schrift/Eyebrows, nie Fliesstext
- Kantig: Radien max 4px (Theme deckelt alle `rounded-*`), Karten mit `p3-cut-box`, keine Gradients, keine Emojis
- Schrift: Natom Pro Title 900 Versalien (`font-display font-black`, h1/h2, `.p3-eyebrow`) + Proxima Nova.
  Adobe-Kit `nlu0dtg` per `<link>` in index.html (domaingebunden)
- 6 Cluster-Farben: Tannenblau, Moosgruen, Salbei (vertieft) + 3 gedaempfte Zusatztoene (Aubergine, Holzbraun,
  Ocker), alle AA auf Weiss und auf ihrem `-bg`/`-light`. Cluster-Symbole: Lucide (`ClusterIcon.jsx`)
- Touch-Targets: min 48px (WCAG + Neurodivergenz)
- prefers-reduced-motion: global respektiert
- Light-Mode only (Phase 1)
- Branding: Bildmarke `public/images/bildmark-terrakotta.svg` (nie nachzeichnen)

## Commit-Stil

- Prefix: feat/fix/docs/refactor
- Kurze Summary + Body wenn noetig
- Kein `Co-Authored-By`-Trailer (globale CLAUDE.md)

## Docs-Update Regel

Wenn der User "docs updaten" sagt:
- STATE.md und ROADMAP.md aktualisieren
- Danach automatisch committen

<!-- p3-kommunikation:start -->
## Kommunikation
- Eingang: `01_Kommunikation/`. Neues liegt direkt im Ordner. Bei „Wo machen wir weiter?“ zusammen mit Session-Log und ROADMAP vorstellen und besprechen, nichts selbst umsetzen. Christian entscheidet: umsetzen, in die ROADMAP oder verwerfen. Danach nach `01_Kommunikation/_archiv/JJJJ_MM_TT/`.
- Ausgehend an Empfänger ohne CLI-Projekt: `01_Kommunikation/ausgang/`. An andere CLI-Projekte direkt in deren `01_Kommunikation/`. Keine Rückmeldung an den Absender.
<!-- p3-kommunikation:end -->

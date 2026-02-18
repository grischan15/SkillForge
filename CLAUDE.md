# CLAUDE.md – SkillForge

## Projekt-Kontext

- App: SkillForge – Interaktive Kompetenz-Schmiede fuer Recruiter
- Typ: React SPA (Vite + Tailwind CSS v4)
- Hosting: apps.p3coaching.de/skillforge/
- Design-System: P3/NeuroForge Tokens als Tailwind v4 Theme (in index.css)
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

- Rohdaten leben in Jobhunt/docs/07_skillforge/
- Generierte JSONs werden nach src/data/ kopiert
- **skills.json:** Evidence-validiert (v0.2.0), Klienten-Namen anonymisiert (v0.3.0)
- **roles.json:** Enthaelt KI-generierte Inhalte, MUSS noch manuell validiert werden!
- Referenz fuer Validierung: Jobhunt/docs/01_profil/

## Design-Regeln

- Touch-Targets: min 48px (WCAG + Neurodivergenz)
- prefers-reduced-motion: global respektiert
- Light-Mode only (Phase 1)
- 6 distinkte Cluster-Farben (warm, HSP-freundlich)
- Font: Avenir, system-ui, sans-serif
- Branding: P3 Fluegel-Logo (public/images/P3_Logo_RZ_Bild_rot.png)

## Commit-Stil

- Prefix: feat/fix/docs/refactor
- Kurze Summary + Body wenn noetig
- Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

## Docs-Update Regel

Wenn der User "docs updaten" sagt:
- STATE.md und ROADMAP.md aktualisieren
- Danach automatisch committen

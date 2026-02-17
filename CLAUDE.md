# CLAUDE.md – SkillForge

## Projekt-Kontext

- App: SkillForge – Interaktive Kompetenz-Schmiede fuer Recruiter
- Typ: React SPA (Vite + Tailwind CSS v4)
- Hosting: apps.p3coaching.de/skill-forge/
- Design-System: P3/NeuroForge Tokens als Tailwind v4 Theme
- Sprache UI: Deutsch (Zielmarkt DACH)
- Code/Commits: Englisch

## Tech-Stack

- React 19 + Vite
- Tailwind CSS v4 (CSS-first config)
- @dnd-kit/core (Drag & Drop)
- Framer Motion (Animationen)
- Kein Backend, alle Daten als JSON

## Deployment

- DEPLOY_TARGET Pattern (wie Quest Board)
- `allinkl` → /skill-forge/ (apps.p3coaching.de)
- `github-pages` → /SkillForge/
- dev → /

## Datenquelle

- Rohdaten leben in Jobhunt/docs/07_skillforge/
- Generierte JSONs werden nach src/data/ kopiert

## Design-Regeln

- Touch-Targets: min 48px (WCAG + Neurodivergenz)
- prefers-reduced-motion: global respektiert
- Light-Mode only (Phase 1)
- 7 distinkte Cluster-Farben (warm, HSP-freundlich)
- Font: Avenir, system-ui, sans-serif

## Commit-Stil

- Prefix: feat/fix/docs/refactor
- Kurze Summary + Body wenn noetig
- Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

## Docs-Update Regel

Wenn der User "docs updaten" sagt:
- STATE.md und ROADMAP.md aktualisieren
- Danach automatisch committen

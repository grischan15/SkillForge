# ROADMAP.md – SkillForge

## Phasen

### Phase 1: MVP (aktuell - v0.1.0)
- [x] Grundgeruest: Vite + React + Tailwind v4 + DnD + Framer Motion
- [x] 7 Cluster-Tabs + ~40 Skill-Karten + Evidenz-Popovers
- [x] Schmiede (Drop-Zone) immer sichtbar + Tap-to-Add
- [x] Matching-Engine (100 Rollen: 50 Standard + 50 Revelation)
- [x] Responsive Layout + prefers-reduced-motion
- [x] P3 Branding (Logo, Foto, LinkedIn, Impressum)

#### Naechste Schritte (vor Go-Live):
- [ ] **Willkommensseite Text anpassen** (Claim, Beschreibung)
- [ ] **KRITISCH: Skills + Evidenz-Bullets gegen Realitaet pruefen** - vieles KI-generiert!
  - Alle `evidence`-Arrays in skills.json validieren
  - Alle `keyMetric`-Werte auf Korrektheit pruefen
  - Zahlen, Titel, Behauptungen mit Master Resume abgleichen
- [ ] **KRITISCH: Rollen-Beschreibungen pruefen** (roles.json)
  - `description` und `whyFit` Felder validieren
  - `requiredTags` auf sinnvolle Zuordnung pruefen
- [ ] Portraitfoto: Bildausschnitt optimieren (evtl. zugeschnittene Version)
- [ ] Deployment auf apps.p3coaching.de/skill-forge/

### Phase 2: KI-Integration
- Dynamische Revelation-Generierung via API
- Share-URL fuer Recruiter
- Polish + Feinschliff

### Phase 3: Job-Upload
- Unternehmen laedt Stellenanzeige hoch
- Auto-Match + KI-Vorschlaege

## Decision Log

| Datum | Entscheidung | Kontext |
|-------|-------------|---------|
| 2026-02-17 | Tailwind CSS v4 statt CSS-in-JS | Erste Tailwind-App im P3-Oekosystem, v4 nutzt CSS-first Config |
| 2026-02-17 | Light-Mode only | Dark-Mode kommt in Phase 2, reduziert Komplexitaet |
| 2026-02-17 | Daten als statische JSONs | Kein Backend noetig, alle Daten offline |
| 2026-02-17 | @dnd-kit statt react-beautiful-dnd | Aktiv maintained, besser fuer Touch/Keyboard |
| 2026-02-17 | Port 5180 fix | NeuroForge laeuft bereits auf 5173 |
| 2026-02-17 | P3-Logo statt Emoji | Roter Fluegel als Branding durchgaengig |
| 2026-02-17 | Skills/Rollen-Daten KI-generiert | Muessen VOR Go-Live manuell validiert werden! |

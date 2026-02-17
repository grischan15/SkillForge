# ROADMAP.md – SkillForge

## Phasen

### Phase 1: MVP (v0.1.0 → v0.2.0)
- [x] Grundgeruest: Vite + React + Tailwind v4 + DnD + Framer Motion
- [x] 7→6 Cluster-Tabs + 37→32 Skill-Karten + Evidenz-Popovers
- [x] Schmiede (Drop-Zone) immer sichtbar + Tap-to-Add
- [x] Matching-Engine (100 Rollen: 50 Standard + 50 Revelation)
- [x] Responsive Layout + prefers-reduced-motion
- [x] P3 Branding (Logo, Foto, LinkedIn, Impressum)
- [x] **Evidence-Validation: Alle Skills gegen harte Quellen geprueft**
- [x] **Master Resume als Quelle entfernt**
- [x] **data-process Cluster in engineering gemergt**

#### Naechste Schritte (vor Go-Live):
- [ ] **Willkommensseite Text anpassen** (Claim, Beschreibung)
- [ ] **Rollen-Beschreibungen pruefen** (roles.json)
  - `description` und `whyFit` Felder validieren
  - `requiredTags` auf sinnvolle Zuordnung pruefen (Tags haben sich geaendert!)
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
| 2026-02-17 | Evidence-Validation durchgefuehrt | Master Resume (selbstverfasst) als Quelle entfernt. Nur noch harte Quellen: Zeugnisse (Vitesco, Continental, GM, TL Eng.), 6 CAS-Diplome, FH-Diplom, Existenzgruendungsberater-Zertifikat, ProvenExpert (30 Reviews, 4.96/5.0), P3-Broschuere, Vita-Referenzen. 37→32 Skills, 7→6 Cluster. |
| 2026-02-17 | data-process Cluster aufgeloest | Nur 1 Skill (Six Sigma/DFSS) verblieb nach Evidence-Pruefung. In engineering gemergt statt eigenen Cluster mit 1 Skill. |
| 2026-02-17 | Karriere- und Gruendungsberatung getrennt | Komplett unterschiedliche Beratungsfelder, jeweils eigener Skill. Gruendungsberatung = Existenzgruendungsberater-Zertifikat, Karriereberatung = ProvenExpert-belegt. |
| 2026-02-17 | 5 neue Skills eingefuehrt | Fuehrungskraefteentwicklung (LeadershipCoach Diplom), Karriereberatung (ProvenExpert), Sozialkompetenz (Continental Note 1), Speaker (Vitesco Townhalls), Gruendungsberatung (umbenannt von Startup-Beratung) |

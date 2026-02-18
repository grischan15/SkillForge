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

- [x] **Landing Page Redesign:** Claim, Werte, Staerken, Proof Points, Unterschrift
- [x] **Skill-Evidence Updates:** Entwicklungsleiter, NVH Simulation, FK-Script
- [x] **DSGVO:** Klienten-Namen anonymisiert

### Phase 1.5: Progressive Discovery (v0.3.0 → v0.4.0)
- [x] **Discovery-Teaser:** Immer sichtbare Gold-Box mit Cluster-Fortschritt (0/3 → 3/3)
- [x] **Unlock-Mechanik:** Rollen erst ab 3 verschiedenen Clustern sichtbar
- [x] **RoleCard Redesign:** Mini-Stellenanzeigen mit Skill-Tags und Mehrwert-Teaser
- [x] **JobAd-Modal:** Vollstaendiges Stellenprofil (Portal, Kompetenz-Abgleich, Mehrwert)
- [x] **uniqueValue:** "Ihr Mehrwert fuer die Firma" fuer alle 100 Rollen
- [x] **OnboardingHint:** Einmaliger Tooltip mit localStorage-Persistenz
- [x] **useDiscoveryProgress:** Hook fuer Cluster-Diversity-Tracking

### Phase 1.6: UX Funnel Restructure (v0.4.0 → v0.5.0)
- [x] **Neuer Skill:** Werte- & Kulturentwicklung (lead-culture), Leadership-Cluster
- [x] **OnboardingHint persistent:** Bleibt sichtbar bis X-Klick, neuer Text, Mobile-Support
- [x] **Standard-Rollen ohne Gate:** Sofort sichtbar ab erstem Skill (3-Cluster-Gate entfernt)
- [x] **Revelations-first:** Entdeckungsrollen ueber Standard-Rollen gerendert
- [x] **businessImpact:** 50 Revelation-Rollen mit Unternehmensbedarf-Text (Trojan-Horse)
- [x] **DiscoveryTeaser:** Neue Texte fuer alle Cluster-Zustaende

#### Naechste Schritte (vor Go-Live):
- [ ] **Rollen-Beschreibungen pruefen** (roles.json)
  - `description` und `whyFit` Felder validieren
  - `requiredTags` auf sinnvolle Zuordnung pruefen (Tags haben sich geaendert!)
- [ ] **JobAd-Templates integrieren** (roles.json)
  - `jobAd` Objekt mit intro, requirements[], idealCandidate fuer alle Rollen
  - JobAdModal rendert diese Daten bereits, Feld fehlt noch in roles.json
- [x] Deployment auf apps.p3coaching.de/skillforge/ (GitHub Actions + FTP)

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
| 2026-02-17 | Landing Page: Spiess umgedreht | Kandidat praesentiert sich wie ein Unternehmen seine Kultur zeigt: Werte (Freiheit, Agape, Klarheit), CliftonStrengths, Proof Points. Vision-getriebener Claim statt generischer Titel. |
| 2026-02-17 | Claim geaendert | Alt: "Menschenorientierter Systemarchitekt mit Pioniercharakter". Neu: "Ich sehe Staerken, baue Strukturen und schaffe Raeume, in denen Arbeit Sinn macht." Destilliert aus persoenlicher Vision + CliftonStrengths. |
| 2026-02-17 | Klienten-Namen anonymisiert | DSGVO-konform: Alle Einzelpersonen-Namen in Evidence-Texten durch "Klient/Klientin" ersetzt. Firmennamen (Karoka AG, EFC.AG) bleiben. |
| 2026-02-17 | Skill-Evidence praezisiert | Entwicklungsleiter Asien (statt Senior), NVH Simulation aufgebaut mit fachlicher Weisungsbefugnis, FK-Script weltweit, Engineering-Pionier Asien. |
| 2026-02-18 | Deployment komplett | GitHub Pages (auto) + ALL-INKL (manuell via FTP). gh CLI installiert, Repo erstellt, Workflows von Quest Board kopiert. |
| 2026-02-18 | Pfad-Bug /skill-forge/ vs /skillforge/ | vite.config.js base und workflow server-dir muessen EXAKT uebereinstimmen. Bindestrich-Unterschied verursachte 404. Lesson Learned in 00_project_template/10_skills_tools/deployment_react_vite.md dokumentiert. |
| 2026-02-18 | Strategie B: Always-Visible Teaser + Progressive Reveal | 3 UX-Strategien evaluiert: A (Wizard) zu rigide, C (Narrative Scroll) zu aufwendig. B bietet Storytelling ohne Zwang: Teaser motiviert, Unlock-Gate belohnt Exploration, RoleCards als Mini-Stellenanzeigen verkaufen den Mehrwert. |
| 2026-02-18 | Unlock-Gate bei 3 Clustern (alle Rollen) | Nicht nur Revelation-Rollen, sondern ALLE Rollen-Ergebnisse erst ab 3 verschiedenen Clustern sichtbar. Zwingt zu breiter Exploration statt Eincluster-Spam. |
| 2026-02-18 | uniqueValue-Feld in roles.json | Neues Feld "Ihr Mehrwert fuer die Firma" pro Rolle. Fokussiert auf einzigartige Skill-Kombinationen, formelle Anrede (Sie), 1-2 Saetze. KI-generiert, sollte validiert werden. |
| 2026-02-18 | Parallele Subagents fuer Content-Generierung | 4 Agents parallel: Architecture Plan, uniqueValue-Texte, JobAd-Templates, UX-Copy. Spart ~60% Zeit gegenueber sequentieller Ausfuehrung. |
| 2026-02-18 | Standard-Rollen-Gate entfernt | v0.4.0 gatete ALLE Rollen hinter 3-Cluster-Anforderung. Dead Zone fuer 1-2-Cluster-User. Standard-Rollen jetzt sofort sichtbar, Revelations bleiben gegated (matchingEngine). |
| 2026-02-18 | Revelations-first Reihenfolge | Entdeckungsrollen werden UEBER Standard-Rollen gerendert. Surprise-and-Delight-Strategie: das Ueberraschende zuerst, das Erwartbare danach. |
| 2026-02-18 | businessImpact Trojan Horse | Neues Feld auf Revelation-Cards: "Warum Ihr Unternehmen diese Rolle braucht". Verschiebt Gespraech von Kandidaten-Fit zu Unternehmens-Need. Recruiter denkt: "Stimmt, diese Rolle braeuchten wir." |
| 2026-02-18 | OnboardingHint persistent | Auto-Dismiss bei erstem Skill war kontraproduktiv. Hint bleibt als motivationaler Anker, teast Revelation-Mechanik. Nur manuelles X schliesst ihn. |
| 2026-02-18 | Werte- & Kulturentwicklung Skill | Luecke im Leadership-Cluster geschlossen. Evidence: Vitesco Rebranding, FK-Script weltweit, P3 Kulturentwicklung. Ergaenzt lead-change und lead-orgdev. |

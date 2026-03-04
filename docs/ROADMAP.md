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

### Phase 1.7: UX Polish + Responsive (v0.5.0 → v0.5.1)
- [x] **WelcomeBanner:** Goldenes 3-Schritte-Banner erklaert Forge-Flow
- [x] **Header-Redesign:** Hook-Subtitle auf Landing, kein Subtitle im Compact-Modus
- [x] **DiscoveryTeaser Fix:** Layout-Collapse bei Rollen-Aenderungen behoben
- [x] **SkillCard Fixes:** + Button immer sichtbar, Evidence-Popover ohne Grid-Stretch
- [x] **Responsive Layout:** Forge/Rollen immer sichtbar, kein verstecktes Bottom-Panel
- [x] **Session-only Boxen:** Kein localStorage, Boxen bei jedem Besuch wieder da
- [x] **Scrollbare Bereiche:** Skills + Aside je max-h-[50vh] auf kleinen Screens
- [x] **Collapsible Skills:** Optionaler Einklapp-Button wenn Rollen sichtbar
- [x] **Getrennte Zaehlung:** "X Entdeckungen, Y passende Rollen" im DiscoveryTeaser

### Phase 1.8: Layout-Umbau + Landing-Rebranding (v0.5.1 → v0.6.0) — abgeschlossen

### Phase 1.9: Kontakt-CTAs + Landing Polish (v0.6.0 → v0.6.2) — abgeschlossen

#### Naechste Schritte (vor Go-Live):
- [ ] **Rollen-Beschreibungen pruefen** (roles.json)
  - `description` und `whyFit` Felder validieren
  - `requiredTags` auf sinnvolle Zuordnung pruefen (Tags haben sich geaendert!)
- [ ] **JobAd-Templates integrieren** (roles.json)
  - `jobAd` Objekt mit intro, requirements[], idealCandidate fuer alle Rollen
  - JobAdModal rendert diese Daten bereits, Feld fehlt noch in roles.json
- [x] Deployment auf apps.p3coaching.de/skillforge/ (GitHub Actions + FTP)

### Phase 2: Evidence-Download + Lead-Capture
- [ ] **Lead-Capture-Formular:** Name, Firma, E-Mail-Adresse vor Download
- [ ] **Evidence-PDF:** Kuratiertes Kompetenz-Portfolio als einzelne PDF
  - Klickbares Inhaltsverzeichnis (pro Cluster / Evidenz-Quelle)
  - Bookmarks fuer Schnellnavigation
  - Skills verlinken auf relevante PDF-Seite
  - Automatische Seitenzahl-Referenzen in der App
- [ ] **Alternativen evaluiert:** Mega-PDF vs. Einzel-Dokumente
  - Mega-PDF: Ein Download, Recruiter findet alles an einem Ort. Braucht gutes Inhaltsverzeichnis.
  - Einzel-Dokumente: Granularer, aber viele Downloads. Recruiter verliert Ueberblick.
  - **Empfehlung:** Kuratierte Mega-PDF mit klickbarem Inhaltsverzeichnis + Bookmarks.
    Recruiter findet schnell die relevante Stelle ueber Cluster-Gliederung.
- [ ] **Backend-Anbindung:** Formular-Daten speichern (Serverless Function oder Simple API)
- [ ] **E-Mail-Benachrichtigung:** Recruiter erhaelt Download-Link, Christian erhaelt Lead-Info
- [ ] **Tracking:** Welche Rollen/Skills wurden angeschaut bevor Download?

### Phase 3: KI-Integration
- Dynamische Revelation-Generierung via API
- Share-URL fuer Recruiter
- Polish + Feinschliff

### Phase 4: Job-Upload
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
| 2026-02-17 | Claim geaendert | Alt: "Menschenorientierter Systemarchitekt mit Pioniercharakter". Destilliert aus persoenlicher Vision + CliftonStrengths. |
| 2026-03-04 | Claim v2: "wirkt" statt "Sinn macht" | "Sinn" zu abstrakt/interpretierbar fuer CEOs/Recruiter. "wirkt" = unmissverstaendlich, multivalent (funktioniert + erzeugt Wirkung). Purpose-Alignment als Hook darunter. |
| 2026-03-04 | CTA "Rollen-Match starten" | "Kompetenzen entdecken" war aus Kandidaten-Sicht. Recruiter denken in Rollen + Matching. Neuer CTA + Subline "Staerken in Aktion sehen". |
| 2026-03-04 | Layout-Umbau: Rollen unter Grid | Rollen in schmaler Sidebar unsichtbar. Jetzt volle Breite unter dem Grid — deutlich sichtbarer. Schmiede als einziger Sidebar-Content, groesser + farbiger. |
| 2026-03-04 | "Cluster" → "Bereich" | Fachbegriff "Cluster" fuer Recruiter/CEOs unverstaendlich. "Bereich" ist natuerliche Sprache. |
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
| 2026-02-18 | WelcomeBanner statt Inline-Erklaerung | Goldenes Banner erklaert 3-Schritte-Flow (Skills waehlen, Rollen sehen, Entdeckungen). Session-only: kein localStorage, da Recruiter beim zweiten Besuch die Anleitung nochmal lesen will. |
| 2026-02-18 | Mobile: Aside im Seitenfluss statt Fixed-Bottom-Panel | Verstecktes Bottom-Panel "Schmiede (0)" wurde von Usern nicht gefunden. Aside jetzt immer sichtbar im normalen Dokumentfluss unterhalb der Skills. |
| 2026-02-18 | Scrollbare Bereiche (50vh) | Skills + Aside je max-h-[50vh] auf kleinen Screens. Beide Bereiche scrollen unabhaengig, Schmiede + Rollen immer erreichbar. |
| 2026-02-18 | Collapsible Skills (opt-in) | Skills-Einklapp-Button erscheint nur auf kleinen Screens + nur wenn Rollenvorschlaege existieren. Default: aufgeklappt. Recruiter kann Skills einklappen um sich auf Rollen zu fokussieren. |
| 2026-02-18 | Evidence-Popover absolut statt inline | Inline-Evidence streckte CSS-Grid-Row und verzerrte Nachbar-Cards. Absolut positioniert schwebt als Overlay, kein Layout-Impact. |
| 2026-02-18 | Getrennte Rollenzaehlung | "11 Rollen gefunden" suggerierte 11 Entdeckungsrollen. Jetzt "X Entdeckungen, Y passende Rollen" - korrekte Zuordnung. |
| 2026-02-18 | Evidence-Download + Lead-Capture (Idee) | Skills referenzieren Quellen (Zeugnisse, Diplome). Idee: Kuratierte Mega-PDF mit klickbarem Inhaltsverzeichnis zum Download, gegated hinter Lead-Capture (Name, Firma, Email). Mega-PDF > Einzel-Dokumente weil ein Download, ein Ort. Inhaltsverzeichnis + Bookmarks fuer schnelle Navigation. |

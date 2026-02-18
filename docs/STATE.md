# STATE.md – SkillForge

## Version: 0.4.0 (Progressive Discovery Flow)

## Status: Discovery-Teaser mit Unlock-Mechanik, RoleCards als Mini-Stellenanzeigen, JobAd-Modal

### Tech-Stack
- React 19 + Vite 7 (Port 5180)
- Tailwind CSS v4 (CSS-first, Theme in index.css)
- @dnd-kit/core + sortable
- Framer Motion

### Features (implementiert)
- [x] Willkommensseite mit Portraitfoto, Unterschrift, Claim, Werten, Staerken, Proof Points + CTA
- [x] P3-Logo (roter Fluegel) als Branding + Favicon
- [x] 6 Kompetenz-Cluster als Tabs (wrappen bei kleiner Breite)
- [x] 32 Skill-Karten mit Evidenz-Popovers
- [x] Drag & Drop + Tap-to-Add [+]
- [x] Schmiede (Reaction Zone) immer sichtbar
- [x] Matching-Engine (100 Rollen: 50 Standard + 50 Revelation)
- [x] Revelation-Rollen bei 3+ Clustern
- [x] Responsive (Mobile/Tablet/Desktop)
- [x] prefers-reduced-motion Support
- [x] Zurueck-Button zur Startseite
- [x] LinkedIn-Link im Footer
- [x] Evidence-Validation: Alle Skills nur noch mit harten Quellen belegt
- [x] Handschriftliche Unterschrift als persoenliches Branding
- [x] Werte-Sektion (Freiheit, Agape, Klarheit) auf Startseite
- [x] Staerken-Sektion (CliftonStrengths) auf Startseite
- [x] 3 Proof-Point-Karten (15+ Jahre, 3 Kontinente, 4.96/5.0)
- [x] Neuer Claim: Vision-getrieben statt Titel-basiert
- [x] Klienten-Namen anonymisiert (DSGVO)
- [x] Discovery-Teaser: Immer sichtbare Gold-Box mit Fortschrittsanzeige (0/3 → 3/3 Cluster)
- [x] Unlock-Mechanik: Rollen-Ergebnisse erst ab 3 verschiedenen Clustern sichtbar
- [x] RoleCards als Mini-Stellenanzeigen: Titel, Score, Kategorie, Skill-Tags, Mehrwert-Teaser
- [x] JobAd-Modal: Vollstaendiges Stellenprofil mit Kompetenz-Abgleich, Mehrwert, Anforderungsprofil
- [x] SkillTag-Komponente: Matched/Unmatched Pills mit deutschen Labels
- [x] uniqueValue-Feld fuer alle 100 Rollen ("Ihr Mehrwert fuer die Firma")
- [x] OnboardingHint: Einmaliger Tooltip beim ersten Besuch (localStorage)
- [x] Cluster-Diversity-Tracking via useDiscoveryProgress Hook

### Aenderungen v0.3.0 → v0.4.0
- **Progressive Discovery Flow:** Strategie B (Always-Visible Teaser + Progressive Reveal) implementiert
- **DiscoveryTeaser:** Gold-Box zeigt Fortschritt (0/3 Cluster), aktive Cluster als farbige Pills, Lock/Unlock-Icons
- **Unlock-Gate:** Alle Rollen (Standard + Revelation) erst ab 3 verschiedenen Clustern sichtbar
- **RoleCard Redesign:** Mini-Stellenanzeigen mit Titel, Score, Kategorie, requiredTags als SkillTag-Pills, uniqueValue-Teaser
- **JobAdModal:** Portal-basiertes Modal mit Sektionen: Ueber die Rolle, Kompetenz-Abgleich, Mehrwert, Anforderungsprofil
- **SkillTag:** Wiederverwendbare Tag-Komponente mit Matched (gruen/Haken) vs Unmatched (grau) Styling, 50+ deutsche Labels
- **uniqueValue:** 100 Rollen mit "Ihr Mehrwert fuer die Firma" Text angereichert
- **OnboardingHint:** Einmaliger Tooltip ("Waehlen Sie Kompetenzen...") mit localStorage-Persistenz
- **useDiscoveryProgress:** Neuer Hook fuer Cluster-Diversity-Tracking und Unlock-Status
- **useMatching erweitert:** Gibt jetzt zusaetzlich forgedTags (Set) zurueck fuer Tag-Level-Visualisierung
- **App.jsx Integration:** DiscoveryTeaser + OnboardingHint in Desktop-Sidebar und Mobile-Forge eingebaut

### Aenderungen v0.2.0 → v0.3.0
- **Landing Page Redesign:** Kandidat praesentiert sich wie ein Unternehmen seine Kultur zeigt
- **Neuer Claim:** "Ich sehe Staerken, baue Strukturen und schaffe Raeume, in denen Arbeit Sinn macht."
- **Hook:** "Vom Entwicklungsleiter Asien zum Master Coach" als emotionaler Einstieg
- **Werte + Staerken:** Freiheit/Agape/Klarheit + 5 CliftonStrengths als Pill-Badges
- **3 Proof Points:** Zahlen-Karten (Engineering, Fuehrung, Coaching)
- **Unterschrift:** Handschriftliche SVG-Signatur unter dem Namen
- **Skill-Updates:** Entwicklungsleiter Asien explizit, NVH Simulation aufgebaut, FK-Script weltweit, Engineering-Pionier Asien
- **DSGVO:** Alle Klienten-Namen in Evidence-Texten anonymisiert
- **Speaker:** Marc Stoehr durch EFC.AG / M. Stoehr ersetzt

### Aenderungen v0.1.0 → v0.2.0
- **Evidence-Validation:** Alle 32 Skills gegen harte Quellen geprueft (Zeugnisse, Diplome, ProvenExpert, Broschuere, Vita-Referenzen)
- **Master Resume entfernt:** Keine selbstverfassten Behauptungen mehr als Quelle
- **10 Skills entfernt:** eng-quality, eng-patents, lead-pl, data-kanban, data-vba, data-dashboards, data-process-opt, biz-finance, biz-gomarket, did-curriculum (unzureichende harte Evidenz)
- **5 Skills neu:** lead-social, coach-leadership-dev, biz-karriere, did-speaker, biz-startup→Gruendungsberatung (umbenannt)
- **Cluster-Merge:** data-process aufgeloest, Six Sigma/DFSS in engineering integriert (7→6 Cluster)
- **Level-Anpassungen:** eng-product 5→4, lead-stakeholder 5→4, coach-neuro 4→3, ai-prompt 5→4, ai-claude 5→4, ai-comfyui 4→3, ai-automation 4→3, ai-frameworks 4→3, biz-market 4→3, did-adult 4→3
- **Component-Cleanup:** data-process Referenzen aus ForgedSkillChip, SkillCard, ClusterTabs entfernt

### Deployment (live)
- GitHub Repo: https://github.com/grischan15/SkillForge
- GitHub Pages: https://grischan15.github.io/SkillForge/ (auto bei push auf main)
- ALL-INKL: https://apps.p3coaching.de/skillforge/ (manuell via GitHub Action)
- Workflows: deploy.yml (GitHub Pages) + deploy-to-allinkl.yml (FTP)
- Secrets: FTP_SERVER, FTP_USERNAME, FTP_PASSWORD im Repo konfiguriert

### Bekannte offene Punkte
- Rollen-Beschreibungen (roles.json) noch nicht validiert
- JobAd-Templates (intro, requirements, idealCandidate) noch nicht in roles.json integriert

### Dateistruktur
```
src/
  main.jsx                    # Entry point
  App.jsx                     # Hauptkomponente mit DnD-Context
  index.css                   # Tailwind v4 Theme + Base Styles
  data/
    clusters.json             # 6 Cluster (data-process entfernt)
    skills.json               # 32 Skills (evidence-validiert)
    roles.json                # 100 Rollen + uniqueValue (PRUEFEN!)
    matchingEngine.js         # Offline Matching-Algorithmus
  components/
    layout/                   # AppShell, Header, Footer
    landing/                  # Welcome
    navigation/               # ClusterTabs
    skills/                   # SkillGrid, SkillCard
    forge/                    # ReactionZone, ForgedSkillChip, ForgePrompt
    results/                  # RoleResults, RoleCard, MatchScore, RevelationBadge,
                              # DiscoveryTeaser, JobAdModal, SkillTag
    shared/                   # DragOverlayCard, EmptyState, OnboardingHint
  hooks/
    useForge.js               # Schmiede State
    useMatching.js            # Rollen-Matching + forgedTags
    useReducedMotion.js       # prefers-reduced-motion
    useDiscoveryProgress.js   # Cluster-Diversity + Unlock-Status
public/
  images/
    BW_MW20220613_34995.jpg   # Portraitfoto
    P3_Logo_RZ_Bild_rot.png   # P3 Fluegel-Logo
    signature_Schwarz.svg     # Handschriftliche Unterschrift
```

### Datenquelle
- Rohdaten: Jobhunt/docs/07_skillforge/
- Generierte JSONs: src/data/

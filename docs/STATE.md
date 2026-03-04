# STATE.md – SkillForge

## Version: 0.6.2 (Landing-Reorder + Tooltips)

## Status: 2-Spalten-Layout mit grosser Schmiede-Sidebar, Rollen volle Breite darunter, Kontakt-CTAs im Stellenprofil

### Tech-Stack
- React 19 + Vite 7 (Port 5180)
- Tailwind CSS v4 (CSS-first, Theme in index.css)
- @dnd-kit/core + sortable
- Framer Motion

### Features (implementiert)
- [x] Willkommensseite mit Portraitfoto, Unterschrift, Claim, Werten, Staerken, Proof Points + CTA
- [x] P3-Logo (roter Fluegel) als Branding + Favicon
- [x] 6 Kompetenz-Bereiche als Tabs in beschrifteter Box
- [x] 33 Skill-Karten mit Evidenz-Popovers
- [x] Drag & Drop + Tap-to-Add [+]
- [x] Schmiede (Reaction Zone) immer sichtbar
- [x] Matching-Engine (100 Rollen: 50 Standard + 50 Revelation)
- [x] Standard-Rollen sofort sichtbar (kein 3-Cluster-Gate)
- [x] Revelation-Rollen bei 3+ Clustern (Revelations-first ueber Standard)
- [x] Responsive (Mobile/Tablet/Desktop)
- [x] prefers-reduced-motion Support
- [x] Zurueck-Button zur Startseite
- [x] LinkedIn-Link im Footer
- [x] Evidence-Validation: Alle Skills nur noch mit harten Quellen belegt
- [x] Handschriftliche Unterschrift als persoenliches Branding
- [x] Werte-Sektion (Freiheit, Agape, Klarheit) auf Startseite
- [x] Staerken-Sektion (CliftonStrengths) auf Startseite
- [x] 3 Proof-Point-Karten (15+ Jahre, 3 Kontinente, 4.96/5.0)
- [x] Claim: "...in denen Arbeit wirkt." + Hook mit Purpose-Alignment
- [x] Klienten-Namen anonymisiert (DSGVO)
- [x] Discovery-Teaser: Immer sichtbare Gold-Box mit Fortschrittsanzeige (0/3 → 3/3 Cluster)
- [x] Unlock-Mechanik: Rollen-Ergebnisse erst ab 3 verschiedenen Clustern sichtbar
- [x] RoleCards als Mini-Stellenanzeigen: Titel, Score, Kategorie, Skill-Tags, Mehrwert-Teaser
- [x] JobAd-Modal: Vollstaendiges Stellenprofil mit Kompetenz-Abgleich, Mehrwert, Anforderungsprofil
- [x] SkillTag-Komponente: Matched/Unmatched Pills mit deutschen Labels
- [x] uniqueValue-Feld fuer alle 100 Rollen ("Ihr Mehrwert fuer die Firma")
- [x] ForgeGuide: 4-Schritte-Leitsystem mit animierten Step-Dots (ersetzt OnboardingHint + WelcomeBanner)
- [x] InfoModal: Wiederverwendbares Modal fuer Erklaerungen (Discovery-Rollen, Workflow)
- [x] businessImpact-Feld auf Revelation-RoleCards + JobAdModal (Trojan-Horse-Strategie)
- [x] Cluster-Diversity-Tracking via useDiscoveryProgress Hook
- [x] Collapsible SkillGrid auf kleinen Screens (optional, wenn Rollen sichtbar)
- [x] Getrennte Rollenzaehlung: "X Entdeckungen, Y passende Rollen"
- [x] Layout: Schmiede in breiter Sidebar (lg:w-88), Rollen volle Breite unter dem Grid
- [x] Schmiede (ReactionZone): Groesser (min-h-200px), solid Border, staerkerer Hintergrund
- [x] CTA-Button: "Rollen-Match starten" + Subline "Staerken in Aktion sehen"
- [x] Terminologie: "Cluster" → "Bereich" durchgaengig (ForgeGuide, DiscoveryTeaser, ClusterTabs)
- [x] JobAdModal: Kontakt-CTAs (WhatsApp, E-Mail, LinkedIn) mit vorformulierten Nachrichten
- [x] Footer: LinkedIn prominent als eigener Button mit Icon (statt verstecktem Textlink)
- [x] Landing-Reihenfolge: Proof Points → CTA → Kompetenz-Bereiche → Werte/Staerken
- [x] Hover-Tooltips auf Werte- und Staerken-Pills (Desktop)

### Aenderungen v0.6.1 → v0.6.2
- **Landing-Reorder:** Proof Points direkt nach Claim, CTA Button danach, Kompetenz-Bereiche darunter, Werte+Staerken ganz unten
- **Hover-Tooltips:** Werte (Freiheit, Agape, Klarheit) und Staerken (CliftonStrengths) mit erklaerenden Tooltips bei Hover, nur Desktop (hidden sm:block)

### Aenderungen v0.6.0 → v0.6.1
- **JobAdModal Kontakt-CTAs:** WhatsApp (vorformuliert mit Rollentitel+Kategorie), E-Mail (Betreff+Body mit uniqueValue/companyType), LinkedIn-Profil — alle 48px Touch-Targets, responsive (untereinander Mobile, nebeneinander Desktop)
- **Footer Redesign:** LinkedIn als eigener blauer Button mit Icon + "Christian Schmidt auf LinkedIn", P3 Coaching + Impressum als separate Textzeile darunter

### Aenderungen v0.5.1 → v0.6.0
- **Layout-Umbau:** Rollen (DiscoveryTeaser + RoleResults) aus Sidebar in volle Breite unter dem Grid
- **Schmiede groesser:** min-h-200px, p-5, text-lg Titel, solid Border, bg-container Empty-State, Sidebar lg:w-88
- **ClusterTabs-Box:** Beschrifteter Container mit Label "6 Kompetenz-Bereiche"
- **Terminologie:** "Cluster" → "Bereich" in ForgeGuide (Step 2+3), DiscoveryTeaser (Locked-Texte, Progress)
- **SkillGrid:** max-h-[50vh] entfernt, natuerliche Hoehe
- **Neuer Claim:** "...in denen Arbeit wirkt." (statt "Sinn macht")
- **Neuer Hook:** "...ich bringe zusammen, was zusammengehoert: Menschen, Staerken und den richtigen Purpose."
- **CTA-Button:** "Rollen-Match starten →" + Subline "Staerken in Aktion sehen"
- **Leitsatz:** "Entdecke die Kompetenzen hinter dem Anspruch — und finde die passende Rolle."
- **ForgeGuide + InfoModal:** Ersetzen OnboardingHint + WelcomeBanner (geloescht)

### Aenderungen v0.5.0 → v0.5.1
- **Header:** Landing-Subtitle "Was kann ich fuer Ihr Unternehmen tun?", Compact-Header ohne Subtitle
- **DiscoveryTeaser Fix:** Layout-Collapse-Bug behoben (motion.div layout + overflow-hidden entfernt)
- **SkillCard Fixes:** + Button immer sichtbar (opacity-Bug), Evidence-Popover absolut positioniert (kein Grid-Row-Stretch)
- **Mobile Layout:** Forge/Rollen auf allen Bildschirmgroessen sichtbar (hidden Bottom-Panel entfernt, Aside immer im Fluss)
- **Info-Boxen Session-only:** localStorage-Persistenz entfernt
- **Collapsible Skills:** Optionaler Einklapp-Button auf kleinen Screens
- **Getrennte Rollenzaehlung:** "X Entdeckungen, Y passende Rollen"

### Aenderungen v0.4.0 → v0.5.0
- **Neuer Skill:** Werte- & Kulturentwicklung (lead-culture) im Leadership-Cluster, Level 4
- **OnboardingHint persistent:** Auto-Dismiss entfernt, bleibt bis manuelles X-Klick, neuer Motivationstext mit Emoji, jetzt auch in Mobile-Forge-Panel
- **Standard-Rollen sofort sichtbar:** 3-Cluster-Gate fuer Standard-Rollen entfernt, erscheinen ab erstem Skill
- **Revelations-first:** Entdeckungsrollen werden UEBER Standard-Rollen gerendert (vorher darunter)
- **Revelation-Headline:** "Haetten Sie diese Rollen auf dem Radar?" statt "Entdeckungsrollen (N)"
- **businessImpact:** Neues Feld fuer alle 50 Revelation-Rollen, fokussiert auf Unternehmensbedarf (Trojan-Horse-Strategie)
- **businessImpact-Display:** Goldene Sektion auf RoleCards + JobAdModal mit "Warum Ihr Unternehmen diese Rolle braucht"
- **DiscoveryTeaser:** Texte fuer alle Cluster-Zustaende (0/1/2) ueberarbeitet, sofortige Rollenvorschlaege erwaehnt
- **SkillTag:** purpose-Label hinzugefuegt
- **Skill-Count:** 32 → 33, Rollen-Count: 100 (50 Standard + 50 Revelation)

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
- **Neuer Claim:** "Ich sehe Staerken, baue Strukturen und schaffe Raeume, in denen Arbeit wirkt."
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
    skills.json               # 33 Skills (evidence-validiert)
    roles.json                # 100 Rollen + uniqueValue + businessImpact (PRUEFEN!)
    matchingEngine.js         # Offline Matching-Algorithmus
  components/
    layout/                   # AppShell, Header, Footer
    landing/                  # Welcome
    navigation/               # ClusterTabs
    skills/                   # SkillGrid, SkillCard
    forge/                    # ReactionZone, ForgedSkillChip, ForgePrompt
    results/                  # RoleResults, RoleCard, MatchScore, RevelationBadge,
                              # DiscoveryTeaser, JobAdModal, SkillTag
    shared/                   # DragOverlayCard, EmptyState, ForgeGuide, InfoModal
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

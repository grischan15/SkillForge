# STATE.md – SkillForge

## Version: 0.2.0 (Evidence-Validated)

## Status: Skill-Daten evidence-validiert, 32 Skills in 6 Clustern

### Tech-Stack
- React 19 + Vite 7 (Port 5180)
- Tailwind CSS v4 (CSS-first, Theme in index.css)
- @dnd-kit/core + sortable
- Framer Motion

### Features (implementiert)
- [x] Willkommensseite mit Portraitfoto + Claim + CTA
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

### Aenderungen v0.1.0 → v0.2.0
- **Evidence-Validation:** Alle 32 Skills gegen harte Quellen geprueft (Zeugnisse, Diplome, ProvenExpert, Broschuere, Vita-Referenzen)
- **Master Resume entfernt:** Keine selbstverfassten Behauptungen mehr als Quelle
- **10 Skills entfernt:** eng-quality, eng-patents, lead-pl, data-kanban, data-vba, data-dashboards, data-process-opt, biz-finance, biz-gomarket, did-curriculum (unzureichende harte Evidenz)
- **5 Skills neu:** lead-social, coach-leadership-dev, biz-karriere, did-speaker, biz-startup→Gruendungsberatung (umbenannt)
- **Cluster-Merge:** data-process aufgeloest, Six Sigma/DFSS in engineering integriert (7→6 Cluster)
- **Level-Anpassungen:** eng-product 5→4, lead-stakeholder 5→4, coach-neuro 4→3, ai-prompt 5→4, ai-claude 5→4, ai-comfyui 4→3, ai-automation 4→3, ai-frameworks 4→3, biz-market 4→3, did-adult 4→3
- **Component-Cleanup:** data-process Referenzen aus ForgedSkillChip, SkillCard, ClusterTabs entfernt

### Bekannte offene Punkte
- Willkommensseite: Text/Claim anpassen
- Portraitfoto: Bildausschnitt im Kreis optimierbar
- Rollen-Beschreibungen (roles.json) noch nicht validiert
- Deployment auf apps.p3coaching.de/skill-forge/

### Dateistruktur
```
src/
  main.jsx                    # Entry point
  App.jsx                     # Hauptkomponente mit DnD-Context
  index.css                   # Tailwind v4 Theme + Base Styles
  data/
    clusters.json             # 6 Cluster (data-process entfernt)
    skills.json               # 32 Skills (evidence-validiert)
    roles.json                # 100 Rollen (PRUEFEN!)
    matchingEngine.js         # Offline Matching-Algorithmus
  components/
    layout/                   # AppShell, Header, Footer
    landing/                  # Welcome
    navigation/               # ClusterTabs
    skills/                   # SkillGrid, SkillCard
    forge/                    # ReactionZone, ForgedSkillChip, ForgePrompt
    results/                  # RoleResults, RoleCard, MatchScore, RevelationBadge
    shared/                   # DragOverlayCard, EmptyState
  hooks/
    useForge.js               # Schmiede State
    useMatching.js            # Rollen-Matching
    useReducedMotion.js       # prefers-reduced-motion
public/
  images/
    BW_MW20220613_34995.jpg   # Portraitfoto
    P3_Logo_RZ_Bild_rot.png   # P3 Fluegel-Logo
```

### Datenquelle
- Rohdaten: Jobhunt/docs/07_skillforge/
- Generierte JSONs: src/data/

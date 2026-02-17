# STATE.md – SkillForge

## Version: 0.1.0 (MVP)

## Status: MVP lauffaehig, Dateninhalte muessen geprueft werden

### Tech-Stack
- React 19 + Vite 7 (Port 5180)
- Tailwind CSS v4 (CSS-first, Theme in index.css)
- @dnd-kit/core + sortable
- Framer Motion

### Features (implementiert)
- [x] Willkommensseite mit Portraitfoto + Claim + CTA
- [x] P3-Logo (roter Fluegel) als Branding + Favicon
- [x] 7 Kompetenz-Cluster als Tabs (wrappen bei kleiner Breite)
- [x] ~40 Skill-Karten mit Evidenz-Popovers
- [x] Drag & Drop + Tap-to-Add [+]
- [x] Schmiede (Reaction Zone) immer sichtbar
- [x] Matching-Engine (100 Rollen: 50 Standard + 50 Revelation)
- [x] Revelation-Rollen bei 3+ Clustern
- [x] Responsive (Mobile/Tablet/Desktop)
- [x] prefers-reduced-motion Support
- [x] Zurueck-Button zur Startseite
- [x] LinkedIn-Link im Footer

### Bekannte offene Punkte
- **WICHTIG:** Skills (evidence, keyMetric) und Rollen (description, whyFit) muessen gegen Master Resume geprueft werden - vieles ist KI-generiert und moeglicherweise nicht faktisch korrekt!
- Willkommensseite: Text/Claim anpassen
- Portraitfoto: Bildausschnitt im Kreis optimierbar

### Dateistruktur
```
src/
  main.jsx                    # Entry point
  App.jsx                     # Hauptkomponente mit DnD-Context
  index.css                   # Tailwind v4 Theme + Base Styles
  data/
    clusters.json             # 7 Cluster
    skills.json               # ~40 Skills (PRUEFEN!)
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

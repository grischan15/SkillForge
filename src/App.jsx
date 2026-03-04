import { useState, useCallback } from 'react'
import { DndContext, PointerSensor, TouchSensor, KeyboardSensor, useSensors, useSensor, DragOverlay } from '@dnd-kit/core'
import AppShell from './components/layout/AppShell'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Welcome from './components/landing/Welcome'
import ClusterTabs from './components/navigation/ClusterTabs'
import SkillGrid from './components/skills/SkillGrid'
import ReactionZone from './components/forge/ReactionZone'
import RoleResults from './components/results/RoleResults'
import DiscoveryTeaser from './components/results/DiscoveryTeaser'
import DragOverlayCard from './components/shared/DragOverlayCard'
import ForgeGuide from './components/shared/ForgeGuide'
import { useForge } from './hooks/useForge'
import { useMatching } from './hooks/useMatching'
import { useDiscoveryProgress } from './hooks/useDiscoveryProgress'
import { useReducedMotion } from './hooks/useReducedMotion'
import clusters from './data/clusters.json'
import skills from './data/skills.json'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [activeCluster, setActiveCluster] = useState(clusters[0].id)
  const [activeSkillId, setActiveSkillId] = useState(null)
  const [skillsCollapsed, setSkillsCollapsed] = useState(false)
  const reducedMotion = useReducedMotion()

  const { forgedSkills, addSkill, removeSkill, clearForge } = useForge()
  const { matches, revelations, forgedTags } = useMatching(forgedSkills)
  const { clusterCount, uniqueClusters, isUnlocked, progress } = useDiscoveryProgress(forgedSkills)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const handleDragStart = useCallback((event) => {
    setActiveSkillId(event.active.id)
  }, [])

  const handleDragEnd = useCallback((event) => {
    setActiveSkillId(null)
    if (event.over?.id === 'forge-drop-zone') {
      const skill = skills.find(s => s.id === event.active.id)
      if (skill) addSkill(skill)
    }
  }, [addSkill])

  const handleDragCancel = useCallback(() => {
    setActiveSkillId(null)
  }, [])

  const handleTapAdd = useCallback((skill) => {
    addSkill(skill)
  }, [addSkill])

  const activeSkill = activeSkillId ? skills.find(s => s.id === activeSkillId) : null
  const filteredSkills = skills.filter(s => s.clusterId === activeCluster)
  const hasResults = matches.length > 0 || (isUnlocked && revelations.length > 0)

  if (showWelcome) {
    return (
      <AppShell>
        <Header />
        <Welcome onStart={() => setShowWelcome(false)} clusters={clusters} />
        <Footer />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <Header compact onBack={() => setShowWelcome(true)} />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <ForgeGuide
          forgedSkills={forgedSkills}
          clusterCount={clusterCount}
          reducedMotion={reducedMotion}
        />
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1 min-h-0">
          {/* Left: Tabs + Skills */}
          <div className="flex-1 min-w-0 flex flex-col">
            <ClusterTabs
              clusters={clusters}
              activeCluster={activeCluster}
              onSelect={setActiveCluster}
            />
            {/* Collapse toggle – only on small screens when results exist */}
            {hasResults && (
              <button
                onClick={() => setSkillsCollapsed(prev => !prev)}
                className="
                  lg:hidden flex items-center gap-1.5 mb-2
                  py-2 px-3 rounded-lg
                  text-xs text-ink-muted hover:text-ink
                  hover:bg-container transition-colors cursor-pointer
                  min-h-[36px]
                "
              >
                <span>{skillsCollapsed ? '▼' : '▲'}</span>
                <span>{skillsCollapsed ? `Skills anzeigen (${filteredSkills.length})` : 'Skills einklappen'}</span>
              </button>
            )}
            {!skillsCollapsed && (
              <SkillGrid
                skills={filteredSkills}
                forgedSkillIds={forgedSkills.map(s => s.id)}
                onTapAdd={handleTapAdd}
                reducedMotion={reducedMotion}
              />
            )}
          </div>

          {/* Right: Forge sidebar (only Schmiede) */}
          <aside className="
            flex flex-col lg:w-88 xl:w-96 gap-3
            lg:sticky lg:top-4
          ">
            <ReactionZone
              forgedSkills={forgedSkills}
              onRemove={removeSkill}
              onClear={clearForge}
              reducedMotion={reducedMotion}
            />
          </aside>
        </div>

        {/* Role results — full width below the grid */}
        <section className="mt-6 flex flex-col gap-4">
          <DiscoveryTeaser
            clusterCount={clusterCount}
            uniqueClusters={uniqueClusters}
            isUnlocked={isUnlocked}
            progress={progress}
            revelationCount={revelations.length}
            standardCount={matches.length}
            reducedMotion={reducedMotion}
          />
          <RoleResults
            matches={matches}
            revelations={revelations}
            isUnlocked={isUnlocked}
            forgedTags={forgedTags}
            reducedMotion={reducedMotion}
          />
        </section>

        <DragOverlay dropAnimation={reducedMotion ? null : undefined}>
          {activeSkill ? <DragOverlayCard skill={activeSkill} /> : null}
        </DragOverlay>
      </DndContext>
      <Footer />
    </AppShell>
  )
}

export default App

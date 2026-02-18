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
import OnboardingHint from './components/shared/OnboardingHint'
import DragOverlayCard from './components/shared/DragOverlayCard'
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
  const [mobileForgeOpen, setMobileForgeOpen] = useState(false)
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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1 min-h-0">
          {/* Left: Tabs + Skills */}
          <div className="flex-1 min-w-0 flex flex-col">
            <ClusterTabs
              clusters={clusters}
              activeCluster={activeCluster}
              onSelect={setActiveCluster}
            />
            <SkillGrid
              skills={filteredSkills}
              forgedSkillIds={forgedSkills.map(s => s.id)}
              onTapAdd={handleTapAdd}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Right: Forge (sticky sidebar on desktop, bottom on mobile) */}
          <aside className="
            hidden lg:flex lg:flex-col lg:w-80 xl:w-96 gap-3
            lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100dvh-6rem)]
            lg:overflow-y-auto
          ">
            <OnboardingHint reducedMotion={reducedMotion} />
            <ReactionZone
              forgedSkills={forgedSkills}
              onRemove={removeSkill}
              onClear={clearForge}
              reducedMotion={reducedMotion}
            />
            <DiscoveryTeaser
              clusterCount={clusterCount}
              uniqueClusters={uniqueClusters}
              isUnlocked={isUnlocked}
              progress={progress}
              matchCount={matches.length + revelations.length}
              reducedMotion={reducedMotion}
            />
            <RoleResults
              matches={matches}
              revelations={revelations}
              isUnlocked={isUnlocked}
              forgedTags={forgedTags}
              reducedMotion={reducedMotion}
            />
          </aside>
        </div>

        {/* Mobile Forge (fixed bottom) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <div
            className={`bg-white border-t border-border shadow-lg transition-all duration-slow ease-out ${
              mobileForgeOpen ? 'max-h-[70dvh]' : 'max-h-14'
            } overflow-hidden`}
          >
            <button
              onClick={() => setMobileForgeOpen(prev => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 min-h-[48px] text-left"
            >
              <span className="font-semibold text-ink flex items-center gap-2">
                <img src="images/P3_Logo_RZ_Bild_rot.png" alt="" className="w-5 h-5 object-contain" />
                Schmiede ({forgedSkills.length})
              </span>
              <span className="text-ink-muted text-sm">
                {mobileForgeOpen ? '▼' : '▲'}
              </span>
            </button>
            {mobileForgeOpen && (
              <div className="px-4 pb-4 overflow-y-auto max-h-[calc(70dvh-3.5rem)] flex flex-col gap-3">
                <OnboardingHint reducedMotion={reducedMotion} />
                <ReactionZone
                  forgedSkills={forgedSkills}
                  onRemove={removeSkill}
                  onClear={clearForge}
                  reducedMotion={reducedMotion}
                  inline
                />
                <DiscoveryTeaser
                  clusterCount={clusterCount}
                  uniqueClusters={uniqueClusters}
                  isUnlocked={isUnlocked}
                  progress={progress}
                  matchCount={matches.length + revelations.length}
                  reducedMotion={reducedMotion}
                />
                <RoleResults
                  matches={matches}
                  revelations={revelations}
                  isUnlocked={isUnlocked}
                  forgedTags={forgedTags}
                  reducedMotion={reducedMotion}
                />
              </div>
            )}
          </div>
        </div>

        <DragOverlay dropAnimation={reducedMotion ? null : undefined}>
          {activeSkill ? <DragOverlayCard skill={activeSkill} /> : null}
        </DragOverlay>
      </DndContext>
      <Footer />
    </AppShell>
  )
}

export default App

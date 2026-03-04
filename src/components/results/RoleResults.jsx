import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import RoleCard from './RoleCard'
import RevelationBadge from './RevelationBadge'
import JobAdModal from './JobAdModal'
import InfoModal from '../shared/InfoModal'
import { DiscoveryInfoModal } from './DiscoveryTeaser'

export default function RoleResults({
  matches,
  revelations,
  isUnlocked = false,
  forgedTags = new Set(),
  reducedMotion,
}) {
  const [selectedRole, setSelectedRole] = useState(null)
  const [showDiscoveryInfo, setShowDiscoveryInfo] = useState(false)
  const [showMatchInfo, setShowMatchInfo] = useState(false)

  if (matches.length === 0 && (!isUnlocked || revelations.length === 0)) {
    return null
  }

  return (
    <>
      <div className="mt-2">
        <AnimatePresence>
          {/* Revelations FIRST (above standard) */}
          {isUnlocked && revelations.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2">
                <RevelationBadge />
                <h3 className="text-sm font-semibold text-revelation-gold tracking-wide">
                  Hätten Sie diese Rollen auf dem Radar? 😉
                </h3>
                <InfoButton onClick={() => setShowDiscoveryInfo(true)} label="Was sind Entdeckungsrollen?" />
              </div>
              <div className="space-y-2">
                {revelations.map((role, i) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    index={i}
                    isRevelation
                    reducedMotion={reducedMotion}
                    forgedTags={forgedTags}
                    onShowDetails={setSelectedRole}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Standard matches SECOND */}
          {matches.length > 0 && (
            <section className={isUnlocked && revelations.length > 0 ? 'mt-4' : ''}>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
                  Passende Rollen ({matches.length})
                </h3>
                <InfoButton onClick={() => setShowMatchInfo(true)} label="Was sind passende Rollen?" />
              </div>
              <div className="space-y-2">
                {matches.map((role, i) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    index={i}
                    reducedMotion={reducedMotion}
                    forgedTags={forgedTags}
                    onShowDetails={setSelectedRole}
                  />
                ))}
              </div>
            </section>
          )}
        </AnimatePresence>
      </div>

      {selectedRole && (
        <JobAdModal
          role={selectedRole}
          forgedTags={forgedTags}
          onClose={() => setSelectedRole(null)}
          reducedMotion={reducedMotion}
        />
      )}

      <DiscoveryInfoModal open={showDiscoveryInfo} onClose={() => setShowDiscoveryInfo(false)} />

      <InfoModal open={showMatchInfo} onClose={() => setShowMatchInfo(false)} title="Was sind passende Rollen?">
        <p>
          Diese Rollen matchen direkt die ausgewählten Kompetenzen.
          Je mehr Skills Sie hinzufügen, desto präziser werden die Vorschläge.
        </p>
        <p>
          Anders als die <strong className="text-ink">Entdeckungsrollen</strong> (die erst bei
          3+&nbsp;Fachgebieten erscheinen) zeigen passende Rollen die naheliegenden Positionen
          innerhalb einzelner Kompetenz-Bereiche.
        </p>
      </InfoModal>
    </>
  )
}

function InfoButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-container transition-colors cursor-pointer"
      aria-label={label}
    >
      <span className="text-sm font-bold">ⓘ</span>
    </button>
  )
}

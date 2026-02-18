import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import RoleCard from './RoleCard'
import RevelationBadge from './RevelationBadge'
import JobAdModal from './JobAdModal'

export default function RoleResults({
  matches,
  revelations,
  isUnlocked = false,
  forgedTags = new Set(),
  reducedMotion,
}) {
  const [selectedRole, setSelectedRole] = useState(null)

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
              <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wide mb-2">
                Passende Rollen ({matches.length})
              </h3>
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
    </>
  )
}

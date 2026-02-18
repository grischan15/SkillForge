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

  // Gate: show nothing until unlocked
  if (!isUnlocked) {
    return null
  }

  if (matches.length === 0 && revelations.length === 0) {
    return (
      <div className="mt-2 p-3 rounded-lg bg-container text-center">
        <p className="text-xs text-ink-muted leading-relaxed">
          Für Ihre aktuelle Kompetenz-Auswahl liegen noch keine passenden Rollen vor.
          Fügen Sie weitere Skills hinzu, um Vorschläge zu erhalten.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-2">
        <AnimatePresence>
          {matches.length > 0 && (
            <section>
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

          {revelations.length > 0 && (
            <section className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <RevelationBadge />
                <h3 className="text-sm font-semibold text-revelation-gold uppercase tracking-wide">
                  Entdeckungsrollen ({revelations.length})
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

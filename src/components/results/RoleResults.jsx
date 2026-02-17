import RoleCard from './RoleCard'
import RevelationBadge from './RevelationBadge'

export default function RoleResults({ matches, revelations, reducedMotion }) {
  if (matches.length === 0 && revelations.length === 0) {
    return null
  }

  return (
    <div className="mt-4">
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
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

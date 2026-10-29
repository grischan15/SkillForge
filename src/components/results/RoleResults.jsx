import { Info } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import RoleCard from './RoleCard'
import RevelationBadge from './RevelationBadge'
import JobAdModal from './JobAdModal'
import InfoModal from '../shared/InfoModal'
import { DiscoveryInfoModal } from './DiscoveryTeaser'
import { useLang } from '../../i18n/LanguageContext'
import { localizeRole } from '../../i18n/content'

export default function RoleResults({
  matches: matchesRaw,
  revelations: revelationsRaw,
  isUnlocked = false,
  forgedTags = new Set(),
  reducedMotion,
}) {
  const { lang } = useLang()
  const en = lang === 'en'
  const matches = matchesRaw.map(r => localizeRole(r, lang))
  const revelations = revelationsRaw.map(r => localizeRole(r, lang))
  const [selectedRoleId, setSelectedRoleId] = useState(null)
  const selectedRole = selectedRoleId
    ? [...revelations, ...matches].find(r => r.id === selectedRoleId) || null
    : null
  const setSelectedRole = (role) => setSelectedRoleId(role ? role.id : null)
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
            <section key="revelations">
              <div className="flex items-center gap-2 mb-2">
                <RevelationBadge />
                <h3 className="text-base font-semibold text-ink">
                  {en ? 'Did you have these roles on your radar?' : 'Hätten Sie diese Rollen auf dem Radar?'}
                </h3>
                <InfoButton onClick={() => setShowDiscoveryInfo(true)} label={en ? 'What are discovery roles?' : 'Was sind Entdeckungsrollen?'} />
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
            <section key="matches" className={isUnlocked && revelations.length > 0 ? 'mt-4' : ''}>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="p3-eyebrow">
                  {en ? 'Matching roles' : 'Passende Rollen'} ({matches.length})
                </h3>
                <InfoButton onClick={() => setShowMatchInfo(true)} label={en ? 'What are matching roles?' : 'Was sind passende Rollen?'} />
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

      <InfoModal open={showMatchInfo} onClose={() => setShowMatchInfo(false)} title={en ? 'What are matching roles?' : 'Was sind passende Rollen?'}>
        {en ? (
          <>
            <p>
              These roles directly match the selected competencies.
              The more skills you add, the more precise the suggestions become.
            </p>
            <p>
              Unlike <strong className="text-ink">discovery roles</strong> (which only appear with
              3+&nbsp;fields), matching roles show the obvious positions within single competence areas.
            </p>
          </>
        ) : (
          <>
            <p>
              Diese Rollen matchen direkt die ausgewählten Kompetenzen.
              Je mehr Skills Sie hinzufügen, desto präziser werden die Vorschläge.
            </p>
            <p>
              Anders als die <strong className="text-ink">Entdeckungsrollen</strong> (die erst bei
              3+&nbsp;Fachgebieten erscheinen) zeigen passende Rollen die naheliegenden Positionen
              innerhalb einzelner Kompetenz-Bereiche.
            </p>
          </>
        )}
      </InfoModal>
    </>
  )
}

function InfoButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center text-moosgruen hover:text-tannenblau hover:bg-salbei transition-colors cursor-pointer"
      aria-label={label}
    >
      <Info size={18} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}
